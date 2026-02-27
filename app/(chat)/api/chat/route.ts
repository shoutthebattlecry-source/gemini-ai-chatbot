import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { geminiProModel } from "@/ai";
import { auth } from "@/app/(auth)/auth";
import { deleteChatById, getChatById, saveChat } from "@/db/queries";
import { type PersistedProviderState } from "@/lib/provider-settings";

const requestSchema = z.object({
  id: z.string(),
  messages: z.array(z.any()),
  providerState: z.any().optional(),
});

const ieltsSystemPrompt = `
你是“雅思数字诊疗室”的 AI 教练，服务目标是：诊断痛点、安排训练、持续反馈。

请严格遵循：
1) 回答优先中文，表达清晰，给出可执行步骤。
2) 当用户提到阅读/听力/写作/口语问题时，先做“错因诊断”，再给“训练动作”。
3) 输出结构尽量固定为：
   - 问题诊断
   - 训练建议（今天）
   - 复盘建议（明天）
4) 避免泛泛鼓励，尽量给可量化指标（例如：正确率、时长、复习频次）。
5) 如果用户提供了错题样例，优先做同义替换、逻辑链、定位路径三类分析。
6) 不再使用任何“机票/航班/选座/支付”等场景。
`;

export async function POST(request: Request) {
  const parsedRequest = requestSchema.safeParse(await request.json());

  if (!parsedRequest.success) {
    return new Response("Invalid request payload", { status: 400 });
  }

  const {
    id,
    messages,
  }: {
    id: string;
    messages: Array<Message>;
    providerState?: PersistedProviderState;
  } = parsedRequest.data;

  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0,
  );

  const result = await streamText({
    model: geminiProModel,
    system: ieltsSystemPrompt,
    messages: coreMessages,
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          });
        } catch (error) {
          console.error("Failed to save chat");
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}

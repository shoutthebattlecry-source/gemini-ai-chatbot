"use client";

import { motion } from "framer-motion";

import { ProviderSettingsSheet } from "@/components/custom/provider-settings-sheet";

type ModuleCategory = "真题实战" | "能力诊断" | "学习策略" | "复盘闭环";

type SkillZone = {
  id: "listening" | "speaking" | "reading" | "writing";
  title: string;
  subtitle: string;
  level: "A 级分区";
  modules: Array<{
    title: string;
    category: ModuleCategory;
    description: string;
  }>;
};

const skillZones: Array<SkillZone> = [
  {
    id: "listening",
    title: "听力 Listening",
    subtitle: "定位错误类型，打造数字/同义替换/陷阱抗性",
    level: "A 级分区",
    modules: [
      {
        title: "真题精听 + 题型模块训练",
        category: "真题实战",
        description: "Section 1-4 分题型训练，支持地图题、填空题、选择题拆分练习。",
      },
      {
        title: "第一性原理错因诊断",
        category: "能力诊断",
        description: "把每次失分拆成：信息没听到 / 听到了但没匹配 / 匹配了但拼写错误。",
      },
      {
        title: "80/20 高频陷阱包",
        category: "学习策略",
        description: "优先强化最常错的 20% 场景（数字、地址、转折、否定表达）。",
      },
      {
        title: "遗忘曲线复听任务",
        category: "复盘闭环",
        description: "按 D1/D3/D7 自动回放错题音频，防止“会过就忘”。",
      },
    ],
  },
  {
    id: "speaking",
    title: "口语 Speaking",
    subtitle: "围绕流利度、词汇、语法、发音四维优化",
    level: "A 级分区",
    modules: [
      {
        title: "真题话题卡 + 模拟考官",
        category: "真题实战",
        description: "Part 1/2/3 模拟问答，自动记录停顿时长与重复词。",
      },
      {
        title: "苏格拉底追问训练",
        category: "学习策略",
        description: "AI 连续追问“为什么/怎么证明”，逼出观点深度与逻辑完整度。",
      },
      {
        title: "第一性原理表达修复",
        category: "能力诊断",
        description: "将口语问题拆成：内容贫乏、连接断裂、语法负担过重三层。",
      },
      {
        title: "遗忘曲线口语回录",
        category: "复盘闭环",
        description: "系统提醒你复说历史低分话题，比较本次与上次改进曲线。",
      },
    ],
  },
  {
    id: "reading",
    title: "阅读 Reading",
    subtitle: "强化定位速度 + 逻辑推断能力",
    level: "A 级分区",
    modules: [
      {
        title: "真题套题 + 题型专项",
        category: "真题实战",
        description: "Heading / T-F-NG / Matching 等题型可按弱项单独拉练。",
      },
      {
        title: "80/20 提分引擎",
        category: "学习策略",
        description: "优先突破影响分数最大的 20% 错因：定位偏差、同义替换误判、逻辑跳步。",
      },
      {
        title: "第一性原理句群拆解",
        category: "能力诊断",
        description: "将长难句还原为主干、限定、转折、因果四层结构。",
      },
      {
        title: "遗忘曲线词组复盘",
        category: "复盘闭环",
        description: "对历史错词进行间隔复习，配合同义替换再测。",
      },
    ],
  },
  {
    id: "writing",
    title: "写作 Writing",
    subtitle: "任务回应、连贯衔接、词汇语法四指标提升",
    level: "A 级分区",
    modules: [
      {
        title: "真题写作工坊（Task 1/2）",
        category: "真题实战",
        description: "支持图表写作、观点类写作，自动打标开头-论证-结尾结构。",
      },
      {
        title: "苏格拉底论证链检查",
        category: "学习策略",
        description: "AI 追问“证据在哪、反例是什么、如何回应反方”，补齐逻辑短板。",
      },
      {
        title: "第一性原理批改",
        category: "能力诊断",
        description: "把低分原因拆为：任务偏题、段落断层、语法稳定性不足。",
      },
      {
        title: "遗忘曲线错句回炉",
        category: "复盘闭环",
        description: "对历史错误句型做分天重写，形成个人“高频错句库”。",
      },
    ],
  },
];

const categoryStyle: Record<ModuleCategory, string> = {
  真题实战:
    "border-blue-400/50 bg-blue-100/60 text-blue-800 dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-200",
  能力诊断:
    "border-violet-400/50 bg-violet-100/60 text-violet-800 dark:border-violet-500/40 dark:bg-violet-950/40 dark:text-violet-200",
  学习策略:
    "border-amber-400/50 bg-amber-100/60 text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200",
  复盘闭环:
    "border-emerald-400/50 bg-emerald-100/60 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200",
};

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="w-full max-w-6xl mt-8 px-4 md:px-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.2 }}
    >
      <div className="rounded-3xl border border-zinc-200/70 bg-muted/40 p-6 md:p-8 shadow-sm dark:border-zinc-700/70">
        <div className="mb-6 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            IELTS Local AI Learning Hub
          </p>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            雅思 AI 本地学习网页群（不是普通聊天机器人）
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            主页面按“听说读写 A 级分区”组织，每个分区下都包含 B 级模块：真题实战、能力诊断、学习策略、复盘闭环。
            学习策略明确融合苏格拉底追问、80/20 法则、第一性原理与遗忘曲线。
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ProviderSettingsSheet />
            <span className="rounded-full border border-zinc-300/70 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
              目标模式：诊断 → 训练 → 反馈 → 再诊断
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {skillZones.map((zone) => (
            <section
              key={zone.id}
              className="rounded-2xl bg-background/70 p-4 border border-zinc-200/60 dark:border-zinc-700/60"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {zone.title}
                  </h2>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {zone.subtitle}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-200/70 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {zone.level}
                </span>
              </div>

              <div className="space-y-2">
                {zone.modules.map((module) => (
                  <article
                    key={module.title}
                    className="rounded-xl border border-zinc-200/60 p-3 dark:border-zinc-700/60"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {module.title}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${categoryStyle[module.category]}`}
                      >
                        {module.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">
                      {module.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

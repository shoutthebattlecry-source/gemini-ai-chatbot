export type ProviderKey =
  | "openai"
  | "claude"
  | "gemini"
  | "grok"
  | "deepseek"
  | "doubao"
  | "qwen";

export type ProviderConfig = {
  apiKey: string;
  model: string;
  baseUrl: string;
};

export type ProviderSettings = Record<ProviderKey, ProviderConfig>;

export const PROVIDERS: Array<{
  key: ProviderKey;
  label: string;
  placeholder: string;
  defaultModel: string;
  defaultBaseUrl?: string;
}> = [
  {
    key: "openai",
    label: "OpenAI",
    placeholder: "sk-...",
    defaultModel: "gpt-4.1-mini",
  },
  {
    key: "claude",
    label: "Claude (Anthropic)",
    placeholder: "sk-ant-...",
    defaultModel: "claude-3-5-sonnet-latest",
  },
  {
    key: "gemini",
    label: "Gemini",
    placeholder: "AIza...",
    defaultModel: "gemini-2.5-flash",
  },
  {
    key: "grok",
    label: "Grok (xAI)",
    placeholder: "xai-...",
    defaultModel: "grok-2-latest",
    defaultBaseUrl: "https://api.x.ai/v1",
  },
  {
    key: "deepseek",
    label: "DeepSeek",
    placeholder: "sk-...",
    defaultModel: "deepseek-chat",
    defaultBaseUrl: "https://api.deepseek.com/v1",
  },
  {
    key: "doubao",
    label: "豆包",
    placeholder: "请填写豆包 API Key",
    defaultModel: "doubao-1.5-pro-32k",
    defaultBaseUrl: "https://ark.cn-beijing.volces.com/api/v3",
  },
  {
    key: "qwen",
    label: "千问",
    placeholder: "请填写千问 API Key",
    defaultModel: "qwen-plus",
    defaultBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
];

export const STORAGE_KEY = "ielts-diagnostic-provider-settings";

export const DEFAULT_PROVIDER_KEY: ProviderKey = "gemini";

export const defaultSettings = PROVIDERS.reduce((acc, provider) => {
  acc[provider.key] = {
    apiKey: "",
    model: provider.defaultModel,
    baseUrl: provider.defaultBaseUrl ?? "",
  };
  return acc;
}, {} as ProviderSettings);

export type PersistedProviderState = {
  selectedProvider: ProviderKey;
  settings: ProviderSettings;
};

export const defaultPersistedState: PersistedProviderState = {
  selectedProvider: DEFAULT_PROVIDER_KEY,
  settings: defaultSettings,
};

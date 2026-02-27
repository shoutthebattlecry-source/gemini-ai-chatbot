"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ProviderKey =
  | "openai"
  | "claude"
  | "gemini"
  | "grok"
  | "deepseek"
  | "doubao"
  | "qwen";

type ProviderConfig = {
  apiKey: string;
  model: string;
  baseUrl: string;
};

type ProviderSettings = Record<ProviderKey, ProviderConfig>;

const PROVIDERS: Array<{ key: ProviderKey; label: string; placeholder: string }> = [
  { key: "openai", label: "OpenAI", placeholder: "sk-..." },
  { key: "claude", label: "Claude (Anthropic)", placeholder: "sk-ant-..." },
  { key: "gemini", label: "Gemini", placeholder: "AIza..." },
  { key: "grok", label: "Grok (xAI)", placeholder: "xai-..." },
  { key: "deepseek", label: "DeepSeek", placeholder: "sk-..." },
  { key: "doubao", label: "豆包", placeholder: "请填写豆包 API Key" },
  { key: "qwen", label: "千问", placeholder: "请填写千问 API Key" },
];

const STORAGE_KEY = "ielts-diagnostic-provider-settings";

const defaultSettings = PROVIDERS.reduce((acc, provider) => {
  acc[provider.key] = { apiKey: "", model: "", baseUrl: "" };
  return acc;
}, {} as ProviderSettings);

function maskSecret(secret: string) {
  if (!secret) return "未填写";
  if (secret.length <= 8) return "已填写";
  return `${secret.slice(0, 4)}...${secret.slice(-4)}`;
}

export function ProviderSettingsSheet() {
  const [settings, setSettings] = useState<ProviderSettings>(defaultSettings);
  const [savedAt, setSavedAt] = useState<string>("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as ProviderSettings;
      setSettings({ ...defaultSettings, ...parsed });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const configuredCount = useMemo(
    () => PROVIDERS.filter((provider) => settings[provider.key].apiKey.trim()).length,
    [settings]
  );

  const updateField = (
    key: ProviderKey,
    field: keyof ProviderConfig,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const saveSettings = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSavedAt(new Date().toLocaleString("zh-CN"));
  };

  const clearSettings = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSettings(defaultSettings);
    setSavedAt("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="w-fit">
          配置模型 API（{configuredCount}/7）
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>一键配置你的模型 API</SheetTitle>
          <SheetDescription>
            小白模式：把你各个平台的 API Key 粘贴进来即可。当前版本仅保存在你的浏览器本地，不会自动上传服务器。
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5 pb-8">
          {PROVIDERS.map((provider) => {
            const providerConfig = settings[provider.key];

            return (
              <section
                key={provider.key}
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {provider.label}
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {maskSecret(providerConfig.apiKey)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`${provider.key}-key`}>API Key</Label>
                    <Input
                      id={`${provider.key}-key`}
                      placeholder={provider.placeholder}
                      type="password"
                      value={providerConfig.apiKey}
                      onChange={(event) =>
                        updateField(provider.key, "apiKey", event.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${provider.key}-model`}>模型名（可选）</Label>
                    <Input
                      id={`${provider.key}-model`}
                      placeholder="例如 gpt-4.1-mini / claude-3-5-sonnet"
                      value={providerConfig.model}
                      onChange={(event) =>
                        updateField(provider.key, "model", event.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${provider.key}-baseUrl`}>Base URL（可选）</Label>
                    <Input
                      id={`${provider.key}-baseUrl`}
                      placeholder="如果是官方接口可留空"
                      value={providerConfig.baseUrl}
                      onChange={(event) =>
                        updateField(provider.key, "baseUrl", event.target.value)
                      }
                    />
                  </div>
                </div>
              </section>
            );
          })}

          <div className="flex flex-wrap gap-3">
            <Button onClick={saveSettings}>保存到本地浏览器</Button>
            <Button variant="outline" onClick={clearSettings}>
              清空全部配置
            </Button>
            {savedAt && (
              <p className="w-full text-xs text-zinc-500 dark:text-zinc-400">
                上次保存时间：{savedAt}
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

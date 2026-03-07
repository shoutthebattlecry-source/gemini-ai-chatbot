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
import {
  defaultPersistedState,
  defaultSettings,
  PersistedProviderState,
  ProviderConfig,
  ProviderKey,
  PROVIDERS,
  STORAGE_KEY,
} from "@/lib/provider-settings";

function maskSecret(secret: string) {
  if (!secret) return "未填写";
  if (secret.length <= 8) return "已填写";
  return `${secret.slice(0, 4)}...${secret.slice(-4)}`;
}

export function ProviderSettingsSheet() {
  const [selectedProvider, setSelectedProvider] =
    useState<ProviderKey>("gemini");
  const [settings, setSettings] = useState(defaultSettings);
  const [savedAt, setSavedAt] = useState<string>("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as PersistedProviderState;
      setSelectedProvider(parsed.selectedProvider ?? "gemini");
      setSettings({ ...defaultSettings, ...parsed.settings });
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
    const payload: PersistedProviderState = {
      selectedProvider,
      settings,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSavedAt(new Date().toLocaleString("zh-CN"));
  };

  const clearSettings = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSelectedProvider(defaultPersistedState.selectedProvider);
    setSettings(defaultPersistedState.settings);
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
            小白模式：粘贴你的 API Key，然后选一个默认模型。当前版本只保存在你的浏览器本地，不会自动上传服务器。
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5 pb-8">
          <section className="rounded-xl border border-emerald-300/70 bg-emerald-50/60 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
            <Label htmlFor="selected-provider">当前默认模型平台</Label>
            <select
              id="selected-provider"
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedProvider}
              onChange={(event) =>
                setSelectedProvider(event.target.value as ProviderKey)
              }
            >
              {PROVIDERS.map((provider) => (
                <option key={provider.key} value={provider.key}>
                  {provider.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
              聊天时会优先使用你这里选中的平台。
            </p>
          </section>

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
                    <Label htmlFor={`${provider.key}-model`}>模型名</Label>
                    <Input
                      id={`${provider.key}-model`}
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

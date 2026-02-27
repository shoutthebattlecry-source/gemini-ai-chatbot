"use client";

import { motion } from "framer-motion";

import { ProviderSettingsSheet } from "@/components/custom/provider-settings-sheet";

const tagBuckets = [
  {
    title: "题型标签",
    items: ["阅读-Heading 题", "听力-地图题", "写作-Task 2 论证"],
  },
  {
    title: "技能标签",
    items: ["长难句拆解", "同义替换识别", "逻辑推断链路"],
  },
  {
    title: "行为标签",
    items: ["停留时长", "修改次数", "高亮使用率"],
  },
];

const weaknessData = [
  { name: "快速定位", score: 82 },
  { name: "同义替换", score: 65 },
  { name: "逻辑推断", score: 41 },
  { name: "细节复核", score: 57 },
];

const dailyPlan = [
  "弱项练习：听力数字/地址 10 分钟专项",
  "高频同义词：increase ⇄ surge / boost / escalate",
  "高频同义词：difficult ⇄ challenging / demanding / tough",
  "高频同义词：important ⇄ critical / essential / significant",
  "高难度精听：Section 4 科研讲座（8 分钟）",
];

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="w-full max-w-4xl mt-8 px-4 md:px-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.2 }}
    >
      <div className="rounded-3xl border border-zinc-200/70 bg-muted/40 p-6 md:p-8 shadow-sm dark:border-zinc-700/70">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            IELTS Digital Diagnostic Room
          </p>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            雅思数字诊疗室：从刷题走向数据驱动闭环
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            你只需要先把 API 填进去，系统就能开始给你做“诊断 + 推题 + 每日计划”。
          </p>
          <ProviderSettingsSheet />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl bg-background/70 p-4">
            <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              1) 多维标签体系（数据抓手）
            </h2>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {tagBuckets.map((bucket) => (
                <div key={bucket.title}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {bucket.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bucket.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-zinc-200/70 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-background/70 p-4">
            <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              2) 痛点诊断看板（数据可视化）
            </h2>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              {weaknessData.map((metric) => (
                <div key={metric.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>{metric.name}</span>
                    <span>{metric.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="rounded-lg border border-amber-400/60 bg-amber-100/60 px-3 py-2 text-xs text-amber-800 dark:border-amber-500/60 dark:bg-amber-950/40 dark:text-amber-200">
                遗忘曲线预警：过去 7 天内错过 3 次的词汇 “mitigate /
                accumulate” 需今日复盘。
              </p>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
                模拟 Band Score：6.5（±0.3）
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-background/70 p-4">
            <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              3) 智能推题引擎（痛点训练）
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <li>• 错题变形练：基于历史 paraphrasing 自动生成填空新题。</li>
              <li>• 弱项强化包：连续 2 次听力数字题失误后触发强制特训。</li>
              <li>• 难度阶梯化：某题型正确率 ≥ 80% 自动解锁 9 分达人模拟题。</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-background/70 p-4">
            <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              4) 动态学习路径（Actionable Insights）
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {dailyPlan.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg border border-emerald-400/50 bg-emerald-100/60 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200">
              AI 深度解析已准备：针对你反复错误的“逻辑推断题”，系统将生成中文逐句拆解方案。
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

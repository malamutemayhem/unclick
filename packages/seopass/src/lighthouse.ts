import type { SeoPassPack } from "./schema.js";

export interface LighthousePluginPlan {
  runner: "lighthouse";
  target_url: string;
  strategy: "mobile" | "desktop";
  categories: string[];
  output: ["json"];
  notes: string[];
}

export function buildLighthousePlan(pack: SeoPassPack): LighthousePluginPlan {
  return {
    runner: "lighthouse",
    target_url: pack.url,
    strategy: pack.lighthouse.strategy,
    categories: pack.lighthouse.categories,
    output: ["json"],
    notes: [
      "This builds the heavier Lighthouse execution plan for SEOPass.",
      "seopass_run already emits a live-readonly deterministic verdict; this lane is for full Lighthouse evidence when available.",
    ],
  };
}

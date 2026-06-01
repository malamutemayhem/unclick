// Typed access to the generated Apps catalog (src/data/app-catalog.generated.json).
// One source of truth for the public Apps page AND the admin Apps page.
// Regenerate with: node scripts/generate-app-catalog.mjs

import catalog from "@/data/app-catalog.generated.json";

export interface AppTool {
  name: string;
  description: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  toolCount: number;
  tools: AppTool[];
  level: number | null;
  hardened: boolean;
}

export const APP_CATALOG: AppEntry[] = catalog.apps as AppEntry[];
export const APP_CATEGORIES: string[] = catalog.categories as string[];
export const APP_COUNT: number = catalog.appCount as number;
export const TOOL_COUNT: number = catalog.toolCount as number;

export function getApp(slug: string): AppEntry | undefined {
  return APP_CATALOG.find((a) => a.slug === slug);
}

// Simple-English label for the depth-ladder quality level. Only L5 ("Smart") is
// surfaced as a badge; the rest are plain so the library does not read like a
// developer report card.
export const LEVEL_LABEL: Record<number, string> = {
  5: "Smart",
  4: "Proactive",
  3: "Remembers",
  2: "Reliable",
  1: "Basic",
};

export function levelLabel(level: number | null): string {
  return level ? LEVEL_LABEL[level] ?? "" : "";
}

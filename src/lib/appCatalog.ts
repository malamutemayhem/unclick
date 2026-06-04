// Typed access to the generated Apps catalog (src/data/app-catalog.generated.json).
// One source of truth for the public Apps page AND the admin Apps page.
// Regenerate with: node scripts/generate-app-catalog.mjs

import catalog from "@/data/app-catalog.generated.json";

export interface AppTool {
  name: string;
  description: string;
  /** Optional curated, human-friendly label. Falls back to actionLabel(name). */
  label?: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  domain: string | null;
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

// Tokens that read better fully upper-cased in an auto-generated Action label.
const ACRONYMS = new Set([
  "abn", "acn", "ip", "api", "url", "id", "uuid", "bmi", "faq", "seo", "sms",
  "ai", "css", "html", "json", "csv", "pdf", "dns", "ssl", "cve", "cvss",
  "nba", "nfl", "nhl", "mlb", "f1", "tv", "eta", "qr", "vat", "gst", "abv",
]);

// Clean, human-friendly label for one Action, derived from its raw tool name:
// drop the app prefix, turn underscores into spaces, sentence-case, and
// upper-case known acronyms. A curated `label` on the action always wins.
// e.g. "crypto_trending" -> "Trending", "chess_player_stats" -> "Player stats",
//      "calc_bmi" -> "BMI", "abn_lookup" -> "Lookup".
export function actionLabel(tool: { name: string; label?: string }): string {
  if (tool.label) return tool.label;
  const parts = tool.name.split("_");
  if (parts.length > 1) parts.shift(); // drop the app prefix (abn_, calc_, crypto_, ...)
  if (parts.length === 0) return tool.name;
  const words = parts.map((w, i) => {
    if (ACRONYMS.has(w.toLowerCase())) return w.toUpperCase();
    if (i === 0) return w.charAt(0).toUpperCase() + w.slice(1);
    return w;
  });
  return words.join(" ");
}

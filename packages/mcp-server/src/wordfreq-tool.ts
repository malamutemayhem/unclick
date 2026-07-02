import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function wordfreqAnalyse(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const caseSensitive = args.case_sensitive === true;
  const topN = typeof args.top === "number" && args.top > 0 ? args.top : 0;

  const words = text.match(/[\w'-]+/g) || [];
  const freq: Record<string, number> = {};
  for (const w of words) {
    const key = caseSensitive ? w : w.toLowerCase();
    freq[key] = (freq[key] || 0) + 1;
  }

  let sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (topN > 0) sorted = sorted.slice(0, topN);

  const result = {
    total_words: words.length,
    unique_words: Object.keys(freq).length,
    frequencies: Object.fromEntries(sorted),
    top_word: sorted.length > 0 ? sorted[0][0] : null,
  };

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Filter by top N with the top parameter", "Enable case_sensitive for exact matching"],
  };
  return stampMeta(result, meta);
}

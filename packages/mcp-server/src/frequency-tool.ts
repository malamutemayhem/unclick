import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function frequencyAnalyse(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const mode = args.mode === "bigram" ? "bigram" : "character";

  const freq: Record<string, number> = {};
  if (mode === "character") {
    for (const ch of text) {
      const key = ch === " " ? "<space>" : ch === "\n" ? "<newline>" : ch === "\t" ? "<tab>" : ch;
      freq[key] = (freq[key] || 0) + 1;
    }
  } else {
    const words = text.toLowerCase().match(/[\w'-]+/g) || [];
    for (let i = 0; i < words.length - 1; i++) {
      const key = words[i] + " " + words[i + 1];
      freq[key] = (freq[key] || 0) + 1;
    }
  }

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const topN = typeof args.top === "number" && args.top > 0 ? args.top : 10;
  const top = sorted.slice(0, topN);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Try mode: bigram for word-pair frequencies", "Adjust top for more/fewer results"],
  };
  return stampMeta({
    mode,
    total_entries: sorted.length,
    top: Object.fromEntries(top),
  }, meta);
}

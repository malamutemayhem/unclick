import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function ngramExtract(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const n = typeof args.n === "number" && args.n >= 1 ? Math.floor(args.n) : 2;
  const mode = args.mode === "character" ? "character" : "word";

  const ngrams: Record<string, number> = {};

  if (mode === "word") {
    const words = text.toLowerCase().match(/[\w'-]+/g) || [];
    for (let i = 0; i <= words.length - n; i++) {
      const gram = words.slice(i, i + n).join(" ");
      ngrams[gram] = (ngrams[gram] || 0) + 1;
    }
  } else {
    const chars = [...text.toLowerCase()];
    for (let i = 0; i <= chars.length - n; i++) {
      const gram = chars.slice(i, i + n).join("");
      ngrams[gram] = (ngrams[gram] || 0) + 1;
    }
  }

  const sorted = Object.entries(ngrams).sort((a, b) => b[1] - a[1]);
  const topN = typeof args.top === "number" && args.top > 0 ? args.top : 20;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Try different n values (1=unigram, 2=bigram, 3=trigram)", "Use mode: character for char-level ngrams"],
  };
  return stampMeta({
    n,
    mode,
    total_unique: sorted.length,
    top: Object.fromEntries(sorted.slice(0, topN)),
  }, meta);
}

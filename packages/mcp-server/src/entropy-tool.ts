import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function entropyCalculate(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const freq: Record<string, number> = {};
  for (const ch of text) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  const len = text.length;
  let entropy = 0;
  for (const count of Object.values(freq)) {
    const p = count / len;
    if (p > 0) entropy -= p * Math.log2(p);
  }

  const maxEntropy = Math.log2(Object.keys(freq).length || 1);
  const normalised = maxEntropy > 0 ? entropy / maxEntropy : 0;

  const strength =
    entropy < 2 ? "very_low" :
    entropy < 3 ? "low" :
    entropy < 4 ? "medium" :
    entropy < 5 ? "high" : "very_high";

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Higher entropy means more randomness/information content"],
  };
  return stampMeta({
    entropy: +entropy.toFixed(4),
    max_entropy: +maxEntropy.toFixed(4),
    normalised: +normalised.toFixed(4),
    unique_chars: Object.keys(freq).length,
    length: len,
    strength,
  }, meta);
}

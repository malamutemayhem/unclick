import { stampMeta } from "./connector-meta.js";

export async function charFrequency(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) return { error: "text is required" };
  const caseSensitive = args.case_sensitive === true;
  const input = caseSensitive ? text : text.toLowerCase();
  const freq: Record<string, number> = {};
  for (const ch of input) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50);
  const letters = text.replace(/[^a-zA-Z]/g, "").length;
  const digits = text.replace(/[^0-9]/g, "").length;
  const spaces = text.replace(/[^ ]/g, "").length;
  const special = text.length - letters - digits - spaces;
  return stampMeta({
    total_characters: text.length,
    breakdown: { letters, digits, spaces, special },
    top_characters: Object.fromEntries(sorted),
    unique_characters: Object.keys(freq).length,
    case_sensitive: caseSensitive,
  }, {
    source: "local character frequency analyzer",
    fetched_at: new Date().toISOString(),
    next_steps: ["use case_sensitive: true to distinguish upper/lower", "check top_characters for most common characters"],
  });
}

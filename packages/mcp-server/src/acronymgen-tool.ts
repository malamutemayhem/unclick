import { stampMeta } from "./connector-meta.js";

export async function acronymGenerate(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const skipWords = new Set(["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "is", "it"]);
  const includeSmall = args.include_small_words === true;
  const words = text.split(/\s+/).filter(Boolean);
  const allAcronym = words.map(w => w[0].toUpperCase()).join("");
  const filteredWords = includeSmall ? words : words.filter((w, i) => i === 0 || !skipWords.has(w.toLowerCase()));
  const acronym = filteredWords.map(w => w[0].toUpperCase()).join("");
  return stampMeta({
    text,
    acronym,
    full_acronym: allAcronym,
    word_count: words.length,
    included_words: filteredWords.length,
    skipped_small_words: !includeSmall,
  }, {
    source: "local acronym generator",
    fetched_at: new Date().toISOString(),
    next_steps: ["acronym skips common small words by default", "set include_small_words: true to include all words"],
  });
}

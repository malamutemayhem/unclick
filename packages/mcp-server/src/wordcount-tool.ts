import { stampMeta } from "./connector-meta.js";

export async function wordCount(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) return { error: "text is required" };
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const avgWordLength = words.length > 0 ? +(charsNoSpaces / words.length).toFixed(1) : 0;
  const readingTimeMinutes = +(words.length / 200).toFixed(1);
  return stampMeta({
    words: words.length,
    characters: chars,
    characters_no_spaces: charsNoSpaces,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    avg_word_length: avgWordLength,
    reading_time_minutes: readingTimeMinutes,
  }, {
    source: "local word counter",
    fetched_at: new Date().toISOString(),
    next_steps: ["reading_time_minutes assumes 200 wpm", "check avg_word_length for readability"],
  });
}

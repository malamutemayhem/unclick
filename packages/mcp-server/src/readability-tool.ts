import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 2) return 1;
  let count = 0;
  const vowels = "aeiouy";
  let prevVowel = false;
  for (const ch of w) {
    const isVowel = vowels.includes(ch);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  if (w.endsWith("e") && count > 1) count--;
  return Math.max(count, 1);
}

export async function readabilityScore(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.match(/[\w'-]+/g) || [];
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const sentenceCount = Math.max(sentences.length, 1);
  const wordCount = words.length;

  const fleschKincaid = 0.39 * (wordCount / sentenceCount)
    + 11.8 * (syllables / wordCount)
    - 15.59;

  const fleschEase = 206.835
    - 1.015 * (wordCount / sentenceCount)
    - 84.6 * (syllables / wordCount);

  const avgWordsPerSentence = +(wordCount / sentenceCount).toFixed(1);
  const avgSyllablesPerWord = +(syllables / wordCount).toFixed(2);

  const level =
    fleschKincaid <= 5 ? "elementary" :
    fleschKincaid <= 8 ? "middle_school" :
    fleschKincaid <= 12 ? "high_school" :
    fleschKincaid <= 16 ? "college" : "graduate";

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Lower Flesch-Kincaid grade = easier to read"],
  };
  return stampMeta({
    flesch_kincaid_grade: +fleschKincaid.toFixed(1),
    flesch_ease: +fleschEase.toFixed(1),
    sentences: sentenceCount,
    words: wordCount,
    syllables,
    avg_words_per_sentence: avgWordsPerSentence,
    avg_syllables_per_word: avgSyllablesPerWord,
    reading_level: level,
  }, meta);
}

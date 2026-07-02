import { stampMeta } from "./connector-meta.js";

function syllableCount(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
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

export async function textReadability(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const wordCount = words.length;
  const sentenceCount = Math.max(sentences.length, 1);
  const totalSyllables = words.reduce((sum, w) => sum + syllableCount(w), 0);
  const avgWordsPerSentence = +(wordCount / sentenceCount).toFixed(1);
  const avgSyllablesPerWord = +(totalSyllables / Math.max(wordCount, 1)).toFixed(2);
  const fleschKincaid = +(0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59).toFixed(1);
  const fleschReadingEase = +(206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord).toFixed(1);
  let readingLevel: string;
  if (fleschReadingEase >= 90) readingLevel = "Very Easy (5th grade)";
  else if (fleschReadingEase >= 80) readingLevel = "Easy (6th grade)";
  else if (fleschReadingEase >= 70) readingLevel = "Fairly Easy (7th grade)";
  else if (fleschReadingEase >= 60) readingLevel = "Standard (8th-9th grade)";
  else if (fleschReadingEase >= 50) readingLevel = "Fairly Difficult (10th-12th grade)";
  else if (fleschReadingEase >= 30) readingLevel = "Difficult (College)";
  else readingLevel = "Very Difficult (Graduate)";
  return stampMeta({
    word_count: wordCount,
    sentence_count: sentenceCount,
    syllable_count: totalSyllables,
    avg_words_per_sentence: avgWordsPerSentence,
    avg_syllables_per_word: avgSyllablesPerWord,
    flesch_kincaid_grade: fleschKincaid,
    flesch_reading_ease: fleschReadingEase,
    reading_level: readingLevel,
  }, {
    source: "local readability analyzer",
    fetched_at: new Date().toISOString(),
    next_steps: ["flesch_reading_ease 60-70 is standard", "flesch_kincaid_grade approximates US grade level"],
  });
}

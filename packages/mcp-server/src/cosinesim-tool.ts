import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function cosinesimCompare(args: Record<string, unknown>) {
  const textA = typeof args.text_a === "string" ? args.text_a.trim() : "";
  const textB = typeof args.text_b === "string" ? args.text_b.trim() : "";
  if (!textA || !textB) return { error: "Both text_a and text_b are required" };

  const wordsA = textA.toLowerCase().match(/[\w'-]+/g) || [];
  const wordsB = textB.toLowerCase().match(/[\w'-]+/g) || [];

  const freqA: Record<string, number> = {};
  const freqB: Record<string, number> = {};
  for (const w of wordsA) freqA[w] = (freqA[w] || 0) + 1;
  for (const w of wordsB) freqB[w] = (freqB[w] || 0) + 1;

  const allWords = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;
  for (const word of allWords) {
    const a = freqA[word] || 0;
    const b = freqB[word] || 0;
    dotProduct += a * b;
    magA += a * a;
    magB += b * b;
  }

  const magnitude = Math.sqrt(magA) * Math.sqrt(magB);
  const similarity = magnitude > 0 ? dotProduct / magnitude : 0;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["1.0 = identical word distribution, 0.0 = no shared words"],
  };
  return stampMeta({
    similarity: +similarity.toFixed(4),
    dot_product: dotProduct,
    vocabulary_size: allWords.size,
    words_a: wordsA.length,
    words_b: wordsB.length,
  }, meta);
}

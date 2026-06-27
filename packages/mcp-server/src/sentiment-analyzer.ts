const POSITIVE_WORDS = new Set([
  "good", "great", "excellent", "amazing", "wonderful", "fantastic", "love",
  "happy", "joy", "beautiful", "perfect", "awesome", "brilliant", "outstanding",
  "positive", "best", "like", "nice", "pleasant", "superb", "terrific",
]);

const NEGATIVE_WORDS = new Set([
  "bad", "terrible", "horrible", "awful", "hate", "worst", "poor",
  "ugly", "sad", "angry", "negative", "disappointing", "disgusting",
  "dreadful", "miserable", "pathetic", "useless", "annoying", "boring",
]);

const INTENSIFIERS = new Set(["very", "really", "extremely", "incredibly", "absolutely"]);
const NEGATORS = new Set(["not", "no", "never", "neither", "nobody", "nothing", "hardly"]);

export interface SentimentResult {
  score: number;
  label: "positive" | "negative" | "neutral";
  positive: number;
  negative: number;
  words: { word: string; score: number }[];
}

export function analyzeSentiment(text: string): SentimentResult {
  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
  const words: { word: string; score: number }[] = [];
  let positive = 0;
  let negative = 0;
  let negate = false;
  let intensify = false;

  for (const token of tokens) {
    const clean = token.replace(/[^a-z]/g, "");
    if (NEGATORS.has(clean)) { negate = true; continue; }
    if (INTENSIFIERS.has(clean)) { intensify = true; continue; }

    let score = 0;
    if (POSITIVE_WORDS.has(clean)) score = 1;
    else if (NEGATIVE_WORDS.has(clean)) score = -1;

    if (score !== 0) {
      if (intensify) score *= 1.5;
      if (negate) score *= -1;
      words.push({ word: clean, score });
      if (score > 0) positive += score;
      else negative += Math.abs(score);
    }

    negate = false;
    intensify = false;
  }

  const total = positive + negative;
  const rawScore = total > 0 ? (positive - negative) / total : 0;
  const label = rawScore > 0.1 ? "positive" : rawScore < -0.1 ? "negative" : "neutral";

  return { score: rawScore, label, positive, negative, words };
}

export function compareSentiment(texts: string[]): Array<{ text: string; result: SentimentResult }> {
  return texts.map((text) => ({ text, result: analyzeSentiment(text) }));
}

export function averageSentiment(texts: string[]): number {
  if (texts.length === 0) return 0;
  const total = texts.reduce((sum, t) => sum + analyzeSentiment(t).score, 0);
  return total / texts.length;
}

export interface FuzzyResult {
  item: string;
  score: number;
  matches: number[];
}

export function fuzzyMatch(pattern: string, text: string): FuzzyResult | null {
  const pLower = pattern.toLowerCase();
  const tLower = text.toLowerCase();
  const matches: number[] = [];
  let pi = 0;

  for (let ti = 0; ti < tLower.length && pi < pLower.length; ti++) {
    if (tLower[ti] === pLower[pi]) {
      matches.push(ti);
      pi++;
    }
  }

  if (pi !== pLower.length) return null;

  const score = computeScore(pattern, text, matches);
  return { item: text, score, matches };
}

export function fuzzySearch(pattern: string, items: string[], limit?: number): FuzzyResult[] {
  const results: FuzzyResult[] = [];
  for (const item of items) {
    const result = fuzzyMatch(pattern, item);
    if (result) results.push(result);
  }
  results.sort((a, b) => b.score - a.score);
  return limit ? results.slice(0, limit) : results;
}

export function fuzzyFilter<T>(
  pattern: string,
  items: T[],
  accessor: (item: T) => string
): (T & { _fuzzyScore: number })[] {
  const results: (T & { _fuzzyScore: number })[] = [];
  for (const item of items) {
    const text = accessor(item);
    const match = fuzzyMatch(pattern, text);
    if (match) results.push({ ...item, _fuzzyScore: match.score });
  }
  return results.sort((a, b) => b._fuzzyScore - a._fuzzyScore);
}

function computeScore(pattern: string, text: string, matches: number[]): number {
  let score = 0;
  const pLen = pattern.length;
  const tLen = text.length;

  score += (pLen / tLen) * 100;

  for (let i = 0; i < matches.length; i++) {
    if (matches[i] === 0) score += 15;
    if (i > 0 && matches[i] === matches[i - 1] + 1) score += 10;
    if (matches[i] > 0 && /[\s_\-.]/.test(text[matches[i] - 1])) score += 10;
    if (text[matches[i]] === pattern[i]) score += 5;
  }

  return score;
}

export function highlight(text: string, matches: number[], open = "<b>", close = "</b>"): string {
  const chars = text.split("");
  const matchSet = new Set(matches);
  let result = "";
  let inHighlight = false;

  for (let i = 0; i < chars.length; i++) {
    if (matchSet.has(i) && !inHighlight) {
      result += open;
      inHighlight = true;
    } else if (!matchSet.has(i) && inHighlight) {
      result += close;
      inHighlight = false;
    }
    result += chars[i];
  }
  if (inHighlight) result += close;

  return result;
}

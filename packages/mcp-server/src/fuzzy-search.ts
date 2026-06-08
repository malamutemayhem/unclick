export interface FuzzyMatch<T = string> {
  item: T;
  score: number;
  matches: [number, number][];
}

export function fuzzyScore(query: string, target: string): { score: number; matches: [number, number][] } {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  if (q.length === 0) return { score: 0, matches: [] };
  if (q.length > t.length) return { score: 0, matches: [] };

  let qi = 0;
  let score = 0;
  const matches: [number, number][] = [];
  let currentStart = -1;
  let consecutive = 0;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (currentStart === -1) currentStart = ti;
      consecutive++;
      score += 1 + consecutive;

      if (ti === 0 || /[^a-zA-Z0-9]/.test(target[ti - 1])) {
        score += 5;
      }
      if (target[ti] === query[qi]) {
        score += 1;
      }

      qi++;
    } else {
      if (currentStart !== -1) {
        matches.push([currentStart, ti - 1]);
        currentStart = -1;
        consecutive = 0;
      }
    }
  }

  if (currentStart !== -1) {
    matches.push([currentStart, matches.length > 0 ? currentStart + consecutive - 1 : currentStart + consecutive - 1]);
  }

  if (qi < q.length) return { score: 0, matches: [] };

  const lengthPenalty = (t.length - q.length) * 0.1;
  score = Math.max(0, score - lengthPenalty);

  return { score, matches };
}

export function fuzzySearch<T>(
  query: string,
  items: T[],
  accessor: (item: T) => string = (item) => String(item),
  minScore = 0,
): FuzzyMatch<T>[] {
  const results: FuzzyMatch<T>[] = [];

  for (const item of items) {
    const target = accessor(item);
    const { score, matches } = fuzzyScore(query, target);
    if (score > minScore) {
      results.push({ item, score, matches });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function highlight(text: string, matches: [number, number][], open = "<b>", close = "</b>"): string {
  if (matches.length === 0) return text;

  const chars = text.split("");
  const marked = new Set<number>();
  for (const [start, end] of matches) {
    for (let i = start; i <= end; i++) marked.add(i);
  }

  let result = "";
  let inHighlight = false;
  for (let i = 0; i < chars.length; i++) {
    if (marked.has(i) && !inHighlight) {
      result += open;
      inHighlight = true;
    } else if (!marked.has(i) && inHighlight) {
      result += close;
      inHighlight = false;
    }
    result += chars[i];
  }
  if (inHighlight) result += close;

  return result;
}

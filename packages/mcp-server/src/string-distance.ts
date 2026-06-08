// String similarity and distance functions.
// Useful for fuzzy matching tool names, connector names, and
// suggesting "did you mean?" corrections when an agent misspells.

// Levenshtein edit distance between two strings.
export function levenshtein(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const matrix: number[][] = [];

  for (let i = 0; i <= aLen; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bLen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[aLen][bLen];
}

// Similarity score between 0 and 1 (1 = identical).
export function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

// Find the best matches from a list of candidates.
export function findClosest(
  input: string,
  candidates: readonly string[],
  opts: { maxResults?: number; minSimilarity?: number } = {},
): Array<{ value: string; similarity: number; distance: number }> {
  const maxResults = opts.maxResults ?? 3;
  const minSimilarity = opts.minSimilarity ?? 0.3;
  const lower = input.toLowerCase();

  const scored = candidates
    .map((c) => {
      const sim = similarity(lower, c.toLowerCase());
      return { value: c, similarity: sim, distance: levenshtein(lower, c.toLowerCase()) };
    })
    .filter((s) => s.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, maxResults);
}

// "Did you mean?" suggestion helper.
export function didYouMean(input: string, candidates: readonly string[]): string | undefined {
  const matches = findClosest(input, candidates, { maxResults: 1, minSimilarity: 0.5 });
  return matches.length > 0 ? matches[0].value : undefined;
}

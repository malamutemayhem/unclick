export function fuzzyMatch(query: string, target: string): { match: boolean; score: number } {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  if (q.length === 0) return { match: true, score: 0 };
  if (q.length > t.length) return { match: false, score: 0 };

  let qi = 0;
  let score = 0;
  let consecutive = 0;
  let prevMatchIdx = -2;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 1;
      if (ti === prevMatchIdx + 1) {
        consecutive++;
        score += consecutive * 2;
      } else {
        consecutive = 0;
      }
      if (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "_" || t[ti - 1] === "-" || t[ti - 1] === "/") {
        score += 5;
      }
      prevMatchIdx = ti;
      qi++;
    }
  }

  const match = qi === q.length;
  if (match) {
    score += (q.length / t.length) * 10;
  }

  return { match, score: match ? score : 0 };
}

export function fuzzySearch<T>(query: string, items: T[], accessor: (item: T) => string): Array<{ item: T; score: number }> {
  const results: Array<{ item: T; score: number }> = [];
  for (const item of items) {
    const { match, score } = fuzzyMatch(query, accessor(item));
    if (match) results.push({ item, score });
  }
  return results.sort((a, b) => b.score - a.score);
}

export function bestMatch<T>(query: string, items: T[], accessor: (item: T) => string): T | undefined {
  const results = fuzzySearch(query, items, accessor);
  return results[0]?.item;
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

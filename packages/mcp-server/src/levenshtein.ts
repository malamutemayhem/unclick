export function distance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = new Array(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return curr[b.length];
}

export function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - distance(a, b) / maxLen;
}

export function closestMatch(query: string, candidates: string[]): { match: string; distance: number } | undefined {
  if (candidates.length === 0) return undefined;
  let bestMatch = candidates[0];
  let bestDist = distance(query, candidates[0]);
  for (let i = 1; i < candidates.length; i++) {
    const d = distance(query, candidates[i]);
    if (d < bestDist) {
      bestDist = d;
      bestMatch = candidates[i];
    }
  }
  return { match: bestMatch, distance: bestDist };
}

export function fuzzySearch(query: string, candidates: string[], maxDistance = 2): Array<{ item: string; distance: number }> {
  return candidates
    .map((item) => ({ item, distance: distance(query, item) }))
    .filter((r) => r.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
}

export interface ScoredItem<T> {
  item: T;
  score: number;
}

export interface RankedResult<T> {
  item: T;
  fusedScore: number;
  ranks: number[];
}

export function reciprocalRankFusion<T>(
  rankedLists: T[][],
  k = 60,
  getId: (item: T) => string = (item) => String(item),
): RankedResult<T>[] {
  const scores = new Map<string, { item: T; fusedScore: number; ranks: number[] }>();

  for (let listIdx = 0; listIdx < rankedLists.length; listIdx++) {
    const list = rankedLists[listIdx];
    for (let rank = 0; rank < list.length; rank++) {
      const item = list[rank];
      const id = getId(item);
      const rrf = 1 / (k + rank + 1);
      const existing = scores.get(id);
      if (existing) {
        existing.fusedScore += rrf;
        existing.ranks[listIdx] = rank + 1;
      } else {
        const ranks = new Array<number>(rankedLists.length).fill(0);
        ranks[listIdx] = rank + 1;
        scores.set(id, { item, fusedScore: rrf, ranks });
      }
    }
  }

  return [...scores.values()].sort((a, b) => b.fusedScore - a.fusedScore);
}

export function weightedFusion<T>(
  scoredLists: ScoredItem<T>[][],
  weights: number[],
  getId: (item: T) => string = (item) => String(item),
): ScoredItem<T>[] {
  if (scoredLists.length !== weights.length) {
    throw new Error("Weights must match number of scored lists");
  }

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const normalizedWeights = weights.map((w) => w / totalWeight);

  const combined = new Map<string, { item: T; score: number }>();

  for (let i = 0; i < scoredLists.length; i++) {
    for (const { item, score } of scoredLists[i]) {
      const id = getId(item);
      const weighted = score * normalizedWeights[i];
      const existing = combined.get(id);
      if (existing) {
        existing.score += weighted;
      } else {
        combined.set(id, { item, score: weighted });
      }
    }
  }

  return [...combined.values()].sort((a, b) => b.score - a.score);
}

export function combineScores(scores: number[], strategy: "max" | "avg" | "sum" | "min" = "avg"): number {
  if (scores.length === 0) return 0;
  switch (strategy) {
    case "max": return Math.max(...scores);
    case "min": return Math.min(...scores);
    case "sum": return scores.reduce((a, b) => a + b, 0);
    case "avg": return scores.reduce((a, b) => a + b, 0) / scores.length;
  }
}

export function normalizeScores<T>(items: ScoredItem<T>[]): ScoredItem<T>[] {
  if (items.length === 0) return [];
  const max = Math.max(...items.map((i) => i.score));
  const min = Math.min(...items.map((i) => i.score));
  const range = max - min;
  if (range === 0) return items.map((i) => ({ ...i, score: 1 }));
  return items.map((i) => ({ ...i, score: (i.score - min) / range }));
}

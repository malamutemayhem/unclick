export type DecayFunction = (ageMs: number) => number;

export function exponentialDecay(halfLifeMs: number): DecayFunction {
  const lambda = Math.LN2 / halfLifeMs;
  return (ageMs) => Math.exp(-lambda * ageMs);
}

export function linearDecay(maxAgeMs: number): DecayFunction {
  return (ageMs) => Math.max(0, 1 - ageMs / maxAgeMs);
}

export function stepDecay(thresholds: Array<{ ageMs: number; score: number }>): DecayFunction {
  const sorted = [...thresholds].sort((a, b) => a.ageMs - b.ageMs);
  return (ageMs) => {
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (ageMs >= sorted[i].ageMs) return sorted[i].score;
    }
    return 1;
  };
}

export function noDecay(): DecayFunction {
  return () => 1;
}

export interface ScoredEntry<T> {
  item: T;
  baseScore: number;
  timestamp: number;
}

export function applyDecay<T>(entries: ScoredEntry<T>[], decay: DecayFunction, now = Date.now()): Array<{ item: T; score: number; decayFactor: number }> {
  return entries.map((e) => {
    const age = now - e.timestamp;
    const factor = decay(age);
    return { item: e.item, score: e.baseScore * factor, decayFactor: factor };
  });
}

export function rankByRecency<T>(entries: ScoredEntry<T>[], decay: DecayFunction, now = Date.now()): Array<{ item: T; score: number }> {
  return applyDecay(entries, decay, now)
    .sort((a, b) => b.score - a.score)
    .map(({ item, score }) => ({ item, score }));
}

export function filterStale<T>(entries: ScoredEntry<T>[], decay: DecayFunction, minScore = 0.01, now = Date.now()): ScoredEntry<T>[] {
  return entries.filter((e) => {
    const age = now - e.timestamp;
    return decay(age) * e.baseScore >= minScore;
  });
}

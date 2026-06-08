export function weightedRandom<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function weightedSample<T>(items: T[], weights: number[], count: number): T[] {
  const result: T[] = [];
  const remaining = [...items];
  const remainingWeights = [...weights];
  for (let i = 0; i < count && remaining.length > 0; i++) {
    const total = remainingWeights.reduce((sum, w) => sum + w, 0);
    let r = Math.random() * total;
    let idx = 0;
    for (idx = 0; idx < remaining.length; idx++) {
      r -= remainingWeights[idx];
      if (r <= 0) break;
    }
    result.push(remaining[idx]);
    remaining.splice(idx, 1);
    remainingWeights.splice(idx, 1);
  }
  return result;
}

export class WeightedPool<T> {
  private items: T[] = [];
  private weights: number[] = [];

  add(item: T, weight: number): void {
    this.items.push(item);
    this.weights.push(weight);
  }

  pick(): T {
    if (this.items.length === 0) throw new Error("Pool is empty");
    return weightedRandom(this.items, this.weights);
  }

  sample(count: number): T[] {
    return weightedSample(this.items, this.weights, count);
  }

  get size(): number {
    return this.items.length;
  }

  totalWeight(): number {
    return this.weights.reduce((sum, w) => sum + w, 0);
  }

  clear(): void {
    this.items = [];
    this.weights = [];
  }
}

export function normalizeWeights(weights: number[]): number[] {
  const total = weights.reduce((sum, w) => sum + w, 0);
  if (total === 0) return weights.map(() => 0);
  return weights.map((w) => w / total);
}

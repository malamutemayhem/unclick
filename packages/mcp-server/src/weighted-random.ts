export interface WeightedItem<T> {
  item: T;
  weight: number;
}

export function weightedRandom<T>(items: WeightedItem<T>[]): T {
  if (items.length === 0) throw new Error("Items array is empty");
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  if (total <= 0) throw new Error("Total weight must be positive");
  let r = Math.random() * total;
  for (const { item, weight } of items) {
    r -= weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1].item;
}

export function weightedRandomWithSeed<T>(items: WeightedItem<T>[], seed: number): T {
  if (items.length === 0) throw new Error("Items array is empty");
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  if (total <= 0) throw new Error("Total weight must be positive");
  let r = seededRandom(seed) * total;
  for (const { item, weight } of items) {
    r -= weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1].item;
}

export function normalizeWeights<T>(items: WeightedItem<T>[]): WeightedItem<T>[] {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  if (total === 0) return items.map((i) => ({ ...i, weight: 0 }));
  return items.map((i) => ({ item: i.item, weight: i.weight / total }));
}

export function weightedSample<T>(items: WeightedItem<T>[], count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(weightedRandom(items));
  }
  return result;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface WeightedItem<T> {
  value: T;
  weight: number;
}

export function weightedRandom<T>(items: WeightedItem<T>[]): T {
  if (items.length === 0) throw new Error("Empty items");
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) throw new Error("Total weight must be positive");
  let r = Math.random() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

export function weightedRandomWithSeed<T>(
  items: WeightedItem<T>[],
  rand: () => number
): T {
  if (items.length === 0) throw new Error("Empty items");
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) throw new Error("Total weight must be positive");
  let r = rand() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

export function buildCdf<T>(items: WeightedItem<T>[]): { values: T[]; cdf: number[] } {
  if (items.length === 0) throw new Error("Empty items");
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) throw new Error("Total weight must be positive");
  const values: T[] = [];
  const cdf: number[] = [];
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight / total;
    values.push(item.value);
    cdf.push(cumulative);
  }
  cdf[cdf.length - 1] = 1;
  return { values, cdf };
}

export function sampleCdf<T>(cdf: { values: T[]; cdf: number[] }, rand?: () => number): T {
  const r = (rand ?? Math.random)();
  for (let i = 0; i < cdf.cdf.length; i++) {
    if (r <= cdf.cdf[i]) return cdf.values[i];
  }
  return cdf.values[cdf.values.length - 1];
}

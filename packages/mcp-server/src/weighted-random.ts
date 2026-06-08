export interface WeightedItem<T> {
  value: T;
  weight: number;
}

export function weightedRandom<T>(items: WeightedItem<T>[]): T {
  if (items.length === 0) throw new Error("Cannot select from empty list");
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) throw new Error("Total weight must be positive");

  let random = Math.random() * totalWeight;
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

export function weightedSample<T>(items: WeightedItem<T>[], count: number): T[] {
  if (count <= 0) return [];
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(weightedRandom(items));
  }
  return result;
}

export function normalizeWeights<T>(items: WeightedItem<T>[]): WeightedItem<T>[] {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total === 0) return items.map((item) => ({ ...item, weight: 1 / items.length }));
  return items.map((item) => ({ ...item, weight: item.weight / total }));
}

export function cumulativeWeights<T>(items: WeightedItem<T>[]): { value: T; cumulative: number }[] {
  let cumulative = 0;
  return items.map((item) => {
    cumulative += item.weight;
    return { value: item.value, cumulative };
  });
}

export class WeightedPicker<T> {
  private items: WeightedItem<T>[];
  private total: number;

  constructor(items: WeightedItem<T>[]) {
    this.items = [...items];
    this.total = items.reduce((sum, item) => sum + item.weight, 0);
  }

  pick(): T {
    return weightedRandom(this.items);
  }

  add(value: T, weight: number): void {
    this.items.push({ value, weight });
    this.total += weight;
  }

  remove(value: T): boolean {
    const idx = this.items.findIndex((item) => item.value === value);
    if (idx === -1) return false;
    this.total -= this.items[idx].weight;
    this.items.splice(idx, 1);
    return true;
  }

  get size(): number {
    return this.items.length;
  }

  get totalWeight(): number {
    return this.total;
  }
}

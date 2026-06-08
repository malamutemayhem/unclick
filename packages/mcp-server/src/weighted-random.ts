export interface WeightedItem<T> {
  value: T;
  weight: number;
}

export function weightedRandom<T>(items: WeightedItem<T>[]): T {
  if (items.length === 0) throw new Error("Empty items");
  const totalWeight = items.reduce((sum: number, item: WeightedItem<T>) => sum + item.weight, 0);
  if (totalWeight <= 0) throw new Error("Total weight must be positive");
  let random = Math.random() * totalWeight;
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item.value;
  }
  return items[items.length - 1].value;
}

export function weightedSample<T>(items: WeightedItem<T>[], count: number): T[] {
  const results: T[] = [];
  for (let i = 0; i < count; i++) {
    results.push(weightedRandom(items));
  }
  return results;
}

export class WeightedSelector<T> {
  private items: WeightedItem<T>[] = [];
  private totalWeight = 0;
  private cumulativeWeights: number[] = [];

  add(value: T, weight: number): this {
    if (weight <= 0) throw new Error("Weight must be positive");
    this.items.push({ value, weight });
    this.totalWeight += weight;
    this.cumulativeWeights.push(this.totalWeight);
    return this;
  }

  select(): T {
    if (this.items.length === 0) throw new Error("No items");
    const random = Math.random() * this.totalWeight;
    for (let i = 0; i < this.cumulativeWeights.length; i++) {
      if (random <= this.cumulativeWeights[i]) return this.items[i].value;
    }
    return this.items[this.items.length - 1].value;
  }

  get size(): number { return this.items.length; }

  clear(): void {
    this.items = [];
    this.totalWeight = 0;
    this.cumulativeWeights = [];
  }
}

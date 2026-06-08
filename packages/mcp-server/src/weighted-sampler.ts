export interface WeightedItem<T> {
  item: T;
  weight: number;
}

export class WeightedSampler<T> {
  private items: WeightedItem<T>[] = [];
  private totalWeight = 0;

  add(item: T, weight: number): void {
    if (weight <= 0) throw new Error("Weight must be positive");
    this.items.push({ item, weight });
    this.totalWeight += weight;
  }

  sample(): T {
    if (this.items.length === 0) throw new Error("No items to sample");
    let r = Math.random() * this.totalWeight;
    for (const entry of this.items) {
      r -= entry.weight;
      if (r <= 0) return entry.item;
    }
    return this.items[this.items.length - 1].item;
  }

  sampleN(n: number, replace = true): T[] {
    if (this.items.length === 0) throw new Error("No items to sample");
    const results: T[] = [];
    if (replace) {
      for (let i = 0; i < n; i++) results.push(this.sample());
    } else {
      const available = [...this.items];
      let weight = this.totalWeight;
      for (let i = 0; i < Math.min(n, available.length); i++) {
        let r = Math.random() * weight;
        for (let j = 0; j < available.length; j++) {
          r -= available[j].weight;
          if (r <= 0) {
            results.push(available[j].item);
            weight -= available[j].weight;
            available.splice(j, 1);
            break;
          }
        }
      }
    }
    return results;
  }

  probability(item: T): number {
    const entry = this.items.find((e) => e.item === item);
    return entry ? entry.weight / this.totalWeight : 0;
  }

  get size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items.length = 0;
    this.totalWeight = 0;
  }
}

export function weightedChoice<T>(items: T[], weights: number[]): T {
  if (items.length !== weights.length) throw new Error("Items and weights must match");
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

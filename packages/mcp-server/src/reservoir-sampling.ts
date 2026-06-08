export class ReservoirSampler<T> {
  private reservoir: T[];
  private k: number;
  private count: number;

  constructor(size: number) {
    this.k = size;
    this.reservoir = [];
    this.count = 0;
  }

  add(item: T): void {
    this.count++;
    if (this.reservoir.length < this.k) {
      this.reservoir.push(item);
    } else {
      const j = Math.floor(Math.random() * this.count);
      if (j < this.k) {
        this.reservoir[j] = item;
      }
    }
  }

  addAll(items: Iterable<T>): void {
    for (const item of items) {
      this.add(item);
    }
  }

  get sample(): T[] {
    return [...this.reservoir];
  }

  get seen(): number {
    return this.count;
  }

  get capacity(): number {
    return this.k;
  }

  get filled(): boolean {
    return this.reservoir.length >= this.k;
  }

  reset(): void {
    this.reservoir = [];
    this.count = 0;
  }
}

export function sample<T>(items: T[], k: number): T[] {
  const result = items.slice(0, k);
  for (let i = k; i < items.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j < k) {
      result[j] = items[i];
    }
  }
  return result;
}

export function weightedSample<T>(items: T[], weights: number[], k: number): T[] {
  if (items.length !== weights.length) throw new Error("Items and weights must have equal length");
  if (k > items.length) throw new Error("Sample size exceeds population");

  const indexed = items.map((item, i) => ({
    item,
    key: Math.pow(Math.random(), 1 / weights[i]),
  }));

  indexed.sort((a, b) => b.key - a.key);
  return indexed.slice(0, k).map((e) => e.item);
}

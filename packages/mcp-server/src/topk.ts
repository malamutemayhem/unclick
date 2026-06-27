export class TopK<T = string> {
  private counts = new Map<T, number>();
  private k: number;

  constructor(k: number) {
    if (k < 1) throw new Error("k must be at least 1");
    this.k = k;
  }

  add(item: T, count = 1): void {
    this.counts.set(item, (this.counts.get(item) ?? 0) + count);
  }

  top(): Array<{ item: T; count: number }> {
    return [...this.counts.entries()]
      .map(([item, count]) => ({ item, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, this.k);
  }

  getCount(item: T): number {
    return this.counts.get(item) ?? 0;
  }

  get size(): number {
    return this.counts.size;
  }

  reset(): void {
    this.counts.clear();
  }

  merge(other: TopK<T>): void {
    for (const [item, count] of other.counts) {
      this.counts.set(item, (this.counts.get(item) ?? 0) + count);
    }
  }
}

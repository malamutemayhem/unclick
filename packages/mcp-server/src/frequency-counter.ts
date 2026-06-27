export class FrequencyCounter<T = string> {
  private counts = new Map<T, number>();
  private total = 0;

  add(item: T, count = 1): void {
    this.counts.set(item, (this.counts.get(item) ?? 0) + count);
    this.total += count;
  }

  count(item: T): number {
    return this.counts.get(item) ?? 0;
  }

  frequency(item: T): number {
    return this.total > 0 ? this.count(item) / this.total : 0;
  }

  topN(n: number): [T, number][] {
    return [...this.counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);
  }

  bottomN(n: number): [T, number][] {
    return [...this.counts.entries()]
      .sort((a, b) => a[1] - b[1])
      .slice(0, n);
  }

  get uniqueCount(): number {
    return this.counts.size;
  }

  get totalCount(): number {
    return this.total;
  }

  entries(): [T, number][] {
    return [...this.counts.entries()];
  }

  has(item: T): boolean {
    return this.counts.has(item);
  }

  merge(other: FrequencyCounter<T>): FrequencyCounter<T> {
    const result = new FrequencyCounter<T>();
    for (const [item, count] of this.counts) result.add(item, count);
    for (const [item, count] of other.counts) result.add(item, count);
    return result;
  }

  reset(): void {
    this.counts.clear();
    this.total = 0;
  }
}

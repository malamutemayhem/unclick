export interface Interval {
  low: number;
  high: number;
}

export interface IntervalEntry<T> {
  interval: Interval;
  value: T;
}

export class IntervalTree<T> {
  private entries: IntervalEntry<T>[] = [];

  insert(low: number, high: number, value: T): void {
    this.entries.push({ interval: { low, high }, value });
  }

  query(point: number): IntervalEntry<T>[] {
    return this.entries.filter((e) => point >= e.interval.low && point <= e.interval.high);
  }

  queryRange(low: number, high: number): IntervalEntry<T>[] {
    return this.entries.filter(
      (e) => e.interval.low <= high && e.interval.high >= low,
    );
  }

  remove(value: T): boolean {
    const idx = this.entries.findIndex((e) => e.value === value);
    if (idx < 0) return false;
    this.entries.splice(idx, 1);
    return true;
  }

  get length(): number {
    return this.entries.length;
  }

  all(): IntervalEntry<T>[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries = [];
  }

  overlaps(low: number, high: number): boolean {
    return this.entries.some((e) => e.interval.low <= high && e.interval.high >= low);
  }
}

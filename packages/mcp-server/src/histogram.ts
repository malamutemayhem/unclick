export class Histogram {
  private buckets: number[];
  private readonly min: number;
  private readonly max: number;
  private readonly bucketCount: number;
  private readonly bucketWidth: number;
  private totalCount = 0;

  constructor(min: number, max: number, bucketCount: number) {
    this.min = min;
    this.max = max;
    this.bucketCount = bucketCount;
    this.bucketWidth = (max - min) / bucketCount;
    this.buckets = new Array(bucketCount).fill(0) as number[];
  }

  add(value: number): void {
    const idx = Math.min(
      this.bucketCount - 1,
      Math.max(0, Math.floor((value - this.min) / this.bucketWidth)),
    );
    this.buckets[idx]++;
    this.totalCount++;
  }

  addMany(values: number[]): void {
    for (const v of values) this.add(v);
  }

  getBucket(index: number): { start: number; end: number; count: number } {
    return {
      start: this.min + index * this.bucketWidth,
      end: this.min + (index + 1) * this.bucketWidth,
      count: this.buckets[index] ?? 0,
    };
  }

  get count(): number {
    return this.totalCount;
  }

  get maxCount(): number {
    return Math.max(0, ...this.buckets);
  }

  percentile(p: number): number {
    const target = (p / 100) * this.totalCount;
    let cumulative = 0;
    for (let i = 0; i < this.bucketCount; i++) {
      cumulative += this.buckets[i];
      if (cumulative >= target) {
        return this.min + (i + 0.5) * this.bucketWidth;
      }
    }
    return this.max;
  }

  toArray(): Array<{ start: number; end: number; count: number }> {
    return this.buckets.map((_: number, i: number) => this.getBucket(i));
  }

  reset(): void {
    this.buckets.fill(0);
    this.totalCount = 0;
  }

  toString(): string {
    const maxWidth = 40;
    const peak = this.maxCount || 1;
    return this.toArray().map((b) => {
      const bar = "#".repeat(Math.round((b.count / peak) * maxWidth));
      return `[${b.start.toFixed(1)}-${b.end.toFixed(1)}) ${bar} ${b.count}`;
    }).join("\n");
  }
}

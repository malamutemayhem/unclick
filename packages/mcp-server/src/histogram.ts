export class Histogram {
  private buckets: Map<number, number> = new Map();
  private boundaries: number[];
  private total = 0;

  constructor(boundaries: number[]) {
    this.boundaries = [...boundaries].sort((a, b) => a - b);
    for (const b of this.boundaries) {
      this.buckets.set(b, 0);
    }
    this.buckets.set(Infinity, 0);
  }

  observe(value: number): void {
    this.total++;
    for (const boundary of this.boundaries) {
      if (value <= boundary) {
        this.buckets.set(boundary, (this.buckets.get(boundary) ?? 0) + 1);
        return;
      }
    }
    this.buckets.set(Infinity, (this.buckets.get(Infinity) ?? 0) + 1);
  }

  getBucket(boundary: number): number {
    return this.buckets.get(boundary) ?? 0;
  }

  getOverflow(): number {
    return this.buckets.get(Infinity) ?? 0;
  }

  get count(): number {
    return this.total;
  }

  snapshot(): Array<{ le: number | string; count: number }> {
    const result: Array<{ le: number | string; count: number }> = [];
    for (const b of this.boundaries) {
      result.push({ le: b, count: this.buckets.get(b) ?? 0 });
    }
    result.push({ le: "+Inf", count: this.buckets.get(Infinity) ?? 0 });
    return result;
  }

  reset(): void {
    for (const key of this.buckets.keys()) {
      this.buckets.set(key, 0);
    }
    this.total = 0;
  }
}

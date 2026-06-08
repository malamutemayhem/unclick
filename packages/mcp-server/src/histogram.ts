export class Histogram {
  private buckets: Map<number, number> = new Map();
  private _count = 0;
  private _sum = 0;
  private _min = Infinity;
  private _max = -Infinity;
  private readonly boundaries: number[];

  constructor(boundaries: number[]) {
    this.boundaries = [...boundaries].sort((a, b) => a - b);
    for (const b of this.boundaries) this.buckets.set(b, 0);
    this.buckets.set(Infinity, 0);
  }

  record(value: number): void {
    this._count++;
    this._sum += value;
    if (value < this._min) this._min = value;
    if (value > this._max) this._max = value;
    for (const boundary of this.boundaries) {
      if (value <= boundary) {
        this.buckets.set(boundary, (this.buckets.get(boundary) || 0) + 1);
        return;
      }
    }
    this.buckets.set(Infinity, (this.buckets.get(Infinity) || 0) + 1);
  }

  get count(): number { return this._count; }
  get sum(): number { return this._sum; }
  get min(): number { return this._min; }
  get max(): number { return this._max; }
  get mean(): number { return this._count > 0 ? this._sum / this._count : 0; }

  getBuckets(): Array<{ le: number | string; count: number }> {
    return [...this.buckets.entries()].map(([le, count]) => ({
      le: le === Infinity ? "+Inf" : le,
      count,
    }));
  }

  percentile(p: number): number {
    const target = Math.ceil(this._count * (p / 100));
    let cumulative = 0;
    for (const boundary of this.boundaries) {
      cumulative += this.buckets.get(boundary) || 0;
      if (cumulative >= target) return boundary;
    }
    return this._max;
  }

  reset(): void {
    for (const key of this.buckets.keys()) this.buckets.set(key, 0);
    this._count = 0;
    this._sum = 0;
    this._min = Infinity;
    this._max = -Infinity;
  }
}

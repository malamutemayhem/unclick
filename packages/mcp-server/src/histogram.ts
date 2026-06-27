export class Histogram {
  private bucketBounds: number[];
  private counts: number[];
  private totalCount = 0;
  private sum = 0;
  private min = Infinity;
  private max = -Infinity;

  constructor(bucketBounds: number[]) {
    this.bucketBounds = [...bucketBounds].sort((a, b) => a - b);
    this.counts = new Array(this.bucketBounds.length + 1).fill(0);
  }

  observe(value: number): void {
    this.totalCount++;
    this.sum += value;
    if (value < this.min) this.min = value;
    if (value > this.max) this.max = value;
    let idx = this.bucketBounds.length;
    for (let i = 0; i < this.bucketBounds.length; i++) {
      if (value <= this.bucketBounds[i]) {
        idx = i;
        break;
      }
    }
    this.counts[idx]++;
  }

  getBuckets(): { bound: string; count: number }[] {
    const result: { bound: string; count: number }[] = [];
    for (let i = 0; i < this.bucketBounds.length; i++) {
      result.push({ bound: `<=${this.bucketBounds[i]}`, count: this.counts[i] });
    }
    result.push({ bound: `>${this.bucketBounds[this.bucketBounds.length - 1] ?? 0}`, count: this.counts[this.counts.length - 1] });
    return result;
  }

  get count(): number {
    return this.totalCount;
  }

  get average(): number {
    return this.totalCount > 0 ? this.sum / this.totalCount : 0;
  }

  get minimum(): number {
    return this.totalCount > 0 ? this.min : 0;
  }

  get maximum(): number {
    return this.totalCount > 0 ? this.max : 0;
  }

  reset(): void {
    this.counts.fill(0);
    this.totalCount = 0;
    this.sum = 0;
    this.min = Infinity;
    this.max = -Infinity;
  }
}

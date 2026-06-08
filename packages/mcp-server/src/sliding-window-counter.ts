export class SlidingWindowCounter {
  private buckets = new Map<number, number>();
  private readonly windowMs: number;
  private readonly bucketMs: number;

  constructor(windowMs: number, bucketCount = 10) {
    this.windowMs = windowMs;
    this.bucketMs = Math.ceil(windowMs / bucketCount);
  }

  increment(count = 1): void {
    const bucket = this.currentBucket();
    this.buckets.set(bucket, (this.buckets.get(bucket) ?? 0) + count);
    this.prune();
  }

  get total(): number {
    this.prune();
    let sum = 0;
    for (const v of this.buckets.values()) sum += v;
    return sum;
  }

  exceedsLimit(limit: number): boolean {
    return this.total >= limit;
  }

  reset(): void {
    this.buckets.clear();
  }

  private currentBucket(): number {
    return Math.floor(Date.now() / this.bucketMs);
  }

  private prune(): void {
    const cutoff = this.currentBucket() - Math.ceil(this.windowMs / this.bucketMs);
    for (const key of this.buckets.keys()) {
      if (key <= cutoff) this.buckets.delete(key);
    }
  }
}

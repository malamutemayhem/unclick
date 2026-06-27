export class RateCounter {
  private timestamps: number[] = [];
  private windowMs: number;

  constructor(windowMs = 60000) {
    this.windowMs = windowMs;
  }

  record(now = Date.now()): void {
    this.timestamps.push(now);
    this.prune(now);
  }

  count(now = Date.now()): number {
    this.prune(now);
    return this.timestamps.length;
  }

  rate(now = Date.now()): number {
    const c = this.count(now);
    return c / (this.windowMs / 1000);
  }

  reset(): void {
    this.timestamps = [];
  }

  private prune(now: number): void {
    const cutoff = now - this.windowMs;
    while (this.timestamps.length > 0 && this.timestamps[0] <= cutoff) {
      this.timestamps.shift();
    }
  }
}

export class MultiRateCounter {
  private counters = new Map<string, RateCounter>();
  private windowMs: number;

  constructor(windowMs = 60000) {
    this.windowMs = windowMs;
  }

  record(key: string, now = Date.now()): void {
    if (!this.counters.has(key)) {
      this.counters.set(key, new RateCounter(this.windowMs));
    }
    this.counters.get(key)!.record(now);
  }

  count(key: string, now = Date.now()): number {
    return this.counters.get(key)?.count(now) ?? 0;
  }

  rate(key: string, now = Date.now()): number {
    return this.counters.get(key)?.rate(now) ?? 0;
  }

  topN(n: number, now = Date.now()): Array<{ key: string; count: number }> {
    return [...this.counters.entries()]
      .map(([key, counter]) => ({ key, count: counter.count(now) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, n);
  }
}

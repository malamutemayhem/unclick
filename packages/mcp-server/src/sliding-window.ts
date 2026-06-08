export class SlidingWindowCounter {
  private windows: Map<number, number> = new Map();
  private readonly windowSize: number;
  private readonly limit: number;

  constructor(windowSize: number, limit: number) {
    this.windowSize = windowSize;
    this.limit = limit;
  }

  hit(timestamp?: number): boolean {
    const now = timestamp ?? Date.now();
    this.cleanup(now);
    const windowKey = Math.floor(now / this.windowSize);
    const current = this.count(now);
    if (current >= this.limit) return false;
    this.windows.set(windowKey, (this.windows.get(windowKey) ?? 0) + 1);
    return true;
  }

  count(timestamp?: number): number {
    const now = timestamp ?? Date.now();
    const currentKey = Math.floor(now / this.windowSize);
    const previousKey = currentKey - 1;
    const elapsed = (now % this.windowSize) / this.windowSize;
    const currentCount = this.windows.get(currentKey) ?? 0;
    const previousCount = this.windows.get(previousKey) ?? 0;
    return currentCount + Math.floor(previousCount * (1 - elapsed));
  }

  remaining(timestamp?: number): number {
    return Math.max(0, this.limit - this.count(timestamp));
  }

  reset(): void {
    this.windows.clear();
  }

  private cleanup(now: number): void {
    const currentKey = Math.floor(now / this.windowSize);
    for (const key of this.windows.keys()) {
      if (key < currentKey - 1) this.windows.delete(key);
    }
  }
}

export class SlidingWindowLog {
  private timestamps: number[] = [];
  private readonly windowSize: number;
  private readonly limit: number;

  constructor(windowSize: number, limit: number) {
    this.windowSize = windowSize;
    this.limit = limit;
  }

  hit(timestamp?: number): boolean {
    const now = timestamp ?? Date.now();
    this.cleanup(now);
    if (this.timestamps.length >= this.limit) return false;
    this.timestamps.push(now);
    return true;
  }

  count(timestamp?: number): number {
    const now = timestamp ?? Date.now();
    this.cleanup(now);
    return this.timestamps.length;
  }

  remaining(timestamp?: number): number {
    return Math.max(0, this.limit - this.count(timestamp));
  }

  oldestTimestamp(): number | null {
    return this.timestamps.length > 0 ? this.timestamps[0] : null;
  }

  retryAfter(timestamp?: number): number {
    const now = timestamp ?? Date.now();
    this.cleanup(now);
    if (this.timestamps.length < this.limit) return 0;
    return this.timestamps[0] + this.windowSize - now;
  }

  reset(): void {
    this.timestamps = [];
  }

  private cleanup(now: number): void {
    const cutoff = now - this.windowSize;
    while (this.timestamps.length > 0 && this.timestamps[0] <= cutoff) {
      this.timestamps.shift();
    }
  }
}

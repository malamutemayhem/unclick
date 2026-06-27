export interface TokenBucketConfig {
  capacity: number;
  refillRate: number;
  refillInterval: number;
}

export class TokenBucket {
  private tokens: number;
  private capacity: number;
  private refillRate: number;
  private refillInterval: number;
  private lastRefill: number;

  constructor(config: TokenBucketConfig, startTime?: number) {
    this.capacity = config.capacity;
    this.tokens = config.capacity;
    this.refillRate = config.refillRate;
    this.refillInterval = config.refillInterval;
    this.lastRefill = startTime ?? Date.now();
  }

  tryConsume(count = 1, now = Date.now()): boolean {
    this.refill(now);
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  available(): number {
    return this.tokens;
  }

  private refill(now: number): void {
    const elapsed = now - this.lastRefill;
    const intervals = Math.floor(elapsed / this.refillInterval);
    if (intervals > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + intervals * this.refillRate);
      this.lastRefill += intervals * this.refillInterval;
    }
  }
}

export class SlidingWindowCounter {
  private windows = new Map<number, number>();
  private windowSize: number;
  private limit: number;

  constructor(windowSize: number, limit: number) {
    this.windowSize = windowSize;
    this.limit = limit;
  }

  hit(now = Date.now()): boolean {
    const currentWindow = Math.floor(now / this.windowSize);
    const previousWindow = currentWindow - 1;
    const currentCount = this.windows.get(currentWindow) ?? 0;
    const previousCount = this.windows.get(previousWindow) ?? 0;

    const elapsed = (now % this.windowSize) / this.windowSize;
    const estimated = previousCount * (1 - elapsed) + currentCount;

    if (estimated >= this.limit) return false;

    this.windows.set(currentWindow, currentCount + 1);
    this.cleanup(currentWindow);
    return true;
  }

  currentCount(now = Date.now()): number {
    const currentWindow = Math.floor(now / this.windowSize);
    const previousWindow = currentWindow - 1;
    const currentCount = this.windows.get(currentWindow) ?? 0;
    const previousCount = this.windows.get(previousWindow) ?? 0;
    const elapsed = (now % this.windowSize) / this.windowSize;
    return previousCount * (1 - elapsed) + currentCount;
  }

  private cleanup(currentWindow: number): void {
    for (const key of this.windows.keys()) {
      if (key < currentWindow - 1) this.windows.delete(key);
    }
  }
}

export class LeakyBucket {
  private queue: number[] = [];
  private capacity: number;
  private leakRate: number;
  private lastLeak: number;

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.lastLeak = Date.now();
  }

  add(now = Date.now()): boolean {
    this.leak(now);
    if (this.queue.length >= this.capacity) return false;
    this.queue.push(now);
    return true;
  }

  size(): number {
    return this.queue.length;
  }

  private leak(now: number): void {
    const elapsed = now - this.lastLeak;
    const leaks = Math.floor(elapsed * this.leakRate / 1000);
    if (leaks > 0) {
      this.queue.splice(0, Math.min(leaks, this.queue.length));
      this.lastLeak = now;
    }
  }
}

export class AdaptiveRateLimiter {
  private bucket: TokenBucket;
  private errorCount = 0;
  private successCount = 0;
  private baseCapacity: number;
  private currentCapacity: number;

  constructor(baseCapacity: number, refillRate: number) {
    this.baseCapacity = baseCapacity;
    this.currentCapacity = baseCapacity;
    this.bucket = new TokenBucket({
      capacity: baseCapacity,
      refillRate,
      refillInterval: 1000,
    });
  }

  tryConsume(now = Date.now()): boolean {
    return this.bucket.tryConsume(1, now);
  }

  recordSuccess(): void {
    this.successCount++;
    if (this.successCount > 10 && this.currentCapacity < this.baseCapacity * 2) {
      this.currentCapacity = Math.min(this.baseCapacity * 2, this.currentCapacity + 1);
      this.successCount = 0;
    }
  }

  recordError(): void {
    this.errorCount++;
    if (this.errorCount > 3) {
      this.currentCapacity = Math.max(1, Math.floor(this.currentCapacity * 0.5));
      this.errorCount = 0;
    }
  }

  getCapacity(): number {
    return this.currentCapacity;
  }

  getStats(): { successes: number; errors: number; capacity: number } {
    return {
      successes: this.successCount,
      errors: this.errorCount,
      capacity: this.currentCapacity,
    };
  }
}

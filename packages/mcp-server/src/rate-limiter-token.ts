export class TokenBucketLimiter {
  private tokens: number;
  private readonly capacity: number;
  private readonly refillRate: number;
  private lastRefill: number;

  constructor(capacity: number, refillRate: number, now?: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = now ?? Date.now();
  }

  private refill(now: number): void {
    const elapsed = (now - this.lastRefill) / 1000;
    if (elapsed > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
      this.lastRefill = now;
    }
  }

  tryConsume(count: number = 1, now?: number): boolean {
    const t = now ?? Date.now();
    this.refill(t);
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  availableTokens(now?: number): number {
    const t = now ?? Date.now();
    this.refill(t);
    return Math.floor(this.tokens);
  }

  timeUntilAvailable(count: number = 1, now?: number): number {
    const t = now ?? Date.now();
    this.refill(t);
    if (this.tokens >= count) return 0;
    const deficit = count - this.tokens;
    return (deficit / this.refillRate) * 1000;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getRefillRate(): number {
    return this.refillRate;
  }

  reset(now?: number): void {
    this.tokens = this.capacity;
    this.lastRefill = now ?? Date.now();
  }
}

export class SlidingWindowLimiter {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private timestamps: number[] = [];

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  tryAcquire(now?: number): boolean {
    const t = now ?? Date.now();
    this.cleanup(t);
    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(t);
      return true;
    }
    return false;
  }

  remaining(now?: number): number {
    const t = now ?? Date.now();
    this.cleanup(t);
    return Math.max(0, this.maxRequests - this.timestamps.length);
  }

  private cleanup(now: number): void {
    const cutoff = now - this.windowMs;
    this.timestamps = this.timestamps.filter((ts) => ts > cutoff);
  }

  reset(): void {
    this.timestamps = [];
  }
}

export class RateLimiter {
  private timestamps: number[] = [];
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  tryAcquire(now: number = Date.now()): boolean {
    this.cleanup(now);
    if (this.timestamps.length >= this.maxRequests) return false;
    this.timestamps.push(now);
    return true;
  }

  get remaining(): number {
    this.cleanup(Date.now());
    return Math.max(0, this.maxRequests - this.timestamps.length);
  }

  get isLimited(): boolean {
    this.cleanup(Date.now());
    return this.timestamps.length >= this.maxRequests;
  }

  retryAfter(now: number = Date.now()): number {
    this.cleanup(now);
    if (this.timestamps.length < this.maxRequests) return 0;
    return this.timestamps[0] + this.windowMs - now;
  }

  reset(): void {
    this.timestamps = [];
  }

  private cleanup(now: number): void {
    const cutoff = now - this.windowMs;
    while (this.timestamps.length > 0 && this.timestamps[0] <= cutoff) {
      this.timestamps.shift();
    }
  }
}

export class TokenBucketLimiter {
  private tokens: number;
  private readonly maxTokens: number;
  private readonly refillRate: number;
  private lastRefill: number;

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  tryAcquire(count: number = 1, now: number = Date.now()): boolean {
    this.refill(now);
    if (this.tokens < count) return false;
    this.tokens -= count;
    return true;
  }

  get available(): number {
    this.refill(Date.now());
    return Math.floor(this.tokens);
  }

  reset(): void {
    this.tokens = this.maxTokens;
    this.lastRefill = Date.now();
  }

  private refill(now: number): void {
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate / 1000);
    this.lastRefill = now;
  }
}

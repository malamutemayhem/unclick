export class SlidingWindowRateLimiter {
  private timestamps = new Map<string, number[]>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  attempt(key: string, now: number = Date.now()): boolean {
    const window = this.getWindow(key, now);
    if (window.length >= this.maxRequests) return false;
    window.push(now);
    return true;
  }

  remaining(key: string, now: number = Date.now()): number {
    const window = this.getWindow(key, now);
    return Math.max(0, this.maxRequests - window.length);
  }

  resetAt(key: string, now: number = Date.now()): number {
    const window = this.getWindow(key, now);
    if (window.length === 0) return now;
    return window[0] + this.windowMs;
  }

  reset(key: string): void {
    this.timestamps.delete(key);
  }

  private getWindow(key: string, now: number): number[] {
    if (!this.timestamps.has(key)) this.timestamps.set(key, []);
    const times = this.timestamps.get(key)!;
    const cutoff = now - this.windowMs;
    while (times.length > 0 && times[0] <= cutoff) times.shift();
    this.timestamps.set(key, times);
    return times;
  }
}

export class TokenBucketRateLimiter {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();
  private readonly maxTokens: number;
  private readonly refillRate: number;

  constructor(maxTokens: number, refillRatePerSec: number) {
    this.maxTokens = maxTokens;
    this.refillRate = refillRatePerSec;
  }

  attempt(key: string, tokens: number = 1, now: number = Date.now()): boolean {
    const bucket = this.getBucket(key, now);
    if (bucket.tokens < tokens) return false;
    bucket.tokens -= tokens;
    return true;
  }

  remaining(key: string, now: number = Date.now()): number {
    return Math.floor(this.getBucket(key, now).tokens);
  }

  private getBucket(key: string, now: number): { tokens: number; lastRefill: number } {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, { tokens: this.maxTokens, lastRefill: now });
    }
    const bucket = this.buckets.get(key)!;
    const elapsed = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(this.maxTokens, bucket.tokens + elapsed * this.refillRate);
    bucket.lastRefill = now;
    return bucket;
  }
}

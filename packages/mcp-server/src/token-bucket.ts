export class TokenBucket {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private lastRefill: number;

  constructor(opts: { maxTokens: number; refillRate: number; initialTokens?: number }) {
    this.maxTokens = opts.maxTokens;
    this.refillRate = opts.refillRate;
    this.tokens = opts.initialTokens ?? opts.maxTokens;
    this.lastRefill = Date.now();
  }

  consume(count = 1, now = Date.now()): boolean {
    this.refill(now);
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  tryConsume(count = 1, now = Date.now()): { allowed: boolean; retryAfterMs: number } {
    this.refill(now);
    if (this.tokens >= count) {
      this.tokens -= count;
      return { allowed: true, retryAfterMs: 0 };
    }
    const deficit = count - this.tokens;
    const retryAfterMs = Math.ceil((deficit / this.refillRate) * 1000);
    return { allowed: false, retryAfterMs };
  }

  get available(): number {
    this.refill();
    return Math.floor(this.tokens);
  }

  reset(): void {
    this.tokens = this.maxTokens;
    this.lastRefill = Date.now();
  }

  private refill(now = Date.now()): void {
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

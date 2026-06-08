export class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  readonly capacity: number;
  readonly refillRate: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  consume(count = 1): boolean {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  tryConsume(count = 1): { allowed: boolean; retryAfterMs: number } {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return { allowed: true, retryAfterMs: 0 };
    }
    const deficit = count - this.tokens;
    const retryAfterMs = Math.ceil(deficit / this.refillRate * 1000);
    return { allowed: false, retryAfterMs };
  }

  get available(): number {
    this.refill();
    return Math.floor(this.tokens);
  }

  reset(): void {
    this.tokens = this.capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

export class TokenBucket {
  private tokens: number;
  private readonly capacity: number;
  private readonly refillRate: number;
  private lastRefill: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
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
    return { allowed: false, retryAfterMs: Math.ceil((deficit / this.refillRate) * 1000) };
  }

  get available(): number {
    this.refill();
    return Math.floor(this.tokens);
  }

  reset(): void {
    this.tokens = this.capacity;
    this.lastRefill = Date.now();
  }
}

export class LeakyBucket {
  private queue: number[] = [];
  private readonly capacity: number;
  private readonly leakRate: number;
  private lastLeak: number;

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.lastLeak = Date.now();
  }

  private leak(): void {
    const now = Date.now();
    const elapsed = (now - this.lastLeak) / 1000;
    const leaked = Math.floor(elapsed * this.leakRate);
    if (leaked > 0) {
      this.queue.splice(0, leaked);
      this.lastLeak = now;
    }
  }

  add(): boolean {
    this.leak();
    if (this.queue.length >= this.capacity) return false;
    this.queue.push(Date.now());
    return true;
  }

  get size(): number {
    this.leak();
    return this.queue.length;
  }

  get remaining(): number {
    this.leak();
    return this.capacity - this.queue.length;
  }
}

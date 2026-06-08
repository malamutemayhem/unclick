export class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number,
    private refillIntervalMs: number = 1000
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = Math.floor(elapsed / this.refillIntervalMs) * this.refillRate;
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  tryConsume(count = 1): boolean {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  async consume(count = 1): Promise<void> {
    while (!this.tryConsume(count)) {
      await new Promise((r) => setTimeout(r, this.refillIntervalMs));
    }
  }

  get available(): number {
    this.refill();
    return this.tokens;
  }
}

export class SlidingWindowCounter {
  private windows = new Map<number, number>();
  private windowSizeMs: number;
  private maxRequests: number;

  constructor(windowSizeMs: number, maxRequests: number) {
    this.windowSizeMs = windowSizeMs;
    this.maxRequests = maxRequests;
  }

  tryAcquire(): boolean {
    const now = Date.now();
    const currentWindow = Math.floor(now / this.windowSizeMs);
    const previousWindow = currentWindow - 1;

    this.cleanup(currentWindow);

    const currentCount = this.windows.get(currentWindow) || 0;
    const previousCount = this.windows.get(previousWindow) || 0;
    const elapsed = (now % this.windowSizeMs) / this.windowSizeMs;
    const estimatedCount = previousCount * (1 - elapsed) + currentCount;

    if (estimatedCount >= this.maxRequests) return false;

    this.windows.set(currentWindow, currentCount + 1);
    return true;
  }

  private cleanup(currentWindow: number): void {
    for (const key of this.windows.keys()) {
      if (key < currentWindow - 1) this.windows.delete(key);
    }
  }

  get remaining(): number {
    const now = Date.now();
    const currentWindow = Math.floor(now / this.windowSizeMs);
    const previousWindow = currentWindow - 1;
    const currentCount = this.windows.get(currentWindow) || 0;
    const previousCount = this.windows.get(previousWindow) || 0;
    const elapsed = (now % this.windowSizeMs) / this.windowSizeMs;
    const estimated = previousCount * (1 - elapsed) + currentCount;
    return Math.max(0, Math.floor(this.maxRequests - estimated));
  }
}

export class FixedWindowCounter {
  private count = 0;
  private windowStart: number;

  constructor(private windowSizeMs: number, private maxRequests: number) {
    this.windowStart = Date.now();
  }

  tryAcquire(): boolean {
    const now = Date.now();
    if (now - this.windowStart >= this.windowSizeMs) {
      this.count = 0;
      this.windowStart = now;
    }
    if (this.count >= this.maxRequests) return false;
    this.count++;
    return true;
  }

  get remaining(): number {
    const now = Date.now();
    if (now - this.windowStart >= this.windowSizeMs) return this.maxRequests;
    return Math.max(0, this.maxRequests - this.count);
  }
}

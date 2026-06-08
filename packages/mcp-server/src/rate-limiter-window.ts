export class SlidingWindowCounter {
  private windows = new Map<number, number>();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  tryAcquire(now = Date.now()): boolean {
    this.cleanup(now);
    const currentWindow = Math.floor(now / this.windowMs);
    const prevWindow = currentWindow - 1;
    const currentCount = this.windows.get(currentWindow) ?? 0;
    const prevCount = this.windows.get(prevWindow) ?? 0;

    const elapsed = (now % this.windowMs) / this.windowMs;
    const estimate = prevCount * (1 - elapsed) + currentCount;

    if (estimate >= this.maxRequests) return false;

    this.windows.set(currentWindow, currentCount + 1);
    return true;
  }

  get remaining(): number {
    const now = Date.now();
    this.cleanup(now);
    const currentWindow = Math.floor(now / this.windowMs);
    const prevWindow = currentWindow - 1;
    const currentCount = this.windows.get(currentWindow) ?? 0;
    const prevCount = this.windows.get(prevWindow) ?? 0;
    const elapsed = (now % this.windowMs) / this.windowMs;
    const estimate = prevCount * (1 - elapsed) + currentCount;
    return Math.max(0, Math.floor(this.maxRequests - estimate));
  }

  reset(): void {
    this.windows.clear();
  }

  private cleanup(now: number): void {
    const currentWindow = Math.floor(now / this.windowMs);
    for (const key of this.windows.keys()) {
      if (key < currentWindow - 1) this.windows.delete(key);
    }
  }
}

export class FixedWindowCounter {
  private count = 0;
  private windowStart = 0;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.windowStart = Date.now();
  }

  tryAcquire(now = Date.now()): boolean {
    if (now - this.windowStart >= this.windowMs) {
      this.count = 0;
      this.windowStart = now;
    }
    if (this.count >= this.maxRequests) return false;
    this.count++;
    return true;
  }

  get remaining(): number {
    const now = Date.now();
    if (now - this.windowStart >= this.windowMs) return this.maxRequests;
    return Math.max(0, this.maxRequests - this.count);
  }

  reset(): void {
    this.count = 0;
    this.windowStart = Date.now();
  }
}

export class ConcurrencyLimiter {
  private active = 0;
  private readonly maxConcurrent: number;

  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent;
  }

  tryAcquire(): boolean {
    if (this.active >= this.maxConcurrent) return false;
    this.active++;
    return true;
  }

  release(): void {
    if (this.active > 0) this.active--;
  }

  get remaining(): number {
    return Math.max(0, this.maxConcurrent - this.active);
  }

  get current(): number {
    return this.active;
  }
}

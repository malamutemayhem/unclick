export interface RateLimiterOptions {
  maxRequests: number;
  windowMs: number;
}

export class SlidingWindowRateLimiter {
  private maxRequests: number;
  private windowMs: number;
  private timestamps = new Map<string, number[]>();

  constructor(options: RateLimiterOptions) {
    this.maxRequests = options.maxRequests;
    this.windowMs = options.windowMs;
  }

  tryAcquire(key: string): boolean {
    const now = Date.now();
    this.cleanup(key, now);
    const times = this.timestamps.get(key) ?? [];
    if (times.length >= this.maxRequests) return false;
    times.push(now);
    this.timestamps.set(key, times);
    return true;
  }

  remaining(key: string): number {
    this.cleanup(key, Date.now());
    const times = this.timestamps.get(key) ?? [];
    return Math.max(0, this.maxRequests - times.length);
  }

  reset(key: string): void {
    this.timestamps.delete(key);
  }

  resetAll(): void {
    this.timestamps.clear();
  }

  nextAllowedAt(key: string): number | null {
    this.cleanup(key, Date.now());
    const times = this.timestamps.get(key) ?? [];
    if (times.length < this.maxRequests) return null;
    return times[0] + this.windowMs;
  }

  private cleanup(key: string, now: number): void {
    const times = this.timestamps.get(key);
    if (!times) return;
    const cutoff = now - this.windowMs;
    const filtered = times.filter((t) => t > cutoff);
    if (filtered.length === 0) this.timestamps.delete(key);
    else this.timestamps.set(key, filtered);
  }
}

export class FixedWindowRateLimiter {
  private maxRequests: number;
  private windowMs: number;
  private windows = new Map<string, { count: number; start: number }>();

  constructor(options: RateLimiterOptions) {
    this.maxRequests = options.maxRequests;
    this.windowMs = options.windowMs;
  }

  tryAcquire(key: string): boolean {
    const now = Date.now();
    const win = this.windows.get(key);
    if (!win || now - win.start >= this.windowMs) {
      this.windows.set(key, { count: 1, start: now });
      return true;
    }
    if (win.count >= this.maxRequests) return false;
    win.count++;
    return true;
  }

  remaining(key: string): number {
    const now = Date.now();
    const win = this.windows.get(key);
    if (!win || now - win.start >= this.windowMs) return this.maxRequests;
    return Math.max(0, this.maxRequests - win.count);
  }

  reset(key: string): void {
    this.windows.delete(key);
  }
}

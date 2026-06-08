export interface RateLimitEntry {
  remaining: number;
  limit: number;
  resetAt: number;
}

export class RateLimitTracker {
  private entries = new Map<string, RateLimitEntry>();

  update(key: string, remaining: number, limit: number, resetAt: number): void {
    this.entries.set(key, { remaining, limit, resetAt });
  }

  updateFromHeaders(key: string, headers: Record<string, string | undefined>): void {
    const remaining = parseInt(headers["x-ratelimit-remaining"] ?? headers["ratelimit-remaining"] ?? "", 10);
    const limit = parseInt(headers["x-ratelimit-limit"] ?? headers["ratelimit-limit"] ?? "", 10);
    const reset = parseInt(headers["x-ratelimit-reset"] ?? headers["ratelimit-reset"] ?? "", 10);
    if (!isNaN(remaining) && !isNaN(limit) && !isNaN(reset)) {
      const resetAt = reset > 1e12 ? reset : reset * 1000;
      this.update(key, remaining, limit, resetAt);
    }
  }

  canProceed(key: string): boolean {
    const entry = this.entries.get(key);
    if (!entry) return true;
    if (Date.now() >= entry.resetAt) return true;
    return entry.remaining > 0;
  }

  waitTime(key: string): number {
    const entry = this.entries.get(key);
    if (!entry) return 0;
    if (entry.remaining > 0) return 0;
    const wait = entry.resetAt - Date.now();
    return Math.max(0, wait);
  }

  getEntry(key: string): RateLimitEntry | undefined {
    return this.entries.get(key);
  }

  utilization(key: string): number {
    const entry = this.entries.get(key);
    if (!entry || entry.limit === 0) return 0;
    return 1 - entry.remaining / entry.limit;
  }

  listKeys(): string[] {
    return [...this.entries.keys()];
  }

  remove(key: string): void {
    this.entries.delete(key);
  }

  clear(): void {
    this.entries.clear();
  }
}

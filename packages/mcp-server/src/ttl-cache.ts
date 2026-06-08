// Time-based cache with automatic expiry.
// Stores values with a TTL so stale data gets cleaned up without
// manual invalidation. Useful for caching API responses, resolved
// credentials, and computed results.

export interface TtlCacheOptions {
  defaultTtlMs: number;
  maxSize?: number;
  cleanupIntervalMs?: number;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class TtlCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly defaultTtlMs: number;
  private readonly maxSize: number;
  private cleanupTimer?: ReturnType<typeof setInterval>;

  constructor(opts: TtlCacheOptions) {
    this.defaultTtlMs = opts.defaultTtlMs;
    this.maxSize = opts.maxSize ?? 10000;

    if (opts.cleanupIntervalMs && opts.cleanupIntervalMs > 0) {
      this.cleanupTimer = setInterval(() => this.evictExpired(), opts.cleanupIntervalMs);
      if (typeof this.cleanupTimer === "object" && "unref" in this.cleanupTimer) {
        this.cleanupTimer.unref();
      }
    }
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictExpired();
      if (this.cache.size >= this.maxSize) {
        this.evictOldest();
      }
    }
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
    });
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }

  dispose(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
    this.cache.clear();
  }

  // Get or compute: return cached value, or call factory and cache the result.
  getOrSet(key: string, factory: () => T, ttlMs?: number): T {
    const existing = this.get(key);
    if (existing !== undefined) return existing;
    const value = factory();
    this.set(key, value, ttlMs);
    return value;
  }

  // Async version of getOrSet.
  async getOrSetAsync(key: string, factory: () => Promise<T>, ttlMs?: number): Promise<T> {
    const existing = this.get(key);
    if (existing !== undefined) return existing;
    const value = await factory();
    this.set(key, value, ttlMs);
    return value;
  }

  private evictExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now > entry.expiresAt) this.cache.delete(key);
    }
  }

  private evictOldest(): void {
    let oldestKey: string | undefined;
    let oldestExpiry = Infinity;
    for (const [key, entry] of this.cache) {
      if (entry.expiresAt < oldestExpiry) {
        oldestExpiry = entry.expiresAt;
        oldestKey = key;
      }
    }
    if (oldestKey) this.cache.delete(oldestKey);
  }
}

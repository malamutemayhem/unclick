interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  hits: number;
  createdAt: number;
}

export class CacheProxy<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly ttl: number;
  private readonly maxSize: number;
  private totalHits = 0;
  private totalMisses = 0;

  constructor(ttl = 60_000, maxSize = 1000) {
    this.ttl = ttl;
    this.maxSize = maxSize;
  }

  get(key: string, now?: number): T | undefined {
    const timestamp = now ?? Date.now();
    const entry = this.cache.get(key);
    if (!entry) {
      this.totalMisses++;
      return undefined;
    }
    if (entry.expiresAt <= timestamp) {
      this.cache.delete(key);
      this.totalMisses++;
      return undefined;
    }
    entry.hits++;
    this.totalHits++;
    return entry.value;
  }

  set(key: string, value: T, ttl?: number, now?: number): void {
    const timestamp = now ?? Date.now();
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evict(timestamp);
    }
    this.cache.set(key, {
      value,
      expiresAt: timestamp + (ttl ?? this.ttl),
      hits: 0,
      createdAt: timestamp,
    });
  }

  async getOrSet(key: string, factory: () => Promise<T>, ttl?: number): Promise<T> {
    const existing = this.get(key);
    if (existing !== undefined) return existing;
    const value = await factory();
    this.set(key, value, ttl);
    return value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  has(key: string, now?: number): boolean {
    return this.get(key, now) !== undefined;
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }

  get hitRate(): number {
    const total = this.totalHits + this.totalMisses;
    return total > 0 ? this.totalHits / total : 0;
  }

  get stats(): { hits: number; misses: number; size: number; hitRate: number } {
    return {
      hits: this.totalHits,
      misses: this.totalMisses,
      size: this.cache.size,
      hitRate: this.hitRate,
    };
  }

  prune(now?: number): number {
    const timestamp = now ?? Date.now();
    let pruned = 0;
    for (const [key, entry] of this.cache) {
      if (entry.expiresAt <= timestamp) {
        this.cache.delete(key);
        pruned++;
      }
    }
    return pruned;
  }

  private evict(now: number): void {
    this.prune(now);
    if (this.cache.size >= this.maxSize) {
      let lruKey = "";
      let lruHits = Infinity;
      for (const [key, entry] of this.cache) {
        if (entry.hits < lruHits) {
          lruHits = entry.hits;
          lruKey = key;
        }
      }
      if (lruKey) this.cache.delete(lruKey);
    }
  }
}

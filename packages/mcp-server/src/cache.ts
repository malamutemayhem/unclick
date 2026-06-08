export class TTLCache<K, V> {
  private store = new Map<K, { value: V; expiresAt: number }>();
  private defaultTTL: number;

  constructor(defaultTTLMs = 60000) {
    this.defaultTTL = defaultTTLMs;
  }

  set(key: K, value: V, ttlMs?: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + (ttlMs ?? this.defaultTTL) });
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    return this.store.delete(key);
  }

  get size(): number {
    this.evictExpired();
    return this.store.size;
  }

  clear(): void { this.store.clear(); }

  keys(): K[] {
    this.evictExpired();
    return [...this.store.keys()];
  }

  private evictExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now > entry.expiresAt) this.store.delete(key);
    }
  }
}

export class MemoCache {
  private cache = new Map<string, { value: unknown; expiresAt: number }>();

  memoize<T extends (...args: any[]) => any>(
    fn: T,
    options?: { ttlMs?: number; keyFn?: (...args: Parameters<T>) => string }
  ): T {
    const ttl = options?.ttlMs ?? Infinity;
    const keyFn = options?.keyFn ?? ((...args: any[]) => JSON.stringify(args));

    return ((...args: Parameters<T>) => {
      const key = keyFn(...args);
      const cached = this.cache.get(key);
      if (cached && Date.now() < cached.expiresAt) return cached.value;
      const result = fn(...args);
      this.cache.set(key, { value: result, expiresAt: Date.now() + ttl });
      return result;
    }) as T;
  }

  clear(): void { this.cache.clear(); }
  get size(): number { return this.cache.size; }
}

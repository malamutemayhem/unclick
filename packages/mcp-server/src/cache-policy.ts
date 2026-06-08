export interface CacheEntry<V> {
  key: string;
  value: V;
  frequency: number;
  lastAccess: number;
  insertTime: number;
  size: number;
}

export class LRUCache<V> {
  private entries = new Map<string, CacheEntry<V>>();
  private maxSize: number;
  private clock = 0;
  private hits = 0;
  private misses = 0;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get(key: string): V | undefined {
    const entry = this.entries.get(key);
    if (!entry) { this.misses++; return undefined; }
    entry.lastAccess = this.clock++;
    entry.frequency++;
    this.hits++;
    return entry.value;
  }

  set(key: string, value: V, size = 1): void {
    if (this.entries.has(key)) {
      const entry = this.entries.get(key)!;
      entry.value = value;
      entry.lastAccess = this.clock++;
      entry.size = size;
      return;
    }
    while (this.currentSize() + size > this.maxSize && this.entries.size > 0) {
      this.evictLRU();
    }
    this.entries.set(key, {
      key, value, frequency: 0, lastAccess: this.clock++, insertTime: this.clock, size,
    });
  }

  delete(key: string): boolean {
    return this.entries.delete(key);
  }

  has(key: string): boolean {
    return this.entries.has(key);
  }

  size(): number {
    return this.entries.size;
  }

  currentSize(): number {
    let total = 0;
    for (const entry of this.entries.values()) total += entry.size;
    return total;
  }

  hitRate(): number {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : this.hits / total;
  }

  clear(): void {
    this.entries.clear();
    this.hits = 0;
    this.misses = 0;
  }

  private evictLRU(): void {
    let oldest: CacheEntry<V> | null = null;
    for (const entry of this.entries.values()) {
      if (!oldest || entry.lastAccess < oldest.lastAccess) oldest = entry;
    }
    if (oldest) this.entries.delete(oldest.key);
  }
}

export class LFUCache<V> {
  private entries = new Map<string, CacheEntry<V>>();
  private maxSize: number;
  private clock = 0;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get(key: string): V | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    entry.frequency++;
    entry.lastAccess = this.clock++;
    return entry.value;
  }

  set(key: string, value: V): void {
    if (this.entries.has(key)) {
      const entry = this.entries.get(key)!;
      entry.value = value;
      entry.frequency++;
      entry.lastAccess = this.clock++;
      return;
    }
    if (this.entries.size >= this.maxSize) {
      this.evictLFU();
    }
    this.entries.set(key, {
      key, value, frequency: 1, lastAccess: this.clock++, insertTime: this.clock, size: 1,
    });
  }

  size(): number {
    return this.entries.size;
  }

  private evictLFU(): void {
    let victim: CacheEntry<V> | null = null;
    for (const entry of this.entries.values()) {
      if (!victim || entry.frequency < victim.frequency ||
          (entry.frequency === victim.frequency && entry.lastAccess < victim.lastAccess)) {
        victim = entry;
      }
    }
    if (victim) this.entries.delete(victim.key);
  }
}

export class TTLCache<V> {
  private entries = new Map<string, { value: V; expires: number }>();

  set(key: string, value: V, ttlMs: number): void {
    this.entries.set(key, { value, expires: Date.now() + ttlMs });
  }

  get(key: string, now = Date.now()): V | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (entry.expires <= now) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }

  cleanup(now = Date.now()): number {
    let removed = 0;
    for (const [key, entry] of this.entries) {
      if (entry.expires <= now) {
        this.entries.delete(key);
        removed++;
      }
    }
    return removed;
  }

  size(): number {
    return this.entries.size;
  }
}

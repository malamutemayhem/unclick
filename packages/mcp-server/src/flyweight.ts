export class FlyweightFactory<K, V> {
  private cache = new Map<string, V>();
  private factory: (key: K) => V;
  private keyFn: (key: K) => string;
  private hits = 0;
  private misses = 0;

  constructor(factory: (key: K) => V, keyFn?: (key: K) => string) {
    this.factory = factory;
    this.keyFn = keyFn ?? ((k) => JSON.stringify(k));
  }

  get(key: K): V {
    const cacheKey = this.keyFn(key);
    if (this.cache.has(cacheKey)) {
      this.hits++;
      return this.cache.get(cacheKey)!;
    }
    this.misses++;
    const value = this.factory(key);
    this.cache.set(cacheKey, value);
    return value;
  }

  has(key: K): boolean {
    return this.cache.has(this.keyFn(key));
  }

  size(): number {
    return this.cache.size;
  }

  hitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }

  stats(): { hits: number; misses: number; size: number; hitRate: number } {
    return { hits: this.hits, misses: this.misses, size: this.cache.size, hitRate: this.hitRate() };
  }

  evict(key: K): boolean {
    return this.cache.delete(this.keyFn(key));
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  keys(): string[] {
    return [...this.cache.keys()];
  }
}

export class InternPool {
  private pool = new Map<string, string>();
  private refs = new Map<string, number>();

  intern(value: string): string {
    if (this.pool.has(value)) {
      this.refs.set(value, (this.refs.get(value) ?? 0) + 1);
      return this.pool.get(value)!;
    }
    this.pool.set(value, value);
    this.refs.set(value, 1);
    return value;
  }

  isInterned(value: string): boolean {
    return this.pool.has(value);
  }

  refCount(value: string): number {
    return this.refs.get(value) ?? 0;
  }

  release(value: string): boolean {
    const count = this.refs.get(value) ?? 0;
    if (count <= 1) {
      this.pool.delete(value);
      this.refs.delete(value);
      return true;
    }
    this.refs.set(value, count - 1);
    return false;
  }

  size(): number {
    return this.pool.size;
  }

  memorySaved(values: string[]): number {
    const withoutPool = values.reduce((sum, v) => sum + v.length, 0);
    const uniqueValues = new Set(values);
    const withPool = [...uniqueValues].reduce((sum, v) => sum + v.length, 0);
    return withoutPool - withPool;
  }
}

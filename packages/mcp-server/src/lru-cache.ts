export class LRUCache<K, V> {
  private map = new Map<K, V>();
  private readonly capacity: number;
  private hits = 0;
  private misses = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) {
      this.misses++;
      return undefined;
    }
    this.hits++;
    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldest = this.map.keys().next().value;
      if (oldest !== undefined) this.map.delete(oldest);
    }
    this.map.set(key, value);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
    this.hits = 0;
    this.misses = 0;
  }

  get size(): number {
    return this.map.size;
  }

  get hitRate(): number {
    const total = this.hits + this.misses;
    return total === 0 ? 0 : this.hits / total;
  }

  get stats(): { hits: number; misses: number; size: number; hitRate: number } {
    return { hits: this.hits, misses: this.misses, size: this.size, hitRate: this.hitRate };
  }

  keys(): K[] {
    return [...this.map.keys()];
  }

  values(): V[] {
    return [...this.map.values()];
  }

  entries(): [K, V][] {
    return [...this.map.entries()];
  }

  peek(key: K): V | undefined {
    return this.map.get(key);
  }
}

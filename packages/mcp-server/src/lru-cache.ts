export class LRUCache<K, V> {
  private map = new Map<K, V>();
  private readonly capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error("Capacity must be at least 1");
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key: K, value: V): this {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest!);
    }
    return this;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }

  keys(): K[] {
    return [...this.map.keys()].reverse();
  }

  values(): V[] {
    return [...this.map.values()].reverse();
  }

  entries(): Array<[K, V]> {
    return [...this.map.entries()].reverse();
  }

  peek(key: K): V | undefined {
    return this.map.get(key);
  }
}

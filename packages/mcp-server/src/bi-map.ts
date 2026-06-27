export class BiMap<K, V> {
  private forward = new Map<K, V>();
  private reverse = new Map<V, K>();

  get size(): number {
    return this.forward.size;
  }

  set(key: K, value: V): this {
    if (this.forward.has(key)) {
      const oldValue = this.forward.get(key)!;
      this.reverse.delete(oldValue);
    }
    if (this.reverse.has(value)) {
      const oldKey = this.reverse.get(value)!;
      this.forward.delete(oldKey);
    }
    this.forward.set(key, value);
    this.reverse.set(value, key);
    return this;
  }

  get(key: K): V | undefined {
    return this.forward.get(key);
  }

  getKey(value: V): K | undefined {
    return this.reverse.get(value);
  }

  has(key: K): boolean {
    return this.forward.has(key);
  }

  hasValue(value: V): boolean {
    return this.reverse.has(value);
  }

  delete(key: K): boolean {
    if (!this.forward.has(key)) return false;
    const value = this.forward.get(key)!;
    this.forward.delete(key);
    this.reverse.delete(value);
    return true;
  }

  deleteValue(value: V): boolean {
    if (!this.reverse.has(value)) return false;
    const key = this.reverse.get(value)!;
    this.forward.delete(key);
    this.reverse.delete(value);
    return true;
  }

  clear(): void {
    this.forward.clear();
    this.reverse.clear();
  }

  keys(): IterableIterator<K> {
    return this.forward.keys();
  }

  values(): IterableIterator<V> {
    return this.forward.values();
  }

  entries(): IterableIterator<[K, V]> {
    return this.forward.entries();
  }

  inverse(): BiMap<V, K> {
    const inv = new BiMap<V, K>();
    for (const [k, v] of this.forward) {
      inv.forward.set(v, k);
      inv.reverse.set(k, v);
    }
    return inv;
  }

  static from<K, V>(entries: Iterable<[K, V]>): BiMap<K, V> {
    const bm = new BiMap<K, V>();
    for (const [k, v] of entries) bm.set(k, v);
    return bm;
  }
}

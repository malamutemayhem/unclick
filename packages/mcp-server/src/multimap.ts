export class MultiMap<K, V> {
  private map = new Map<K, V[]>();

  set(key: K, value: V): void {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key)!.push(value);
  }

  get(key: K): V[] {
    return this.map.get(key) ?? [];
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  hasValue(key: K, value: V): boolean {
    return this.get(key).includes(value);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  deleteValue(key: K, value: V): boolean {
    const values = this.map.get(key);
    if (!values) return false;
    const idx = values.indexOf(value);
    if (idx === -1) return false;
    values.splice(idx, 1);
    if (values.length === 0) this.map.delete(key);
    return true;
  }

  get size(): number { return this.map.size; }

  get totalValues(): number {
    let count = 0;
    for (const values of this.map.values()) count += values.length;
    return count;
  }

  keys(): IterableIterator<K> { return this.map.keys(); }

  entries(): [K, V[]][] {
    return [...this.map.entries()];
  }

  clear(): void { this.map.clear(); }

  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const [key, values] of this.map) {
      for (const value of values) yield [key, value];
    }
  }
}

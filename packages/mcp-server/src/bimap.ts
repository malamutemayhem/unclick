export class BiMap<K, V> {
  private forward = new Map<K, V>();
  private reverse = new Map<V, K>();

  get size(): number {
    return this.forward.size;
  }

  set(key: K, value: V): void {
    if (this.forward.has(key)) {
      const oldVal = this.forward.get(key)!;
      this.reverse.delete(oldVal);
    }
    if (this.reverse.has(value)) {
      const oldKey = this.reverse.get(value)!;
      this.forward.delete(oldKey);
    }
    this.forward.set(key, value);
    this.reverse.set(value, key);
  }

  get(key: K): V | undefined {
    return this.forward.get(key);
  }

  getKey(value: V): K | undefined {
    return this.reverse.get(value);
  }

  hasKey(key: K): boolean {
    return this.forward.has(key);
  }

  hasValue(value: V): boolean {
    return this.reverse.has(value);
  }

  deleteKey(key: K): boolean {
    const value = this.forward.get(key);
    if (value === undefined && !this.forward.has(key)) return false;
    this.forward.delete(key);
    this.reverse.delete(value!);
    return true;
  }

  deleteValue(value: V): boolean {
    const key = this.reverse.get(value);
    if (key === undefined && !this.reverse.has(value)) return false;
    this.reverse.delete(value);
    this.forward.delete(key!);
    return true;
  }

  keys(): K[] {
    return [...this.forward.keys()];
  }

  values(): V[] {
    return [...this.forward.values()];
  }

  clear(): void {
    this.forward.clear();
    this.reverse.clear();
  }
}

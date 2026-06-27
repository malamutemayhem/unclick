export class TypedMap<K extends string, V> {
  private data = new Map<K, V>();

  set(key: K, value: V): this {
    this.data.set(key, value);
    return this;
  }

  get(key: K): V | undefined {
    return this.data.get(key);
  }

  getOrDefault(key: K, defaultValue: V): V {
    return this.data.has(key) ? this.data.get(key)! : defaultValue;
  }

  has(key: K): boolean {
    return this.data.has(key);
  }

  delete(key: K): boolean {
    return this.data.delete(key);
  }

  get size(): number {
    return this.data.size;
  }

  keys(): K[] {
    return [...this.data.keys()];
  }

  values(): V[] {
    return [...this.data.values()];
  }

  entries(): [K, V][] {
    return [...this.data.entries()];
  }

  clear(): void {
    this.data.clear();
  }

  toObject(): Record<K, V> {
    const obj = {} as Record<K, V>;
    for (const [k, v] of this.data) {
      obj[k] = v;
    }
    return obj;
  }

  static fromObject<K extends string, V>(obj: Record<K, V>): TypedMap<K, V> {
    const map = new TypedMap<K, V>();
    for (const key of Object.keys(obj) as K[]) {
      map.set(key, obj[key]);
    }
    return map;
  }

  map<U>(fn: (value: V, key: K) => U): TypedMap<K, U> {
    const result = new TypedMap<K, U>();
    for (const [k, v] of this.data) {
      result.set(k, fn(v, k));
    }
    return result;
  }

  filter(fn: (value: V, key: K) => boolean): TypedMap<K, V> {
    const result = new TypedMap<K, V>();
    for (const [k, v] of this.data) {
      if (fn(v, k)) result.set(k, v);
    }
    return result;
  }
}

export class BiMap<K, V> {
  private forward = new Map<K, V>();
  private reverse = new Map<V, K>();

  set(key: K, value: V): this {
    if (this.forward.has(key)) {
      this.reverse.delete(this.forward.get(key)!);
    }
    if (this.reverse.has(value)) {
      this.forward.delete(this.reverse.get(value)!);
    }
    this.forward.set(key, value);
    this.reverse.set(value, key);
    return this;
  }

  get(key: K): V | undefined {
    return this.forward.get(key);
  }

  getByValue(value: V): K | undefined {
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
    this.reverse.delete(this.forward.get(key)!);
    return this.forward.delete(key);
  }

  get size(): number {
    return this.forward.size;
  }

  clear(): void {
    this.forward.clear();
    this.reverse.clear();
  }
}

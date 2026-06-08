export class TypedMap<K extends string, V> {
  private data = new Map<K, V>();
  private readonly validator?: (key: K, value: V) => boolean;

  constructor(validator?: (key: K, value: V) => boolean) {
    this.validator = validator;
  }

  set(key: K, value: V): this {
    if (this.validator && !this.validator(key, value)) {
      throw new Error(`Validation failed for key "${key}"`);
    }
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

  clear(): void {
    this.data.clear();
  }

  keys(): K[] {
    return [...this.data.keys()];
  }

  values(): V[] {
    return [...this.data.values()];
  }

  entries(): Array<[K, V]> {
    return [...this.data.entries()];
  }

  toObject(): Record<K, V> {
    const result = {} as Record<K, V>;
    for (const [k, v] of this.data) result[k] = v;
    return result;
  }

  static fromObject<K extends string, V>(obj: Record<K, V>): TypedMap<K, V> {
    const map = new TypedMap<K, V>();
    for (const [k, v] of Object.entries(obj) as Array<[K, V]>) {
      map.set(k, v);
    }
    return map;
  }

  map<U>(fn: (value: V, key: K) => U): TypedMap<K, U> {
    const result = new TypedMap<K, U>();
    for (const [k, v] of this.data) result.set(k, fn(v, k));
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

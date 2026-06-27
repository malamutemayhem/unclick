type MapListener<K, V> = (event: MapEvent<K, V>) => void;

export interface MapEvent<K, V> {
  type: "set" | "delete" | "clear";
  key?: K;
  value?: V;
  oldValue?: V;
}

export class ObservableMap<K, V> {
  private map = new Map<K, V>();
  private listeners = new Set<MapListener<K, V>>();

  get size(): number {
    return this.map.size;
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  set(key: K, value: V): this {
    const oldValue = this.map.get(key);
    this.map.set(key, value);
    this.emit({ type: "set", key, value, oldValue });
    return this;
  }

  delete(key: K): boolean {
    const oldValue = this.map.get(key);
    const existed = this.map.delete(key);
    if (existed) {
      this.emit({ type: "delete", key, oldValue });
    }
    return existed;
  }

  clear(): void {
    this.map.clear();
    this.emit({ type: "clear" });
  }

  subscribe(listener: MapListener<K, V>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  forEach(fn: (value: V, key: K) => void): void {
    this.map.forEach(fn);
  }

  toObject(): Record<string, V> {
    const result: Record<string, V> = {};
    for (const [key, value] of this.map) {
      result[String(key)] = value;
    }
    return result;
  }

  static from<K, V>(entries: Iterable<[K, V]>): ObservableMap<K, V> {
    const om = new ObservableMap<K, V>();
    for (const [k, v] of entries) {
      om.map.set(k, v);
    }
    return om;
  }

  private emit(event: MapEvent<K, V>): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

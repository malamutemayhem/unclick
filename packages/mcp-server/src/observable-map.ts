type Listener<K, V> = (event: { type: "set" | "delete" | "clear"; key?: K; value?: V }) => void;

export class ObservableMap<K, V> {
  private map = new Map<K, V>();
  private listeners = new Set<Listener<K, V>>();

  get size(): number {
    return this.map.size;
  }

  set(key: K, value: V): void {
    this.map.set(key, value);
    this.emit({ type: "set", key, value });
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    const had = this.map.delete(key);
    if (had) this.emit({ type: "delete", key });
    return had;
  }

  clear(): void {
    this.map.clear();
    this.emit({ type: "clear" });
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

  subscribe(fn: Listener<K, V>): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit(event: { type: "set" | "delete" | "clear"; key?: K; value?: V }): void {
    for (const fn of this.listeners) fn(event);
  }
}

export class OrderedMap<K, V> {
  private map = new Map<K, V>();
  private order: K[] = [];

  get size(): number {
    return this.map.size;
  }

  set(key: K, value: V): void {
    if (!this.map.has(key)) {
      this.order.push(key);
    }
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    if (!this.map.has(key)) return false;
    this.map.delete(key);
    this.order = this.order.filter((k) => k !== key);
    return true;
  }

  keys(): K[] {
    return [...this.order];
  }

  values(): V[] {
    return this.order.map((k) => this.map.get(k)!);
  }

  entries(): [K, V][] {
    return this.order.map((k) => [k, this.map.get(k)!]);
  }

  first(): [K, V] | undefined {
    if (this.order.length === 0) return undefined;
    const key = this.order[0];
    return [key, this.map.get(key)!];
  }

  last(): [K, V] | undefined {
    if (this.order.length === 0) return undefined;
    const key = this.order[this.order.length - 1];
    return [key, this.map.get(key)!];
  }

  at(index: number): [K, V] | undefined {
    if (index < 0) index = this.order.length + index;
    if (index < 0 || index >= this.order.length) return undefined;
    const key = this.order[index];
    return [key, this.map.get(key)!];
  }

  clear(): void {
    this.map.clear();
    this.order.length = 0;
  }

  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const key of this.order) {
      yield [key, this.map.get(key)!];
    }
  }
}

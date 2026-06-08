export class MultiMap<K, V> {
  private map = new Map<K, V[]>();

  add(key: K, value: V): void {
    const list = this.map.get(key);
    if (list) {
      list.push(value);
    } else {
      this.map.set(key, [value]);
    }
  }

  get(key: K): readonly V[] {
    return this.map.get(key) ?? [];
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  removeValue(key: K, value: V): boolean {
    const list = this.map.get(key);
    if (!list) return false;
    const idx = list.indexOf(value);
    if (idx === -1) return false;
    list.splice(idx, 1);
    if (list.length === 0) this.map.delete(key);
    return true;
  }

  keys(): K[] {
    return [...this.map.keys()];
  }

  values(): V[] {
    return [...this.map.values()].flat();
  }

  get keyCount(): number {
    return this.map.size;
  }

  get totalValues(): number {
    let count = 0;
    for (const list of this.map.values()) count += list.length;
    return count;
  }

  clear(): void {
    this.map.clear();
  }

  forEach(fn: (key: K, values: readonly V[]) => void): void {
    for (const [key, values] of this.map) {
      fn(key, values);
    }
  }
}

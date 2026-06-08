export class MultiMap<K, V> {
  private map = new Map<K, V[]>();
  private _size = 0;

  get size(): number {
    return this._size;
  }

  get keyCount(): number {
    return this.map.size;
  }

  set(key: K, value: V): void {
    const arr = this.map.get(key);
    if (arr) {
      arr.push(value);
    } else {
      this.map.set(key, [value]);
    }
    this._size++;
  }

  get(key: K): V[] {
    return this.map.get(key) ?? [];
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K, value?: V): boolean {
    if (value === undefined) {
      const arr = this.map.get(key);
      if (!arr) return false;
      this._size -= arr.length;
      this.map.delete(key);
      return true;
    }
    const arr = this.map.get(key);
    if (!arr) return false;
    const idx = arr.indexOf(value);
    if (idx === -1) return false;
    arr.splice(idx, 1);
    this._size--;
    if (arr.length === 0) this.map.delete(key);
    return true;
  }

  keys(): K[] {
    return [...this.map.keys()];
  }

  values(): V[] {
    const result: V[] = [];
    for (const arr of this.map.values()) result.push(...arr);
    return result;
  }

  entries(): [K, V[]][] {
    return [...this.map.entries()];
  }

  clear(): void {
    this.map.clear();
    this._size = 0;
  }
}

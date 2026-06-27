export class MultiMap<K, V> {
  private data = new Map<K, V[]>();

  set(key: K, value: V): void {
    if (!this.data.has(key)) this.data.set(key, []);
    this.data.get(key)!.push(value);
  }

  get(key: K): V[] {
    return [...(this.data.get(key) ?? [])];
  }

  has(key: K): boolean {
    return this.data.has(key);
  }

  hasValue(key: K, value: V): boolean {
    return this.data.get(key)?.includes(value) ?? false;
  }

  delete(key: K): boolean {
    return this.data.delete(key);
  }

  deleteValue(key: K, value: V): boolean {
    const arr = this.data.get(key);
    if (!arr) return false;
    const idx = arr.indexOf(value);
    if (idx < 0) return false;
    arr.splice(idx, 1);
    if (arr.length === 0) this.data.delete(key);
    return true;
  }

  get size(): number {
    return this.data.size;
  }

  totalValues(): number {
    let total = 0;
    for (const values of this.data.values()) total += values.length;
    return total;
  }

  keys(): K[] {
    return [...this.data.keys()];
  }

  entries(): [K, V[]][] {
    return [...this.data.entries()].map(([k, v]) => [k, [...v]]);
  }

  clear(): void {
    this.data.clear();
  }

  valuesFlat(): V[] {
    const result: V[] = [];
    for (const values of this.data.values()) result.push(...values);
    return result;
  }
}

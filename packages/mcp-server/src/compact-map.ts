export class CompactMap<V> {
  private keys: string[] = [];
  private values: V[] = [];

  set(key: string, value: V): void {
    const idx = this.indexOf(key);
    if (idx >= 0) {
      this.values[idx] = value;
    } else {
      this.keys.push(key);
      this.values.push(value);
    }
  }

  get(key: string): V | undefined {
    const idx = this.indexOf(key);
    return idx >= 0 ? this.values[idx] : undefined;
  }

  has(key: string): boolean {
    return this.indexOf(key) >= 0;
  }

  delete(key: string): boolean {
    const idx = this.indexOf(key);
    if (idx < 0) return false;
    this.keys.splice(idx, 1);
    this.values.splice(idx, 1);
    return true;
  }

  get size(): number {
    return this.keys.length;
  }

  entries(): [string, V][] {
    return this.keys.map((k, i) => [k, this.values[i]]);
  }

  keysArray(): string[] {
    return [...this.keys];
  }

  valuesArray(): V[] {
    return [...this.values];
  }

  clear(): void {
    this.keys = [];
    this.values = [];
  }

  toObject(): Record<string, V> {
    const obj: Record<string, V> = {};
    for (let i = 0; i < this.keys.length; i++) obj[this.keys[i]] = this.values[i];
    return obj;
  }

  private indexOf(key: string): number {
    return this.keys.indexOf(key);
  }
}

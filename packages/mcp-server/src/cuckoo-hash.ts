export class CuckooHashMap<V> {
  private table1: ({ key: string; value: V } | null)[];
  private table2: ({ key: string; value: V } | null)[];
  private capacity: number;
  private count = 0;
  private maxKicks = 500;
  private seed1 = 0x811c9dc5;
  private seed2 = 0xc6a4a793;

  constructor(capacity = 16) {
    this.capacity = capacity;
    this.table1 = new Array(capacity).fill(null);
    this.table2 = new Array(capacity).fill(null);
  }

  private hash1(key: string): number {
    let h = this.seed1;
    for (let i = 0; i < key.length; i++) {
      h ^= key.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return ((h >>> 0) % this.capacity);
  }

  private hash2(key: string): number {
    let h = this.seed2;
    for (let i = 0; i < key.length; i++) {
      h = (Math.imul(h, 31) + key.charCodeAt(i)) | 0;
    }
    return ((h >>> 0) % this.capacity);
  }

  set(key: string, value: V): boolean {
    const i1 = this.hash1(key);
    if (this.table1[i1] && this.table1[i1]!.key === key) {
      this.table1[i1] = { key, value };
      return true;
    }
    const i2 = this.hash2(key);
    if (this.table2[i2] && this.table2[i2]!.key === key) {
      this.table2[i2] = { key, value };
      return true;
    }

    let entry = { key, value };
    for (let kick = 0; kick < this.maxKicks; kick++) {
      const idx1 = this.hash1(entry.key);
      if (!this.table1[idx1]) {
        this.table1[idx1] = entry;
        this.count++;
        return true;
      }
      const evicted1 = this.table1[idx1]!;
      this.table1[idx1] = entry;
      entry = evicted1;

      const idx2 = this.hash2(entry.key);
      if (!this.table2[idx2]) {
        this.table2[idx2] = entry;
        this.count++;
        return true;
      }
      const evicted2 = this.table2[idx2]!;
      this.table2[idx2] = entry;
      entry = evicted2;
    }

    this.rehash();
    return this.set(entry.key, entry.value);
  }

  get(key: string): V | undefined {
    const i1 = this.hash1(key);
    if (this.table1[i1] && this.table1[i1]!.key === key) return this.table1[i1]!.value;
    const i2 = this.hash2(key);
    if (this.table2[i2] && this.table2[i2]!.key === key) return this.table2[i2]!.value;
    return undefined;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    const i1 = this.hash1(key);
    if (this.table1[i1] && this.table1[i1]!.key === key) {
      this.table1[i1] = null;
      this.count--;
      return true;
    }
    const i2 = this.hash2(key);
    if (this.table2[i2] && this.table2[i2]!.key === key) {
      this.table2[i2] = null;
      this.count--;
      return true;
    }
    return false;
  }

  private rehash(): void {
    const oldT1 = this.table1;
    const oldT2 = this.table2;
    this.capacity *= 2;
    this.table1 = new Array(this.capacity).fill(null);
    this.table2 = new Array(this.capacity).fill(null);
    this.count = 0;

    for (const entry of oldT1) {
      if (entry) this.set(entry.key, entry.value);
    }
    for (const entry of oldT2) {
      if (entry) this.set(entry.key, entry.value);
    }
  }

  get size(): number { return this.count; }

  get loadFactor(): number { return this.count / (this.capacity * 2); }

  clear(): void {
    this.table1.fill(null);
    this.table2.fill(null);
    this.count = 0;
  }

  keys(): string[] {
    const result: string[] = [];
    for (const e of this.table1) if (e) result.push(e.key);
    for (const e of this.table2) if (e) result.push(e.key);
    return result;
  }
}

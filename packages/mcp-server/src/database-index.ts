export interface IndexEntry {
  key: string | number;
  rowId: number;
}

export class BTreeIndex {
  private order: number;
  private entries: IndexEntry[] = [];

  constructor(order = 4) {
    this.order = order;
  }

  insert(key: string | number, rowId: number): void {
    this.entries.push({ key, rowId });
    this.entries.sort((a, b) => this.compare(a.key, b.key));
  }

  find(key: string | number): number[] {
    return this.entries.filter((e) => e.key === key).map((e) => e.rowId);
  }

  range(low: string | number, high: string | number): number[] {
    return this.entries
      .filter((e) => this.compare(e.key, low) >= 0 && this.compare(e.key, high) <= 0)
      .map((e) => e.rowId);
  }

  remove(key: string | number, rowId: number): boolean {
    const idx = this.entries.findIndex((e) => e.key === key && e.rowId === rowId);
    if (idx === -1) return false;
    this.entries.splice(idx, 1);
    return true;
  }

  min(): IndexEntry | null {
    return this.entries.length > 0 ? this.entries[0] : null;
  }

  max(): IndexEntry | null {
    return this.entries.length > 0 ? this.entries[this.entries.length - 1] : null;
  }

  size(): number {
    return this.entries.length;
  }

  getOrder(): number {
    return this.order;
  }

  all(): IndexEntry[] {
    return [...this.entries];
  }

  private compare(a: string | number, b: string | number): number {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
  }
}

export class HashIndex {
  private buckets: Map<string, number[]>;
  private count = 0;

  constructor() {
    this.buckets = new Map();
  }

  insert(key: string | number, rowId: number): void {
    const k = String(key);
    const existing = this.buckets.get(k);
    if (existing) {
      existing.push(rowId);
    } else {
      this.buckets.set(k, [rowId]);
    }
    this.count++;
  }

  find(key: string | number): number[] {
    return this.buckets.get(String(key)) ?? [];
  }

  remove(key: string | number, rowId: number): boolean {
    const k = String(key);
    const bucket = this.buckets.get(k);
    if (!bucket) return false;
    const idx = bucket.indexOf(rowId);
    if (idx === -1) return false;
    bucket.splice(idx, 1);
    if (bucket.length === 0) this.buckets.delete(k);
    this.count--;
    return true;
  }

  has(key: string | number): boolean {
    return this.buckets.has(String(key));
  }

  size(): number {
    return this.count;
  }

  bucketCount(): number {
    return this.buckets.size;
  }

  keys(): string[] {
    return [...this.buckets.keys()].sort();
  }
}

export class CompositeIndex {
  private entries: Array<{ keys: (string | number)[]; rowId: number }> = [];

  insert(keys: (string | number)[], rowId: number): void {
    this.entries.push({ keys: [...keys], rowId });
  }

  find(keys: (string | number)[]): number[] {
    return this.entries
      .filter((e) => {
        if (e.keys.length !== keys.length) return false;
        return keys.every((k, i) => k === e.keys[i]);
      })
      .map((e) => e.rowId);
  }

  prefixSearch(prefix: (string | number)[]): number[] {
    return this.entries
      .filter((e) => {
        if (e.keys.length < prefix.length) return false;
        return prefix.every((k, i) => k === e.keys[i]);
      })
      .map((e) => e.rowId);
  }

  remove(keys: (string | number)[], rowId: number): boolean {
    const idx = this.entries.findIndex(
      (e) => e.rowId === rowId && e.keys.length === keys.length && keys.every((k, i) => k === e.keys[i])
    );
    if (idx === -1) return false;
    this.entries.splice(idx, 1);
    return true;
  }

  size(): number {
    return this.entries.length;
  }
}

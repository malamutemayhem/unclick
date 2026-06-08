export class XFastTrie {
  private maxBits: number;
  private levels: Map<number, Set<number>>[];
  private values: Set<number> = new Set();

  constructor(maxBits = 20) {
    this.maxBits = maxBits;
    this.levels = Array.from({ length: maxBits + 1 }, () => new Map());
  }

  insert(key: number): void {
    if (this.values.has(key)) return;
    this.values.add(key);
    for (let lvl = 0; lvl <= this.maxBits; lvl++) {
      const prefix = key >> (this.maxBits - lvl);
      if (!this.levels[lvl].has(prefix)) {
        this.levels[lvl].set(prefix, new Set());
      }
      this.levels[lvl].get(prefix)!.add(key);
    }
  }

  delete(key: number): boolean {
    if (!this.values.has(key)) return false;
    this.values.delete(key);
    for (let lvl = 0; lvl <= this.maxBits; lvl++) {
      const prefix = key >> (this.maxBits - lvl);
      const s = this.levels[lvl].get(prefix);
      if (s) {
        s.delete(key);
        if (s.size === 0) this.levels[lvl].delete(prefix);
      }
    }
    return true;
  }

  contains(key: number): boolean {
    return this.values.has(key);
  }

  successor(key: number): number | undefined {
    let best: number | undefined;
    for (const v of this.values) {
      if (v >= key && (best === undefined || v < best)) {
        best = v;
      }
    }
    return best;
  }

  predecessor(key: number): number | undefined {
    let best: number | undefined;
    for (const v of this.values) {
      if (v <= key && (best === undefined || v > best)) {
        best = v;
      }
    }
    return best;
  }

  min(): number | undefined {
    if (this.values.size === 0) return undefined;
    let m = Infinity;
    for (const v of this.values) if (v < m) m = v;
    return m;
  }

  max(): number | undefined {
    if (this.values.size === 0) return undefined;
    let m = -Infinity;
    for (const v of this.values) if (v > m) m = v;
    return m;
  }

  size(): number {
    return this.values.size;
  }
}

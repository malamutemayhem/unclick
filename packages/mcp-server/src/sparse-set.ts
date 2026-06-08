export class SparseSet {
  private dense: number[] = [];
  private sparse: number[] = [];
  private count = 0;

  constructor(maxValue: number) {
    this.sparse = new Array(maxValue + 1).fill(-1);
  }

  add(value: number): void {
    if (this.has(value)) return;
    this.sparse[value] = this.count;
    this.dense[this.count] = value;
    this.count++;
  }

  remove(value: number): boolean {
    if (!this.has(value)) return false;
    const idx = this.sparse[value];
    const last = this.dense[this.count - 1];
    this.dense[idx] = last;
    this.sparse[last] = idx;
    this.sparse[value] = -1;
    this.count--;
    return true;
  }

  has(value: number): boolean {
    const idx = this.sparse[value];
    return idx !== undefined && idx >= 0 && idx < this.count && this.dense[idx] === value;
  }

  get size(): number { return this.count; }

  clear(): void {
    this.sparse.fill(-1);
    this.count = 0;
  }

  toArray(): number[] {
    return this.dense.slice(0, this.count);
  }

  *[Symbol.iterator](): Iterator<number> {
    for (let i = 0; i < this.count; i++) yield this.dense[i];
  }
}

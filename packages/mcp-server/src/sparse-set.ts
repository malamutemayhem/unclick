export class SparseSet {
  private dense: number[] = [];
  private sparse: number[] = [];
  private n = 0;

  constructor(private capacity: number) {
    this.sparse = new Array(capacity).fill(0);
  }

  add(value: number): boolean {
    if (value < 0 || value >= this.capacity) return false;
    if (this.has(value)) return false;
    this.sparse[value] = this.n;
    this.dense[this.n] = value;
    this.n++;
    return true;
  }

  has(value: number): boolean {
    if (value < 0 || value >= this.capacity) return false;
    const idx = this.sparse[value];
    return idx < this.n && this.dense[idx] === value;
  }

  delete(value: number): boolean {
    if (!this.has(value)) return false;
    const idx = this.sparse[value];
    this.n--;
    const last = this.dense[this.n];
    this.dense[idx] = last;
    this.sparse[last] = idx;
    return true;
  }

  clear(): void {
    this.n = 0;
  }

  get size(): number {
    return this.n;
  }

  values(): number[] {
    return this.dense.slice(0, this.n);
  }

  forEach(fn: (value: number) => void): void {
    for (let i = 0; i < this.n; i++) {
      fn(this.dense[i]);
    }
  }
}

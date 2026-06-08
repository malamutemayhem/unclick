export class WaveletTree {
  private data: number[];
  private sorted: number[];
  private left: WaveletTree | null = null;
  private right: WaveletTree | null = null;
  private bitmask: boolean[];
  private lo: number;
  private hi: number;

  constructor(data: number[], lo?: number, hi?: number) {
    this.data = data;
    const vals = lo !== undefined ? null : [...new Set(data)].sort((a, b) => a - b);
    this.lo = lo !== undefined ? lo : (vals && vals.length > 0 ? vals[0] : 0);
    this.hi = hi !== undefined ? hi : (vals && vals.length > 0 ? vals[vals.length - 1] : 0);
    this.sorted = [...data].sort((a, b) => a - b);
    this.bitmask = [];

    if (this.lo >= this.hi || data.length === 0) {
      this.bitmask = data.map(() => false);
      return;
    }

    const mid = Math.floor((this.lo + this.hi) / 2);
    const leftData: number[] = [];
    const rightData: number[] = [];

    for (const v of data) {
      if (v <= mid) {
        this.bitmask.push(false);
        leftData.push(v);
      } else {
        this.bitmask.push(true);
        rightData.push(v);
      }
    }

    if (leftData.length > 0) this.left = new WaveletTree(leftData, this.lo, mid);
    if (rightData.length > 0) this.right = new WaveletTree(rightData, mid + 1, this.hi);
  }

  access(index: number): number {
    if (this.lo >= this.hi) return this.lo;
    const bit = this.bitmask[index];
    if (!bit) {
      const leftIndex = this.bitmask.slice(0, index + 1).filter((b) => !b).length - 1;
      return this.left!.access(leftIndex);
    }
    const rightIndex = this.bitmask.slice(0, index + 1).filter((b) => b).length - 1;
    return this.right!.access(rightIndex);
  }

  rank(value: number, end: number): number {
    if (this.lo >= this.hi) {
      return this.lo === value ? end : 0;
    }
    const mid = Math.floor((this.lo + this.hi) / 2);
    if (value <= mid) {
      const leftEnd = this.bitmask.slice(0, end).filter((b) => !b).length;
      return this.left ? this.left.rank(value, leftEnd) : 0;
    }
    const rightEnd = this.bitmask.slice(0, end).filter((b) => b).length;
    return this.right ? this.right.rank(value, rightEnd) : 0;
  }

  kthSmallest(k: number): number {
    if (k < 0 || k >= this.data.length) return -1;
    return this.sorted[k];
  }

  rangeCount(lo: number, hi: number): number {
    let count = 0;
    for (const v of this.data) {
      if (v >= lo && v <= hi) count++;
    }
    return count;
  }

  length(): number {
    return this.data.length;
  }
}

export class CountMinSketch {
  private table: number[][];
  private readonly width: number;
  private readonly depth: number;

  constructor(width = 1024, depth = 4) {
    this.width = width;
    this.depth = depth;
    this.table = Array.from({ length: depth }, () => new Array(width).fill(0));
  }

  add(item: string, count = 1): void {
    for (let i = 0; i < this.depth; i++) {
      const idx = this.hash(item, i);
      this.table[i][idx] += count;
    }
  }

  estimate(item: string): number {
    let min = Infinity;
    for (let i = 0; i < this.depth; i++) {
      const idx = this.hash(item, i);
      min = Math.min(min, this.table[i][idx]);
    }
    return min;
  }

  merge(other: CountMinSketch): CountMinSketch {
    if (this.width !== other.width || this.depth !== other.depth) {
      throw new Error("Dimensions must match");
    }
    const result = new CountMinSketch(this.width, this.depth);
    for (let i = 0; i < this.depth; i++) {
      for (let j = 0; j < this.width; j++) {
        result.table[i][j] = this.table[i][j] + other.table[i][j];
      }
    }
    return result;
  }

  reset(): void {
    for (let i = 0; i < this.depth; i++) {
      this.table[i].fill(0);
    }
  }

  private hash(item: string, seed: number): number {
    let h = seed * 0x9e3779b9;
    for (let i = 0; i < item.length; i++) {
      h = ((h << 5) - h + item.charCodeAt(i)) & 0x7fffffff;
    }
    return h % this.width;
  }
}

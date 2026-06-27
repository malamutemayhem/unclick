export class DisjointSet {
  private parent: number[];
  private rank: number[];
  private count: number;

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_: unknown, i: number) => i);
    this.rank = new Array(size).fill(0) as number[];
    this.count = size;
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.count--;
    return true;
  }

  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }

  get components(): number {
    return this.count;
  }

  componentSize(x: number): number {
    const root = this.find(x);
    let size = 0;
    for (let i = 0; i < this.parent.length; i++) {
      if (this.find(i) === root) size++;
    }
    return size;
  }
}

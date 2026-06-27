export class SegmentTree {
  private tree: number[];
  private n: number;
  private merge: (a: number, b: number) => number;
  private identity: number;

  constructor(data: number[], merge: (a: number, b: number) => number = (a, b) => a + b, identity = 0) {
    this.n = data.length;
    this.merge = merge;
    this.identity = identity;
    this.tree = new Array(4 * this.n).fill(identity);
    if (this.n > 0) this.build(data, 1, 0, this.n - 1);
  }

  private build(data: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = data[start];
      return;
    }
    const mid = (start + end) >> 1;
    this.build(data, 2 * node, start, mid);
    this.build(data, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.merge(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  update(index: number, value: number): void {
    this.updateNode(1, 0, this.n - 1, index, value);
  }

  private updateNode(node: number, start: number, end: number, index: number, value: number): void {
    if (start === end) {
      this.tree[node] = value;
      return;
    }
    const mid = (start + end) >> 1;
    if (index <= mid) this.updateNode(2 * node, start, mid, index, value);
    else this.updateNode(2 * node + 1, mid + 1, end, index, value);
    this.tree[node] = this.merge(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  query(left: number, right: number): number {
    return this.queryNode(1, 0, this.n - 1, left, right);
  }

  private queryNode(node: number, start: number, end: number, left: number, right: number): number {
    if (left > end || right < start) return this.identity;
    if (left <= start && end <= right) return this.tree[node];
    const mid = (start + end) >> 1;
    return this.merge(
      this.queryNode(2 * node, start, mid, left, right),
      this.queryNode(2 * node + 1, mid + 1, end, left, right)
    );
  }

  get size(): number {
    return this.n;
  }
}

export function sumTree(data: number[]): SegmentTree {
  return new SegmentTree(data, (a, b) => a + b, 0);
}

export function minTree(data: number[]): SegmentTree {
  return new SegmentTree(data, Math.min, Infinity);
}

export function maxTree(data: number[]): SegmentTree {
  return new SegmentTree(data, Math.max, -Infinity);
}

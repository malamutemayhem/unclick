export class LazySegmentTree {
  private tree: number[];
  private lazy: number[];
  private n: number;

  constructor(data: number[]) {
    this.n = data.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
    if (this.n > 0) this.build(data, 1, 0, this.n - 1);
  }

  private build(data: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = data[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.build(data, 2 * node, start, mid);
    this.build(data, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  private pushDown(node: number, start: number, end: number): void {
    if (this.lazy[node] !== 0) {
      const mid = Math.floor((start + end) / 2);
      this.apply(2 * node, start, mid, this.lazy[node]);
      this.apply(2 * node + 1, mid + 1, end, this.lazy[node]);
      this.lazy[node] = 0;
    }
  }

  private apply(node: number, start: number, end: number, val: number): void {
    this.tree[node] += val * (end - start + 1);
    this.lazy[node] += val;
  }

  rangeUpdate(l: number, r: number, val: number): void {
    if (this.n === 0) return;
    this.updateHelper(1, 0, this.n - 1, l, r, val);
  }

  private updateHelper(node: number, start: number, end: number, l: number, r: number, val: number): void {
    if (l > end || r < start) return;
    if (l <= start && end <= r) {
      this.apply(node, start, end, val);
      return;
    }
    this.pushDown(node, start, end);
    const mid = Math.floor((start + end) / 2);
    this.updateHelper(2 * node, start, mid, l, r, val);
    this.updateHelper(2 * node + 1, mid + 1, end, l, r, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  rangeQuery(l: number, r: number): number {
    if (this.n === 0) return 0;
    return this.queryHelper(1, 0, this.n - 1, l, r);
  }

  private queryHelper(node: number, start: number, end: number, l: number, r: number): number {
    if (l > end || r < start) return 0;
    if (l <= start && end <= r) return this.tree[node];
    this.pushDown(node, start, end);
    const mid = Math.floor((start + end) / 2);
    return this.queryHelper(2 * node, start, mid, l, r) + this.queryHelper(2 * node + 1, mid + 1, end, l, r);
  }

  pointQuery(idx: number): number {
    return this.rangeQuery(idx, idx);
  }

  pointUpdate(idx: number, val: number): void {
    this.rangeUpdate(idx, idx, val);
  }

  size(): number {
    return this.n;
  }

  totalSum(): number {
    if (this.n === 0) return 0;
    return this.rangeQuery(0, this.n - 1);
  }
}

export class MinSegmentTree {
  private tree: number[];
  private n: number;

  constructor(data: number[]) {
    this.n = data.length;
    this.tree = new Array(4 * this.n).fill(Infinity);
    if (this.n > 0) this.build(data, 1, 0, this.n - 1);
  }

  private build(data: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = data[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.build(data, 2 * node, start, mid);
    this.build(data, 2 * node + 1, mid + 1, end);
    this.tree[node] = Math.min(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  update(idx: number, val: number): void {
    if (this.n === 0) return;
    this.updateHelper(1, 0, this.n - 1, idx, val);
  }

  private updateHelper(node: number, start: number, end: number, idx: number, val: number): void {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this.updateHelper(2 * node, start, mid, idx, val);
    } else {
      this.updateHelper(2 * node + 1, mid + 1, end, idx, val);
    }
    this.tree[node] = Math.min(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  rangeMin(l: number, r: number): number {
    if (this.n === 0) return Infinity;
    return this.queryHelper(1, 0, this.n - 1, l, r);
  }

  private queryHelper(node: number, start: number, end: number, l: number, r: number): number {
    if (l > end || r < start) return Infinity;
    if (l <= start && end <= r) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    return Math.min(
      this.queryHelper(2 * node, start, mid, l, r),
      this.queryHelper(2 * node + 1, mid + 1, end, l, r)
    );
  }

  size(): number {
    return this.n;
  }
}

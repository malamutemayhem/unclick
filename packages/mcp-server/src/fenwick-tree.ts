export class FenwickTree {
  private tree: number[];
  private n: number;

  constructor(size: number);
  constructor(data: number[]);
  constructor(arg: number | number[]) {
    if (typeof arg === "number") {
      this.n = arg;
      this.tree = new Array(arg + 1).fill(0);
    } else {
      this.n = arg.length;
      this.tree = new Array(this.n + 1).fill(0);
      for (let i = 0; i < arg.length; i++) {
        this.add(i, arg[i]);
      }
    }
  }

  add(index: number, delta: number): void {
    let i = index + 1;
    while (i <= this.n) {
      this.tree[i] += delta;
      i += i & -i;
    }
  }

  prefixSum(index: number): number {
    let sum = 0;
    let i = index + 1;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i;
    }
    return sum;
  }

  rangeSum(left: number, right: number): number {
    if (left === 0) return this.prefixSum(right);
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }

  set(index: number, value: number): void {
    const current = this.rangeSum(index, index);
    this.add(index, value - current);
  }

  get(index: number): number {
    return this.rangeSum(index, index);
  }

  get size(): number {
    return this.n;
  }

  toArray(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this.n; i++) {
      result.push(this.get(i));
    }
    return result;
  }
}

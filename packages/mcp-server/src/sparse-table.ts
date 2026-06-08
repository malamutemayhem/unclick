export class SparseTable {
  private table: number[][];
  private log: number[];
  private op: (a: number, b: number) => number;
  private n: number;

  constructor(arr: number[], op: (a: number, b: number) => number = Math.min) {
    this.n = arr.length;
    this.op = op;
    this.log = new Array(this.n + 1).fill(0);
    for (let i = 2; i <= this.n; i++) {
      this.log[i] = this.log[i >> 1] + 1;
    }
    const k = this.log[this.n] + 1;
    this.table = Array.from({ length: k }, () => new Array(this.n).fill(0));
    for (let i = 0; i < this.n; i++) {
      this.table[0][i] = arr[i];
    }
    for (let j = 1; j < k; j++) {
      for (let i = 0; i + (1 << j) <= this.n; i++) {
        this.table[j][i] = this.op(
          this.table[j - 1][i],
          this.table[j - 1][i + (1 << (j - 1))]
        );
      }
    }
  }

  query(left: number, right: number): number {
    const j = this.log[right - left + 1];
    return this.op(this.table[j][left], this.table[j][right - (1 << j) + 1]);
  }

  size(): number {
    return this.n;
  }

  levels(): number {
    return this.table.length;
  }
}

export class RangeMinQuery {
  private st: SparseTable;

  constructor(arr: number[]) {
    this.st = new SparseTable(arr, Math.min);
  }

  min(left: number, right: number): number {
    return this.st.query(left, right);
  }
}

export class RangeMaxQuery {
  private st: SparseTable;

  constructor(arr: number[]) {
    this.st = new SparseTable(arr, Math.max);
  }

  max(left: number, right: number): number {
    return this.st.query(left, right);
  }
}

export class RangeGCDQuery {
  private st: SparseTable;

  constructor(arr: number[]) {
    this.st = new SparseTable(arr, RangeGCDQuery.gcd);
  }

  private static gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
  }

  query(left: number, right: number): number {
    return this.st.query(left, right);
  }
}

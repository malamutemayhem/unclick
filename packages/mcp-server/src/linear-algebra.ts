export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: number[];

  constructor(rows: number, cols: number, data?: number[]) {
    this.rows = rows;
    this.cols = cols;
    this.data = data ? [...data] : new Array(rows * cols).fill(0);
  }

  get(r: number, c: number): number {
    return this.data[r * this.cols + c];
  }

  set(r: number, c: number, v: number): void {
    this.data[r * this.cols + c] = v;
  }

  add(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = this.data[i] + other.data[i];
    }
    return result;
  }

  sub(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = this.data[i] - other.data[i];
    }
    return result;
  }

  scale(s: number): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = this.data[i] * s;
    }
    return result;
  }

  mul(other: Matrix): Matrix {
    const result = new Matrix(this.rows, other.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < other.cols; c++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.get(r, k) * other.get(k, c);
        }
        result.set(r, c, sum);
      }
    }
    return result;
  }

  transpose(): Matrix {
    const result = new Matrix(this.cols, this.rows);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        result.set(c, r, this.get(r, c));
      }
    }
    return result;
  }

  determinant(): number {
    if (this.rows !== this.cols) throw new Error("Not square");
    if (this.rows === 1) return this.data[0];
    if (this.rows === 2) {
      return this.data[0] * this.data[3] - this.data[1] * this.data[2];
    }

    let det = 0;
    for (let c = 0; c < this.cols; c++) {
      det += (c % 2 === 0 ? 1 : -1) * this.data[c] * this.minor(0, c).determinant();
    }
    return det;
  }

  private minor(row: number, col: number): Matrix {
    const data: number[] = [];
    for (let r = 0; r < this.rows; r++) {
      if (r === row) continue;
      for (let c = 0; c < this.cols; c++) {
        if (c === col) continue;
        data.push(this.get(r, c));
      }
    }
    return new Matrix(this.rows - 1, this.cols - 1, data);
  }

  trace(): number {
    let sum = 0;
    const n = Math.min(this.rows, this.cols);
    for (let i = 0; i < n; i++) sum += this.get(i, i);
    return sum;
  }

  toArray(): number[][] {
    const result: number[][] = [];
    for (let r = 0; r < this.rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < this.cols; c++) row.push(this.get(r, c));
      result.push(row);
    }
    return result;
  }

  static identity(n: number): Matrix {
    const m = new Matrix(n, n);
    for (let i = 0; i < n; i++) m.set(i, i, 1);
    return m;
  }

  static fromArray(arr: number[][]): Matrix {
    const rows = arr.length;
    const cols = arr[0].length;
    const data: number[] = [];
    for (const row of arr) data.push(...row);
    return new Matrix(rows, cols, data);
  }
}

export function solveLinear(A: Matrix, b: number[]): number[] | null {
  const n = A.rows;
  const aug: number[][] = [];
  for (let r = 0; r < n; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) row.push(A.get(r, c));
    row.push(b[r]);
    aug.push(row);
  }

  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) {
        maxRow = row;
      }
    }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];

    if (Math.abs(aug[col][col]) < 1e-12) return null;

    for (let row = col + 1; row < n; row++) {
      const factor = aug[row][col] / aug[col][col];
      for (let c = col; c <= n; c++) {
        aug[row][c] -= factor * aug[col][c];
      }
    }
  }

  const x = new Array(n).fill(0);
  for (let row = n - 1; row >= 0; row--) {
    x[row] = aug[row][n];
    for (let col = row + 1; col < n; col++) {
      x[row] -= aug[row][col] * x[col];
    }
    x[row] /= aug[row][row];
  }

  return x;
}

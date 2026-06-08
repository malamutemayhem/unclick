export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: number[];

  constructor(rows: number, cols: number, data?: number[]) {
    this.rows = rows;
    this.cols = cols;
    this.data = data ? [...data] : new Array(rows * cols).fill(0);
  }

  get(row: number, col: number): number {
    return this.data[row * this.cols + col];
  }

  set(row: number, col: number, value: number): void {
    this.data[row * this.cols + col] = value;
  }

  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) throw new Error("Dimension mismatch");
    return new Matrix(this.rows, this.cols, this.data.map((v, i) => v + other.data[i]));
  }

  subtract(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) throw new Error("Dimension mismatch");
    return new Matrix(this.rows, this.cols, this.data.map((v, i) => v - other.data[i]));
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) throw new Error("Dimension mismatch");
    const result = new Matrix(this.rows, other.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.get(i, k) * other.get(k, j);
        }
        result.set(i, j, sum);
      }
    }
    return result;
  }

  scale(scalar: number): Matrix {
    return new Matrix(this.rows, this.cols, this.data.map((v) => v * scalar));
  }

  transpose(): Matrix {
    const result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.set(j, i, this.get(i, j));
      }
    }
    return result;
  }

  determinant(): number {
    if (this.rows !== this.cols) throw new Error("Must be square");
    if (this.rows === 1) return this.get(0, 0);
    if (this.rows === 2) return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);

    let det = 0;
    for (let j = 0; j < this.cols; j++) {
      det += (j % 2 === 0 ? 1 : -1) * this.get(0, j) * this.minor(0, j).determinant();
    }
    return det;
  }

  minor(row: number, col: number): Matrix {
    const data: number[] = [];
    for (let i = 0; i < this.rows; i++) {
      if (i === row) continue;
      for (let j = 0; j < this.cols; j++) {
        if (j === col) continue;
        data.push(this.get(i, j));
      }
    }
    return new Matrix(this.rows - 1, this.cols - 1, data);
  }

  toArray(): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < this.rows; i++) {
      result.push(this.data.slice(i * this.cols, (i + 1) * this.cols));
    }
    return result;
  }

  equals(other: Matrix): boolean {
    if (this.rows !== other.rows || this.cols !== other.cols) return false;
    return this.data.every((v, i) => v === other.data[i]);
  }

  static identity(size: number): Matrix {
    const m = new Matrix(size, size);
    for (let i = 0; i < size; i++) m.set(i, i, 1);
    return m;
  }

  static from(arr: number[][]): Matrix {
    const rows = arr.length;
    const cols = arr[0]?.length || 0;
    return new Matrix(rows, cols, arr.flat());
  }
}

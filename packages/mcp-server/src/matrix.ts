export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: number[][];

  constructor(data: number[][]) {
    if (data.length === 0 || data[0].length === 0) throw new Error("Matrix cannot be empty");
    const cols = data[0].length;
    for (const row of data) {
      if (row.length !== cols) throw new Error("All rows must have same length");
    }
    this.rows = data.length;
    this.cols = cols;
    this.data = data.map((r: number[]) => [...r]);
  }

  get(row: number, col: number): number { return this.data[row][col]; }

  set(row: number, col: number, value: number): void { this.data[row][col] = value; }

  add(other: Matrix): Matrix {
    this.assertSameSize(other);
    return new Matrix(this.data.map((row: number[], i: number) => row.map((v: number, j: number) => v + other.data[i][j])));
  }

  subtract(other: Matrix): Matrix {
    this.assertSameSize(other);
    return new Matrix(this.data.map((row: number[], i: number) => row.map((v: number, j: number) => v - other.data[i][j])));
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) throw new Error("Incompatible dimensions for multiplication");
    const result: number[][] = [];
    for (let i = 0; i < this.rows; i++) {
      result[i] = [];
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) sum += this.data[i][k] * other.data[k][j];
        result[i][j] = sum;
      }
    }
    return new Matrix(result);
  }

  scale(factor: number): Matrix {
    return new Matrix(this.data.map((row: number[]) => row.map((v: number) => v * factor)));
  }

  transpose(): Matrix {
    const result: number[][] = [];
    for (let j = 0; j < this.cols; j++) {
      result[j] = [];
      for (let i = 0; i < this.rows; i++) result[j][i] = this.data[i][j];
    }
    return new Matrix(result);
  }

  determinant(): number {
    if (this.rows !== this.cols) throw new Error("Determinant requires square matrix");
    if (this.rows === 1) return this.data[0][0];
    if (this.rows === 2) return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
    let det = 0;
    for (let j = 0; j < this.cols; j++) {
      det += (j % 2 === 0 ? 1 : -1) * this.data[0][j] * this.minor(0, j).determinant();
    }
    return det;
  }

  minor(row: number, col: number): Matrix {
    const data = this.data
      .filter((_: number[], i: number) => i !== row)
      .map((r: number[]) => r.filter((_: number, j: number) => j !== col));
    return new Matrix(data);
  }

  equals(other: Matrix): boolean {
    if (this.rows !== other.rows || this.cols !== other.cols) return false;
    return this.data.every((row: number[], i: number) => row.every((v: number, j: number) => v === other.data[i][j]));
  }

  toArray(): number[][] { return this.data.map((r: number[]) => [...r]); }

  static identity(size: number): Matrix {
    const data: number[][] = [];
    for (let i = 0; i < size; i++) {
      data[i] = new Array(size).fill(0);
      data[i][i] = 1;
    }
    return new Matrix(data);
  }

  static zeros(rows: number, cols: number): Matrix {
    return new Matrix(Array.from({ length: rows }, () => new Array(cols).fill(0)));
  }

  private assertSameSize(other: Matrix): void {
    if (this.rows !== other.rows || this.cols !== other.cols) throw new Error("Matrices must have same dimensions");
  }
}

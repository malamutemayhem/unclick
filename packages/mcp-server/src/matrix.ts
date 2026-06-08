export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: Float64Array;

  constructor(rows: number, cols: number, data?: number[]) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Float64Array(rows * cols);
    if (data) {
      for (let i = 0; i < Math.min(data.length, rows * cols); i++) {
        this.data[i] = data[i];
      }
    }
  }

  get(row: number, col: number): number {
    return this.data[row * this.cols + col];
  }

  set(row: number, col: number, value: number): void {
    this.data[row * this.cols + col] = value;
  }

  add(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = this.data[i] + other.data[i];
    }
    return result;
  }

  subtract(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = this.data[i] - other.data[i];
    }
    return result;
  }

  multiply(other: Matrix): Matrix {
    const result = new Matrix(this.rows, other.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < other.cols; c++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[r * this.cols + k] * other.data[k * other.cols + c];
        }
        result.data[r * other.cols + c] = sum;
      }
    }
    return result;
  }

  scale(scalar: number): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.data.length; i++) {
      result.data[i] = this.data[i] * scalar;
    }
    return result;
  }

  transpose(): Matrix {
    const result = new Matrix(this.cols, this.rows);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        result.data[c * this.rows + r] = this.data[r * this.cols + c];
      }
    }
    return result;
  }

  determinant(): number {
    if (this.rows !== this.cols) throw new Error("Determinant requires square matrix");
    if (this.rows === 1) return this.data[0];
    if (this.rows === 2) return this.data[0] * this.data[3] - this.data[1] * this.data[2];
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
        data.push(this.data[r * this.cols + c]);
      }
    }
    return new Matrix(this.rows - 1, this.cols - 1, data);
  }

  toArray(): number[][] {
    const result: number[][] = [];
    for (let r = 0; r < this.rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < this.cols; c++) {
        row.push(this.data[r * this.cols + c]);
      }
      result.push(row);
    }
    return result;
  }

  static identity(size: number): Matrix {
    const m = new Matrix(size, size);
    for (let i = 0; i < size; i++) m.set(i, i, 1);
    return m;
  }

  static zeros(rows: number, cols: number): Matrix {
    return new Matrix(rows, cols);
  }
}

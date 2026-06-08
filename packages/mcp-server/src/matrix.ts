export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: Float64Array;

  constructor(rows: number, cols: number, data?: number[]) {
    this.rows = rows;
    this.cols = cols;
    this.data = data ? new Float64Array(data) : new Float64Array(rows * cols);
  }

  get(r: number, c: number): number {
    return this.data[r * this.cols + c];
  }

  set(r: number, c: number, value: number): void {
    this.data[r * this.cols + c] = value;
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
          sum += this.get(r, k) * other.get(k, c);
        }
        result.set(r, c, sum);
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
        result.set(c, r, this.get(r, c));
      }
    }
    return result;
  }

  toArray(): number[][] {
    const result: number[][] = [];
    for (let r = 0; r < this.rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < this.cols; c++) {
        row.push(this.get(r, c));
      }
      result.push(row);
    }
    return result;
  }

  equals(other: Matrix, epsilon = 1e-10): boolean {
    if (this.rows !== other.rows || this.cols !== other.cols) return false;
    for (let i = 0; i < this.data.length; i++) {
      if (Math.abs(this.data[i] - other.data[i]) > epsilon) return false;
    }
    return true;
  }

  static identity(size: number): Matrix {
    const m = new Matrix(size, size);
    for (let i = 0; i < size; i++) m.set(i, i, 1);
    return m;
  }

  static from(data: number[][]): Matrix {
    const rows = data.length;
    const cols = data[0]?.length || 0;
    const flat = data.flat();
    return new Matrix(rows, cols, flat);
  }
}

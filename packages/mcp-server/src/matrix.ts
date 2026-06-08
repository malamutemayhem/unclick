export class Matrix {
  private data: number[][];
  readonly rows: number;
  readonly cols: number;

  constructor(rows: number, cols: number, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => new Array(cols).fill(fill));
  }

  get(row: number, col: number): number {
    return this.data[row][col];
  }

  set(row: number, col: number, value: number): void {
    this.data[row][col] = value;
  }

  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions must match");
    }
    const result = new Matrix(this.rows, this.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        result.set(r, c, this.get(r, c) + other.get(r, c));
      }
    }
    return result;
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error("Incompatible dimensions for multiplication");
    }
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

  scale(factor: number): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        result.set(r, c, this.get(r, c) * factor);
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

  toArray(): number[][] {
    return this.data.map((row) => [...row]);
  }

  static identity(size: number): Matrix {
    const m = new Matrix(size, size);
    for (let i = 0; i < size; i++) m.set(i, i, 1);
    return m;
  }

  static from(data: number[][]): Matrix {
    const m = new Matrix(data.length, data[0]?.length ?? 0);
    for (let r = 0; r < data.length; r++) {
      for (let c = 0; c < data[r].length; c++) {
        m.set(r, c, data[r][c]);
      }
    }
    return m;
  }
}

export class Matrix {
  readonly rows: number;
  readonly cols: number;
  private data: number[][];

  constructor(rows: number, cols: number, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => new Array(cols).fill(fill));
  }

  static fromArray(data: number[][]): Matrix {
    const m = new Matrix(data.length, data[0]?.length ?? 0);
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        m.data[i][j] = data[i][j];
      }
    }
    return m;
  }

  static identity(size: number): Matrix {
    const m = new Matrix(size, size);
    for (let i = 0; i < size; i++) m.data[i][i] = 1;
    return m;
  }

  get(row: number, col: number): number {
    return this.data[row][col];
  }

  set(row: number, col: number, value: number): void {
    this.data[row][col] = value;
  }

  add(other: Matrix): Matrix {
    if (this.rows !== other.rows || this.cols !== other.cols) throw new Error("Dimension mismatch");
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.data[i][j] = this.data[i][j] + other.data[i][j];
    return result;
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) throw new Error("Dimension mismatch");
    const result = new Matrix(this.rows, other.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < other.cols; j++)
        for (let k = 0; k < this.cols; k++)
          result.data[i][j] += this.data[i][k] * other.data[k][j];
    return result;
  }

  scale(factor: number): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.data[i][j] = this.data[i][j] * factor;
    return result;
  }

  transpose(): Matrix {
    const result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.data[j][i] = this.data[i][j];
    return result;
  }

  toArray(): number[][] {
    return this.data.map((row) => [...row]);
  }

  getRow(row: number): number[] {
    return [...this.data[row]];
  }

  getCol(col: number): number[] {
    return this.data.map((row) => row[col]);
  }

  map(fn: (value: number, row: number, col: number) => number): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.data[i][j] = fn(this.data[i][j], i, j);
    return result;
  }
}

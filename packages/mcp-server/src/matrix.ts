export class Matrix {
  private data: number[][];
  readonly rows: number;
  readonly cols: number;

  constructor(rows: number, cols: number, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => new Array(cols).fill(fill));
  }

  get(row: number, col: number): number { return this.data[row][col]; }
  set(row: number, col: number, value: number): void { this.data[row][col] = value; }

  add(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.set(i, j, this.get(i, j) + other.get(i, j));
    return result;
  }

  multiply(other: Matrix): Matrix {
    if (this.cols !== other.rows) throw new Error("Incompatible dimensions");
    const result = new Matrix(this.rows, other.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < other.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) sum += this.get(i, k) * other.get(k, j);
        result.set(i, j, sum);
      }
    return result;
  }

  scale(scalar: number): Matrix {
    const result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.set(i, j, this.get(i, j) * scalar);
    return result;
  }

  transpose(): Matrix {
    const result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        result.set(j, i, this.get(i, j));
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
    const m = new Matrix(data.length, data[0]?.length || 0);
    for (let i = 0; i < data.length; i++)
      for (let j = 0; j < data[i].length; j++)
        m.set(i, j, data[i][j]);
    return m;
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

  private minor(row: number, col: number): Matrix {
    const result = new Matrix(this.rows - 1, this.cols - 1);
    let ri = 0;
    for (let i = 0; i < this.rows; i++) {
      if (i === row) continue;
      let ci = 0;
      for (let j = 0; j < this.cols; j++) {
        if (j === col) continue;
        result.set(ri, ci, this.get(i, j));
        ci++;
      }
      ri++;
    }
    return result;
  }
}

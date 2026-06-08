export class FenwickTree2D {
  private tree: number[][];
  private rows: number;
  private cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.tree = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  }

  update(row: number, col: number, delta: number): void {
    for (let i = row + 1; i <= this.rows; i += i & -i) {
      for (let j = col + 1; j <= this.cols; j += j & -j) {
        this.tree[i][j] += delta;
      }
    }
  }

  prefixSum(row: number, col: number): number {
    let sum = 0;
    for (let i = row + 1; i > 0; i -= i & -i) {
      for (let j = col + 1; j > 0; j -= j & -j) {
        sum += this.tree[i][j];
      }
    }
    return sum;
  }

  rangeSum(r1: number, c1: number, r2: number, c2: number): number {
    return (
      this.prefixSum(r2, c2) -
      (r1 > 0 ? this.prefixSum(r1 - 1, c2) : 0) -
      (c1 > 0 ? this.prefixSum(r2, c1 - 1) : 0) +
      (r1 > 0 && c1 > 0 ? this.prefixSum(r1 - 1, c1 - 1) : 0)
    );
  }

  set(row: number, col: number, value: number): void {
    const current = this.rangeSum(row, col, row, col);
    this.update(row, col, value - current);
  }

  dimensions(): { rows: number; cols: number } {
    return { rows: this.rows, cols: this.cols };
  }

  static fromMatrix(matrix: number[][]): FenwickTree2D {
    const rows = matrix.length;
    const cols = rows > 0 ? matrix[0].length : 0;
    const ft = new FenwickTree2D(rows, cols);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] !== 0) {
          ft.update(i, j, matrix[i][j]);
        }
      }
    }
    return ft;
  }
}

export class SparseMatrix {
  private data = new Map<string, number>();
  private rowCount = 0;
  private colCount = 0;

  private key(row: number, col: number): string {
    return `${row},${col}`;
  }

  set(row: number, col: number, value: number): void {
    if (value === 0) {
      this.data.delete(this.key(row, col));
    } else {
      this.data.set(this.key(row, col), value);
    }
    this.rowCount = Math.max(this.rowCount, row + 1);
    this.colCount = Math.max(this.colCount, col + 1);
  }

  get(row: number, col: number): number {
    return this.data.get(this.key(row, col)) ?? 0;
  }

  rows(): number {
    return this.rowCount;
  }

  cols(): number {
    return this.colCount;
  }

  nonZeroCount(): number {
    return this.data.size;
  }

  add(other: SparseMatrix): SparseMatrix {
    const result = new SparseMatrix();
    const maxR = Math.max(this.rowCount, other.rowCount);
    const maxC = Math.max(this.colCount, other.colCount);
    for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
        const val = this.get(r, c) + other.get(r, c);
        if (val !== 0) result.set(r, c, val);
      }
    }
    return result;
  }

  multiply(other: SparseMatrix): SparseMatrix {
    const result = new SparseMatrix();
    for (let r = 0; r < this.rowCount; r++) {
      for (let c = 0; c < other.colCount; c++) {
        let sum = 0;
        for (let k = 0; k < this.colCount; k++) {
          sum += this.get(r, k) * other.get(k, c);
        }
        if (sum !== 0) result.set(r, c, sum);
      }
    }
    return result;
  }

  scale(scalar: number): SparseMatrix {
    const result = new SparseMatrix();
    for (const [key, value] of this.data) {
      const [r, c] = key.split(",").map(Number);
      const newVal = value * scalar;
      if (newVal !== 0) result.set(r, c, newVal);
    }
    return result;
  }

  transpose(): SparseMatrix {
    const result = new SparseMatrix();
    for (const [key, value] of this.data) {
      const [r, c] = key.split(",").map(Number);
      result.set(c, r, value);
    }
    return result;
  }

  getRow(row: number): number[] {
    const result: number[] = [];
    for (let c = 0; c < this.colCount; c++) {
      result.push(this.get(row, c));
    }
    return result;
  }

  getCol(col: number): number[] {
    const result: number[] = [];
    for (let r = 0; r < this.rowCount; r++) {
      result.push(this.get(r, col));
    }
    return result;
  }

  toDense(): number[][] {
    const result: number[][] = [];
    for (let r = 0; r < this.rowCount; r++) {
      result.push(this.getRow(r));
    }
    return result;
  }

  static fromDense(matrix: number[][]): SparseMatrix {
    const sm = new SparseMatrix();
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] !== 0) {
          sm.set(r, c, matrix[r][c]);
        }
      }
    }
    return sm;
  }

  static identity(size: number): SparseMatrix {
    const sm = new SparseMatrix();
    for (let i = 0; i < size; i++) {
      sm.set(i, i, 1);
    }
    return sm;
  }

  trace(): number {
    let sum = 0;
    const size = Math.min(this.rowCount, this.colCount);
    for (let i = 0; i < size; i++) {
      sum += this.get(i, i);
    }
    return sum;
  }

  density(): number {
    const total = this.rowCount * this.colCount;
    if (total === 0) return 0;
    return this.data.size / total;
  }
}

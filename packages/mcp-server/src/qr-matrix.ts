export class QrMatrix {
  private size: number;
  private modules: boolean[][];

  constructor(size: number) {
    this.size = size;
    this.modules = Array.from({ length: size }, () => new Array(size).fill(false));
  }

  set(row: number, col: number, value: boolean): void {
    if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
      this.modules[row][col] = value;
    }
  }

  get(row: number, col: number): boolean {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) return false;
    return this.modules[row][col];
  }

  addFinderPattern(row: number, col: number): void {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r;
        const cc = col + c;
        if (rr < 0 || rr >= this.size || cc < 0 || cc >= this.size) continue;

        if (r === -1 || r === 7 || c === -1 || c === 7) {
          this.set(rr, cc, false);
        } else if (r === 0 || r === 6 || c === 0 || c === 6) {
          this.set(rr, cc, true);
        } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          this.set(rr, cc, true);
        } else {
          this.set(rr, cc, false);
        }
      }
    }
  }

  addTimingPatterns(): void {
    for (let i = 8; i < this.size - 8; i++) {
      this.set(6, i, i % 2 === 0);
      this.set(i, 6, i % 2 === 0);
    }
  }

  addAlignmentPattern(row: number, col: number): void {
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const isOuter = Math.abs(r) === 2 || Math.abs(c) === 2;
        const isCenter = r === 0 && c === 0;
        this.set(row + r, col + c, isOuter || isCenter);
      }
    }
  }

  populateData(data: boolean[]): void {
    let dataIdx = 0;
    let upward = true;

    for (let col = this.size - 1; col >= 0; col -= 2) {
      if (col === 6) col = 5;

      const rows = upward
        ? Array.from({ length: this.size }, (_, i) => this.size - 1 - i)
        : Array.from({ length: this.size }, (_, i) => i);

      for (const row of rows) {
        for (const c of [col, col - 1]) {
          if (c < 0) continue;
          if (dataIdx < data.length) {
            this.set(row, c, data[dataIdx]);
            dataIdx++;
          }
        }
      }

      upward = !upward;
    }
  }

  applyMask(maskFn: (row: number, col: number) => boolean): void {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (maskFn(r, c)) {
          this.modules[r][c] = !this.modules[r][c];
        }
      }
    }
  }

  getSize(): number {
    return this.size;
  }

  darkModuleCount(): number {
    let count = 0;
    for (const row of this.modules) {
      for (const mod of row) {
        if (mod) count++;
      }
    }
    return count;
  }

  darkPercentage(): number {
    return (this.darkModuleCount() / (this.size * this.size)) * 100;
  }

  toAscii(dark = "##", light = "  "): string {
    return this.modules.map((row) => row.map((m) => (m ? dark : light)).join("")).join("\n");
  }

  toMatrix(): boolean[][] {
    return this.modules.map((row) => [...row]);
  }

  static checkerboard(size: number): QrMatrix {
    const matrix = new QrMatrix(size);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        matrix.set(r, c, (r + c) % 2 === 0);
      }
    }
    return matrix;
  }
}

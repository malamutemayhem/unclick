export type CellState = number;

export class Automaton1D {
  private rule: Uint8Array;
  private cells: Uint8Array;
  private width: number;

  constructor(ruleNumber: number, width: number, initialState?: number[]) {
    this.width = width;
    this.rule = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
      this.rule[i] = (ruleNumber >> i) & 1;
    }
    this.cells = new Uint8Array(width);
    if (initialState) {
      for (let i = 0; i < Math.min(initialState.length, width); i++) {
        this.cells[i] = initialState[i] & 1;
      }
    } else {
      this.cells[Math.floor(width / 2)] = 1;
    }
  }

  step(): number[] {
    const next = new Uint8Array(this.width);
    for (let i = 0; i < this.width; i++) {
      const left = this.cells[(i - 1 + this.width) % this.width];
      const center = this.cells[i];
      const right = this.cells[(i + 1) % this.width];
      const index = (left << 2) | (center << 1) | right;
      next[i] = this.rule[index];
    }
    this.cells = next;
    return Array.from(this.cells);
  }

  run(steps: number): number[][] {
    const history: number[][] = [Array.from(this.cells)];
    for (let i = 0; i < steps; i++) {
      history.push(this.step());
    }
    return history;
  }

  getState(): number[] {
    return Array.from(this.cells);
  }
}

export class GameOfLife {
  private grid: Uint8Array;
  private width: number;
  private height: number;

  constructor(width: number, height: number, liveCells?: [number, number][]) {
    this.width = width;
    this.height = height;
    this.grid = new Uint8Array(width * height);
    if (liveCells) {
      for (const [x, y] of liveCells) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
          this.grid[y * width + x] = 1;
        }
      }
    }
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + this.width) % this.width;
        const ny = (y + dy + this.height) % this.height;
        count += this.grid[ny * this.width + nx];
      }
    }
    return count;
  }

  step(): void {
    const next = new Uint8Array(this.width * this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);
        const alive = this.grid[y * this.width + x] === 1;
        if (alive && (neighbors === 2 || neighbors === 3)) {
          next[y * this.width + x] = 1;
        } else if (!alive && neighbors === 3) {
          next[y * this.width + x] = 1;
        }
      }
    }
    this.grid = next;
  }

  run(steps: number): void {
    for (let i = 0; i < steps; i++) {
      this.step();
    }
  }

  getCell(x: number, y: number): number {
    return this.grid[y * this.width + x];
  }

  setCell(x: number, y: number, value: number): void {
    this.grid[y * this.width + x] = value & 1;
  }

  getLiveCells(): [number, number][] {
    const cells: [number, number][] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y * this.width + x] === 1) {
          cells.push([x, y]);
        }
      }
    }
    return cells;
  }

  population(): number {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      count += this.grid[i];
    }
    return count;
  }

  toGrid(): number[][] {
    const result: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      result.push(Array.from(this.grid.slice(y * this.width, (y + 1) * this.width)));
    }
    return result;
  }
}

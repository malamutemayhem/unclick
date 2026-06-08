export class CellularAutomaton1D {
  private state: boolean[];
  private rule: boolean[];
  private history: boolean[][] = [];

  constructor(size: number, rule: number) {
    this.state = new Array(size).fill(false);
    this.rule = CellularAutomaton1D.parseRule(rule);
    this.history.push([...this.state]);
  }

  static parseRule(ruleNumber: number): boolean[] {
    const bits: boolean[] = [];
    for (let i = 0; i < 8; i++) {
      bits.push((ruleNumber & (1 << i)) !== 0);
    }
    return bits;
  }

  setCell(index: number, value: boolean): void {
    if (index >= 0 && index < this.state.length) {
      this.state[index] = value;
      this.history[this.history.length - 1] = [...this.state];
    }
  }

  seedCenter(): void {
    this.state.fill(false);
    this.state[Math.floor(this.state.length / 2)] = true;
    this.history[this.history.length - 1] = [...this.state];
  }

  seedRandom(density = 0.5): void {
    this.state = this.state.map(() => Math.random() < density);
    this.history[this.history.length - 1] = [...this.state];
  }

  step(): void {
    const size = this.state.length;
    const next: boolean[] = new Array(size);
    for (let i = 0; i < size; i++) {
      const left = this.state[(i - 1 + size) % size] ? 1 : 0;
      const center = this.state[i] ? 1 : 0;
      const right = this.state[(i + 1) % size] ? 1 : 0;
      const idx = (left << 2) | (center << 1) | right;
      next[i] = this.rule[idx];
    }
    this.state = next;
    this.history.push([...this.state]);
  }

  run(steps: number): void {
    for (let i = 0; i < steps; i++) {
      this.step();
    }
  }

  getState(): boolean[] {
    return [...this.state];
  }

  getHistory(): boolean[][] {
    return this.history.map((row) => [...row]);
  }

  population(): number {
    return this.state.filter((c) => c).length;
  }

  toAscii(): string {
    return this.history.map((row) => row.map((c) => (c ? "#" : ".")).join("")).join("\n");
  }
}

export class GameOfLife {
  private grid: boolean[][];
  private width: number;
  private height: number;
  private generation = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => new Array(width).fill(false));
  }

  setCell(x: number, y: number, alive: boolean): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = alive;
    }
  }

  getCell(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
    return this.grid[y][x];
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        if (this.getCell(x + dx, y + dy)) count++;
      }
    }
    return count;
  }

  step(): void {
    const next: boolean[][] = Array.from({ length: this.height }, () =>
      new Array(this.width).fill(false),
    );

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);
        const alive = this.grid[y][x];
        next[y][x] = alive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
      }
    }

    this.grid = next;
    this.generation++;
  }

  run(steps: number): void {
    for (let i = 0; i < steps; i++) {
      this.step();
    }
  }

  population(): number {
    let count = 0;
    for (const row of this.grid) {
      for (const cell of row) {
        if (cell) count++;
      }
    }
    return count;
  }

  getGeneration(): number {
    return this.generation;
  }

  addGlider(x: number, y: number): void {
    const pattern = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ];
    for (let dy = 0; dy < 3; dy++) {
      for (let dx = 0; dx < 3; dx++) {
        if (pattern[dy][dx]) this.setCell(x + dx, y + dy, true);
      }
    }
  }

  addBlinker(x: number, y: number): void {
    this.setCell(x, y, true);
    this.setCell(x + 1, y, true);
    this.setCell(x + 2, y, true);
  }

  toAscii(): string {
    return this.grid.map((row) => row.map((c) => (c ? "#" : ".")).join("")).join("\n");
  }
}

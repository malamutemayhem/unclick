export class GameOfLife {
  private width: number;
  private height: number;
  private grid: Uint8Array;
  private generation = 0;
  private wrap: boolean;

  constructor(width: number, height: number, wrap = true) {
    this.width = width;
    this.height = height;
    this.wrap = wrap;
    this.grid = new Uint8Array(width * height);
  }

  setCell(x: number, y: number, alive: boolean): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y * this.width + x] = alive ? 1 : 0;
    }
  }

  getCell(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
    return this.grid[y * this.width + x] === 1;
  }

  private neighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        let nx = x + dx;
        let ny = y + dy;
        if (this.wrap) {
          nx = ((nx % this.width) + this.width) % this.width;
          ny = ((ny % this.height) + this.height) % this.height;
        } else if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) {
          continue;
        }
        if (this.grid[ny * this.width + nx]) count++;
      }
    }
    return count;
  }

  step(): void {
    const next = new Uint8Array(this.width * this.height);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const n = this.neighbors(x, y);
        const alive = this.grid[y * this.width + x] === 1;
        if (alive) {
          next[y * this.width + x] = (n === 2 || n === 3) ? 1 : 0;
        } else {
          next[y * this.width + x] = (n === 3) ? 1 : 0;
        }
      }
    }
    this.grid = next;
    this.generation++;
  }

  run(steps: number): void {
    for (let i = 0; i < steps; i++) this.step();
  }

  population(): number {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i]) count++;
    }
    return count;
  }

  clear(): void {
    this.grid.fill(0);
    this.generation = 0;
  }

  randomize(density = 0.3, seed = 42): void {
    let s = seed;
    const rng = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = rng() < density ? 1 : 0;
    }
  }

  addGlider(x: number, y: number): void {
    const pattern = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    for (const [dy, dx] of pattern) {
      this.setCell(x + dx, y + dy, true);
    }
  }

  addBlinker(x: number, y: number): void {
    this.setCell(x, y, true);
    this.setCell(x + 1, y, true);
    this.setCell(x + 2, y, true);
  }

  get gen(): number { return this.generation; }
  get gridWidth(): number { return this.width; }
  get gridHeight(): number { return this.height; }

  toString(): string {
    const lines: string[] = [];
    for (let y = 0; y < this.height; y++) {
      let line = "";
      for (let x = 0; x < this.width; x++) {
        line += this.grid[y * this.width + x] ? "#" : ".";
      }
      lines.push(line);
    }
    return lines.join("\n");
  }
}

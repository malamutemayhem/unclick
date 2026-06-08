export class CellularAutomata3D {
  grid: boolean[][][];
  width: number;
  height: number;
  depth: number;

  constructor(width: number, height: number, depth: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.grid = [];
    for (let z = 0; z < depth; z++) {
      const layer: boolean[][] = [];
      for (let y = 0; y < height; y++) {
        layer.push(new Array(width).fill(false));
      }
      this.grid.push(layer);
    }
  }

  set(x: number, y: number, z: number, alive: boolean): void {
    if (this.inBounds(x, y, z)) this.grid[z][y][x] = alive;
  }

  get(x: number, y: number, z: number): boolean {
    if (!this.inBounds(x, y, z)) return false;
    return this.grid[z][y][x];
  }

  private inBounds(x: number, y: number, z: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height && z >= 0 && z < this.depth;
  }

  countNeighbors(x: number, y: number, z: number): number {
    let count = 0;
    for (let dz = -1; dz <= 1; dz++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          if (this.get(x + dx, y + dy, z + dz)) count++;
        }
      }
    }
    return count;
  }

  step(birthMin: number, birthMax: number, surviveMin: number, surviveMax: number): void {
    const next: boolean[][][] = [];
    for (let z = 0; z < this.depth; z++) {
      const layer: boolean[][] = [];
      for (let y = 0; y < this.height; y++) {
        const row: boolean[] = [];
        for (let x = 0; x < this.width; x++) {
          const neighbors = this.countNeighbors(x, y, z);
          if (this.grid[z][y][x]) {
            row.push(neighbors >= surviveMin && neighbors <= surviveMax);
          } else {
            row.push(neighbors >= birthMin && neighbors <= birthMax);
          }
        }
        layer.push(row);
      }
      next.push(layer);
    }
    this.grid = next;
  }

  population(): number {
    let count = 0;
    for (let z = 0; z < this.depth; z++) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.grid[z][y][x]) count++;
        }
      }
    }
    return count;
  }

  density(): number {
    return Math.round((this.population() / (this.width * this.height * this.depth)) * 10000) / 10000;
  }

  slice(z: number): boolean[][] {
    if (z < 0 || z >= this.depth) return [];
    return this.grid[z].map(row => [...row]);
  }

  randomize(probability = 0.5): void {
    for (let z = 0; z < this.depth; z++) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          this.grid[z][y][x] = Math.random() < probability;
        }
      }
    }
  }

  clear(): void {
    for (let z = 0; z < this.depth; z++) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          this.grid[z][y][x] = false;
        }
      }
    }
  }
}

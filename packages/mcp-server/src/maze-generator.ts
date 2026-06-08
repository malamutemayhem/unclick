export type Cell = {
  x: number;
  y: number;
  walls: { north: boolean; south: boolean; east: boolean; west: boolean };
  visited: boolean;
};

export class MazeGenerator {
  private grid: Cell[][];
  private width: number;
  private height: number;
  private seed: number;

  constructor(width: number, height: number, seed = 42) {
    this.width = width;
    this.height = height;
    this.seed = seed;
    this.grid = [];
    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < width; x++) {
        row.push({
          x, y,
          walls: { north: true, south: true, east: true, west: true },
          visited: false,
        });
      }
      this.grid.push(row);
    }
  }

  private random(): number {
    this.seed = (this.seed * 1664525 + 1013904223) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  generateDFS(): Cell[][] {
    this.reset();
    const stack: Cell[] = [];
    const start = this.grid[0][0];
    start.visited = true;
    stack.push(start);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = this.unvisitedNeighbors(current.x, current.y);

      if (neighbors.length === 0) {
        stack.pop();
      } else {
        const idx = Math.floor(this.random() * neighbors.length);
        const next = neighbors[idx];
        this.removeWall(current, next);
        next.visited = true;
        stack.push(next);
      }
    }

    return this.grid.map((row) => row.map((c) => ({ ...c, walls: { ...c.walls } })));
  }

  generateKruskal(): Cell[][] {
    this.reset();
    const edges: Array<{ from: Cell; to: Cell }> = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (x + 1 < this.width) edges.push({ from: this.grid[y][x], to: this.grid[y][x + 1] });
        if (y + 1 < this.height) edges.push({ from: this.grid[y][x], to: this.grid[y + 1][x] });
      }
    }

    for (let i = edges.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [edges[i], edges[j]] = [edges[j], edges[i]];
    }

    const parent = new Map<string, string>();
    const key = (c: Cell) => `${c.x},${c.y}`;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        parent.set(key(this.grid[y][x]), key(this.grid[y][x]));
      }
    }
    const find = (k: string): string => {
      while (parent.get(k) !== k) k = parent.get(k)!;
      return k;
    };

    for (const edge of edges) {
      const rootA = find(key(edge.from));
      const rootB = find(key(edge.to));
      if (rootA !== rootB) {
        parent.set(rootA, rootB);
        this.removeWall(edge.from, edge.to);
        edge.from.visited = true;
        edge.to.visited = true;
      }
    }

    return this.grid.map((row) => row.map((c) => ({ ...c, walls: { ...c.walls } })));
  }

  private reset(): void {
    for (const row of this.grid) {
      for (const cell of row) {
        cell.walls = { north: true, south: true, east: true, west: true };
        cell.visited = false;
      }
    }
  }

  private unvisitedNeighbors(x: number, y: number): Cell[] {
    const neighbors: Cell[] = [];
    if (y > 0 && !this.grid[y - 1][x].visited) neighbors.push(this.grid[y - 1][x]);
    if (y < this.height - 1 && !this.grid[y + 1][x].visited) neighbors.push(this.grid[y + 1][x]);
    if (x > 0 && !this.grid[y][x - 1].visited) neighbors.push(this.grid[y][x - 1]);
    if (x < this.width - 1 && !this.grid[y][x + 1].visited) neighbors.push(this.grid[y][x + 1]);
    return neighbors;
  }

  private removeWall(a: Cell, b: Cell): void {
    if (a.x === b.x) {
      if (a.y < b.y) { a.walls.south = false; b.walls.north = false; }
      else { a.walls.north = false; b.walls.south = false; }
    } else {
      if (a.x < b.x) { a.walls.east = false; b.walls.west = false; }
      else { a.walls.west = false; b.walls.east = false; }
    }
  }

  toAscii(maze: Cell[][]): string {
    const lines: string[] = [];
    for (let y = 0; y < this.height; y++) {
      let top = "";
      let mid = "";
      for (let x = 0; x < this.width; x++) {
        const cell = maze[y][x];
        top += cell.walls.north ? "+--" : "+  ";
        mid += cell.walls.west ? "|  " : "   ";
      }
      top += "+";
      mid += maze[y][this.width - 1].walls.east ? "|" : " ";
      lines.push(top, mid);
    }
    let bottom = "";
    for (let x = 0; x < this.width; x++) {
      bottom += maze[this.height - 1][x].walls.south ? "+--" : "+  ";
    }
    bottom += "+";
    lines.push(bottom);
    return lines.join("\n");
  }

  dimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
}

export interface GridNode {
  x: number;
  y: number;
  walkable: boolean;
  cost: number;
}

export interface PathResult {
  path: Array<{ x: number; y: number }>;
  cost: number;
  explored: number;
}

export class AStarPathfinder {
  private grid: GridNode[][];
  private width: number;
  private height: number;
  private allowDiagonal: boolean;

  constructor(width: number, height: number, allowDiagonal = false) {
    this.width = width;
    this.height = height;
    this.allowDiagonal = allowDiagonal;
    this.grid = [];
    for (let y = 0; y < height; y++) {
      const row: GridNode[] = [];
      for (let x = 0; x < width; x++) {
        row.push({ x, y, walkable: true, cost: 1 });
      }
      this.grid.push(row);
    }
  }

  setWalkable(x: number, y: number, walkable: boolean): void {
    if (this.inBounds(x, y)) {
      this.grid[y][x].walkable = walkable;
    }
  }

  setCost(x: number, y: number, cost: number): void {
    if (this.inBounds(x, y)) {
      this.grid[y][x].cost = cost;
    }
  }

  findPath(sx: number, sy: number, ex: number, ey: number): PathResult {
    if (!this.inBounds(sx, sy) || !this.inBounds(ex, ey)) {
      return { path: [], cost: 0, explored: 0 };
    }
    if (!this.grid[sy][sx].walkable || !this.grid[ey][ex].walkable) {
      return { path: [], cost: 0, explored: 0 };
    }

    const open: Array<{ x: number; y: number; g: number; f: number }> = [];
    const gScore = new Map<string, number>();
    const parent = new Map<string, string>();
    const closed = new Set<string>();

    const key = (x: number, y: number) => `${x},${y}`;
    const h = (x: number, y: number) => {
      if (this.allowDiagonal) {
        return Math.max(Math.abs(x - ex), Math.abs(y - ey));
      }
      return Math.abs(x - ex) + Math.abs(y - ey);
    };

    gScore.set(key(sx, sy), 0);
    open.push({ x: sx, y: sy, g: 0, f: h(sx, sy) });

    while (open.length > 0) {
      open.sort((a, b) => a.f - b.f);
      const current = open.shift()!;
      const ck = key(current.x, current.y);

      if (current.x === ex && current.y === ey) {
        const path: Array<{ x: number; y: number }> = [];
        let k = ck;
        while (k) {
          const [px, py] = k.split(",").map(Number);
          path.unshift({ x: px, y: py });
          k = parent.get(k)!;
        }
        return { path, cost: current.g, explored: closed.size + 1 };
      }

      closed.add(ck);

      for (const [nx, ny] of this.neighbors(current.x, current.y)) {
        const nk = key(nx, ny);
        if (closed.has(nk)) continue;

        const tentativeG = current.g + this.grid[ny][nx].cost;
        const existing = gScore.get(nk);

        if (existing === undefined || tentativeG < existing) {
          gScore.set(nk, tentativeG);
          parent.set(nk, ck);
          open.push({ x: nx, y: ny, g: tentativeG, f: tentativeG + h(nx, ny) });
        }
      }
    }

    return { path: [], cost: 0, explored: closed.size };
  }

  private neighbors(x: number, y: number): Array<[number, number]> {
    const dirs: Array<[number, number]> = [
      [0, -1], [0, 1], [-1, 0], [1, 0],
    ];
    if (this.allowDiagonal) {
      dirs.push([-1, -1], [1, -1], [-1, 1], [1, 1]);
    }
    const result: Array<[number, number]> = [];
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (this.inBounds(nx, ny) && this.grid[ny][nx].walkable) {
        result.push([nx, ny]);
      }
    }
    return result;
  }

  private inBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getNode(x: number, y: number): GridNode | undefined {
    if (!this.inBounds(x, y)) return undefined;
    return this.grid[y][x];
  }

  dimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
}

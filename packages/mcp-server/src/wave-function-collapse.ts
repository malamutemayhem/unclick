export interface WFCTile {
  id: number;
  allowedNeighbors: {
    up: number[];
    down: number[];
    left: number[];
    right: number[];
  };
}

interface Cell {
  collapsed: boolean;
  options: Set<number>;
}

export class WFC {
  private grid: Cell[];
  private width: number;
  private height: number;
  private tiles: WFCTile[];

  constructor(width: number, height: number, tiles: WFCTile[]) {
    this.width = width;
    this.height = height;
    this.tiles = tiles;
    const allIds = new Set(tiles.map((t) => t.id));
    this.grid = Array.from({ length: width * height }, () => ({
      collapsed: false,
      options: new Set(allIds),
    }));
  }

  private index(x: number, y: number): number {
    return y * this.width + x;
  }

  private coords(i: number): [number, number] {
    return [i % this.width, Math.floor(i / this.width)];
  }

  private entropy(cell: Cell): number {
    return cell.options.size;
  }

  private findLowestEntropy(): number {
    let minEntropy = Infinity;
    let candidates: number[] = [];

    for (let i = 0; i < this.grid.length; i++) {
      const cell = this.grid[i];
      if (cell.collapsed) continue;
      const e = this.entropy(cell);
      if (e < minEntropy) {
        minEntropy = e;
        candidates = [i];
      } else if (e === minEntropy) {
        candidates.push(i);
      }
    }

    if (candidates.length === 0) return -1;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  private collapse(index: number): boolean {
    const cell = this.grid[index];
    if (cell.options.size === 0) return false;
    const opts = Array.from(cell.options);
    cell.options = new Set([opts[Math.floor(Math.random() * opts.length)]]);
    cell.collapsed = true;
    return true;
  }

  private propagate(index: number): boolean {
    const stack = [index];
    const tileMap = new Map(this.tiles.map((t) => [t.id, t]));

    while (stack.length > 0) {
      const current = stack.pop()!;
      const [cx, cy] = this.coords(current);

      const neighbors: [number, number, "up" | "down" | "left" | "right", "down" | "up" | "right" | "left"][] = [
        [cx, cy - 1, "up", "down"],
        [cx, cy + 1, "down", "up"],
        [cx - 1, cy, "left", "right"],
        [cx + 1, cy, "right", "left"],
      ];

      for (const [nx, ny, dir, _inverseDir] of neighbors) {
        if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) continue;
        const ni = this.index(nx, ny);
        const neighbor = this.grid[ni];
        if (neighbor.collapsed) continue;

        const allowed = new Set<number>();
        for (const tileId of this.grid[current].options) {
          const tile = tileMap.get(tileId);
          if (tile) {
            for (const n of tile.allowedNeighbors[dir]) {
              allowed.add(n);
            }
          }
        }

        const before = neighbor.options.size;
        const filtered = new Set<number>();
        for (const opt of neighbor.options) {
          if (allowed.has(opt)) filtered.add(opt);
        }
        neighbor.options = filtered;

        if (neighbor.options.size === 0) return false;
        if (neighbor.options.size < before) {
          stack.push(ni);
        }
      }
    }

    return true;
  }

  step(): boolean {
    const idx = this.findLowestEntropy();
    if (idx === -1) return false;
    if (!this.collapse(idx)) return false;
    return this.propagate(idx);
  }

  solve(maxAttempts = 100): number[][] | null {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      this.reset();
      let valid = true;
      while (true) {
        const idx = this.findLowestEntropy();
        if (idx === -1) break;
        if (!this.collapse(idx) || !this.propagate(idx)) {
          valid = false;
          break;
        }
      }
      if (valid) return this.getResult();
    }
    return null;
  }

  private reset(): void {
    const allIds = new Set(this.tiles.map((t) => t.id));
    for (const cell of this.grid) {
      cell.collapsed = false;
      cell.options = new Set(allIds);
    }
  }

  getResult(): number[][] {
    const result: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
        const cell = this.grid[this.index(x, y)];
        row.push(cell.options.size === 1 ? cell.options.values().next().value! : -1);
      }
      result.push(row);
    }
    return result;
  }

  isComplete(): boolean {
    return this.grid.every((c) => c.collapsed);
  }
}

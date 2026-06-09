export interface SandpileState {
  grid: number[][];
  width: number;
  height: number;
  totalGrains: number;
  toppleCount: number;
}

export function createState(width: number, height: number): SandpileState {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push(new Array(width).fill(0));
  }
  return { grid, width, height, totalGrains: 0, toppleCount: 0 };
}

export function addGrain(state: SandpileState, x: number, y: number): SandpileState {
  const grid = state.grid.map(row => [...row]);
  if (x >= 0 && x < state.width && y >= 0 && y < state.height) {
    grid[y][x]++;
  }
  return { ...state, grid, totalGrains: state.totalGrains + 1 };
}

export function addGrains(state: SandpileState, x: number, y: number, count: number): SandpileState {
  const grid = state.grid.map(row => [...row]);
  if (x >= 0 && x < state.width && y >= 0 && y < state.height) {
    grid[y][x] += count;
  }
  return { ...state, grid, totalGrains: state.totalGrains + count };
}

export function isStable(state: SandpileState): boolean {
  for (const row of state.grid) {
    for (const cell of row) {
      if (cell >= 4) return false;
    }
  }
  return true;
}

export function topple(state: SandpileState): SandpileState {
  const grid = state.grid.map(row => [...row]);
  let toppleCount = state.toppleCount;
  let changed = false;

  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      if (grid[y][x] >= 4) {
        const excess = Math.floor(grid[y][x] / 4);
        grid[y][x] -= excess * 4;
        if (y > 0) grid[y - 1][x] += excess;
        if (y < state.height - 1) grid[y + 1][x] += excess;
        if (x > 0) grid[y][x - 1] += excess;
        if (x < state.width - 1) grid[y][x + 1] += excess;
        toppleCount += excess;
        changed = true;
      }
    }
  }

  if (!changed) return state;

  let total = 0;
  for (const row of grid) {
    for (const cell of row) {
      total += cell;
    }
  }

  return { ...state, grid, totalGrains: total, toppleCount };
}

export function stabilize(state: SandpileState, maxIterations = 10000): SandpileState {
  let current = state;
  for (let i = 0; i < maxIterations; i++) {
    if (isStable(current)) return current;
    current = topple(current);
  }
  return current;
}

export function addAndStabilize(state: SandpileState, x: number, y: number, count: number): SandpileState {
  return stabilize(addGrains(state, x, y, count));
}

export function addPiles(a: SandpileState, b: SandpileState): SandpileState {
  if (a.width !== b.width || a.height !== b.height) {
    throw new Error("Sandpiles must have the same dimensions");
  }
  const grid = a.grid.map((row, y) => row.map((cell, x) => cell + b.grid[y][x]));
  let total = 0;
  for (const row of grid) {
    for (const cell of row) {
      total += cell;
    }
  }
  return stabilize({ ...a, grid, totalGrains: total, toppleCount: a.toppleCount + b.toppleCount });
}

export function identityPile(width: number, height: number): SandpileState {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const isEdge = x === 0 || x === width - 1 || y === 0 || y === height - 1;
      row.push(isEdge ? 2 : 3);
    }
    grid.push(row);
  }
  let total = 0;
  for (const row of grid) {
    for (const cell of row) {
      total += cell;
    }
  }
  return { grid, width, height, totalGrains: total, toppleCount: 0 };
}

export function maxStable(width: number, height: number): SandpileState {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push(new Array(width).fill(3));
  }
  return { grid, width, height, totalGrains: width * height * 3, toppleCount: 0 };
}

export function getCell(state: SandpileState, x: number, y: number): number {
  if (x >= 0 && x < state.width && y >= 0 && y < state.height) {
    return state.grid[y][x];
  }
  return 0;
}

export function toAscii(state: SandpileState): string {
  const chars = [".", "o", "O", "#"];
  return state.grid.map(row =>
    row.map(c => c >= 4 ? String(c) : chars[c]).join("")
  ).join("\n");
}

export function histogram(state: SandpileState): Map<number, number> {
  const counts = new Map<number, number>();
  for (const row of state.grid) {
    for (const cell of row) {
      counts.set(cell, (counts.get(cell) ?? 0) + 1);
    }
  }
  return counts;
}

export interface LifeState {
  cells: Set<string>;
  generation: number;
}

function key(x: number, y: number): string {
  return `${x},${y}`;
}

function parseKey(k: string): [number, number] {
  const [x, y] = k.split(",").map(Number);
  return [x, y];
}

export function createState(cells?: [number, number][]): LifeState {
  const set = new Set<string>();
  if (cells) {
    for (const [x, y] of cells) set.add(key(x, y));
  }
  return { cells: set, generation: 0 };
}

export function fromGrid(grid: boolean[][]): LifeState {
  const set = new Set<string>();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) set.add(key(x, y));
    }
  }
  return { cells: set, generation: 0 };
}

export function isAlive(state: LifeState, x: number, y: number): boolean {
  return state.cells.has(key(x, y));
}

export function setCell(state: LifeState, x: number, y: number, alive: boolean): LifeState {
  const cells = new Set(state.cells);
  if (alive) cells.add(key(x, y));
  else cells.delete(key(x, y));
  return { ...state, cells };
}

export function population(state: LifeState): number {
  return state.cells.size;
}

export function step(state: LifeState): LifeState {
  const neighborCounts = new Map<string, number>();

  for (const k of state.cells) {
    const [x, y] = parseKey(k);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nk = key(x + dx, y + dy);
        neighborCounts.set(nk, (neighborCounts.get(nk) ?? 0) + 1);
      }
    }
  }

  const next = new Set<string>();
  for (const [k, count] of neighborCounts) {
    if (count === 3 || (count === 2 && state.cells.has(k))) {
      next.add(k);
    }
  }

  return { cells: next, generation: state.generation + 1 };
}

export function run(state: LifeState, generations: number): LifeState {
  let current = state;
  for (let i = 0; i < generations; i++) {
    current = step(current);
  }
  return current;
}

export function getBounds(state: LifeState): { minX: number; maxX: number; minY: number; maxY: number } {
  if (state.cells.size === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const k of state.cells) {
    const [x, y] = parseKey(k);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, maxX, minY, maxY };
}

export function toAscii(state: LifeState, padding = 1): string {
  const { minX, maxX, minY, maxY } = getBounds(state);
  const lines: string[] = [];
  for (let y = minY - padding; y <= maxY + padding; y++) {
    let line = "";
    for (let x = minX - padding; x <= maxX + padding; x++) {
      line += isAlive(state, x, y) ? "#" : ".";
    }
    lines.push(line);
  }
  return lines.join("\n");
}

export function fromRLE(rle: string): LifeState {
  const cells = new Set<string>();
  let x = 0, y = 0, count = 0;

  for (const ch of rle) {
    if (ch >= "0" && ch <= "9") {
      count = count * 10 + parseInt(ch);
    } else if (ch === "b") {
      x += count || 1;
      count = 0;
    } else if (ch === "o") {
      const n = count || 1;
      for (let i = 0; i < n; i++) {
        cells.add(key(x, y));
        x++;
      }
      count = 0;
    } else if (ch === "$") {
      y += count || 1;
      x = 0;
      count = 0;
    } else if (ch === "!") {
      break;
    }
  }

  return { cells, generation: 0 };
}

export const PATTERNS = {
  blinker: (): LifeState => createState([[0, 0], [1, 0], [2, 0]]),
  glider: (): LifeState => createState([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]),
  block: (): LifeState => createState([[0, 0], [1, 0], [0, 1], [1, 1]]),
  beacon: (): LifeState => createState([[0, 0], [1, 0], [0, 1], [3, 2], [2, 3], [3, 3]]),
  toad: (): LifeState => createState([[1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1]]),
  rpentomino: (): LifeState => createState([[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]]),
};

export function isStillLife(state: LifeState): boolean {
  const next = step(state);
  if (next.cells.size !== state.cells.size) return false;
  for (const k of state.cells) {
    if (!next.cells.has(k)) return false;
  }
  return true;
}

export function detectPeriod(state: LifeState, maxPeriod = 100): number | null {
  let current = state;
  const initial = new Set(state.cells);
  for (let i = 1; i <= maxPeriod; i++) {
    current = step(current);
    if (current.cells.size === initial.size) {
      let match = true;
      for (const k of initial) {
        if (!current.cells.has(k)) { match = false; break; }
      }
      if (match) return i;
    }
  }
  return null;
}

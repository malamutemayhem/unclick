export enum Cell {
  Empty = 0,
  Head = 1,
  Tail = 2,
  Conductor = 3,
}

export interface WireWorldState {
  grid: Cell[][];
  width: number;
  height: number;
  generation: number;
}

export function createState(width: number, height: number): WireWorldState {
  const grid: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push(new Array(width).fill(Cell.Empty));
  }
  return { grid, width, height, generation: 0 };
}

export function setCell(state: WireWorldState, x: number, y: number, cell: Cell): void {
  if (x >= 0 && x < state.width && y >= 0 && y < state.height) {
    state.grid[y][x] = cell;
  }
}

export function getCell(state: WireWorldState, x: number, y: number): Cell {
  if (x >= 0 && x < state.width && y >= 0 && y < state.height) {
    return state.grid[y][x];
  }
  return Cell.Empty;
}

function countHeadNeighbors(state: WireWorldState, x: number, y: number): number {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      if (getCell(state, x + dx, y + dy) === Cell.Head) count++;
    }
  }
  return count;
}

export function step(state: WireWorldState): WireWorldState {
  const newGrid: Cell[][] = [];
  for (let y = 0; y < state.height; y++) {
    const row: Cell[] = new Array(state.width);
    for (let x = 0; x < state.width; x++) {
      const cell = state.grid[y][x];
      switch (cell) {
        case Cell.Empty:
          row[x] = Cell.Empty;
          break;
        case Cell.Head:
          row[x] = Cell.Tail;
          break;
        case Cell.Tail:
          row[x] = Cell.Conductor;
          break;
        case Cell.Conductor: {
          const heads = countHeadNeighbors(state, x, y);
          row[x] = (heads === 1 || heads === 2) ? Cell.Head : Cell.Conductor;
          break;
        }
      }
    }
    newGrid.push(row);
  }
  return { grid: newGrid, width: state.width, height: state.height, generation: state.generation + 1 };
}

export function run(state: WireWorldState, generations: number): WireWorldState[] {
  const history: WireWorldState[] = [state];
  let current = state;
  for (let i = 0; i < generations; i++) {
    current = step(current);
    history.push(current);
  }
  return history;
}

export function drawWire(state: WireWorldState, points: [number, number][]): void {
  for (const [x, y] of points) {
    setCell(state, x, y, Cell.Conductor);
  }
}

export function drawHorizontalWire(state: WireWorldState, y: number, x1: number, x2: number): void {
  const start = Math.min(x1, x2);
  const end = Math.max(x1, x2);
  for (let x = start; x <= end; x++) {
    setCell(state, x, y, Cell.Conductor);
  }
}

export function drawVerticalWire(state: WireWorldState, x: number, y1: number, y2: number): void {
  const start = Math.min(y1, y2);
  const end = Math.max(y1, y2);
  for (let y = start; y <= end; y++) {
    setCell(state, x, y, Cell.Conductor);
  }
}

export function injectSignal(state: WireWorldState, x: number, y: number): void {
  if (getCell(state, x, y) === Cell.Conductor) {
    setCell(state, x, y, Cell.Head);
  }
}

export function countCells(state: WireWorldState): { empty: number; head: number; tail: number; conductor: number } {
  let empty = 0, head = 0, tail = 0, conductor = 0;
  for (const row of state.grid) {
    for (const cell of row) {
      switch (cell) {
        case Cell.Empty: empty++; break;
        case Cell.Head: head++; break;
        case Cell.Tail: tail++; break;
        case Cell.Conductor: conductor++; break;
      }
    }
  }
  return { empty, head, tail, conductor };
}

export function toAscii(state: WireWorldState): string {
  const chars = [" ", "H", "t", "#"];
  return state.grid.map(row => row.map(c => chars[c]).join("")).join("\n");
}

export function fromAscii(text: string): WireWorldState {
  const charMap: Record<string, Cell> = { " ": Cell.Empty, ".": Cell.Empty, "H": Cell.Head, "t": Cell.Tail, "#": Cell.Conductor };
  const lines = text.split("\n").filter(l => l.length > 0);
  const height = lines.length;
  const width = Math.max(...lines.map(l => l.length));
  const grid: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Cell[] = new Array(width).fill(Cell.Empty);
    for (let x = 0; x < lines[y].length; x++) {
      row[x] = charMap[lines[y][x]] ?? Cell.Empty;
    }
    grid.push(row);
  }
  return { grid, width, height, generation: 0 };
}

export function createDiode(state: WireWorldState, x: number, y: number, direction: "right" | "left"): void {
  if (direction === "right") {
    setCell(state, x, y, Cell.Conductor);
    setCell(state, x + 1, y - 1, Cell.Conductor);
    setCell(state, x + 1, y + 1, Cell.Conductor);
    setCell(state, x + 2, y, Cell.Conductor);
  } else {
    setCell(state, x + 2, y, Cell.Conductor);
    setCell(state, x + 1, y - 1, Cell.Conductor);
    setCell(state, x + 1, y + 1, Cell.Conductor);
    setCell(state, x, y, Cell.Conductor);
  }
}

export interface LangtonState {
  grid: boolean[][];
  width: number;
  height: number;
  antX: number;
  antY: number;
  antDir: number; // 0=up, 1=right, 2=down, 3=left
  step: number;
}

export function createState(width: number, height: number): LangtonState {
  const grid: boolean[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push(new Array(width).fill(false));
  }
  return {
    grid,
    width,
    height,
    antX: Math.floor(width / 2),
    antY: Math.floor(height / 2),
    antDir: 0,
    step: 0,
  };
}

export function step(state: LangtonState): LangtonState {
  const grid = state.grid.map(row => [...row]);
  let { antX, antY, antDir } = state;

  const cell = grid[antY][antX];

  if (cell) {
    antDir = (antDir + 3) % 4; // turn left
  } else {
    antDir = (antDir + 1) % 4; // turn right
  }

  grid[antY][antX] = !cell;

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  antX = ((antX + dx[antDir]) % state.width + state.width) % state.width;
  antY = ((antY + dy[antDir]) % state.height + state.height) % state.height;

  return {
    grid,
    width: state.width,
    height: state.height,
    antX,
    antY,
    antDir,
    step: state.step + 1,
  };
}

export function run(state: LangtonState, steps: number): LangtonState {
  let current = state;
  for (let i = 0; i < steps; i++) {
    current = step(current);
  }
  return current;
}

export function countBlack(state: LangtonState): number {
  let count = 0;
  for (const row of state.grid) {
    for (const cell of row) {
      if (cell) count++;
    }
  }
  return count;
}

export function getBounds(state: LangtonState): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = state.width;
  let maxX = -1;
  let minY = state.height;
  let maxY = -1;

  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      if (state.grid[y][x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX === -1) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  return { minX, maxX, minY, maxY };
}

export function toAscii(state: LangtonState, on = "#", off = ".", ant = "@"): string {
  return state.grid.map((row, y) =>
    row.map((cell, x) => {
      if (x === state.antX && y === state.antY) return ant;
      return cell ? on : off;
    }).join("")
  ).join("\n");
}

export function directionName(dir: number): string {
  const names = ["up", "right", "down", "left"];
  return names[((dir % 4) + 4) % 4];
}

export function density(state: LangtonState): number {
  return countBlack(state) / (state.width * state.height);
}

export type MultiColorRule = number[];

export interface MultiColorState {
  grid: number[][];
  width: number;
  height: number;
  antX: number;
  antY: number;
  antDir: number;
  step: number;
  numColors: number;
  rule: MultiColorRule; // 0=right, 1=left per color
}

export function createMultiColor(
  width: number,
  height: number,
  rule: MultiColorRule
): MultiColorState {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push(new Array(width).fill(0));
  }
  return {
    grid,
    width,
    height,
    antX: Math.floor(width / 2),
    antY: Math.floor(height / 2),
    antDir: 0,
    step: 0,
    numColors: rule.length,
    rule,
  };
}

export function stepMultiColor(state: MultiColorState): MultiColorState {
  const grid = state.grid.map(row => [...row]);
  let { antX, antY, antDir } = state;

  const color = grid[antY][antX];
  const turn = state.rule[color];

  if (turn === 0) {
    antDir = (antDir + 1) % 4; // right
  } else {
    antDir = (antDir + 3) % 4; // left
  }

  grid[antY][antX] = (color + 1) % state.numColors;

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  antX = ((antX + dx[antDir]) % state.width + state.width) % state.width;
  antY = ((antY + dy[antDir]) % state.height + state.height) % state.height;

  return { ...state, grid, antX, antY, antDir, step: state.step + 1 };
}

export function runMultiColor(state: MultiColorState, steps: number): MultiColorState {
  let current = state;
  for (let i = 0; i < steps; i++) {
    current = stepMultiColor(current);
  }
  return current;
}

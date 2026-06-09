export type CellState = 0 | 1 | -1;

export interface Nonogram {
  rows: number;
  cols: number;
  rowClues: number[][];
  colClues: number[][];
  grid: CellState[][];
}

export function createNonogram(rowClues: number[][], colClues: number[][]): Nonogram {
  const rows = rowClues.length;
  const cols = colClues.length;
  const grid: CellState[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  return { rows, cols, rowClues, colClues, grid };
}

export function cloneGrid(grid: CellState[][]): CellState[][] {
  return grid.map(row => [...row]);
}

function generateLines(clue: number[], length: number): number[][] {
  if (clue.length === 0 || (clue.length === 1 && clue[0] === 0)) {
    return [Array(length).fill(0)];
  }

  const results: number[][] = [];
  const minLength = clue.reduce((a, b) => a + b, 0) + clue.length - 1;
  if (minLength > length) return [];

  function backtrack(idx: number, pos: number, line: number[]): void {
    if (idx === clue.length) {
      while (line.length < length) line.push(0);
      results.push([...line]);
      return;
    }
    const remaining = clue.slice(idx).reduce((a, b) => a + b, 0) + (clue.length - idx - 1);
    const maxStart = length - remaining;

    for (let start = pos; start <= maxStart; start++) {
      const newLine = [...line];
      while (newLine.length < start) newLine.push(0);
      for (let i = 0; i < clue[idx]; i++) newLine.push(1);
      if (idx < clue.length - 1) newLine.push(0);
      backtrack(idx + 1, newLine.length, newLine);
    }
  }

  backtrack(0, 0, []);
  return results;
}

function filterLines(lines: number[][], known: CellState[]): number[][] {
  return lines.filter(line => {
    for (let i = 0; i < known.length; i++) {
      if (known[i] === 1 && line[i] !== 1) return false;
      if (known[i] === -1 && line[i] !== 0) return false;
    }
    return true;
  });
}

function inferLine(lines: number[][], length: number): CellState[] {
  const result: CellState[] = Array(length).fill(0);
  if (lines.length === 0) return result;

  for (let i = 0; i < length; i++) {
    const allFilled = lines.every(l => l[i] === 1);
    const allEmpty = lines.every(l => l[i] === 0);
    if (allFilled) result[i] = 1;
    else if (allEmpty) result[i] = -1;
  }
  return result;
}

export function solve(puzzle: Nonogram): Nonogram {
  const grid = cloneGrid(puzzle.grid);
  let changed = true;
  let iterations = 0;
  const maxIter = 100;

  while (changed && iterations < maxIter) {
    changed = false;
    iterations++;

    for (let r = 0; r < puzzle.rows; r++) {
      const known = grid[r];
      const lines = filterLines(generateLines(puzzle.rowClues[r], puzzle.cols), known);
      const inferred = inferLine(lines, puzzle.cols);
      for (let c = 0; c < puzzle.cols; c++) {
        if (grid[r][c] === 0 && inferred[c] !== 0) {
          grid[r][c] = inferred[c];
          changed = true;
        }
      }
    }

    for (let c = 0; c < puzzle.cols; c++) {
      const known: CellState[] = [];
      for (let r = 0; r < puzzle.rows; r++) known.push(grid[r][c]);
      const lines = filterLines(generateLines(puzzle.colClues[c], puzzle.rows), known);
      const inferred = inferLine(lines, puzzle.rows);
      for (let r = 0; r < puzzle.rows; r++) {
        if (grid[r][c] === 0 && inferred[r] !== 0) {
          grid[r][c] = inferred[r];
          changed = true;
        }
      }
    }
  }

  return { ...puzzle, grid };
}

export function isSolved(puzzle: Nonogram): boolean {
  for (let r = 0; r < puzzle.rows; r++) {
    if (puzzle.grid[r].some(c => c === 0)) return false;
  }
  return validateSolution(puzzle);
}

export function validateSolution(puzzle: Nonogram): boolean {
  for (let r = 0; r < puzzle.rows; r++) {
    const clue = extractClue(puzzle.grid[r]);
    if (!cluesMatch(clue, puzzle.rowClues[r])) return false;
  }
  for (let c = 0; c < puzzle.cols; c++) {
    const col: CellState[] = [];
    for (let r = 0; r < puzzle.rows; r++) col.push(puzzle.grid[r][c]);
    const clue = extractClue(col);
    if (!cluesMatch(clue, puzzle.colClues[c])) return false;
  }
  return true;
}

function extractClue(line: CellState[]): number[] {
  const clue: number[] = [];
  let count = 0;
  for (const cell of line) {
    if (cell === 1) {
      count++;
    } else {
      if (count > 0) clue.push(count);
      count = 0;
    }
  }
  if (count > 0) clue.push(count);
  return clue.length > 0 ? clue : [0];
}

function cluesMatch(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

export function toAscii(puzzle: Nonogram): string {
  return puzzle.grid.map(row =>
    row.map(c => c === 1 ? "#" : c === -1 ? "." : "?").join("")
  ).join("\n");
}

export function difficulty(puzzle: Nonogram): string {
  const totalCells = puzzle.rows * puzzle.cols;
  const totalClues = puzzle.rowClues.flat().length + puzzle.colClues.flat().length;
  const ratio = totalClues / totalCells;
  if (ratio > 0.5) return "easy";
  if (ratio > 0.3) return "medium";
  return "hard";
}

export function createSimple5x5(): Nonogram {
  return createNonogram(
    [[3], [1, 1], [1, 1], [1, 1], [3]],
    [[3], [1, 1], [3], [1, 1], [3]]
  );
}

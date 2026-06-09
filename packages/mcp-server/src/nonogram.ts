export type CellState = "empty" | "filled" | "unknown";

export interface NonogramPuzzle {
  width: number;
  height: number;
  rowClues: number[][];
  colClues: number[][];
}

export interface NonogramBoard {
  puzzle: NonogramPuzzle;
  cells: CellState[][];
}

export function createPuzzle(pattern: boolean[][]): NonogramPuzzle {
  const height = pattern.length;
  const width = pattern[0]?.length ?? 0;

  const rowClues = pattern.map(row => computeClue(row));
  const colClues: number[][] = [];
  for (let c = 0; c < width; c++) {
    const col = pattern.map(row => row[c]);
    colClues.push(computeClue(col));
  }

  return { width, height, rowClues, colClues };
}

function computeClue(line: boolean[]): number[] {
  const clue: number[] = [];
  let run = 0;
  for (const cell of line) {
    if (cell) {
      run++;
    } else if (run > 0) {
      clue.push(run);
      run = 0;
    }
  }
  if (run > 0) clue.push(run);
  return clue.length > 0 ? clue : [0];
}

export function createBoard(puzzle: NonogramPuzzle): NonogramBoard {
  const cells: CellState[][] = Array.from({ length: puzzle.height }, () =>
    new Array(puzzle.width).fill("unknown")
  );
  return { puzzle, cells };
}

export function setCell(board: NonogramBoard, row: number, col: number, state: CellState): void {
  if (row >= 0 && row < board.puzzle.height && col >= 0 && col < board.puzzle.width) {
    board.cells[row][col] = state;
  }
}

export function isComplete(board: NonogramBoard): boolean {
  return board.cells.every(row => row.every(c => c !== "unknown"));
}

export function isCorrect(board: NonogramBoard): boolean {
  for (let r = 0; r < board.puzzle.height; r++) {
    const rowLine = board.cells[r].map(c => c === "filled");
    const clue = computeClue(rowLine);
    if (!clueEquals(clue, board.puzzle.rowClues[r])) return false;
  }

  for (let c = 0; c < board.puzzle.width; c++) {
    const colLine = board.cells.map(row => row[c] === "filled");
    const clue = computeClue(colLine);
    if (!clueEquals(clue, board.puzzle.colClues[c])) return false;
  }

  return true;
}

function clueEquals(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

export function solve(puzzle: NonogramPuzzle): CellState[][] | null {
  const board = createBoard(puzzle);
  if (solveRecursive(board, 0)) {
    return board.cells;
  }
  return null;
}

function solveRecursive(board: NonogramBoard, pos: number): boolean {
  const { width, height } = board.puzzle;
  if (pos >= width * height) return isCorrect(board);

  const row = Math.floor(pos / width);
  const col = pos % width;

  for (const state of ["filled", "empty"] as CellState[]) {
    board.cells[row][col] = state;

    if (col === width - 1) {
      const rowLine = board.cells[row].map(c => c === "filled");
      const clue = computeClue(rowLine);
      if (!clueEquals(clue, board.puzzle.rowClues[row])) continue;
    }

    if (row === height - 1) {
      const colLine = board.cells.map(r => r[col] === "filled");
      const clue = computeClue(colLine);
      if (!clueEquals(clue, board.puzzle.colClues[col])) continue;
    }

    if (solveRecursive(board, pos + 1)) return true;
  }

  board.cells[row][col] = "unknown";
  return false;
}

export function boardToString(board: NonogramBoard): string {
  return board.cells.map(row =>
    row.map(c => {
      if (c === "filled") return "#";
      if (c === "empty") return ".";
      return "?";
    }).join(" ")
  ).join("\n");
}

export function cluesToString(puzzle: NonogramPuzzle): string {
  const rows = puzzle.rowClues.map((c, i) => `Row ${i}: ${c.join(" ")}`);
  const cols = puzzle.colClues.map((c, i) => `Col ${i}: ${c.join(" ")}`);
  return [...rows, ...cols].join("\n");
}

export function validateClues(puzzle: NonogramPuzzle): boolean {
  const rowSum = puzzle.rowClues.reduce((s, c) => s + c.reduce((a, b) => a + b, 0), 0);
  const colSum = puzzle.colClues.reduce((s, c) => s + c.reduce((a, b) => a + b, 0), 0);
  return rowSum === colSum;
}

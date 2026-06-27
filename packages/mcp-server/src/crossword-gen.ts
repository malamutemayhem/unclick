export interface Placement {
  word: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

export interface CrosswordGrid {
  width: number;
  height: number;
  cells: (string | null)[][];
  placements: Placement[];
}

export function createGrid(width: number, height: number): CrosswordGrid {
  const cells: (string | null)[][] = [];
  for (let r = 0; r < height; r++) {
    cells.push(new Array(width).fill(null));
  }
  return { width, height, cells, placements: [] };
}

export function canPlace(
  grid: CrosswordGrid, word: string, row: number, col: number, direction: "across" | "down"
): boolean {
  const dr = direction === "down" ? 1 : 0;
  const dc = direction === "across" ? 1 : 0;

  if (row + dr * (word.length - 1) >= grid.height) return false;
  if (col + dc * (word.length - 1) >= grid.width) return false;

  let hasIntersection = grid.placements.length === 0;

  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    const existing = grid.cells[r][c];
    if (existing !== null) {
      if (existing !== word[i]) return false;
      hasIntersection = true;
    }
  }

  return hasIntersection;
}

export function placeWord(
  grid: CrosswordGrid, word: string, row: number, col: number, direction: "across" | "down"
): boolean {
  if (!canPlace(grid, word, row, col, direction)) return false;

  const dr = direction === "down" ? 1 : 0;
  const dc = direction === "across" ? 1 : 0;

  for (let i = 0; i < word.length; i++) {
    grid.cells[row + dr * i][col + dc * i] = word[i];
  }

  grid.placements.push({ word, row, col, direction });
  return true;
}

export function autoPlace(grid: CrosswordGrid, words: string[]): number {
  const sorted = [...words].sort((a, b) => b.length - a.length);
  let placed = 0;

  for (const word of sorted) {
    const upper = word.toUpperCase();
    if (tryPlace(grid, upper)) {
      placed++;
    }
  }

  return placed;
}

function tryPlace(grid: CrosswordGrid, word: string): boolean {
  if (grid.placements.length === 0) {
    const row = Math.floor(grid.height / 2);
    const col = Math.floor((grid.width - word.length) / 2);
    if (col >= 0) return placeWord(grid, word, row, col, "across");
    return false;
  }

  for (const p of grid.placements) {
    for (let pi = 0; pi < p.word.length; pi++) {
      for (let wi = 0; wi < word.length; wi++) {
        if (p.word[pi] !== word[wi]) continue;

        let row: number, col: number;
        let direction: "across" | "down";

        if (p.direction === "across") {
          direction = "down";
          row = p.row - wi;
          col = p.col + pi;
        } else {
          direction = "across";
          row = p.row + pi;
          col = p.col - wi;
        }

        if (row >= 0 && col >= 0 && placeWord(grid, word, row, col, direction)) {
          return true;
        }
      }
    }
  }

  return false;
}

export function gridToString(grid: CrosswordGrid): string {
  return grid.cells.map(row =>
    row.map(c => c ?? ".").join(" ")
  ).join("\n");
}

export function getIntersections(grid: CrosswordGrid): number {
  let count = 0;
  const seen = new Set<string>();

  for (const p of grid.placements) {
    const dr = p.direction === "down" ? 1 : 0;
    const dc = p.direction === "across" ? 1 : 0;

    for (let i = 0; i < p.word.length; i++) {
      const key = `${p.row + dr * i},${p.col + dc * i}`;
      if (seen.has(key)) count++;
      else seen.add(key);
    }
  }

  return count;
}

export function filledCells(grid: CrosswordGrid): number {
  let count = 0;
  for (const row of grid.cells) {
    for (const c of row) {
      if (c !== null) count++;
    }
  }
  return count;
}

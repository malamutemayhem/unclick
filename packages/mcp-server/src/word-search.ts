export interface WordSearchGrid {
  width: number;
  height: number;
  cells: string[][];
  placements: WordPlacement[];
}

export interface WordPlacement {
  word: string;
  row: number;
  col: number;
  dRow: number;
  dCol: number;
}

export interface FoundWord {
  word: string;
  row: number;
  col: number;
  endRow: number;
  endCol: number;
}

const DIRECTIONS: [number, number][] = [
  [0, 1], [1, 0], [1, 1], [-1, 1],
  [0, -1], [-1, 0], [-1, -1], [1, -1],
];

export function createWordSearch(
  width: number, height: number, words: string[], seed = 42
): WordSearchGrid {
  const cells: string[][] = Array.from({ length: height }, () => new Array(width).fill(""));
  const placements: WordPlacement[] = [];
  let state = seed;

  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };

  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const rawWord of sorted) {
    const word = rawWord.toUpperCase();
    let placed = false;

    for (let attempt = 0; attempt < 100 && !placed; attempt++) {
      const dir = DIRECTIONS[Math.floor(rand() * DIRECTIONS.length)];
      const row = Math.floor(rand() * height);
      const col = Math.floor(rand() * width);

      if (canPlace(cells, width, height, word, row, col, dir[0], dir[1])) {
        for (let i = 0; i < word.length; i++) {
          cells[row + dir[0] * i][col + dir[1] * i] = word[i];
        }
        placements.push({ word, row, col, dRow: dir[0], dCol: dir[1] });
        placed = true;
      }
    }
  }

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (!cells[r][c]) {
        cells[r][c] = String.fromCharCode(65 + Math.floor(rand() * 26));
      }
    }
  }

  return { width, height, cells, placements };
}

function canPlace(
  cells: string[][], width: number, height: number,
  word: string, row: number, col: number, dRow: number, dCol: number
): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = row + dRow * i;
    const c = col + dCol * i;
    if (r < 0 || r >= height || c < 0 || c >= width) return false;
    if (cells[r][c] && cells[r][c] !== word[i]) return false;
  }
  return true;
}

export function findWord(grid: WordSearchGrid, word: string): FoundWord | null {
  const upper = word.toUpperCase();

  for (let r = 0; r < grid.height; r++) {
    for (let c = 0; c < grid.width; c++) {
      for (const [dr, dc] of DIRECTIONS) {
        let found = true;
        for (let i = 0; i < upper.length; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= grid.height || nc < 0 || nc >= grid.width) {
            found = false;
            break;
          }
          if (grid.cells[nr][nc] !== upper[i]) {
            found = false;
            break;
          }
        }
        if (found) {
          return {
            word: upper,
            row: r, col: c,
            endRow: r + dr * (upper.length - 1),
            endCol: c + dc * (upper.length - 1),
          };
        }
      }
    }
  }
  return null;
}

export function findAllWords(grid: WordSearchGrid, words: string[]): FoundWord[] {
  const results: FoundWord[] = [];
  for (const w of words) {
    const found = findWord(grid, w);
    if (found) results.push(found);
  }
  return results;
}

export function gridToString(grid: WordSearchGrid): string {
  return grid.cells.map(row => row.join(" ")).join("\n");
}

export function highlightWord(grid: WordSearchGrid, found: FoundWord): string {
  const highlighted = new Set<string>();
  const dr = found.endRow === found.row ? 0 : (found.endRow > found.row ? 1 : -1);
  const dc = found.endCol === found.col ? 0 : (found.endCol > found.col ? 1 : -1);
  const len = Math.max(Math.abs(found.endRow - found.row), Math.abs(found.endCol - found.col)) + 1;

  for (let i = 0; i < len; i++) {
    highlighted.add(`${found.row + dr * i},${found.col + dc * i}`);
  }

  return grid.cells.map((row, r) =>
    row.map((ch, c) => highlighted.has(`${r},${c}`) ? `[${ch}]` : ` ${ch} `).join("")
  ).join("\n");
}

export type CellDisplay = "hidden" | "revealed" | "flagged";

export interface Cell {
  mine: boolean;
  adjacentMines: number;
  display: CellDisplay;
}

export interface MinesweeperBoard {
  width: number;
  height: number;
  cells: Cell[][];
  mineCount: number;
  gameOver: boolean;
  won: boolean;
}

export function createBoard(width: number, height: number, mineCount: number, seed = 42): MinesweeperBoard {
  const cells: Cell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      mine: false,
      adjacentMines: 0,
      display: "hidden" as CellDisplay,
    }))
  );

  let state = seed;
  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };

  const positions: [number, number][] = [];
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      positions.push([r, c]);
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  const actualMines = Math.min(mineCount, width * height);
  for (let i = 0; i < actualMines; i++) {
    const [r, c] = positions[i];
    cells[r][c].mine = true;
  }

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (cells[r][c].mine) continue;
      let count = 0;
      forNeighbors(width, height, r, c, (nr, nc) => {
        if (cells[nr][nc].mine) count++;
      });
      cells[r][c].adjacentMines = count;
    }
  }

  return { width, height, cells, mineCount: actualMines, gameOver: false, won: false };
}

function forNeighbors(width: number, height: number, row: number, col: number, fn: (r: number, c: number) => void): void {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < height && nc >= 0 && nc < width) {
        fn(nr, nc);
      }
    }
  }
}

export function reveal(board: MinesweeperBoard, row: number, col: number): "mine" | "safe" | "already" {
  if (board.gameOver) return "already";
  if (row < 0 || row >= board.height || col < 0 || col >= board.width) return "already";

  const cell = board.cells[row][col];
  if (cell.display !== "hidden") return "already";

  cell.display = "revealed";

  if (cell.mine) {
    board.gameOver = true;
    board.won = false;
    return "mine";
  }

  if (cell.adjacentMines === 0) {
    forNeighbors(board.width, board.height, row, col, (nr, nc) => {
      reveal(board, nr, nc);
    });
  }

  checkWin(board);
  return "safe";
}

export function flag(board: MinesweeperBoard, row: number, col: number): boolean {
  if (board.gameOver) return false;
  if (row < 0 || row >= board.height || col < 0 || col >= board.width) return false;

  const cell = board.cells[row][col];
  if (cell.display === "revealed") return false;
  cell.display = cell.display === "flagged" ? "hidden" : "flagged";
  return true;
}

function checkWin(board: MinesweeperBoard): void {
  for (let r = 0; r < board.height; r++) {
    for (let c = 0; c < board.width; c++) {
      const cell = board.cells[r][c];
      if (!cell.mine && cell.display !== "revealed") return;
    }
  }
  board.gameOver = true;
  board.won = true;
}

export function boardToString(board: MinesweeperBoard): string {
  return board.cells.map(row =>
    row.map(cell => {
      if (cell.display === "flagged") return "F";
      if (cell.display === "hidden") return "?";
      if (cell.mine) return "*";
      return cell.adjacentMines === 0 ? " " : String(cell.adjacentMines);
    }).join(" ")
  ).join("\n");
}

export function revealAll(board: MinesweeperBoard): void {
  for (const row of board.cells) {
    for (const cell of row) {
      cell.display = "revealed";
    }
  }
}

export function countRevealed(board: MinesweeperBoard): number {
  let count = 0;
  for (const row of board.cells) {
    for (const cell of row) {
      if (cell.display === "revealed") count++;
    }
  }
  return count;
}

export function countFlags(board: MinesweeperBoard): number {
  let count = 0;
  for (const row of board.cells) {
    for (const cell of row) {
      if (cell.display === "flagged") count++;
    }
  }
  return count;
}

export function countHidden(board: MinesweeperBoard): number {
  let count = 0;
  for (const row of board.cells) {
    for (const cell of row) {
      if (cell.display === "hidden") count++;
    }
  }
  return count;
}

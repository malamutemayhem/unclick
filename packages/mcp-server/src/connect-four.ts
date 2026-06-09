export type Player = 1 | 2;
export type Cell = 0 | Player;

export interface Board {
  rows: number;
  cols: number;
  grid: Cell[][];
  currentPlayer: Player;
  winner: Player | null;
  draw: boolean;
  moveCount: number;
}

export function createBoard(rows = 6, cols = 7): Board {
  const grid: Cell[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));
  return { rows, cols, grid, currentPlayer: 1, winner: null, draw: false, moveCount: 0 };
}

export function dropPiece(board: Board, col: number): number {
  if (board.winner || board.draw) return -1;
  if (col < 0 || col >= board.cols) return -1;

  for (let row = board.rows - 1; row >= 0; row--) {
    if (board.grid[row][col] === 0) {
      board.grid[row][col] = board.currentPlayer;
      board.moveCount++;

      if (checkWin(board, row, col)) {
        board.winner = board.currentPlayer;
      } else if (board.moveCount === board.rows * board.cols) {
        board.draw = true;
      }

      board.currentPlayer = board.currentPlayer === 1 ? 2 : 1;
      return row;
    }
  }

  return -1;
}

function checkWin(board: Board, row: number, col: number): boolean {
  const player = board.grid[row][col];
  const dirs: [number, number][] = [[0, 1], [1, 0], [1, 1], [1, -1]];

  for (const [dr, dc] of dirs) {
    let count = 1;
    for (let d = 1; d < 4; d++) {
      const r = row + dr * d, c = col + dc * d;
      if (r < 0 || r >= board.rows || c < 0 || c >= board.cols) break;
      if (board.grid[r][c] !== player) break;
      count++;
    }
    for (let d = 1; d < 4; d++) {
      const r = row - dr * d, c = col - dc * d;
      if (r < 0 || r >= board.rows || c < 0 || c >= board.cols) break;
      if (board.grid[r][c] !== player) break;
      count++;
    }
    if (count >= 4) return true;
  }

  return false;
}

export function getValidMoves(board: Board): number[] {
  if (board.winner || board.draw) return [];
  const moves: number[] = [];
  for (let c = 0; c < board.cols; c++) {
    if (board.grid[0][c] === 0) moves.push(c);
  }
  return moves;
}

export function isGameOver(board: Board): boolean {
  return board.winner !== null || board.draw;
}

export function boardToString(board: Board): string {
  const chars: Record<number, string> = { 0: ".", 1: "X", 2: "O" };
  return board.grid.map(row => row.map(c => chars[c]).join(" ")).join("\n");
}

export function columnHeight(board: Board, col: number): number {
  let count = 0;
  for (let r = board.rows - 1; r >= 0; r--) {
    if (board.grid[r][col] !== 0) count++;
    else break;
  }
  return count;
}

export function evaluate(board: Board, player: Player): number {
  if (board.winner === player) return 1000;
  if (board.winner !== null) return -1000;
  return 0;
}

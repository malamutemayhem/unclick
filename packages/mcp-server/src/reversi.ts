export type Player = 1 | 2;
export type Cell = 0 | Player;

export interface ReversiBoard {
  size: number;
  grid: Cell[][];
  currentPlayer: Player;
  gameOver: boolean;
  scores: { 1: number; 2: number };
}

const DIRS: [number, number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

export function createBoard(size = 8): ReversiBoard {
  const grid: Cell[][] = Array.from({ length: size }, () => new Array(size).fill(0));
  const mid = size / 2;
  grid[mid - 1][mid - 1] = 2;
  grid[mid - 1][mid] = 1;
  grid[mid][mid - 1] = 1;
  grid[mid][mid] = 2;

  return { size, grid, currentPlayer: 1, gameOver: false, scores: { 1: 2, 2: 2 } };
}

export function getFlips(board: ReversiBoard, row: number, col: number, player: Player): [number, number][] {
  if (board.grid[row][col] !== 0) return [];
  const opponent: Player = player === 1 ? 2 : 1;
  const allFlips: [number, number][] = [];

  for (const [dr, dc] of DIRS) {
    const flips: [number, number][] = [];
    let r = row + dr, c = col + dc;

    while (r >= 0 && r < board.size && c >= 0 && c < board.size && board.grid[r][c] === opponent) {
      flips.push([r, c]);
      r += dr;
      c += dc;
    }

    if (flips.length > 0 && r >= 0 && r < board.size && c >= 0 && c < board.size && board.grid[r][c] === player) {
      allFlips.push(...flips);
    }
  }

  return allFlips;
}

export function isValidMove(board: ReversiBoard, row: number, col: number, player: Player): boolean {
  if (row < 0 || row >= board.size || col < 0 || col >= board.size) return false;
  return getFlips(board, row, col, player).length > 0;
}

export function getValidMoves(board: ReversiBoard, player: Player): [number, number][] {
  const moves: [number, number][] = [];
  for (let r = 0; r < board.size; r++) {
    for (let c = 0; c < board.size; c++) {
      if (isValidMove(board, r, c, player)) {
        moves.push([r, c]);
      }
    }
  }
  return moves;
}

export function makeMove(board: ReversiBoard, row: number, col: number): boolean {
  if (board.gameOver) return false;
  const flips = getFlips(board, row, col, board.currentPlayer);
  if (flips.length === 0) return false;

  board.grid[row][col] = board.currentPlayer;
  for (const [r, c] of flips) {
    board.grid[r][c] = board.currentPlayer;
  }

  updateScores(board);

  const nextPlayer: Player = board.currentPlayer === 1 ? 2 : 1;
  if (getValidMoves(board, nextPlayer).length > 0) {
    board.currentPlayer = nextPlayer;
  } else if (getValidMoves(board, board.currentPlayer).length === 0) {
    board.gameOver = true;
  }

  return true;
}

function updateScores(board: ReversiBoard): void {
  let s1 = 0, s2 = 0;
  for (const row of board.grid) {
    for (const cell of row) {
      if (cell === 1) s1++;
      else if (cell === 2) s2++;
    }
  }
  board.scores = { 1: s1, 2: s2 };
}

export function getWinner(board: ReversiBoard): Player | null | "draw" {
  if (!board.gameOver) return null;
  if (board.scores[1] > board.scores[2]) return 1;
  if (board.scores[2] > board.scores[1]) return 2;
  return "draw";
}

export function boardToString(board: ReversiBoard): string {
  const chars: Record<number, string> = { 0: ".", 1: "B", 2: "W" };
  return board.grid.map(row => row.map(c => chars[c]).join(" ")).join("\n");
}

export function countPieces(board: ReversiBoard): { black: number; white: number; empty: number } {
  return {
    black: board.scores[1],
    white: board.scores[2],
    empty: board.size * board.size - board.scores[1] - board.scores[2],
  };
}

export type Mark = "X" | "O" | null;

export interface TicTacToeBoard {
  cells: Mark[];
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  size: number;
}

export function createBoard(size = 3): TicTacToeBoard {
  return {
    cells: new Array(size * size).fill(null),
    currentPlayer: "X",
    winner: null,
    size,
  };
}

export function makeMove(board: TicTacToeBoard, index: number): boolean {
  if (board.winner) return false;
  if (index < 0 || index >= board.cells.length) return false;
  if (board.cells[index] !== null) return false;

  board.cells[index] = board.currentPlayer;

  const w = checkWinner(board);
  if (w) {
    board.winner = w;
  } else if (board.cells.every(c => c !== null)) {
    board.winner = "draw";
  } else {
    board.currentPlayer = board.currentPlayer === "X" ? "O" : "X";
  }

  return true;
}

export function makeMoveRC(board: TicTacToeBoard, row: number, col: number): boolean {
  return makeMove(board, row * board.size + col);
}

function checkWinner(board: TicTacToeBoard): "X" | "O" | null {
  const { size, cells } = board;

  for (let r = 0; r < size; r++) {
    const first = cells[r * size];
    if (first && cells.slice(r * size, r * size + size).every(c => c === first)) {
      return first;
    }
  }

  for (let c = 0; c < size; c++) {
    const first = cells[c];
    if (first) {
      let win = true;
      for (let r = 1; r < size; r++) {
        if (cells[r * size + c] !== first) { win = false; break; }
      }
      if (win) return first;
    }
  }

  const center = cells[0];
  if (center) {
    let win = true;
    for (let i = 1; i < size; i++) {
      if (cells[i * size + i] !== center) { win = false; break; }
    }
    if (win) return center;
  }

  const corner = cells[size - 1];
  if (corner) {
    let win = true;
    for (let i = 1; i < size; i++) {
      if (cells[i * size + (size - 1 - i)] !== corner) { win = false; break; }
    }
    if (win) return corner;
  }

  return null;
}

export function getAvailableMoves(board: TicTacToeBoard): number[] {
  if (board.winner) return [];
  return board.cells.reduce<number[]>((acc, c, i) => {
    if (c === null) acc.push(i);
    return acc;
  }, []);
}

export function boardToString(board: TicTacToeBoard): string {
  const lines: string[] = [];
  for (let r = 0; r < board.size; r++) {
    const row: string[] = [];
    for (let c = 0; c < board.size; c++) {
      row.push(board.cells[r * board.size + c] ?? ".");
    }
    lines.push(row.join(" "));
  }
  return lines.join("\n");
}

export function isGameOver(board: TicTacToeBoard): boolean {
  return board.winner !== null;
}

export function minimax(board: TicTacToeBoard, maximizing: boolean): number {
  if (board.winner === "X") return 1;
  if (board.winner === "O") return -1;
  if (board.winner === "draw") return 0;

  const moves = getAvailableMoves(board);
  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      const copy = cloneBoard(board);
      makeMove(copy, m);
      best = Math.max(best, minimax(copy, false));
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      const copy = cloneBoard(board);
      makeMove(copy, m);
      best = Math.min(best, minimax(copy, true));
    }
    return best;
  }
}

export function bestMove(board: TicTacToeBoard): number {
  const moves = getAvailableMoves(board);
  const maximizing = board.currentPlayer === "X";
  let bestScore = maximizing ? -Infinity : Infinity;
  let bestIdx = moves[0];

  for (const m of moves) {
    const copy = cloneBoard(board);
    makeMove(copy, m);
    const score = minimax(copy, !maximizing);
    if (maximizing ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestIdx = m;
    }
  }

  return bestIdx;
}

function cloneBoard(board: TicTacToeBoard): TicTacToeBoard {
  return {
    cells: [...board.cells],
    currentPlayer: board.currentPlayer,
    winner: board.winner,
    size: board.size,
  };
}

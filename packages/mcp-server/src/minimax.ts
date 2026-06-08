export interface GameState<T> {
  isTerminal(): boolean;
  evaluate(): number;
  getMoves(): T[];
  applyMove(move: T): GameState<T>;
}

export interface MinimaxResult<T> {
  score: number;
  move: T | null;
  nodesExplored: number;
}

export function minimax<T>(
  state: GameState<T>,
  depth: number,
  maximizing: boolean,
): MinimaxResult<T> {
  let nodesExplored = 1;

  if (depth === 0 || state.isTerminal()) {
    return { score: state.evaluate(), move: null, nodesExplored };
  }

  const moves = state.getMoves();
  if (moves.length === 0) {
    return { score: state.evaluate(), move: null, nodesExplored };
  }

  let bestMove: T = moves[0];
  let bestScore = maximizing ? -Infinity : Infinity;

  for (const move of moves) {
    const child = state.applyMove(move);
    const result = minimax(child, depth - 1, !maximizing);
    nodesExplored += result.nodesExplored;

    if (maximizing) {
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
    } else {
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
    }
  }

  return { score: bestScore, move: bestMove, nodesExplored };
}

export function alphaBeta<T>(
  state: GameState<T>,
  depth: number,
  maximizing: boolean,
  alpha = -Infinity,
  beta = Infinity,
): MinimaxResult<T> {
  let nodesExplored = 1;

  if (depth === 0 || state.isTerminal()) {
    return { score: state.evaluate(), move: null, nodesExplored };
  }

  const moves = state.getMoves();
  if (moves.length === 0) {
    return { score: state.evaluate(), move: null, nodesExplored };
  }

  let bestMove: T = moves[0];

  if (maximizing) {
    let value = -Infinity;
    for (const move of moves) {
      const child = state.applyMove(move);
      const result = alphaBeta(child, depth - 1, false, alpha, beta);
      nodesExplored += result.nodesExplored;
      if (result.score > value) {
        value = result.score;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return { score: value, move: bestMove, nodesExplored };
  } else {
    let value = Infinity;
    for (const move of moves) {
      const child = state.applyMove(move);
      const result = alphaBeta(child, depth - 1, true, alpha, beta);
      nodesExplored += result.nodesExplored;
      if (result.score < value) {
        value = result.score;
        bestMove = move;
      }
      beta = Math.min(beta, value);
      if (alpha >= beta) break;
    }
    return { score: value, move: bestMove, nodesExplored };
  }
}

export function negamax<T>(
  state: GameState<T>,
  depth: number,
  alpha = -Infinity,
  beta = Infinity,
): MinimaxResult<T> {
  let nodesExplored = 1;

  if (depth === 0 || state.isTerminal()) {
    return { score: state.evaluate(), move: null, nodesExplored };
  }

  const moves = state.getMoves();
  if (moves.length === 0) {
    return { score: state.evaluate(), move: null, nodesExplored };
  }

  let bestMove: T = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const child = state.applyMove(move);
    const result = negamax(child, depth - 1, -beta, -alpha);
    nodesExplored += result.nodesExplored;
    const score = -result.score;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    alpha = Math.max(alpha, score);
    if (alpha >= beta) break;
  }

  return { score: bestScore, move: bestMove, nodesExplored };
}

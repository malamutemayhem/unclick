export interface GameState<M> {
  isTerminal(): boolean;
  evaluate(): number;
  getMoves(): M[];
  applyMove(move: M): GameState<M>;
}

export interface MinimaxResult<M> {
  score: number;
  move: M | null;
  nodesExplored: number;
}

export class MinimaxSearch {
  static search<M>(state: GameState<M>, depth: number, maximizing: boolean): MinimaxResult<M> {
    let nodes = 1;

    if (depth === 0 || state.isTerminal()) {
      return { score: state.evaluate(), move: null, nodesExplored: 1 };
    }

    const moves = state.getMoves();
    if (moves.length === 0) {
      return { score: state.evaluate(), move: null, nodesExplored: 1 };
    }

    let bestMove: M = moves[0];
    let bestScore = maximizing ? -Infinity : Infinity;

    for (const move of moves) {
      const child = state.applyMove(move);
      const result = this.search(child, depth - 1, !maximizing);
      nodes += result.nodesExplored;

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

    return { score: bestScore, move: bestMove, nodesExplored: nodes };
  }

  static negamax<M>(state: GameState<M>, depth: number): MinimaxResult<M> {
    let nodes = 1;

    if (depth === 0 || state.isTerminal()) {
      return { score: state.evaluate(), move: null, nodesExplored: 1 };
    }

    const moves = state.getMoves();
    if (moves.length === 0) {
      return { score: state.evaluate(), move: null, nodesExplored: 1 };
    }

    let bestMove: M = moves[0];
    let bestScore = -Infinity;

    for (const move of moves) {
      const child = state.applyMove(move);
      const result = this.negamax(child, depth - 1);
      nodes += result.nodesExplored;
      const score = -result.score;

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { score: bestScore, move: bestMove, nodesExplored: nodes };
  }
}

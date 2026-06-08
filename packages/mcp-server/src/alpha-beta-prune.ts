export interface ABGameState<M> {
  isTerminal(): boolean;
  evaluate(): number;
  getMoves(): M[];
  applyMove(move: M): ABGameState<M>;
}

export interface ABResult<M> {
  score: number;
  move: M | null;
  nodesExplored: number;
  pruned: number;
}

export class AlphaBetaPrune {
  static search<M>(
    state: ABGameState<M>,
    depth: number,
    maximizing: boolean,
    alpha: number = -Infinity,
    beta: number = Infinity
  ): ABResult<M> {
    let nodes = 1;
    let pruned = 0;

    if (depth === 0 || state.isTerminal()) {
      return { score: state.evaluate(), move: null, nodesExplored: 1, pruned: 0 };
    }

    const moves = state.getMoves();
    if (moves.length === 0) {
      return { score: state.evaluate(), move: null, nodesExplored: 1, pruned: 0 };
    }

    let bestMove: M = moves[0];

    if (maximizing) {
      let value = -Infinity;
      for (const move of moves) {
        const child = state.applyMove(move);
        const result = this.search(child, depth - 1, false, alpha, beta);
        nodes += result.nodesExplored;
        pruned += result.pruned;

        if (result.score > value) {
          value = result.score;
          bestMove = move;
        }
        alpha = Math.max(alpha, value);
        if (alpha >= beta) {
          pruned++;
          break;
        }
      }
      return { score: value, move: bestMove, nodesExplored: nodes, pruned };
    } else {
      let value = Infinity;
      for (const move of moves) {
        const child = state.applyMove(move);
        const result = this.search(child, depth - 1, true, alpha, beta);
        nodes += result.nodesExplored;
        pruned += result.pruned;

        if (result.score < value) {
          value = result.score;
          bestMove = move;
        }
        beta = Math.min(beta, value);
        if (alpha >= beta) {
          pruned++;
          break;
        }
      }
      return { score: value, move: bestMove, nodesExplored: nodes, pruned };
    }
  }
}

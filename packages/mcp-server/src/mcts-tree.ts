export interface MCTSState<M> {
  isTerminal(): boolean;
  getResult(): number;
  getMoves(): M[];
  applyMove(move: M): MCTSState<M>;
  clone(): MCTSState<M>;
}

interface MCTSNode<M> {
  state: MCTSState<M>;
  parent: MCTSNode<M> | null;
  move: M | null;
  children: MCTSNode<M>[];
  wins: number;
  visits: number;
  untriedMoves: M[];
}

export class MCTSTree {
  static search<M>(rootState: MCTSState<M>, iterations: number, explorationParam: number = 1.414): M | null {
    const root: MCTSNode<M> = {
      state: rootState.clone(),
      parent: null,
      move: null,
      children: [],
      wins: 0,
      visits: 0,
      untriedMoves: rootState.getMoves(),
    };

    for (let i = 0; i < iterations; i++) {
      let node = root;
      let state = rootState.clone();

      while (node.untriedMoves.length === 0 && node.children.length > 0) {
        node = this.bestUCT(node, explorationParam);
        state = state.applyMove(node.move!);
      }

      if (node.untriedMoves.length > 0) {
        const moveIdx = Math.floor(Math.random() * node.untriedMoves.length);
        const move = node.untriedMoves.splice(moveIdx, 1)[0];
        state = state.applyMove(move);
        const child: MCTSNode<M> = {
          state: state.clone(),
          parent: node,
          move,
          children: [],
          wins: 0,
          visits: 0,
          untriedMoves: state.getMoves(),
        };
        node.children.push(child);
        node = child;
      }

      while (!state.isTerminal()) {
        const moves = state.getMoves();
        if (moves.length === 0) break;
        state = state.applyMove(moves[Math.floor(Math.random() * moves.length)]);
      }

      const result = state.getResult();
      while (node !== null) {
        node.visits++;
        node.wins += result;
        node = node.parent!;
      }
    }

    if (root.children.length === 0) return null;
    let bestChild = root.children[0];
    for (const child of root.children) {
      if (child.visits > bestChild.visits) bestChild = child;
    }
    return bestChild.move;
  }

  private static bestUCT<M>(node: MCTSNode<M>, c: number): MCTSNode<M> {
    let best = node.children[0];
    let bestValue = -Infinity;
    for (const child of node.children) {
      const uct = child.wins / child.visits + c * Math.sqrt(Math.log(node.visits) / child.visits);
      if (uct > bestValue) {
        bestValue = uct;
        best = child;
      }
    }
    return best;
  }
}

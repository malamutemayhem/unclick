export interface AStarOptions<N> {
  start: N;
  goal: N;
  neighbors: (node: N) => N[];
  cost: (from: N, to: N) => number;
  heuristic: (node: N) => number;
  key?: (node: N) => string;
}

export interface AStarResult<N> {
  path: N[];
  cost: number;
  visited: number;
}

export function aStar<N>(options: AStarOptions<N>): AStarResult<N> | null {
  const { start, goal, neighbors, cost, heuristic, key = String } = options;

  const goalKey = key(goal);
  const open = new Map<string, { node: N; f: number; g: number }>();
  const closed = new Set<string>();
  const cameFrom = new Map<string, string>();
  const nodeMap = new Map<string, N>();

  const startKey = key(start);
  const startG = 0;
  open.set(startKey, { node: start, f: startG + heuristic(start), g: startG });
  nodeMap.set(startKey, start);

  let visited = 0;

  while (open.size > 0) {
    let bestKey = "";
    let bestF = Infinity;
    for (const [k, entry] of open) {
      if (entry.f < bestF) {
        bestF = entry.f;
        bestKey = k;
      }
    }

    const current = open.get(bestKey)!;
    open.delete(bestKey);
    closed.add(bestKey);
    visited++;

    if (bestKey === goalKey) {
      const path: N[] = [];
      let cur = bestKey;
      while (cur !== undefined) {
        path.push(nodeMap.get(cur)!);
        cur = cameFrom.get(cur)!;
      }
      path.reverse();
      return { path, cost: current.g, visited };
    }

    for (const neighbor of neighbors(current.node)) {
      const nKey = key(neighbor);
      if (closed.has(nKey)) continue;

      const tentativeG = current.g + cost(current.node, neighbor);
      const existing = open.get(nKey);

      if (!existing || tentativeG < existing.g) {
        nodeMap.set(nKey, neighbor);
        cameFrom.set(nKey, bestKey);
        open.set(nKey, {
          node: neighbor,
          f: tentativeG + heuristic(neighbor),
          g: tentativeG,
        });
      }
    }
  }

  return null;
}

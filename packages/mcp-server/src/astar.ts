export interface AStarNode {
  x: number;
  y: number;
}

export interface AStarResult {
  path: AStarNode[];
  cost: number;
  explored: number;
}

export type HeuristicFunc = (a: AStarNode, b: AStarNode) => number;

export function manhattan(a: AStarNode, b: AStarNode): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function euclidean(a: AStarNode, b: AStarNode): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function chebyshev(a: AStarNode, b: AStarNode): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export class GridPathfinder {
  private width: number;
  private height: number;
  private blocked: Set<string>;
  private weights: Map<string, number>;
  private allowDiagonal: boolean;

  constructor(width: number, height: number, allowDiagonal = false) {
    this.width = width;
    this.height = height;
    this.blocked = new Set();
    this.weights = new Map();
    this.allowDiagonal = allowDiagonal;
  }

  setBlocked(x: number, y: number, isBlocked: boolean): void {
    const key = `${x},${y}`;
    if (isBlocked) {
      this.blocked.add(key);
    } else {
      this.blocked.delete(key);
    }
  }

  setWeight(x: number, y: number, weight: number): void {
    this.weights.set(`${x},${y}`, weight);
  }

  isBlocked(x: number, y: number): boolean {
    return this.blocked.has(`${x},${y}`);
  }

  private getNeighbors(node: AStarNode): AStarNode[] {
    const dirs: [number, number][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    if (this.allowDiagonal) {
      dirs.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    }
    const neighbors: AStarNode[] = [];
    for (const [dx, dy] of dirs) {
      const nx = node.x + dx;
      const ny = node.y + dy;
      if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
        if (!this.blocked.has(`${nx},${ny}`)) {
          neighbors.push({ x: nx, y: ny });
        }
      }
    }
    return neighbors;
  }

  findPath(start: AStarNode, goal: AStarNode, heuristic: HeuristicFunc = manhattan): AStarResult | null {
    const key = (n: AStarNode) => `${n.x},${n.y}`;
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const cameFrom = new Map<string, string>();
    const openSet = new Map<string, AStarNode>();
    const closedSet = new Set<string>();

    const startKey = key(start);
    gScore.set(startKey, 0);
    fScore.set(startKey, heuristic(start, goal));
    openSet.set(startKey, start);

    let explored = 0;

    while (openSet.size > 0) {
      let currentKey = "";
      let currentNode: AStarNode | null = null;
      let minF = Infinity;
      for (const [k, node] of openSet) {
        const f = fScore.get(k) ?? Infinity;
        if (f < minF) {
          minF = f;
          currentKey = k;
          currentNode = node;
        }
      }

      if (!currentNode) break;
      explored++;

      if (currentNode.x === goal.x && currentNode.y === goal.y) {
        const path = this.reconstructPath(cameFrom, currentKey, start);
        return { path, cost: gScore.get(currentKey) ?? 0, explored };
      }

      openSet.delete(currentKey);
      closedSet.add(currentKey);

      for (const neighbor of this.getNeighbors(currentNode)) {
        const nKey = key(neighbor);
        if (closedSet.has(nKey)) continue;

        const weight = this.weights.get(nKey) || 1;
        const isDiag = neighbor.x !== currentNode.x && neighbor.y !== currentNode.y;
        const moveCost = isDiag ? weight * Math.SQRT2 : weight;
        const tentativeG = (gScore.get(currentKey) ?? 0) + moveCost;

        if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
          cameFrom.set(nKey, currentKey);
          gScore.set(nKey, tentativeG);
          fScore.set(nKey, tentativeG + heuristic(neighbor, goal));
          openSet.set(nKey, neighbor);
        }
      }
    }

    return null;
  }

  private reconstructPath(cameFrom: Map<string, string>, goalKey: string, start: AStarNode): AStarNode[] {
    const path: AStarNode[] = [];
    let current = goalKey;
    while (current) {
      const [x, y] = current.split(",").map(Number);
      path.unshift({ x, y });
      if (x === start.x && y === start.y) break;
      const prev = cameFrom.get(current);
      if (!prev) break;
      current = prev;
    }
    return path;
  }

  get gridWidth(): number { return this.width; }
  get gridHeight(): number { return this.height; }
}

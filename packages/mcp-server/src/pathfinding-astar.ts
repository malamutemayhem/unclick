export interface GridCell {
  x: number;
  y: number;
}

export interface AStarResult {
  path: GridCell[];
  cost: number;
  explored: number;
}

export function astar(
  grid: number[][],
  start: GridCell,
  end: GridCell,
  allowDiagonal = false,
): AStarResult | null {
  const rows = grid.length;
  const cols = grid[0].length;

  const key = (c: GridCell) => `${c.x},${c.y}`;

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, string>();

  const openSet = new Set<string>();
  const closedSet = new Set<string>();

  const h = (a: GridCell) => {
    if (allowDiagonal) {
      return Math.max(Math.abs(a.x - end.x), Math.abs(a.y - end.y));
    }
    return Math.abs(a.x - end.x) + Math.abs(a.y - end.y);
  };

  const startKey = key(start);
  gScore.set(startKey, 0);
  fScore.set(startKey, h(start));
  openSet.add(startKey);

  let explored = 0;

  const dirs: [number, number, number][] = [
    [0, -1, 1], [0, 1, 1], [-1, 0, 1], [1, 0, 1],
  ];
  if (allowDiagonal) {
    const d = Math.SQRT2;
    dirs.push([-1, -1, d], [1, -1, d], [-1, 1, d], [1, 1, d]);
  }

  while (openSet.size > 0) {
    let currentKey = "";
    let currentF = Infinity;
    for (const k of openSet) {
      const f = fScore.get(k) ?? Infinity;
      if (f < currentF) {
        currentF = f;
        currentKey = k;
      }
    }

    const [cx, cy] = currentKey.split(",").map(Number);
    const current: GridCell = { x: cx, y: cy };
    explored++;

    if (current.x === end.x && current.y === end.y) {
      const path: GridCell[] = [];
      let k = currentKey;
      while (k) {
        const [px, py] = k.split(",").map(Number);
        path.unshift({ x: px, y: py });
        k = cameFrom.get(k)!;
      }
      return { path, cost: gScore.get(currentKey)!, explored };
    }

    openSet.delete(currentKey);
    closedSet.add(currentKey);

    for (const [dx, dy, moveCost] of dirs) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
      if (grid[ny][nx] === 1) continue;

      const nk = key({ x: nx, y: ny });
      if (closedSet.has(nk)) continue;

      const tentG = (gScore.get(currentKey) ?? Infinity) + moveCost;
      if (tentG < (gScore.get(nk) ?? Infinity)) {
        cameFrom.set(nk, currentKey);
        gScore.set(nk, tentG);
        fScore.set(nk, tentG + h({ x: nx, y: ny }));
        openSet.add(nk);
      }
    }
  }

  return null;
}

export function manhattanDistance(a: GridCell, b: GridCell): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function chebyshevDistance(a: GridCell, b: GridCell): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function euclideanDistance(a: GridCell, b: GridCell): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

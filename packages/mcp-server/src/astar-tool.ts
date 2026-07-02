import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function astarPath(args: Record<string, unknown>) {
  const grid = args.grid as number[][];
  if (!Array.isArray(grid) || grid.length === 0) {
    throw new Error("grid must be a non-empty 2D array (0 = passable, 1 = wall).");
  }
  const rows = grid.length;
  const cols = grid[0].length;
  if (cols === 0) throw new Error("grid rows must not be empty.");
  if (rows > 200 || cols > 200) throw new Error("grid must be 200x200 or smaller.");

  const startArr = args.start as number[];
  const endArr = args.end as number[];
  if (!Array.isArray(startArr) || startArr.length !== 2) throw new Error("start must be [row, col].");
  if (!Array.isArray(endArr) || endArr.length !== 2) throw new Error("end must be [row, col].");

  const [sr, sc] = startArr;
  const [er, ec] = endArr;
  if (sr < 0 || sr >= rows || sc < 0 || sc >= cols) throw new Error("start is out of bounds.");
  if (er < 0 || er >= rows || ec < 0 || ec >= cols) throw new Error("end is out of bounds.");
  if (grid[sr][sc] === 1) throw new Error("start cell is a wall.");
  if (grid[er][ec] === 1) throw new Error("end cell is a wall.");

  const allowDiagonal = args.diagonal !== false;

  const h = (r: number, c: number) =>
    allowDiagonal
      ? Math.max(Math.abs(r - er), Math.abs(c - ec))
      : Math.abs(r - er) + Math.abs(c - ec);

  const key = (r: number, c: number) => r * cols + c;

  const gScore = new Map<number, number>();
  const cameFrom = new Map<number, number>();
  gScore.set(key(sr, sc), 0);

  const open: [number, number, number][] = [[h(sr, sc), sr, sc]];
  const closed = new Set<number>();
  let nodesExplored = 0;

  const dirs = allowDiagonal
    ? [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]
    : [[-1,0],[1,0],[0,-1],[0,1]];

  while (open.length > 0) {
    open.sort((a, b) => a[0] - b[0]);
    const [, cr, cc] = open.shift()!;
    const ck = key(cr, cc);

    if (closed.has(ck)) continue;
    closed.add(ck);
    nodesExplored++;

    if (cr === er && cc === ec) {
      const path: number[][] = [];
      let cur = ck;
      while (cur !== undefined) {
        const r = Math.floor(cur / cols);
        const c = cur % cols;
        path.unshift([r, c]);
        cur = cameFrom.get(cur)!;
        if (cur === key(sr, sc)) { path.unshift([sr, sc]); break; }
      }
      const meta: ConnectorMeta = {
        source: "local-computation",
        fetched_at: new Date().toISOString(),
        next_steps: [
          "Path is optimal for the given heuristic",
          "Set diagonal: false for 4-directional movement only",
        ],
      };
      return stampMeta({
        found: true,
        path,
        path_length: path.length - 1,
        nodes_explored: nodesExplored,
        grid_size: [rows, cols],
        diagonal: allowDiagonal,
      }, meta);
    }

    const currentG = gScore.get(ck) ?? Infinity;
    for (const [dr, dc] of dirs) {
      const nr = cr + dr;
      const nc = cc + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === 1) continue;
      const nk = key(nr, nc);
      if (closed.has(nk)) continue;

      const moveCost = (dr !== 0 && dc !== 0) ? 1.414 : 1;
      const tentG = currentG + moveCost;
      if (tentG < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, tentG);
        cameFrom.set(nk, ck);
        open.push([tentG + h(nr, nc), nr, nc]);
      }
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "No path exists between start and end",
      "Check that walls do not fully block the path",
    ],
  };
  return stampMeta({
    found: false,
    path: null,
    path_length: null,
    nodes_explored: nodesExplored,
    grid_size: [rows, cols],
    diagonal: allowDiagonal,
  }, meta);
}

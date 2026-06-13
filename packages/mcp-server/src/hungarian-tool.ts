import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function hungarianAssign(args: Record<string, unknown>) {
  const costMatrix = args.cost_matrix as number[][];
  if (!Array.isArray(costMatrix) || costMatrix.length === 0) {
    throw new Error("cost_matrix must be a non-empty 2D array of costs.");
  }

  const n = costMatrix.length;
  if (n > 100) throw new Error("cost_matrix must be 100x100 or smaller.");
  for (const row of costMatrix) {
    if (!Array.isArray(row) || row.length !== n) {
      throw new Error("cost_matrix must be square (NxN).");
    }
  }

  const maximize = args.maximize === true;

  const cost = costMatrix.map(row => [...row]);
  if (maximize) {
    let maxVal = -Infinity;
    for (const row of cost) for (const v of row) if (v > maxVal) maxVal = v;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cost[i][j] = maxVal - cost[i][j];
  }

  const u = new Array(n + 1).fill(0);
  const v = new Array(n + 1).fill(0);
  const assignment = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    const way = new Array(n + 1).fill(0);
    const mins = new Array(n + 1).fill(Infinity);
    const visited = new Array(n + 1).fill(false);
    assignment[0] = i;
    let j0 = 0;

    do {
      visited[j0] = true;
      const i0 = assignment[j0];
      let delta = Infinity;
      let j1 = 0;

      for (let j = 1; j <= n; j++) {
        if (visited[j]) continue;
        const val = cost[i0 - 1][j - 1] - u[i0] - v[j];
        if (val < mins[j]) {
          mins[j] = val;
          way[j] = j0;
        }
        if (mins[j] < delta) {
          delta = mins[j];
          j1 = j;
        }
      }

      for (let j = 0; j <= n; j++) {
        if (visited[j]) {
          u[assignment[j]] += delta;
          v[j] -= delta;
        } else {
          mins[j] -= delta;
        }
      }

      j0 = j1;
    } while (assignment[j0] !== 0);

    while (j0 !== 0) {
      const prev = way[j0];
      assignment[j0] = assignment[prev];
      j0 = prev;
    }
  }

  const result: { worker: number; task: number; cost: number }[] = [];
  let totalCost = 0;
  for (let j = 1; j <= n; j++) {
    const worker = assignment[j] - 1;
    const task = j - 1;
    const c = costMatrix[worker][task];
    totalCost += c;
    result.push({ worker, task, cost: c });
  }
  result.sort((a, b) => a.worker - b.worker);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Assignment is globally optimal (minimum or maximum total cost)",
      "Cost matrix must be square; pad with zeros if workers != tasks",
    ],
  };
  return stampMeta({
    size: n,
    mode: maximize ? "maximize" : "minimize",
    total_cost: totalCost,
    assignments: result,
  }, meta);
}

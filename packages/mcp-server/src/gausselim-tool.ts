import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function gaussianElimination(args: Record<string, unknown>) {
  const matrix = args.matrix as number[][];

  if (!Array.isArray(matrix) || matrix.length === 0 || matrix.length > 200) {
    throw new Error("matrix must be a non-empty array of rows (max 200 rows)");
  }

  const n = matrix.length;
  const m = matrix[0].length;
  if (m < 2 || m > 201) {
    throw new Error("each row must have at least 2 columns (max 201)");
  }
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== m) {
      throw new Error("all rows must have the same length");
    }
  }

  const aug = matrix.map((row) => row.map(Number));

  const pivotCol: number[] = [];
  let row = 0;
  for (let col = 0; col < m - 1 && row < n; col++) {
    let best = row;
    for (let i = row + 1; i < n; i++) {
      if (Math.abs(aug[i][col]) > Math.abs(aug[best][col])) best = i;
    }
    if (Math.abs(aug[best][col]) < 1e-12) continue;

    [aug[row], aug[best]] = [aug[best], aug[row]];

    const scale = aug[row][col];
    for (let j = col; j < m; j++) aug[row][j] /= scale;

    for (let i = 0; i < n; i++) {
      if (i === row) continue;
      const factor = aug[i][col];
      if (Math.abs(factor) < 1e-15) continue;
      for (let j = col; j < m; j++) {
        aug[i][j] -= factor * aug[row][j];
      }
    }

    pivotCol.push(col);
    row++;
  }

  const rank = pivotCol.length;
  const numVars = m - 1;

  let consistent = true;
  for (let i = rank; i < n; i++) {
    if (Math.abs(aug[i][m - 1]) > 1e-10) {
      consistent = false;
      break;
    }
  }

  let solution: number[] | null = null;
  let solutionType: string;

  if (!consistent) {
    solutionType = "inconsistent";
  } else if (rank === numVars) {
    solutionType = "unique";
    solution = [];
    for (let i = 0; i < rank; i++) {
      solution.push(Math.round(aug[i][m - 1] * 1e10) / 1e10);
    }
  } else {
    solutionType = "infinite";
    solution = [];
    const pivotSet = new Set(pivotCol);
    for (let j = 0; j < numVars; j++) {
      if (pivotSet.has(j)) {
        const pivotRow = pivotCol.indexOf(j);
        solution.push(Math.round(aug[pivotRow][m - 1] * 1e10) / 1e10);
      } else {
        solution.push(0);
      }
    }
  }

  const rref = aug.map((r) =>
    r.map((v) => (Math.abs(v) < 1e-12 ? 0 : Math.round(v * 1e10) / 1e10))
  );

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use the solution vector or RREF for further analysis",
      "Check solution_type for system consistency",
    ],
  };

  return stampMeta(
    {
      rows: n,
      columns: numVars,
      rank,
      solution_type: solutionType,
      solution,
      pivot_columns: pivotCol,
      rref,
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Compute the rank of a matrix using Gaussian elimination with partial pivoting.
 */
export async function matrixRank(args: Record<string, unknown>) {
  const matrix = args.matrix as number[][];
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("matrix must be a non-empty 2D array.");
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  if (rows > 100 || cols > 100) {
    throw new Error("Maximum matrix size is 100x100.");
  }
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== cols) {
      throw new Error("All rows must have the same length.");
    }
    for (const v of row) {
      if (typeof v !== "number" || !Number.isFinite(v)) {
        throw new Error("All matrix entries must be finite numbers.");
      }
    }
  }

  // Work on a copy
  const a: number[][] = matrix.map((r) => [...r]);
  const m = rows;
  const n = cols;
  const EPS = 1e-9;

  let rank = 0;
  for (let col = 0; col < n && rank < m; col++) {
    // Find pivot
    let maxVal = Math.abs(a[rank][col]);
    let maxRow = rank;
    for (let row = rank + 1; row < m; row++) {
      if (Math.abs(a[row][col]) > maxVal) {
        maxVal = Math.abs(a[row][col]);
        maxRow = row;
      }
    }
    if (maxVal < EPS) {
      continue; // Skip this column
    }

    // Swap rows
    [a[rank], a[maxRow]] = [a[maxRow], a[rank]];

    // Eliminate below
    for (let row = rank + 1; row < m; row++) {
      const factor = a[row][col] / a[rank][col];
      for (let j = col; j < n; j++) {
        a[row][j] -= factor * a[rank][j];
      }
    }
    rank++;
  }

  const minDim = Math.min(m, n);
  const isFullRank = rank === minDim;
  const nullity = n - rank;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use rank to determine if a linear system has a unique solution (rank = n)",
      "Nullity = cols - rank gives the dimension of the null space",
    ],
  };

  return stampMeta(
    {
      rows: m,
      cols: n,
      rank,
      is_full_rank: isFullRank,
      nullity,
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function matrixInverse(args: Record<string, unknown>) {
  const matrix = args.matrix as number[][];
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("matrix must be a non-empty 2D array.");
  }
  const n = matrix.length;
  if (n > 50) throw new Error("Maximum matrix size is 50x50.");

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== n) {
      throw new Error("Matrix must be square with consistent row lengths.");
    }
  }

  const aug: number[][] = matrix.map((row, i) => {
    const identity = new Array(n).fill(0);
    identity[i] = 1;
    return [...row.map(Number), ...identity];
  });

  for (let col = 0; col < n; col++) {
    let maxRow = col;
    let maxVal = Math.abs(aug[col][col]);
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > maxVal) {
        maxVal = Math.abs(aug[row][col]);
        maxRow = row;
      }
    }

    if (maxVal < 1e-12) {
      throw new Error("Matrix is singular (not invertible).");
    }

    if (maxRow !== col) {
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    }

    const pivot = aug[col][col];
    for (let j = 0; j < 2 * n; j++) {
      aug[col][j] /= pivot;
    }

    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = aug[row][col];
        for (let j = 0; j < 2 * n; j++) {
          aug[row][j] -= factor * aug[col][j];
        }
      }
    }
  }

  const inverse = aug.map((row) =>
    row.slice(n).map((v) => Math.round(v * 1e8) / 1e8),
  );

  let det = 1;
  const orig: number[][] = matrix.map((row) => [...row.map(Number)]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(orig[row][col]) > Math.abs(orig[maxRow][col])) maxRow = row;
    }
    if (maxRow !== col) {
      [orig[col], orig[maxRow]] = [orig[maxRow], orig[col]];
      det *= -1;
    }
    det *= orig[col][col];
    for (let row = col + 1; row < n; row++) {
      const factor = orig[row][col] / orig[col][col];
      for (let j = col; j < n; j++) orig[row][j] -= factor * orig[col][j];
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use linear_solve for Ax=b systems", "Use matrix_decomp for LU factorization"],
  };
  return stampMeta(
    {
      size: n,
      inverse,
      determinant: Math.round(det * 1e8) / 1e8,
    },
    meta,
  );
}

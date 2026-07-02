import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function linearSolve(args: Record<string, unknown>) {
  const A = args.matrix as number[][];
  const b = args.vector as number[];

  if (!Array.isArray(A) || A.length === 0) {
    throw new Error("matrix must be a non-empty 2D array (coefficient matrix).");
  }
  if (!Array.isArray(b) || b.length === 0) {
    throw new Error("vector must be a non-empty array (right-hand side).");
  }

  const n = A.length;
  if (n > 100) throw new Error("Maximum system size is 100x100.");
  if (b.length !== n) throw new Error("vector length must equal the number of rows in matrix.");

  for (const row of A) {
    if (!Array.isArray(row) || row.length !== n) {
      throw new Error("matrix must be square with consistent row lengths.");
    }
  }

  const aug: number[][] = A.map((row, i) => [...row, b[i]]);

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
      throw new Error("System is singular or nearly singular (no unique solution).");
    }

    if (maxRow !== col) {
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    }

    for (let row = col + 1; row < n; row++) {
      const factor = aug[row][col] / aug[col][col];
      for (let j = col; j <= n; j++) {
        aug[row][j] -= factor * aug[col][j];
      }
    }
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = aug[i][n];
    for (let j = i + 1; j < n; j++) {
      sum -= aug[i][j] * x[j];
    }
    x[i] = Math.round((sum / aug[i][i]) * 1e8) / 1e8;
  }

  const residuals = A.map((row, i) => {
    const ax = row.reduce((s, v, j) => s + v * x[j], 0);
    return Math.round((ax - b[i]) * 1e10) / 1e10;
  });

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use matrix_operate for determinant or inverse", "Use regression_fit for least-squares fitting"],
  };
  return stampMeta(
    {
      solution: x,
      system_size: n,
      residuals,
      max_residual: Math.max(...residuals.map(Math.abs)),
    },
    meta,
  );
}

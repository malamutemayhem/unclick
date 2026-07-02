import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function matrixDecomp(args: Record<string, unknown>) {
  const matrix = args.matrix as number[][];
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("matrix must be a non-empty 2D array.");
  }
  const m = matrix.length;
  const n = matrix[0].length;
  if (m > 100 || n > 100) {
    throw new Error("Maximum matrix size is 100x100.");
  }
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== n) {
      throw new Error("All rows must have the same length.");
    }
  }

  const op = String(args.operation ?? "lu").toLowerCase();

  if (op === "lu") {
    if (m !== n) throw new Error("LU decomposition requires a square matrix.");
    const L: number[][] = Array.from({ length: m }, (_, i) =>
      Array.from({ length: m }, (_, j) => (i === j ? 1 : 0)),
    );
    const U: number[][] = matrix.map((r) => [...r]);

    for (let k = 0; k < m; k++) {
      if (Math.abs(U[k][k]) < 1e-12) {
        throw new Error("Matrix is singular or nearly singular (zero pivot).");
      }
      for (let i = k + 1; i < m; i++) {
        const factor = U[i][k] / U[k][k];
        L[i][k] = Math.round(factor * 1e8) / 1e8;
        for (let j = k; j < m; j++) {
          U[i][j] -= factor * U[k][j];
        }
      }
    }

    const roundMatrix = (mat: number[][]) =>
      mat.map((r) => r.map((v) => Math.round(v * 1e8) / 1e8));

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use L and U to solve Ax = b via forward/backward substitution"],
    };
    return stampMeta(
      {
        operation: "lu",
        size: `${m}x${n}`,
        L: roundMatrix(L),
        U: roundMatrix(U),
      },
      meta,
    );
  }

  if (op === "transpose") {
    const T: number[][] = Array.from({ length: n }, (_, i) =>
      Array.from({ length: m }, (_, j) => matrix[j][i]),
    );
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use matrix_operate for multiplication or determinant"],
    };
    return stampMeta(
      { operation: "transpose", input_size: `${m}x${n}`, output_size: `${n}x${m}`, result: T },
      meta,
    );
  }

  if (op === "trace") {
    if (m !== n) throw new Error("Trace requires a square matrix.");
    let trace = 0;
    for (let i = 0; i < m; i++) trace += matrix[i][i];
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Trace equals the sum of eigenvalues"],
    };
    return stampMeta(
      { operation: "trace", size: `${m}x${n}`, trace: Math.round(trace * 1e8) / 1e8 },
      meta,
    );
  }

  if (op === "rank") {
    const A: number[][] = matrix.map((r) => [...r]);
    let rank = 0;
    const rows = A.length;
    const cols = A[0].length;
    const usedRows = new Set<number>();

    for (let col = 0; col < cols; col++) {
      let pivotRow = -1;
      for (let row = 0; row < rows; row++) {
        if (!usedRows.has(row) && Math.abs(A[row][col]) > 1e-10) {
          pivotRow = row;
          break;
        }
      }
      if (pivotRow === -1) continue;
      usedRows.add(pivotRow);
      rank++;
      const pivotVal = A[pivotRow][col];
      for (let row = 0; row < rows; row++) {
        if (row !== pivotRow && Math.abs(A[row][col]) > 1e-10) {
          const factor = A[row][col] / pivotVal;
          for (let c = col; c < cols; c++) {
            A[row][c] -= factor * A[pivotRow][c];
          }
        }
      }
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Full rank means the system has a unique solution"],
    };
    return stampMeta({ operation: "rank", size: `${m}x${n}`, rank }, meta);
  }

  throw new Error(`Unknown operation "${op}". Supported: lu, transpose, trace, rank.`);
}

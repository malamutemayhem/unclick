import { stampMeta, ConnectorMeta } from "./connector-meta.js";

type Matrix = number[][];

function add(a: Matrix, b: Matrix): Matrix {
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

function multiply(a: Matrix, b: Matrix): Matrix {
  const rows = a.length;
  const cols = b[0].length;
  const n = b.length;
  const result: Matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < n; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function transpose(m: Matrix): Matrix {
  return m[0].map((_, j) => m.map((row) => row[j]));
}

function determinant(m: Matrix): number {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let det = 0;
  for (let j = 0; j < n; j++) {
    const sub = m.slice(1).map((row) => [...row.slice(0, j), ...row.slice(j + 1)]);
    det += (j % 2 === 0 ? 1 : -1) * m[0][j] * determinant(sub);
  }
  return det;
}

export async function matrixOperate(args: Record<string, unknown>) {
  const a = args.matrix_a as Matrix | undefined;
  if (!Array.isArray(a) || !Array.isArray(a[0])) return { error: "matrix_a is required (2D array)" };

  const op = typeof args.operation === "string" ? args.operation : "transpose";

  if (op === "transpose") {
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Available ops: add, multiply, transpose, determinant"] };
    return stampMeta({ operation: op, result: transpose(a) }, meta);
  }

  if (op === "determinant") {
    if (a.length !== a[0].length) return { error: "Matrix must be square for determinant" };
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Available ops: add, multiply, transpose, determinant"] };
    return stampMeta({ operation: op, result: determinant(a) }, meta);
  }

  const b = args.matrix_b as Matrix | undefined;
  if (!Array.isArray(b) || !Array.isArray(b[0])) return { error: "matrix_b is required for " + op };

  if (op === "add") {
    if (a.length !== b.length || a[0].length !== b[0].length) return { error: "Matrices must have same dimensions for addition" };
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Available ops: add, multiply, transpose, determinant"] };
    return stampMeta({ operation: op, result: add(a, b) }, meta);
  }

  if (op === "multiply") {
    if (a[0].length !== b.length) return { error: "matrix_a columns must equal matrix_b rows for multiplication" };
    const meta: ConnectorMeta = { source: "local-computation", fetched_at: new Date().toISOString(), next_steps: ["Available ops: add, multiply, transpose, determinant"] };
    return stampMeta({ operation: op, result: multiply(a, b) }, meta);
  }

  return { error: "Unknown operation. Available: add, multiply, transpose, determinant" };
}

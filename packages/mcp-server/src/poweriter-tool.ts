import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function powerIteration(args: Record<string, unknown>) {
  const matrix = args.matrix as number[][];
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("matrix must be a non-empty square 2D array.");
  }

  const n = matrix.length;
  if (n > 100) throw new Error("matrix must be 100x100 or smaller.");
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== n) {
      throw new Error("matrix must be square (NxN).");
    }
  }

  const maxIter = typeof args.max_iterations === "number" ? args.max_iterations : 1000;
  const tolerance = typeof args.tolerance === "number" ? args.tolerance : 1e-10;

  let v = new Array(n).fill(1 / Math.sqrt(n));
  let eigenvalue = 0;
  let iters = 0;

  for (let iter = 0; iter < maxIter; iter++) {
    iters++;
    const w = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        w[i] += matrix[i][j] * v[j];
      }
    }

    let norm = 0;
    for (let i = 0; i < n; i++) norm += w[i] * w[i];
    norm = Math.sqrt(norm);

    if (norm === 0) {
      const meta: ConnectorMeta = {
        source: "local-computation",
        fetched_at: new Date().toISOString(),
        next_steps: ["Matrix maps the initial vector to zero; try a different starting vector"],
      };
      return stampMeta({
        converged: false,
        reason: "zero vector produced",
        iterations_run: iters,
        eigenvalue: null,
        eigenvector: null,
      }, meta);
    }

    const newEigenvalue = norm * (w[0] >= 0 ? 1 : -1);
    const newV = w.map(x => x / norm);

    if (Math.abs(newEigenvalue - eigenvalue) < tolerance) {
      eigenvalue = newEigenvalue;
      v = newV;
      break;
    }

    eigenvalue = newEigenvalue;
    v = newV;
  }

  const rayleigh = (() => {
    let num = 0;
    let den = 0;
    const av = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) av[i] += matrix[i][j] * v[j];
    }
    for (let i = 0; i < n; i++) {
      num += v[i] * av[i];
      den += v[i] * v[i];
    }
    return num / den;
  })();

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Power iteration finds the dominant (largest magnitude) eigenvalue",
      "For other eigenvalues, use deflation or a different method",
    ],
  };
  return stampMeta({
    converged: true,
    iterations_run: iters,
    dominant_eigenvalue: Math.round(rayleigh * 1e8) / 1e8,
    eigenvector: v.map(x => Math.round(x * 1e8) / 1e8),
    matrix_size: n,
  }, meta);
}

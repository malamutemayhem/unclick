import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function matChainOrder(args: Record<string, unknown>) {
  const dims = args.dimensions as number[];
  if (!Array.isArray(dims) || dims.length < 2) {
    throw new Error("dimensions must be an array of at least 2 numbers");
  }
  for (const d of dims) {
    if (!Number.isInteger(d) || d <= 0) {
      throw new Error("each dimension must be a positive integer");
    }
  }
  if (dims.length > 200) {
    throw new Error("at most 200 dimensions (199 matrices)");
  }

  const n = dims.length - 1;
  const m: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const s: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      m[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = m[i][k] + m[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        if (cost < m[i][j]) {
          m[i][j] = cost;
          s[i][j] = k;
        }
      }
    }
  }

  function buildParens(i: number, j: number): string {
    if (i === j) return `M${i + 1}`;
    return `(${buildParens(i, s[i][j])} x ${buildParens(s[i][j] + 1, j)})`;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use optimal order for efficient matrix multiplication"],
  };

  return stampMeta(
    {
      matrix_count: n,
      dimensions: dims,
      min_multiplications: m[0][n - 1],
      optimal_parenthesization: buildParens(0, n - 1),
    },
    meta,
  );
}

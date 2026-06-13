import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function multiplyMatrices(a: number[][], b: number[][], mod?: number): number[][] {
  const n = a.length;
  const result: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      if (a[i][k] === 0) continue;
      for (let j = 0; j < n; j++) {
        result[i][j] += a[i][k] * b[k][j];
        if (mod) result[i][j] = ((result[i][j] % mod) + mod) % mod;
      }
    }
  }
  return result;
}

function identityMatrix(n: number): number[][] {
  return Array.from({ length: n }, (_, i) => {
    const row = new Array(n).fill(0);
    row[i] = 1;
    return row;
  });
}

export async function matrixExponentiation(args: Record<string, unknown>) {
  const matrix = args.matrix as number[][];
  const power = args.power as number;
  const mod = args.mod as number | undefined;

  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("matrix must be a non-empty 2D array");
  }
  const n = matrix.length;
  if (n > 10) {
    throw new Error("matrix size must be at most 10x10");
  }
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== n) {
      throw new Error("matrix must be square");
    }
    for (const v of row) {
      if (typeof v !== "number" || !Number.isFinite(v)) {
        throw new Error("all elements must be finite numbers");
      }
    }
  }
  if (typeof power !== "number" || !Number.isInteger(power) || power < 0) {
    throw new Error("power must be a non-negative integer");
  }
  if (power > 1_000_000_000) {
    throw new Error("power must be at most 1,000,000,000");
  }
  if (mod !== undefined) {
    if (typeof mod !== "number" || !Number.isInteger(mod) || mod < 1) {
      throw new Error("mod must be a positive integer");
    }
  }

  let result = identityMatrix(n);
  let base = matrix.map((row) => [...row]);
  let p = power;
  let multiplications = 0;

  while (p > 0) {
    if (p & 1) {
      result = multiplyMatrices(result, base, mod);
      multiplications++;
    }
    base = multiplyMatrices(base, base, mod);
    multiplications++;
    p >>= 1;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use matrix exponentiation for fast linear recurrence computation"],
  };

  return stampMeta(
    {
      result: result,
      size: n,
      power,
      modulus: mod ?? null,
      multiplications,
    },
    meta,
  );
}

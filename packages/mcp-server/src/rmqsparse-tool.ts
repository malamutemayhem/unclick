import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Build a sparse table for range minimum/maximum queries
 * and answer multiple queries in O(1) each after O(n log n) preprocessing.
 */
export async function rmqSparse(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 100_000) {
    throw new Error("values length must be at most 100000");
  }
  if (!values.every((v) => typeof v === "number" && Number.isFinite(v))) {
    throw new Error("all values must be finite numbers");
  }

  const queries = args.queries as number[][];
  if (!Array.isArray(queries) || queries.length === 0) {
    throw new Error("queries must be a non-empty array of [left, right] pairs");
  }
  if (queries.length > 100_000) {
    throw new Error("queries length must be at most 100000");
  }

  const mode = typeof args.mode === "string" ? args.mode : "min";
  if (mode !== "min" && mode !== "max") {
    throw new Error('mode must be "min" or "max"');
  }

  const n = values.length;
  const LOG = Math.floor(Math.log2(n)) + 1;

  // sparse[k][i] stores the index of the min/max in values[i..i+2^k-1]
  const sparse: number[][] = [];
  sparse[0] = Array.from({ length: n }, (_, i) => i);

  const better = (a: number, b: number): number => {
    if (mode === "min") {
      return values[a] <= values[b] ? a : b;
    }
    return values[a] >= values[b] ? a : b;
  };

  for (let k = 1; k < LOG; k++) {
    sparse[k] = [];
    const half = 1 << (k - 1);
    for (let i = 0; i + (1 << k) - 1 < n; i++) {
      sparse[k][i] = better(sparse[k - 1][i], sparse[k - 1][i + half]);
    }
  }

  // Answer each query
  const results: { left: number; right: number; value: number; index: number }[] = [];
  for (const q of queries) {
    if (!Array.isArray(q) || q.length !== 2) {
      throw new Error("each query must be a [left, right] pair");
    }
    const [left, right] = q;
    if (
      !Number.isInteger(left) ||
      !Number.isInteger(right) ||
      left < 0 ||
      right >= n ||
      left > right
    ) {
      throw new Error(
        `query [${left}, ${right}] is out of bounds (0..${n - 1}) or left > right`,
      );
    }
    const len = right - left + 1;
    const k = Math.floor(Math.log2(len));
    const idx = better(sparse[k][left], sparse[k][right - (1 << k) + 1]);
    results.push({ left, right, value: values[idx], index: idx });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Each query answered in O(1) after O(n log n) build",
      "Suitable for static arrays; for updates consider segment trees",
    ],
  };

  return stampMeta(
    {
      values_count: n,
      query_count: queries.length,
      mode,
      results,
    },
    meta,
  );
}

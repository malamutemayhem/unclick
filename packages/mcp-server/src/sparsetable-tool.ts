import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function sparseTable(args: Record<string, unknown>) {
  const arr = args.array as number[];
  const queries = (args.queries ?? []) as [number, number][];
  const mode = String(args.mode ?? "min");

  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("array must be a non-empty array of numbers");
  }
  if (arr.length > 100_000) {
    throw new Error("array length must be at most 100,000");
  }
  if (mode !== "min" && mode !== "max") {
    throw new Error("mode must be 'min' or 'max'");
  }

  const n = arr.length;
  const LOG = Math.max(1, Math.floor(Math.log2(n)) + 1);
  const table: number[][] = Array.from({ length: LOG }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    table[0][i] = arr[i];
  }

  const cmp = mode === "min"
    ? (a: number, b: number) => (a <= b ? a : b)
    : (a: number, b: number) => (a >= b ? a : b);

  for (let j = 1; j < LOG; j++) {
    for (let i = 0; i + (1 << j) - 1 < n; i++) {
      table[j][i] = cmp(table[j - 1][i], table[j - 1][i + (1 << (j - 1))]);
    }
  }

  const results: { l: number; r: number; result: number }[] = [];
  for (const [l, r] of queries) {
    if (l < 0 || r >= n || l > r) {
      throw new Error(`query [${l},${r}] is out of range`);
    }
    const k = Math.floor(Math.log2(r - l + 1));
    const val = cmp(table[k][l], table[k][r - (1 << k) + 1]);
    results.push({ l, r, result: val });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use sparse table for O(1) range minimum/maximum queries after O(n log n) build"],
  };

  return stampMeta(
    {
      array_length: n,
      log_levels: LOG,
      mode,
      query_results: results,
      table_size: LOG * n,
    },
    meta,
  );
}

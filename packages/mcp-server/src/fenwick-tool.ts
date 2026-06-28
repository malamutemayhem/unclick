import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface FenwickOp {
  type: "update" | "query" | "point_query";
  index?: number;
  delta?: number;
  left?: number;
  right?: number;
}

export async function fenwickTree(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 100_000) {
    throw new Error("values must have at most 100,000 elements");
  }

  const n = values.length;
  const tree = new Array(n + 1).fill(0);
  const arr = values.slice();

  function update(i: number, delta: number) {
    for (let x = i + 1; x <= n; x += x & (-x)) {
      tree[x] += delta;
    }
  }

  function prefixSum(i: number): number {
    let s = 0;
    for (let x = i + 1; x > 0; x -= x & (-x)) {
      s += tree[x];
    }
    return s;
  }

  function rangeSum(l: number, r: number): number {
    return l === 0 ? prefixSum(r) : prefixSum(r) - prefixSum(l - 1);
  }

  for (let i = 0; i < n; i++) {
    update(i, values[i]);
  }

  const ops = (args.operations as FenwickOp[]) ?? [];
  const results: Record<string, unknown>[] = [];

  for (const op of ops) {
    if (op.type === "update") {
      const idx = Number(op.index);
      const delta = Number(op.delta);
      if (idx < 0 || idx >= n) throw new Error(`index ${idx} out of range`);
      arr[idx] += delta;
      update(idx, delta);
      results.push({ op: "update", index: idx, delta, new_value: arr[idx] });
    } else if (op.type === "query") {
      const l = Number(op.left ?? 0);
      const r = Number(op.right ?? n - 1);
      if (l < 0 || r >= n || l > r) throw new Error(`range [${l},${r}] invalid`);
      results.push({ op: "query", left: l, right: r, sum: rangeSum(l, r) });
    } else if (op.type === "point_query") {
      const idx = Number(op.index);
      if (idx < 0 || idx >= n) throw new Error(`index ${idx} out of range`);
      results.push({ op: "point_query", index: idx, value: arr[idx] });
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Fenwick tree for efficient range queries and updates"],
  };

  return stampMeta(
    {
      size: n,
      initial_total: values.reduce((a, b) => a + b, 0),
      operation_results: results,
    },
    meta,
  );
}

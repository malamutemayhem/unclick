import { stampMeta, ConnectorMeta } from "./connector-meta.js";

type Op = "sum" | "min" | "max";

interface SegTreeOp {
  type: "update" | "query";
  index?: number;
  value?: number;
  left?: number;
  right?: number;
}

export async function segTree(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 100_000) {
    throw new Error("values must have at most 100,000 elements");
  }

  const op = (String(args.operation ?? "sum")) as Op;
  if (!["sum", "min", "max"].includes(op)) {
    throw new Error("operation must be sum, min, or max");
  }

  const n = values.length;
  const arr = values.slice();
  const tree = new Array(4 * n).fill(0);

  const identity = op === "sum" ? 0 : op === "min" ? Infinity : -Infinity;

  function combine(a: number, b: number): number {
    if (op === "sum") return a + b;
    if (op === "min") return Math.min(a, b);
    return Math.max(a, b);
  }

  function build(node: number, start: number, end: number) {
    if (start === end) {
      tree[node] = arr[start];
      return;
    }
    const mid = (start + end) >> 1;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = combine(tree[2 * node], tree[2 * node + 1]);
  }

  function update(node: number, start: number, end: number, idx: number, val: number) {
    if (start === end) {
      arr[idx] = val;
      tree[node] = val;
      return;
    }
    const mid = (start + end) >> 1;
    if (idx <= mid) update(2 * node, start, mid, idx, val);
    else update(2 * node + 1, mid + 1, end, idx, val);
    tree[node] = combine(tree[2 * node], tree[2 * node + 1]);
  }

  function query(node: number, start: number, end: number, l: number, r: number): number {
    if (r < start || end < l) return identity;
    if (l <= start && end <= r) return tree[node];
    const mid = (start + end) >> 1;
    return combine(
      query(2 * node, start, mid, l, r),
      query(2 * node + 1, mid + 1, end, l, r),
    );
  }

  build(1, 0, n - 1);

  const ops = (args.operations as SegTreeOp[]) ?? [];
  const results: Record<string, unknown>[] = [];

  for (const o of ops) {
    if (o.type === "update") {
      const idx = Number(o.index);
      const val = Number(o.value);
      if (idx < 0 || idx >= n) throw new Error(`index ${idx} out of range`);
      update(1, 0, n - 1, idx, val);
      results.push({ op: "update", index: idx, value: val });
    } else if (o.type === "query") {
      const l = Number(o.left ?? 0);
      const r = Number(o.right ?? n - 1);
      if (l < 0 || r >= n || l > r) throw new Error(`range [${l},${r}] invalid`);
      results.push({ op: "query", left: l, right: r, result: query(1, 0, n - 1, l, r) });
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use segment tree for efficient range queries on mutable arrays"],
  };

  return stampMeta(
    {
      size: n,
      operation: op,
      full_result: query(1, 0, n - 1, 0, n - 1),
      operation_results: results,
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Node {
  value: number;
  left: number;
  right: number;
}

export async function persistentArray(args: Record<string, unknown>) {
  const initial = args.initial as number[];
  const operations = args.operations as Array<{ type: string; version: number; index?: number; value?: number }>;

  if (!Array.isArray(initial) || initial.length === 0) {
    throw new Error("initial must be a non-empty array of numbers");
  }
  if (initial.length > 100_000) {
    throw new Error("initial array length must be at most 100,000");
  }
  for (const v of initial) {
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new Error("all initial values must be finite numbers");
    }
  }
  if (!Array.isArray(operations)) {
    throw new Error("operations must be an array");
  }
  if (operations.length > 100_000) {
    throw new Error("at most 100,000 operations supported");
  }

  const n = initial.length;
  const nodes: Node[] = [];

  function newNode(val: number, l: number, r: number): number {
    nodes.push({ value: val, left: l, right: r });
    return nodes.length - 1;
  }

  function build(l: number, r: number): number {
    if (l === r) return newNode(initial[l], -1, -1);
    const mid = (l + r) >> 1;
    const left = build(l, mid);
    const right = build(mid + 1, r);
    return newNode(0, left, right);
  }

  function update(prev: number, l: number, r: number, idx: number, val: number): number {
    if (l === r) return newNode(val, -1, -1);
    const mid = (l + r) >> 1;
    if (idx <= mid) {
      return newNode(0, update(nodes[prev].left, l, mid, idx, val), nodes[prev].right);
    }
    return newNode(0, nodes[prev].left, update(nodes[prev].right, mid + 1, r, idx, val));
  }

  function query(root: number, l: number, r: number, idx: number): number {
    if (l === r) return nodes[root].value;
    const mid = (l + r) >> 1;
    if (idx <= mid) return query(nodes[root].left, l, mid, idx);
    return query(nodes[root].right, mid + 1, r, idx);
  }

  const roots: number[] = [build(0, n - 1)];
  const results: Array<{ type: string; version: number; index?: number; value?: number; result?: number; new_version?: number }> = [];

  for (const op of operations) {
    if (op.type === "get") {
      if (typeof op.index !== "number" || op.index < 0 || op.index >= n) {
        throw new Error("index out of range");
      }
      if (op.version < 0 || op.version >= roots.length) {
        throw new Error("version out of range");
      }
      const val = query(roots[op.version], 0, n - 1, op.index);
      results.push({ type: "get", version: op.version, index: op.index, result: val });
    } else if (op.type === "set") {
      if (typeof op.index !== "number" || op.index < 0 || op.index >= n) {
        throw new Error("index out of range");
      }
      if (typeof op.value !== "number") throw new Error("value must be a number");
      if (op.version < 0 || op.version >= roots.length) {
        throw new Error("version out of range");
      }
      const newRoot = update(roots[op.version], 0, n - 1, op.index, op.value);
      roots.push(newRoot);
      results.push({ type: "set", version: op.version, index: op.index, value: op.value, new_version: roots.length - 1 });
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use persistent array for version-controlled data with efficient rollback"],
  };

  return stampMeta(
    {
      array_length: n,
      version_count: roots.length,
      node_count: nodes.length,
      results,
    },
    meta,
  );
}

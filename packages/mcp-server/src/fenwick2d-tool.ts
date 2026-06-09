import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Fenwick2DOp {
  type: "update" | "query";
  row: number;
  col: number;
  row2?: number;
  col2?: number;
  value?: number;
}

/**
 * 2D Fenwick tree (Binary Indexed Tree) supporting point updates
 * and rectangle prefix-sum queries.
 */
export async function fenwick2D(args: Record<string, unknown>) {
  const rows = args.rows;
  const cols = args.cols;
  if (typeof rows !== "number" || !Number.isInteger(rows) || rows < 1) {
    throw new Error("rows must be a positive integer.");
  }
  if (typeof cols !== "number" || !Number.isInteger(cols) || cols < 1) {
    throw new Error("cols must be a positive integer.");
  }
  if (rows > 500 || cols > 500) {
    throw new Error("Maximum grid size is 500x500.");
  }

  const operations = args.operations;
  if (!Array.isArray(operations)) {
    throw new Error("operations must be an array.");
  }
  if (operations.length > 100_000) {
    throw new Error("At most 100,000 operations are allowed.");
  }

  const m = rows;
  const n = cols;

  // tree is 1-indexed: tree[1..m][1..n]
  const tree: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  function update(r: number, c: number, delta: number) {
    for (let i = r + 1; i <= m; i += i & -i) {
      for (let j = c + 1; j <= n; j += j & -j) {
        tree[i][j] += delta;
      }
    }
  }

  function prefixSum(r: number, c: number): number {
    let s = 0;
    for (let i = r + 1; i > 0; i -= i & -i) {
      for (let j = c + 1; j > 0; j -= j & -j) {
        s += tree[i][j];
      }
    }
    return s;
  }

  function rectSum(r1: number, c1: number, r2: number, c2: number): number {
    let s = prefixSum(r2, c2);
    if (r1 > 0) s -= prefixSum(r1 - 1, c2);
    if (c1 > 0) s -= prefixSum(r2, c1 - 1);
    if (r1 > 0 && c1 > 0) s += prefixSum(r1 - 1, c1 - 1);
    return s;
  }

  const results: (number | null)[] = [];

  for (const op of operations as Fenwick2DOp[]) {
    if (op.type === "update") {
      const r = Number(op.row);
      const c = Number(op.col);
      const v = Number(op.value ?? 0);
      if (r < 0 || r >= m) throw new Error(`row ${r} out of range [0, ${m - 1}].`);
      if (c < 0 || c >= n) throw new Error(`col ${c} out of range [0, ${n - 1}].`);
      update(r, c, v);
      results.push(null);
    } else if (op.type === "query") {
      const r1 = Number(op.row);
      const c1 = Number(op.col);
      const r2 = op.row2 !== undefined ? Number(op.row2) : r1;
      const c2 = op.col2 !== undefined ? Number(op.col2) : c1;
      if (r1 < 0 || r2 >= m || r1 > r2) {
        throw new Error(`row range [${r1}, ${r2}] is invalid for grid with ${m} rows.`);
      }
      if (c1 < 0 || c2 >= n || c1 > c2) {
        throw new Error(`col range [${c1}, ${c2}] is invalid for grid with ${n} cols.`);
      }
      results.push(rectSum(r1, c1, r2, c2));
    } else {
      throw new Error(`Unknown operation type: ${(op as any).type}`);
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use 2D Fenwick trees for efficient cumulative frequency tables",
      "Point update and rectangle sum query both run in O(log(rows) * log(cols))",
    ],
  };

  return stampMeta(
    {
      rows: m,
      cols: n,
      operations_count: operations.length,
      results,
    },
    meta,
  );
}

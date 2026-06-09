import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Fenwick tree with range update and range query support.
 *
 * Uses two BITs (B1 and B2) so that:
 *   range_add(l, r, v) adds v to all elements in [l, r]
 *   range_sum(l, r) returns the sum of elements in [l, r]
 *
 * The identity used:
 *   prefix_sum(x) = B1[x] * x - B2[x]
 *   range_add(l, r, v):
 *     B1: add v at l, add -v at r+1
 *     B2: add v*(l-1) at l, add -v*r at r+1
 */

function makeBIT(size: number): number[] {
  return new Array(size + 1).fill(0);
}

function bitUpdate(bit: number[], i: number, delta: number): void {
  for (; i < bit.length; i += i & -i) {
    bit[i] += delta;
  }
}

function bitQuery(bit: number[], i: number): number {
  let s = 0;
  for (; i > 0; i -= i & -i) {
    s += bit[i];
  }
  return s;
}

function rangeAdd(
  b1: number[],
  b2: number[],
  l: number,
  r: number,
  v: number,
): void {
  bitUpdate(b1, l, v);
  bitUpdate(b1, r + 1, -v);
  bitUpdate(b2, l, v * (l - 1));
  bitUpdate(b2, r + 1, -v * r);
}

function prefixSum(b1: number[], b2: number[], x: number): number {
  return bitQuery(b1, x) * x - bitQuery(b2, x);
}

function rangeSum(
  b1: number[],
  b2: number[],
  l: number,
  r: number,
): number {
  return prefixSum(b1, b2, r) - prefixSum(b1, b2, l - 1);
}

interface FenwickOp {
  type: "update" | "query";
  left: number;
  right: number;
  value?: number;
}

export async function fenwickRange(args: Record<string, unknown>) {
  const values = args.values as number[];
  const operations = args.operations as FenwickOp[];

  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 100_000) {
    throw new Error("values array must not exceed 100,000 elements");
  }
  if (!Array.isArray(operations)) {
    throw new Error("operations must be an array");
  }
  if (operations.length > 100_000) {
    throw new Error("operations must not exceed 100,000 entries");
  }

  const n = values.length;

  // Build the two BITs from initial values
  // We treat initial values as range updates of a single element each
  const b1 = makeBIT(n);
  const b2 = makeBIT(n);

  // Initialize by adding each value[i] at position i+1 (1-indexed)
  for (let i = 0; i < n; i++) {
    const pos = i + 1;
    rangeAdd(b1, b2, pos, pos, values[i]);
  }

  // Track a working copy for final_values reconstruction
  const working = values.slice();

  const results: (number | null)[] = [];

  for (const op of operations) {
    const l = op.left;
    const r = op.right;

    if (!Number.isInteger(l) || !Number.isInteger(r) || l < 0 || r < 0 || l >= n || r >= n || l > r) {
      throw new Error(
        `Invalid range [${l}, ${r}]: must be 0-indexed integers within [0, ${n - 1}] with left <= right`,
      );
    }

    // Convert to 1-indexed for the BIT
    const l1 = l + 1;
    const r1 = r + 1;

    if (op.type === "update") {
      const v = op.value as number;
      if (typeof v !== "number") {
        throw new Error("update operations require a numeric value");
      }
      rangeAdd(b1, b2, l1, r1, v);
      for (let i = l; i <= r; i++) {
        working[i] += v;
      }
      results.push(null);
    } else if (op.type === "query") {
      const sum = rangeSum(b1, b2, l1, r1);
      results.push(sum);
    } else {
      throw new Error(`Unknown operation type: ${op.type}`);
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Indices are 0-based in input and output",
      "Use for problems requiring both range updates and range queries in O(log n)",
    ],
  };

  return stampMeta(
    {
      initial_size: n,
      operations_count: operations.length,
      results,
      final_values: working,
    },
    meta,
  );
}

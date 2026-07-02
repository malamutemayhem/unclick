import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function waveletTree(args: Record<string, unknown>) {
  const arr = args.array as number[];
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("array must be a non-empty array of integers");
  }
  if (arr.length > 100_000) {
    throw new Error("array length must be at most 100,000");
  }
  for (const v of arr) {
    if (typeof v !== "number" || !Number.isInteger(v)) {
      throw new Error("all elements must be integers");
    }
  }

  const queries = args.queries as Array<{ type: string; l: number; r: number; k?: number }> | undefined;

  const sorted = [...new Set(arr)].sort((a, b) => a - b);
  const rank = new Map<number, number>();
  sorted.forEach((v, i) => rank.set(v, i));
  const sigma = sorted.length;
  const n = arr.length;
  const ranked = arr.map((v) => rank.get(v)!);

  const nodeCount = 4 * sigma;
  const leftCount: number[][] = Array.from({ length: nodeCount }, () => []);

  function build(node: number, lo: number, hi: number, indices: number[]): void {
    if (lo >= hi || indices.length === 0) return;
    const mid = (lo + hi) >> 1;
    const goLeft: number[] = [];
    const goRight: number[] = [];
    let cnt = 0;
    leftCount[node] = [0];
    for (const idx of indices) {
      if (ranked[idx] <= mid) {
        cnt++;
        goLeft.push(idx);
      } else {
        goRight.push(idx);
      }
      leftCount[node].push(cnt);
    }
    build(2 * node, lo, mid, goLeft);
    build(2 * node + 1, mid + 1, hi, goRight);
  }

  const allIndices = Array.from({ length: n }, (_, i) => i);
  build(1, 0, sigma - 1, allIndices);

  function kthSmallest(node: number, lo: number, hi: number, ql: number, qr: number, k: number): number {
    if (lo === hi) return sorted[lo];
    const mid = (lo + hi) >> 1;
    const lc = leftCount[node];
    const leftBefore = lc[ql];
    const leftIn = lc[qr] - lc[ql];
    if (k <= leftIn) {
      return kthSmallest(2 * node, lo, mid, leftBefore, leftBefore + leftIn, k);
    }
    const rightBefore = ql - leftBefore;
    const rightIn = (qr - ql) - leftIn;
    return kthSmallest(2 * node + 1, mid + 1, hi, rightBefore, rightBefore + rightIn, k - leftIn);
  }

  const results: Array<{ type: string; l: number; r: number; k?: number; result: number }> = [];
  if (queries && Array.isArray(queries)) {
    if (queries.length > 10_000) throw new Error("at most 10,000 queries");
    for (const q of queries) {
      if (q.type === "kth" && typeof q.k === "number") {
        if (q.l < 0 || q.r > n || q.l >= q.r) throw new Error("invalid query range");
        if (q.k < 1 || q.k > q.r - q.l) throw new Error("k out of range");
        const val = kthSmallest(1, 0, sigma - 1, q.l, q.r, q.k);
        results.push({ type: "kth", l: q.l, r: q.r, k: q.k, result: val });
      }
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use wavelet tree for range kth-smallest and range frequency queries"],
  };

  return stampMeta(
    {
      array_length: n,
      alphabet_size: sigma,
      query_results: results,
    },
    meta,
  );
}

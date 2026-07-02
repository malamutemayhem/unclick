import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function mosAlgorithm(args: Record<string, unknown>) {
  const arr = args.array as number[];
  const queries = args.queries as number[][];

  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("array must be a non-empty array of numbers");
  }
  if (arr.length > 100_000) {
    throw new Error("array length must be at most 100,000");
  }
  for (const v of arr) {
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new Error("all array values must be finite numbers");
    }
  }
  if (!Array.isArray(queries) || queries.length === 0) {
    throw new Error("queries must be a non-empty array of [l, r] pairs");
  }
  if (queries.length > 100_000) {
    throw new Error("at most 100,000 queries supported");
  }

  const n = arr.length;
  const q = queries.length;
  const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));

  const indexed = queries.map((qr, i) => ({
    l: qr[0],
    r: qr[1],
    idx: i,
  }));

  for (const qr of indexed) {
    if (qr.l < 0 || qr.r >= n || qr.l > qr.r) {
      throw new Error(`query [${qr.l}, ${qr.r}] out of range`);
    }
  }

  indexed.sort((a, b) => {
    const ba = Math.floor(a.l / blockSize);
    const bb = Math.floor(b.l / blockSize);
    if (ba !== bb) return ba - bb;
    return (ba & 1) ? b.r - a.r : a.r - b.r;
  });

  const freq = new Map<number, number>();
  let distinctCount = 0;
  let curSum = 0;
  let curL = 0;
  let curR = -1;

  function add(idx: number): void {
    const val = arr[idx];
    const cnt = freq.get(val) || 0;
    if (cnt === 0) distinctCount++;
    freq.set(val, cnt + 1);
    curSum += val;
  }

  function remove(idx: number): void {
    const val = arr[idx];
    const cnt = freq.get(val)!;
    if (cnt === 1) {
      distinctCount--;
      freq.delete(val);
    } else {
      freq.set(val, cnt - 1);
    }
    curSum -= val;
  }

  const results: Array<{
    l: number;
    r: number;
    sum: number;
    distinct: number;
  }> = new Array(q);

  for (const qr of indexed) {
    while (curR < qr.r) add(++curR);
    while (curL > qr.l) add(--curL);
    while (curR > qr.r) remove(curR--);
    while (curL < qr.l) remove(curL++);
    results[qr.idx] = {
      l: qr.l,
      r: qr.r,
      sum: curSum,
      distinct: distinctCount,
    };
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Mo's algorithm for offline range queries with sqrt decomposition"],
  };

  return stampMeta(
    {
      array_length: n,
      query_count: q,
      block_size: blockSize,
      results,
    },
    meta,
  );
}

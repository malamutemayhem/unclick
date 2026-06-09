import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function longestIncreasingSubseq(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 100_000) {
    throw new Error("values must have at most 100,000 elements");
  }

  const n = values.length;
  const tails: number[] = [];
  const tailIndices: number[] = [];
  const prev: number[] = new Array(n).fill(-1);
  const positions: number[] = [];

  for (let i = 0; i < n; i++) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < values[i]) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = values[i];
    tailIndices[lo] = i;
    positions[i] = lo;
    prev[i] = lo > 0 ? tailIndices[lo - 1] : -1;
  }

  const lisLength = tails.length;
  const lis: number[] = new Array(lisLength);
  let k = tailIndices[lisLength - 1];
  for (let i = lisLength - 1; i >= 0; i--) {
    lis[i] = values[k];
    k = prev[k];
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use LIS for sequence analysis or patience sorting"],
  };

  return stampMeta(
    {
      input_length: n,
      lis_length: lisLength,
      subsequence: lis,
    },
    meta,
  );
}

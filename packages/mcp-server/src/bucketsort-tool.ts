import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function bucketSort(args: Record<string, unknown>) {
  const arr = args.array as number[];
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("array must be a non-empty array of numbers");
  }
  if (arr.length > 100_000) {
    throw new Error("array length must be at most 100,000");
  }
  for (const v of arr) {
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new Error("all elements must be finite numbers");
    }
  }

  const bucketCount = Number(args.bucket_count ?? Math.max(1, Math.floor(Math.sqrt(arr.length))));
  if (!Number.isInteger(bucketCount) || bucketCount < 1) {
    throw new Error("bucket_count must be a positive integer");
  }

  const min = Math.min(...arr.slice(0, 10000));
  const max = Math.max(...arr.slice(0, 10000));
  let globalMin = min;
  let globalMax = max;
  for (let i = 10000; i < arr.length; i += 10000) {
    const chunk = arr.slice(i, i + 10000);
    globalMin = Math.min(globalMin, ...chunk);
    globalMax = Math.max(globalMax, ...chunk);
  }

  const range = globalMax - globalMin;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  if (range === 0) {
    buckets[0] = [...arr];
  } else {
    for (const v of arr) {
      const idx = Math.min(Math.floor(((v - globalMin) / range) * bucketCount), bucketCount - 1);
      buckets[idx].push(v);
    }
  }

  for (const b of buckets) {
    b.sort((a, c) => a - c);
  }

  const sorted: number[] = [];
  const bucketSizes: number[] = [];
  for (const b of buckets) {
    bucketSizes.push(b.length);
    for (const v of b) sorted.push(v);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use bucket sort for uniformly distributed data"],
  };

  return stampMeta(
    {
      sorted,
      element_count: arr.length,
      bucket_count: bucketCount,
      bucket_sizes: bucketSizes,
      min: globalMin,
      max: globalMax,
    },
    meta,
  );
}

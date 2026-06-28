import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function radixSort(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of non-negative integers");
  }
  if (values.length > 1_000_000) {
    throw new Error("values must have at most 1,000,000 elements");
  }
  for (const v of values) {
    if (!Number.isInteger(v) || v < 0) {
      throw new Error("all values must be non-negative integers");
    }
  }

  const base = Number(args.base ?? 10);
  if (base < 2 || base > 256) throw new Error("base must be between 2 and 256");

  let arr = values.slice();
  const maxVal = Math.max(...arr);
  let passes = 0;

  for (let exp = 1; exp <= maxVal; exp *= base) {
    const buckets: number[][] = Array.from({ length: base }, () => []);
    for (const v of arr) {
      const digit = Math.floor(v / exp) % base;
      buckets[digit].push(v);
    }
    arr = buckets.flat();
    passes++;
  }

  if (maxVal === 0) passes = 1;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use radix sort for non-negative integer arrays"],
  };

  return stampMeta(
    {
      input_length: values.length,
      base,
      passes,
      max_value: maxVal,
      sorted: arr.length <= 1000 ? arr : arr.slice(0, 1000),
      truncated: arr.length > 1000,
    },
    meta,
  );
}

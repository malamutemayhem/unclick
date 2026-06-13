import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function shellSort(args: Record<string, unknown>) {
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

  const a = [...arr];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  const gaps: number[] = [];
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    gaps.push(gap);
    for (let i = gap; i < n; i++) {
      const temp = a[i];
      let j = i;
      comparisons++;
      while (j >= gap && a[j - gap] > temp) {
        a[j] = a[j - gap];
        j -= gap;
        swaps++;
        comparisons++;
      }
      a[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Shell sort for medium-sized arrays where simplicity matters"],
  };

  return stampMeta(
    {
      sorted: a,
      element_count: n,
      gap_sequence: gaps,
      comparisons,
      swaps,
    },
    meta,
  );
}

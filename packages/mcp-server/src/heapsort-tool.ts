import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function heapSort(args: Record<string, unknown>) {
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
  let swaps = 0;

  function heapify(size: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      swaps++;
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    swaps++;
    heapify(i, 0);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use heap sort for guaranteed O(n log n) in-place sorting"],
  };

  return stampMeta(
    {
      sorted: a,
      element_count: n,
      swaps,
      min: a[0],
      max: a[n - 1],
    },
    meta,
  );
}

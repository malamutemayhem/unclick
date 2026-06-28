import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function countingSort(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of integers");
  }
  if (values.length > 1_000_000) {
    throw new Error("values must have at most 1,000,000 elements");
  }
  for (const v of values) {
    if (!Number.isInteger(v)) throw new Error("all values must be integers");
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min + 1;

  if (range > 10_000_000) {
    throw new Error("value range must be <= 10,000,000");
  }

  const count = new Array(range).fill(0);
  for (const v of values) count[v - min]++;

  const sorted: number[] = [];
  const frequency: { value: number; count: number }[] = [];
  for (let i = 0; i < range; i++) {
    if (count[i] > 0) {
      frequency.push({ value: i + min, count: count[i] });
      for (let j = 0; j < count[i]; j++) sorted.push(i + min);
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use counting sort for integer arrays with bounded range"],
  };

  return stampMeta(
    {
      input_length: values.length,
      min,
      max,
      range,
      unique_values: frequency.length,
      sorted: sorted.length <= 1000 ? sorted : sorted.slice(0, 1000),
      truncated: sorted.length > 1000,
      frequency: frequency.slice(0, 200),
    },
    meta,
  );
}

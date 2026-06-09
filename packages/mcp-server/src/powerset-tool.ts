import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function powerSet(args: Record<string, unknown>) {
  const elements = args.elements;
  if (!Array.isArray(elements)) {
    throw new Error("elements must be an array.");
  }
  if (elements.length > 20) {
    throw new Error("elements must have 20 or fewer items (2^20 = 1048576 subsets).");
  }

  const n = elements.length;
  const subsetCount = 1 << n; // 2^n
  const subsets: unknown[][] = [];

  for (let mask = 0; mask < subsetCount; mask++) {
    const subset: unknown[] = [];
    for (let bit = 0; bit < n; bit++) {
      if (mask & (1 << bit)) {
        subset.push(elements[bit]);
      }
    }
    subsets.push(subset);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Filter subsets by size to get k-combinations",
      "Use combination_calc for counting without enumeration",
    ],
  };

  return stampMeta(
    {
      elements,
      subsets,
      subset_count: subsetCount,
      element_count: n,
    },
    meta,
  );
}

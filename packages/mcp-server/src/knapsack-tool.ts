import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function knapsackSolve(args: Record<string, unknown>) {
  const capacity = Number(args.capacity);
  if (!Number.isFinite(capacity) || capacity <= 0) {
    throw new Error("capacity must be a positive number.");
  }

  const items = args.items as { name?: string; weight: number; value: number }[];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("items must be a non-empty array of { weight, value } objects.");
  }
  if (items.length > 500) {
    throw new Error("Maximum 500 items supported.");
  }

  const n = items.length;
  const cap = Math.floor(capacity);

  if (cap > 100000) {
    throw new Error("capacity must be 100000 or less (integer units).");
  }

  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(cap + 1).fill(0),
  );

  for (let i = 1; i <= n; i++) {
    const w = Math.floor(Number(items[i - 1].weight));
    const v = Number(items[i - 1].value);
    for (let j = 0; j <= cap; j++) {
      dp[i][j] = dp[i - 1][j];
      if (w <= j && dp[i - 1][j - w] + v > dp[i][j]) {
        dp[i][j] = dp[i - 1][j - w] + v;
      }
    }
  }

  const selected: number[] = [];
  let w = cap;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.unshift(i - 1);
      w -= Math.floor(Number(items[i - 1].weight));
    }
  }

  const totalWeight = selected.reduce(
    (s, idx) => s + Number(items[idx].weight),
    0,
  );

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Adjust capacity or item weights to explore alternatives"],
  };
  return stampMeta(
    {
      max_value: dp[n][cap],
      total_weight: totalWeight,
      capacity,
      selected_indices: selected,
      selected_items: selected.map((idx) => ({
        index: idx,
        name: items[idx].name ?? `item_${idx}`,
        weight: Number(items[idx].weight),
        value: Number(items[idx].value),
      })),
      item_count: n,
      selected_count: selected.length,
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function josephus(args: Record<string, unknown>) {
  const n = args.n as number;
  const k = args.k as number;

  if (!Number.isInteger(n) || n < 1 || n > 1_000_000) {
    throw new Error("n must be a positive integer (max 1,000,000)");
  }
  if (!Number.isInteger(k) || k < 1) {
    throw new Error("k must be a positive integer");
  }

  let survivor = 0;
  for (let i = 2; i <= n; i++) {
    survivor = (survivor + k) % i;
  }

  const elimination: number[] = [];
  if (n <= 10_000) {
    const alive: number[] = [];
    for (let i = 0; i < n; i++) alive.push(i);
    let idx = 0;
    while (alive.length > 0) {
      idx = (idx + k - 1) % alive.length;
      elimination.push(alive[idx]);
      alive.splice(idx, 1);
      if (idx >= alive.length) idx = 0;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Positions are 0-indexed; add 1 for 1-indexed result",
      "Useful for circular elimination puzzles and competitive programming",
    ],
  };

  return stampMeta(
    {
      n,
      k,
      survivor_0indexed: survivor,
      survivor_1indexed: survivor + 1,
      ...(elimination.length > 0 ? { elimination_order_0indexed: elimination } : {}),
    },
    meta,
  );
}

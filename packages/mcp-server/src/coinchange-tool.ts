import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function coinChange(args: Record<string, unknown>) {
  const coins = args.coins;
  if (!Array.isArray(coins) || coins.length === 0) {
    throw new Error("coins must be a non-empty array of positive integers.");
  }
  for (const c of coins) {
    if (typeof c !== "number" || !Number.isInteger(c) || c <= 0) {
      throw new Error("Each coin denomination must be a positive integer.");
    }
  }

  const amount = Number(args.amount);
  if (!Number.isFinite(amount) || !Number.isInteger(amount) || amount < 0) {
    throw new Error("amount must be a non-negative integer.");
  }
  if (amount > 1_000_000) {
    throw new Error("amount must be 1000000 or less.");
  }

  const sortedCoins = [...coins].sort((a, b) => a - b) as number[];

  // DP for minimum coins
  const INF = amount + 1;
  const minDp = new Array<number>(amount + 1).fill(INF);
  const parent = new Array<number>(amount + 1).fill(-1);
  minDp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const c of sortedCoins) {
      if (c > i) break;
      if (minDp[i - c] + 1 < minDp[i]) {
        minDp[i] = minDp[i - c] + 1;
        parent[i] = c;
      }
    }
  }

  const minCoins = minDp[amount] >= INF ? -1 : minDp[amount];

  // Backtrace to find one optimal solution
  const usedCoins: number[] = [];
  if (minCoins !== -1) {
    let rem = amount;
    while (rem > 0) {
      usedCoins.push(parent[rem]);
      rem -= parent[rem];
    }
    usedCoins.sort((a, b) => a - b);
  }

  // DP for count of distinct combinations (order-independent)
  // Use coin-first loop to count combinations, not permutations
  const countDp = new Array<number>(amount + 1).fill(0);
  countDp[0] = 1;
  for (const c of sortedCoins) {
    for (let i = c; i <= amount; i++) {
      countDp[i] += countDp[i - c];
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Try different denominations to compare efficiency",
      "Use knapsack for weighted value optimization",
    ],
  };

  return stampMeta(
    {
      coins: sortedCoins,
      amount,
      min_coins: minCoins,
      combination_count: countDp[amount],
      used_coins: usedCoins,
    },
    meta,
  );
}

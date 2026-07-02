import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Integer partition counting.
 *
 * Counts the number of ways to write n as a sum of positive integers,
 * optionally restricting the maximum part size and/or exact number of parts.
 * Uses dynamic programming in O(n * min(n, max_part)) time.
 */
export async function partitionCount(args: Record<string, unknown>) {
  const n = args.n as number;
  if (!Number.isInteger(n) || n < 0 || n > 10_000) {
    throw new Error("n must be an integer in [0, 10000]");
  }

  if (n === 0) {
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "The empty partition is the unique partition of 0",
        "Restrict with max_part or num_parts for constrained partition problems",
      ],
    };
    return stampMeta({ n: 0, count: 1 }, meta);
  }

  const maxPart =
    args.max_part !== undefined ? (args.max_part as number) : n;
  if (!Number.isInteger(maxPart) || maxPart < 1) {
    throw new Error("max_part must be a positive integer");
  }

  const numParts =
    args.num_parts !== undefined ? (args.num_parts as number) : undefined;
  if (numParts !== undefined) {
    if (!Number.isInteger(numParts) || numParts < 0 || numParts > n) {
      throw new Error("num_parts must be an integer in [0, n]");
    }
  }

  let count: number;

  if (numParts !== undefined) {
    // dp[i][j] = partitions of i into j parts each in [1, maxPart]
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
      new Array<number>(numParts + 1).fill(0),
    );
    dp[0][0] = 1;
    for (let part = 1; part <= Math.min(maxPart, n); part++) {
      for (let i = part; i <= n; i++) {
        for (let j = 1; j <= numParts; j++) {
          dp[i][j] += dp[i - part][j - 1];
        }
      }
    }
    count = dp[n][numParts];
  } else {
    // Standard partition count with parts <= maxPart
    const dp = new Array<number>(n + 1).fill(0);
    dp[0] = 1;
    for (let part = 1; part <= Math.min(maxPart, n); part++) {
      for (let i = part; i <= n; i++) {
        dp[i] += dp[i - part];
      }
    }
    count = dp[n];
  }

  const result: Record<string, unknown> = {
    n,
    count,
  };
  if (args.max_part !== undefined) result.max_part = maxPart;
  if (numParts !== undefined) result.num_parts = numParts;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "The unrestricted partition function grows as exp(pi*sqrt(2n/3)) / (4n*sqrt(3))",
      "Restrict with max_part or num_parts for constrained partition problems",
    ],
  };

  return stampMeta(result, meta);
}

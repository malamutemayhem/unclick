import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Stirling numbers of the first kind s(n,k) and second kind S(n,k).
 *
 * First kind (unsigned): count permutations of n elements with exactly k cycles.
 * Recurrence: |s(n,k)| = (n-1)*|s(n-1,k)| + |s(n-1,k-1)|
 *
 * Second kind: count partitions of n elements into exactly k non-empty subsets.
 * Recurrence: S(n,k) = k*S(n-1,k) + S(n-1,k-1)
 */
export async function stirlingNumbers(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? args.n : null;
  const k = typeof args.k === "number" ? args.k : null;
  if (n === null || !Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer.");
  }
  if (k === null || !Number.isInteger(k) || k < 0) {
    throw new Error("k must be a non-negative integer.");
  }
  if (n > 200) throw new Error("n must be 200 or fewer to avoid overflow.");
  if (k > n) {
    // S(n,k) = 0 and s(n,k) = 0 when k > n
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Stirling numbers are 0 when k > n",
        "Try a value of k between 0 and n",
      ],
    };
    return stampMeta({ n, k, kind: (args.kind ?? 2) as number, value: 0 }, meta);
  }

  const kind = typeof args.kind === "number" ? args.kind : 2;
  if (kind !== 1 && kind !== 2) {
    throw new Error("kind must be 1 (first kind, unsigned) or 2 (second kind).");
  }

  // DP table: dp[i][j] for i in [0..n], j in [0..k]
  const dp: number[][] = [];
  for (let i = 0; i <= n; i++) {
    dp.push(new Array(k + 1).fill(0));
  }

  // Base case
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      if (kind === 1) {
        // Unsigned Stirling first kind: |s(i,j)| = (i-1)*|s(i-1,j)| + |s(i-1,j-1)|
        dp[i][j] = (i - 1) * dp[i - 1][j] + dp[i - 1][j - 1];
      } else {
        // Stirling second kind: S(i,j) = j*S(i-1,j) + S(i-1,j-1)
        dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1];
      }
    }
  }

  const value = dp[n][k];

  const description =
    kind === 1
      ? `Number of permutations of ${n} elements with exactly ${k} cycles (unsigned)`
      : `Number of partitions of ${n} elements into exactly ${k} non-empty subsets`;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use kind=1 for cycle-counting (unsigned Stirling first kind)",
      "Use kind=2 for set-partition counting (Stirling second kind)",
      "Bell numbers equal the sum of S(n,k) for k=0..n",
    ],
  };

  return stampMeta({ n, k, kind, value, description }, meta);
}

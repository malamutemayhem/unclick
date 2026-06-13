import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Count integers from 1 to n whose digit sum equals targetDigitSum.
 * Uses digit DP to handle n up to 10^15 efficiently.
 */
function countWithDigitSum(n: number, targetDigitSum: number): number {
  if (n <= 0) return 0;
  if (targetDigitSum < 0) return 0;

  const digits = String(n).split("").map(Number);
  const numDigits = digits.length;

  // dp[pos][sum][tight]
  // pos: current digit position (0..numDigits-1)
  // sum: current digit sum so far (0..targetDigitSum)
  // tight: 0 or 1 (whether we are still bounded by n's digits)
  // We use memoization via a map keyed by (pos, sum, tight).
  const memo = new Map<string, number>();

  function solve(pos: number, sum: number, tight: boolean, started: boolean): number {
    if (sum > targetDigitSum) return 0;
    if (pos === numDigits) {
      // We must have started (no leading zeros counted as a number)
      return started && sum === targetDigitSum ? 1 : 0;
    }

    const key = `${pos},${sum},${tight ? 1 : 0},${started ? 1 : 0}`;
    if (memo.has(key)) return memo.get(key)!;

    const limit = tight ? digits[pos] : 9;
    let result = 0;

    for (let d = 0; d <= limit; d++) {
      const newStarted = started || d > 0;
      const newSum = newStarted ? sum + d : 0;
      const newTight = tight && d === limit;
      result += solve(pos + 1, newSum, newTight, newStarted);
    }

    memo.set(key, result);
    return result;
  }

  return solve(0, 0, true, false);
}

export async function digitDp(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? args.n : null;
  const targetDigitSum = typeof args.target_digit_sum === "number" ? args.target_digit_sum : null;

  if (n === null || !Number.isInteger(n) || n < 1) {
    throw new Error("n must be a positive integer.");
  }
  if (n > 1e15) {
    throw new Error("n must be at most 1e15.");
  }
  if (targetDigitSum === null || !Number.isInteger(targetDigitSum) || targetDigitSum < 0 || targetDigitSum > 135) {
    throw new Error("target_digit_sum must be an integer between 0 and 135.");
  }

  const count = countWithDigitSum(n, targetDigitSum);
  const digitCount = String(n).length;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use descriptive tool for statistical analysis of digit distributions",
      "Digit DP scales to very large n without enumerating each integer",
    ],
  };

  return stampMeta(
    {
      n,
      target_digit_sum: targetDigitSum,
      count,
      digit_count: digitCount,
    },
    meta,
  );
}

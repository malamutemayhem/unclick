import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Duval's algorithm for Lyndon factorization.
 *
 * Decomposes a string into a sequence of Lyndon words w1, w2, ..., wk
 * such that w1 >= w2 >= ... >= wk (lexicographically non-increasing).
 * A Lyndon word is a string that is strictly smaller than all of its
 * proper suffixes.
 *
 * Runs in O(n) time and O(1) extra space (beyond storing factors).
 */
export async function duvalFactorize(args: Record<string, unknown>) {
  const text = args.text as string;

  if (typeof text !== "string" || text.length === 0) {
    throw new Error("text must be a non-empty string");
  }
  if (text.length > 1_000_000) {
    throw new Error("text must be at most 1,000,000 characters");
  }

  const factors: string[] = [];
  const n = text.length;
  let i = 0;

  while (i < n) {
    let j = i;
    let k = i + 1;

    while (k < n && text[j] <= text[k]) {
      if (text[j] < text[k]) {
        j = i;
      } else {
        j++;
      }
      k++;
    }

    const len = k - j;
    while (i <= j) {
      factors.push(text.slice(i, i + len));
      i += len;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Each factor is a Lyndon word; factors are in non-increasing lexicographic order",
      "Useful for suffix array construction and combinatorics on words",
    ],
  };

  return stampMeta(
    {
      text,
      factors,
      factor_count: factors.length,
    },
    meta,
  );
}

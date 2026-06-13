import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface EditOp {
  type: "insert" | "delete" | "replace" | "match";
  position: number;
  from?: string;
  to?: string;
}

export async function editDistance(args: Record<string, unknown>) {
  const source = args.source;
  const target = args.target;

  if (typeof source !== "string") {
    throw new Error("source must be a string.");
  }
  if (typeof target !== "string") {
    throw new Error("target must be a string.");
  }
  if (source.length > 5000) {
    throw new Error("source must be 5000 characters or fewer.");
  }
  if (target.length > 5000) {
    throw new Error("target must be 5000 characters or fewer.");
  }

  const m = source.length;
  const n = target.length;

  // Wagner-Fischer DP
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0),
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (source[i - 1] === target[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1], // replace
        );
      }
    }
  }

  // Backtrace to recover edit operations
  const operations: EditOp[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && source[i - 1] === target[j - 1]) {
      operations.unshift({ type: "match", position: i - 1, from: source[i - 1], to: target[j - 1] });
      i--;
      j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      operations.unshift({ type: "replace", position: i - 1, from: source[i - 1], to: target[j - 1] });
      i--;
      j--;
    } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
      operations.unshift({ type: "insert", position: i, to: target[j - 1] });
      j--;
    } else {
      operations.unshift({ type: "delete", position: i - 1, from: source[i - 1] });
      i--;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use the operations list to replay the transformation step by step",
      "Compare with other string similarity measures like Jaccard or cosine",
    ],
  };

  return stampMeta(
    {
      source,
      target,
      distance: dp[m][n],
      operations: operations.filter((op) => op.type !== "match"),
    },
    meta,
  );
}

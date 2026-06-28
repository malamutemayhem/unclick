import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function stringLcs(args: Record<string, unknown>) {
  const a = String(args.a ?? "");
  const b = String(args.b ?? "");

  if (a.length > 5000 || b.length > 5000) {
    throw new Error("Inputs must be 5000 characters or fewer each.");
  }

  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let lcs = "";
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs = a[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  const similarity =
    Math.max(m, n) === 0 ? 1 : dp[m][n] / Math.max(m, n);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use string_distance for edit distance", "Use jaccard_similarity for set-based comparison"],
  };
  return stampMeta(
    {
      a,
      b,
      lcs,
      lcs_length: dp[m][n],
      a_length: m,
      b_length: n,
      similarity: Math.round(similarity * 1e6) / 1e6,
    },
    meta,
  );
}

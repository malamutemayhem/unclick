import { stampMeta } from "./connector-meta.js";

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export async function stringDistance(args: Record<string, unknown>) {
  const a = String(args.a ?? "");
  const b = String(args.b ?? "");
  if (!a && !b) return { error: "a and b are required (two strings to compare)" };
  const caseSensitive = args.case_sensitive !== false;
  const sa = caseSensitive ? a : a.toLowerCase();
  const sb = caseSensitive ? b : b.toLowerCase();
  const distance = levenshteinDistance(sa, sb);
  const maxLen = Math.max(sa.length, sb.length);
  const similarity = maxLen > 0 ? +((1 - distance / maxLen) * 100).toFixed(1) : 100;
  return stampMeta({
    a, b, distance, similarity_percent: similarity,
    a_length: a.length, b_length: b.length,
    case_sensitive: caseSensitive,
  }, {
    source: "local Levenshtein distance calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["distance is edit operations needed", "similarity_percent is 100 minus normalized distance"],
  });
}

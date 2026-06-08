export interface DiffChange {
  type: "add" | "remove" | "equal";
  value: string;
  lineNumber?: number;
}

export function diffLines(a: string, b: string): DiffChange[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const lcs = longestCommonSubsequence(aLines, bLines);
  const changes: DiffChange[] = [];
  let ai = 0, bi = 0, li = 0;

  while (ai < aLines.length || bi < bLines.length) {
    if (li < lcs.length && ai < aLines.length && bi < bLines.length && aLines[ai] === lcs[li] && bLines[bi] === lcs[li]) {
      changes.push({ type: "equal", value: aLines[ai], lineNumber: bi + 1 });
      ai++;
      bi++;
      li++;
    } else if (bi < bLines.length && (li >= lcs.length || bLines[bi] !== lcs[li])) {
      changes.push({ type: "add", value: bLines[bi], lineNumber: bi + 1 });
      bi++;
    } else if (ai < aLines.length && (li >= lcs.length || aLines[ai] !== lcs[li])) {
      changes.push({ type: "remove", value: aLines[ai], lineNumber: ai + 1 });
      ai++;
    }
  }

  return changes;
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[]);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: string[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return result;
}

export function formatUnified(changes: DiffChange[], context: number = 3): string {
  const lines: string[] = [];
  for (const change of changes) {
    if (change.type === "equal") lines.push(` ${change.value}`);
    else if (change.type === "add") lines.push(`+${change.value}`);
    else lines.push(`-${change.value}`);
  }
  return lines.join("\n");
}

export function countChanges(changes: DiffChange[]): { additions: number; deletions: number; unchanged: number } {
  let additions = 0, deletions = 0, unchanged = 0;
  for (const c of changes) {
    if (c.type === "add") additions++;
    else if (c.type === "remove") deletions++;
    else unchanged++;
  }
  return { additions, deletions, unchanged };
}

export function hasChanges(a: string, b: string): boolean {
  return a !== b;
}

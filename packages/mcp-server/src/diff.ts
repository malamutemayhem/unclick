export type Change = { type: "add" | "remove" | "equal"; value: string };

export function diffLines(a: string, b: string): Change[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const lcs = lcsMatrix(aLines, bLines);
  return backtrack(aLines, bLines, lcs);
}

function lcsMatrix(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0) as number[]);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function backtrack(a: string[], b: string[], dp: number[][]): Change[] {
  const result: Change[] = [];
  let i = a.length;
  let j = b.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ type: "equal", value: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "add", value: b[j - 1] });
      j--;
    } else {
      result.unshift({ type: "remove", value: a[i - 1] });
      i--;
    }
  }
  return result;
}

export function unifiedDiff(a: string, b: string, context: number = 3): string {
  const changes = diffLines(a, b);
  const lines: string[] = [];
  for (let i = 0; i < changes.length; i++) {
    const c = changes[i];
    if (c.type === "equal") {
      const nearChange = changes.slice(Math.max(0, i - context), Math.min(changes.length, i + context + 1))
        .some((ch) => ch.type !== "equal");
      if (nearChange) lines.push(" " + c.value);
    } else if (c.type === "add") {
      lines.push("+" + c.value);
    } else {
      lines.push("-" + c.value);
    }
  }
  return lines.join("\n");
}

export function applyPatch(original: string, changes: Change[]): string {
  return changes
    .filter((c) => c.type !== "remove")
    .map((c) => c.value)
    .join("\n");
}

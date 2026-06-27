export interface DiffResult {
  type: "equal" | "add" | "remove";
  value: string;
}

export function diffLines(a: string, b: string): DiffResult[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  return lcsDiff(aLines, bLines);
}

export function diffWords(a: string, b: string): DiffResult[] {
  const aWords = a.split(/(\s+)/);
  const bWords = b.split(/(\s+)/);
  return lcsDiff(aWords, bWords);
}

function lcsDiff(a: string[], b: string[]): DiffResult[] {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffResult[] = [];
  let i = n;
  let j = m;

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

export function formatUnifiedDiff(diffs: DiffResult[]): string {
  return diffs.map((d) => {
    if (d.type === "equal") return ` ${d.value}`;
    if (d.type === "add") return `+${d.value}`;
    return `-${d.value}`;
  }).join("\n");
}

export function applyPatch(original: string, diffs: DiffResult[]): string {
  return diffs
    .filter((d) => d.type !== "remove")
    .map((d) => d.value)
    .join("\n");
}

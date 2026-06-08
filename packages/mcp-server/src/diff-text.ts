export interface LineDiff {
  type: "added" | "removed" | "unchanged";
  line: string;
  lineNumber: { before?: number; after?: number };
}

export function diffLines(before: string, after: string): LineDiff[] {
  const linesA = before.split("\n");
  const linesB = after.split("\n");
  const diffs: LineDiff[] = [];

  const lcs = longestCommonSubsequence(linesA, linesB);
  let ai = 0;
  let bi = 0;
  let li = 0;

  while (ai < linesA.length || bi < linesB.length) {
    if (li < lcs.length && ai < linesA.length && linesA[ai] === lcs[li]) {
      if (bi < linesB.length && linesB[bi] === lcs[li]) {
        diffs.push({ type: "unchanged", line: lcs[li], lineNumber: { before: ai + 1, after: bi + 1 } });
        ai++;
        bi++;
        li++;
      } else {
        diffs.push({ type: "added", line: linesB[bi], lineNumber: { after: bi + 1 } });
        bi++;
      }
    } else if (ai < linesA.length) {
      if (li < lcs.length && bi < linesB.length && linesB[bi] === lcs[li]) {
        diffs.push({ type: "removed", line: linesA[ai], lineNumber: { before: ai + 1 } });
        ai++;
      } else if (bi < linesB.length) {
        diffs.push({ type: "removed", line: linesA[ai], lineNumber: { before: ai + 1 } });
        ai++;
      } else {
        diffs.push({ type: "removed", line: linesA[ai], lineNumber: { before: ai + 1 } });
        ai++;
      }
    } else if (bi < linesB.length) {
      diffs.push({ type: "added", line: linesB[bi], lineNumber: { after: bi + 1 } });
      bi++;
    }
  }

  return diffs;
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: string[] = [];
  let i = m;
  let j = n;
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

export function formatDiff(diffs: LineDiff[]): string {
  return diffs
    .map((d) => {
      const prefix = d.type === "added" ? "+" : d.type === "removed" ? "-" : " ";
      return `${prefix} ${d.line}`;
    })
    .join("\n");
}

export function stats(diffs: LineDiff[]): { added: number; removed: number; unchanged: number } {
  return {
    added: diffs.filter((d) => d.type === "added").length,
    removed: diffs.filter((d) => d.type === "removed").length,
    unchanged: diffs.filter((d) => d.type === "unchanged").length,
  };
}

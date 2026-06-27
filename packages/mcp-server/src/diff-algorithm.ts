export interface DiffEdit {
  type: "insert" | "delete" | "equal";
  value: string;
}

export function diff(a: string[], b: string[]): DiffEdit[] {
  const n = a.length;
  const m = b.length;

  if (n === 0 && m === 0) return [];
  if (n === 0) return b.map((v) => ({ type: "insert" as const, value: v }));
  if (m === 0) return a.map((v) => ({ type: "delete" as const, value: v }));

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const edits: DiffEdit[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      edits.unshift({ type: "equal", value: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      edits.unshift({ type: "insert", value: b[j - 1] });
      j--;
    } else {
      edits.unshift({ type: "delete", value: a[i - 1] });
      i--;
    }
  }

  return edits;
}

export function diffLines(a: string, b: string): DiffEdit[] {
  const linesA = a.length === 0 ? [] : a.split("\n");
  const linesB = b.length === 0 ? [] : b.split("\n");
  return diff(linesA, linesB);
}

export function diffChars(a: string, b: string): DiffEdit[] {
  return diff(a.split(""), b.split(""));
}

export function patch(original: string[], edits: DiffEdit[]): string[] {
  const result: string[] = [];
  for (const edit of edits) {
    if (edit.type === "equal" || edit.type === "insert") {
      result.push(edit.value);
    }
  }
  return result;
}

export function editDistance(a: string[], b: string[]): number {
  const edits = diff(a, b);
  return edits.filter((e) => e.type !== "equal").length;
}

export function unifiedDiff(
  a: string,
  b: string,
  contextLines = 3,
): string {
  const linesA = a.length === 0 ? [] : a.split("\n");
  const linesB = b.length === 0 ? [] : b.split("\n");
  const edits = diff(linesA, linesB);

  const lines: string[] = [];
  let lineA = 0;
  let lineB = 0;

  for (const edit of edits) {
    switch (edit.type) {
      case "equal":
        lines.push(` ${edit.value}`);
        lineA++;
        lineB++;
        break;
      case "delete":
        lines.push(`-${edit.value}`);
        lineA++;
        break;
      case "insert":
        lines.push(`+${edit.value}`);
        lineB++;
        break;
    }
  }

  const hasChanges = lines.some((l) => l.startsWith("+") || l.startsWith("-"));
  if (!hasChanges) return "";

  const result: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].startsWith("+") || lines[i].startsWith("-")) {
      const start = Math.max(0, i - contextLines);
      let end = i;
      while (end < lines.length && (lines[end].startsWith("+") || lines[end].startsWith("-"))) {
        end++;
      }
      end = Math.min(lines.length, end + contextLines);
      for (let j = start; j < end; j++) {
        result.push(lines[j]);
      }
      i = end;
    } else {
      i++;
    }
  }

  return result.join("\n");
}

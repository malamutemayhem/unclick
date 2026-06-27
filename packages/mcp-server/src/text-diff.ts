export interface DiffChange {
  type: "add" | "remove" | "equal";
  value: string;
}

export function diffLines(oldText: string, newText: string): DiffChange[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  return diffArrays(oldLines, newLines).map((c) => ({
    type: c.type,
    value: c.items.join("\n"),
  }));
}

interface ArrayChange<T> {
  type: "add" | "remove" | "equal";
  items: T[];
}

function diffArrays<T>(oldArr: T[], newArr: T[]): ArrayChange<T>[] {
  const m = oldArr.length;
  const n = newArr.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldArr[i - 1] === newArr[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  const changes: ArrayChange<T>[] = [];
  let i = m;
  let j = n;
  const stack: ArrayChange<T>[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldArr[i - 1] === newArr[j - 1]) {
      stack.push({ type: "equal", items: [oldArr[i - 1]] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "add", items: [newArr[j - 1]] });
      j--;
    } else {
      stack.push({ type: "remove", items: [oldArr[i - 1]] });
      i--;
    }
  }
  stack.reverse();
  for (const entry of stack) {
    const last = changes[changes.length - 1];
    if (last && last.type === entry.type) {
      last.items.push(...entry.items);
    } else {
      changes.push(entry);
    }
  }
  return changes;
}

export function diffWords(oldText: string, newText: string): DiffChange[] {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);
  return diffArrays(oldWords, newWords).map((c) => ({
    type: c.type,
    value: c.items.join(""),
  }));
}

export function applyPatch(original: string, changes: DiffChange[]): string {
  const parts: string[] = [];
  for (const change of changes) {
    if (change.type === "equal" || change.type === "add") {
      parts.push(change.value);
    }
  }
  return parts.join("\n");
}

export function unifiedDiff(oldText: string, newText: string, oldLabel = "a", newLabel = "b"): string {
  const changes = diffLines(oldText, newText);
  const lines: string[] = [`--- ${oldLabel}`, `+++ ${newLabel}`];
  for (const change of changes) {
    const prefix = change.type === "add" ? "+" : change.type === "remove" ? "-" : " ";
    for (const line of change.value.split("\n")) {
      lines.push(`${prefix}${line}`);
    }
  }
  return lines.join("\n");
}

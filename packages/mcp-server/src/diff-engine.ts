export interface DiffOp {
  type: "add" | "remove" | "equal";
  value: string;
  oldIndex?: number;
  newIndex?: number;
}

export class DiffEngine {
  static diffLines(oldText: string, newText: string): DiffOp[] {
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");
    return DiffEngine.diffArrays(oldLines, newLines);
  }

  static diffArrays(oldArr: string[], newArr: string[]): DiffOp[] {
    const m = oldArr.length;
    const n = newArr.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (oldArr[i - 1] === newArr[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const ops: DiffOp[] = [];
    let i = m;
    let j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldArr[i - 1] === newArr[j - 1]) {
        ops.unshift({ type: "equal", value: oldArr[i - 1], oldIndex: i - 1, newIndex: j - 1 });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        ops.unshift({ type: "add", value: newArr[j - 1], newIndex: j - 1 });
        j--;
      } else {
        ops.unshift({ type: "remove", value: oldArr[i - 1], oldIndex: i - 1 });
        i--;
      }
    }

    return ops;
  }

  static unifiedDiff(oldText: string, newText: string, contextLines = 3): string {
    const ops = DiffEngine.diffLines(oldText, newText);
    const lines: string[] = [];

    for (const op of ops) {
      switch (op.type) {
        case "equal":
          lines.push(` ${op.value}`);
          break;
        case "add":
          lines.push(`+${op.value}`);
          break;
        case "remove":
          lines.push(`-${op.value}`);
          break;
      }
    }

    return lines.join("\n");
  }

  static stats(ops: DiffOp[]): { added: number; removed: number; unchanged: number } {
    let added = 0;
    let removed = 0;
    let unchanged = 0;
    for (const op of ops) {
      if (op.type === "add") added++;
      else if (op.type === "remove") removed++;
      else unchanged++;
    }
    return { added, removed, unchanged };
  }

  static similarity(oldText: string, newText: string): number {
    const ops = DiffEngine.diffLines(oldText, newText);
    const stats = DiffEngine.stats(ops);
    const total = stats.added + stats.removed + stats.unchanged;
    if (total === 0) return 1;
    return stats.unchanged / total;
  }
}

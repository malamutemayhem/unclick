export interface Change<T = string> {
  type: "add" | "remove" | "equal";
  value: T;
}

export function diff(oldStr: string, newStr: string): Change<string>[] {
  return diffArrays(oldStr.split("\n"), newStr.split("\n"));
}

export function diffArrays<T>(oldArr: T[], newArr: T[]): Change<T>[] {
  const n = oldArr.length;
  const m = newArr.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (oldArr[i - 1] === newArr[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: Change<T>[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldArr[i - 1] === newArr[j - 1]) {
      result.unshift({ type: "equal", value: oldArr[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "add", value: newArr[j - 1] });
      j--;
    } else {
      result.unshift({ type: "remove", value: oldArr[i - 1] });
      i--;
    }
  }

  return result;
}

export function unifiedDiff(oldStr: string, newStr: string): string {
  const changes = diff(oldStr, newStr);
  const lines: string[] = [];
  for (const change of changes) {
    if (change.type === "equal") lines.push(` ${change.value}`);
    else if (change.type === "add") lines.push(`+${change.value}`);
    else lines.push(`-${change.value}`);
  }
  return lines.join("\n");
}

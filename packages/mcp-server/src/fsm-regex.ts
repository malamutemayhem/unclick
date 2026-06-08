export function matchPattern(text: string, pattern: string): boolean {
  const m = text.length;
  const n = pattern.length;
  const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let j = 1; j <= n; j++) {
    if (pattern[j - 1] === "*" && j >= 2) {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const pc = pattern[j - 1];
      if (pc === "." || pc === text[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (pc === "*" && j >= 2) {
        dp[i][j] = dp[i][j - 2];
        const prev = pattern[j - 2];
        if (prev === "." || prev === text[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }
  return dp[m][n];
}

export function wildcardMatch(text: string, pattern: string): boolean {
  const m = text.length;
  const n = pattern.length;
  const dp: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let j = 1; j <= n; j++) {
    if (pattern[j - 1] === "*") dp[0][j] = dp[0][j - 1];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (pattern[j - 1] === "*") {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else if (pattern[j - 1] === "?" || pattern[j - 1] === text[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  return dp[m][n];
}

export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function extractMatches(text: string, regex: RegExp): string[] {
  const results: string[] = [];
  const global = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
  let match: RegExpExecArray | null;
  while ((match = global.exec(text)) !== null) {
    results.push(match[0]);
    if (!regex.flags.includes("g")) break;
  }
  return results;
}

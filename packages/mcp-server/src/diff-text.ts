export interface DiffChunk {
  type: "equal" | "add" | "remove";
  value: string;
}

export function diffLines(a: string, b: string): DiffChunk[] {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const lcs = longestCommonSubsequence(aLines, bLines);
  const chunks: DiffChunk[] = [];

  let ai = 0, bi = 0, li = 0;
  while (ai < aLines.length || bi < bLines.length) {
    if (li < lcs.length && ai < aLines.length && bi < bLines.length && aLines[ai] === lcs[li] && bLines[bi] === lcs[li]) {
      chunks.push({ type: "equal", value: lcs[li] });
      ai++; bi++; li++;
    } else if (bi < bLines.length && (li >= lcs.length || bLines[bi] !== lcs[li])) {
      chunks.push({ type: "add", value: bLines[bi] });
      bi++;
    } else if (ai < aLines.length && (li >= lcs.length || aLines[ai] !== lcs[li])) {
      chunks.push({ type: "remove", value: aLines[ai] });
      ai++;
    }
  }
  return chunks;
}

export function formatUnifiedDiff(a: string, b: string, context = 3): string {
  const chunks = diffLines(a, b);
  const lines: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk.type === "equal") {
      const nearChange = chunks.slice(Math.max(0, i - context), i).some((c) => c.type !== "equal") ||
        chunks.slice(i + 1, i + context + 1).some((c) => c.type !== "equal");
      if (nearChange) lines.push(` ${chunk.value}`);
    } else if (chunk.type === "add") {
      lines.push(`+${chunk.value}`);
    } else {
      lines.push(`-${chunk.value}`);
    }
  }

  return lines.join("\n");
}

export function applyPatch(original: string, chunks: DiffChunk[]): string {
  const lines: string[] = [];
  for (const chunk of chunks) {
    if (chunk.type === "equal" || chunk.type === "add") {
      lines.push(chunk.value);
    }
  }
  return lines.join("\n");
}

function longestCommonSubsequence(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: string[] = [];
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return result;
}

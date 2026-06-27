export interface EvalCase<I = unknown, O = unknown> {
  input: I;
  expected: O;
  tags?: string[];
}

export interface EvalResult<I = unknown, O = unknown> {
  input: I;
  expected: O;
  actual: O;
  score: number;
  pass: boolean;
  duration: number;
  tags?: string[];
  details?: string;
}

export interface EvalSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
  averageScore: number;
  averageDuration: number;
  byTag: Record<string, { passed: number; total: number; passRate: number }>;
}

export type Scorer<O = unknown> = (expected: O, actual: O) => number;

export function exactMatch<O>(expected: O, actual: O): number {
  return JSON.stringify(expected) === JSON.stringify(actual) ? 1 : 0;
}

export function containsMatch(expected: string, actual: string): number {
  return actual.includes(expected) ? 1 : 0;
}

export function numericCloseness(expected: number, actual: number, tolerance = 0.01): number {
  const diff = Math.abs(expected - actual);
  if (diff <= tolerance) return 1;
  return Math.max(0, 1 - diff / Math.abs(expected || 1));
}

export function levenshteinScore(expected: string, actual: string): number {
  const maxLen = Math.max(expected.length, actual.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(expected, actual) / maxLen;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export async function runEval<I, O>(
  cases: EvalCase<I, O>[],
  fn: (input: I) => O | Promise<O>,
  scorer: Scorer<O>,
  threshold = 0.5,
): Promise<EvalResult<I, O>[]> {
  const results: EvalResult<I, O>[] = [];
  for (const c of cases) {
    const start = Date.now();
    const actual = await fn(c.input);
    const duration = Date.now() - start;
    const score = scorer(c.expected, actual);
    results.push({
      input: c.input,
      expected: c.expected,
      actual,
      score,
      pass: score >= threshold,
      duration,
      tags: c.tags,
    });
  }
  return results;
}

export function summarize<I, O>(results: EvalResult<I, O>[]): EvalSummary {
  const total = results.length;
  const passed = results.filter((r) => r.pass).length;
  const averageScore = total > 0 ? results.reduce((s, r) => s + r.score, 0) / total : 0;
  const averageDuration = total > 0 ? results.reduce((s, r) => s + r.duration, 0) / total : 0;

  const byTag: Record<string, { passed: number; total: number; passRate: number }> = {};
  for (const r of results) {
    for (const tag of r.tags ?? []) {
      if (!byTag[tag]) byTag[tag] = { passed: 0, total: 0, passRate: 0 };
      byTag[tag].total++;
      if (r.pass) byTag[tag].passed++;
    }
  }
  for (const tag of Object.keys(byTag)) {
    byTag[tag].passRate = byTag[tag].total > 0 ? byTag[tag].passed / byTag[tag].total : 0;
  }

  return {
    total,
    passed,
    failed: total - passed,
    passRate: total > 0 ? passed / total : 0,
    averageScore,
    averageDuration,
    byTag,
  };
}

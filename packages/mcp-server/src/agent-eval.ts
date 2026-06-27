export interface EvalCase<I = unknown, O = unknown> {
  name: string;
  input: I;
  expected: O;
  tags?: string[];
}

export interface EvalResult<I = unknown, O = unknown> {
  case: EvalCase<I, O>;
  actual: O;
  passed: boolean;
  score: number;
  durationMs: number;
  error?: string;
}

export interface EvalSummary {
  total: number;
  passed: number;
  failed: number;
  errors: number;
  avgScore: number;
  avgDurationMs: number;
  passRate: number;
}

export type Scorer<O> = (expected: O, actual: O) => number;

export function exactMatch<O>(expected: O, actual: O): number {
  return JSON.stringify(expected) === JSON.stringify(actual) ? 1 : 0;
}

export function containsMatch(expected: string, actual: string): number {
  return actual.toLowerCase().includes(expected.toLowerCase()) ? 1 : 0;
}

export function numericCloseness(expected: number, actual: number, tolerance = 0.01): number {
  const diff = Math.abs(expected - actual);
  if (diff <= tolerance) return 1;
  return Math.max(0, 1 - diff / Math.max(Math.abs(expected), 1));
}

export async function runEval<I, O>(
  cases: EvalCase<I, O>[],
  fn: (input: I) => O | Promise<O>,
  scorer: Scorer<O> = exactMatch,
  options: { timeoutMs?: number; tags?: string[] } = {},
): Promise<EvalResult<I, O>[]> {
  const filtered = options.tags
    ? cases.filter((c) => c.tags?.some((t) => options.tags!.includes(t)))
    : cases;

  const results: EvalResult<I, O>[] = [];

  for (const evalCase of filtered) {
    const start = Date.now();
    try {
      const actual = await fn(evalCase.input);
      const score = scorer(evalCase.expected, actual);
      results.push({
        case: evalCase,
        actual,
        passed: score >= 1,
        score,
        durationMs: Date.now() - start,
      });
    } catch (err) {
      results.push({
        case: evalCase,
        actual: undefined as O,
        passed: false,
        score: 0,
        durationMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}

export function summarize<I, O>(results: EvalResult<I, O>[]): EvalSummary {
  const total = results.length;
  if (total === 0) return { total: 0, passed: 0, failed: 0, errors: 0, avgScore: 0, avgDurationMs: 0, passRate: 0 };
  const passed = results.filter((r) => r.passed).length;
  const errors = results.filter((r) => r.error).length;
  const avgScore = results.reduce((s, r) => s + r.score, 0) / total;
  const avgDurationMs = results.reduce((s, r) => s + r.durationMs, 0) / total;
  return {
    total,
    passed,
    failed: total - passed,
    errors,
    avgScore,
    avgDurationMs,
    passRate: passed / total,
  };
}

export function filterByTag<I, O>(results: EvalResult<I, O>[], tag: string): EvalResult<I, O>[] {
  return results.filter((r) => r.case.tags?.includes(tag));
}

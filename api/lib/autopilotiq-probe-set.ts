// AutopilotIQ probe set (Phase 0, Slice 0b) - capture only, scoreboard honesty anchor.
//
// A small set of DETERMINISTIC known-answer probes plus a pure scorer, an
// aggregate scoreboard, and a drift / scoreboard-honesty check. The point: if a
// future scoreboard claims "improving" while probe pass-rate is flat or down,
// scoreboard honesty fails. Capture-only and additive - no nightly schedule is
// wired by this slice; the recorder is dependency-injected so this module does
// not depend on Slice 0a (the outcome ledger), and stays independently
// testable. Natural production wiring: pass an adapter that calls
// recordAutopilotOutcome(supabase, ...) from autopilotiq-outcome-ledger.ts.

import { createHash } from "crypto";

export const PROBE_CHECK_KINDS = [
  "equals",
  "equals_trimmed",
  "includes",
  "regex",
  "json_equal",
  "length_at_least",
] as const;
export type ProbeCheckKind = (typeof PROBE_CHECK_KINDS)[number];

export const PROBE_TASK_TYPES = [
  "json_extract",
  "string_transform",
  "regex_match",
  "count",
  "sort",
  "format",
] as const;
export type ProbeTaskType = (typeof PROBE_TASK_TYPES)[number];

export interface Probe {
  id: string;
  task_type: ProbeTaskType;
  prompt: string;
  expected: string;
  check_kind: ProbeCheckKind;
  description: string;
}

export interface ProbeResult {
  probe_id: string;
  task_type: string;
  pass: boolean;
  reason: string;
  actual: string;
  wall_ms: number;
  started_at: string;
  finished_at: string;
}

export interface ProbeTaskTypeScoreboard {
  total: number;
  passed: number;
  pass_rate: number;
}

export interface ProbeScoreboard {
  total: number;
  passed: number;
  failed: number;
  pass_rate: number;
  by_task_type: Record<string, ProbeTaskTypeScoreboard>;
  generated_at: string;
  suite_run_id: string;
}

export type ProbeDriftVerdict = "stable" | "drifting_up" | "drifting_down";

export interface ProbeDriftReport {
  baseline_pass_rate: number;
  current_pass_rate: number;
  delta: number;
  threshold: number;
  verdict: ProbeDriftVerdict;
}

export type ScoreboardClaim = "improving" | "stable" | "degrading";

export interface ScoreboardHonestyVerdict {
  honest: boolean;
  claim: ScoreboardClaim;
  observed_verdict: ProbeDriftVerdict;
  delta: number;
  threshold: number;
  reason: string;
}

// Capture record emitted per probe attempt. Field names mirror the camelCase
// input of the Slice 0a recorder (recordAutopilotOutcome) so a thin adapter can
// pass these through once 0a merges, without coupling this slice to 0a's table.
export interface ProbeOutcomeRecord {
  jobId: string; // stable per-probe id (e.g. probe.json_extract.user_email_v1)
  parentJobId: string; // suite_run_id - groups all probes from one suite run
  taskType: "probe";
  attemptN: number;
  outcome: "success" | "fail";
  outcomeReason: string; // structural; adapter maps to slice 0a's closed taxonomy
  routeTaken: {
    seat?: string | null;
    model?: string | null;
    prompt_version: string; // "probe:<task_type>:<probe_id_suffix>"
    tool_set?: string[] | null;
  };
  costSignal: {
    wall_ms: number;
  };
  receiptId: string | null;
  prompt_hash: string;
  expected_hash: string;
  actual_hash: string;
}

export type ProbeExecutor = (probe: Probe) => Promise<string> | string;
export type ProbeRecorder = (record: ProbeOutcomeRecord) => Promise<void> | void;

// ----------------------------------------------------------------------------
// Probe set v0
// ----------------------------------------------------------------------------

// Deterministic, language-agnostic probes. Each is a tiny, fixed task whose
// correct answer never changes - that is the honesty anchor: if pass-rate
// against this set drifts, the lane is changing in ways the scoreboard cannot
// hide. Extend by adding more entries; do not edit existing ids.
export const PROBE_SET_V0: readonly Probe[] = Object.freeze([
  {
    id: "probe.json_extract.user_email_v1",
    task_type: "json_extract",
    prompt: 'From {"name":"Ada","email":"ada@example.com","age":36}, output only the value of the "email" field.',
    expected: "ada@example.com",
    check_kind: "equals_trimmed",
    description: "JSON field extraction; trivial but anchors follow-instruction fidelity.",
  },
  {
    id: "probe.string.kebab_to_snake_v1",
    task_type: "string_transform",
    prompt: "Convert 'foo-bar-baz' to snake_case by replacing each '-' with '_'. Output only the result.",
    expected: "foo_bar_baz",
    check_kind: "equals_trimmed",
    description: "Deterministic string transform; probes literal-output discipline.",
  },
  {
    id: "probe.regex.uuid_present_v1",
    task_type: "regex_match",
    prompt:
      "Does 'session 550e8400-e29b-41d4-a716-446655440000 was started' contain a UUID? Answer exactly 'yes' or 'no'.",
    expected: "yes",
    check_kind: "equals_trimmed",
    description: "Detection task with a one-word constrained answer.",
  },
  {
    id: "probe.count.unique_words_v1",
    task_type: "count",
    prompt:
      "Count the unique whitespace-separated lowercase tokens in 'the quick brown the lazy quick'. Output only the integer.",
    expected: "4",
    check_kind: "equals_trimmed",
    description: "Cardinality / counting task with a single-integer answer.",
  },
  {
    id: "probe.sort.ascending_json_v1",
    task_type: "sort",
    prompt:
      "Sort [3,1,4,1,5,9,2,6,5,3,5] in ascending order and output the result as a JSON array on a single line.",
    expected: "[1,1,2,3,3,4,5,5,5,6,9]",
    check_kind: "json_equal",
    description: "Multi-element sort with stable JSON output.",
  },
  {
    id: "probe.format.iso_date_v1",
    task_type: "format",
    prompt: "Convert the ISO-8601 timestamp '2026-05-28T14:30:00Z' to a YYYY-MM-DD date string. Output only the date.",
    expected: "2026-05-28",
    check_kind: "equals_trimmed",
    description: "Formatting a known timestamp to a date string.",
  },
]);

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value as Record<string, unknown>)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson((value as Record<string, unknown>)[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function truncate(value: string, max = 120): string {
  return value.length > max ? `${value.slice(0, max - 3)}...` : value;
}

// ----------------------------------------------------------------------------
// Scoring
// ----------------------------------------------------------------------------

/**
 * Score one probe attempt. Pure: no I/O. Returns pass + a short reason that
 * explains a fail without leaking the full prompt.
 */
export function scoreProbe(
  probe: Probe,
  actual: string,
): { pass: boolean; reason: string } {
  switch (probe.check_kind) {
    case "equals": {
      const pass = actual === probe.expected;
      return {
        pass,
        reason: pass
          ? "exact match"
          : `expected '${truncate(probe.expected)}' got '${truncate(actual)}'`,
      };
    }
    case "equals_trimmed": {
      const a = (actual ?? "").trim();
      const e = probe.expected.trim();
      const pass = a === e;
      return {
        pass,
        reason: pass
          ? "exact match (trimmed)"
          : `expected '${truncate(e)}' got '${truncate(a)}'`,
      };
    }
    case "includes": {
      const pass = String(actual ?? "").includes(probe.expected);
      return {
        pass,
        reason: pass ? "substring present" : `'${truncate(probe.expected)}' not found in actual`,
      };
    }
    case "regex": {
      let re: RegExp;
      try {
        re = new RegExp(probe.expected);
      } catch (err) {
        return { pass: false, reason: `invalid regex in probe expected: ${(err as Error).message}` };
      }
      const pass = re.test(String(actual ?? ""));
      return {
        pass,
        reason: pass ? "regex matched" : `regex '${truncate(probe.expected)}' did not match actual`,
      };
    }
    case "json_equal": {
      let expectedParsed: unknown;
      let actualParsed: unknown;
      try {
        expectedParsed = JSON.parse(probe.expected);
      } catch (err) {
        return { pass: false, reason: `invalid JSON in probe expected: ${(err as Error).message}` };
      }
      try {
        actualParsed = JSON.parse(String(actual ?? ""));
      } catch (err) {
        return { pass: false, reason: `actual is not valid JSON: ${(err as Error).message}` };
      }
      const pass = stableJson(expectedParsed) === stableJson(actualParsed);
      return {
        pass,
        reason: pass
          ? "JSON shapes equal"
          : `expected JSON '${truncate(stableJson(expectedParsed))}' got '${truncate(stableJson(actualParsed))}'`,
      };
    }
    case "length_at_least": {
      const min = Number.parseInt(probe.expected, 10);
      if (!Number.isFinite(min)) {
        return { pass: false, reason: `invalid length threshold in probe expected: ${probe.expected}` };
      }
      const pass = String(actual ?? "").length >= min;
      return {
        pass,
        reason: pass ? `length>=${min}` : `expected length>=${min}, got length=${String(actual ?? "").length}`,
      };
    }
    default: {
      const exhaustive: never = probe.check_kind;
      return { pass: false, reason: `unsupported check_kind: ${String(exhaustive)}` };
    }
  }
}

// ----------------------------------------------------------------------------
// Aggregate
// ----------------------------------------------------------------------------

/**
 * Aggregate probe results into a scoreboard. pass_rate is `passed/total`
 * (NaN-free: 0 when total is 0). by_task_type lets callers see which capability
 * is degrading even when the overall rate is flat.
 */
export function aggregateProbeResults(
  results: ProbeResult[],
  options: { suiteRunId: string; generatedAt: string },
): ProbeScoreboard {
  const total = results.length;
  const passed = results.filter((result) => result.pass).length;
  const failed = total - passed;
  const passRate = total === 0 ? 0 : passed / total;

  const byTaskType: Record<string, ProbeTaskTypeScoreboard> = {};
  for (const result of results) {
    const bucket = byTaskType[result.task_type] ?? { total: 0, passed: 0, pass_rate: 0 };
    bucket.total += 1;
    if (result.pass) bucket.passed += 1;
    bucket.pass_rate = bucket.total === 0 ? 0 : bucket.passed / bucket.total;
    byTaskType[result.task_type] = bucket;
  }

  return {
    total,
    passed,
    failed,
    pass_rate: passRate,
    by_task_type: byTaskType,
    generated_at: options.generatedAt,
    suite_run_id: options.suiteRunId,
  };
}

// ----------------------------------------------------------------------------
// Drift + scoreboard honesty
// ----------------------------------------------------------------------------

/**
 * Compare a current pass-rate to a baseline. Verdict is "stable" when |delta|
 * < threshold; otherwise "drifting_up" or "drifting_down". Threshold defaults
 * to 0.05 (5 percentage points) - tune per probe-set size.
 */
export function checkProbeDrift(input: {
  current_pass_rate: number;
  baseline_pass_rate: number;
  threshold?: number;
}): ProbeDriftReport {
  const threshold = input.threshold ?? 0.05;
  const delta = input.current_pass_rate - input.baseline_pass_rate;
  let verdict: ProbeDriftVerdict;
  if (Math.abs(delta) < threshold) verdict = "stable";
  else if (delta > 0) verdict = "drifting_up";
  else verdict = "drifting_down";
  return {
    baseline_pass_rate: input.baseline_pass_rate,
    current_pass_rate: input.current_pass_rate,
    delta,
    threshold,
    verdict,
  };
}

/**
 * Catch a lying scoreboard. A claim of "improving" is honest only if the probe
 * set is drifting up; "degrading" only if drifting down; "stable" only if the
 * |delta| is below threshold. Anything else means the scoreboard's narrative
 * does not match the probe-anchored truth.
 */
export function checkScoreboardHonesty(input: {
  claim: ScoreboardClaim;
  current_pass_rate: number;
  baseline_pass_rate: number;
  threshold?: number;
}): ScoreboardHonestyVerdict {
  const drift = checkProbeDrift({
    current_pass_rate: input.current_pass_rate,
    baseline_pass_rate: input.baseline_pass_rate,
    threshold: input.threshold,
  });
  const expectedFor: Record<ScoreboardClaim, ProbeDriftVerdict> = {
    improving: "drifting_up",
    stable: "stable",
    degrading: "drifting_down",
  };
  const honest = drift.verdict === expectedFor[input.claim];
  const reason = honest
    ? `claim '${input.claim}' matches observed '${drift.verdict}' (delta=${drift.delta.toFixed(3)})`
    : `claim '${input.claim}' contradicts observed '${drift.verdict}' (delta=${drift.delta.toFixed(3)}, threshold=${drift.threshold})`;
  return {
    honest,
    claim: input.claim,
    observed_verdict: drift.verdict,
    delta: drift.delta,
    threshold: drift.threshold,
    reason,
  };
}

// ----------------------------------------------------------------------------
// Harness
// ----------------------------------------------------------------------------

export interface RunProbeSuiteInput {
  probes?: readonly Probe[];
  executor: ProbeExecutor;
  recorder?: ProbeRecorder;
  suiteRunId?: string;
  routeTaken?: Pick<ProbeOutcomeRecord["routeTaken"], "seat" | "model" | "tool_set">;
  now?: () => Date;
}

export interface RunProbeSuiteOutput {
  scoreboard: ProbeScoreboard;
  results: ProbeResult[];
}

/**
 * Run a probe suite end-to-end with an injected executor. For each probe:
 *   1. call executor(probe) and measure wall_ms,
 *   2. score actual vs expected,
 *   3. optionally emit a ProbeOutcomeRecord via the injected recorder.
 *
 * Capture-only: this function never reads the recorder's output back to alter
 * behaviour. Probe-set choice does not influence the scorer. The recorder is
 * optional so the harness is fully usable without persistence (e.g. in CI or
 * a local smoke run).
 */
export async function runProbeSuite(input: RunProbeSuiteInput): Promise<RunProbeSuiteOutput> {
  const probes = input.probes ?? PROBE_SET_V0;
  const now = input.now ?? (() => new Date());
  const suiteRunId = input.suiteRunId ?? `probe-suite-${now().toISOString()}`;
  const route = input.routeTaken ?? {};
  const results: ProbeResult[] = [];

  for (const probe of probes) {
    const startedAt = now();
    let actual: string;
    let executorError: Error | null = null;
    try {
      const value = await Promise.resolve(input.executor(probe));
      actual = String(value ?? "");
    } catch (err) {
      executorError = err as Error;
      actual = "";
    }
    const finishedAt = now();
    const wallMs = finishedAt.getTime() - startedAt.getTime();

    let pass: boolean;
    let reason: string;
    if (executorError) {
      pass = false;
      reason = `executor threw: ${executorError.message}`;
    } else {
      const scored = scoreProbe(probe, actual);
      pass = scored.pass;
      reason = scored.reason;
    }

    results.push({
      probe_id: probe.id,
      task_type: probe.task_type,
      pass,
      reason,
      actual,
      wall_ms: wallMs,
      started_at: startedAt.toISOString(),
      finished_at: finishedAt.toISOString(),
    });

    if (input.recorder) {
      const record: ProbeOutcomeRecord = {
        jobId: probe.id,
        parentJobId: suiteRunId,
        taskType: "probe",
        attemptN: 1,
        outcome: pass ? "success" : "fail",
        outcomeReason: pass ? "clean_pass" : executorError ? "tool_error" : "wrong_route",
        routeTaken: {
          seat: route.seat ?? null,
          model: route.model ?? null,
          prompt_version: `probe:${probe.task_type}:${probe.id}`,
          tool_set: route.tool_set ?? null,
        },
        costSignal: { wall_ms: wallMs },
        receiptId: null,
        prompt_hash: sha256(probe.prompt),
        expected_hash: sha256(probe.expected),
        actual_hash: sha256(actual),
      };
      await Promise.resolve(input.recorder(record));
    }
  }

  const scoreboard = aggregateProbeResults(results, {
    suiteRunId,
    generatedAt: now().toISOString(),
  });
  return { scoreboard, results };
}

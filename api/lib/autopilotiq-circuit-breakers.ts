// AutopilotIQ circuit breakers + kill switches (Phase 0, Slice 0c) - safety
// scaffolding, capture-only.
//
// Three layers of safety, built BEFORE anything acts (the spec is explicit:
// build in Phase 0, never retrofit):
//   1. Per-job circuit breaker - hard ceilings on actions/cost/tokens/wall/
//      retries with CLOSED reason codes (circuit_break_*).
//   2. Component pause flags - a readable per-component paused model, default
//      safe and explicit.
//   3. Global self-improvement kill switch - one boolean halts every
//      autonomous self-improvement path.
//
// Pure / config-driven. Additive: nothing in this slice halts live production
// jobs; later phases call these. The breach recorder is dependency-injected,
// so this slice does not couple to Slice 0a's outcome ledger (PR #1144) and
// stays independently mergeable. Natural production wiring once 0a lands is a
// thin adapter that forwards CircuitBreakRecord to recordAutopilotOutcome.

export const CIRCUIT_BREAK_REASONS = [
  "circuit_break_actions",
  "circuit_break_tokens",
  "circuit_break_cost",
  "circuit_break_time",
  "circuit_break_retries",
] as const;
export type CircuitBreakReason = (typeof CIRCUIT_BREAK_REASONS)[number];

export const AUTOPILOTIQ_COMPONENTS = [
  "autopilotiq_tuner",
  "seat_intelligence",
  "creative_evolution",
  "retry_tuner",
  "shadow_learner",
  "gated_learner",
] as const;
export type AutopilotIQComponent = (typeof AUTOPILOTIQ_COMPONENTS)[number];

// Layer 1 inputs ---------------------------------------------------------

export interface CircuitBreakerLimits {
  // Each limit is optional; when undefined the corresponding resource is
  // uncapped for this evaluation. Hard ceilings: usage > limit triggers a
  // breach.
  max_actions?: number;
  max_tokens?: number;
  max_usd?: number;
  max_wall_ms?: number;
  max_retries?: number;
}

export interface CircuitBreakerUsage {
  actions?: number;
  tokens?: number;
  usd?: number;
  wall_ms?: number;
  retries?: number;
}

export interface CircuitBreakerVerdict {
  allow: boolean;
  breached: CircuitBreakReason | null;
  detail: string;
  limits: CircuitBreakerLimits;
  usage: CircuitBreakerUsage;
}

// Conservative defaults. These are explicit and easy to tune; they intentionally
// favour halting on uncertainty over continuing past safety budgets.
export const DEFAULT_CIRCUIT_BREAKER_LIMITS: CircuitBreakerLimits = Object.freeze({
  max_actions: 8,
  max_tokens: 200_000,
  max_usd: 1.0,
  max_wall_ms: 5 * 60_000,
  max_retries: 3,
});

// Layer 2 + 3 config ----------------------------------------------------

export interface AutopilotIQSafetyConfig {
  // Global kill switch. When true, every autonomous self-improvement path is
  // considered halted regardless of per-component pause flags.
  self_improvement_kill?: boolean;
  // Per-component pauses. Default: empty (no components paused).
  paused_components?: readonly AutopilotIQComponent[];
}

export const DEFAULT_AUTOPILOTIQ_SAFETY_CONFIG: AutopilotIQSafetyConfig = Object.freeze({
  self_improvement_kill: false,
  paused_components: [],
});

// ----------------------------------------------------------------------
// Layer 1: per-job circuit breaker
// ----------------------------------------------------------------------

/**
 * Evaluate hard ceilings for a single job's resource usage. Pure - no I/O.
 * Returns the first deterministic breach (order: actions, tokens, cost, time,
 * retries) so callers see the most economically obvious cap first. A limit of
 * `undefined` means uncapped for that resource; usage of `undefined` counts as
 * zero. Breach when `usage > limit` (strict): equality is still allowed.
 */
export function evaluateCircuitBreaker(
  usage: CircuitBreakerUsage,
  limits: CircuitBreakerLimits = DEFAULT_CIRCUIT_BREAKER_LIMITS,
): CircuitBreakerVerdict {
  const checks: Array<{
    used: number;
    limit: number | undefined;
    reason: CircuitBreakReason;
    label: string;
  }> = [
    { used: usage.actions ?? 0, limit: limits.max_actions, reason: "circuit_break_actions", label: "actions" },
    { used: usage.tokens ?? 0, limit: limits.max_tokens, reason: "circuit_break_tokens", label: "tokens" },
    { used: usage.usd ?? 0, limit: limits.max_usd, reason: "circuit_break_cost", label: "usd" },
    { used: usage.wall_ms ?? 0, limit: limits.max_wall_ms, reason: "circuit_break_time", label: "wall_ms" },
    { used: usage.retries ?? 0, limit: limits.max_retries, reason: "circuit_break_retries", label: "retries" },
  ];

  for (const check of checks) {
    if (typeof check.limit !== "number") continue;
    if (check.used > check.limit) {
      return {
        allow: false,
        breached: check.reason,
        detail: `${check.label}=${check.used} > limit=${check.limit}`,
        limits,
        usage,
      };
    }
  }

  return {
    allow: true,
    breached: null,
    detail: "within all configured limits",
    limits,
    usage,
  };
}

// ----------------------------------------------------------------------
// Layer 2 + 3: component pause / global kill
// ----------------------------------------------------------------------

/**
 * True when the global self-improvement kill switch is engaged. Pure read.
 */
export function isSelfImprovementKilled(
  config: AutopilotIQSafetyConfig = DEFAULT_AUTOPILOTIQ_SAFETY_CONFIG,
): boolean {
  return Boolean(config.self_improvement_kill);
}

/**
 * True when a specific component is paused. The global kill switch trumps
 * everything (any component is paused when the kill is engaged); otherwise
 * `paused_components` decides.
 */
export function isComponentPaused(
  name: AutopilotIQComponent,
  config: AutopilotIQSafetyConfig = DEFAULT_AUTOPILOTIQ_SAFETY_CONFIG,
): boolean {
  if (isSelfImprovementKilled(config)) return true;
  const paused = config.paused_components ?? [];
  return paused.includes(name);
}

export interface ComponentAllowance {
  allowed: boolean;
  reason: "ok" | "kill_switch" | "component_paused";
}

/**
 * Compound check: returns allowed=false with the precise reason. Use this on
 * any code path that's about to invoke an AutopilotIQ component so the cause
 * of a halt is always explicit.
 */
export function isComponentAllowed(
  name: AutopilotIQComponent,
  config: AutopilotIQSafetyConfig = DEFAULT_AUTOPILOTIQ_SAFETY_CONFIG,
): ComponentAllowance {
  if (isSelfImprovementKilled(config)) return { allowed: false, reason: "kill_switch" };
  const paused = config.paused_components ?? [];
  if (paused.includes(name)) return { allowed: false, reason: "component_paused" };
  return { allowed: true, reason: "ok" };
}

// ----------------------------------------------------------------------
// Breach record (Slice 0a adapter shape)
// ----------------------------------------------------------------------

// Field names mirror the camelCase input of Slice 0a's recordAutopilotOutcome
// (api/lib/autopilotiq-outcome-ledger.ts in PR #1144) so a one-line adapter
// can forward these once 0a lands. outcomeReason="policy_block" is the
// natural fit in 0a's closed taxonomy.
export interface CircuitBreakRecord {
  jobId: string;
  parentJobId: string | null;
  taskType: "circuit_break";
  attemptN: number;
  outcome: "fail";
  outcomeReason: "policy_block";
  routeTaken: {
    seat: string | null;
    model: string | null;
    prompt_version: string;
    tool_set: string[] | null;
  };
  costSignal: {
    tokens: number | null;
    wall_ms: number | null;
    usd: number | null;
    retries: number | null;
  };
  receiptId: string | null;
  break_reason: CircuitBreakReason;
  break_detail: string;
}

export type CircuitBreakRecorder = (record: CircuitBreakRecord) => Promise<void> | void;

export interface RecordCircuitBreakInput {
  jobId: string;
  parentJobId?: string | null;
  attemptN?: number;
  verdict: CircuitBreakerVerdict;
  recorder?: CircuitBreakRecorder;
  receiptId?: string | null;
  routeTaken?: Partial<CircuitBreakRecord["routeTaken"]>;
}

/**
 * Build a circuit-break record and emit it through an optional recorder.
 * Returns `null` when the verdict is allow-true (no breach to record) and the
 * built record otherwise. Capture-only: the caller decides whether to also
 * halt the job; this helper just preserves the breach as evidence.
 */
export async function recordCircuitBreak(
  input: RecordCircuitBreakInput,
): Promise<CircuitBreakRecord | null> {
  if (input.verdict.allow || input.verdict.breached === null) return null;

  const route = input.routeTaken ?? {};
  const record: CircuitBreakRecord = {
    jobId: input.jobId,
    parentJobId: input.parentJobId ?? null,
    taskType: "circuit_break",
    attemptN: input.attemptN ?? 1,
    outcome: "fail",
    outcomeReason: "policy_block",
    routeTaken: {
      seat: route.seat ?? null,
      model: route.model ?? null,
      prompt_version: route.prompt_version ?? `circuit_break:${input.verdict.breached}`,
      tool_set: route.tool_set ?? null,
    },
    costSignal: {
      tokens: input.verdict.usage.tokens ?? null,
      wall_ms: input.verdict.usage.wall_ms ?? null,
      usd: input.verdict.usage.usd ?? null,
      retries: input.verdict.usage.retries ?? null,
    },
    receiptId: input.receiptId ?? null,
    break_reason: input.verdict.breached,
    break_detail: input.verdict.detail,
  };

  if (input.recorder) {
    await Promise.resolve(input.recorder(record));
  }
  return record;
}

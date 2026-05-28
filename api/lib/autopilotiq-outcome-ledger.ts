// AutopilotIQ outcome ledger (Phase 0, Slice 0a) - capture only.
//
// Immutable per-attempt record of what AutoPilot tried and how it ended. This
// module is the data-capture foundation for the AutopilotIQ learning layer
// (Boardroom 9e131baf). It is ADDITIVE: nothing in this slice reads these rows
// to change routing, scoring, or behaviour. Later phases read the ledger; they
// must not rewrite history.
//
// Safety: raw inputs are never stored (only a stable inputs_hash), and
// secret/credential-shaped fields are refused before any row is built.

import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

export const AUTOPILOT_OUTCOMES = ["success", "fail", "hold"] as const;
export type AutopilotOutcome = (typeof AUTOPILOT_OUTCOMES)[number];

// Closed outcome-reason taxonomy. Grouped by the outcome it usually explains,
// but the DB does not couple them - any listed reason is valid for any outcome.
export const AUTOPILOT_OUTCOME_REASONS = [
  // success
  "clean_pass",
  "proof_landed",
  "recovered",
  // hold
  "awaiting_proof",
  "awaiting_review",
  "gated_hold",
  // fail
  "xpass_fail",
  "tool_error",
  "model_refusal",
  "budget_exceeded",
  "user_revert",
  "timeout",
  "policy_block",
  "rate_limit",
  "missing_proof",
  "duplicate_claim",
  "stale_owner",
  "wrong_route",
  "unknown_error",
] as const;
export type AutopilotOutcomeReason = (typeof AUTOPILOT_OUTCOME_REASONS)[number];

export const AUTOPILOT_CONFIDENCE_LEVELS = ["hard_gate", "soft_gate", "silence"] as const;
export type AutopilotConfidence = (typeof AUTOPILOT_CONFIDENCE_LEVELS)[number];

export const AUTOPILOT_HUMAN_TOUCH_STATES = ["auto", "edited", "reverted", "approved"] as const;
export type AutopilotHumanTouch = (typeof AUTOPILOT_HUMAN_TOUCH_STATES)[number];

export const AUTOPILOT_XPASS_VERDICTS = [
  "PASS",
  "BLOCKER",
  "HOLD",
  "SUPPRESS",
  "ROUTE",
  "none",
] as const;
export type AutopilotXpassVerdict = (typeof AUTOPILOT_XPASS_VERDICTS)[number];

export interface AutopilotRouteTaken {
  seat?: string | null;
  model?: string | null;
  prompt_version?: string | null;
  tool_set?: string[] | null;
}

export interface AutopilotCostSignal {
  tokens?: number | null;
  wall_ms?: number | null;
  usd?: number | null;
  retries?: number | null;
}

export interface AutopilotOutcomeInput {
  apiKeyHash: string;
  jobId: string;
  parentJobId?: string | null;
  attemptN?: number;
  taskType: string;
  actorAgentId?: string | null;
  routeTaken?: AutopilotRouteTaken;
  // Raw inputs are hashed into inputs_hash and then discarded - never stored.
  inputs?: Record<string, unknown>;
  xpassVerdict?: AutopilotXpassVerdict | string;
  outcome: AutopilotOutcome | string;
  outcomeReason: AutopilotOutcomeReason | string;
  confidence?: AutopilotConfidence | string;
  costSignal?: AutopilotCostSignal;
  humanTouch?: AutopilotHumanTouch | string;
  receiptId?: string | null;
  closedAt?: Date | string | null;
  now?: Date;
}

export interface AutopilotOutcomeRow {
  api_key_hash: string;
  job_id: string;
  parent_job_id: string | null;
  attempt_n: number;
  task_type: string;
  actor_agent_id: string;
  route_taken: AutopilotRouteTaken;
  inputs_hash: string;
  xpass_verdict: AutopilotXpassVerdict;
  outcome: AutopilotOutcome;
  outcome_reason: AutopilotOutcomeReason;
  confidence: AutopilotConfidence;
  cost_signal: AutopilotCostSignal;
  human_touch: AutopilotHumanTouch;
  receipt_id: string | null;
  idempotency_key: string;
  created_at: string;
  closed_at: string | null;
}

const OUTCOME_SET = new Set<string>(AUTOPILOT_OUTCOMES);
const OUTCOME_REASON_SET = new Set<string>(AUTOPILOT_OUTCOME_REASONS);
const CONFIDENCE_SET = new Set<string>(AUTOPILOT_CONFIDENCE_LEVELS);
const HUMAN_TOUCH_SET = new Set<string>(AUTOPILOT_HUMAN_TOUCH_STATES);
const XPASS_VERDICT_SET = new Set<string>(AUTOPILOT_XPASS_VERDICTS);

const SENSITIVE_KEY_RE = /(api[_-]?key|secret|token|password|credential|authorization|cookie)/i;
const SENSITIVE_TEXT_RE =
  /(authorization:\s*bearer\s+\S+|uc_[a-f0-9]{16,}|sk-[a-z0-9_-]{12,}|gh[pousr]_[a-z0-9_]{20,})/i;

function compact(value: unknown, max = 500): string {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

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

function fiveSecondBucket(date: Date): string {
  return String(Math.floor(date.getTime() / 5000));
}

// Reject secret-shaped keys/text and strip unsupported value types. Used on the
// inputs (before hashing) and on route_taken so nothing sensitive is captured.
function sanitizeUnknown(key: string, value: unknown): unknown {
  if (SENSITIVE_KEY_RE.test(key)) {
    throw new Error(`Autopilot outcome payload contains sensitive key: ${key}`);
  }
  if (typeof value === "string") {
    const text = compact(value);
    if (SENSITIVE_TEXT_RE.test(text)) {
      throw new Error(`Autopilot outcome payload contains sensitive text in: ${key}`);
    }
    return text;
  }
  if (value == null || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeUnknown(key, item));
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([childKey, childValue]) => [
        childKey,
        sanitizeUnknown(childKey, childValue),
      ]),
    );
  }
  return undefined;
}

function sanitizeRecord(record: Record<string, unknown> = {}): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (SENSITIVE_KEY_RE.test(key)) {
      throw new Error(`Autopilot outcome payload contains sensitive key: ${key}`);
    }
    const safe = sanitizeUnknown(key, value);
    if (safe !== undefined) sanitized[key] = safe;
  }
  return sanitized;
}

function normalizeEnum(value: string, set: Set<string>, label: string): string {
  if (!set.has(value)) throw new Error(`Unsupported autopilot ${label}: ${value}`);
  return value;
}

function normalizeRouteTaken(route: AutopilotRouteTaken = {}): AutopilotRouteTaken {
  const sanitized = sanitizeRecord(route as Record<string, unknown>);
  const toolSet = Array.isArray(sanitized.tool_set)
    ? (sanitized.tool_set as unknown[]).map((item) => compact(item, 160)).filter(Boolean)
    : null;
  return {
    seat: sanitized.seat != null ? compact(sanitized.seat, 128) : null,
    model: sanitized.model != null ? compact(sanitized.model, 128) : null,
    prompt_version: sanitized.prompt_version != null ? compact(sanitized.prompt_version, 64) : null,
    tool_set: toolSet,
  };
}

function normalizeCostSignal(cost: AutopilotCostSignal = {}): AutopilotCostSignal {
  const num = (value: unknown): number | null =>
    typeof value === "number" && Number.isFinite(value) ? value : null;
  return {
    tokens: num(cost.tokens),
    wall_ms: num(cost.wall_ms),
    usd: num(cost.usd),
    retries: num(cost.retries),
  };
}

function toIso(value: Date | string | null | undefined): string | null {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/**
 * Build an immutable outcome-ledger row from an AutoPilot attempt. Pure: no I/O.
 * Validates closed taxonomies, refuses secret-shaped inputs, hashes the inputs
 * (never stores them raw), and derives a deterministic idempotency key.
 */
export function buildAutopilotOutcomeRow(input: AutopilotOutcomeInput): AutopilotOutcomeRow {
  const now = input.now ?? new Date();
  if (!input.apiKeyHash) throw new Error("api_key_hash required");

  const jobId = compact(input.jobId, 160);
  if (!jobId) throw new Error("job_id required");
  const taskType = compact(input.taskType, 120);
  if (!taskType) throw new Error("task_type required");

  const attemptN = input.attemptN ?? 1;
  if (!Number.isInteger(attemptN) || attemptN < 1) {
    throw new Error(`attempt_n must be an integer >= 1, got: ${input.attemptN}`);
  }

  const outcome = normalizeEnum(compact(input.outcome, 32), OUTCOME_SET, "outcome") as AutopilotOutcome;
  const outcomeReason = normalizeEnum(
    compact(input.outcomeReason, 48),
    OUTCOME_REASON_SET,
    "outcome_reason",
  ) as AutopilotOutcomeReason;
  const confidence = normalizeEnum(
    compact(input.confidence ?? "silence", 32),
    CONFIDENCE_SET,
    "confidence",
  ) as AutopilotConfidence;
  const humanTouch = normalizeEnum(
    compact(input.humanTouch ?? "auto", 32),
    HUMAN_TOUCH_SET,
    "human_touch",
  ) as AutopilotHumanTouch;
  const xpassVerdict = normalizeEnum(
    compact(input.xpassVerdict ?? "none", 16),
    XPASS_VERDICT_SET,
    "xpass_verdict",
  ) as AutopilotXpassVerdict;

  const routeTaken = normalizeRouteTaken(input.routeTaken);
  const costSignal = normalizeCostSignal(input.costSignal);

  // Inputs are sanitized (secrets refused), hashed, then discarded.
  const inputsHash = sha256(stableJson(sanitizeRecord(input.inputs ?? {})));

  const actorAgentId = compact(input.actorAgentId ?? "autopilot", 128) || "autopilot";
  const parentJobId = input.parentJobId != null ? compact(input.parentJobId, 160) || null : null;
  const receiptId = input.receiptId != null ? compact(input.receiptId, 160) || null : null;

  const idempotencyKey = [
    jobId,
    String(attemptN),
    outcome,
    outcomeReason,
    inputsHash,
    fiveSecondBucket(now),
  ].join(":");

  return {
    api_key_hash: input.apiKeyHash,
    job_id: jobId,
    parent_job_id: parentJobId,
    attempt_n: attemptN,
    task_type: taskType,
    actor_agent_id: actorAgentId,
    route_taken: routeTaken,
    inputs_hash: inputsHash,
    xpass_verdict: xpassVerdict,
    outcome,
    outcome_reason: outcomeReason,
    confidence,
    cost_signal: costSignal,
    human_touch: humanTouch,
    receipt_id: receiptId,
    idempotency_key: idempotencyKey,
    created_at: now.toISOString(),
    closed_at: toIso(input.closedAt),
  };
}

/**
 * Persist one outcome row. Capture-only: this writes to the ledger and returns;
 * no caller in this slice reads it back to influence routing or behaviour.
 */
export async function recordAutopilotOutcome(
  supabase: SupabaseClient,
  input: AutopilotOutcomeInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const row = buildAutopilotOutcomeRow(input);
    const { error } = await supabase
      .from("mc_autopilot_outcomes")
      .upsert(row, { onConflict: "api_key_hash,idempotency_key", ignoreDuplicates: true });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

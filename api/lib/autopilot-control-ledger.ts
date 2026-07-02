import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

export const AUTOPILOT_EVENT_TYPES = [
  "claim",
  "lease_grant",
  "lease_refresh",
  "lease_expired",
  "lane_check",
  "lane_violation",
  "release",
  "build_start",
  "build_end",
  "proof_request",
  "proof_result",
  "ack",
  "blocker",
  "merge_decision",
  "watch_start",
  "watch_end",
  "dispatch",
  "pick",
  "todo_state_change",
] as const;

export type AutopilotEventType = (typeof AUTOPILOT_EVENT_TYPES)[number];

export const AUTOPILOT_REF_KINDS = ["todo", "pr", "dispatch", "agent", "run"] as const;
export type AutopilotRefKind = (typeof AUTOPILOT_REF_KINDS)[number];

export interface AutopilotEventInput {
  apiKeyHash: string;
  eventType: AutopilotEventType | string;
  actorAgentId: string;
  refKind: AutopilotRefKind | string;
  refId: string;
  payload?: Record<string, unknown>;
  now?: Date;
}

export interface AutopilotEventRow {
  api_key_hash: string;
  event_type: AutopilotEventType;
  actor_agent_id: string;
  ref_kind: AutopilotRefKind;
  ref_id: string;
  payload: Record<string, unknown>;
  idempotency_key: string;
  created_at: string;
}

export interface AutopilotTouchMetricsRow {
  event_type: string;
  actor_agent_id: string;
  ref_kind: string;
  ref_id: string;
  payload: Record<string, unknown> | null;
  created_at: string;
}

export interface AutopilotZeroTouchRefMetric {
  ref_kind: string;
  ref_id: string;
  event_count: number;
  automation_event_count: number;
  human_touch_count: number;
  zero_touch: boolean;
  first_human_touch_at: string | null;
  last_event_at: string | null;
  human_touch_reasons: Record<string, number>;
}

export interface AutopilotZeroTouchMetrics {
  total_refs: number;
  zero_touch_refs: number;
  human_touched_refs: number;
  human_touch_count: number;
  automation_event_count: number;
  touch_reason_counts: Record<string, number>;
  refs: AutopilotZeroTouchRefMetric[];
}

export interface TodoLedgerPlanInput {
  todoId: string;
  actorAgentId: string;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  now?: Date;
}

export interface FishbowlPostLedgerInput {
  actorAgentId: string;
  messageId: string;
  threadId?: string | null;
  text: string;
  tags?: string[] | null;
  recipients?: string[] | null;
  now?: Date;
}

export interface AutoPilotKitRecommendationLedgerInput {
  actorAgentId: string;
  refId: string;
  refKind?: AutopilotRefKind | string;
  source?: string;
  recommendations?: Array<Record<string, unknown>> | null;
  now?: Date;
}

export interface AutopilotIqOutcomeLedgerInput {
  actorAgentId: string;
  refId: string;
  refKind?: AutopilotRefKind | string;
  source?: string;
  outcome?: string | null;
  learnedSignal?: string | null;
  proofRefs?: Array<Record<string, unknown> | string> | null;
  rewardDelta?: number | null;
  penaltyDelta?: number | null;
  confidence?: number | null;
  staleAfterDays?: number | null;
  now?: Date;
}

const EVENT_TYPE_SET = new Set<string>(AUTOPILOT_EVENT_TYPES);
const REF_KIND_SET = new Set<string>(AUTOPILOT_REF_KINDS);
const SENSITIVE_KEY_RE = /(api[_-]?key|secret|token|password|credential|authorization|cookie)/i;
const SENSITIVE_TEXT_RE =
  /(authorization:\s*bearer\s+\S+|uc_[a-f0-9]{16,}|sk-[a-z0-9_-]{12,}|[srpw][kh]_(?:live|test)_[a-z0-9]{10,}|whsec_[a-z0-9]{10,}|xox[bpra]-[a-z0-9-]{10,}|AKIA[A-Z0-9]{16,}|gh[pousr]_[a-z0-9_]{20,})/i;

function compact(value: unknown, max = 500): string {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function lowerText(value: unknown): string {
  return compact(value, 240).toLowerCase();
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
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

function normalizeEventType(value: string): AutopilotEventType {
  if (!EVENT_TYPE_SET.has(value)) throw new Error(`Unsupported autopilot event_type: ${value}`);
  return value as AutopilotEventType;
}

function normalizeRefKind(value: string): AutopilotRefKind {
  if (!REF_KIND_SET.has(value)) throw new Error(`Unsupported autopilot ref_kind: ${value}`);
  return value as AutopilotRefKind;
}

function incrementCount(map: Record<string, number>, key: string): void {
  map[key] = (map[key] ?? 0) + 1;
}

function boundedNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

const HUMAN_ACTOR_RE = /(^human[-_:]|^operator[-_:]|\boperator\b|\bhuman\b)/i;
const HUMAN_TOUCH_RE =
  /\b(human|operator|manual|operator_chat|human_operator_chat|live_chat|user_chat|walk[-_ ]?in)\b/i;
const HUMAN_TOUCH_BOOLEAN_KEYS = new Set([
  "human_touch",
  "operator_touch",
  "manual_touch",
  "requires_operator",
]);
const HUMAN_TOUCH_TEXT_KEYS = new Set([
  "actor_kind",
  "decision_source",
  "input_source",
  "origin",
  "route_source",
  "source",
  "trigger",
  "trigger_source",
  "wake_source",
]);

function humanTouchReasons(row: AutopilotTouchMetricsRow): string[] {
  const reasons = new Set<string>();
  if (HUMAN_ACTOR_RE.test(row.actor_agent_id)) reasons.add("human_actor");

  const payload = row.payload ?? {};
  for (const [key, value] of Object.entries(payload)) {
    const normalizedKey = key.toLowerCase();
    if (HUMAN_TOUCH_BOOLEAN_KEYS.has(normalizedKey) && value === true) {
      reasons.add(normalizedKey);
    }
    if (HUMAN_TOUCH_TEXT_KEYS.has(normalizedKey) && HUMAN_TOUCH_RE.test(lowerText(value))) {
      reasons.add(`${normalizedKey}:${lowerText(value).slice(0, 40)}`);
    }
  }

  return [...reasons].sort();
}

function sanitizeUnknown(key: string, value: unknown): unknown {
  if (SENSITIVE_KEY_RE.test(key)) {
    throw new Error(`Autopilot event payload contains sensitive key: ${key}`);
  }
  if (typeof value === "string") {
    const text = compact(value);
    if (SENSITIVE_TEXT_RE.test(text)) {
      throw new Error(`Autopilot event payload contains sensitive text in: ${key}`);
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

function sanitizePayload(payload: Record<string, unknown> = {}): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (SENSITIVE_KEY_RE.test(key)) {
      throw new Error(`Autopilot event payload contains sensitive key: ${key}`);
    }
    const safeValue = sanitizeUnknown(key, value);
    if (safeValue !== undefined) {
      sanitized[key] = safeValue;
    }
  }
  return sanitized;
}

export function buildAutopilotEventRow(input: AutopilotEventInput): AutopilotEventRow {
  const now = input.now ?? new Date();
  const eventType = normalizeEventType(input.eventType);
  const refKind = normalizeRefKind(input.refKind);
  if (!input.apiKeyHash) throw new Error("api_key_hash required");
  const actorAgentId = compact(input.actorAgentId, 128);
  const refId = compact(input.refId, 160);
  if (!actorAgentId) throw new Error("actor_agent_id required");
  if (!refId) throw new Error("ref_id required");

  const payload = sanitizePayload(input.payload ?? {});
  const payloadHash = sha256(stableJson(payload));
  const idempotencyKey = [
    eventType,
    refKind,
    refId,
    actorAgentId,
    payloadHash,
    fiveSecondBucket(now),
  ].join(":");

  return {
    api_key_hash: input.apiKeyHash,
    event_type: eventType,
    actor_agent_id: actorAgentId,
    ref_kind: refKind,
    ref_id: refId,
    payload,
    idempotency_key: idempotencyKey,
    created_at: now.toISOString(),
  };
}

export function createAutopilotZeroTouchMetrics(
  rows: AutopilotTouchMetricsRow[],
): AutopilotZeroTouchMetrics {
  const refs = new Map<string, AutopilotZeroTouchRefMetric>();
  const touchReasonCounts: Record<string, number> = {};
  let humanTouchCount = 0;
  let automationEventCount = 0;

  for (const row of rows) {
    const refKind = compact(row.ref_kind, 64) || "unknown";
    const refId = compact(row.ref_id, 160) || "unknown";
    const key = `${refKind}:${refId}`;
    const metric =
      refs.get(key) ??
      {
        ref_kind: refKind,
        ref_id: refId,
        event_count: 0,
        automation_event_count: 0,
        human_touch_count: 0,
        zero_touch: true,
        first_human_touch_at: null,
        last_event_at: null,
        human_touch_reasons: {},
      };

    metric.event_count++;
    if (!metric.last_event_at || row.created_at > metric.last_event_at) {
      metric.last_event_at = row.created_at;
    }

    const reasons = humanTouchReasons(row);
    if (reasons.length > 0) {
      metric.zero_touch = false;
      metric.human_touch_count++;
      humanTouchCount++;
      if (!metric.first_human_touch_at || row.created_at < metric.first_human_touch_at) {
        metric.first_human_touch_at = row.created_at;
      }
      for (const reason of reasons) {
        incrementCount(metric.human_touch_reasons, reason);
        incrementCount(touchReasonCounts, reason);
      }
    } else {
      metric.automation_event_count++;
      automationEventCount++;
    }

    refs.set(key, metric);
  }

  const refMetrics = [...refs.values()].sort((left, right) =>
    String(right.last_event_at ?? "").localeCompare(String(left.last_event_at ?? "")),
  );

  return {
    total_refs: refMetrics.length,
    zero_touch_refs: refMetrics.filter((metric) => metric.zero_touch).length,
    human_touched_refs: refMetrics.filter((metric) => !metric.zero_touch).length,
    human_touch_count: humanTouchCount,
    automation_event_count: automationEventCount,
    touch_reason_counts: touchReasonCounts,
    refs: refMetrics,
  };
}

export function planTodoLedgerEvents(input: TodoLedgerPlanInput): AutopilotEventInput[] {
  const before = input.before ?? {};
  const after = input.after ?? {};
  const events: AutopilotEventInput[] = [];
  const beforeStatus = typeof before.status === "string" ? before.status : null;
  const afterStatus = typeof after.status === "string" ? after.status : null;
  const beforeAssignee =
    typeof before.assigned_to_agent_id === "string" && before.assigned_to_agent_id.trim()
      ? before.assigned_to_agent_id.trim()
      : null;
  const afterAssignee =
    typeof after.assigned_to_agent_id === "string" && after.assigned_to_agent_id.trim()
      ? after.assigned_to_agent_id.trim()
      : null;

  if (beforeStatus !== afterStatus && afterStatus) {
    events.push({
      apiKeyHash: "",
      eventType: "todo_state_change",
      actorAgentId: input.actorAgentId,
      refKind: "todo",
      refId: input.todoId,
      now: input.now,
      payload: {
        from: beforeStatus,
        to: afterStatus,
        title: after.title ?? before.title ?? "",
      },
    });
  }

  if (beforeAssignee !== afterAssignee) {
    events.push({
      apiKeyHash: "",
      eventType: afterAssignee ? "claim" : "release",
      actorAgentId: input.actorAgentId,
      refKind: "todo",
      refId: input.todoId,
      now: input.now,
      payload: {
        from: beforeAssignee,
        to: afterAssignee,
        status: afterStatus ?? beforeStatus,
      },
    });
  }

  return events;
}

function extractAckFields(text: string): Record<string, string> | null {
  if (!/^ACK\b/i.test(text.trim())) return null;
  const fields: Record<string, string> = {};
  const labels: Record<string, string> = {
    "current chip": "current_chip",
    "next action": "next_action",
    eta: "eta",
    blocker: "blocker",
  };
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([^:]{2,40}):\s*(.+)$/);
    if (!match) continue;
    const key = labels[match[1].trim().toLowerCase()];
    if (key) fields[key] = compact(match[2], 300);
  }
  return Object.keys(fields).length > 0 ? fields : null;
}

export function planFishbowlPostLedgerEvent(input: FishbowlPostLedgerInput): AutopilotEventInput | null {
  const tagSet = new Set((input.tags ?? []).map((tag) => tag.toLowerCase()));
  const ackFields = extractAckFields(input.text);
  const now = input.now;

  if (ackFields) {
    return {
      apiKeyHash: "",
      eventType: "ack",
      actorAgentId: input.actorAgentId,
      refKind: "dispatch",
      refId: input.threadId || input.messageId,
      now,
      payload: {
        ...ackFields,
        message_id: input.messageId,
        thread_id: input.threadId ?? null,
      },
    };
  }

  if (tagSet.has("blocker") || /\bBLOCKER\b/i.test(input.text)) {
    return {
      apiKeyHash: "",
      eventType: "blocker",
      actorAgentId: input.actorAgentId,
      refKind: "run",
      refId: input.threadId || input.messageId,
      now,
      payload: {
        message_id: input.messageId,
        thread_id: input.threadId ?? null,
        reason: compact(input.text, 500),
      },
    };
  }

  if (tagSet.has("needs-doing") || tagSet.has("queuepush") || tagSet.has("wake")) {
    return {
      apiKeyHash: "",
      eventType: "dispatch",
      actorAgentId: input.actorAgentId,
      refKind: "dispatch",
      refId: input.messageId,
      now,
      payload: {
        thread_id: input.threadId ?? null,
        recipients: input.recipients ?? [],
        tags: input.tags ?? [],
      },
    };
  }

  return null;
}

export function planAutoPilotKitRecommendationLedgerEvents(
  input: AutoPilotKitRecommendationLedgerInput,
): AutopilotEventInput[] {
  const recommendations = Array.isArray(input.recommendations) ? input.recommendations : [];
  return recommendations
    .map((recommendation) => {
      const action = compact(recommendation.action, 120);
      const reason = compact(recommendation.reason, 160);
      if (!action || !reason) return null;
      const targetLane = compact(recommendation.target_lane, 120);
      const proofMessageId = compact(recommendation.proof_message_id, 160);
      const affectedAgentIds = Array.isArray(recommendation.affected_agent_ids)
        ? recommendation.affected_agent_ids.map((agentId) => compact(agentId, 128)).filter(Boolean).slice(0, 12)
        : [];

      return {
        apiKeyHash: "",
        eventType: "lane_check",
        actorAgentId: input.actorAgentId,
        refKind: input.refKind ?? "run",
        refId: input.refId,
        now: input.now,
        payload: {
          source: compact(input.source ?? "autopilotkit", 120),
          decision: "advisory",
          advisory: true,
          execute: false,
          recommendation_action: action,
          reason_code: reason,
          target_lane: targetLane || null,
          proof_message_id: proofMessageId || null,
          affected_agent_ids: affectedAgentIds,
        },
      } satisfies AutopilotEventInput;
    })
    .filter((event): event is AutopilotEventInput => event !== null);
}

function normalizeAutopilotIqOutcome(value: unknown): string {
  const outcome = lowerText(value);
  if (["win", "miss", "blocked", "stale", "neutral"].includes(outcome)) return outcome;
  return "neutral";
}

function normalizeProofRefs(
  proofRefs: Array<Record<string, unknown> | string> | null | undefined,
): Array<Record<string, unknown>> {
  if (!Array.isArray(proofRefs)) return [];
  return proofRefs
    .map((proofRef) => {
      if (typeof proofRef === "string") {
        const ref = compact(proofRef, 160);
        return ref ? { kind: "receipt", ref } : null;
      }
      if (!proofRef || typeof proofRef !== "object") return null;
      const kind = compact(proofRef.kind ?? "receipt", 40);
      const ref = compact(proofRef.ref ?? proofRef.id ?? proofRef.url ?? "", 160);
      const note = compact(proofRef.note ?? "", 240);
      if (!ref && !note) return null;
      return {
        kind: kind || "receipt",
        ref: ref || null,
        note: note || null,
      };
    })
    .filter((proofRef): proofRef is Record<string, unknown> => proofRef !== null)
    .slice(0, 8);
}

function defaultRewardDelta(outcome: string): number {
  if (outcome === "win") return 1;
  if (outcome === "neutral") return 0;
  return 0;
}

function defaultPenaltyDelta(outcome: string): number {
  if (outcome === "miss" || outcome === "blocked" || outcome === "stale") return 1;
  return 0;
}

export function planAutopilotIqOutcomeLedgerEvent(input: AutopilotIqOutcomeLedgerInput): AutopilotEventInput {
  const now = input.now ?? new Date();
  const outcome = normalizeAutopilotIqOutcome(input.outcome);
  const proofRefs = normalizeProofRefs(input.proofRefs);
  const rewardDelta = boundedNumber(input.rewardDelta, defaultRewardDelta(outcome), -10, 10);
  const penaltyDelta = boundedNumber(input.penaltyDelta, defaultPenaltyDelta(outcome), -10, 10);
  const requestedConfidence = boundedNumber(input.confidence, proofRefs.length > 0 ? 0.65 : 0.25, 0, 1);
  const confidence = proofRefs.length > 0 ? requestedConfidence : Math.min(requestedConfidence, 0.25);
  const staleAfterDays = Math.round(boundedNumber(input.staleAfterDays, 14, 1, 90));
  const staleAfter = new Date(now.getTime() + staleAfterDays * 24 * 60 * 60 * 1000).toISOString();
  const quarantineReasons: string[] = [];

  if (proofRefs.length === 0) quarantineReasons.push("missing_proof_refs");
  if (outcome === "miss" || outcome === "blocked" || outcome === "stale") {
    quarantineReasons.push("non_win_outcome");
  }
  if (confidence < 0.5) quarantineReasons.push("low_confidence");
  if (penaltyDelta > rewardDelta) quarantineReasons.push("penalty_exceeds_reward");

  return {
    apiKeyHash: "",
    eventType: "proof_result",
    actorAgentId: input.actorAgentId,
    refKind: input.refKind ?? "todo",
    refId: input.refId,
    now,
    payload: {
      schema_version: "autopilotiq_outcome_v1",
      source: compact(input.source ?? "autopilotiq", 120),
      storage: "mc_autopilot_events",
      capture_mode: "shadow",
      advisory: true,
      execute: false,
      applies_to_future_routing: false,
      outcome,
      learned_signal: compact(input.learnedSignal ?? "outcome captured for later replay", 240),
      reward_delta: rewardDelta,
      penalty_delta: penaltyDelta,
      confidence,
      proof_refs: proofRefs,
      stale_after: staleAfter,
      quarantine: quarantineReasons.length > 0,
      bad_learning_prevention: {
        shadow_mode_only: true,
        requires_proof_refs: true,
        stale_after_required: true,
        quarantine_reasons: quarantineReasons,
      },
    },
  };
}

export async function recordAutopilotEvent(
  supabase: SupabaseClient,
  input: AutopilotEventInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const row = buildAutopilotEventRow(input);
    const { error } = await supabase
      .from("mc_autopilot_events")
      .upsert(row, { onConflict: "api_key_hash,idempotency_key", ignoreDuplicates: true });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function recordAutopilotEvents(
  supabase: SupabaseClient,
  apiKeyHash: string,
  inputs: AutopilotEventInput[],
): Promise<void> {
  for (const input of inputs) {
    const result = await recordAutopilotEvent(supabase, { ...input, apiKeyHash });
    if (!result.ok) {
      console.warn("[autopilot_events] write skipped:", result.error);
    }
  }
}

import { createHash, randomUUID } from "node:crypto";

export type CommonSensePassVerdict = "PASS" | "BLOCKER" | "HOLD" | "SUPPRESS" | "ROUTE";

export type CommonSensePassClaimType =
  | "heartbeat_health"
  | "queuepush_wake"
  | "runner_no_work"
  | "merge_ready"
  | "done_claim"
  | "generic_state";

type RuleId =
  | "R1_NO_QUIET_IF_BACKLOG"
  | "R2_NO_DUPLICATE_WAKE_AFTER_PASS"
  | "R3_NO_NO_WORK_IF_CLAIMABLE"
  | "R4_NO_MERGE_READY_WITHOUT_FRESH_PROOF"
  | "R5_NO_DONE_WITHOUT_PROOF"
  | "R0_NO_MATCHING_RULE";

type Evidence = Record<string, unknown>;

export interface CommonSensePassInput {
  claim_type: CommonSensePassClaimType;
  claim?: string;
  evidence: Evidence;
  target?: string;
  source?: Record<string, unknown>;
  worker_id?: string;
}

export interface CommonSensePassResult {
  status: "complete";
  pass: "CommonSensePass";
  version: string;
  verdict: CommonSensePassVerdict;
  rule_id: RuleId;
  reason_code: string;
  summary: string;
  next_action: string;
  can_propagate_claim: boolean;
  should_notify: boolean;
  should_suppress_action: boolean;
  authority: {
    verdict_only: true;
    may_not: string[];
  };
  receipt: {
    id: string;
    line: string;
    evidence_fingerprint: string;
    evidence_keys: string[];
    generated_at: string;
  };
}

export const COMMONSENSEPASS_VERSION = "2026-05-13.v1";

const NO_ACTION_AUTHORITY = [
  "build",
  "merge",
  "approve",
  "close",
  "assign",
  "mark_done",
  "edit_source_state",
];

const QUEUE_WAKE_KINDS = new Set(["reviewer", "safety", "review", "reviewer_pass", "safety_pass"]);

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableJson(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function evidenceFingerprint(evidence: Evidence): string {
  return createHash("sha256").update(stableJson(evidence)).digest("hex").slice(0, 16);
}

function numberValue(evidence: Evidence, keys: string[]): number | null {
  for (const key of keys) {
    const raw = evidence[key];
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

function booleanValue(evidence: Evidence, keys: string[]): boolean | null {
  for (const key of keys) {
    const raw = evidence[key];
    if (typeof raw === "boolean") return raw;
    if (typeof raw === "string") {
      const normalized = raw.trim().toLowerCase();
      if (["true", "yes", "1", "pass", "passed", "green", "success"].includes(normalized)) return true;
      if (["false", "no", "0", "fail", "failed", "red", "blocked"].includes(normalized)) return false;
    }
  }
  return null;
}

function stringValue(evidence: Evidence, keys: string[]): string | null {
  for (const key of keys) {
    const raw = evidence[key];
    if (typeof raw === "string" && raw.trim()) return raw.trim();
  }
  return null;
}

function stringArrayValue(evidence: Evidence, keys: string[]): string[] {
  for (const key of keys) {
    const raw = evidence[key];
    if (Array.isArray(raw)) {
      return raw.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
    }
    if (typeof raw === "string" && raw.trim()) return [raw.trim()];
  }
  return [];
}

function lower(value: string | null): string {
  return value?.trim().toLowerCase() ?? "";
}

function hasProof(evidence: Evidence): boolean {
  const proofRefs = stringArrayValue(evidence, ["proof_refs", "proof", "proof_ids", "receipts"]);
  return proofRefs.length > 0 ||
    Boolean(stringValue(evidence, ["run_id", "pr_link", "sha", "head_sha", "proof_id", "proof_url"]));
}

function checksAreGreen(evidence: Evidence): boolean | null {
  const explicit = booleanValue(evidence, ["checks_green", "checks_passed", "checks_ok"]);
  if (explicit !== null) return explicit;
  const status = lower(stringValue(evidence, ["checks_status", "check_status", "ci_status"]));
  if (!status) return null;
  return ["green", "passing", "passed", "success", "successful", "complete"].includes(status);
}

function passOnCurrentHead(evidence: Evidence, passKeys: string[]): boolean | null {
  const explicit = booleanValue(evidence, passKeys);
  if (explicit !== null) return explicit;

  const currentHead = stringValue(evidence, ["current_head_sha", "head_sha", "sha"]);
  if (!currentHead) return null;

  const headKey = passKeys.find((key) => key.endsWith("_current"));
  const passHead = headKey
    ? stringValue(evidence, [headKey.replace("_current", "_head_sha")])
    : null;
  if (!passHead) return null;
  return passHead === currentHead;
}

function line(verdict: CommonSensePassVerdict, ruleId: RuleId, reasonCode: string, nextAction: string): string {
  return `${verdict}: ${ruleId}; reason=${reasonCode}; next=${nextAction}`;
}

function result(
  input: CommonSensePassInput,
  verdict: CommonSensePassVerdict,
  ruleId: RuleId,
  reasonCode: string,
  summary: string,
  nextAction: string,
): CommonSensePassResult {
  const evidenceKeys = Object.keys(input.evidence).sort();
  return {
    status: "complete",
    pass: "CommonSensePass",
    version: COMMONSENSEPASS_VERSION,
    verdict,
    rule_id: ruleId,
    reason_code: reasonCode,
    summary,
    next_action: nextAction,
    can_propagate_claim: verdict === "PASS",
    should_notify: verdict === "BLOCKER" || verdict === "HOLD" || verdict === "ROUTE",
    should_suppress_action: verdict === "SUPPRESS",
    authority: {
      verdict_only: true,
      may_not: NO_ACTION_AUTHORITY,
    },
    receipt: {
      id: randomUUID(),
      line: line(verdict, ruleId, reasonCode, nextAction),
      evidence_fingerprint: evidenceFingerprint(input.evidence),
      evidence_keys: evidenceKeys,
      generated_at: new Date().toISOString(),
    },
  };
}

function normalizeClaimType(raw: unknown): CommonSensePassClaimType {
  if (
    raw === "heartbeat_health" ||
    raw === "queuepush_wake" ||
    raw === "runner_no_work" ||
    raw === "merge_ready" ||
    raw === "done_claim" ||
    raw === "generic_state"
  ) {
    return raw;
  }
  return "generic_state";
}

function normalizeInput(args: Record<string, unknown>): CommonSensePassInput | { error: string } {
  const evidence = args.evidence;
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    return { error: "evidence object is required" };
  }

  return {
    claim_type: normalizeClaimType(args.claim_type),
    claim: typeof args.claim === "string" ? args.claim : undefined,
    evidence: evidence as Evidence,
    target: typeof args.target === "string" ? args.target : undefined,
    source: args.source && typeof args.source === "object" && !Array.isArray(args.source)
      ? args.source as Record<string, unknown>
      : undefined,
    worker_id: typeof args.worker_id === "string" ? args.worker_id : undefined,
  };
}

function evaluateHeartbeatHealth(input: CommonSensePassInput): CommonSensePassResult {
  const activeJobs = numberValue(input.evidence, ["active_jobs", "active_todo_count", "active_job_count"]);
  const visibleBacklog = numberValue(input.evidence, [
    "visible_backlog",
    "actionable_todos",
    "actionable_todo_count",
    "open_jobs",
    "backlog_count",
  ]);
  const heldBacklog = numberValue(input.evidence, ["held_backlog", "held_todos", "held_count"]) ?? 0;
  const recentClaimAttempt = booleanValue(input.evidence, ["recent_claim_attempt", "has_recent_claim_attempt"]) ?? false;

  if (activeJobs === null || visibleBacklog === null) {
    return result(
      input,
      "HOLD",
      "R1_NO_QUIET_IF_BACKLOG",
      "insufficient_evidence",
      "Heartbeat health needs both active_jobs and visible backlog counts before it can be trusted.",
      "Fetch list_todos/list_actionable_todos and rerun CommonSensePass.",
    );
  }

  const unheldBacklog = Math.max(0, visibleBacklog - heldBacklog);
  if (activeJobs === 0 && unheldBacklog > 0 && !recentClaimAttempt) {
    return result(
      input,
      "BLOCKER",
      "R1_NO_QUIET_IF_BACKLOG",
      "queue_hydration_failure",
      `Health claim contradicts queue evidence: 0 active jobs but ${unheldBacklog} unheld backlog item(s).`,
      "Report BLOCKER and include the claimability or skip reasons for the backlog.",
    );
  }

  if (activeJobs === 0 && unheldBacklog > 0) {
    return result(
      input,
      "HOLD",
      "R1_NO_QUIET_IF_BACKLOG",
      "recent_attempt_needs_receipt",
      `Backlog exists and a recent claim attempt was observed, so quiet is not yet proven.`,
      "Wait for the claim attempt receipt or report the exact missing proof.",
    );
  }

  return result(
    input,
    "PASS",
    "R1_NO_QUIET_IF_BACKLOG",
    "backlog_supported",
    "Heartbeat health is supported by active job and backlog evidence.",
    "Continue with the normal compact heartbeat receipt.",
  );
}

function evaluateQueueWake(input: CommonSensePassInput): CommonSensePassResult {
  const wakeKind = lower(stringValue(input.evidence, ["wake_kind", "wake_lane", "target_lane"]));
  const currentHead = stringValue(input.evidence, ["current_head_sha", "head_sha", "sha"]);
  const existingPassHead = stringValue(input.evidence, [
    "existing_pass_head_sha",
    "reviewer_pass_head_sha",
    "safety_pass_head_sha",
  ]);
  const explicitPass = booleanValue(input.evidence, [
    "existing_pass_on_current_head",
    "reviewer_pass_current",
    "safety_pass_current",
  ]);

  if (!wakeKind || !currentHead) {
    return result(
      input,
      "HOLD",
      "R2_NO_DUPLICATE_WAKE_AFTER_PASS",
      "insufficient_evidence",
      "QueuePush wake checks need wake kind and current head SHA.",
      "Fetch wake lane plus current PR head SHA and rerun CommonSensePass.",
    );
  }

  const isPassLane = QUEUE_WAKE_KINDS.has(wakeKind);
  const hasCurrentPass = explicitPass === true || (Boolean(existingPassHead) && existingPassHead === currentHead);
  if (isPassLane && hasCurrentPass) {
    return result(
      input,
      "SUPPRESS",
      "R2_NO_DUPLICATE_WAKE_AFTER_PASS",
      "duplicate_wake_after_pass",
      "Wake request targets a lane that already passed on the current head SHA.",
      "Suppress the duplicate wake and cite the existing PASS proof.",
    );
  }

  return result(
    input,
    "PASS",
    "R2_NO_DUPLICATE_WAKE_AFTER_PASS",
    "wake_not_duplicate",
    "No current-head PASS receipt was provided for this wake lane.",
    "Allow the wake to continue through the normal QueuePush path.",
  );
}

function evaluateRunnerNoWork(input: CommonSensePassInput): CommonSensePassResult {
  const actionable = numberValue(input.evidence, [
    "list_actionable_todos",
    "actionable_todos",
    "actionable_todo_count",
    "claimable_jobs",
  ]);
  if (actionable === null) {
    return result(
      input,
      "HOLD",
      "R3_NO_NO_WORK_IF_CLAIMABLE",
      "insufficient_evidence",
      "Runner no-work claims need an actionable todo count.",
      "Fetch list_actionable_todos and rerun CommonSensePass.",
    );
  }

  if (actionable > 0) {
    return result(
      input,
      "BLOCKER",
      "R3_NO_NO_WORK_IF_CLAIMABLE",
      "runner_no_work_contradiction",
      `Runner no-work claim contradicts ${actionable} claimable item(s).`,
      "Return BLOCKER with skip reasons for each claimable item.",
    );
  }

  return result(
    input,
    "PASS",
    "R3_NO_NO_WORK_IF_CLAIMABLE",
    "no_claimable_jobs_supported",
    "Runner no-work claim is supported by the actionable todo count.",
    "Continue with a compact no-work receipt.",
  );
}

function evaluateMergeReady(input: CommonSensePassInput): CommonSensePassResult {
  const currentHead = stringValue(input.evidence, ["current_head_sha", "head_sha", "sha"]);
  const draft = booleanValue(input.evidence, ["draft", "is_draft", "pr_draft"]);
  const checksGreen = checksAreGreen(input.evidence);
  const reviewerCurrent = passOnCurrentHead(input.evidence, ["reviewer_pass_current"]);
  const safetyCurrent = passOnCurrentHead(input.evidence, ["safety_pass_current"]);

  const missing: string[] = [];
  if (!currentHead) missing.push("current_head_sha");
  if (draft === true) missing.push("not_draft");
  if (checksGreen !== true) missing.push("green_checks");
  if (reviewerCurrent !== true) missing.push("reviewer_pass_current_head");
  if (safetyCurrent !== true) missing.push("safety_pass_current_head");

  if (missing.includes("current_head_sha")) {
    return result(
      input,
      "HOLD",
      "R4_NO_MERGE_READY_WITHOUT_FRESH_PROOF",
      "insufficient_evidence",
      "Merge-ready claims need the current head SHA before other proof can be trusted.",
      "Fetch current head SHA, checks, Reviewer PASS, and Safety PASS.",
    );
  }

  if (missing.length > 0) {
    return result(
      input,
      "BLOCKER",
      "R4_NO_MERGE_READY_WITHOUT_FRESH_PROOF",
      "merge_ready_missing_fresh_proof",
      `Merge-ready claim is missing: ${missing.join(", ")}.`,
      "Block merge-ready propagation until every missing proof is current.",
    );
  }

  return result(
    input,
    "PASS",
    "R4_NO_MERGE_READY_WITHOUT_FRESH_PROOF",
    "merge_ready_supported",
    "Merge-ready claim is backed by current head, green checks, Reviewer PASS, and Safety PASS.",
    "Allow the merge-ready claim to propagate to the normal authority lane.",
  );
}

function evaluateDoneClaim(input: CommonSensePassInput): CommonSensePassResult {
  const todoStatus = lower(stringValue(input.evidence, ["todo_status", "status"]));
  const claimText = lower(input.claim ?? "");
  const looksDone = todoStatus === "done" ||
    todoStatus === "complete" ||
    todoStatus === "completed" ||
    /\b(done|complete|completed|shipped|closed)\b/.test(claimText);

  if (!looksDone) {
    return result(
      input,
      "PASS",
      "R5_NO_DONE_WITHOUT_PROOF",
      "not_a_done_claim",
      "The claim is not a done/completed claim.",
      "Continue through the relevant non-done rule if needed.",
    );
  }

  if (!hasProof(input.evidence)) {
    return result(
      input,
      "BLOCKER",
      "R5_NO_DONE_WITHOUT_PROOF",
      "done_without_proof",
      "Done claim has no proof reference, run id, PR link, or SHA.",
      "Attach proof before allowing the done claim to propagate.",
    );
  }

  return result(
    input,
    "PASS",
    "R5_NO_DONE_WITHOUT_PROOF",
    "done_claim_supported",
    "Done claim includes a proof reference.",
    "Allow the done claim to propagate to the normal authority lane.",
  );
}

function inferGeneric(input: CommonSensePassInput): CommonSensePassResult {
  const claimText = lower(input.claim ?? "");
  if (/\b(healthy|quiet|all quiet|no blockers)\b/.test(claimText)) {
    return evaluateHeartbeatHealth({ ...input, claim_type: "heartbeat_health" });
  }
  if (/\b(no work|no claimable|nothing to do)\b/.test(claimText)) {
    return evaluateRunnerNoWork({ ...input, claim_type: "runner_no_work" });
  }
  if (/\b(merge ready|ready to merge|ready for merge)\b/.test(claimText)) {
    return evaluateMergeReady({ ...input, claim_type: "merge_ready" });
  }
  if (/\b(done|complete|completed|shipped|closed)\b/.test(claimText)) {
    return evaluateDoneClaim({ ...input, claim_type: "done_claim" });
  }
  return result(
    input,
    "HOLD",
    "R0_NO_MATCHING_RULE",
    "no_matching_rule",
    "No deterministic CommonSensePass rule matched this claim.",
    "Route to the narrow Pass or worker lane that owns this claim type.",
  );
}

export function evaluateCommonSensePass(input: CommonSensePassInput): CommonSensePassResult {
  switch (input.claim_type) {
    case "heartbeat_health":
      return evaluateHeartbeatHealth(input);
    case "queuepush_wake":
      return evaluateQueueWake(input);
    case "runner_no_work":
      return evaluateRunnerNoWork(input);
    case "merge_ready":
      return evaluateMergeReady(input);
    case "done_claim":
      return evaluateDoneClaim(input);
    case "generic_state":
      return inferGeneric(input);
  }
}

export async function commonsensepassCheck(args: Record<string, unknown>): Promise<unknown> {
  const input = normalizeInput(args);
  if ("error" in input) return input;
  return evaluateCommonSensePass(input);
}

export async function commonsensepassRules(): Promise<unknown> {
  return {
    pass: "CommonSensePass",
    version: COMMONSENSEPASS_VERSION,
    posture: "deterministic-first, evidence-bound, verdict-only",
    verdicts: ["PASS", "BLOCKER", "HOLD", "SUPPRESS", "ROUTE"],
    rules: [
      {
        id: "R1_NO_QUIET_IF_BACKLOG",
        claim_type: "heartbeat_health",
        summary: "Do not call the system quiet or healthy when unheld backlog exists and active jobs are zero.",
      },
      {
        id: "R2_NO_DUPLICATE_WAKE_AFTER_PASS",
        claim_type: "queuepush_wake",
        summary: "Suppress Reviewer or Safety wakes that already have a PASS on the current head SHA.",
      },
      {
        id: "R3_NO_NO_WORK_IF_CLAIMABLE",
        claim_type: "runner_no_work",
        summary: "Do not accept a no-work claim when actionable or claimable todos exist.",
      },
      {
        id: "R4_NO_MERGE_READY_WITHOUT_FRESH_PROOF",
        claim_type: "merge_ready",
        summary: "Do not accept merge-ready claims without current head, green checks, Reviewer PASS, and Safety PASS.",
      },
      {
        id: "R5_NO_DONE_WITHOUT_PROOF",
        claim_type: "done_claim",
        summary: "Do not accept done/completed claims without proof references.",
      },
    ],
    authority: {
      verdict_only: true,
      may_not: NO_ACTION_AUTHORITY,
    },
  };
}

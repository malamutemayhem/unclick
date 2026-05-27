/**
 * Local CommonSensePass runtime for the HTTP MCP bundle.
 *
 * The standalone @unclick/commonsensepass package remains the product package,
 * but Vercel's function tracer did not include that workspace symlink inside
 * /api/mcp. Keeping this small verdict runtime local prevents MCP startup from
 * crashing when only the MCP source tree is bundled.
 */

export type Verdict = "PASS" | "BLOCKER" | "HOLD" | "SUPPRESS" | "ROUTE";

export type ClaimKind =
  | "healthy"
  | "quiet"
  | "no_work"
  | "pass"
  | "done"
  | "merge_ready"
  | "duplicate_wake"
  | "route";

export type RuleId = "R1" | "R2" | "R3" | "R4" | "R5" | "R6";

export interface Evidence {
  kind: string;
  ref: string;
  note?: string;
  source_kind?: string;
  source_id?: string;
  fetched_at?: string;
  head_sha?: string;
  run_id?: string;
  proof_refs?: string[];
  evidence_fingerprint?: string;
  freshness_window_ms?: number;
}

export interface CommonSensePassResult {
  verdict: Verdict;
  rule_id: RuleId | null;
  reason: string;
  evidence: Evidence[];
  next_action?: string;
  route_to?: string;
}

export type TodoStatus =
  | "actionable"
  | "in_progress"
  | "blocked"
  | "queued"
  | "done";

export interface TodoSnapshot {
  id: string;
  status: TodoStatus;
  pipeline?: number;
  owner?: string;
  owner_last_seen_ms?: number;
  closing_ref?: string;
}

export interface ReviewSnapshot {
  verdict: "PASS" | "BLOCKER" | "HOLD" | null;
  sha: string;
}

export interface PRSnapshot {
  number: number;
  head_sha: string;
  mergeable: boolean;
  checks_state: "success" | "failure" | "pending" | "neutral";
  reviewer_pass?: ReviewSnapshot;
  safety_pass?: ReviewSnapshot;
}

export interface WakeSnapshot {
  id: string;
  state_fingerprint: string;
  emitted_ms: number;
}

export interface ClaimContext {
  now_ms: number;
  current_head_sha?: string;
  commented_on_sha?: string;
  todos?: TodoSnapshot[];
  active_jobs?: number;
  pr?: PRSnapshot;
  recent_wakes?: WakeSnapshot[];
  current_wake?: WakeSnapshot;
  subject_todo_id?: string;
  current_lane?: string;
  required_lane?: string;
  route_to?: string;
}

export interface ClaimInput {
  claim: ClaimKind;
  context: ClaimContext;
  evidence?: Evidence[];
}

export interface CommonSensePassRuleMetadata {
  id: RuleId;
  title: string;
  claims: ClaimKind[];
  possible_verdicts: Verdict[];
  evidence_required: string[];
  summary: string;
}

export interface CommonSensePassFixture {
  id: string;
  title: string;
  expected_verdict: Verdict;
  input?: ClaimInput;
  expected_rule_id?: CommonSensePassResult["rule_id"];
  reserved_result?: CommonSensePassResult;
  notes: string;
}

export const OWNER_FRESH_WINDOW_MS = 24 * 60 * 60 * 1000;
export const DUPLICATE_WAKE_WINDOW_MS = 10 * 60 * 1000;

export const COMMONSENSEPASS_RULE_METADATA: readonly CommonSensePassRuleMetadata[] = [
  {
    id: "R1",
    title: "No quiet if backlog or fresh active work exists",
    claims: ["healthy", "quiet", "no_work"],
    possible_verdicts: ["PASS", "BLOCKER"],
    evidence_required: ["todos", "active_jobs", "owner_last_seen_ms", "now_ms"],
    summary:
      "Blocks healthy, quiet, or no_work claims when actionable todos are queued or active_jobs underreports fresh in-progress work.",
  },
  {
    id: "R2",
    title: "PASS must be on the current head SHA",
    claims: ["pass"],
    possible_verdicts: ["PASS", "HOLD", "BLOCKER"],
    evidence_required: ["current_head_sha", "commented_on_sha"],
    summary:
      "Holds when SHA evidence is missing and blocks PASS receipts authored on stale heads.",
  },
  {
    id: "R3",
    title: "Duplicate wake suppression",
    claims: ["duplicate_wake"],
    possible_verdicts: ["PASS", "HOLD", "SUPPRESS"],
    evidence_required: ["current_wake", "recent_wakes", "state_fingerprint", "now_ms"],
    summary:
      "Suppresses repeated wakes with the same wake id and state fingerprint inside the duplicate window.",
  },
  {
    id: "R4",
    title: "Done requires closing proof",
    claims: ["done"],
    possible_verdicts: ["PASS", "HOLD", "BLOCKER"],
    evidence_required: ["subject_todo_id", "pipeline", "closing_ref"],
    summary:
      "Blocks done claims unless the target todo has pipeline 100 and a closing PR or commit reference.",
  },
  {
    id: "R5",
    title: "Merge-ready requires fresh review and safety proof",
    claims: ["merge_ready"],
    possible_verdicts: ["PASS", "HOLD", "BLOCKER"],
    evidence_required: [
      "pr.number",
      "pr.head_sha",
      "pr.mergeable",
      "pr.checks_state",
      "reviewer_pass.sha",
      "safety_pass.sha",
    ],
    summary:
      "Blocks merge-ready claims when checks, mergeability, Reviewer PASS, or Safety PASS are missing or stale.",
  },
  {
    id: "R6",
    title: "Route work to the canonical specialist lane",
    claims: ["route"],
    possible_verdicts: ["PASS", "HOLD", "ROUTE"],
    evidence_required: ["current_lane", "required_lane"],
    summary:
      "Routes work away from the current worker when the evidence says a different specialist lane owns it.",
  },
] as const;

const NOW_MS = 1_765_000_000_000;
const HEAD_SHA = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const STALE_SHA = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";

export const COMMONSENSEPASS_WORKER_FIXTURES = [
  {
    id: "false-quiet-with-backlog",
    title: "False quiet while actionable work exists",
    expected_verdict: "BLOCKER",
    expected_rule_id: "R1",
    input: {
      claim: "quiet",
      context: {
        now_ms: NOW_MS,
        active_jobs: 0,
        todos: [{ id: "todo-actionable-1", status: "actionable" }],
      },
    },
    notes: "Worker says quiet, but a queued todo is waiting.",
  },
  {
    id: "no-work-with-backlog",
    title: "No-work claim with backlog",
    expected_verdict: "BLOCKER",
    expected_rule_id: "R1",
    input: {
      claim: "no_work",
      context: {
        now_ms: NOW_MS,
        active_jobs: 0,
        todos: [
          { id: "todo-actionable-2", status: "actionable" },
          { id: "todo-queued-1", status: "queued" },
        ],
      },
    },
    notes: "Worker says there is no work, but actionable queue depth is nonzero.",
  },
  {
    id: "fresh-active-job-underreported",
    title: "Fresh in-progress job underreported as zero active jobs",
    expected_verdict: "BLOCKER",
    expected_rule_id: "R1",
    input: {
      claim: "healthy",
      context: {
        now_ms: NOW_MS,
        active_jobs: 0,
        todos: [
          {
            id: "todo-active-fresh",
            status: "in_progress",
            owner: "runner-builder",
            owner_last_seen_ms: NOW_MS - 60_000,
          },
        ],
      },
    },
    notes: "The pinned active_jobs formula should count fresh owned in-progress work.",
  },
  {
    id: "quiet-empty-queue-pass",
    title: "Quiet claim with empty queue",
    expected_verdict: "PASS",
    expected_rule_id: "R1",
    input: {
      claim: "quiet",
      context: {
        now_ms: NOW_MS,
        active_jobs: 0,
        todos: [],
      },
    },
    notes: "Baseline PASS for a genuinely empty queue.",
  },
  {
    id: "stale-proof-pass",
    title: "PASS proof posted on a stale SHA",
    expected_verdict: "BLOCKER",
    expected_rule_id: "R2",
    input: {
      claim: "pass",
      context: {
        now_ms: NOW_MS,
        current_head_sha: HEAD_SHA,
        commented_on_sha: STALE_SHA,
      },
    },
    notes: "A stale PASS must be re-reviewed on the current head.",
  },
  {
    id: "pass-missing-sha-hold",
    title: "PASS proof missing SHA evidence",
    expected_verdict: "HOLD",
    expected_rule_id: "R2",
    input: {
      claim: "pass",
      context: {
        now_ms: NOW_MS,
        current_head_sha: HEAD_SHA,
      },
    },
    notes: "Freshness cannot be checked until both SHA fields are present.",
  },
  {
    id: "duplicate-wake-suppress",
    title: "Duplicate wake with unchanged state",
    expected_verdict: "SUPPRESS",
    expected_rule_id: "R3",
    input: {
      claim: "duplicate_wake",
      context: {
        now_ms: NOW_MS,
        current_wake: {
          id: "wake-123",
          state_fingerprint: "same-state",
          emitted_ms: NOW_MS,
        },
        recent_wakes: [
          {
            id: "wake-123",
            state_fingerprint: "same-state",
            emitted_ms: NOW_MS - 60_000,
          },
        ],
      },
    },
    notes: "Repeated wake adds no signal and should be suppressed.",
  },
  {
    id: "done-without-proof",
    title: "Done claim without complete proof",
    expected_verdict: "BLOCKER",
    expected_rule_id: "R4",
    input: {
      claim: "done",
      context: {
        now_ms: NOW_MS,
        subject_todo_id: "todo-done-weak",
        todos: [
          {
            id: "todo-done-weak",
            status: "in_progress",
            pipeline: 80,
          },
        ],
      },
    },
    notes: "Done needs pipeline 100 and a closing PR or commit reference.",
  },
  {
    id: "done-with-proof-pass",
    title: "Done claim with closing proof",
    expected_verdict: "PASS",
    expected_rule_id: "R4",
    input: {
      claim: "done",
      context: {
        now_ms: NOW_MS,
        subject_todo_id: "todo-done-strong",
        todos: [
          {
            id: "todo-done-strong",
            status: "in_progress",
            pipeline: 100,
            closing_ref: "PR #892",
          },
        ],
      },
    },
    notes: "A done claim is acceptable when both required proof fields are present.",
  },
  {
    id: "merge-ready-without-proof",
    title: "Merge-ready claim missing Reviewer and Safety PASS",
    expected_verdict: "HOLD",
    expected_rule_id: "R5",
    input: {
      claim: "merge_ready",
      context: {
        now_ms: NOW_MS,
        pr: {
          number: 892,
          head_sha: HEAD_SHA,
          mergeable: true,
          checks_state: "success",
        },
      },
    },
    notes: "A green PR still needs Reviewer PASS and Safety PASS on head.",
  },
  {
    id: "merge-ready-red-checks",
    title: "Merge-ready claim with failing checks",
    expected_verdict: "BLOCKER",
    expected_rule_id: "R5",
    input: {
      claim: "merge_ready",
      context: {
        now_ms: NOW_MS,
        pr: {
          number: 893,
          head_sha: HEAD_SHA,
          mergeable: true,
          checks_state: "failure",
          reviewer_pass: { verdict: "PASS", sha: HEAD_SHA },
          safety_pass: { verdict: "PASS", sha: HEAD_SHA },
        },
      },
    },
    notes: "Failing checks stop autopilot merge even when review proof exists.",
  },
  {
    id: "merge-ready-with-proof-pass",
    title: "Merge-ready claim with complete proof",
    expected_verdict: "PASS",
    expected_rule_id: "R5",
    input: {
      claim: "merge_ready",
      context: {
        now_ms: NOW_MS,
        pr: {
          number: 894,
          head_sha: HEAD_SHA,
          mergeable: true,
          checks_state: "success",
          reviewer_pass: { verdict: "PASS", sha: HEAD_SHA },
          safety_pass: { verdict: "PASS", sha: HEAD_SHA },
        },
      },
    },
    notes: "Autopilot merge proof is complete and current.",
  },
  {
    id: "route-specialist-lane",
    title: "Route work to the specialist lane",
    expected_verdict: "ROUTE",
    expected_rule_id: "R6",
    input: {
      claim: "route",
      context: {
        now_ms: NOW_MS,
        current_lane: "general-worker",
        required_lane: "securitypass",
        route_to: "securitypass",
      },
    },
    notes: "Work that belongs to a specialist lane should be routed, not self-assigned by the wrong worker.",
  },
  {
    id: "route-current-lane-pass",
    title: "Route claim already on the correct lane",
    expected_verdict: "PASS",
    expected_rule_id: "R6",
    input: {
      claim: "route",
      context: {
        now_ms: NOW_MS,
        current_lane: "securitypass",
        required_lane: "securitypass",
      },
    },
    notes: "A worker on the canonical lane can continue.",
  },
] satisfies readonly CommonSensePassFixture[];

export function fixtureIdsByVerdict(
  fixtures: readonly CommonSensePassFixture[] = COMMONSENSEPASS_WORKER_FIXTURES,
): Record<Verdict, string[]> {
  const ids: Record<Verdict, string[]> = {
    PASS: [],
    BLOCKER: [],
    HOLD: [],
    SUPPRESS: [],
    ROUTE: [],
  };

  for (const fixture of fixtures) {
    ids[fixture.expected_verdict].push(fixture.id);
  }

  return ids;
}

type RuleFn = (input: ClaimInput) => CommonSensePassResult | null;

const RULES: RuleFn[] = [checkR1, checkR2, checkR3, checkR4, checkR5, checkR6];

export function commonsensepassCheck(input: ClaimInput): CommonSensePassResult {
  for (const rule of RULES) {
    const result = rule(input);
    if (result) return result;
  }
  return {
    verdict: "HOLD",
    rule_id: null,
    reason: `Claim "${input.claim}" matched no rule; CommonSensePass cannot verify it.`,
    evidence: input.evidence ?? [],
    next_action: "use_supported_claim_kind_or_add_rule",
  };
}

function pickSubject(input: ClaimInput): TodoSnapshot | undefined {
  const todos = input.context.todos ?? [];
  if (input.context.subject_todo_id) {
    return todos.find((todo) => todo.id === input.context.subject_todo_id);
  }
  return todos[0];
}

function checkR1(input: ClaimInput): CommonSensePassResult | null {
  if (
    input.claim !== "healthy" &&
    input.claim !== "quiet" &&
    input.claim !== "no_work"
  ) {
    return null;
  }
  const todos = input.context.todos ?? [];
  const now = input.context.now_ms;

  const actionable = todos.filter((todo) => todo.status === "actionable");
  const inProgressFresh = todos.filter(
    (todo) =>
      todo.status === "in_progress" &&
      typeof todo.owner_last_seen_ms === "number" &&
      now - todo.owner_last_seen_ms <= OWNER_FRESH_WINDOW_MS,
  );

  if (actionable.length > 0) {
    return {
      verdict: "BLOCKER",
      rule_id: "R1",
      reason: `Claim "${input.claim}" but ${actionable.length} actionable todo(s) are queued.`,
      evidence: actionable.slice(0, 5).map((todo) => ({
        kind: "todo",
        ref: todo.id,
        note: `status=${todo.status}`,
      })),
      next_action: "hydrate_queue_and_claim_one",
    };
  }

  if (
    typeof input.context.active_jobs === "number" &&
    input.context.active_jobs === 0 &&
    inProgressFresh.length > 0
  ) {
    return {
      verdict: "BLOCKER",
      rule_id: "R1",
      reason: `Claim "${input.claim}" with active_jobs=0 but ${inProgressFresh.length} in-progress todo(s) have a fresh owner; active_jobs is underreporting.`,
      evidence: inProgressFresh.slice(0, 5).map((todo) => ({
        kind: "todo",
        ref: todo.id,
        note: `in_progress, owner_last_seen_ms=${todo.owner_last_seen_ms}`,
      })),
      next_action: "recompute_active_jobs_with_pinned_formula",
    };
  }

  return {
    verdict: "PASS",
    rule_id: "R1",
    reason: "Active-state claim consistent with queue and active_jobs.",
    evidence: [
      { kind: "queue", ref: `actionable=${actionable.length}` },
      { kind: "queue", ref: `in_progress_fresh=${inProgressFresh.length}` },
      {
        kind: "queue",
        ref: `active_jobs=${input.context.active_jobs ?? "absent"}`,
      },
    ],
  };
}

function checkR2(input: ClaimInput): CommonSensePassResult | null {
  if (input.claim !== "pass") return null;
  const head = input.context.current_head_sha;
  const commented = input.context.commented_on_sha;

  if (!head || !commented) {
    return {
      verdict: "HOLD",
      rule_id: "R2",
      reason:
        "PASS claim missing head_sha or commented_on_sha; cannot verify freshness.",
      evidence: [
        { kind: "context", ref: `current_head_sha=${head ?? "missing"}` },
        { kind: "context", ref: `commented_on_sha=${commented ?? "missing"}` },
      ],
      next_action: "supply_head_and_commented_sha",
    };
  }
  if (commented !== head) {
    return {
      verdict: "BLOCKER",
      rule_id: "R2",
      reason: `PASS authored on ${commented.slice(0, 7)} but current head is ${head.slice(0, 7)}; PASS is stale.`,
      evidence: [
        { kind: "sha", ref: commented, note: "commented_on" },
        { kind: "sha", ref: head, note: "current_head" },
      ],
      next_action: "re_review_on_current_head",
    };
  }
  return {
    verdict: "PASS",
    rule_id: "R2",
    reason: "PASS authored on current head SHA.",
    evidence: [{ kind: "sha", ref: head, note: "head=commented" }],
  };
}

function checkR3(input: ClaimInput): CommonSensePassResult | null {
  if (input.claim !== "duplicate_wake") return null;
  const current = input.context.current_wake;
  const recent = input.context.recent_wakes ?? [];

  if (!current) {
    return {
      verdict: "HOLD",
      rule_id: "R3",
      reason: "duplicate_wake claim missing current_wake context.",
      evidence: [{ kind: "context", ref: "current_wake=missing" }],
      next_action: "include_current_wake",
    };
  }

  const duplicate = recent.find(
    (wake) =>
      wake.id === current.id &&
      wake.state_fingerprint === current.state_fingerprint &&
      input.context.now_ms - wake.emitted_ms <= DUPLICATE_WAKE_WINDOW_MS,
  );

  if (duplicate) {
    const minutes = Math.round(DUPLICATE_WAKE_WINDOW_MS / 60000);
    return {
      verdict: "SUPPRESS",
      rule_id: "R3",
      reason: `Wake ${current.id} already emitted within ${minutes}min with matching state fingerprint.`,
      evidence: [
        {
          kind: "wake",
          ref: duplicate.id,
          note: `prior emitted_ms=${duplicate.emitted_ms}`,
        },
        {
          kind: "wake",
          ref: current.id,
          note: `now emitted_ms=${current.emitted_ms}`,
        },
        { kind: "fingerprint", ref: current.state_fingerprint },
      ],
    };
  }

  return {
    verdict: "PASS",
    rule_id: "R3",
    reason: "Wake is not a duplicate of any recent wake with matching state.",
    evidence: [
      { kind: "wake", ref: current.id, note: current.state_fingerprint },
    ],
  };
}

function checkR4(input: ClaimInput): CommonSensePassResult | null {
  if (input.claim !== "done") return null;
  const subject = pickSubject(input);
  if (!subject) {
    return {
      verdict: "HOLD",
      rule_id: "R4",
      reason: "done claim has no subject todo in context.",
      evidence: [{ kind: "context", ref: "todos=empty" }],
      next_action: "include_target_todo",
    };
  }
  const missing: string[] = [];
  if (!subject.closing_ref) missing.push("closing_ref");
  if (subject.pipeline !== 100) {
    missing.push(`pipeline=${subject.pipeline ?? "missing"}`);
  }
  if (missing.length > 0) {
    return {
      verdict: "BLOCKER",
      rule_id: "R4",
      reason: `done claim on ${subject.id} missing proof: ${missing.join(", ")}.`,
      evidence: [
        {
          kind: "todo",
          ref: subject.id,
          note: `pipeline=${subject.pipeline ?? "missing"}`,
        },
        {
          kind: "todo",
          ref: subject.id,
          note: `closing_ref=${subject.closing_ref ?? "missing"}`,
        },
      ],
      next_action: "attach_closing_pr_or_commit_and_set_pipeline_100",
    };
  }
  return {
    verdict: "PASS",
    rule_id: "R4",
    reason: `done claim on ${subject.id} has proof.`,
    evidence: [
      { kind: "todo", ref: subject.id, note: "pipeline=100" },
      {
        kind: "todo",
        ref: subject.id,
        note: `closing_ref=${subject.closing_ref}`,
      },
    ],
  };
}

function checkR5(input: ClaimInput): CommonSensePassResult | null {
  if (input.claim !== "merge_ready") return null;
  const pr = input.context.pr;
  if (!pr) {
    return {
      verdict: "HOLD",
      rule_id: "R5",
      reason: "merge_ready claim without PR snapshot.",
      evidence: [{ kind: "context", ref: "pr=missing" }],
      next_action: "include_pr_snapshot",
    };
  }
  if (!pr.mergeable) {
    return {
      verdict: "BLOCKER",
      rule_id: "R5",
      reason: `PR #${pr.number} is not mergeable.`,
      evidence: [{ kind: "pr", ref: `#${pr.number}`, note: "mergeable=false" }],
      next_action: "rebase_or_resolve_conflicts",
    };
  }
  if (pr.checks_state !== "success") {
    return {
      verdict: "BLOCKER",
      rule_id: "R5",
      reason: `PR #${pr.number} checks state is "${pr.checks_state}", not success.`,
      evidence: [
        { kind: "pr", ref: `#${pr.number}`, note: `checks=${pr.checks_state}` },
      ],
      next_action: "wait_for_green_checks",
    };
  }
  const reviewer = pr.reviewer_pass;
  if (!reviewer || reviewer.verdict !== "PASS") {
    return {
      verdict: "HOLD",
      rule_id: "R5",
      reason: `PR #${pr.number} has no Reviewer PASS.`,
      evidence: [
        {
          kind: "pr",
          ref: `#${pr.number}`,
          note: `reviewer=${reviewer?.verdict ?? "missing"}`,
        },
      ],
      next_action: "request_reviewer_pass",
    };
  }
  if (reviewer.sha !== pr.head_sha) {
    return {
      verdict: "BLOCKER",
      rule_id: "R5",
      reason: `Reviewer PASS on PR #${pr.number} authored on ${reviewer.sha.slice(0, 7)} but head is ${pr.head_sha.slice(0, 7)}.`,
      evidence: [
        { kind: "sha", ref: reviewer.sha, note: "reviewer_pass_sha" },
        { kind: "sha", ref: pr.head_sha, note: "head_sha" },
      ],
      next_action: "re_review_on_current_head",
    };
  }
  const safety = pr.safety_pass;
  if (!safety || safety.verdict !== "PASS") {
    return {
      verdict: "HOLD",
      rule_id: "R5",
      reason: `PR #${pr.number} has no Safety PASS.`,
      evidence: [
        {
          kind: "pr",
          ref: `#${pr.number}`,
          note: `safety=${safety?.verdict ?? "missing"}`,
        },
      ],
      next_action: "request_safety_pass",
    };
  }
  if (safety.sha !== pr.head_sha) {
    return {
      verdict: "BLOCKER",
      rule_id: "R5",
      reason: `Safety PASS on PR #${pr.number} authored on ${safety.sha.slice(0, 7)} but head is ${pr.head_sha.slice(0, 7)}.`,
      evidence: [
        { kind: "sha", ref: safety.sha, note: "safety_pass_sha" },
        { kind: "sha", ref: pr.head_sha, note: "head_sha" },
      ],
      next_action: "re_run_safety_check_on_current_head",
    };
  }
  return {
    verdict: "PASS",
    rule_id: "R5",
    reason: `PR #${pr.number} is merge-ready: mergeable, checks green, Reviewer PASS and Safety PASS on head.`,
    evidence: [
      { kind: "pr", ref: `#${pr.number}`, note: "mergeable" },
      { kind: "pr", ref: `#${pr.number}`, note: "checks=success" },
      { kind: "sha", ref: pr.head_sha, note: "reviewer_pass_on_head" },
      { kind: "sha", ref: pr.head_sha, note: "safety_pass_on_head" },
    ],
  };
}

function checkR6(input: ClaimInput): CommonSensePassResult | null {
  if (input.claim !== "route") return null;
  const currentLane = input.context.current_lane?.trim();
  const requiredLane = input.context.required_lane?.trim();
  const routeTo = input.context.route_to?.trim() || requiredLane;

  if (!currentLane || !requiredLane) {
    return {
      verdict: "HOLD",
      rule_id: "R6",
      reason:
        "route claim missing current_lane or required_lane evidence; cannot decide lane ownership.",
      evidence: [
        { kind: "lane", ref: `current_lane=${currentLane || "missing"}` },
        { kind: "lane", ref: `required_lane=${requiredLane || "missing"}` },
      ],
      next_action: "include_current_and_required_lane",
    };
  }

  if (currentLane !== requiredLane) {
    return {
      verdict: "ROUTE",
      rule_id: "R6",
      reason: `Claim belongs to ${requiredLane}, not ${currentLane}.`,
      evidence: [
        { kind: "lane", ref: currentLane, note: "current_lane" },
        { kind: "lane", ref: requiredLane, note: "required_lane" },
      ],
      next_action: "route_to_specialist",
      route_to: routeTo,
    };
  }

  return {
    verdict: "PASS",
    rule_id: "R6",
    reason: `Lane ${currentLane} matches the required lane.`,
    evidence: [{ kind: "lane", ref: currentLane, note: "current=required" }],
  };
}

import type { ClaimKind, RuleId, Verdict } from "./schema.js";

export interface CommonSensePassRuleMetadata {
  id: RuleId;
  title: string;
  claims: ClaimKind[];
  possible_verdicts: Verdict[];
  evidence_required: string[];
  summary: string;
}

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

import { randomUUID } from "node:crypto";
import type {
  Finding,
  NotCheckedItem,
  RunRow,
  RunProfile,
  RunStatus,
  SecurityPassDisclaimer,
  SecurityRunTarget,
  VerdictSummary,
} from "../types/index.js";

// In-memory store for package tests and local dogfood runs. The production
// backend can mirror the testpass_runs / testpass_items / testpass_evidence
// pattern because the store API is intentionally narrow.

const RUNS = new Map<string, RunRow>();
const FINDINGS = new Map<string, Finding[]>();

function emptySummary(): VerdictSummary {
  return { total: 0, check: 0, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 0 };
}

export const SECURITYPASS_DISCLAIMER: SecurityPassDisclaimer = {
  headline: "SecurityPass is a scoped review, not a security guarantee.",
  body:
    "SecurityPass reports evidence-based security risks it can observe in the target and scope for this run. It does not certify that the system is secure, replace a penetration test, or verify every dependency, provider, environment, or future change.",
  compact: "Scoped review only. Not a pentest, certification, or guarantee of security.",
};

export interface CreateRunInput {
  pack_id: string;
  target: SecurityRunTarget;
  profile?: RunProfile;
}

export function createRun(input: CreateRunInput): RunRow {
  const id = randomUUID();
  const row: RunRow = {
    id,
    pack_id: input.pack_id,
    target: input.target,
    profile: input.profile ?? "smoke",
    status: "queued",
    verdict_summary: emptySummary(),
    scope_performed: [],
    not_checked: [],
    score: null,
    posture_summary: null,
    disclaimer: SECURITYPASS_DISCLAIMER,
    created_at: new Date().toISOString(),
    completed_at: null,
  };
  RUNS.set(id, row);
  FINDINGS.set(id, []);
  return row;
}

export function getRun(runId: string): RunRow | undefined {
  return RUNS.get(runId);
}

export function setRunStatus(runId: string, status: RunStatus): RunRow | undefined {
  const row = RUNS.get(runId);
  if (!row) return undefined;
  row.status = status;
  if (status !== "queued" && status !== "running") {
    row.completed_at = new Date().toISOString();
  }
  RUNS.set(runId, row);
  return row;
}

export function appendFinding(runId: string, finding: Omit<Finding, "id" | "run_id" | "created_at">): Finding {
  const list = FINDINGS.get(runId) ?? [];
  const full: Finding = {
    ...finding,
    id: randomUUID(),
    run_id: runId,
    created_at: new Date().toISOString(),
  };
  list.push(full);
  FINDINGS.set(runId, list);
  recomputeSummary(runId);
  return full;
}

export function appendScopePerformed(runId: string, scopeLine: string): RunRow | undefined {
  const row = RUNS.get(runId);
  if (!row) return undefined;
  if (!row.scope_performed.includes(scopeLine)) {
    row.scope_performed.push(scopeLine);
  }
  RUNS.set(runId, row);
  return row;
}

export function appendNotChecked(runId: string, item: NotCheckedItem): RunRow | undefined {
  const row = RUNS.get(runId);
  if (!row) return undefined;
  row.not_checked.push(item);
  RUNS.set(runId, row);
  return row;
}

export function setRunNarrative(
  runId: string,
  patch: Pick<RunRow, "score" | "posture_summary">,
): RunRow | undefined {
  const row = RUNS.get(runId);
  if (!row) return undefined;
  row.score = patch.score;
  row.posture_summary = patch.posture_summary;
  RUNS.set(runId, row);
  return row;
}

export function listFindings(runId: string): Finding[] {
  return FINDINGS.get(runId) ?? [];
}

export function getFinding(findingId: string): Finding | undefined {
  for (const list of FINDINGS.values()) {
    const hit = list.find((f) => f.id === findingId);
    if (hit) return hit;
  }
  return undefined;
}

function recomputeSummary(runId: string): void {
  const row = RUNS.get(runId);
  if (!row) return;
  const list = FINDINGS.get(runId) ?? [];
  const summary = emptySummary();
  summary.total = list.length;
  for (const f of list) {
    summary[f.verdict] += 1;
  }
  const decided = summary.check + summary.na + summary.fail + summary.other;
  summary.pass_rate = decided > 0 ? summary.check / decided : 0;
  row.verdict_summary = summary;
  RUNS.set(runId, row);
}

// Test hook so each test starts on a clean store. NOT exported through the
// package barrel, only consumed by sibling tests.
export function __resetForTests(): void {
  RUNS.clear();
  FINDINGS.clear();
}

import { randomUUID } from "node:crypto";
import type {
  Finding,
  RunRow,
  RunProfile,
  RunStatus,
  SecurityRunTarget,
  VerdictSummary,
} from "../types/index.js";

// In-memory stub for Chunk 1. Real backend is Supabase (mirrors the
// testpass_runs / testpass_items / testpass_evidence pattern). The store
// API is intentionally narrow so swapping backends is one file.

const RUNS = new Map<string, RunRow>();
const FINDINGS = new Map<string, Finding[]>();

function emptySummary(): VerdictSummary {
  return { total: 0, check: 0, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 0 };
}

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

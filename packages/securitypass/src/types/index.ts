// Verdict + summary shapes mirror @unclick/testpass to keep one taxonomy
// across the suite. Mirrored (not imported) so SecurityPass stays buildable
// without a build of testpass first. See packages/testpass/src/types.ts.
export type Verdict = "check" | "na" | "fail" | "other" | "pending";
export type Severity = "critical" | "high" | "medium" | "low";
export type RunStatus = "queued" | "running" | "complete" | "failed" | "budget_exceeded";
export type RunProfile = "smoke" | "standard" | "deep";

export interface VerdictSummary {
  total: number;
  check: number;
  na: number;
  fail: number;
  other: number;
  pending: number;
  pass_rate: number;
}

export interface SecurityRunTarget {
  type: "url" | "git" | "mcp" | "api";
  url?: string;
  commit?: string;
  branch?: string;
}

export interface FindingPoC {
  kind: "curl" | "prompt" | "payload" | "http_request" | "shell";
  // PoC payloads are GENERATED, NEVER auto-fired. This is a load-bearing
  // legal invariant (DTCA / CFAA / CMA / cyber liability). Do not introduce
  // any code path that executes a PoC against a target. See test:
  // src/__tests__/runner-invariants.test.ts.
  body: string;
  notes?: string;
}

export interface Finding {
  id: string;
  run_id: string;
  check_id: string;
  title: string;
  severity: Severity;
  verdict: Verdict;
  category: string;
  description?: string;
  remediation?: string;
  on_fail_comment?: string;
  poc?: FindingPoC;
  evidence?: Record<string, unknown>;
  created_at: string;
}

export interface RunRow {
  id: string;
  pack_id: string;
  target: SecurityRunTarget;
  profile: RunProfile;
  status: RunStatus;
  verdict_summary: VerdictSummary;
  created_at: string;
  completed_at: string | null;
}

export interface DisclosureTimer {
  finding_id: string;
  // 90+30 model: 90 days private, then optional 30-day extension before
  // public disclosure. State transitions are time-based. This is metadata
  // only; the actual scheduling lives in the disclosure orchestrator.
  notified_at: string;
  ack_deadline_at: string;
  public_at: string;
  extension_until_at: string | null;
  state: "notified" | "acked" | "extended" | "public" | "withdrawn";
}

export * from "./pack-schema.js";

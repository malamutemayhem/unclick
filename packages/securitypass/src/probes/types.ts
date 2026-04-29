import type { SecurityRunTarget, Severity, Verdict } from "../types/index.js";

export type ProbeKind = "gitleaks" | "osv-scanner" | "stagehand";

export interface CommandSpec {
  command: string;
  args: string[];
  cwd?: string;
}

export interface CommandExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface SecurityProbeFinding {
  check_id: string;
  title: string;
  severity: Severity;
  verdict: Verdict;
  category: string;
  description?: string;
  remediation?: string;
  evidence: Record<string, unknown>;
}

export interface SecurityProbeResult {
  probe: ProbeKind;
  target: SecurityRunTarget;
  command?: CommandSpec;
  findings: SecurityProbeFinding[];
  raw?: unknown;
}


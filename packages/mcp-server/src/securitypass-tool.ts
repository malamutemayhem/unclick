import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

type Verdict = "check" | "na" | "fail" | "other" | "pending";
type Severity = "critical" | "high" | "medium" | "low";
type RunStatus = "queued" | "running" | "complete" | "failed";
type RunProfile = "smoke" | "standard" | "deep";

interface VerdictSummary {
  total: number;
  check: number;
  na: number;
  fail: number;
  other: number;
  pending: number;
  pass_rate: number;
}

interface SecurityFinding {
  id: string;
  check_id: string;
  title: string;
  severity: Severity;
  verdict: Verdict;
  category: string;
  description?: string;
  remediation?: string;
  evidence: Record<string, unknown>;
  created_at: string;
}

interface SecurityRunRecord {
  id: string;
  profile: RunProfile;
  status: RunStatus;
  target: {
    type: "git" | "url";
    repo_path?: string;
    target_url?: string;
  };
  verdict_summary: VerdictSummary;
  created_at: string;
  completed_at: string | null;
  findings: SecurityFinding[];
  notes: string[];
  error?: string;
}

interface CommandSpec {
  command: string;
  args: string[];
  cwd?: string;
}

interface CommandExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

interface GitleaksLeak {
  RuleID?: string;
  Description?: string;
  File?: string;
  StartLine?: number;
  Secret?: string;
  Commit?: string;
}

interface OsvPackage {
  name?: string;
  version?: string;
}

interface OsvVulnerability {
  id?: string;
  summary?: string;
  details?: string;
  severity?: Array<{ type?: string; score?: string }>;
}

interface OsvResult {
  packages?: Array<{
    package?: OsvPackage;
    vulnerabilities?: OsvVulnerability[];
  }>;
}

type CommandRunner = (spec: CommandSpec) => Promise<CommandExecutionResult>;

const RUNS = new Map<string, SecurityRunRecord>();

function emptySummary(): VerdictSummary {
  return { total: 0, check: 0, na: 0, fail: 0, other: 0, pending: 0, pass_rate: 0 };
}

function defaultCommandRunner(spec: CommandSpec): Promise<CommandExecutionResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(spec.command, spec.args, {
      cwd: spec.cwd,
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({ exitCode: code ?? 1, stdout, stderr });
    });
  });
}

let runCommand: CommandRunner = defaultCommandRunner;

function normalizeProfile(raw: unknown): RunProfile {
  return raw === "standard" || raw === "deep" ? raw : "smoke";
}

function buildGitleaksCommand(repoPath: string): CommandSpec {
  return {
    command: "gitleaks",
    args: ["detect", "--source", repoPath, "--report-format", "json", "--no-banner"],
    cwd: repoPath,
  };
}

function buildOsvScannerCommand(repoPath: string): CommandSpec {
  return {
    command: "osv-scanner",
    args: ["--format", "json", "--recursive", repoPath],
    cwd: repoPath,
  };
}

function parseGitleaksJson(stdout: string): Omit<SecurityFinding, "id" | "created_at">[] {
  if (!stdout.trim()) return [];
  const leaks = JSON.parse(stdout) as GitleaksLeak[];
  return leaks.map((leak) => ({
    check_id: `securitypass.gitleaks.${leak.RuleID ?? "secret"}`,
    title: leak.Description ?? "Potential secret detected",
    severity: "critical",
    verdict: "fail",
    category: "secrets",
    description: `Gitleaks reported a potential secret in ${leak.File ?? "an unknown file"}.`,
    remediation: "Rotate the exposed credential, remove it from history, and replace it with a managed secret.",
    evidence: {
      rule_id: leak.RuleID ?? null,
      file: leak.File ?? null,
      start_line: leak.StartLine ?? null,
      commit: leak.Commit ?? null,
      secret_redacted: leak.Secret ? "[redacted]" : null,
    },
  }));
}

function severityFromOsv(vuln: OsvVulnerability): Severity {
  const score = vuln.severity?.find((s) => s.score)?.score?.toUpperCase() ?? "";
  if (score.includes("CRITICAL")) return "critical";
  if (score.includes("HIGH")) return "high";
  if (score.includes("MEDIUM")) return "medium";
  return "low";
}

function parseOsvScannerJson(stdout: string): Omit<SecurityFinding, "id" | "created_at">[] {
  if (!stdout.trim()) return [];
  const body = JSON.parse(stdout) as { results?: OsvResult[] };
  const findings: Array<Omit<SecurityFinding, "id" | "created_at">> = [];
  for (const result of body.results ?? []) {
    for (const pkg of result.packages ?? []) {
      for (const vuln of pkg.vulnerabilities ?? []) {
        findings.push({
          check_id: `securitypass.osv.${vuln.id ?? "vulnerability"}`,
          title: vuln.summary ?? "Open source vulnerability detected",
          severity: severityFromOsv(vuln),
          verdict: "fail",
          category: "supply-chain",
          description: vuln.details,
          remediation: "Upgrade the affected package, apply a vendor patch, or document an accepted risk.",
          evidence: {
            id: vuln.id ?? null,
            package: pkg.package?.name ?? null,
            version: pkg.package?.version ?? null,
            severity: vuln.severity ?? [],
          },
        });
      }
    }
  }
  return findings;
}

function createRunRecord(target: SecurityRunRecord["target"], profile: RunProfile): SecurityRunRecord {
  const record: SecurityRunRecord = {
    id: randomUUID(),
    target,
    profile,
    status: "queued",
    verdict_summary: emptySummary(),
    created_at: new Date().toISOString(),
    completed_at: null,
    findings: [],
    notes: [],
  };
  RUNS.set(record.id, record);
  return record;
}

function updateRun(runId: string, patch: Partial<SecurityRunRecord>): SecurityRunRecord | undefined {
  const current = RUNS.get(runId);
  if (!current) return undefined;
  const next = { ...current, ...patch };
  RUNS.set(runId, next);
  return next;
}

function appendFindings(runId: string, findings: Array<Omit<SecurityFinding, "id" | "created_at">>): void {
  const current = RUNS.get(runId);
  if (!current || findings.length === 0) return;
  current.findings.push(
    ...findings.map((finding) => ({
      ...finding,
      id: randomUUID(),
      created_at: new Date().toISOString(),
    })),
  );
  current.verdict_summary = summarize(current.findings);
  RUNS.set(runId, current);
}

function appendNote(runId: string, note: string): void {
  const current = RUNS.get(runId);
  if (!current) return;
  current.notes.push(note);
  RUNS.set(runId, current);
}

function summarize(findings: SecurityFinding[]): VerdictSummary {
  const summary = emptySummary();
  summary.total = findings.length;
  for (const finding of findings) {
    summary[finding.verdict] += 1;
  }
  const decided = summary.check + summary.na + summary.fail + summary.other;
  summary.pass_rate = decided > 0 ? summary.check / decided : 0;
  return summary;
}

function dependencyNoticeFinding(command: string, repoPath: string, detail: string): Omit<SecurityFinding, "id" | "created_at"> {
  return {
    check_id: `securitypass.runner.${command}.missing`,
    title: `${command} is not installed on this MCP host`,
    severity: "low",
    verdict: "other",
    category: "runner.dependencies",
    description: `SecurityPass could not execute ${command} for ${repoPath}.`,
    remediation: `Install ${command} on the machine hosting the MCP server, then rerun the scan.`,
    evidence: { command, repo_path: repoPath, detail },
  };
}

function probeFailureFinding(command: string, repoPath: string, detail: string): Omit<SecurityFinding, "id" | "created_at"> {
  return {
    check_id: `securitypass.runner.${command}.error`,
    title: `${command} could not complete the scan`,
    severity: "medium",
    verdict: "other",
    category: "runner.execution",
    description: detail,
    remediation: "Inspect the scanner stderr output and fix the invocation or project state before rerunning.",
    evidence: { command, repo_path: repoPath, detail },
  };
}

async function executeRepoProbe(
  runId: string,
  probeName: "gitleaks" | "osv-scanner",
  repoPath: string,
): Promise<void> {
  const command = probeName === "gitleaks"
    ? buildGitleaksCommand(repoPath)
    : buildOsvScannerCommand(repoPath);
  let result: CommandExecutionResult;
  try {
    result = await runCommand(command);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    appendFindings(runId, [dependencyNoticeFinding(probeName, repoPath, detail)]);
    return;
  }

  try {
    const findings = probeName === "gitleaks"
      ? parseGitleaksJson(result.stdout)
      : parseOsvScannerJson(result.stdout);
    if (findings.length > 0) {
      appendFindings(runId, findings);
    }
    if (!result.stdout.trim() && result.exitCode !== 0 && result.stderr.trim()) {
      appendFindings(runId, [probeFailureFinding(probeName, repoPath, result.stderr.trim())]);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    appendFindings(runId, [probeFailureFinding(probeName, repoPath, detail)]);
  }
}

function getRunOutput(record: SecurityRunRecord): Record<string, unknown> {
  return {
    run_id: record.id,
    status: record.status,
    profile: record.profile,
    target: record.target,
    verdict_summary: record.verdict_summary,
    finding_count: record.findings.length,
    notes: record.notes,
    completed_at: record.completed_at,
    error: record.error ?? null,
  };
}

export async function securitypassRun(args: Record<string, unknown>): Promise<unknown> {
  const repoPathRaw = typeof args.repo_path === "string" ? args.repo_path.trim() : "";
  const targetUrl = typeof args.target_url === "string" ? args.target_url.trim() : "";
  const profile = normalizeProfile(args.profile);

  if (!repoPathRaw && !targetUrl) {
    return { error: "repo_path or target_url is required" };
  }

  if (targetUrl) {
    return {
      error: "scope_unverified",
      detail:
        "Active URL probing is still gated until scope verification ships. Phase 2 wires repo-local scanners first.",
      next_step:
        "Use repo_path for local secrets and supply-chain scans now. URL targets stay blocked until the scope verifier lands.",
    };
  }

  const repoPath = path.resolve(repoPathRaw);
  if (!fs.existsSync(repoPath)) return { error: `repo_path does not exist: ${repoPath}` };
  if (!fs.statSync(repoPath).isDirectory()) return { error: `repo_path must be a directory: ${repoPath}` };

  const record = createRunRecord({ type: "git", repo_path: repoPath }, profile);
  updateRun(record.id, { status: "running" });
  appendNote(record.id, "Phase 2 wires repo-local gitleaks and osv-scanner probes.");
  appendNote(record.id, "Active URL probing remains blocked until scope verification lands.");

  try {
    await executeRepoProbe(record.id, "gitleaks", repoPath);
    await executeRepoProbe(record.id, "osv-scanner", repoPath);
    const completed = updateRun(record.id, {
      status: "complete",
      completed_at: new Date().toISOString(),
    });
    return getRunOutput(completed ?? RUNS.get(record.id)!);
  } catch (err) {
    const failed = updateRun(record.id, {
      status: "failed",
      completed_at: new Date().toISOString(),
      error: err instanceof Error ? err.message : String(err),
    });
    return getRunOutput(failed ?? RUNS.get(record.id)!);
  }
}

export async function securitypassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id.trim() : "";
  if (!runId) return { error: "run_id is required" };
  const record = RUNS.get(runId);
  if (!record) return { error: "run not found", run_id: runId };
  return getRunOutput(record);
}

export function __setSecuritypassCommandRunnerForTests(next: CommandRunner): void {
  runCommand = next;
}

export function __resetSecuritypassToolForTests(): void {
  runCommand = defaultCommandRunner;
  RUNS.clear();
}

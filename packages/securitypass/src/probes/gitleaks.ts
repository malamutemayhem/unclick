import type { SecurityRunTarget } from "../types/index.js";
import type { CommandExecutionResult, CommandSpec, SecurityProbeFinding, SecurityProbeResult } from "./types.js";

interface GitleaksLeak {
  RuleID?: string;
  Description?: string;
  File?: string;
  StartLine?: number;
  Secret?: string;
  Commit?: string;
}

export function buildGitleaksCommand(repoPath: string): CommandSpec {
  return {
    command: "gitleaks",
    args: ["detect", "--source", repoPath, "--report-format", "json", "--no-banner"],
    cwd: repoPath,
  };
}

export function parseGitleaksJson(stdout: string): SecurityProbeFinding[] {
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

export function gitleaksResultFromCommand(
  target: SecurityRunTarget,
  command: CommandSpec,
  result: CommandExecutionResult,
): SecurityProbeResult {
  return {
    probe: "gitleaks",
    target,
    command,
    findings: parseGitleaksJson(result.stdout),
    raw: { exitCode: result.exitCode, stderr: result.stderr },
  };
}


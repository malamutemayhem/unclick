import type { SecurityRunTarget } from "../types/index.js";
import type { CommandExecutionResult, CommandSpec, SecurityProbeFinding, SecurityProbeResult } from "./types.js";

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

export function buildOsvScannerCommand(path: string): CommandSpec {
  return {
    command: "osv-scanner",
    args: ["--format", "json", "--recursive", path],
    cwd: path,
  };
}

function severityFromOsv(vuln: OsvVulnerability): SecurityProbeFinding["severity"] {
  const score = vuln.severity?.find((s) => s.score)?.score?.toUpperCase() ?? "";
  if (score.includes("CRITICAL")) return "critical";
  if (score.includes("HIGH")) return "high";
  if (score.includes("MEDIUM")) return "medium";
  return "low";
}

export function parseOsvScannerJson(stdout: string): SecurityProbeFinding[] {
  if (!stdout.trim()) return [];
  const body = JSON.parse(stdout) as { results?: OsvResult[] };
  const findings: SecurityProbeFinding[] = [];
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

export function osvResultFromCommand(
  target: SecurityRunTarget,
  command: CommandSpec,
  result: CommandExecutionResult,
): SecurityProbeResult {
  return {
    probe: "osv-scanner",
    target,
    command,
    findings: parseOsvScannerJson(result.stdout),
    raw: { exitCode: result.exitCode, stderr: result.stderr },
  };
}


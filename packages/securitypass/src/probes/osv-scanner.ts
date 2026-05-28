import type { SecurityRunTarget } from "../types/index.js";
import type { CommandExecutionResult, CommandSpec, SecurityProbeFinding, SecurityProbeResult } from "./types.js";

interface OsvPackage {
  name?: string;
  version?: string;
  ecosystem?: string;
}

interface OsvSeverity {
  type?: string;
  score?: string;
}

interface ParsedCvssScore {
  type: string | null;
  vector: string;
  score: number;
}

interface OsvAffectedRangeEvent {
  introduced?: string;
  fixed?: string;
  last_affected?: string;
  limit?: string;
}

interface OsvAffectedRange {
  type?: string;
  events?: OsvAffectedRangeEvent[];
}

interface OsvAffected {
  severity?: OsvSeverity[];
  ranges?: OsvAffectedRange[];
}

interface OsvReference {
  type?: string;
  url?: string;
}

interface OsvVulnerability {
  id?: string;
  aliases?: string[];
  summary?: string;
  details?: string;
  severity?: OsvSeverity[];
  affected?: OsvAffected[];
  references?: OsvReference[];
  published?: string;
  modified?: string;
}

interface OsvGroup {
  ids?: string[];
  experimentalAnalysis?: Record<string, { called?: boolean }>;
}

interface OsvResult {
  source?: {
    path?: string;
    type?: string;
  };
  packages?: Array<{
    package?: OsvPackage;
    vulnerabilities?: OsvVulnerability[];
    groups?: OsvGroup[];
  }>;
}

export function buildOsvScannerCommand(path: string): CommandSpec {
  return {
    command: "osv-scanner",
    args: ["scan", "source", "--format", "json", "--recursive", "--no-call-analysis=rust", path],
    cwd: path,
    timeoutMs: 120_000,
  };
}

function roundUp1(score: number): number {
  return Math.ceil((score + Number.EPSILON) * 10) / 10;
}

function parseCvssVector(vector: string): Record<string, string> {
  const metrics: Record<string, string> = {};
  for (const part of vector.split("/")) {
    const [key, value] = part.split(":");
    if (!key || !value || key === "CVSS") continue;
    metrics[key] = value;
  }
  return metrics;
}

function cvssV3Score(vector: string): number | null {
  if (!vector.startsWith("CVSS:3.")) return null;
  const metrics = parseCvssVector(vector);
  const impactValues = { N: 0, L: 0.22, H: 0.56 } as const;
  const av = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }[metrics.AV as "N" | "A" | "L" | "P"];
  const ac = { L: 0.77, H: 0.44 }[metrics.AC as "L" | "H"];
  const ui = { N: 0.85, R: 0.62 }[metrics.UI as "N" | "R"];
  const scope = metrics.S as "U" | "C" | undefined;
  const pr = scope === "C"
    ? { N: 0.85, L: 0.68, H: 0.5 }[metrics.PR as "N" | "L" | "H"]
    : { N: 0.85, L: 0.62, H: 0.27 }[metrics.PR as "N" | "L" | "H"];
  const c = impactValues[metrics.C as keyof typeof impactValues];
  const i = impactValues[metrics.I as keyof typeof impactValues];
  const a = impactValues[metrics.A as keyof typeof impactValues];
  if (
    av === undefined ||
    ac === undefined ||
    pr === undefined ||
    ui === undefined ||
    c === undefined ||
    i === undefined ||
    a === undefined ||
    !scope
  ) return null;

  const impactSubScore = 1 - (1 - c) * (1 - i) * (1 - a);
  const impact = scope === "U"
    ? 6.42 * impactSubScore
    : 7.52 * (impactSubScore - 0.029) - 3.25 * Math.pow(impactSubScore - 0.02, 15);
  if (impact <= 0) return 0;
  const exploitability = 8.22 * av * ac * pr * ui;
  const base = scope === "U"
    ? Math.min(impact + exploitability, 10)
    : Math.min(1.08 * (impact + exploitability), 10);
  return roundUp1(base);
}

function cvssV2Score(vector: string): number | null {
  const metrics = parseCvssVector(vector);
  const av = { L: 0.395, A: 0.646, N: 1 }[metrics.AV as "L" | "A" | "N"];
  const ac = { H: 0.35, M: 0.61, L: 0.71 }[metrics.AC as "H" | "M" | "L"];
  const au = { M: 0.45, S: 0.56, N: 0.704 }[metrics.Au as "M" | "S" | "N"];
  const impactValues = { N: 0, P: 0.275, C: 0.66 } as const;
  const c = impactValues[metrics.C as keyof typeof impactValues];
  const i = impactValues[metrics.I as keyof typeof impactValues];
  const a = impactValues[metrics.A as keyof typeof impactValues];
  if (
    av === undefined ||
    ac === undefined ||
    au === undefined ||
    c === undefined ||
    i === undefined ||
    a === undefined
  ) return null;

  const impact = 10.41 * (1 - (1 - c) * (1 - i) * (1 - a));
  if (impact <= 0) return 0;
  const exploitability = 20 * av * ac * au;
  return roundUp1(((0.6 * impact) + (0.4 * exploitability) - 1.5) * 1.176);
}

function parsedCvssScoresFromOsv(severityEntries: OsvSeverity[]): ParsedCvssScore[] {
  return severityEntries.flatMap((severity) => {
    const rawScore = severity.score?.trim();
    if (!rawScore) return [];
    let score: number | null = null;
    if (rawScore.startsWith("CVSS:3.")) {
      score = cvssV3Score(rawScore);
    } else if (severity.type === "CVSS_V2" || /(^|\/)Au:/.test(rawScore)) {
      score = cvssV2Score(rawScore);
    }
    return score === null ? [] : [{
      type: severity.type ?? null,
      vector: rawScore,
      score,
    }];
  });
}

function severityFromScore(score: number): SecurityProbeFinding["severity"] {
  if (score >= 9) return "critical";
  if (score >= 7) return "high";
  if (score >= 4) return "medium";
  if (score > 0) return "low";
  return "info";
}

function fallbackSeverityFromCvssVector(scoreText: string): SecurityProbeFinding["severity"] | null {
  if (!scoreText.includes("CVSS:")) return null;
  if (/\/(?:VC|VI|VA|SC|SI|SA|C|I|A):H(?:\/|$)/.test(scoreText)) return "high";
  if (/\/(?:VC|VI|VA|SC|SI|SA|C|I|A):(?:L|P)(?:\/|$)/.test(scoreText)) return "medium";
  return "low";
}

function osvSeverityEntries(vuln: OsvVulnerability): OsvSeverity[] {
  return [
    ...(vuln.severity ?? []),
    ...((vuln.affected ?? []).flatMap((affected) => affected.severity ?? [])),
  ];
}

function cvssScoresFromOsv(vuln: OsvVulnerability): ParsedCvssScore[] {
  return parsedCvssScoresFromOsv(osvSeverityEntries(vuln));
}

function severityFromOsv(vuln: OsvVulnerability): SecurityProbeFinding["severity"] {
  const severityEntries = osvSeverityEntries(vuln);
  const scores = severityEntries
    .map((severity) => severity.score)
    .filter((score): score is string => Boolean(score));
  const text = scores.join(" ").toUpperCase();
  if (text.includes("CRITICAL")) return "critical";
  if (text.includes("HIGH")) return "high";
  if (text.includes("MEDIUM")) return "medium";
  if (text.includes("LOW")) return "low";

  const numericScores = scores
    .map((score) => Number(String(score).trim()))
    .filter((score) => Number.isFinite(score));
  const numericScore = numericScores.length > 0 ? Math.max(...numericScores) : null;
  if (numericScore !== null) {
    return severityFromScore(numericScore);
  }

  const cvssScores = parsedCvssScoresFromOsv(severityEntries);
  if (cvssScores.length > 0) {
    return severityFromScore(Math.max(...cvssScores.map((score) => score.score)));
  }

  for (const score of scores) {
    const fallback = fallbackSeverityFromCvssVector(score);
    if (fallback) return fallback;
  }
  return "low";
}

function fixedVersionsFromOsv(vuln: OsvVulnerability): string[] {
  const fixedVersions = new Set<string>();
  for (const affected of vuln.affected ?? []) {
    for (const range of affected.ranges ?? []) {
      for (const event of range.events ?? []) {
        if (event.fixed) fixedVersions.add(event.fixed);
      }
    }
  }
  return [...fixedVersions].sort();
}

function referencesFromOsv(vuln: OsvVulnerability): Array<{ type: string | null; url: string }> {
  return (vuln.references ?? [])
    .filter((reference): reference is OsvReference & { url: string } => Boolean(reference.url))
    .map((reference) => ({
      type: reference.type ?? null,
      url: reference.url,
    }));
}

function callAnalysisForVulnerability(
  pkg: { groups?: OsvGroup[] },
  vuln: OsvVulnerability,
): Array<{ ids: string[]; analysis: Record<string, { called?: boolean }> }> {
  const vulnIds = new Set([vuln.id, ...(vuln.aliases ?? [])].filter(Boolean));
  return (pkg.groups ?? [])
    .filter((group) => (group.ids ?? []).some((id) => vulnIds.has(id)))
    .map((group) => ({
      ids: group.ids ?? [],
      analysis: group.experimentalAnalysis ?? {},
    }));
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
            aliases: vuln.aliases ?? [],
            package: pkg.package?.name ?? null,
            version: pkg.package?.version ?? null,
            ecosystem: pkg.package?.ecosystem ?? null,
            fixed_versions: fixedVersionsFromOsv(vuln),
            references: referencesFromOsv(vuln),
            published: vuln.published ?? null,
            modified: vuln.modified ?? null,
            call_analysis: callAnalysisForVulnerability(pkg, vuln),
            cvss_scores: cvssScoresFromOsv(vuln),
            severity: vuln.severity ?? [],
            source_path: result.source?.path ?? null,
            source_type: result.source?.type ?? null,
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


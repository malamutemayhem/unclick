import {
  CopyPassCopyBlockSchema,
  CopyPassReportSchema,
  type CopyPassCheckDefinition,
  type CopyPassCopyBlockInput,
  type CopyPassDisclaimer,
  type CopyPassFinding,
  type CopyPassNotChecked,
  type CopyPassReport,
  type CopyPassSeverity,
  type CopyPassSummary,
  type CopyPassTargetInput,
  type CopyPassVerdict,
} from "./schema.js";
import {
  DEFAULT_COPYPASS_CHECKS,
  detectCopyPassFindings,
} from "./copy-library.js";

const COPYPASS_ADVISORY_DISCLAIMER =
  "CopyPass reports evidence-backed copy-quality findings for the inspected scope. It does not certify factual accuracy, legal compliance, brand approval, conversion performance, or fitness for every audience.";

export const COPYPASS_DISCLAIMER: CopyPassDisclaimer = {
  headline: "CopyPass is a scoped review, not a guarantee of copy quality or safety.",
  body:
    "CopyPass reports evidence-based copy-quality findings it can observe in the AI-generated copy and scope for this run. It does not certify factual accuracy, legal compliance, brand approval, conversion performance, or fitness for every audience, channel, or future edit.",
  compact:
    "Scoped review only. Not legal approval, brand sign-off, or a guarantee of quality, safety, or performance.",
};

const DETERMINISTIC_NOT_CHECKED: CopyPassNotChecked[] = [
  {
    label: "Production crawl",
    reason: "This run only evaluates caller-provided copy blocks.",
  },
  {
    label: "Paid model rewrite",
    reason: "CopyPass deterministic mode uses local checks and does not call paid LLMs.",
  },
  {
    label: "Legal, brand, or factual approval",
    reason:
      "CopyPass flags copy-quality evidence but does not certify lawfulness, brand approval, or external truth.",
  },
  {
    label: "Detector-evasion guarantee",
    reason:
      "CopyPass is positioned as anti-slop and copy-quality review, not as an AI-detector bypass tool.",
  },
];

export interface CreateCopyPassVerdictPackInput {
  target: CopyPassTargetInput;
  generated_at?: string;
  checks?: CopyPassCheckDefinition[];
}

export interface CreateFixtureCopyPassReportInput
  extends CreateCopyPassVerdictPackInput {
  blocks: CopyPassCopyBlockInput[];
}

export interface CreateDeterministicCopyPassReportInput
  extends CreateFixtureCopyPassReportInput {}

export function createCopyPassVerdictPack(
  input: CreateCopyPassVerdictPackInput,
): CopyPassReport {
  const checks = resolveCopyPassChecks(input.checks);
  const report = {
    target: input.target,
    generated_at: input.generated_at ?? new Date().toISOString(),
    mode: "plan-only" as const,
    overall_score: 0,
    verdict: "unknown" as const,
    checks_attempted: checks.map((check) => check.id),
    blocks_reviewed: [],
    findings: [],
    not_checked: DETERMINISTIC_NOT_CHECKED,
    scanner_source: {
      kind: "shared-scanner-plan" as const,
      mode: "plan-only" as const,
      target_url: input.target.url,
      shared_check_ids: checks.map((check) => check.id),
    },
    summary: createCopyPassSummary([], "plan-only"),
    disclaimer: COPYPASS_DISCLAIMER,
    disclaimers: [COPYPASS_ADVISORY_DISCLAIMER],
    notes: [
      "Plan-only CopyPass pack. No production crawl, paid call, private copy, or live analytics write was used.",
    ],
  };

  return CopyPassReportSchema.parse(report);
}

export function createDeterministicCopyPassReport(
  input: CreateDeterministicCopyPassReportInput,
): CopyPassReport {
  return createCopyPassReport(input, "deterministic");
}

export function createFixtureCopyPassReport(
  input: CreateFixtureCopyPassReportInput,
): CopyPassReport {
  return createCopyPassReport(input, "fixture");
}

function createCopyPassReport(
  input: CreateFixtureCopyPassReportInput,
  mode: "deterministic" | "fixture",
): CopyPassReport {
  const checks = resolveCopyPassChecks(input.checks);
  if (input.blocks.length === 0) {
    throw new Error("CopyPass requires at least one copy block to create a report.");
  }

  const blocks = input.blocks.map((block) => CopyPassCopyBlockSchema.parse(block));
  const findings = detectCopyPassFindings(blocks, checks);
  const overall_score = scoreCopyPassFindings(findings);
  const report = {
    target: input.target,
    generated_at: input.generated_at ?? new Date().toISOString(),
    mode,
    overall_score,
    verdict: toCopyPassVerdict(findings, overall_score),
    checks_attempted: checks.map((check) => check.id),
    blocks_reviewed: blocks.map((block) => block.id),
    findings,
    not_checked: DETERMINISTIC_NOT_CHECKED,
    scanner_source: {
      kind: mode === "deterministic" ? "local-detector" as const : "fixture" as const,
      mode,
      target_url: input.target.url,
      shared_check_ids: checks.map((check) => check.id),
    },
    summary: createCopyPassSummary(findings, mode),
    disclaimer: COPYPASS_DISCLAIMER,
    disclaimers: [COPYPASS_ADVISORY_DISCLAIMER],
    notes: [
      mode === "deterministic"
        ? "Deterministic CopyPass report. Findings are local text signals for scoped copy review."
        : "Fixture-only CopyPass report. Findings are deterministic text signals for human copy review.",
    ],
  };

  return CopyPassReportSchema.parse(report);
}

function resolveCopyPassChecks(
  checks: CopyPassCheckDefinition[] | undefined,
): CopyPassCheckDefinition[] {
  const resolved = checks ?? DEFAULT_COPYPASS_CHECKS;
  if (resolved.length === 0) {
    throw new Error("CopyPass requires at least one check to create a report.");
  }
  return resolved;
}

function createCopyPassSummary(
  findings: CopyPassFinding[],
  mode: "plan-only" | "deterministic" | "fixture",
): CopyPassSummary {
  const counts_by_severity = emptySeverityCounts();
  for (const finding of findings) counts_by_severity[finding.severity] += 1;
  const hasSerious = findings.some(
    (finding) => finding.severity === "critical" || finding.severity === "high",
  );
  const hasAny = findings.length > 0;

  return {
    posture: !hasAny
      ? "CopyPass found no deterministic copy-quality issues in the inspected scope."
      : hasSerious
        ? "CopyPass found evidence-backed copy risks that should be fixed before publishing."
        : "CopyPass found copy improvements worth reviewing before publishing.",
    counts_by_severity,
    coverage_note:
      mode === "plan-only"
        ? "This is only a plan artifact. No copy blocks were inspected."
        : "This result only covers the caller-provided copy blocks and checks listed in this report. Unknown legal, factual, brand, localization, and performance questions stay unknown.",
  };
}

function emptySeverityCounts(): Record<CopyPassSeverity, number> {
  return { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
}

export function scoreCopyPassFindings(findings: CopyPassFinding[]): number {
  const penalty = findings.reduce((total, finding) => {
    switch (finding.severity) {
      case "critical":
        return total + 30;
      case "high":
        return total + 20;
      case "medium":
        return total + 12;
      case "low":
        return total + 6;
      case "info":
        return total + 2;
    }
  }, 0);

  return Math.max(0, 100 - penalty);
}

export function toCopyPassVerdict(
  findings: CopyPassFinding[],
  overallScore: number,
): CopyPassVerdict {
  if (findings.length === 0) {
    return "pass";
  }

  if (
    findings.some(
      (finding) => finding.severity === "critical" || finding.severity === "high",
    )
  ) {
    return "fail";
  }

  if (overallScore < 100) {
    return "warn";
  }

  return "unknown";
}

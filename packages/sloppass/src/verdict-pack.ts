import { DEFAULT_CHECKS, SLOPPASS_CATEGORIES } from "./categories.js";
import { SLOPPASS_DISCLAIMER } from "./disclaimer.js";
import {
  SlopPassCategorySchema,
  SlopPassResultSchema,
  SlopPassRunInputSchema,
  SlopPassSourceFileSchema,
  SlopPassTargetSchema,
} from "./schema.js";
import {
  DEFAULT_SLOPPASS_SMELL_CHECKS,
  detectSlopSmells,
} from "./smell-library.js";
import type {
  SlopPassCategory,
  SlopPassFinding,
  SlopPassResult,
  SlopPassSeverity,
  SlopPassSourceFile,
  SlopPassTarget,
  SlopPassVerdict,
} from "./types.js";

export type SlopPassVerdictPackMode = "plan-only" | "provided-source";

export interface SlopPassScannerSource {
  kind: "manual" | "provided-source" | "shared-scanner" | "geopass-plan";
  mode: SlopPassVerdictPackMode;
  label?: string;
  source_id?: string;
  shared_check_ids?: string[];
  files?: string[];
}

export interface CreateSlopPassVerdictPackInput {
  target: SlopPassTarget;
  generated_at?: string;
  checks?: SlopPassCategory[];
  scanner_source?: SlopPassScannerSource;
  notes?: string[];
}

export interface CreateProvidedSourceSlopPassReportInput
  extends CreateSlopPassVerdictPackInput {
  files: SlopPassSourceFile[];
}

export type CreateFixtureSlopPassReportInput = CreateProvidedSourceSlopPassReportInput;

export interface SlopPassVerdictPack extends SlopPassResult {
  mode: SlopPassVerdictPackMode;
  generated_at: string;
  scanner_source: SlopPassScannerSource;
  smell_checks: Array<{
    id: string;
    category: SlopPassCategory;
    label: string;
  }>;
  notes: string[];
}

function emptyCounts(): Record<SlopPassSeverity, number> {
  return { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
}

export function toSlopPassVerdict(
  counts: Record<SlopPassSeverity, number>,
): SlopPassVerdict {
  if (counts.critical > 0 || counts.high > 0) return "fail";
  if (counts.medium > 0 || counts.low > 0 || counts.info > 0) return "warn";
  return "pass";
}

function countFindings(findings: SlopPassFinding[]): Record<SlopPassSeverity, number> {
  const counts = emptyCounts();
  for (const finding of findings) counts[finding.severity]++;
  return counts;
}

function parseChecks(checks?: SlopPassCategory[]): SlopPassCategory[] {
  return (checks ?? DEFAULT_CHECKS).map((check) => SlopPassCategorySchema.parse(check));
}

function createNotChecked(checks: SlopPassCategory[], reason: string) {
  const requested = new Set(checks);
  return DEFAULT_CHECKS.filter((category) => !requested.has(category)).map((category) => ({
    label: category,
    reason,
  }));
}

function sourceOnlyChecks(checks: SlopPassCategory[]): SlopPassCategory[] {
  return checks.filter((check) => check !== "vcs_integration_risk");
}

function uniquePaths(files: Array<{ path: string }>): string[] {
  return Array.from(new Set(files.map((file) => file.path)));
}

function smellCheckMetadata(checks: SlopPassCategory[]) {
  const requested = new Set(checks);
  return DEFAULT_SLOPPASS_SMELL_CHECKS.filter((check) =>
    requested.has(check.category),
  ).map((check) => ({
    id: check.id,
    category: check.category,
    label: SLOPPASS_CATEGORIES[check.category],
  }));
}

function generatedAt(input?: string): string {
  return input ?? new Date(0).toISOString();
}

function baseScannerSource(
  mode: SlopPassVerdictPackMode,
  files: string[],
  scanner_source?: SlopPassScannerSource,
): SlopPassScannerSource {
  return {
    kind: scanner_source?.kind ?? (mode === "provided-source" ? "provided-source" : "manual"),
    mode,
    label: scanner_source?.label,
    source_id: scanner_source?.source_id,
    shared_check_ids: scanner_source?.shared_check_ids ?? [],
    files: scanner_source?.files ?? files,
  };
}

function createPack(
  result: SlopPassResult,
  input: {
    mode: SlopPassVerdictPackMode;
    generated_at?: string;
    scanner_source?: SlopPassScannerSource;
    smell_checks: SlopPassVerdictPack["smell_checks"];
    notes?: string[];
  },
): SlopPassVerdictPack {
  return {
    ...result,
    mode: input.mode,
    generated_at: generatedAt(input.generated_at),
    scanner_source: baseScannerSource(
      input.mode,
      result.scope.files_reviewed,
      input.scanner_source,
    ),
    smell_checks: input.smell_checks,
    notes:
      input.notes ??
      [
        "SlopPass is deterministic for provided source or diff text. No untrusted code execution, production scans, paid calls, or credentials are used.",
      ],
  };
}

export function createSlopPassVerdictPack(
  input: CreateSlopPassVerdictPackInput,
): SlopPassVerdictPack {
  const checks = parseChecks(input.checks);
  const target = SlopPassTargetSchema.parse(input.target);
  const result = SlopPassResultSchema.parse({
    target,
    scope: {
      checks_attempted: [],
      files_reviewed: target.files ?? [],
      provider: "plan-only",
    },
    verdict: "unknown",
    findings: [],
    not_checked: DEFAULT_CHECKS.map((category) => ({
      label: category,
      reason: "Plan-only pack. Run provided source or diff evidence before treating this as a verdict.",
    })),
    summary: {
      posture: "SlopPass plan-only pack is configured for deterministic source or diff review.",
      counts_by_severity: emptyCounts(),
      coverage_note:
        "No source content was inspected. This pack only declares the static review plan.",
    },
    disclaimer: SLOPPASS_DISCLAIMER,
  });

  return createPack(result, {
    mode: "plan-only",
    generated_at: input.generated_at,
    scanner_source: input.scanner_source,
    smell_checks: smellCheckMetadata(checks),
    notes: input.notes,
  });
}

export function createProvidedSourceSlopPassReport(
  input: CreateProvidedSourceSlopPassReportInput,
): SlopPassVerdictPack {
  const checks = parseChecks(input.checks);
  const attemptedChecks = sourceOnlyChecks(checks);
  const parsed = SlopPassRunInputSchema.parse({ target: input.target, files: input.files, checks });
  const files = (parsed.files ?? [])
    .filter((file) => file.content.trim().length > 0)
    .map((file) => SlopPassSourceFileSchema.parse(file));
  const findings = detectSlopSmells(files).filter((finding) =>
    attemptedChecks.includes(finding.category),
  );
  const counts = countFindings(findings);
  const noAttemptedChecks = attemptedChecks.length === 0;
  const notChecked = createNotChecked(
    checks,
    "Check was not requested for this provided-source run.",
  );
  if (checks.includes("vcs_integration_risk")) {
    notChecked.push({
      label: "stale-overwrite-detector",
      reason: "git_context not provided for this provided-source run.",
    });
  }
  const result = SlopPassResultSchema.parse({
    target: SlopPassTargetSchema.parse(input.target),
    scope: {
      checks_attempted: attemptedChecks,
      files_reviewed: uniquePaths(files),
      provider: "provided-source",
    },
    verdict: noAttemptedChecks ? "unknown" : toSlopPassVerdict(counts),
    findings,
    not_checked: notChecked,
    summary: {
      posture: noAttemptedChecks
        ? "SlopPass did not run the requested check because required context was missing."
        : findings.length > 0
          ? "SlopPass found deterministic slop signals in the inspected source."
          : "SlopPass found no deterministic slop signals in the inspected source.",
      counts_by_severity: counts,
      coverage_note:
        "This result only covers the provided source files and requested static checks.",
    },
    disclaimer: SLOPPASS_DISCLAIMER,
  });

  return createPack(result, {
    mode: "provided-source",
    generated_at: input.generated_at,
    scanner_source: input.scanner_source,
    smell_checks: smellCheckMetadata(checks),
    notes: input.notes,
  });
}

export function createFixtureSlopPassReport(
  input: CreateFixtureSlopPassReportInput,
): SlopPassVerdictPack {
  return createProvidedSourceSlopPassReport(input);
}

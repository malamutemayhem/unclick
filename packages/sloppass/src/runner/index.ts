import { DEFAULT_CHECKS } from "../categories.js";
import { SLOPPASS_DISCLAIMER } from "../disclaimer.js";
import { sourceFilesFromUnifiedDiff } from "../diff.js";
import { detectStaleOverwrites } from "../lenses/stale-overwrite.js";
import { SlopPassRunInputSchema, type SlopPassRunInput } from "../schema.js";
import type { SlopPassCategory, SlopPassResult, SlopPassSeverity } from "../types.js";
import { detectSlopSignals } from "./detectors.js";
import { getProvider } from "../vendor/promptfoo-lite/index.js";
import { toSlopPassVerdict } from "../verdict-pack.js";

const SEVERITIES: SlopPassSeverity[] = ["critical", "high", "medium", "low", "info"];

function emptyCounts(): Record<SlopPassSeverity, number> {
  return { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
}

function reviewableFiles(files: NonNullable<SlopPassRunInput["files"]> | undefined) {
  return (files ?? []).filter((file) => file.content.trim().length > 0);
}

function sourceFilesFor(parsed: ReturnType<typeof SlopPassRunInputSchema.parse>) {
  const files = reviewableFiles(parsed.files);
  if (files.length > 0) return files;
  if (parsed.git_context) {
    return Object.entries(parsed.git_context.files)
      .filter(([, blobs]) => blobs.pr_head_blob.trim().length > 0)
      .map(([path, blobs]) => ({
        path,
        content: blobs.pr_head_blob,
      }));
  }
  return sourceFilesFromUnifiedDiff(parsed.diff ?? "");
}

function uniquePaths(files: Array<{ path: string }>): string[] {
  return Array.from(new Set(files.map((file) => file.path)));
}

export async function runSlopPass(input: SlopPassRunInput): Promise<SlopPassResult> {
  const parsed = SlopPassRunInputSchema.parse(input);
  const checks = parsed.checks ?? DEFAULT_CHECKS;
  const wantsStaleOverwrite = checks.includes("vcs_integration_risk");
  const sourceChecks = checks.filter((check) => check !== "vcs_integration_risk");
  const sourceCheckSet = new Set<SlopPassCategory>(sourceChecks);
  const attemptedChecks = checks.filter((check) =>
    check !== "vcs_integration_risk" || Boolean(parsed.git_context)
  );
  const files = sourceFilesFor(parsed);
  if (files.length === 0) {
    throw new Error("SlopPass could not find any added source lines in the provided diff.");
  }
  const provider = getProvider(parsed.provider);
  const providerFindings = await provider.evaluate(files, sourceChecks);
  const heuristicFindings = detectSlopSignals(files).filter((finding) =>
    sourceCheckSet.has(finding.category)
  );
  const staleOverwriteFindings =
    parsed.git_context && wantsStaleOverwrite
      ? detectStaleOverwrites(parsed.git_context)
      : [];
  const findings = [...providerFindings, ...heuristicFindings, ...staleOverwriteFindings];
  const counts = emptyCounts();
  for (const finding of findings) counts[finding.severity]++;

  const checkedLabels = new Set(checks);
  const notChecked: Array<{ label: string; reason: string }> = DEFAULT_CHECKS.filter((category) => !checkedLabels.has(category)).map((category) => ({
    label: category,
    reason: "Check was not requested for this scoped run.",
  }));
  if (wantsStaleOverwrite && !parsed.git_context) {
    notChecked.push({
      label: "stale-overwrite-detector",
      reason: "git_context not provided in SlopPassRunInput.",
    });
  }

  const hasSerious = SEVERITIES.slice(0, 3).some((severity) => counts[severity] > 0);
  const noAttemptedChecks = attemptedChecks.length === 0;
  return {
    target: parsed.target,
    scope: {
      checks_attempted: attemptedChecks,
      files_reviewed: uniquePaths(files),
      provider: provider.id,
    },
    verdict: noAttemptedChecks ? "unknown" : toSlopPassVerdict(counts),
    findings,
    not_checked: notChecked,
    summary: {
      posture: noAttemptedChecks
        ? "SlopPass did not run the requested check because required context was missing."
        : hasSerious
          ? "SlopPass found evidence-backed risks in the inspected scope."
          : "SlopPass found no major slop signals in the inspected scope.",
      counts_by_severity: counts,
      coverage_note:
        "This result only covers the target, diff or files, and checks listed in the scope. Unknown runtime paths stay unknown.",
    },
    disclaimer: SLOPPASS_DISCLAIMER,
  };
}

import { DEFAULT_CHECKS } from "../categories.js";
import { SLOPPASS_DISCLAIMER } from "../disclaimer.js";
import { sourceFilesFromUnifiedDiff } from "../diff.js";
import { SlopPassRunInputSchema, type SlopPassRunInput } from "../schema.js";
import type { SlopPassResult, SlopPassSeverity } from "../types.js";
import { detectSlopSignals } from "./detectors.js";
import { getProvider } from "../vendor/promptfoo-lite/index.js";
import { toSlopPassVerdict } from "../verdict-pack.js";

const SEVERITIES: SlopPassSeverity[] = ["critical", "high", "medium", "low", "info"];

function emptyCounts(): Record<SlopPassSeverity, number> {
  return { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
}

export async function runSlopPass(input: SlopPassRunInput): Promise<SlopPassResult> {
  const parsed = SlopPassRunInputSchema.parse(input);
  const checks = parsed.checks ?? DEFAULT_CHECKS;
  const files =
    parsed.files && parsed.files.length > 0
      ? parsed.files
      : sourceFilesFromUnifiedDiff(parsed.diff ?? "");
  if (files.length === 0) {
    throw new Error("SlopPass could not find any added source lines in the provided diff.");
  }
  const provider = getProvider(parsed.provider);
  const providerFindings = await provider.evaluate(files, checks);
  const heuristicFindings = detectSlopSignals(files).filter((finding) =>
    checks.includes(finding.category)
  );
  const findings = [...providerFindings, ...heuristicFindings];
  const counts = emptyCounts();
  for (const finding of findings) counts[finding.severity]++;

  const checkedLabels = new Set(checks);
  const notChecked = DEFAULT_CHECKS.filter((category) => !checkedLabels.has(category)).map((category) => ({
    label: category,
    reason: "Check was not requested for this scoped run.",
  }));

  const hasSerious = SEVERITIES.slice(0, 3).some((severity) => counts[severity] > 0);
  return {
    target: parsed.target,
    scope: {
      checks_attempted: checks,
      files_reviewed: files.map((file) => file.path),
      provider: provider.id,
    },
    verdict: toSlopPassVerdict(counts),
    findings,
    not_checked: notChecked,
    summary: {
      posture: hasSerious
        ? "SlopPass found evidence-backed risks in the inspected scope."
        : "SlopPass found no major slop signals in the inspected scope.",
      counts_by_severity: counts,
      coverage_note:
        "This result only covers the target, diff or files, and checks listed in the scope. Unknown runtime paths stay unknown.",
    },
    disclaimer: SLOPPASS_DISCLAIMER,
  };
}

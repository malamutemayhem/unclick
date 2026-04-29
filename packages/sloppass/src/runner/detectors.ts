import type { SlopPassCategory, SlopPassFinding } from "../types.js";

interface SourceFile {
  path: string;
  content: string;
}

function lineOf(content: string, index: number): number {
  return content.slice(0, index).split(/\r?\n/).length;
}

function finding(
  file: SourceFile,
  title: string,
  category: SlopPassCategory,
  severity: SlopPassFinding["severity"],
  evidence: string,
  why_it_matters: string,
  suggested_fix: string,
  index = 0,
  confidence_note?: string
): SlopPassFinding {
  return {
    title,
    category,
    severity,
    why_it_matters,
    evidence,
    suggested_fix,
    file: file.path,
    line: lineOf(file.content, index),
    confidence_note,
  };
}

export function detectSlopSignals(files: SourceFile[]): SlopPassFinding[] {
  const findings: SlopPassFinding[] = [];

  for (const file of files) {
    const checks: Array<{
      pattern: RegExp;
      category: SlopPassCategory;
      severity: SlopPassFinding["severity"];
      title: string;
      why: string;
      fix: string;
      confidence?: string;
    }> = [
      {
        pattern: /\bTODO\b|throw new Error\(["']not implemented|placeholder|stubbed?/i,
        category: "scaffold_without_substance",
        severity: "medium",
        title: "Placeholder logic is still present",
        why: "Placeholder code can look complete in a generated scaffold while the risky path is not implemented.",
        fix: "Replace the placeholder with working logic or move it into the not-checked section of the run.",
      },
      {
        pattern: /\bas\s+any\b|@ts-ignore|@ts-expect-error/i,
        category: "maintenance_change_risk",
        severity: "low",
        title: "Type safety was bypassed",
        why: "Type bypasses are often generated to make a scaffold compile without proving the data shape.",
        fix: "Model the real type or isolate the unsafe boundary with a narrow parser.",
      },
      {
        pattern: /catch\s*\([^)]*\)\s*\{\s*\}|catch\s*\{\s*\}/,
        category: "logic_plausibility",
        severity: "high",
        title: "Error path is silently swallowed",
        why: "A silent catch can make a feature appear robust while failures disappear from the operator.",
        fix: "Return a visible error, log structured context, or add an explicit not-checked result.",
      },
      {
        pattern: /expect\([^)]*\)\.toBeTruthy\(\)|expect\([^)]*\)\.toBeDefined\(\)/,
        category: "test_proof_theatre",
        severity: "medium",
        title: "Assertion may only prove that something exists",
        why: "Weak assertions can pass while missing the behaviour the test claims to protect.",
        fix: "Assert the specific output, side effect, or failure mode the feature promises.",
        confidence: "Heuristic signal. Some existence assertions are valid as setup checks.",
      },
      {
        pattern: /retry|fallback|wrapper|orchestrat/i,
        category: "slopocalypse_failure_mode",
        severity: "info",
        title: "Robustness wording needs evidence",
        why: "Generated code often adds reliability-sounding wrappers before proving the original failure is handled.",
        fix: "Tie the wrapper to a concrete failure case and add a test that fails without it.",
        confidence: "First-class Slopocalypse detector: this is a smell unless paired with executable evidence.",
      },
      {
        pattern: /from\s+["'][^"']+["'];?|require\(["'][^"']+["']\)/,
        category: "grounding_api_reality",
        severity: "info",
        title: "Imported API should be grounded",
        why: "SlopPass flags API reality as a review area so reviewers confirm imports and methods exist in the installed version.",
        fix: "Verify the import against the installed package version or mark the check as not run.",
        confidence: "Inventory signal only. It is not a finding of wrongness by itself.",
      },
    ];

    for (const check of checks) {
      const match = check.pattern.exec(file.content);
      if (!match) continue;
      findings.push(
        finding(
          file,
          check.title,
          check.category,
          check.severity,
          match[0],
          check.why,
          check.fix,
          match.index,
          check.confidence
        )
      );
    }
  }

  return findings;
}

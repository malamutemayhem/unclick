import type {
  SlopPassCategory,
  SlopPassFinding,
  SlopPassSeverity,
  SlopPassSourceFile,
} from "./types.js";

export type SlopPassSmellCheckId =
  | "placeholder-logic"
  | "broad-any-bypass"
  | "unsafe-dynamic-execution"
  | "secret-like-literal"
  | "catch-all-fallback"
  | "weak-assertion"
  | "skipped-test"
  | "tautological-test"
  | "robustness-wording"
  | "generated-copy-marker";

export interface SlopPassSmellCheck {
  id: SlopPassSmellCheckId;
  category: SlopPassCategory;
  severity: SlopPassSeverity;
  title: string;
  pattern: RegExp;
  why_it_matters: string;
  suggested_fix: string;
  confidence_note?: string;
  evidence?: (match: RegExpExecArray, file: SlopPassSourceFile) => string;
}

const REDACTED_SECRET_EVIDENCE = "[redacted-secret-like-literal]";

export const DEFAULT_SLOPPASS_SMELL_CHECKS: SlopPassSmellCheck[] = [
  {
    id: "placeholder-logic",
    category: "scaffold_without_substance",
    severity: "medium",
    title: "Placeholder logic is still present",
    pattern: /\bTODO\b|throw new Error\(["']not implemented|placeholder|stubbed?/i,
    why_it_matters:
      "Placeholder code can look complete in a generated scaffold while the risky path is not implemented.",
    suggested_fix:
      "Replace the placeholder with working logic or move it into the not-checked section of the run.",
  },
  {
    id: "broad-any-bypass",
    category: "maintenance_change_risk",
    severity: "low",
    title: "Type safety was bypassed",
    pattern: /\bas\s+any\b|:\s*any\b|@ts-ignore|@ts-expect-error/i,
    why_it_matters:
      "Type bypasses are often generated to make a scaffold compile without proving the data shape.",
    suggested_fix: "Model the real type or isolate the unsafe boundary with a narrow parser.",
  },
  {
    id: "unsafe-dynamic-execution",
    category: "grounding_api_reality",
    severity: "critical",
    title: "Dynamic code execution is present",
    pattern: /\beval\s*\(|new\s+Function\s*\(/i,
    why_it_matters:
      "Generated code sometimes reaches for dynamic execution before proving the input boundary is safe.",
    suggested_fix:
      "Replace dynamic execution with explicit parsing or a narrow allowlist, then add a failing fixture.",
  },
  {
    id: "secret-like-literal",
    category: "maintenance_change_risk",
    severity: "high",
    title: "Secret-looking literal was detected",
    pattern:
      /\b(?:[A-Za-z0-9_]*?(?:api[_-]?key|apikey|secret|token|password)|authorization)\b\s*[:=]\s*["']?(?:bearer\s+)?[A-Za-z0-9._~+/=_-]{8,}["']?|\b(?:sk-[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9_]{16,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})\b/i,
    why_it_matters:
      "Generated examples can accidentally preserve credentials or teach future agents to copy private values.",
    suggested_fix:
      "Move the value to a secret store or fixture placeholder, then prove the report redacts the raw value.",
    evidence: () => REDACTED_SECRET_EVIDENCE,
  },
  {
    id: "catch-all-fallback",
    category: "logic_plausibility",
    severity: "high",
    title: "Failure path is hidden by a catch-all fallback",
    pattern:
      /catch\s*(?:\([^)]*\))?\s*\{\s*(?:return\s+(?:null|undefined|false|\[\]|\{\});?\s*)?\}/i,
    why_it_matters:
      "Catch-all fallbacks can make a feature appear resilient while failures disappear from the operator.",
    suggested_fix:
      "Return a visible error, log structured context, or add an explicit not-checked result.",
  },
  {
    id: "weak-assertion",
    category: "test_proof_theatre",
    severity: "medium",
    title: "Weak test assertion is present",
    pattern: /\.(?:toBeDefined|toBeTruthy|toBeFalsy)\s*\(\s*\)/i,
    why_it_matters:
      "Generated fixes sometimes weaken assertions so tests pass without proving the behavior.",
    suggested_fix:
      "Assert the exact expected value or state transition, then prove the old failure would fail this test.",
  },
  {
    id: "skipped-test",
    category: "test_proof_theatre",
    severity: "high",
    title: "Skipped or todo test is present",
    pattern: /\b(?:describe|it|test)\.(?:skip|todo)\s*\(/i,
    why_it_matters:
      "Skipped tests can make a run look green while the risky behavior is explicitly not checked.",
    suggested_fix:
      "Unskip the test, make it fail for the old behavior, then fix the implementation.",
  },
  {
    id: "tautological-test",
    category: "test_proof_theatre",
    severity: "high",
    title: "Tautological test assertion is present",
    pattern:
      /expect\s*\(\s*(true|false|null|undefined|["'][^"']*["']|\d+)\s*\)\s*\.\s*(?:toBe|toEqual|toStrictEqual)\s*\(\s*\1\s*\)/i,
    why_it_matters:
      "A test that asserts a constant against itself proves the test runner works, not the product behavior.",
    suggested_fix:
      "Assert real output from the subject under test and connect it to the user-facing behavior.",
  },
  {
    id: "robustness-wording",
    category: "slopocalypse_failure_mode",
    severity: "info",
    title: "Robustness wording needs evidence",
    pattern: /retry|fallback|wrapper|orchestrat/i,
    why_it_matters:
      "Generated code often adds reliability-sounding wrappers before proving the original failure is handled.",
    suggested_fix:
      "Tie the wrapper to a concrete failure case and add a test that fails without it.",
    confidence_note:
      "First-class Slopocalypse detector. This is a smell unless paired with executable evidence.",
  },
  {
    id: "generated-copy-marker",
    category: "slopocalypse_failure_mode",
    severity: "info",
    title: "Generated-copy marker needs human review",
    pattern:
      /generated by|auto-generated|chatgpt|claude|copilot|quick hack|temporary fix|just make it work/i,
    why_it_matters:
      "Generated-code markers and vague rescue phrases are a useful review trigger when evidence is thin.",
    suggested_fix:
      "Tie the generated section to concrete tests, ownership, and a clear maintenance note.",
    confidence_note:
      "Inventory signal only. It is not a finding of wrongness by itself.",
  },
];

function lineOf(content: string, index: number): number {
  return content.slice(0, index).split(/\r?\n/).length;
}

function actualLineOf(file: SlopPassSourceFile, index: number): number {
  return lineOf(file.content, index) + (file.start_line ?? 1) - 1;
}

function defaultEvidence(match: RegExpExecArray): string {
  const value = match[0].replace(/\s+/g, " ").trim();
  return value.length > 160 ? `${value.slice(0, 157)}...` : value;
}

function findingFromMatch(
  file: SlopPassSourceFile,
  check: SlopPassSmellCheck,
  match: RegExpExecArray,
): SlopPassFinding {
  return {
    title: check.title,
    category: check.category,
    severity: check.severity,
    why_it_matters: check.why_it_matters,
    evidence: check.evidence?.(match, file) ?? defaultEvidence(match),
    suggested_fix: check.suggested_fix,
    confidence_note: check.confidence_note,
    file: file.path,
    line: actualLineOf(file, match.index),
  };
}

function globalPattern(pattern: RegExp): RegExp {
  const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
  return new RegExp(pattern.source, flags);
}

export function getSlopPassSmellChecks(
  ids?: SlopPassSmellCheckId[],
): SlopPassSmellCheck[] {
  if (!ids) return DEFAULT_SLOPPASS_SMELL_CHECKS;
  const selected = new Set(ids);
  return DEFAULT_SLOPPASS_SMELL_CHECKS.filter((check) => selected.has(check.id));
}

export function detectSlopSmells(
  files: SlopPassSourceFile[],
  checks: SlopPassSmellCheck[] = DEFAULT_SLOPPASS_SMELL_CHECKS,
): SlopPassFinding[] {
  const findings: SlopPassFinding[] = [];

  for (const file of files) {
    for (const check of checks) {
      const pattern = globalPattern(check.pattern);
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(file.content)) !== null) {
        findings.push(findingFromMatch(file, check, match));
        if (match[0] === "") pattern.lastIndex += 1;
      }
    }
  }

  return findings;
}

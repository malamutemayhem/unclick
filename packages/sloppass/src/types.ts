export type SlopPassSeverity = "critical" | "high" | "medium" | "low" | "info";

export type SlopPassCategory =
  | "grounding_api_reality"
  | "logic_plausibility"
  | "scaffold_without_substance"
  | "test_proof_theatre"
  | "slopocalypse_failure_mode"
  | "maintenance_change_risk";

export interface SlopPassTarget {
  kind: "repo" | "branch" | "diff" | "files" | "pr" | "artifact";
  label: string;
  files?: string[];
  ref?: string;
}

export interface SlopPassScope {
  checks_attempted: SlopPassCategory[];
  files_reviewed: string[];
  provider: string;
}

export interface SlopPassFinding {
  title: string;
  category: SlopPassCategory;
  severity: SlopPassSeverity;
  why_it_matters: string;
  evidence: string;
  suggested_fix: string;
  confidence_note?: string;
  file?: string;
  line?: number;
}

export interface SlopPassNotChecked {
  label: string;
  reason: string;
}

export interface SlopPassSummary {
  posture: string;
  counts_by_severity: Record<SlopPassSeverity, number>;
  coverage_note: string;
}

export interface SlopPassResult {
  target: SlopPassTarget;
  scope: SlopPassScope;
  findings: SlopPassFinding[];
  not_checked: SlopPassNotChecked[];
  summary: SlopPassSummary;
  disclaimer: SlopPassDisclaimer;
}

export interface SlopPassDisclaimer {
  headline: string;
  body: string;
  compact: string;
}

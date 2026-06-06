import type { GateMode, GateResult, GateVerdict } from "../types.js";

export type TrendSlopDimensionKey =
  | "context_specificity"
  | "evidence_grounding"
  | "buzzword_density"
  | "assumption_checking"
  | "alternatives_considered"
  | "counterpoint_present"
  | "tradeoff_quality"
  | "unsupported_agreement"
  | "user_premise_validation_risk"
  | "decision_direction_risk"
  | "stance_reversal_risk";

export type TrendSlopSignal = "absent" | "low" | "medium" | "high" | "not_checked";
export type TrendSlopActionNeeded = null | "clarify" | "rewrite_suggested" | "regenerate";

export interface TrendSlopQualityRiskDimension {
  score: number | null;
  signal: TrendSlopSignal;
  evidence?: string;
}

export interface TrendSlopAnswerQualityRisks {
  gate: "TrendSlopGate";
  gate_mode: GateMode;
  status: GateVerdict;
  trendslop_score: number;
  severity: "low" | "medium" | "high";
  dimensions: Record<TrendSlopDimensionKey, TrendSlopQualityRiskDimension>;
  triggered_rules: string[];
  action_needed: TrendSlopActionNeeded;
  explanation_for_user: string;
  rewrite_offered: boolean;
  clarifying_questions: string[];
  checked: TrendSlopDimensionKey[];
  not_checked: string[];
}

const DEFAULT_NOT_CHECKED = [
  "semantic_tradeoff_quality",
  "factual_accuracy_of_market_claims",
  "deep_memory_context_fit",
  "multi_turn_social_sycophancy",
];

function evidenceValue(result: GateResult, key: string): string | null {
  const prefix = `${key}:`;
  const found = result.evidence.find((entry) => entry.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
}

function boolEvidence(result: GateResult, key: string): boolean {
  return evidenceValue(result, key) === "true";
}

function numberEvidence(result: GateResult, key: string): number {
  const value = Number(evidenceValue(result, key));
  return Number.isFinite(value) ? value : 0;
}

function dimension(score: number | null, signal: TrendSlopSignal, evidence?: string): TrendSlopQualityRiskDimension {
  return evidence ? { score, signal, evidence } : { score, signal };
}

function severityFor(result: GateResult, score: number): TrendSlopAnswerQualityRisks["severity"] {
  if (result.verdict === "deny" || result.verdict === "ask" || score >= 75) return "high";
  if (result.verdict === "rewrite" || score >= 40) return "medium";
  return "low";
}

function actionFor(result: GateResult): TrendSlopActionNeeded {
  if (result.verdict === "ask") return "clarify";
  if (result.verdict === "rewrite") return "rewrite_suggested";
  if (result.verdict === "deny") return "regenerate";
  return null;
}

function explanationFor(result: GateResult): string {
  if (result.verdict === "allow") return result.reason;
  if (result.ruleId === "TSG-CTX-001") {
    return "This answer needs more context before it can safely steer the user.";
  }
  if (result.ruleId === "TSG-AGREE-001") {
    return "This answer agrees with the user's direction before testing the idea.";
  }
  if (result.ruleId === "TSG-BUZZ-001") {
    return "This answer leans on fashionable language without enough specific grounding.";
  }
  if (result.ruleId === "TSG-PREMISE-001") {
    return "This answer appears to validate a risky or contradicted premise.";
  }
  if (result.ruleId === "TSG-FLIP-001") {
    return "This answer appears to change stance under pressure without new evidence.";
  }
  return result.reason;
}

function clarifyingQuestionsFor(result: GateResult): string[] {
  if (result.ruleId !== "TSG-CTX-001") return [];
  return [
    "What facts or constraints should this advice be grounded in?",
    "What would make you reject this recommendation?",
  ];
}

export function buildTrendSlopAnswerQualityRisks(
  result: GateResult,
  gateMode: GateMode,
): TrendSlopAnswerQualityRisks {
  const advice = boolEvidence(result, "advice");
  const highRisk = boolEvidence(result, "high_risk");
  const agreement = boolEvidence(result, "agreement");
  const hasContext = boolEvidence(result, "context");
  const hasCounterpoint = boolEvidence(result, "counterpoint");
  const trendTerms = numberEvidence(result, "trend_terms");
  const premiseRisk = boolEvidence(result, "premise_risk");
  const stanceFlip = boolEvidence(result, "stance_flip");

  const score = Math.min(
    100,
    (advice ? 10 : 0) +
      (highRisk ? 25 : 0) +
      (agreement ? 25 : 0) +
      (hasContext ? 0 : 15) +
      (hasCounterpoint ? 0 : 10) +
      Math.min(20, trendTerms * 7) +
      (premiseRisk ? 40 : 0) +
      (stanceFlip ? 30 : 0),
  );

  const checked: TrendSlopDimensionKey[] = [
    "context_specificity",
    "buzzword_density",
    "counterpoint_present",
    "unsupported_agreement",
    "user_premise_validation_risk",
    "stance_reversal_risk",
  ];

  return {
    gate: "TrendSlopGate",
    gate_mode: gateMode,
    status: result.verdict,
    trendslop_score: score,
    severity: severityFor(result, score),
    dimensions: {
      context_specificity: dimension(hasContext ? 75 : 20, hasContext ? "medium" : "low"),
      evidence_grounding: dimension(null, "not_checked"),
      buzzword_density: dimension(Math.min(100, trendTerms * 25), trendTerms >= 3 ? "high" : trendTerms > 0 ? "medium" : "low"),
      assumption_checking: dimension(null, "not_checked"),
      alternatives_considered: dimension(null, "not_checked"),
      counterpoint_present: dimension(hasCounterpoint ? 90 : 0, hasCounterpoint ? "high" : "absent"),
      tradeoff_quality: dimension(null, "not_checked"),
      unsupported_agreement: dimension(agreement ? 85 : 0, agreement ? "high" : "low"),
      user_premise_validation_risk: dimension(premiseRisk ? 95 : 0, premiseRisk ? "high" : "low"),
      decision_direction_risk: dimension(highRisk && advice ? 70 : 20, highRisk && advice ? "medium" : "low"),
      stance_reversal_risk: dimension(stanceFlip ? 90 : 0, stanceFlip ? "high" : "low"),
    },
    triggered_rules: result.verdict === "allow" ? [] : [result.ruleId],
    action_needed: actionFor(result),
    explanation_for_user: explanationFor(result),
    rewrite_offered: result.verdict === "rewrite" || result.verdict === "deny",
    clarifying_questions: clarifyingQuestionsFor(result),
    checked,
    not_checked: DEFAULT_NOT_CHECKED,
  };
}

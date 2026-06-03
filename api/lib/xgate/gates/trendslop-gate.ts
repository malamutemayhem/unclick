import type { Gate, GateContext, GateResult } from "../types.js";

const GATE = "TrendSlopGate";

const ADVICE_TERMS = [
  "advice",
  "recommend",
  "strategy",
  "roadmap",
  "decision",
  "should",
  "launch",
  "positioning",
  "hire",
  "pricing",
  "invest",
  "business",
  "product",
];

const HIGH_RISK_TERMS = [
  "legal",
  "medical",
  "health",
  "therapy",
  "financial",
  "investment",
  "security",
  "production",
  "deploy",
  "delete",
  "credential",
  "privacy",
  "safety",
];

const AGREEMENT_TERMS = [
  "you are absolutely right",
  "you're absolutely right",
  "you are right",
  "you're right",
  "i completely agree",
  "i totally agree",
  "great idea",
  "brilliant idea",
  "exactly",
  "100%",
  "absolutely",
  "love this",
];

const TREND_TERMS = [
  "ai-first",
  "agentic",
  "autonomous agent",
  "digital transformation",
  "disruptive",
  "ecosystem",
  "flywheel",
  "growth loop",
  "hyper-personalization",
  "leverage",
  "moat",
  "north star",
  "omnichannel",
  "platform play",
  "scale",
  "synergy",
  "thought leadership",
  "unlock",
  "viral loop",
];

const COUNTERPOINT_TERMS = [
  "assumption",
  "counterpoint",
  "downside",
  "evidence",
  "however",
  "i would push back",
  "missing context",
  "risk",
  "tradeoff",
  "trade-off",
  "uncertain",
  "unknown",
];

const CONTEXT_TERMS = [
  "based on",
  "because",
  "customer",
  "evidence",
  "metric",
  "receipt",
  "source",
  "specific",
  "user-provided",
];

interface TrendSlopParsedSignals {
  answer_quality_risks?: {
    trendslop?: unknown;
    sycophancy?: unknown;
    context_specificity?: unknown;
    evidence_grounding?: unknown;
  };
  risk_level?: unknown;
  requires_decision?: unknown;
}

function result(
  verdict: GateResult["verdict"],
  ruleId: string,
  reason: string,
  evidence: string[] = [],
): GateResult {
  return { gate: GATE, verdict, ruleId, reason, evidence };
}

function lower(raw: string): string {
  return raw.toLowerCase();
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function countMatches(text: string, terms: string[]): number {
  return terms.reduce((count, term) => count + (text.includes(term) ? 1 : 0), 0);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parsedSignals(value: unknown): TrendSlopParsedSignals {
  if (!isRecord(value)) return {};
  const risks = isRecord(value.answer_quality_risks) ? value.answer_quality_risks : undefined;
  return {
    answer_quality_risks: risks,
    risk_level: value.risk_level,
    requires_decision: value.requires_decision,
  };
}

function signalIsHigh(value: unknown): boolean {
  return value === "high" || value === "critical" || value === true;
}

function isLikelyAnswerSurface(ctx: GateContext, text: string, signals: TrendSlopParsedSignals): boolean {
  if (ctx.action.class === "send") return true;
  if (signalIsHigh(signals.requires_decision)) return true;

  const tool = lower(ctx.action.tool);
  return (
    tool.includes("answer") ||
    tool.includes("chat") ||
    tool.includes("launchpad") ||
    tool.includes("boardroom") ||
    tool.includes("reply") ||
    tool.includes("message") ||
    includesAny(text, ADVICE_TERMS)
  );
}

export const trendSlopGate: Gate = function TrendSlopGate(ctx: GateContext): GateResult {
  try {
    const text = lower(ctx.action.raw ?? "");
    const signals = parsedSignals(ctx.action.parsed);
    const risks = signals.answer_quality_risks;

    if (!isLikelyAnswerSurface(ctx, text, signals)) {
      return result("allow", "trendslop.not_answer_surface", "The action is not an answer or advice surface.");
    }

    const advice = includesAny(text, ADVICE_TERMS);
    const highRisk = includesAny(text, HIGH_RISK_TERMS) || signalIsHigh(signals.risk_level);
    const agreement = includesAny(text, AGREEMENT_TERMS);
    const trendCount = countMatches(text, TREND_TERMS);
    const hasCounterpoint = includesAny(text, COUNTERPOINT_TERMS);
    const hasContext = includesAny(text, CONTEXT_TERMS);
    const riskHigh =
      signalIsHigh(risks?.trendslop) ||
      signalIsHigh(risks?.sycophancy) ||
      risks?.context_specificity === "low" ||
      risks?.evidence_grounding === "low";

    const evidence = [
      `advice:${String(advice)}`,
      `high_risk:${String(highRisk)}`,
      `agreement:${String(agreement)}`,
      `trend_terms:${String(trendCount)}`,
      `counterpoint:${String(hasCounterpoint)}`,
      `context:${String(hasContext)}`,
    ];

    if (highRisk && advice && !hasContext) {
      return result(
        "ask",
        "trendslop.high_risk_context_missing",
        "High-risk advice is missing context or evidence before it can safely steer the user.",
        evidence,
      );
    }

    if ((agreement || signalIsHigh(risks?.sycophancy)) && advice && !hasCounterpoint) {
      return result(
        "rewrite",
        "trendslop.sycophancy_rewrite",
        "The draft appears to accept the user's direction without enough challenge or counterpoint.",
        evidence,
      );
    }

    if ((trendCount >= 3 || signalIsHigh(risks?.trendslop)) && !hasContext) {
      return result(
        "rewrite",
        "trendslop.generic_trend_rewrite",
        "The draft leans on fashionable language without enough situation-specific grounding.",
        evidence,
      );
    }

    if (riskHigh && !hasCounterpoint) {
      return result(
        "rewrite",
        "trendslop.answerpass_quality_rewrite",
        "AnswerPass quality signals require a clearer counterpoint, tradeoff, or uncertainty note.",
        evidence,
      );
    }

    return result(
      "allow",
      "trendslop.grounded_enough",
      "The answer has enough context, evidence, or counterpoint for this deterministic gate.",
      evidence,
    );
  } catch (error) {
    return result(
      "ask",
      "trendslop.parse_error",
      "TrendSlopGate could not safely evaluate the answer.",
      [error instanceof Error ? error.message : "unknown error"],
    );
  }
};

// apps/jobsmith/src/lib/rulePack.ts
//
// Jobsmith Universal Rules engine: pure, deterministic, no LLM.
//
// Each Rule maps to one entry in docs/jobsmith-universal-rules-v1.md and
// implements a single check function. The engine (`runRulePack`) iterates
// rules in declaration order and returns a structured RulePackResult that
// downstream UI and proof-receipt code can consume without re-running the
// checks.
//
// This file ships with two seed rules (B3-em-dash, B3-gpt4-lexicon) that
// demonstrate the regex-check and lookup-list-scan patterns. The remaining
// 38 rules will be added one band at a time, following the same shape,
// each in its own focused PR. No structural (DOCX inspection) rules ship
// in v1; they require docx parsing infrastructure that lives in a later
// chip.

export type RuleBand =
  | "age-signal-hygiene"
  | "ats-conventions"
  | "ai-tell-vocabulary"
  | "voice-and-specificity"
  | "cover-letter-conventions"
  | "structural-and-format";

export type RuleSeverity = "ERROR" | "WARN" | "INFO";

export type RuleCheckKind = "regex" | "lookup" | "structural";

export interface RuleViolation {
  /** Stable id of the rule that fired. */
  ruleId: string;
  /** Band of the rule that fired. */
  band: RuleBand;
  /** Severity copied from the rule. */
  severity: RuleSeverity;
  /** Short human-readable summary of the violation. */
  message: string;
  /** Character offset where the violation begins. */
  start: number;
  /** Character offset where the violation ends. */
  end: number;
  /** Exact matched text (may be empty for structural rules). */
  match: string;
  /**
   * Optional auxiliary detail (e.g. the matched lexicon item or the regex
   * group). UI surfaces should treat this as advisory text.
   */
  detail?: string;
}

export interface Rule {
  /** Stable id, e.g. "B3-em-dash". Must match docs/jobsmith-universal-rules-v1.md. */
  id: string;
  band: RuleBand;
  severity: RuleSeverity;
  /** One-line description of the rule. */
  summary: string;
  /** Engine check pattern: regex, lookup, or structural. */
  checkKind: RuleCheckKind;
  /** Source citation, copied from docs/jobsmith-universal-rules-v1.md. */
  source: string;
  /** Optional public-facing evidence URL or document title. */
  evidence?: string;
  /**
   * Pure check function. MUST be deterministic and side-effect-free. The
   * engine assumes idempotent results for identical input. Return [] when
   * the rule passes.
   */
  check: (text: string) => RuleViolation[];
}

export interface RulePackResult {
  /** All violations, in rule-declaration order. */
  violations: RuleViolation[];
  /** Total counts by severity. */
  totals: Record<RuleSeverity, number>;
  /** Total counts by band. */
  byBand: Record<RuleBand, number>;
  /**
   * True when no ERROR-severity violation fired. WARN and INFO are not
   * blocking; the caller decides whether to surface them.
   */
  errorFree: boolean;
}

const ZERO_TOTALS = (): Record<RuleSeverity, number> => ({ ERROR: 0, WARN: 0, INFO: 0 });

const ZERO_BANDS = (): Record<RuleBand, number> => ({
  "age-signal-hygiene": 0,
  "ats-conventions": 0,
  "ai-tell-vocabulary": 0,
  "voice-and-specificity": 0,
  "cover-letter-conventions": 0,
  "structural-and-format": 0,
});

/**
 * Run an arbitrary rule pack against a candidate text. Deterministic and
 * order-preserving: violations are concatenated in rule-declaration order
 * so a snapshot-style test can pin the output without sorting.
 */
export function runRulePack(text: string, rules: Rule[]): RulePackResult {
  const violations: RuleViolation[] = [];
  const totals = ZERO_TOTALS();
  const byBand = ZERO_BANDS();
  for (const rule of rules) {
    const fired = rule.check(text);
    for (const v of fired) {
      violations.push(v);
      totals[v.severity] += 1;
      byBand[v.band] += 1;
    }
  }
  return {
    violations,
    totals,
    byBand,
    errorFree: totals.ERROR === 0,
  };
}

// ─── Reusable check builders ─────────────────────────────────────────────

/**
 * Build a `regex` check. The regex MUST have the global flag; the builder
 * does not mutate it. `messageFor` may inspect the match group.
 */
export function regexRuleCheck(input: {
  ruleId: string;
  band: RuleBand;
  severity: RuleSeverity;
  pattern: RegExp;
  messageFor: (match: RegExpExecArray) => string;
}): (text: string) => RuleViolation[] {
  if (!input.pattern.global) {
    throw new Error(
      `regexRuleCheck requires the global flag on pattern for rule ${input.ruleId}`,
    );
  }
  return (text: string): RuleViolation[] => {
    const out: RuleViolation[] = [];
    // Clone the regex so concurrent uses do not stomp on lastIndex.
    const re = new RegExp(input.pattern.source, input.pattern.flags);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      out.push({
        ruleId: input.ruleId,
        band: input.band,
        severity: input.severity,
        message: input.messageFor(m),
        start: m.index,
        end: m.index + m[0].length,
        match: m[0],
        detail: m[0],
      });
      if (m[0].length === 0) {
        // Guard against zero-width matches looping forever.
        re.lastIndex += 1;
      }
    }
    return out;
  };
}

/**
 * Build a `lookup` check. Matches are case-insensitive and bounded by word
 * boundaries so substrings inside other words are ignored.
 */
export function lookupRuleCheck(input: {
  ruleId: string;
  band: RuleBand;
  severity: RuleSeverity;
  lexicon: readonly string[];
  messageFor: (term: string) => string;
}): (text: string) => RuleViolation[] {
  // Pre-escape and pre-compile once per builder call. The cloned regex
  // inside the returned closure keeps the cache safe for concurrent use.
  const escaped = input.lexicon
    .map((term) => term.trim())
    .filter((term) => term.length > 0)
    .map(escapeRegExp);
  if (escaped.length === 0) {
    return () => [];
  }
  const lexiconPattern = new RegExp(`\\b(?:${escaped.join("|")})\\b`, "gi");
  return (text: string): RuleViolation[] => {
    const out: RuleViolation[] = [];
    const re = new RegExp(lexiconPattern.source, lexiconPattern.flags);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const term = m[0];
      out.push({
        ruleId: input.ruleId,
        band: input.band,
        severity: input.severity,
        message: input.messageFor(term),
        start: m.index,
        end: m.index + term.length,
        match: term,
        detail: term.toLowerCase(),
      });
      if (term.length === 0) {
        re.lastIndex += 1;
      }
    }
    return out;
  };
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─── Seed rules: Band 3 AI-tell vocabulary ──────────────────────────────

/**
 * B3-em-dash: No em dashes anywhere in candidate text.
 *
 * Covers the universal "Signs of AI writing" em-dash signal and Chris's
 * brand-voice standing rule. Replacement guidance lives in the surfaced
 * `message`; the engine never auto-replaces text.
 */
export const EM_DASH_RULE: Rule = {
  id: "B3-em-dash",
  band: "ai-tell-vocabulary",
  severity: "ERROR",
  summary: "No em dashes anywhere in CV, cover letter, email, or portal copy.",
  checkKind: "regex",
  source: "Wikipedia \"Signs of AI writing\" maintained list; Chris Byrne brand voice standing rule.",
  evidence: "https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing",
  check: regexRuleCheck({
    ruleId: "B3-em-dash",
    band: "ai-tell-vocabulary",
    severity: "ERROR",
    pattern: /[\u2014\u2013]/g,
    messageFor: (m) =>
      `Em or en dash detected ("${m[0]}"). Replace with a comma, a colon, or a full stop.`,
  }),
};

/**
 * GPT-4 lexicon for `B3-gpt4-lexicon`.
 *
 * The list is intentionally small: false-positive rates climb fast once
 * "leverage" and "align" creep into normal business writing. Keep this
 * curated; do not bulk-import every word the Wikipedia article flags.
 */
export const GPT4_LEXICON: readonly string[] = [
  "delve",
  "tapestry",
  "pivotal",
  "crucial",
  "meticulous",
  "underscore",
  "vibrant",
  "intricate",
  "leverage",
];

/**
 * B3-gpt4-lexicon: WARN-severity scan for the GPT-4 lexicon. Each match
 * surfaces the offending word in the proof receipt; the engine never
 * rewrites the sentence.
 */
export const GPT4_LEXICON_RULE: Rule = {
  id: "B3-gpt4-lexicon",
  band: "ai-tell-vocabulary",
  severity: "WARN",
  summary: "Flag GPT-4 lexicon words that signal AI-generated phrasing.",
  checkKind: "lookup",
  source: "Wikipedia \"Signs of AI writing\"; Resume Optimizer Pro 2026 lexicon.",
  evidence: "https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing",
  check: lookupRuleCheck({
    ruleId: "B3-gpt4-lexicon",
    band: "ai-tell-vocabulary",
    severity: "WARN",
    lexicon: GPT4_LEXICON,
    messageFor: (term) =>
      `GPT-4 lexicon term detected ("${term}"). Prefer a domain-specific word grounded in the applicant's own writing samples.`,
  }),
};

/**
 * Seeded rule pack for v1. Builder chips that wire additional rules MUST
 * extend this array rather than redefining it, so downstream callers can
 * import a stable reference.
 */
export const JOBSMITH_UNIVERSAL_RULES_V1: Rule[] = [EM_DASH_RULE, GPT4_LEXICON_RULE];

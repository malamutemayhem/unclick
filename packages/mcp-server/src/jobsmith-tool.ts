// JobSmith as a first-class MCP app. JobSmith is a CV / cover-letter quality
// tool; this connector exposes its deterministic rules engine so any agent can
// run JobSmith's real checks on a CV or cover letter. No API key: the logic is
// local. The rule pack is generated from JobSmith's source of truth
// (scripts/generate-jobsmith-rules.mjs), so these are the SAME rules the app uses.

import { stampMeta } from "./connector-meta.js";
import { JOBSMITH_RULE_PACK, type JobsmithRawRule, type JobsmithRuleSeverity } from "./jobsmith-rules.generated.js";

const JOBSMITH_SOURCE = `JobSmith rules engine v${JOBSMITH_RULE_PACK.version}`;

type SeverityAction = "blocks" | "flags" | "suggests";

interface RuleFinding {
  ruleId: string;
  name: string;
  category: string;
  severity: JobsmithRuleSeverity;
  action: SeverityAction;
  message: string;
  match: string;
  start: number;
  end: number;
  checkType: "regex" | "keyword_list";
  needsRefresh: boolean;
}

// ─── Ported pure logic (faithful to apps/jobsmith/src/lib/checkEngine.ts) ───────

function actionForSeverity(severity: JobsmithRuleSeverity): SeverityAction {
  if (severity === "ERROR") return "blocks";
  if (severity === "WARN") return "flags";
  return "suggests";
}

function ruleNeedsRefresh(rule: JobsmithRawRule, now: Date): boolean {
  if (rule.decay_period_days === null) return false;
  const verifiedAt = new Date(`${rule.last_verified_at}T00:00:00.000Z`);
  if (Number.isNaN(verifiedAt.valueOf())) return true;
  return now.getTime() - verifiedAt.getTime() > rule.decay_period_days * 24 * 60 * 60 * 1000;
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitKeywordList(value: string): string[] {
  return value
    .split(/[,|]/)
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter((t) => t.length > 1);
}

function patternFromRegexSpec(spec: string): RegExp | null {
  const trimmed = spec.trim();
  if (trimmed.includes("U+2014") || trimmed.includes("count(/—/g)")) return /—/g;
  if (trimmed.includes("U+1F300-U+1FAFF") || trimmed.toLowerCase().includes("emoji unicode")) {
    return /[\u{1F300}-\u{1FAFF}☀-➿]/gu;
  }
  if (/^(?:\\b|\[|\^|\()/.test(trimmed)) {
    try {
      return new RegExp(trimmed, "gi");
    } catch {
      return null;
    }
  }
  return null;
}

function isAutomatedKeywordBlocklistSpec(spec: string): boolean {
  const n = spec.trim().toLowerCase();
  if (/\ballow(?:list|-list)\b|\ballowed\s+(?:headings?|sections?|labels?|terms?)\b/.test(n)) return false;
  const blocklist = /\b(?:flag|block|ban|avoid|detect|reject|replace|blocklist|token list|phrase list|filler list)\b/.test(n);
  const analysis = /^(?:require|scan|extract|compare|verify|map|align|maintain)\b|\b(?:must include|required|requires|verify|compare|extract)\b/.test(n);
  if (analysis && !blocklist) return false;
  if (blocklist) return true;
  return spec.includes("|");
}

function keywordsFromSpec(spec: string): string[] {
  const bracket = spec.match(/\[([^\]]+)\]/);
  if (bracket) return splitKeywordList(bracket[1]);
  if (spec.includes("|") && !spec.includes("\\b")) return splitKeywordList(spec.replace(/^Regex over the listed phrases\./i, ""));
  const grouped = spec.match(/\^\(([^)]+)\)/);
  if (grouped) return splitKeywordList(grouped[1]);
  return [];
}

function findingFromMatch(rule: JobsmithRawRule, match: string, start: number, end: number, checkType: "regex" | "keyword_list", now: Date): RuleFinding {
  return {
    ruleId: rule.rule_id,
    name: rule.name,
    category: rule.category,
    severity: rule.severity,
    action: actionForSeverity(rule.severity),
    message: rule.what,
    match,
    start,
    end,
    checkType,
    needsRefresh: ruleNeedsRefresh(rule, now),
  };
}

type TextChecker = (text: string) => RuleFinding[];

function buildTextChecker(rule: JobsmithRawRule, now: Date): TextChecker | null {
  if (rule.check_method.type === "regex") {
    const pattern = patternFromRegexSpec(rule.check_method.spec);
    if (!pattern) return null;
    return (text: string) => {
      const findings: RuleFinding[] = [];
      const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        findings.push(findingFromMatch(rule, m[0], m.index, m.index + m[0].length, "regex", now));
        if (m[0].length === 0) re.lastIndex += 1;
      }
      return findings;
    };
  }
  if (rule.check_method.type === "keyword_list") {
    if (!isAutomatedKeywordBlocklistSpec(rule.check_method.spec)) return null;
    const keywords = keywordsFromSpec(rule.check_method.spec);
    if (keywords.length === 0) return null;
    const pattern = new RegExp(`\\b(?:${keywords.map(escapeRegExp).join("|")})\\b`, "gi");
    return (text: string) => {
      const findings: RuleFinding[] = [];
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        findings.push(findingFromMatch(rule, m[0], m.index, m.index + m[0].length, "keyword_list", now));
      }
      return findings;
    };
  }
  return null;
}

function zeroSeverityTotals(): Record<JobsmithRuleSeverity, number> {
  return { ERROR: 0, WARN: 0, INFO: 0 };
}

function runChecks(text: string, now = new Date()) {
  const findings: RuleFinding[] = [];
  const reviewNeeded: Array<{ ruleId: string; name: string; category: string; severity: JobsmithRuleSeverity }> = [];
  const bySeverity = zeroSeverityTotals();

  for (const rule of JOBSMITH_RULE_PACK.rules) {
    const checker = buildTextChecker(rule, now);
    if (!checker) {
      reviewNeeded.push({ ruleId: rule.rule_id, name: rule.name, category: rule.category, severity: rule.severity });
      continue;
    }
    for (const finding of checker(text)) {
      findings.push(finding);
      bySeverity[finding.severity] += 1;
    }
  }

  return {
    version: JOBSMITH_RULE_PACK.version,
    totalRules: JOBSMITH_RULE_PACK.total_rules,
    findings,
    reviewNeededCount: reviewNeeded.length,
    reviewNeeded: reviewNeeded.slice(0, 50),
    bySeverity,
    blocked: bySeverity.ERROR > 0,
  };
}

// ─── MCP operations ─────────────────────────────────────────────────────────

export async function jobsmithCheck(args: Record<string, unknown>): Promise<unknown> {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required (paste a CV or cover letter to check)." };
  const result = runChecks(text);
  return stampMeta(result, {
    source: JOBSMITH_SOURCE,
    fetched_at: new Date().toISOString(),
    next_steps: result.blocked
      ? ["Fix the ERROR findings first (they block), then re-run jobsmith_check."]
      : ["Use jobsmith_rules to see every rule, including the ones that need a human eye."],
  });
}

export async function jobsmithRules(args: Record<string, unknown>): Promise<unknown> {
  const byCategory: Record<string, number> = {};
  const bySeverity = zeroSeverityTotals();
  let automated = 0;
  const now = new Date();
  for (const rule of JOBSMITH_RULE_PACK.rules) {
    byCategory[rule.category] = (byCategory[rule.category] ?? 0) + 1;
    bySeverity[rule.severity] += 1;
    if (buildTextChecker(rule, now)) automated += 1;
  }
  const category = args.category ? String(args.category).toUpperCase() : null;
  const rules = JOBSMITH_RULE_PACK.rules
    .filter((r) => !category || r.category === category)
    .map((r) => ({ ruleId: r.rule_id, name: r.name, category: r.category, severity: r.severity, what: r.what }));

  return stampMeta(
    {
      version: JOBSMITH_RULE_PACK.version,
      totalRules: JOBSMITH_RULE_PACK.total_rules,
      automatedRules: automated,
      reviewRules: JOBSMITH_RULE_PACK.total_rules - automated,
      byCategory,
      bySeverity,
      rules: category ? rules : rules.slice(0, 30),
    },
    {
      source: JOBSMITH_SOURCE,
      fetched_at: new Date().toISOString(),
      next_steps: ["Use jobsmith_check with your CV or cover letter text to run the automated rules."],
    },
  );
}

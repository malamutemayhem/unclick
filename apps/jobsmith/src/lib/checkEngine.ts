// apps/jobsmith/src/lib/checkEngine.ts
//
// Deterministic JobSmith rules engine.
// The 229-rule pack is copied from the source of truth and loaded as data.
// This file validates that data, runs safe text checks, and leaves anything
// requiring document parsing or judgement in a review-needed bucket.

import { load as parseYaml } from "js-yaml";

import rulePackYaml from "../../rules/jobsmith-universal-rules-v1.yaml?raw";

export type RuleSeverity = "ERROR" | "WARN" | "INFO";

export type RuleCheckMethodType =
  | "regex"
  | "keyword_list"
  | "count_threshold"
  | "format_check"
  | "semantic_check"
  | "human_review";

export type SeverityAction = "blocks" | "flags" | "suggests";

export interface RuleSource {
  doc: string;
  section: string;
  round: number;
}

export interface RuleAppliesWhen {
  doc_type: string[];
  role_family: string[] | string;
  age_band: string[] | string;
  jurisdiction: string[] | string;
  ats_vendor: string[] | string;
}

export interface RuleCheckMethod {
  type: RuleCheckMethodType;
  spec: string;
}

export interface JobsmithRule {
  rule_id: string;
  name: string;
  category: string;
  what: string;
  why: string;
  sources: RuleSource[];
  applies_when: RuleAppliesWhen;
  when_not_applies: string;
  check_method: RuleCheckMethod;
  severity: RuleSeverity;
  decay_period_days: number | null;
  last_verified_at: string;
  volatile: boolean;
  notes: string;
}

export interface JobsmithRulePack {
  version: number;
  generated_at: string;
  total_rules: number;
  categories: string[];
  sources: string[];
  rules: JobsmithRule[];
}

export interface RulePackSummary {
  version: number;
  generatedAt: string;
  totalRules: number;
  categories: string[];
  bySeverity: Record<RuleSeverity, number>;
  byCheckType: Record<RuleCheckMethodType, number>;
  needsRefresh: number;
}

export interface RuleFinding {
  ruleId: string;
  name: string;
  category: string;
  severity: RuleSeverity;
  action: SeverityAction;
  message: string;
  match: string;
  start: number;
  end: number;
  checkType: Extract<RuleCheckMethodType, "regex" | "keyword_list">;
  needsRefresh: boolean;
}

export interface ReviewNeededRule {
  ruleId: string;
  name: string;
  category: string;
  severity: RuleSeverity;
  action: SeverityAction;
  checkType: RuleCheckMethodType;
  needsRefresh: boolean;
}

export interface JobsmithCheckResult {
  version: number;
  totalRules: number;
  findings: RuleFinding[];
  reviewNeeded: ReviewNeededRule[];
  bySeverity: Record<RuleSeverity, number>;
  blocked: boolean;
}

const SEVERITIES: RuleSeverity[] = ["ERROR", "WARN", "INFO"];
const CHECK_TYPES: RuleCheckMethodType[] = [
  "regex",
  "keyword_list",
  "count_threshold",
  "format_check",
  "semantic_check",
  "human_review",
];

export const JOBSMITH_RULE_PACK_V1 = loadRulePackFromYaml(rulePackYaml);

export function loadRulePackFromYaml(yamlText: string): JobsmithRulePack {
  return validateRulePack(parseYaml(yamlText));
}

export function validateRulePack(raw: unknown): JobsmithRulePack {
  const pack = asRecord(raw, "rule pack");
  const version = asNumber(pack.version, "version");
  const generated_at = asDateText(pack.generated_at, "generated_at");
  const total_rules = asNumber(pack.total_rules, "total_rules");
  const categories = asStringArray(pack.categories, "categories");
  const sources = asStringArray(pack.sources, "sources");
  const rawRules = asArray(pack.rules, "rules");

  const ids = new Set<string>();
  const rules = rawRules.map((rawRule, index) => validateRule(rawRule, index, ids));

  if (rules.length !== total_rules) {
    throw new Error(`rule pack expected ${total_rules} rules but loaded ${rules.length}`);
  }

  const missingCategories = new Set(
    rules.map((rule) => rule.category).filter((category) => !categories.includes(category)),
  );
  if (missingCategories.size > 0) {
    throw new Error(`rule pack categories missing: ${Array.from(missingCategories).join(", ")}`);
  }

  return { version, generated_at, total_rules, categories, sources, rules };
}

export function summarizeRulePack(
  pack: JobsmithRulePack = JOBSMITH_RULE_PACK_V1,
  now: Date = new Date(),
): RulePackSummary {
  const bySeverity = zeroSeverityTotals();
  const byCheckType = zeroCheckTypeTotals();
  let needsRefresh = 0;

  for (const rule of pack.rules) {
    bySeverity[rule.severity] += 1;
    byCheckType[rule.check_method.type] += 1;
    if (ruleNeedsRefresh(rule, now)) needsRefresh += 1;
  }

  return {
    version: pack.version,
    generatedAt: pack.generated_at,
    totalRules: pack.total_rules,
    categories: pack.categories,
    bySeverity,
    byCheckType,
    needsRefresh,
  };
}

export function runJobsmithChecks(
  text: string,
  pack: JobsmithRulePack = JOBSMITH_RULE_PACK_V1,
  now: Date = new Date(),
): JobsmithCheckResult {
  const findings: RuleFinding[] = [];
  const reviewNeeded: ReviewNeededRule[] = [];
  const bySeverity = zeroSeverityTotals();

  for (const rule of pack.rules) {
    const checker = buildTextChecker(rule, now);
    if (!checker) {
      reviewNeeded.push({
        ruleId: rule.rule_id,
        name: rule.name,
        category: rule.category,
        severity: rule.severity,
        action: actionForSeverity(rule.severity),
        checkType: rule.check_method.type,
        needsRefresh: ruleNeedsRefresh(rule, now),
      });
      continue;
    }

    for (const finding of checker(text)) {
      findings.push(finding);
      bySeverity[finding.severity] += 1;
    }
  }

  return {
    version: pack.version,
    totalRules: pack.total_rules,
    findings,
    reviewNeeded,
    bySeverity,
    blocked: bySeverity.ERROR > 0,
  };
}

export function actionForSeverity(severity: RuleSeverity): SeverityAction {
  if (severity === "ERROR") return "blocks";
  if (severity === "WARN") return "flags";
  return "suggests";
}

export function ruleNeedsRefresh(rule: JobsmithRule, now: Date = new Date()): boolean {
  if (rule.decay_period_days === null) return false;
  const verifiedAt = new Date(`${rule.last_verified_at}T00:00:00.000Z`);
  if (Number.isNaN(verifiedAt.valueOf())) return true;
  const maxAgeMs = rule.decay_period_days * 24 * 60 * 60 * 1000;
  return now.getTime() - verifiedAt.getTime() > maxAgeMs;
}

type TextChecker = (text: string) => RuleFinding[];

function buildTextChecker(rule: JobsmithRule, now: Date): TextChecker | null {
  if (rule.check_method.type === "regex") {
    const pattern = patternFromRegexSpec(rule.check_method.spec);
    return pattern ? regexChecker(rule, pattern, now) : null;
  }
  if (rule.check_method.type === "keyword_list") {
    const keywords = keywordsFromSpec(rule.check_method.spec);
    return keywords.length > 0 ? keywordChecker(rule, keywords, now) : null;
  }
  return null;
}

function regexChecker(rule: JobsmithRule, pattern: RegExp, now: Date): TextChecker {
  return (text: string): RuleFinding[] => {
    const findings: RuleFinding[] = [];
    const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      findings.push(findingFromMatch(rule, match[0], match.index, match.index + match[0].length, "regex", now));
      if (match[0].length === 0) re.lastIndex += 1;
    }
    return findings;
  };
}

function keywordChecker(rule: JobsmithRule, keywords: string[], now: Date): TextChecker {
  const escaped = keywords.map(escapeRegExp);
  const pattern = new RegExp(`\\b(?:${escaped.join("|")})\\b`, "gi");
  return (text: string): RuleFinding[] => {
    const findings: RuleFinding[] = [];
    const re = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      findings.push(
        findingFromMatch(rule, match[0], match.index, match.index + match[0].length, "keyword_list", now),
      );
    }
    return findings;
  };
}

function findingFromMatch(
  rule: JobsmithRule,
  match: string,
  start: number,
  end: number,
  checkType: Extract<RuleCheckMethodType, "regex" | "keyword_list">,
  now: Date,
): RuleFinding {
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

function patternFromRegexSpec(spec: string): RegExp | null {
  const trimmed = spec.trim();

  if (trimmed.includes("U+2014") || trimmed.includes("count(/—/g)")) {
    return /\u2014/g;
  }
  if (trimmed.includes("U+1F300-U+1FAFF") || trimmed.toLowerCase().includes("emoji unicode")) {
    return /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu;
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

function keywordsFromSpec(spec: string): string[] {
  const bracket = spec.match(/\[([^\]]+)\]/);
  if (bracket) {
    return splitKeywordList(bracket[1]);
  }

  if (spec.includes("|") && !spec.includes("\\b")) {
    return splitKeywordList(spec.replace(/^Regex over the listed phrases\./i, ""));
  }

  const grouped = spec.match(/\^\(([^)]+)\)/);
  if (grouped) {
    return splitKeywordList(grouped[1]);
  }

  return [];
}

function splitKeywordList(value: string): string[] {
  return value
    .split(/[,|]/)
    .map((term) => term.trim())
    .map((term) => term.replace(/^["']|["']$/g, ""))
    .filter((term) => term.length > 1);
}

function validateRule(rawRule: unknown, index: number, ids: Set<string>): JobsmithRule {
  const label = `rules[${index}]`;
  const rule = asRecord(rawRule, label);
  const rule_id = asString(rule.rule_id, `${label}.rule_id`);
  if (ids.has(rule_id)) throw new Error(`duplicate rule_id ${rule_id}`);
  ids.add(rule_id);

  const checkMethod = asRecord(rule.check_method, `${label}.check_method`);
  const checkType = asEnum(
    checkMethod.type,
    CHECK_TYPES,
    `${label}.check_method.type`,
  ) as RuleCheckMethodType;

  return {
    rule_id,
    name: asString(rule.name, `${label}.name`),
    category: asString(rule.category, `${label}.category`),
    what: asString(rule.what, `${label}.what`),
    why: asString(rule.why, `${label}.why`),
    sources: validateSources(rule.sources, `${label}.sources`),
    applies_when: validateAppliesWhen(rule.applies_when, `${label}.applies_when`),
    when_not_applies: String(rule.when_not_applies ?? ""),
    check_method: {
      type: checkType,
      spec: asString(checkMethod.spec, `${label}.check_method.spec`),
    },
    severity: asEnum(rule.severity, SEVERITIES, `${label}.severity`) as RuleSeverity,
    decay_period_days: asNullableNumber(rule.decay_period_days, `${label}.decay_period_days`),
    last_verified_at: asDateText(rule.last_verified_at, `${label}.last_verified_at`),
    volatile: Boolean(rule.volatile),
    notes: String(rule.notes ?? ""),
  };
}

function validateSources(rawSources: unknown, label: string): RuleSource[] {
  return asArray(rawSources, label).map((rawSource, index) => {
    const source = asRecord(rawSource, `${label}[${index}]`);
    return {
      doc: asString(source.doc, `${label}[${index}].doc`),
      section: asString(source.section, `${label}[${index}].section`),
      round: asNumber(source.round, `${label}[${index}].round`),
    };
  });
}

function validateAppliesWhen(raw: unknown, label: string): RuleAppliesWhen {
  const applies = asRecord(raw, label);
  return {
    doc_type: asStringArray(applies.doc_type, `${label}.doc_type`),
    role_family: asStringOrArray(applies.role_family, `${label}.role_family`),
    age_band: asStringOrArray(applies.age_band, `${label}.age_band`),
    jurisdiction: asStringOrArray(applies.jurisdiction, `${label}.jurisdiction`),
    ats_vendor: asStringOrArray(applies.ats_vendor, `${label}.ats_vendor`),
  };
}

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value as Record<string, unknown>;
}

function asArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  return value;
}

function asString(value: unknown, label: string): string {
  if (typeof value !== "string") throw new Error(`${label} must be a string`);
  return value;
}

function asNumber(value: unknown, label: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${label} must be a number`);
  }
  return value;
}

function asNullableNumber(value: unknown, label: string): number | null {
  if (value === null || value === undefined) return null;
  return asNumber(value, label);
}

function asStringArray(value: unknown, label: string): string[] {
  const array = asArray(value, label);
  if (!array.every((item) => typeof item === "string")) {
    throw new Error(`${label} must contain only strings`);
  }
  return array as string[];
}

function asStringOrArray(value: unknown, label: string): string[] | string {
  if (typeof value === "string") return value;
  return asStringArray(value, label);
}

function asEnum<T extends string>(value: unknown, allowed: readonly T[], label: string): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new Error(`${label} must be one of: ${allowed.join(", ")}`);
  }
  return value as T;
}

function asDateText(value: unknown, label: string): string {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") return value;
  throw new Error(`${label} must be a date string`);
}

function zeroSeverityTotals(): Record<RuleSeverity, number> {
  return { ERROR: 0, WARN: 0, INFO: 0 };
}

function zeroCheckTypeTotals(): Record<RuleCheckMethodType, number> {
  return {
    regex: 0,
    keyword_list: 0,
    count_threshold: 0,
    format_check: 0,
    semantic_check: 0,
    human_review: 0,
  };
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

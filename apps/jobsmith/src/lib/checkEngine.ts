// apps/jobsmith/src/lib/checkEngine.ts
//
// Deterministic JobSmith rules engine.
// The 232-rule pack is copied from the source of truth and loaded as data.
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
  checkType: Extract<RuleCheckMethodType, "regex" | "keyword_list" | "count_threshold">;
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

type FindingCheckType = RuleFinding["checkType"];

interface CustomMatch {
  match: string;
  start: number;
  end: number;
}

type CustomMatcher = (text: string) => CustomMatch[];

// Hand-curated checkers for rules whose YAML spec is prose (so the generic
// spec-to-regex path cannot compile it) but whose intent is deterministic.
// Each entry is faithful to the rule's spec; anything needing document
// structure, metadata, or judgement stays in the review-needed bucket.
const CUSTOM_RULE_MATCHERS: Record<string, CustomMatcher> = {
  // Season-year date tokens (Summer 2023) are the deterministic half of the
  // date-format rule; bare-year auditing needs role structure and stays manual.
  "JS-ATS-04": regexMatcher(/\b(?:spring|summer|autumn|fall|winter)\s+\d{4}\b/gi),
  "JS-ATS-11": regexMatcher(/[▪▸◆◇★►‣⁃]/g),
  "JS-AIDETECT-08": regexMatcher(
    /\*\*[^*\n]+\*\*|^#{1,6}\s|`[^`\n]+`|\[[^\]\n]+\]\([^)\n]+\)|^---$|^>/gim,
  ),
  "JS-AIDETECT-10": regexMatcher(/\?/g),
  "JS-AIDETECT-12": regexMatcher(
    /\bit[’']?s (?:worth|important) (?:noting|to note|mentioning)\b|\bmay potentially\b|\bcould potentially\b|\bmight be able to\b/gi,
  ),
  "JS-AIDETECT-14": regexMatcher(/\bresults-(?:driven|oriented)\b/gi),
  "JS-AIDETECT-24": consecutiveSentenceStartMatcher(/^I\b/, 3),
  "JS-COVER-01": regexMatcher(
    /\bto whom it may concern\b|\bdear sir\s*\/\s*madam\b|\bdear sir or madam\b/gi,
  ),
  "JS-PRIVACY-08": regexMatcher(/\bcurrent salary\b|\bsalary:\s*\$/gi),
  "JS-TRUTH-11": regexMatcher(/\btop\s+\d+(?:\.\d+)?\s*%/gi),
  "JS-TRUTH-18": regexMatcher(
    /\b100\s*(?:%|percent)\s+(?:improvement|increase|growth|reduction|gain)\b/gi,
  ),
  "JS-VISUAL-19": regexMatcher(/\[company\]|\[role\]|\[hiring manager\]|lorem ipsum/gi),
  "JS-VOICE-10": regexMatcher(
    /^[ \t]*(?:career[ \t]+)?objective[ \t]*$|\bseeking a challenging opportunity\b/gim,
  ),
  "JS-VOICE-11": regexMatcher(/\breferences available (?:up)?on request\b/gi),
  "JS-VOICE-19": repeatedBulletOpenerMatcher(3),
  "JS-VOICE-21": longSentenceMatcher(35),
};

function buildTextChecker(rule: JobsmithRule, now: Date): TextChecker | null {
  const custom = CUSTOM_RULE_MATCHERS[rule.rule_id];
  if (custom) {
    const checkType: FindingCheckType =
      rule.check_method.type === "count_threshold" ? "count_threshold" : "regex";
    return (text: string): RuleFinding[] =>
      custom(text).map((m) => findingFromMatch(rule, m.match, m.start, m.end, checkType, now));
  }
  if (rule.check_method.type === "regex") {
    const pattern = patternFromRegexSpec(rule.check_method.spec);
    return pattern ? regexChecker(rule, pattern, now) : null;
  }
  if (rule.check_method.type === "keyword_list") {
    if (!isAutomatedKeywordBlocklistSpec(rule.check_method.spec)) return null;
    const keywords = keywordsFromSpec(rule.check_method.spec);
    return keywords.length > 0 ? keywordChecker(rule, keywords, now) : null;
  }
  return null;
}

function regexMatcher(pattern: RegExp): CustomMatcher {
  return (text: string): CustomMatch[] => {
    const matches: CustomMatch[] = [];
    const re = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      matches.push({ match: match[0], start: match.index, end: match.index + match[0].length });
      if (match[0].length === 0) re.lastIndex += 1;
    }
    return matches;
  };
}

interface TextSegment {
  text: string;
  start: number;
  end: number;
}

function sentenceSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const re = /[^.!?\n]+[.!?]?/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const trimmed = match[0].trim();
    if (trimmed.length === 0) continue;
    const offset = match[0].indexOf(trimmed);
    segments.push({
      text: trimmed,
      start: match.index + offset,
      end: match.index + offset + trimmed.length,
    });
  }
  return segments;
}

// One finding per sentence longer than maxWords (JS-VOICE-21).
function longSentenceMatcher(maxWords: number): CustomMatcher {
  return (text: string): CustomMatch[] =>
    sentenceSegments(text)
      .filter((s) => s.text.split(/\s+/).filter(Boolean).length > maxWords)
      .map((s) => ({ match: s.text, start: s.start, end: s.end }));
}

// One finding per run of minRun+ consecutive sentences opening the same way
// (JS-AIDETECT-24: three "I ..." sentences in a row).
function consecutiveSentenceStartMatcher(opener: RegExp, minRun: number): CustomMatcher {
  return (text: string): CustomMatch[] => {
    const matches: CustomMatch[] = [];
    let run = 0;
    for (const sentence of sentenceSegments(text)) {
      run = opener.test(sentence.text) ? run + 1 : 0;
      if (run === minRun) {
        matches.push({ match: sentence.text, start: sentence.start, end: sentence.end });
      }
    }
    return matches;
  };
}

// One finding per run of minRun+ consecutive bullets opening with the same
// word (JS-VOICE-19).
function repeatedBulletOpenerMatcher(minRun: number): CustomMatcher {
  return (text: string): CustomMatch[] => {
    const matches: CustomMatch[] = [];
    let previousOpener = "";
    let run = 0;
    const lineRe = /^.*$/gm;
    let lineMatch: RegExpExecArray | null;
    while ((lineMatch = lineRe.exec(text)) !== null) {
      const line = lineMatch[0];
      const bullet = line.match(/^[ \t]*(?:[-*•])[ \t]+([A-Za-z][A-Za-z'-]*)/);
      if (!bullet) {
        if (line.trim().length > 0) {
          previousOpener = "";
          run = 0;
        }
        continue;
      }
      const opener = bullet[1].toLowerCase();
      run = opener === previousOpener ? run + 1 : 1;
      previousOpener = opener;
      if (run === minRun) {
        const openerStart = lineMatch.index + line.indexOf(bullet[1]);
        matches.push({
          match: bullet[1],
          start: openerStart,
          end: openerStart + bullet[1].length,
        });
      }
      if (lineRe.lastIndex === lineMatch.index) lineRe.lastIndex += 1;
    }
    return matches;
  };
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
  checkType: FindingCheckType,
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

function isAutomatedKeywordBlocklistSpec(spec: string): boolean {
  const normalized = spec.trim().toLowerCase();
  if (/\ballow(?:list|-list)\b|\ballowed\s+(?:headings?|sections?|labels?|terms?)\b/.test(normalized)) return false;
  const explicitBlocklistIntent =
    /\b(?:flag|block|ban|avoid|detect|reject|replace|blocklist|token list|phrase list|filler list)\b/.test(
      normalized,
    );
  const requirementOrAnalysisIntent =
    /^(?:require|scan|extract|compare|verify|map|align|maintain)\b|\b(?:must include|required|requires|verify|compare|extract)\b/.test(
      normalized,
    );
  if (requirementOrAnalysisIntent && !explicitBlocklistIntent) return false;
  if (explicitBlocklistIntent) return true;
  return spec.includes("|");
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

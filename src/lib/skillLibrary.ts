import { load as loadYaml } from "js-yaml";

export type SkillSafetyLevel = "safe" | "cautious" | "restricted" | "blocked";
export type SkillSourceKind = "original" | "rewritten" | "permissive-summary";
export type SkillNativeMode = "hardwired" | "skill" | "hybrid";
export type SkillReviewState = "verified" | "reviewed" | "needs_review" | "blocked";

export interface SkillValidationIssue {
  code: string;
  message: string;
  severity: "error" | "warning";
}

export interface SkillPackage {
  slug: string;
  name: string;
  version: string;
  description: string;
  category: string;
  tags: string[];
  safetyLevel: SkillSafetyLevel;
  sourceKind: SkillSourceKind;
  sourceUrl: string | null;
  sourceLicense: string;
  reuse: string;
  unclickUsefulness: number;
  nativeMode: SkillNativeMode;
  requiredWorkerRoles: string[];
  requiredMcpTools: string[];
  requiredApps: string[];
  contentHash: string;
  body: string;
  markdown: string;
  reviewState: SkillReviewState;
  installState: string;
  validationIssues: SkillValidationIssue[];
}

export interface SkillLibrarySummary {
  total: number;
  hardwired: number;
  hybrid: number;
  skillOnly: number;
  cautiousOrRestricted: number;
  verified: number;
  categories: string[];
}

type FrontmatterRecord = Record<string, unknown>;

const SAFETY_LEVELS: SkillSafetyLevel[] = ["safe", "cautious", "restricted", "blocked"];
const SOURCE_KINDS: SkillSourceKind[] = ["original", "rewritten", "permissive-summary"];
const NATIVE_MODES: SkillNativeMode[] = ["hardwired", "skill", "hybrid"];

export function parseSkillMarkdown(markdown: string): SkillPackage {
  const normalized = normalizeLineEndings(markdown).trim();
  const { frontmatter, body } = splitFrontmatter(normalized);
  const tags = readStringList(frontmatter.tags);
  const safetyLevel = readEnum(frontmatter.safety_level, SAFETY_LEVELS, "safe");
  const sourceKind = readEnum(frontmatter.source_kind, SOURCE_KINDS, "original");
  const nativeMode = readEnum(frontmatter.unclick_native, NATIVE_MODES, "skill");

  const skill: SkillPackage = {
    slug: readRequiredString(frontmatter.slug, ""),
    name: readRequiredString(frontmatter.name, extractHeading(body) ?? ""),
    version: readRequiredString(frontmatter.version, "1.0.0"),
    description: readRequiredString(frontmatter.description, ""),
    category: readRequiredString(frontmatter.category, "uncategorized"),
    tags,
    safetyLevel,
    sourceKind,
    sourceUrl: readOptionalString(frontmatter.source_url),
    sourceLicense: readRequiredString(frontmatter.source_license, sourceKind === "original" ? "UnClick original" : "License review required"),
    reuse: readRequiredString(frontmatter.reuse, sourceKind === "original" ? "Original UnClick-native skill" : "Rewritten summary"),
    unclickUsefulness: clampNumber(readNumber(frontmatter.unclick_usefulness, 3), 1, 5),
    nativeMode,
    requiredWorkerRoles: readStringList(frontmatter.required_worker_roles),
    requiredMcpTools: readStringList(frontmatter.required_mcp_tools),
    requiredApps: readStringList(frontmatter.required_apps),
    contentHash: createSkillContentHash(normalized),
    body: body.trim(),
    markdown: normalized,
    reviewState: "needs_review",
    installState: "",
    validationIssues: [],
  };

  const validationIssues = validateSkillPackage(skill);
  skill.validationIssues = validationIssues;
  skill.reviewState = reviewStateForSkill(skill);
  skill.installState = installStateForSkill(skill);

  return skill;
}

export function validateSkillPackage(skill: SkillPackage): SkillValidationIssue[] {
  const issues: SkillValidationIssue[] = [];

  if (!skill.slug.trim()) {
    issues.push(error("missing_slug", "Skill needs a stable slug."));
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.slug)) {
    issues.push(error("invalid_slug", "Skill slug must be lowercase kebab-case."));
  }
  if (!skill.name.trim()) {
    issues.push(error("missing_name", "Skill needs a name."));
  }
  if (!skill.description.trim()) {
    issues.push(error("missing_description", "Skill needs a description."));
  }
  if (!skill.body.trim()) {
    issues.push(error("missing_body", "Skill body cannot be empty."));
  }
  if (skill.sourceKind !== "original" && !skill.sourceUrl) {
    issues.push(warning("missing_source_url", "Rewritten or summarised skills should keep a source URL."));
  }
  if (skill.sourceLicense.toLowerCase().includes("review required")) {
    issues.push(warning("license_review", "License needs review before public sharing."));
  }
  if (skill.safetyLevel === "blocked") {
    issues.push(error("blocked_safety_level", "Blocked skills cannot be installed."));
  }
  if (skill.nativeMode === "hardwired" && skill.safetyLevel === "restricted") {
    issues.push(error("restricted_hardwire", "Restricted behavior cannot be hardwired as an always-on rail."));
  }
  if (skill.nativeMode === "hardwired" && skill.requiredApps.length > 0) {
    issues.push(warning("hardwired_app_dependency", "Hardwired rails should not depend on optional app connections."));
  }

  return issues;
}

export function buildSkillLibrarySummary(skills: SkillPackage[]): SkillLibrarySummary {
  const categories = [...new Set(skills.map((skill) => skill.category))].sort();
  return {
    total: skills.length,
    hardwired: skills.filter((skill) => skill.nativeMode === "hardwired").length,
    hybrid: skills.filter((skill) => skill.nativeMode === "hybrid").length,
    skillOnly: skills.filter((skill) => skill.nativeMode === "skill").length,
    cautiousOrRestricted: skills.filter((skill) => skill.safetyLevel === "cautious" || skill.safetyLevel === "restricted").length,
    verified: skills.filter((skill) => skill.reviewState === "verified").length,
    categories,
  };
}

export function filterSkills(
  skills: SkillPackage[],
  query: string,
  category = "all",
  nativeMode: SkillNativeMode | "all" = "all",
): SkillPackage[] {
  const needle = query.trim().toLowerCase();
  return skills.filter((skill) => {
    if (category !== "all" && skill.category !== category) return false;
    if (nativeMode !== "all" && skill.nativeMode !== nativeMode) return false;
    if (!needle) return true;
    const haystack = [
      skill.slug,
      skill.name,
      skill.description,
      skill.category,
      skill.tags.join(" "),
      skill.requiredWorkerRoles.join(" "),
      skill.requiredMcpTools.join(" "),
      skill.body,
    ].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export function sortSkillsForLibrary(skills: SkillPackage[]): SkillPackage[] {
  return [...skills].sort((a, b) => {
    const usefulness = b.unclickUsefulness - a.unclickUsefulness;
    if (usefulness !== 0) return usefulness;
    const mode = nativeModeRank(a.nativeMode) - nativeModeRank(b.nativeMode);
    if (mode !== 0) return mode;
    return a.name.localeCompare(b.name);
  });
}

export function createSkillContentHash(markdown: string): string {
  const input = normalizeLineEndings(markdown).trim();
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `skill-fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function splitFrontmatter(markdown: string): { frontmatter: FrontmatterRecord; body: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { frontmatter: {}, body: markdown };
  const parsed = loadYaml(match[1]);
  const frontmatter = parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as FrontmatterRecord)
    : {};
  return { frontmatter, body: markdown.slice(match[0].length) };
}

function readRequiredString(value: unknown, fallback: string): string {
  const parsed = readOptionalString(value);
  return parsed ?? fallback;
}

function readOptionalString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function readStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => readOptionalString(item)).filter((item): item is string => Boolean(item));
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function readNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function readEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  if (typeof value === "string" && allowed.includes(value as T)) return value as T;
  return fallback;
}

function reviewStateForSkill(skill: SkillPackage): SkillReviewState {
  if (skill.validationIssues.some((issue) => issue.severity === "error")) return "blocked";
  if (skill.nativeMode === "hardwired" || skill.sourceKind === "original") return "verified";
  if (skill.validationIssues.length > 0) return "needs_review";
  return "reviewed";
}

function installStateForSkill(skill: SkillPackage): string {
  if (skill.reviewState === "blocked") return "Blocked until the validation issue is fixed.";
  if (skill.nativeMode === "hardwired") return "Hardwire into UnClick, not an optional install.";
  if (skill.nativeMode === "hybrid") return "Use as a skill, with native UnClick rails underneath.";
  if (skill.safetyLevel === "restricted") return "Preview only until Safety Checker signs off.";
  return "Preview, copy, and attach later when runtime policy exists.";
}

function nativeModeRank(mode: SkillNativeMode): number {
  if (mode === "hardwired") return 0;
  if (mode === "hybrid") return 1;
  return 2;
}

function extractHeading(body: string): string | null {
  const match = body.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || null;
}

function error(code: string, message: string): SkillValidationIssue {
  return { code, message, severity: "error" };
}

function warning(code: string, message: string): SkillValidationIssue {
  return { code, message, severity: "warning" };
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeLineEndings(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

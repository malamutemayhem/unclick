import { load as loadYaml } from "js-yaml";

export type SkillRiskClass = "low" | "medium" | "high" | "rejected";
export type SkillReviewState = "quarantined" | "needs_review" | "reviewed" | "native-ready";
export type SkillInstallability = "preview-only" | "forkable" | "native-ready" | "blocked";
export type SkillLicenseStatus = "declared" | "missing" | "needs_review";

export interface SkillSourceMetadata {
  origin?: string;
  repoUrl?: string;
  path?: string;
  commit?: string;
  version?: string;
  license?: string;
}

export interface SkillSourceDraft {
  origin: string;
  repoUrl: string | null;
  path: string | null;
  commit: string | null;
}

export interface SkillLicenseDraft {
  value: string | null;
  status: SkillLicenseStatus;
}

export interface SkillRiskDraft {
  class: SkillRiskClass;
  reasons: string[];
}

export interface SkillRequirementDraft {
  envVars: string[];
  optionalEnvVars: string[];
  primaryEnv: string | null;
  bins: string[];
  anyBins: string[];
  configPaths: string[];
  installSpecs: string[];
  operatingSystems: string[];
}

export interface SkillPermissionReceipt {
  status: "preview-only" | "blocked";
  summary: string;
  grants: string[];
  requirements: string[];
  reviewWarnings: string[];
}

export interface SkillValidationIssue {
  code: string;
  message: string;
  severity: "error" | "warning";
}

export interface SkillSpecDraft {
  name: string;
  description: string;
  source: SkillSourceDraft;
  upstreamVersion: string | null;
  contentHash: string;
  license: SkillLicenseDraft;
  declaredPermissions: string[];
  requestedDomains: string[];
  requestedPaths: string[];
  dependencies: string[];
  requirements: SkillRequirementDraft;
  permissionReceipt: SkillPermissionReceipt;
  risk: SkillRiskDraft;
  reviewState: SkillReviewState;
  installability: SkillInstallability;
  contentOnly: boolean;
  validationIssues: SkillValidationIssue[];
}

export interface SkillParseResult {
  ok: boolean;
  spec: SkillSpecDraft;
  issues: SkillValidationIssue[];
}

type Frontmatter = Record<string, unknown>;

const PERMISSION_RULES: Array<{ permission: string; pattern: RegExp }> = [
  { permission: "browser", pattern: /\bbrowser\b|\bweb\s+page\b|\bdom\b/i },
  { permission: "oauth", pattern: /\boauth\b|\bauth\b|\blogin\b/i },
  { permission: "shell", pattern: /\bshell\b|\bterminal\b|\bcommand\b|\bexec\b|\bcurl\b|\bnpm\b|\bpython\b/i },
  { permission: "network", pattern: /\bnetwork\b|\bfetch\b|\bhttp:\/\/|\bhttps:\/\//i },
  { permission: "files", pattern: /\bfile\b|\bfiles\b|\bpath\b|\bread\/write\b|\bdelete\b/i },
  { permission: "github", pattern: /\bgithub\b|\bpull request\b|\bmerge\b|\bcommit\b|\bpush\b/i },
  { permission: "email", pattern: /\bemail\b|\bgmail\b|\boutlook\b/i },
  { permission: "cookies", pattern: /\bcookie\b|\bsession\b/i },
  { permission: "credentials", pattern: /\bcredential\b|\bapi key\b|\btoken\b|\bpassword\b|\bsecret\b/i },
  { permission: "money", pattern: /\bbilling\b|\bpayment\b|\bwallet\b|\bstripe\b|\bmoney\b/i },
];

const REJECT_RULES: Array<{ code: string; reason: string; pattern: RegExp }> = [
  { code: "risk_crypto_wallet", reason: "crypto or wallet operations", pattern: /\bcrypto\b|\bwallet\b|\bseed phrase\b|\bprivate key\b/i },
  { code: "risk_cookie_session_scraping", reason: "cookie or session scraping", pattern: /\bcookie\b.*\bscrap|\bsession\b.*\bscrap|\bsteal\b.*\bcookie/i },
  { code: "risk_credential_dumping", reason: "credential dumping", pattern: /\bcredential dumping\b|\bdump\b.*\bcredential|\bexfiltrat/i },
  { code: "risk_self_modifying_rules", reason: "self-modifying rules or memory", pattern: /\bself-modif|\bmodify\b.*\brules|\bmodify\b.*\bmemory/i },
  { code: "risk_mass_messaging", reason: "mass messaging", pattern: /\bmass messaging\b|\bbulk email\b|\bspam\b/i },
  { code: "risk_anti_detect", reason: "anti-detect or evasion behavior", pattern: /\banti-detect\b|\bevasion\b|\bbypass detection\b/i },
  { code: "risk_captcha_bypass", reason: "CAPTCHA bypass", pattern: /\bcaptcha\b.*\bbypass|\bbypass\b.*\bcaptcha/i },
  { code: "risk_hidden_installer", reason: "hidden remote installer", pattern: /\bhidden\b.*\binstaller|\bremote installer\b/i },
  { code: "risk_curl_pipe_shell", reason: "curl pipe shell install", pattern: /\bcurl\b[\s\S]{0,120}\|\s*(?:bash|sh|powershell|pwsh)/i },
  { code: "risk_reverse_shell", reason: "reverse shell", pattern: /\breverse shell\b/i },
  { code: "risk_persistence", reason: "persistence mechanism", pattern: /\bpersistence\b|\bstartup item\b|\bcron\b.*\binstall/i },
  { code: "risk_disable_safety", reason: "approval or sandbox disabling", pattern: /\bdisable\b.*\bapproval|\bdisable\b.*\bsafety|\bdisable\b.*\bsandbox|\bturn off\b.*\bsafety/i },
];

const WARNING_RULES: Array<{ code: string; reason: string; pattern: RegExp }> = [
  { code: "risk_shell_request", reason: "shell access requested", pattern: /\bshell\b|\bterminal\b|\bexec\b|\bcommand\b/i },
  { code: "risk_oauth_request", reason: "OAuth or auth access requested", pattern: /\boauth\b|\bauth\b|\blogin\b/i },
  { code: "risk_credential_request", reason: "credential-shaped access requested", pattern: /\bcredential\b|\bapi key\b|\btoken\b|\bpassword\b|\bsecret\b/i },
  { code: "risk_money_request", reason: "money-moving or billing access requested", pattern: /\bbilling\b|\bpayment\b|\bwallet\b|\bstripe\b|\bmoney\b/i },
  { code: "risk_cookie_request", reason: "cookie or session access requested", pattern: /\bcookie\b|\bsession\b/i },
];

export function parseSkillMarkdown(markdown: string, metadata: SkillSourceMetadata = {}): SkillParseResult {
  const normalizedMarkdown = normalizeLineEndings(markdown);
  const { frontmatter, body } = readFrontmatter(normalizedMarkdown);
  const openclawMetadata = readOpenClawMetadata(frontmatter);
  const combinedText = `${serializeFrontmatter(frontmatter)}\n${body}`;
  const name = firstString(frontmatter.name, frontmatter.title) ?? extractHeading(body) ?? "";
  const description = firstString(frontmatter.description, frontmatter.summary) ?? extractFirstParagraph(body, name) ?? "";
  const licenseValue = firstString(frontmatter.license, metadata.license);
  const risk = classifySkillRisk(combinedText);
  const source = buildSourceDraft(frontmatter, metadata);
  const requirements = buildRequirementDraft(frontmatter, openclawMetadata);
  const declaredPermissions = uniqueStrings([
    ...readStringList(frontmatter.permissions),
    ...readStringList(frontmatter.scopes),
    ...readStringList(readValue(openclawMetadata, "permissions")),
    ...readStringList(readValue(openclawMetadata, "scopes")),
    ...detectPermissions(combinedText),
    ...requirements.envVars.map((envVar) => `env:${envVar}`),
    ...requirements.bins.map((bin) => `bin:${bin}`),
  ]);
  const spec: SkillSpecDraft = {
    name,
    description,
    source,
    upstreamVersion: firstString(frontmatter.version, metadata.version),
    contentHash: createSkillContentHash(normalizedMarkdown),
    license: {
      value: licenseValue,
      status: licenseValue ? "declared" : "missing",
    },
    declaredPermissions,
    requestedDomains: uniqueStrings([
      ...readStringList(frontmatter.domains),
      ...readStringList(readValue(openclawMetadata, "domains")),
      ...extractDomains(combinedText),
    ]),
    requestedPaths: uniqueStrings([
      ...readStringList(frontmatter.paths),
      ...requirements.configPaths,
      ...extractPaths(combinedText),
    ]),
    dependencies: uniqueStrings([
      ...readStringList(frontmatter.dependencies),
      ...readStringList(frontmatter.packages),
      ...readStringList(frontmatter.tools),
      ...requirements.bins,
      ...requirements.anyBins,
      ...requirements.installSpecs,
    ]),
    requirements,
    permissionReceipt: {
      status: "preview-only",
      summary: "",
      grants: [],
      requirements: [],
      reviewWarnings: [],
    },
    risk,
    reviewState: "quarantined",
    installability: risk.class === "rejected" ? "blocked" : "preview-only",
    contentOnly: true,
    validationIssues: [],
  };
  const validationIssues = [...buildFrontmatterIssues(frontmatter), ...validateSkillSpecDraft(spec)];
  spec.validationIssues = validationIssues;
  spec.installability = validationIssues.some((issue) => issue.severity === "error") ? "blocked" : spec.installability;
  spec.reviewState = validationIssues.length > 0 && risk.class !== "rejected" ? "needs_review" : spec.reviewState;
  spec.permissionReceipt = buildPermissionReceipt(spec);

  return {
    ok: !validationIssues.some((issue) => issue.severity === "error"),
    spec,
    issues: validationIssues,
  };
}

export function validateSkillSpecDraft(spec: SkillSpecDraft): SkillValidationIssue[] {
  const issues: SkillValidationIssue[] = [];

  if (!spec.name.trim()) {
    issues.push({
      code: "missing_title",
      message: "SKILL.md must declare a name or top-level heading before it can be catalogued.",
      severity: "error",
    });
  }

  if (!spec.description.trim()) {
    issues.push({
      code: "missing_description",
      message: "SKILL.md must include a description before it can be catalogued.",
      severity: "error",
    });
  }

  if (spec.license.status !== "declared") {
    issues.push({
      code: "missing_license",
      message: "License is missing or unknown, so the skill needs review before any install path.",
      severity: "warning",
    });
  }

  if (!spec.source.origin.trim() || spec.source.origin === "unknown") {
    issues.push({
      code: "unknown_source",
      message: "Source origin is unknown, so provenance needs review.",
      severity: "warning",
    });
  }

  if (spec.source.repoUrl && !spec.source.commit) {
    issues.push({
      code: "missing_source_commit",
      message: "Source commit is missing, so the skill cannot be promoted beyond preview/fork without provenance review.",
      severity: "warning",
    });
  }

  if (spec.requirements.installSpecs.length > 0) {
    issues.push({
      code: "dependency_install_review",
      message: "Dependency install metadata is present and must stay quarantined until reviewed.",
      severity: "warning",
    });
  }

  if (spec.risk.class === "rejected") {
    issues.push({
      code: "high_risk_rejected",
      message: `Rejected risk signals: ${spec.risk.reasons.join(", ")}`,
      severity: "error",
    });
  }

  return issues;
}

export function classifySkillRisk(text: string): SkillRiskDraft {
  const reasons: string[] = [];
  const rejectedReasons: string[] = [];

  for (const rule of REJECT_RULES) {
    if (rule.pattern.test(text)) {
      rejectedReasons.push(rule.reason);
    }
  }

  if (rejectedReasons.length > 0) {
    return {
      class: "rejected",
      reasons: uniqueStrings(rejectedReasons),
    };
  }

  for (const rule of WARNING_RULES) {
    if (rule.pattern.test(text)) {
      reasons.push(rule.reason);
    }
  }

  const uniqueReasons = uniqueStrings(reasons);
  if (uniqueReasons.some((reason) => reason.includes("credential") || reason.includes("money"))) {
    return { class: "high", reasons: uniqueReasons };
  }
  if (uniqueReasons.length > 0) {
    return { class: "medium", reasons: uniqueReasons };
  }
  return { class: "low", reasons: [] };
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

export function buildPermissionReceipt(spec: SkillSpecDraft): SkillPermissionReceipt {
  const grants = uniqueStrings([
    ...spec.declaredPermissions,
    ...spec.requestedDomains.map((domain) => `domain:${domain}`),
  ]);
  const requirements = uniqueStrings([
    ...spec.requirements.envVars.map((envVar) => `env:${envVar}`),
    ...spec.requirements.optionalEnvVars.map((envVar) => `optional-env:${envVar}`),
    ...spec.requirements.bins.map((bin) => `bin:${bin}`),
    ...spec.requirements.anyBins.map((bin) => `any-bin:${bin}`),
    ...spec.requirements.configPaths.map((path) => `config:${path}`),
    ...spec.requirements.installSpecs.map((installSpec) => `install:${installSpec}`),
    ...spec.requirements.operatingSystems.map((os) => `os:${os}`),
  ]);
  const reviewWarnings = uniqueStrings([
    ...spec.validationIssues.map((issue) => issue.code),
    ...spec.risk.reasons,
  ]);
  const status = spec.installability === "blocked" || spec.risk.class === "rejected" ? "blocked" : "preview-only";
  const summary =
    status === "blocked"
      ? "Blocked before install. External skills never receive runtime authority until risk and provenance are cleared."
      : "Preview only. This import can be inspected or forked, but it grants no browser, OAuth, shell, or tool access.";

  return {
    status,
    summary,
    grants,
    requirements,
    reviewWarnings,
  };
}

function buildSourceDraft(frontmatter: Frontmatter, metadata: SkillSourceMetadata): SkillSourceDraft {
  return {
    origin: firstString(frontmatter.origin, frontmatter.source, metadata.origin) ?? "unknown",
    repoUrl: firstString(frontmatter.repo, frontmatter.repository, frontmatter.repoUrl, metadata.repoUrl),
    path: firstString(frontmatter.path, metadata.path),
    commit: firstString(frontmatter.commit, frontmatter.sourceCommit, metadata.commit),
  };
}

function readFrontmatter(markdown: string): { frontmatter: Frontmatter; body: string } {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match) {
    return { frontmatter: {}, body: markdown };
  }
  return {
    frontmatter: parseYamlFrontmatter(match[1]),
    body: markdown.slice(match[0].length),
  };
}

function parseYamlFrontmatter(source: string): Frontmatter {
  try {
    const parsed = loadYaml(source);
    if (!isRecord(parsed)) {
      return {};
    }
    return parsed;
  } catch {
    return { __frontmatterError: "invalid_yaml" };
  }
}

function buildFrontmatterIssues(frontmatter: Frontmatter): SkillValidationIssue[] {
  if (frontmatter.__frontmatterError !== "invalid_yaml") {
    return [];
  }
  return [
    {
      code: "invalid_frontmatter",
      message: "SKILL.md frontmatter could not be parsed as YAML.",
      severity: "error",
    },
  ];
}

function readOpenClawMetadata(frontmatter: Frontmatter): Record<string, unknown> {
  const metadata = readObjectValue(frontmatter, "metadata");
  const openclawMetadata =
    readObjectValue(metadata, "openclaw") ??
    readObjectValue(metadata, "clawdbot") ??
    readObjectValue(metadata, "clawdis");
  return openclawMetadata ?? {};
}

function buildRequirementDraft(frontmatter: Frontmatter, openclawMetadata: Record<string, unknown>): SkillRequirementDraft {
  const requires = readObjectValue(openclawMetadata, "requires") ?? {};
  const envVarDeclarations = readEnvVarDeclarations(readValue(openclawMetadata, "envVars"));
  const requiredEnvVars = uniqueStrings([
    ...readStringList(readValue(requires, "env")),
    ...readStringList(readValue(frontmatter, "env")),
    ...envVarDeclarations.required,
    ...readStringList(readValue(openclawMetadata, "primaryEnv")),
  ]);
  const optionalEnvVars = uniqueStrings(envVarDeclarations.optional.filter((envVar) => !requiredEnvVars.includes(envVar)));
  const installSpecs = readInstallSpecs(readValue(openclawMetadata, "install"));

  return {
    envVars: requiredEnvVars,
    optionalEnvVars,
    primaryEnv: firstString(readValue(openclawMetadata, "primaryEnv")),
    bins: uniqueStrings(readStringList(readValue(requires, "bins"))),
    anyBins: uniqueStrings(readStringList(readValue(requires, "anyBins"))),
    configPaths: uniqueStrings(readStringList(readValue(requires, "config"))),
    installSpecs,
    operatingSystems: uniqueStrings(readStringList(readValue(openclawMetadata, "os"))),
  };
}

function readEnvVarDeclarations(value: unknown): { required: string[]; optional: string[] } {
  if (!Array.isArray(value)) {
    return { required: [], optional: [] };
  }
  const required: string[] = [];
  const optional: string[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const name = firstString(item.name);
    if (!name) continue;
    if (item.required === false) {
      optional.push(name);
    } else {
      required.push(name);
    }
  }
  return {
    required: uniqueStrings(required),
    optional: uniqueStrings(optional),
  };
}

function readInstallSpecs(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const specs: string[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const kind = firstString(item.kind) ?? "unknown";
    const packageName =
      firstString(item.package, item.formula, item.module, item.name, item.path) ??
      readStringList(item.bins)[0] ??
      "unknown";
    specs.push(`${kind}:${packageName}`);
  }
  return uniqueStrings(specs);
}

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function firstString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value) && value.length > 0) {
      const first = firstString(value[0]);
      if (first) return first;
    }
    if (typeof value === "number" || typeof value === "boolean") return String(value);
  }
  return null;
}

function readStringList(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => firstString(item))
      .filter((item): item is string => Boolean(item));
  }
  if (typeof value !== "string") {
    return [];
  }
  return value
    .split(",")
    .map((item) => stripQuotes(item.trim()))
    .filter(Boolean);
}

function extractHeading(body: string): string | null {
  const match = body.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || null;
}

function extractFirstParagraph(body: string, name: string): string | null {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line !== name);
  return lines[0] ?? null;
}

function detectPermissions(text: string): string[] {
  return PERMISSION_RULES
    .filter((rule) => rule.pattern.test(text))
    .map((rule) => rule.permission);
}

function extractDomains(text: string): string[] {
  const domains: string[] = [];
  const urlPattern = /\bhttps?:\/\/([A-Za-z0-9.-]+\.[A-Za-z]{2,})(?::\d+)?(?:\/[^\s)]*)?/g;
  for (const match of text.matchAll(urlPattern)) {
    domains.push(match[1].toLowerCase());
  }
  return domains;
}

function extractPaths(text: string): string[] {
  const paths = new Set<string>();
  const pathPattern = /(?:^|\s)([A-Za-z0-9_.-]+\/[A-Za-z0-9_./-]*(?:SKILL\.md|\.md|\.ts|\.tsx|\.mjs|\.json))/g;
  for (const match of text.matchAll(pathPattern)) {
    paths.add(match[1]);
  }
  return [...paths];
}

function serializeFrontmatter(frontmatter: Frontmatter): string {
  return JSON.stringify(frontmatter);
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function normalizeLineEndings(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function readObjectValue(source: unknown, key: string): Record<string, unknown> | undefined {
  const value = readValue(source, key);
  return isRecord(value) ? value : undefined;
}

function readValue(source: unknown, key: string): unknown {
  if (!isRecord(source)) return undefined;
  return source[key];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

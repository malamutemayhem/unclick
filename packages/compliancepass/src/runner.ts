import fs from "node:fs/promises";
import path from "node:path";
import {
  CompliancePassReportSchema,
  type CompliancePassBand,
  type CompliancePassCategory,
  type CompliancePassCategoryId,
  type CompliancePassCheck,
  type CompliancePassEvidence,
  type CompliancePassFinding,
  type CompliancePassGapSeverityCounts,
  type CompliancePassReport,
  type CompliancePassStatus,
} from "./schema.js";

export interface RunCompliancePassInput {
  repoPath?: string;
  targetName?: string;
  generatedAt?: string;
  includeRepoPath?: boolean;
  maxFiles?: number;
}

interface RepoSnapshot {
  root: string;
  files: string[];
  textCache: Map<string, string>;
}

interface CategoryDefinition {
  id: CompliancePassCategoryId;
  name: string;
}

const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  { id: "code_maintainability", name: "Code maintainability" },
  { id: "secure_development", name: "Secure development" },
  { id: "evidence_over_claims", name: "Evidence over claims" },
  { id: "documentation_quality", name: "Documentation quality" },
  { id: "credential_environment_hygiene", name: "Credential and environment hygiene" },
  { id: "investor_readiness", name: "Investor readiness" },
  { id: "ai_governance_readiness", name: "AI governance readiness" },
];

const IGNORED_DIRS = new Set([
  ".git",
  ".turbo",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);

const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".sql",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

const SOURCE_EXTENSIONS = new Set([".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const LARGE_FILE_RISK_REGISTER = "docs/compliancepass-large-file-risk-register.md";
const REDACTED_PUBLIC_TEXT = "[redacted]";
const MAX_PUBLIC_RECEIPT_AGE_HOURS = 168;
const SECRET_SHAPED_PUBLIC_VALUE_PATTERN =
  /\b(?:sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9_]{20,}|uc_[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+|BEGIN PRIVATE KEY|(?:api[_-]?key|secret|token|password|authorization|cookie|private[_-]?key)\s*[:=]\s*["']?(?!\$\{\{|process\.env|import\.meta\.env|secrets\.|env\.|<|\[?redacted|your_|example|placeholder)[A-Za-z0-9][A-Za-z0-9._~+/=-]{11,})\b/i;
const PUBLIC_SUMMARY_REDACTIONS: RegExp[] = [
  /\bsk-[A-Za-z0-9_-]{16,}/g,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}/g,
  /\buc_[A-Za-z0-9_-]{20,}/g,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}/g,
  /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
  /\b(?:api[_-]?key|secret|token|password|authorization|cookie|private[_-]?key)\s*[:=]\s*["']?[^"'\s,)]+/gi,
  /\b[A-Z]:[\\/][^"'\s)]+/gi,
  /[\\/](?:Users|home)[\\/][^"'\s)]+/gi,
  /BEGIN [A-Z ]*PRIVATE KEY/g,
];

export async function runCompliancePass(
  input: RunCompliancePassInput = {},
): Promise<CompliancePassReport> {
  const repoPath = path.resolve(input.repoPath ?? process.cwd());
  const snapshot = await createSnapshot(repoPath, input.maxFiles ?? 5000);
  const generatedAt = input.generatedAt ?? new Date().toISOString();

  const checks = [
    await checkPackageScripts(snapshot),
    await checkVerificationBacklog(snapshot),
    await checkTypeScriptStrictness(snapshot),
    await checkTestCoverageShape(snapshot),
    await checkOversizedFiles(snapshot),
    await checkSecurityPolicy(snapshot),
    await checkWorkflowEvidence(snapshot),
    await checkSecretScanningEvidence(snapshot),
    await checkDependencyUpdateEvidence(snapshot),
    await checkDependencyAuditNotes(snapshot),
    await checkPublicReceipts(snapshot),
    await checkRenderedReportViews(snapshot),
    await checkCertificationLanguage(snapshot),
    await checkEvidenceReferences(snapshot),
    await checkReadmeCompleteness(snapshot),
    await checkArchitectureDocs(snapshot),
    await checkDecisionAndRunbookDocs(snapshot),
    await checkPublicSecretHygiene(snapshot),
    await checkCredentialMapping(snapshot),
    await checkRotationEvidence(snapshot),
    await checkLicense(snapshot),
    await checkRepositoryMetadata(snapshot),
    await checkAuditTrailEvidence(snapshot),
    await checkFrameworkMappingEvidence(snapshot),
    await checkAiProviderInventory(snapshot),
    await checkAiOversightDocs(snapshot),
    await checkAiDataDocs(snapshot),
  ];

  const categories = CATEGORY_DEFINITIONS.map((definition) =>
    buildCategory(definition, checks.filter((check) => check.category_id === definition.id)),
  );
  const summary = summarizeChecks(checks);
  const score = round(
    categories.reduce((total, category) => total + category.score, 0) / categories.length,
  );
  const gaps = checks.flatMap((check) => check.findings);
  const severityCounts = gapSeverityCounts(gaps);
  const blockingGapCount = severityCounts.critical + severityCounts.high;
  const band = bandFromScoreAndGaps(score, gaps);
  const nextActions = prioritizedActions(checks);

  return CompliancePassReportSchema.parse({
    schema_version: "1.0",
    generated_at: generatedAt,
    valid_until: validUntil(generatedAt, MAX_PUBLIC_RECEIPT_AGE_HOURS),
    source: "local deterministic repo/docs scan",
    product: "CompliancePass",
    legacy_aliases: ["EnterprisePass"],
    headline: "Evidence-backed readiness guidance, not certification.",
    target: {
      name: input.targetName ?? path.basename(repoPath),
      surface: "repo, docs, workflow, package, and public proof surfaces",
      ...(input.includeRepoPath ? { repo_path: repoPath } : {}),
    },
    status: "complete",
    readiness_band: band,
    wording_notice:
      "This report describes readiness indicators and evidence alignment. It is not a compliance certification, SOC report, ISO audit, legal opinion, or security attestation.",
    readiness_score: {
      value: score,
      band,
      traffic_light: trafficLightForBand(band),
      rationale: `CompliancePass ran ${summary.checks_total} deterministic checks across ${categories.length} readiness categories.`,
    },
    summary: {
      score_overall: score,
      headline: summaryHeadline(score, gaps),
      ...summary,
      checks_pending: 0,
      gap_severity_counts: severityCounts,
      blocking_gap_count: blockingGapCount,
    },
    report_integrity: {
      categories_total: categories.length,
      checks_total_matches_categories: summary.checks_total === categories.flatMap((category) => category.checks).length,
      gap_count_matches_findings: gaps.length === categories.flatMap((category) => category.checks).flatMap((check) => check.findings).length,
      green_requires_no_high_or_critical_gaps: band !== "green" || blockingGapCount === 0,
      max_public_age_hours: MAX_PUBLIC_RECEIPT_AGE_HOURS,
    },
    report_sections: [
      "readiness_score",
      "report_integrity",
      "evidence",
      "gaps",
      "next_actions",
      "future_regret_notes",
      "exclusions",
      "disclaimer",
    ],
    categories,
    next_actions: nextActions,
    gaps,
    future_regret_notes: [
      "If evidence links are missing, buyers and investors may treat strong claims as unsupported.",
      "If ownership and credential rotation evidence stays tribal, routine changes can become emergency work.",
      "If AI provider and oversight notes are absent, later governance reviews become slower and more expensive.",
    ],
    evidence: topLevelEvidence(checks),
    exclusions: [
      "No ISO/SOC compliance conclusion.",
      "No legal opinion.",
      "No network security probing.",
      "No raw secret storage.",
      "No customer-facing certification claim.",
      "No GitHub branch-protection API call in the local scanner; workflow and repo evidence only.",
    ],
    disclaimer:
      "CompliancePass is readiness guidance and evidence alignment only. It does not certify compliance, replace legal advice, or attest to security controls.",
  });
}

async function createSnapshot(root: string, maxFiles: number): Promise<RepoSnapshot> {
  const files: string[] = [];

  async function walk(dir: string): Promise<void> {
    if (files.length >= maxFiles) return;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (files.length >= maxFiles) break;
      if (entry.name.startsWith(".") && entry.name !== ".github") {
        if (entry.isDirectory() && IGNORED_DIRS.has(entry.name)) continue;
      }
      const fullPath = path.join(dir, entry.name);
      const relative = normalizePath(path.relative(root, fullPath));
      if (entry.isDirectory()) {
        if (IGNORED_DIRS.has(entry.name)) continue;
        await walk(fullPath);
        continue;
      }
      files.push(relative);
    }
  }

  await walk(root);
  return { root, files, textCache: new Map() };
}

async function checkPackageScripts(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const packageJson = await readJson(snapshot, "package.json");
  const scripts = isRecord(packageJson?.scripts) ? packageJson.scripts : {};
  const required = ["build", "test"];
  const missing = required.filter((script) => typeof scripts[script] !== "string");
  const hasLint = typeof scripts.lint === "string";

  if (missing.length === 0 && hasLint) {
    return check("cp-code-scripts", "code_maintainability", "Build, test, and lint scripts are declared", "pass", 100, "Root package scripts expose build, test, and lint commands.", [
      evidence("package", "package.json", "Root package metadata includes build/test/lint scripts."),
    ]);
  }

  const status = missing.length === 0 ? "partial" : "fail";
  return check("cp-code-scripts", "code_maintainability", "Build, test, and lint scripts are declared", status, missing.length === 0 ? 70 : 25, `Missing script coverage: ${[...missing, ...(hasLint ? [] : ["lint"])].join(", ")}.`, [
    evidence("package", "package.json", "Root package metadata was checked for quality-gate scripts."),
  ], [
    finding("cp-code-scripts-gap", status === "fail" ? "high" : "medium", "Quality-gate scripts are incomplete", "CompliancePass expects visible build, test, and lint commands at the root.", "Add missing root scripts or document why the gate lives elsewhere."),
  ], "Add or document the missing root quality-gate script.");
}

async function checkVerificationBacklog(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const notesPath = "docs/compliancepass-verification-notes.md";
  const text = await readText(snapshot, notesPath);
  if (!text) {
    return check("cp-code-verification-notes", "code_maintainability", "Verification status is documented", "partial", 55, "CompliancePass verification notes were not found.", [missingEvidence(notesPath, "Verification notes were not found.")], [
      finding("cp-code-verification-notes-missing", "medium", "Verification notes are missing", "A readiness receipt needs current command proof and explicit residual risks.", "Record current build, test, lint, receipt, and dogfood verification status."),
    ], "Record current CompliancePass verification proof and residual command gaps.");
  }

  const mentionsCoreProof =
    /\bnpm run compliancepass:report\b/.test(text) &&
    /\bnpm test\b/.test(text) &&
    /\bnpm run build\b/.test(text);
  const lintClean = /\bnpx eslint\s+\.\s+--format\s+json\b[\s\S]{0,180}\b(?:exits\s+0|exits\s+clean|0\s+errors?)\b/i.test(text);
  const lintBacklog =
    !lintClean &&
    /\b(?:npm run lint|npx eslint)\b[\s\S]{0,320}\b(?:fails|failed|failing|[1-9]\d*\s+errors?)\b/i.test(text);

  if (lintBacklog) {
    return check("cp-code-verification-notes", "code_maintainability", "Verification status is documented", "partial", 70, "Verification notes record a repo-wide lint backlog outside the CompliancePass slice.", [
      evidence("doc", notesPath, "Verification notes record passing focused proof and residual repo-wide lint backlog."),
    ], [
      finding("cp-code-lint-backlog", "medium", "Repo-wide lint backlog remains open", "CompliancePass changed files lint clean, but the broader repo lint command is not a clean readiness signal yet.", "Route or reduce the existing repo-wide lint backlog, then refresh the CompliancePass receipt."),
    ], "Route or reduce the repo-wide lint backlog, then refresh verification notes and the public receipt.");
  }

  if (mentionsCoreProof) {
    return check("cp-code-verification-notes", "code_maintainability", "Verification status is documented", "pass", 100, "CompliancePass verification notes include build, test, and report proof.", [
      evidence("doc", notesPath, "Verification proof notes."),
    ]);
  }

  return check("cp-code-verification-notes", "code_maintainability", "Verification status is documented", "partial", 65, "Verification notes exist but do not show all core proof commands.", [
    evidence("doc", notesPath, "Verification notes exist but need stronger command proof."),
  ], [
    finding("cp-code-verification-proof-thin", "medium", "Verification proof is thin", "Readiness receipts should name the command proof used to trust the report.", "Add current build, test, receipt, dogfood, and lint proof to the verification notes."),
  ], "Add current build, test, receipt, dogfood, and lint proof to the verification notes.");
}

async function checkTypeScriptStrictness(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const configs = snapshot.files.filter((file) => path.basename(file) === "tsconfig.json");
  const strictConfigs: string[] = [];
  for (const config of configs) {
    const json = await readJson(snapshot, config);
    if (isRecord(json?.compilerOptions) && json.compilerOptions.strict === true) {
      strictConfigs.push(config);
    }
  }

  if (strictConfigs.length > 0) {
    return check("cp-code-typescript-strict", "code_maintainability", "TypeScript strictness evidence exists", "pass", 100, `${strictConfigs.length} tsconfig file(s) enable strict mode.`, strictConfigs.slice(0, 4).map((file) => evidence("file", file, "TypeScript strict mode is enabled here.")));
  }

  return check("cp-code-typescript-strict", "code_maintainability", "TypeScript strictness evidence exists", configs.length > 0 ? "partial" : "unknown", configs.length > 0 ? 55 : 0, configs.length > 0 ? "TypeScript configs exist, but strict mode was not observed." : "No tsconfig files were found.", configs.slice(0, 3).map((file) => evidence("file", file, "TypeScript config exists without strict evidence.")), [
    finding("cp-code-typescript-strict-gap", "medium", "Strict type-safety evidence is weak", "No checked tsconfig clearly enables strict mode.", "Enable strict mode where practical or document the migration plan."),
  ], "Enable or document strict TypeScript coverage.");
}

async function checkTestCoverageShape(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const testFiles = snapshot.files.filter((file) => /\.(test|spec)\.(c|m)?[jt]sx?$/.test(file));
  const sourceFiles = snapshot.files.filter((file) => SOURCE_EXTENSIONS.has(path.extname(file)) && !/\.(test|spec)\./.test(file));
  const ratio = sourceFiles.length === 0 ? 0 : testFiles.length / sourceFiles.length;

  if (testFiles.length >= 20 || ratio >= 0.12) {
    return check("cp-code-tests", "code_maintainability", "Automated test files are present", "pass", 100, `${testFiles.length} test files were found.`, testFiles.slice(0, 5).map((file) => evidence("file", file, "Automated test evidence.")));
  }

  return check("cp-code-tests", "code_maintainability", "Automated test files are present", testFiles.length > 0 ? "partial" : "fail", testFiles.length > 0 ? 55 : 15, `${testFiles.length} test files were found across ${sourceFiles.length} source files.`, testFiles.slice(0, 5).map((file) => evidence("file", file, "Automated test evidence.")), [
    finding("cp-code-tests-thin", "high", "Test evidence is thin", "The repo has limited visible automated test coverage for its size.", "Add focused tests for the highest-risk package and API paths first."),
  ], "Add focused automated tests for the highest-risk paths.");
}

async function checkOversizedFiles(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const sourceFiles = snapshot.files.filter((file) => SOURCE_EXTENSIONS.has(path.extname(file)) && !/\.(test|spec)\./.test(file));
  const oversized: Array<{ file: string; lines: number }> = [];
  for (const file of sourceFiles) {
    const text = await readText(snapshot, file);
    const lines = text.split(/\r?\n/).length;
    if (lines > 1200) oversized.push({ file, lines });
  }
  oversized.sort((a, b) => b.lines - a.lines);
  const riskRegisterText = await readText(snapshot, LARGE_FILE_RISK_REGISTER);
  const documentedTopFiles =
    Boolean(riskRegisterText) &&
    oversized.slice(0, 5).every((item) => riskRegisterText.includes(item.file));

  if (oversized.length === 0) {
    return check("cp-code-file-size", "code_maintainability", "Source file size stays reviewable", "pass", 100, "No non-test source file over 1200 lines was found.", [
      evidence("derived", "packages", "Source files were scanned for large-file risk."),
    ]);
  }

  const status: CompliancePassStatus = oversized.length <= 3 || documentedTopFiles ? "partial" : "fail";
  const score = oversized.length <= 3 ? 65 : documentedTopFiles ? 75 : 35;
  const evidenceItems = oversized
    .slice(0, 5)
    .map((item) => evidence("file", item.file, `${item.lines} lines; review and ownership risk.`));
  if (documentedTopFiles) {
    evidenceItems.push(evidence("doc", LARGE_FILE_RISK_REGISTER, "Large-file risk register documents owner, current reason, and next reduction path."));
  }

  return check("cp-code-file-size", "code_maintainability", "Source file size stays reviewable", status, score, `${oversized.length} large source file(s) were found${documentedTopFiles ? " and the highest-risk files are documented" : ""}.`, evidenceItems, [
    finding("cp-code-large-files", documentedTopFiles || oversized.length <= 3 ? "medium" : "high", "Large source files increase review risk", "Oversized files make investor and maintainer review slower and more error-prone.", "Split high-churn large files around clear ownership boundaries or keep their risk register current."),
  ], documentedTopFiles ? "Continue reducing the highest-risk oversized files as ownership boundaries become clearer." : "Split or document the highest-risk oversized files.");
}

async function checkSecurityPolicy(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const paths = ["SECURITY.md", "docs/security/policy.md", "docs/security/threat-model.md"].filter((file) => hasFile(snapshot, file));
  if (paths.length > 0) {
    return check("cp-sec-policy", "secure_development", "Security policy evidence exists", "pass", 100, "Security policy or threat-model evidence was found.", paths.map((file) => evidence("doc", file, "Security policy evidence.")));
  }
  return check("cp-sec-policy", "secure_development", "Security policy evidence exists", "fail", 20, "No SECURITY.md or docs/security policy file was found.", [missingEvidence("SECURITY.md", "Security contact and vulnerability-reporting policy were not found.")], [
    finding("cp-sec-policy-missing", "high", "Security policy is missing", "Enterprise buyers and researchers need a clear vulnerability-reporting path.", "Add SECURITY.md with scope, contact, and response expectations."),
  ], "Add SECURITY.md or an equivalent security policy doc.");
}

async function checkWorkflowEvidence(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const workflows = snapshot.files.filter((file) => file.startsWith(".github/workflows/") && /\.(ya?ml)$/.test(file));
  const workflowText = (await Promise.all(workflows.map((file) => readText(snapshot, file)))).join("\n");
  const hasPullRequest = /pull_request|merge_group/.test(workflowText);
  const hasBuildOrTest = /\bnpm\s+(run\s+)?(test|build)|vitest|node --test|playwright/i.test(workflowText);

  if (hasPullRequest && hasBuildOrTest) {
    return check("cp-sec-workflow-gates", "secure_development", "PR workflow gate evidence exists", "pass", 100, "Workflow files show pull-request or merge-group gates with build/test evidence.", workflows.slice(0, 5).map((file) => evidence("workflow", file, "Workflow gate evidence.")));
  }

  return check("cp-sec-workflow-gates", "secure_development", "PR workflow gate evidence exists", workflows.length > 0 ? "partial" : "fail", workflows.length > 0 ? 55 : 15, "Workflow gate evidence is incomplete.", workflows.slice(0, 5).map((file) => evidence("workflow", file, "Workflow exists but gate evidence is incomplete.")), [
    finding("cp-sec-workflow-gates-gap", "high", "PR gate evidence is incomplete", "CompliancePass could not prove pull-request build/test coverage from workflows.", "Add or document required PR and merge-group checks."),
  ], "Document or add required PR build/test workflows.");
}

async function checkSecretScanningEvidence(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const activeMatches = await findTextMatches(snapshot, /\b(gitleaks|secret.?scan|secrets scanning|detect-secrets|push protection)\b/i, [".github", "SECURITY.md", "docs/security", "docs/architecture"]);
  const capabilityMatches = await findTextMatches(snapshot, /\b(gitleaks|secret.?scan|detect-secrets)\b/i, ["packages/securitypass"]);
  const unverifiedMatches = activeMatches.filter((match) =>
    /\b(should be confirmed|does not indicate|verify via GitHub|recommend: verify)\b/i.test(match.summary),
  );
  const policyOrWorkflowMatches = activeMatches.filter((match) => !unverifiedMatches.includes(match));

  if (policyOrWorkflowMatches.length > 0 && unverifiedMatches.length === 0) {
    return check("cp-sec-secret-scanning", "secure_development", "Secret-scanning evidence exists", "pass", 100, "Secret-scanning policy, workflow, or push-protection evidence was found.", [
      ...policyOrWorkflowMatches.slice(0, 4).map((match) => evidence("file", match.file, match.summary, match.line)),
      ...capabilityMatches.slice(0, 1).map((match) => evidence("file", match.file, match.summary, match.line)),
    ]);
  }

  if (policyOrWorkflowMatches.length > 0 || unverifiedMatches.length > 0) {
    return check("cp-sec-secret-scanning", "secure_development", "Secret-scanning evidence exists", "partial", policyOrWorkflowMatches.length > 0 ? 80 : 65, "Secret-scanning policy evidence exists, but repo-level push-protection verification is still called out as needing confirmation.", [
      ...policyOrWorkflowMatches.slice(0, 3).map((match) => evidence("file", match.file, match.summary, match.line)),
      ...unverifiedMatches.slice(0, 2).map((match) => evidence("file", match.file, match.summary, match.line)),
      ...capabilityMatches.slice(0, 1).map((match) => evidence("file", match.file, match.summary, match.line)),
    ], [
      finding("cp-sec-secret-scanning-verification-gap", "medium", "Secret-scanning verification needs repo-level proof", "Local docs show policy intent, but repo-level push-protection status still needs observable GitHub settings or workflow proof.", "Capture GitHub push-protection/settings proof or add a blocking secret-scan workflow receipt."),
    ], "Capture repo-level secret-scanning proof or add a blocking secret-scan workflow receipt.");
  }

  if (capabilityMatches.length > 0) {
    return check("cp-sec-secret-scanning", "secure_development", "Secret-scanning evidence exists", "partial", 70, "SecurityPass secret-scanning capability exists, but active repo policy/workflow evidence was not found.", capabilityMatches.slice(0, 5).map((match) => evidence("file", match.file, match.summary, match.line)), [
      finding("cp-sec-secret-scanning-active-gate-thin", "medium", "Active secret-scanning gate is not visible", "A capability package is useful, but buyers expect an active push or PR gate.", "Document or wire the active secret-scanning provider gate."),
    ], "Document or wire active secret-scanning coverage.");
  }

  return check("cp-sec-secret-scanning", "secure_development", "Secret-scanning evidence exists", "fail", 25, "No secret-scanning workflow or documentation evidence was found.", [missingEvidence(".github/workflows", "Secret-scanning evidence was not found.")], [
    finding("cp-sec-secret-scanning-missing", "high", "Secret-scanning evidence is missing", "A buyer or investor will expect evidence that accidental secrets are detected.", "Add gitleaks, trufflehog, or equivalent scanning to CI, or document the active provider gate."),
  ], "Add or document secret-scanning coverage.");
}

async function checkDependencyUpdateEvidence(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const paths = [".github/dependabot.yml", ".github/dependabot.yaml", "renovate.json"].filter((file) => hasFile(snapshot, file));
  if (paths.length > 0) {
    return check("cp-sec-dependency-updates", "secure_development", "Dependency update automation is configured", "pass", 100, "Dependency update configuration was found.", paths.map((file) => evidence("file", file, "Dependency update automation evidence.")));
  }
  return check("cp-sec-dependency-updates", "secure_development", "Dependency update automation is configured", "partial", 50, "No Dependabot or Renovate config was found in this local scan.", [missingEvidence(".github/dependabot.yml", "Dependency update automation config was not found.")], [
    finding("cp-sec-dependency-updates-missing", "medium", "Dependency update automation is not visible", "Stale dependencies are a common diligence finding.", "Add Dependabot/Renovate or document the current dependency-update workflow."),
  ], "Add or document dependency update automation.");
}

async function checkDependencyAuditNotes(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const auditNotesPath = "docs/compliancepass-dependency-audit-notes.md";
  const text = await readText(snapshot, auditNotesPath);
  if (!text) {
    return check("cp-sec-dependency-audit-notes", "secure_development", "Dependency audit posture is recorded", "partial", 50, "No CompliancePass dependency-audit note was found.", [missingEvidence(auditNotesPath, "Dependency vulnerability audit notes were not found.")], [
      finding("cp-sec-dependency-audit-notes-missing", "medium", "Dependency audit posture is not recorded", "Dependency update automation is useful, but current vulnerability posture also needs an explicit receipt.", "Record the latest dependency audit summary and route any risky upgrade work to SecurityPass or a dependency lane."),
    ], "Record dependency audit posture and route any upgrade backlog.");
  }

  const criticalCount = numericMarker(text, "critical");
  const highCount = numericMarker(text, "high");
  if (criticalCount > 0 || highCount > 0) {
    const severity = criticalCount > 0 ? "critical" : "high";
    return check("cp-sec-dependency-audit-notes", "secure_development", "Dependency audit posture is recorded", "partial", criticalCount > 0 ? 40 : 65, `Dependency audit notes record ${criticalCount} critical and ${highCount} high vulnerability item(s).`, [
      evidence("doc", auditNotesPath, "Dependency audit posture receipt."),
    ], [
      finding("cp-sec-dependency-audit-backlog", severity, "Dependency audit backlog needs owner review", "Current audit notes include high or critical vulnerability items that should not be hidden by dependency automation evidence.", "Route the upgrade set through SecurityPass or a dependency-upgrade lane, then refresh this receipt."),
    ], "Route dependency audit backlog and refresh the CompliancePass dependency receipt.");
  }

  return check("cp-sec-dependency-audit-notes", "secure_development", "Dependency audit posture is recorded", "pass", 100, "Dependency audit notes are present and do not record high or critical vulnerability backlog.", [
    evidence("doc", auditNotesPath, "Dependency audit posture receipt."),
  ]);
}

async function checkPublicReceipts(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const paths = ["public/dogfood/latest.json", "public/enterprise/latest.json", "docs/prd/xpass.md"].filter((file) => hasFile(snapshot, file));
  if (paths.length >= 2) {
    return check("cp-evidence-public-receipts", "evidence_over_claims", "Public proof receipts exist", "pass", 100, "Public proof and XPass receipt surfaces were found.", paths.map((file) => evidence(file.endsWith(".json") ? "public_receipt" : "doc", file, "Public proof surface evidence.")));
  }
  return check("cp-evidence-public-receipts", "evidence_over_claims", "Public proof receipts exist", "partial", 55, "Public proof receipt evidence is incomplete.", paths.map((file) => evidence("public_receipt", file, "Public proof surface evidence.")), [
    finding("cp-evidence-public-receipts-gap", "medium", "Public proof surface is thin", "CompliancePass needs inspectable receipts before claims can be linked to proof.", "Publish or refresh public dogfood and readiness receipts."),
  ], "Publish or refresh public proof receipts.");
}

async function checkRenderedReportViews(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const expected = ["public/enterprise/latest.json", "public/enterprise/latest.md", "public/enterprise/latest.html"];
  const present = expected.filter((file) => hasFile(snapshot, file));
  if (present.length === expected.length) {
    return check("cp-evidence-rendered-report-views", "evidence_over_claims", "Rendered public report views exist", "pass", 100, "CompliancePass publishes JSON, Markdown, and HTML report views.", present.map((file) => evidence(file.endsWith(".json") ? "public_receipt" : "file", file, "Rendered CompliancePass report artifact.")));
  }

  const missing = expected.filter((file) => !present.includes(file));
  return check("cp-evidence-rendered-report-views", "evidence_over_claims", "Rendered public report views exist", "partial", present.length > 0 ? 60 : 25, `Rendered report artifact(s) missing: ${missing.join(", ")}.`, [
    ...present.map((file) => evidence(file.endsWith(".json") ? "public_receipt" : "file", file, "Rendered CompliancePass report artifact.")),
    ...missing.map((file) => missingEvidence(file, "Rendered CompliancePass report artifact was not found.")),
  ], [
    finding("cp-evidence-rendered-report-views-missing", "medium", "Rendered report views are incomplete", "The original CompliancePass research expects the JSON receipt plus Markdown and HTML views so humans can inspect the same evidence without custom tooling.", "Generate and publish public/enterprise/latest.md and public/enterprise/latest.html alongside the JSON receipt."),
  ], "Generate and publish Markdown and HTML views beside the JSON receipt.");
}

async function checkCertificationLanguage(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const unsafe = await findUnsafeClaimLanguage(snapshot);
  if (unsafe.length === 0) {
    return check("cp-evidence-claim-language", "evidence_over_claims", "Public claims avoid unsafe certification wording", "pass", 100, "No unqualified certification-style claim was found in scanned docs or public data.", [
      evidence("derived", "docs", "Docs and public receipts were scanned for unqualified certification-style wording."),
    ]);
  }

  return check("cp-evidence-claim-language", "evidence_over_claims", "Public claims avoid unsafe certification wording", "fail", 20, `${unsafe.length} unqualified certification-style line(s) were found.`, unsafe.slice(0, 8).map((match) => evidence("file", match.file, "Potential unqualified certification-style wording found; source text intentionally not echoed in the public report.", match.line)), [
    finding("cp-evidence-unsafe-claim-language", "high", "Unsafe claim wording needs review", "Unqualified certification-style language can make the report look like an attestation.", "Rewrite flagged lines as readiness guidance with explicit evidence pointers."),
  ], "Rewrite unsafe claim wording as evidence-backed readiness guidance.");
}

async function checkEvidenceReferences(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\b(evidence|proof|receipt|workflow|run id|PR #|pull request|commit)\b/i, ["docs", "public", "scripts"]);
  if (matches.length >= 20) {
    return check("cp-evidence-reference-density", "evidence_over_claims", "Docs reference evidence and proof", "pass", 100, `${matches.length} evidence/proof references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)));
  }
  return check("cp-evidence-reference-density", "evidence_over_claims", "Docs reference evidence and proof", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 60 : 20, `${matches.length} evidence/proof references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)), [
    finding("cp-evidence-references-thin", "medium", "Evidence references are thin", "Claims should be linked to docs, receipts, workflow runs, or commits.", "Add direct evidence pointers to major product and readiness claims."),
  ], "Add evidence pointers to major claims.");
}

async function checkReadmeCompleteness(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const readme = await readText(snapshot, "README.md");
  const required = ["install", "run", "test", "license"];
  const missing = required.filter((word) => !new RegExp(`\\b${word}\\b`, "i").test(readme));
  if (readme.length > 1000 && missing.length === 0) {
    return check("cp-doc-readme", "documentation_quality", "README gives basic operating context", "pass", 100, "README includes basic setup and operating language.", [
      evidence("doc", "README.md", "README was checked for setup and operating context."),
    ]);
  }
  return check("cp-doc-readme", "documentation_quality", "README gives basic operating context", readme ? "partial" : "fail", readme ? 60 : 20, readme ? `README exists but is missing: ${missing.join(", ") || "depth"}.` : "README.md was not found.", readme ? [evidence("doc", "README.md", "README exists but needs stronger operating context.")] : [missingEvidence("README.md", "README was not found.")], [
    finding("cp-doc-readme-gap", "medium", "README operating context is incomplete", "A buyer or new worker needs clear setup, run, test, and license context.", "Fill in missing README sections or link to the canonical docs."),
  ], "Improve README setup, run, test, and license context.");
}

async function checkArchitectureDocs(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const paths = ["docs/unclick-context-boot-packet.md", "AUTOPILOT.md", "FLEET_SYNC.md", "docs/unclick-deep-context.md"].filter((file) => hasFile(snapshot, file));
  if (paths.length >= 3) {
    return check("cp-doc-architecture", "documentation_quality", "Architecture and operating docs exist", "pass", 100, "Canonical architecture and operating docs were found.", paths.map((file) => evidence("doc", file, "Architecture or operating context evidence.")));
  }
  return check("cp-doc-architecture", "documentation_quality", "Architecture and operating docs exist", "partial", 55, "Architecture and operating docs are incomplete.", paths.map((file) => evidence("doc", file, "Architecture or operating context evidence.")), [
    finding("cp-doc-architecture-gap", "medium", "Architecture docs are incomplete", "CompliancePass expects enough system context for a fresh reviewer or worker.", "Add or link the canonical architecture, Autopilot, and fleet-sync docs."),
  ], "Complete architecture and operating docs.");
}

async function checkDecisionAndRunbookDocs(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const adrFiles = snapshot.files.filter((file) => /^docs\/adr\//.test(file) || /decision|runbook|incident|rollback/i.test(file));
  if (adrFiles.length >= 4) {
    return check("cp-doc-decisions-runbooks", "documentation_quality", "Decision and runbook evidence exists", "pass", 100, `${adrFiles.length} decision/runbook-style file(s) were found.`, adrFiles.slice(0, 5).map((file) => evidence("doc", file, "Decision or runbook evidence.")));
  }
  return check("cp-doc-decisions-runbooks", "documentation_quality", "Decision and runbook evidence exists", adrFiles.length > 0 ? "partial" : "fail", adrFiles.length > 0 ? 60 : 25, `${adrFiles.length} decision/runbook-style file(s) were found.`, adrFiles.slice(0, 5).map((file) => evidence("doc", file, "Decision or runbook evidence.")), [
    finding("cp-doc-decisions-runbooks-thin", "medium", "Decision/runbook evidence is thin", "Procurement and investor reads improve when decisions and recovery paths are explicit.", "Add lightweight ADRs and runbooks for deploy, incident response, key rotation, and rollback."),
  ], "Add lightweight ADRs and runbooks for core operations.");
}

async function checkPublicSecretHygiene(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, SECRET_SHAPED_PUBLIC_VALUE_PATTERN, ["public", "docs"]);
  if (matches.length === 0) {
    return check("cp-cred-public-secret-hygiene", "credential_environment_hygiene", "Public docs and receipts avoid secret-shaped values", "pass", 100, "No secret-shaped values were found in public/docs scan.", [
      evidence("derived", "public, docs", "Public and docs surfaces were scanned for secret-shaped values."),
    ]);
  }
  return check("cp-cred-public-secret-hygiene", "credential_environment_hygiene", "Public docs and receipts avoid secret-shaped values", "fail", 0, `${matches.length} secret-shaped value(s) were found in public/docs scan.`, matches.slice(0, 8).map((match) => evidence("file", match.file, "Secret-shaped value found; source text intentionally not echoed in the public report.", match.line)), [
    finding("cp-cred-public-secret-shaped-value", "critical", "Secret-shaped value found in public/docs", "CompliancePass never stores or publishes raw secret evidence.", "Remove the value, rotate if real, and replace it with redacted proof."),
  ], "Remove any public secret-shaped values and rotate if real.");
}

async function checkCredentialMapping(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\b(keychain|credential|connector|provider|used-by|blast radius|rotation)\b/i, ["docs", "src", "scripts"]);
  if (matches.length >= 20) {
    return check("cp-cred-mapping", "credential_environment_hygiene", "Credential and connector mapping evidence exists", "pass", 100, `${matches.length} credential/connector mapping references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)));
  }
  return check("cp-cred-mapping", "credential_environment_hygiene", "Credential and connector mapping evidence exists", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 60 : 20, `${matches.length} credential/connector mapping references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)), [
    finding("cp-cred-mapping-thin", "medium", "Credential mapping evidence is thin", "Readiness improves when owners, providers, and blast radius are visible without exposing values.", "Add a redacted credential ownership and used-by matrix."),
  ], "Add a redacted credential ownership and used-by matrix.");
}

async function checkRotationEvidence(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\bRotatePass|rotation|revoke access|last check|staleness\b/i, ["docs", "src", "scripts", "tests"]);
  if (matches.length >= 10) {
    return check("cp-cred-rotation", "credential_environment_hygiene", "Rotation and staleness evidence exists", "pass", 100, `${matches.length} rotation/staleness references were found.`, matches.slice(0, 5).map((match) => evidence("file", match.file, match.summary, match.line)));
  }
  return check("cp-cred-rotation", "credential_environment_hygiene", "Rotation and staleness evidence exists", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 60 : 20, `${matches.length} rotation/staleness references were found.`, matches.slice(0, 5).map((match) => evidence("file", match.file, match.summary, match.line)), [
    finding("cp-cred-rotation-thin", "medium", "Rotation evidence is thin", "Credential change impact should be visible before a key is revoked or rotated.", "Link RotatePass or equivalent staleness evidence into the readiness report."),
  ], "Link credential rotation evidence into CompliancePass.");
}

async function checkLicense(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  if (hasFile(snapshot, "LICENSE") || hasFile(snapshot, "LICENSE.md")) {
    return check("cp-investor-license", "investor_readiness", "License evidence exists", "pass", 100, "A license file was found.", [
      evidence("file", hasFile(snapshot, "LICENSE") ? "LICENSE" : "LICENSE.md", "License evidence for investor/IP review."),
    ]);
  }
  return check("cp-investor-license", "investor_readiness", "License evidence exists", "fail", 20, "No license file was found.", [missingEvidence("LICENSE", "License file was not found.")], [
    finding("cp-investor-license-missing", "high", "License evidence is missing", "Investors and buyers need clear IP and usage terms.", "Add a license file or document private licensing terms."),
  ], "Add license evidence.");
}

async function checkRepositoryMetadata(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const packageJson = await readJson(snapshot, "package.json");
  const hasName = typeof packageJson?.name === "string";
  const hasRepository = isRecord(packageJson?.repository) || typeof packageJson?.repository === "string";
  if (hasName && hasRepository) {
    return check("cp-investor-repo-metadata", "investor_readiness", "Repository metadata is explicit", "pass", 100, "Root package metadata includes name and repository.", [
      evidence("package", "package.json", "Repository metadata evidence."),
    ]);
  }
  return check("cp-investor-repo-metadata", "investor_readiness", "Repository metadata is explicit", hasName ? "partial" : "fail", hasName ? 60 : 25, "Root package metadata is incomplete.", [
    evidence("package", "package.json", "Root package metadata was checked."),
  ], [
    finding("cp-investor-repo-metadata-gap", "low", "Repository metadata is incomplete", "Clear package/repo metadata helps first-pass diligence.", "Add repository metadata to package.json."),
  ], "Add repository metadata to package.json.");
}

async function checkAuditTrailEvidence(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\b(ledger|audit trail|receipt|ack ledger|proof|workflow run|human_touch_count)\b/i, ["docs", "scripts", "api", "src"]);
  if (matches.length >= 25) {
    return check("cp-investor-audit-trail", "investor_readiness", "Audit trail and proof language exists", "pass", 100, `${matches.length} audit/proof references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)));
  }
  return check("cp-investor-audit-trail", "investor_readiness", "Audit trail and proof language exists", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 65 : 20, `${matches.length} audit/proof references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)), [
    finding("cp-investor-audit-trail-thin", "medium", "Audit trail evidence is thin", "Readiness improves when work, proof, and ownership are observable.", "Link ledger and receipt proof into the readiness report."),
  ], "Link ledger and receipt proof into CompliancePass.");
}

async function checkFrameworkMappingEvidence(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const mappingPath = "docs/compliancepass-framework-mapping.md";
  const indexPath = "docs/compliancepass-control-index.md";
  const text = await readText(snapshot, mappingPath);
  const indexText = await readText(snapshot, indexPath);
  if (!text) {
    return check("cp-investor-framework-mapping", "investor_readiness", "Framework alignment evidence is documented", "partial", 45, "No CompliancePass framework mapping was found.", [missingEvidence(mappingPath, "Framework alignment mapping was not found.")], [
      finding("cp-investor-framework-mapping-missing", "medium", "Framework mapping is missing", "The original CompliancePass research expects evidence alignment to ISO, AI governance, secure development, supply-chain, SIG/CAIQ, and buyer diligence language.", "Add a framework mapping that names the external frameworks and states exactly which parts are evidence alignment rather than certification."),
    ], "Add explicit framework-alignment evidence and keep the wording out of certification territory.");
  }

  const normalized = `${text}\n${indexText}`.toLowerCase();
  const requiredTerms = [
    "iso/iec 27001",
    "iso/iec 42001",
    "nist sp 800-218",
    "owasp samm",
    "openssf",
    "slsa",
    "sig",
    "caiq",
    "vc technical due diligence",
  ];
  const missingTerms = requiredTerms.filter((term) => !normalized.includes(term));
  const normalizedIndex = indexText.toLowerCase();
  const requiredIndexColumns = [
    "framework",
    "control or question id",
    "compliancepass check id",
    "evidence path",
    "owner",
    "status",
    "last proof",
    "freshness window",
  ];
  const missingIndexColumns = requiredIndexColumns.filter((term) => !normalizedIndex.includes(term));
  const indexRowCount = indexText.split(/\r?\n/).filter((line) => line.trim().startsWith("|")).length;
  const hasControlIndexRows = indexRowCount >= 7;
  const declaresPartialControlIndex =
    /\b(partial|incomplete|not yet complete|not complete)\b[\s\S]{0,180}\bcontrol-by-control\b/i.test(`${text}\n${indexText}`) ||
    /\bcontrol-by-control\b[\s\S]{0,180}\b(partial|incomplete|not yet complete|not complete)\b/i.test(`${text}\n${indexText}`);

  if (missingTerms.length === 0 && missingIndexColumns.length === 0 && hasControlIndexRows && !declaresPartialControlIndex) {
    return check("cp-investor-framework-mapping", "investor_readiness", "Framework alignment evidence is documented", "pass", 100, "Framework mapping names the expected standards and links a control index with evidence rows, owners, status, last proof, and freshness windows.", [
      evidence("doc", mappingPath, "Framework alignment evidence for investor and buyer review."),
      evidence("doc", indexPath, "Framework control index evidence for investor and buyer review."),
    ]);
  }

  const missingIndexItems = [
    ...missingIndexColumns.map((column) => `index column: ${column}`),
    ...(!hasControlIndexRows ? ["at least 5 control rows"] : []),
  ];
  const score = missingTerms.length === 0 && missingIndexColumns.length === 0 ? 70 : Math.max(40, 80 - (missingTerms.length + missingIndexItems.length) * 5);
  const summary = [
    missingTerms.length > 0 ? `missing expected term(s): ${missingTerms.join(", ")}` : "",
    missingIndexItems.length > 0 ? `missing index evidence: ${missingIndexItems.join(", ")}` : "",
    declaresPartialControlIndex ? "control-index wording still declares the index unfinished" : "",
  ].filter(Boolean).join("; ");

  return check("cp-investor-framework-mapping", "investor_readiness", "Framework alignment evidence is documented", "partial", score, summary, [
    evidence("doc", mappingPath, "Framework alignment evidence for investor and buyer review."),
    indexText ? evidence("doc", indexPath, "Framework control index evidence for investor and buyer review.") : missingEvidence(indexPath, "Framework control index was not found."),
  ], [
    finding("cp-investor-framework-control-index-thin", "medium", "Framework control index is not complete", "The report can show evidence alignment today, but it cannot yet export a full control-by-control ISO/NIST/OWASP/OpenSSF/SLSA/SIG/CAIQ mapping.", "Add a generated control-by-control index with evidence rows, owner, status, and last-proof timestamp for each mapped control."),
  ], "Add a generated control-by-control framework index with evidence rows and freshness timestamps.");
}

async function checkAiProviderInventory(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\b(ai provider|model inventory|OpenRouter|Anthropic|OpenAI|provider inventory|model card)\b/i, ["docs", "api", "packages", "src"]);
  if (matches.length >= 10) {
    return check("cp-ai-provider-inventory", "ai_governance_readiness", "AI provider inventory evidence exists", "pass", 100, `${matches.length} AI provider/model references were found.`, matches.slice(0, 5).map((match) => evidence("file", match.file, match.summary, match.line)));
  }
  return check("cp-ai-provider-inventory", "ai_governance_readiness", "AI provider inventory evidence exists", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 60 : 20, `${matches.length} AI provider/model references were found.`, matches.slice(0, 5).map((match) => evidence("file", match.file, match.summary, match.line)), [
    finding("cp-ai-provider-inventory-thin", "medium", "AI provider inventory is thin", "AI-native teams need visible provider, model, and fallback evidence.", "Add or link a provider/model inventory with cost and fallback notes."),
  ], "Add or link AI provider inventory evidence.");
}

async function checkAiOversightDocs(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\b(human oversight|human touch|bookend|approval|PASS|BLOCKER|HOLD|trusted ACK|review)\b/i, ["docs", "scripts", "packages", "api"]);
  if (matches.length >= 20) {
    return check("cp-ai-oversight", "ai_governance_readiness", "AI oversight and review evidence exists", "pass", 100, `${matches.length} oversight/review references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)));
  }
  return check("cp-ai-oversight", "ai_governance_readiness", "AI oversight and review evidence exists", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 65 : 25, `${matches.length} oversight/review references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)), [
    finding("cp-ai-oversight-thin", "medium", "AI oversight evidence is thin", "AI work needs visible review, blocker, and rollback paths.", "Link AI review and trusted ACK evidence into the readiness report."),
  ], "Link AI review and trusted ACK evidence into CompliancePass.");
}

async function checkAiDataDocs(snapshot: RepoSnapshot): Promise<CompliancePassCheck> {
  const matches = await findTextMatches(snapshot, /\b(data card|source note|training data|retrieval|memory|redaction|prompt)\b/i, ["docs", "packages", "api", "src"]);
  if (matches.length >= 15) {
    return check("cp-ai-data-notes", "ai_governance_readiness", "AI data/source notes exist", "pass", 100, `${matches.length} AI data/source references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)));
  }
  return check("cp-ai-data-notes", "ai_governance_readiness", "AI data/source notes exist", matches.length > 0 ? "partial" : "fail", matches.length > 0 ? 60 : 20, `${matches.length} AI data/source references were found.`, matches.slice(0, 5).map((match) => evidence("doc", match.file, match.summary, match.line)), [
    finding("cp-ai-data-notes-thin", "medium", "AI data/source notes are thin", "Data, memory, and source handling should be clear before governance reviews.", "Add source, data, redaction, and retention notes for AI workflows."),
  ], "Add source and data notes for AI workflows.");
}

function buildCategory(definition: CategoryDefinition, checks: CompliancePassCheck[]): CompliancePassCategory {
  const score = checks.length > 0 ? round(checks.reduce((total, item) => total + item.score, 0) / checks.length) : 0;
  const categoryGaps = checks.flatMap((item) => item.findings);
  const band = bandFromScoreAndGaps(score, categoryGaps);
  const failCount = checks.filter((item) => item.status === "fail").length;
  const partialCount = checks.filter((item) => item.status === "partial").length;
  const unknownCount = checks.filter((item) => item.status === "unknown").length;
  const status: CompliancePassStatus = failCount > 0 ? "fail" : partialCount > 0 ? "partial" : unknownCount > 0 ? "unknown" : "pass";
  return {
    id: definition.id,
    name: definition.name,
    status,
    score,
    band,
    summary: `${definition.name} scored ${score}/100 with ${failCount} fail and ${partialCount} partial check(s).`,
    checks,
  };
}

function summarizeChecks(checks: CompliancePassCheck[]) {
  return {
    checks_total: checks.length,
    checks_pass: checks.filter((check) => check.status === "pass").length,
    checks_partial: checks.filter((check) => check.status === "partial").length,
    checks_fail: checks.filter((check) => check.status === "fail").length,
    checks_unknown: checks.filter((check) => check.status === "unknown").length,
    checks_na: checks.filter((check) => check.status === "na").length,
  };
}

function check(
  id: string,
  categoryId: CompliancePassCategoryId,
  title: string,
  status: CompliancePassStatus,
  score: number,
  summary: string,
  evidenceItems: CompliancePassEvidence[] = [],
  findings: CompliancePassFinding[] = [],
  recommendation?: string,
): CompliancePassCheck {
  const findingEvidence = evidenceItems.length > 0
    ? evidenceItems.slice(0, 5)
    : [missingEvidence(`derived/${id}`, "No concrete evidence pointer was available for this finding.")];
  return {
    id,
    category_id: categoryId,
    title,
    status,
    score,
    summary,
    evidence: evidenceItems,
    findings: findings.map((item) => ({
      ...item,
      evidence: item.evidence.length > 0 ? item.evidence : findingEvidence,
    })),
    recommendation,
  };
}

function finding(
  id: string,
  severity: CompliancePassFinding["severity"],
  title: string,
  summary: string,
  recommendation: string,
  evidenceItems: CompliancePassEvidence[] = [],
): CompliancePassFinding {
  return { id, severity, title, summary, recommendation, evidence: evidenceItems };
}

function evidence(
  type: CompliancePassEvidence["type"],
  filePath: string | undefined,
  summary: string,
  line?: number,
): CompliancePassEvidence {
  return {
    type,
    path: filePath,
    label: filePath ?? type,
    summary,
    confidence: type === "derived" ? "medium" : "high",
    line,
  };
}

function missingEvidence(filePath: string, summary: string): CompliancePassEvidence {
  return {
    type: "missing",
    path: filePath,
    label: filePath,
    summary,
    confidence: "high",
  };
}

async function readJson(snapshot: RepoSnapshot, relativePath: string): Promise<Record<string, unknown> | null> {
  const text = await readText(snapshot, relativePath);
  if (!text) return null;
  try {
    const parsed = JSON.parse(text);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function readText(snapshot: RepoSnapshot, relativePath: string): Promise<string> {
  const normalized = normalizePath(relativePath);
  if (!snapshot.files.includes(normalized)) return "";
  const extension = path.extname(normalized);
  if (extension && !TEXT_EXTENSIONS.has(extension)) return "";
  const cached = snapshot.textCache.get(normalized);
  if (cached !== undefined) return cached;
  const text = await fs.readFile(path.join(snapshot.root, normalized), "utf8");
  snapshot.textCache.set(normalized, text);
  return text;
}

function hasFile(snapshot: RepoSnapshot, relativePath: string): boolean {
  return snapshot.files.includes(normalizePath(relativePath));
}

async function findTextMatches(
  snapshot: RepoSnapshot,
  pattern: RegExp,
  prefixes: string[],
): Promise<Array<{ file: string; line: number; summary: string }>> {
  const matches: Array<{ file: string; line: number; summary: string }> = [];
  const files = snapshot.files.filter((file) =>
    prefixes.some((prefix) => file === prefix || file.startsWith(`${prefix}/`)),
  );
  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
    const text = await readText(snapshot, file);
    const lines = text.split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        matches.push({ file, line: index + 1, summary: publicSummary(line.trim()) });
      }
    }
  }
  return matches;
}

async function findUnsafeClaimLanguage(
  snapshot: RepoSnapshot,
): Promise<Array<{ file: string; line: number; summary: string }>> {
  const unsafeClaimPattern =
    /\b(audit passed|ISO approved|SOC ready|legally safe|enterprise certified|enterprise compliant|100% secure|fully secure|(?:CompliancePass|EnterprisePass|compliance|enterprise|security|SOC|ISO)[^.\n]{0,100}\b(?:certifies|certified|certificate|compliant|attested))\b/i;
  const inlineNegationCue =
    /\b(not|no|does not|do not|without|never|isn't|is not|must not)\b[^.\n]{0,120}\b(certif|compliant|attest|SOC|ISO|secure)/i;
  const guardrailExampleCue =
    /\b(avoid|forbidden|disallowed|disallowed phrasing|do not use|unsafe claim|bad example)\b/i;
  const matches: Array<{ file: string; line: number; summary: string }> = [];
  const files = snapshot.files.filter((file) =>
    ["docs", "public", "src"].some((prefix) => file === prefix || file.startsWith(`${prefix}/`)),
  );

  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
    const text = await readText(snapshot, file);
    const lines = text.split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      unsafeClaimPattern.lastIndex = 0;
      if (!unsafeClaimPattern.test(line)) continue;
      if (inlineNegationCue.test(line)) continue;
      const nearbyContext = lines.slice(Math.max(0, index - 8), index + 1).join(" ");
      if (guardrailExampleCue.test(nearbyContext)) continue;
      matches.push({ file, line: index + 1, summary: publicSummary(line.trim()) });
    }
  }

  return matches;
}

function prioritizedActions(checks: CompliancePassCheck[]): string[] {
  const actions = checks
    .filter((check) => check.status === "fail" || check.status === "partial" || check.status === "unknown")
    .map((check) => check.recommendation)
    .filter((action): action is string => Boolean(action));
  return [...new Set(actions)].slice(0, 10);
}

function topLevelEvidence(checks: CompliancePassCheck[]): CompliancePassEvidence[] {
  const seen = new Set<string>();
  const items: CompliancePassEvidence[] = [];
  for (const item of checks.flatMap((check) => check.evidence)) {
    const key = `${item.type}:${item.path ?? item.label}:${item.line ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (item.type !== "missing") items.push(item);
    if (items.length >= 20) break;
  }
  return items;
}

function summaryHeadline(score: number, gaps: CompliancePassFinding[]): string {
  const blockingGapCount = gaps.filter((gap) => gap.severity === "critical" || gap.severity === "high").length;
  if (blockingGapCount > 0) {
    return `Strong readiness evidence, but ${blockingGapCount} high/critical gap(s) keep the report out of green.`;
  }
  if (score >= 80) return `Strong readiness evidence with ${gaps.length} gap(s) to track.`;
  if (score >= 50) return `Partial readiness evidence with ${gaps.length} gap(s) to fix before heavier buyer review.`;
  return `Material readiness gaps found; ${gaps.length} issue(s) need evidence or remediation.`;
}

function bandFromScore(score: number): CompliancePassBand {
  if (score >= 80) return "green";
  if (score >= 50) return "amber";
  return "red";
}

function bandFromScoreAndGaps(score: number, gaps: CompliancePassFinding[]): CompliancePassBand {
  if (gaps.some((gap) => gap.severity === "critical")) return "red";
  if (gaps.some((gap) => gap.severity === "high")) return score >= 50 ? "amber" : "red";
  return bandFromScore(score);
}

function trafficLightForBand(band: CompliancePassBand): "green" | "yellow" | "red" | "grey" {
  if (band === "green") return "green";
  if (band === "amber") return "yellow";
  if (band === "red") return "red";
  return "grey";
}

function gapSeverityCounts(gaps: CompliancePassFinding[]): CompliancePassGapSeverityCounts {
  return gaps.reduce<CompliancePassGapSeverityCounts>((counts, gap) => {
    counts[gap.severity] += 1;
    return counts;
  }, {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
  });
}

function validUntil(generatedAt: string, hours: number): string {
  const generatedTime = Date.parse(generatedAt);
  const base = Number.isFinite(generatedTime) ? generatedTime : Date.now();
  return new Date(base + hours * 60 * 60 * 1000).toISOString();
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function truncate(value: string): string {
  return value.length > 180 ? `${value.slice(0, 177)}...` : value;
}

function publicSummary(value: string): string {
  let sanitized = value;
  for (const pattern of PUBLIC_SUMMARY_REDACTIONS) {
    sanitized = sanitized.replace(pattern, REDACTED_PUBLIC_TEXT);
  }
  return truncate(sanitized);
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function numericMarker(text: string, label: string): number {
  const pattern = new RegExp(`\\b${label}\\s*[:=-]\\s*(\\d+)`, "i");
  const match = text.match(pattern);
  return match ? Number(match[1]) : 0;
}

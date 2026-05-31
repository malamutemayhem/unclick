import { createHash } from "node:crypto";

const CHECK_ORDER = [
  "testpass",
  "uipass",
  "uxpass",
  "flowpass",
  "securitypass",
  "rotatepass",
  "copypass",
  "fidelitypass",
  "seopass",
  "geopass",
  "legalpass",
  "compliancepass",
  "commonsensepass",
  "wakepass",
  "sloppass",
] as const;

type XPassCheck = (typeof CHECK_ORDER)[number];
type NormalizedStatus = "passed" | "blocker" | "skipped" | "missing";
type ChecklistStatus = "PASS" | "BLOCKER" | "MISSING" | "NOT RUN" | "N/A";

interface SelectedCheck {
  check: XPassCheck;
  name: string;
  reasons: string[];
}

interface NormalizedPassResult {
  check: string;
  name: string;
  status: NormalizedStatus;
  raw_status: string | null;
  run_id: string;
  url: string;
  summary: string;
  generated_at: string | null;
  target_sha: string;
}

interface InspectedTarget {
  type: string;
  id: string;
  sha: string;
  url: string;
  ref: string;
}

interface SkippedCheck {
  check: XPassCheck;
  name: string;
  reason: string;
}

const CHECK_LABELS: Record<XPassCheck, string> = {
  testpass: "TestPass",
  uipass: "UIPass",
  uxpass: "UXPass",
  flowpass: "FlowPass",
  securitypass: "SecurityPass",
  rotatepass: "RotatePass",
  copypass: "CopyPass",
  fidelitypass: "FidelityPass",
  seopass: "SEOPass",
  geopass: "GEOPass",
  legalpass: "LegalPass",
  compliancepass: "CompliancePass",
  commonsensepass: "CommonSensePass",
  wakepass: "WakePass",
  sloppass: "SlopPass",
};

const PASS_PRODUCT_CHECKS = new Map<string, XPassCheck>([
  ["commonsensepass", "commonsensepass"],
  ["copypass", "copypass"],
  ["fidelitypass", "fidelitypass"],
  ["flowpass", "flowpass"],
  ["geopass", "geopass"],
  ["enterprisepass", "compliancepass"],
  ["compliancepass", "compliancepass"],
  ["legalpass", "legalpass"],
  ["securitypass", "securitypass"],
  ["seopass", "seopass"],
  ["sloppass", "sloppass"],
  ["testpass", "testpass"],
  ["uipass", "uipass"],
  ["uxpass", "uxpass"],
  ["wakepass", "wakepass"],
  ["rotatepass", "rotatepass"],
]);

const ENTERPRISE_READINESS_TERMS = [
  "enterprisepass",
  "compliancepass",
  "enterprise readiness",
  "compliance readiness",
  "ai governance",
  "model inventory",
  "technical documentation",
  "training data",
];

const COUNCIL_TRIGGER_TERMS = [
  "ambiguous",
  "council",
  "crew",
  "crews",
  "debate",
  "decide",
  "decision",
  "dissent",
  "good enough",
  "go no go",
  "go/no-go",
  "judgement",
  "judgment",
  "launch",
  "opinion",
  "opinions",
  "positioning",
  "ready to ship",
  "risk acceptance",
  "strategy",
  "taste",
  "trade-off",
  "tradeoff",
  "unclear",
];

const COUNCIL_HIGH_JUDGMENT_CHECKS = new Set<XPassCheck>([
  "securitypass",
  "legalpass",
  "commonsensepass",
  "rotatepass",
]);

const COUNCIL_LITE_QUESTIONS = [
  "What would make this answer or change wrong?",
  "What evidence is missing, stale, or too weak?",
  "Who would object: user, maintainer, reviewer, legal, security, or operator?",
  "What is the smallest proof needed before saying ready?",
];

const PASS_STATUS = new Set(["pass", "passed", "success", "green", "ok", "ready"]);
const BLOCKER_STATUS = new Set(["fail", "failed", "failure", "blocker", "blocked", "red", "needs-work"]);
const SKIP_STATUS = new Set(["skip", "skipped", "not_applicable", "not-applicable", "na", "n/a"]);

export async function xpassAggregatedVerdict(args: Record<string, unknown>): Promise<unknown> {
  const inspectedTarget = target(args);
  if (!inspectedTarget.sha) {
    return {
      error: "target.sha or target.head_sha is required so the XPass verdict can be bound to the exact PR head.",
      verdict: "fail",
      reason: "missing_target_sha",
    };
  }

  return evaluateXPassAggregatedVerdict(args, inspectedTarget);
}

export function evaluateXPassAggregatedVerdict(
  input: Record<string, unknown> = {},
  inspectedTarget = target(input),
): Record<string, unknown> {
  const now = readString(input.generated_at ?? input.generatedAt ?? input.now) || new Date().toISOString();
  const selected = enabledSelection(input, selectXPassChecks(input));
  const selectedChecks = selected.map((check) => check.check);
  const available = new Set(readKnownCheckList(input.available_checks ?? input.availableChecks));
  const hasAvailability = available.size > 0;
  const results = resultMap(input.pass_results ?? input.passResults ?? input.results);
  const council = selectCrewsCouncilTrigger(input, selected, results);

  const skipped: SkippedCheck[] = [];
  const missing: XPassCheck[] = [];
  const provided: NormalizedPassResult[] = [];
  const blockers: NormalizedPassResult[] = [];
  const stale: NormalizedPassResult[] = [];
  const unscoped: NormalizedPassResult[] = [];

  for (const selectedCheck of selectedChecks) {
    if (hasAvailability && !available.has(selectedCheck)) {
      skipped.push({ check: selectedCheck, name: CHECK_LABELS[selectedCheck], reason: "pass_not_available" });
      continue;
    }

    const result = results.get(selectedCheck);
    if (!result) {
      missing.push(selectedCheck);
      continue;
    }

    provided.push(result);
    if (result.status === "blocker") blockers.push(result);
    if (result.status === "missing") missing.push(selectedCheck);
    if (isStaleForTarget(result, inspectedTarget)) stale.push(result);
    if (isUnscopedForTarget(result, inspectedTarget)) unscoped.push(result);
    if (result.status === "skipped") {
      skipped.push({ check: selectedCheck, name: CHECK_LABELS[selectedCheck], reason: result.summary || "pass_result_skipped" });
    }
  }

  const uniqueMissing = uniq(missing);
  const unavailable = skipped.filter((item) => item.reason === "pass_not_available");
  const hardIssues = blockers.length + stale.length + unscoped.length;
  const pendingIssues = uniqueMissing.length + unavailable.length;
  const result = selected.length === 0
    ? "no_relevant_checks"
    : hardIssues > 0
      ? "blocker"
      : pendingIssues > 0
        ? "xpass_needed"
        : "passed";
  const verdict = result === "passed" ? "pass" : result === "blocker" ? "fail" : "pending";
  const ok = verdict === "pass";
  const receipt = makeReceipt({
    inspectedTarget,
    selected,
    provided,
    missing: uniqueMissing,
    blockers,
    stale,
    unscoped,
    skipped,
    council,
    now,
    verdict,
    result,
  });

  return {
    kind: "xpass_aggregated_verdict",
    ok,
    verdict,
    result,
    reason: resultReason(result, selected.length, blockers, stale, unscoped),
    target: inspectedTarget,
    selected_checks: selected,
    missing_checks: uniqueMissing,
    blocked_checks: blockers.map((item) => item.check),
    stale_checks: stale.map((item) => item.check),
    unscoped_checks: unscoped.map((item) => item.check),
    skipped_checks: skipped,
    crews_council: council,
    auto_merge_gate: {
      status: ok ? "ready" : "blocked",
      merge_ready: ok,
      required_head_sha: inspectedTarget.sha,
      verdict_head_sha: inspectedTarget.sha,
      verdict_matches_head: ok && receipt.provenance.head_sha === inspectedTarget.sha,
      rule: "merge only when xpass_aggregated_verdict.verdict is pass and provenance.head_sha equals current PR HEAD",
    },
    receipt,
  };
}

function makeReceipt({
  inspectedTarget,
  selected,
  provided,
  missing,
  blockers,
  stale,
  unscoped,
  skipped,
  council,
  now,
  verdict,
  result,
}: {
  inspectedTarget: InspectedTarget;
  selected: SelectedCheck[];
  provided: NormalizedPassResult[];
  missing: XPassCheck[];
  blockers: NormalizedPassResult[];
  stale: NormalizedPassResult[];
  unscoped: NormalizedPassResult[];
  skipped: SkippedCheck[];
  council: Record<string, unknown>;
  now: string;
  verdict: "pass" | "pending" | "fail";
  result: string;
}) {
  const selectedByCheck = new Map(selected.map((check) => [check.check, check]));
  const providedByCheck = new Map(provided.map((item) => [item.check, item]));
  const missingSet = new Set(missing);
  const blockerSet = new Set(blockers.map((item) => item.check));
  const staleSet = new Set(stale.map((item) => item.check));
  const unscopedSet = new Set(unscoped.map((item) => item.check));
  const skippedByCheck = new Map(skipped.map((item) => [item.check, item]));
  const fullChecklist = CHECK_ORDER.map((check) => checklistItem({
    check,
    selected: selectedByCheck.has(check),
    skipped: skippedByCheck.get(check),
    result: providedByCheck.get(check),
    missing: missingSet.has(check),
    blocker: blockerSet.has(check),
    stale: staleSet.has(check),
    unscoped: unscopedSet.has(check),
  }));
  const evidence = provided.map((item) => ({
    check: item.check,
    name: item.name,
    status: item.status,
    raw_status: item.raw_status,
    run_id: item.run_id || null,
    url: item.url || null,
    summary: item.summary || null,
    generated_at: item.generated_at,
    target_sha: item.target_sha || null,
  }));
  const actionNeeded = [
    ...missing.map((check) => `Run ${CHECK_LABELS[check]}.`),
    ...blockers.map((item) => `${item.name} returned ${item.status}.`),
    ...stale.map((item) => `${item.name} receipt is stale for ${inspectedTarget.sha}.`),
    ...unscoped.map((item) => `${item.name} receipt is missing target SHA scope for ${inspectedTarget.sha}.`),
    ...skipped
      .filter((item) => item.reason === "pass_not_available")
      .map((item) => `${item.name} is selected but not available in this run.`),
  ];
  const provenance = {
    source_tool: "xpass_aggregated_verdict",
    target_type: inspectedTarget.type || "change",
    target_id: inspectedTarget.id || null,
    target_ref: inspectedTarget.ref || null,
    target_url: inspectedTarget.url || null,
    head_sha: inspectedTarget.sha,
    invalidates_on: ["new_commit"],
    binding_rule: "Every selected PASS receipt must name this head_sha; stale or unscoped receipts block the verdict.",
  };
  const receiptBase = {
    kind: "xpass_receipt_v1",
    generated_at: now,
    target: inspectedTarget,
    verdict,
    result,
    full_checklist: fullChecklist,
    checks_selected: selected.map((item) => ({
      check: item.check,
      name: item.name,
      reasons: item.reasons,
    })),
    checks_skipped: skipped,
    improvement_signals: improvementSignals(missing, blockers, stale, unscoped, skipped),
    evidence,
    action_needed: actionNeeded,
    staleness: {
      stale_checks: stale.map((item) => item.check),
      unscoped_checks: unscoped.map((item) => item.check),
      target_sha: inspectedTarget.sha,
    },
    crews_council: council,
    provenance,
  };

  return {
    receipt_id: receiptId(receiptBase),
    ...receiptBase,
  };
}

function checklistItem({
  check,
  selected,
  skipped,
  result,
  missing,
  blocker,
  stale,
  unscoped,
}: {
  check: XPassCheck;
  selected: boolean;
  skipped?: SkippedCheck;
  result?: NormalizedPassResult;
  missing: boolean;
  blocker: boolean;
  stale: boolean;
  unscoped: boolean;
}): { check: XPassCheck; name: string; status: ChecklistStatus; reason: string } {
  if (!selected) return { check, name: CHECK_LABELS[check], status: "N/A", reason: "not_selected_for_target" };
  if (stale) return { check, name: CHECK_LABELS[check], status: "BLOCKER", reason: "stale_receipt_for_target_sha" };
  if (unscoped) return { check, name: CHECK_LABELS[check], status: "BLOCKER", reason: "receipt_missing_target_sha" };
  if (blocker) return { check, name: CHECK_LABELS[check], status: "BLOCKER", reason: result?.summary || "pass_result_blocker" };
  if (skipped) return { check, name: CHECK_LABELS[check], status: "NOT RUN", reason: skipped.reason };
  if (result?.status === "passed") return { check, name: CHECK_LABELS[check], status: "PASS", reason: "receipt_green" };
  if (result?.status === "skipped") return { check, name: CHECK_LABELS[check], status: "N/A", reason: result.summary || "pass_result_skipped" };
  if (missing) return { check, name: CHECK_LABELS[check], status: "MISSING", reason: "selected_but_no_receipt" };
  return { check, name: CHECK_LABELS[check], status: "NOT RUN", reason: "selected_without_receipt" };
}

function improvementSignals(
  missing: XPassCheck[],
  blockers: NormalizedPassResult[],
  stale: NormalizedPassResult[],
  unscoped: NormalizedPassResult[],
  skipped: SkippedCheck[],
) {
  return [
    ...missing.map((check) => ({
      check,
      name: CHECK_LABELS[check],
      signal: "selected_check_missing_receipt",
      action: "Add or rerun the receipt, then decide whether the pass needs a stronger runner or worker reminder.",
    })),
    ...blockers.map((item) => ({
      check: item.check,
      name: item.name,
      signal: "pass_returned_blocker",
      action: "Fix the target or improve the pass rule if this blocker is noisy.",
    })),
    ...stale.map((item) => ({
      check: item.check,
      name: item.name,
      signal: "stale_receipt",
      action: "Tighten receipt freshness or rerun behavior for this pass.",
    })),
    ...unscoped.map((item) => ({
      check: item.check,
      name: item.name,
      signal: "unscoped_receipt",
      action: "Teach the pass to bind evidence to the target SHA, URL, or artifact.",
    })),
    ...skipped
      .filter((item) => item.reason === "pass_not_available")
      .map((item) => ({
        check: item.check,
        name: item.name,
        signal: "pass_not_available",
        action: "Create a closure-board job if this pass should be available for this target class.",
      })),
  ];
}

function enabledSelection(input: Record<string, unknown>, selected: SelectedCheck[]): SelectedCheck[] {
  const enabled = readKnownCheckList(input.enabled_checks ?? input.enabledChecks);
  const explicit = readKnownCheckList(input.selected_checks ?? input.selectedChecks);
  const byCheck = new Map<XPassCheck, SelectedCheck>();
  for (const item of selected) byCheck.set(item.check, item);

  for (const check of explicit) {
    if (!byCheck.has(check)) {
      byCheck.set(check, { check, name: CHECK_LABELS[check], reasons: ["caller selected this XPass product check"] });
    }
  }

  if (enabled.length === 0) return [...byCheck.values()];
  if (byCheck.size === 0) {
    return enabled.map((check) => ({ check, name: CHECK_LABELS[check], reasons: ["enabled for this XPass run"] }));
  }

  return [...byCheck.values()].filter((item) => enabled.includes(item.check));
}

function selectXPassChecks(input: Record<string, unknown> = {}): SelectedCheck[] {
  const files = changedFiles(input);
  const text = targetText(input);
  const reasons = new Map<XPassCheck, Set<string>>();
  const allText = `${text} ${files.join(" ")}`;
  const needsExactCopyProof = exactCopyRequest(allText);

  for (const path of files) {
    const pathWords = path.replace(/[/_.-]+/g, " ");
    const passProduct = passProductForPath(path);

    if (passProduct) {
      addReason(reasons, "testpass", `XPass product implementation needs proof tests: ${path}`);
      addReason(reasons, passProduct, `XPass product should dogfood its own specialist check: ${path}`);
      if (codeFile(path) && !testFile(path)) addReason(reasons, "sloppass", `XPass product implementation needs code-quality dogfood: ${path}`);
    }

    if (enterpriseReadinessSurface(path, allText)) {
      addReason(reasons, "testpass", `enterprise-readiness evidence needs runnable proof: ${path}`);
      addReason(reasons, "securitypass", `enterprise-readiness evidence covers security and credential hygiene: ${path}`);
      addReason(reasons, "commonsensepass", `enterprise-readiness evidence must avoid false compliance claims: ${path}`);
      addReason(reasons, "copypass", `enterprise-readiness wording surface: ${path}`);
      addReason(reasons, "legalpass", `compliance/readiness positioning surface: ${path}`);
      if (codeFile(path) && !testFile(path)) addReason(reasons, "sloppass", `enterprise-readiness implementation quality surface: ${path}`);
    }

    if (path.includes("xpass") || path.includes("qcpass")) {
      addReason(reasons, "testpass", `multi-pass gate needs runnable proof: ${path}`);
      addReason(reasons, "commonsensepass", `multi-pass gate must avoid false green receipts: ${path}`);
    }

    if (path.startsWith("packages/mcp-server/") || path.includes("/mcp") || path.endsWith("mcp.json") || path.includes("/tools/") || path.includes("connector") || path.includes("native-endpoints") || path.includes("testpass") || path.includes("uipass") || path.includes("uxpass") || path.includes("flowpass")) {
      addReason(reasons, "testpass", `tool or MCP surface: ${path}`);
    }

    if (path.startsWith("src/pages/") || path.startsWith("src/components/") || path.startsWith("src/layout") || path.startsWith("src/app") || /\.(tsx|jsx|css|scss|html)$/.test(path) || path === "index.html") {
      addReason(reasons, "uipass", `visual interface surface: ${path}`);
      addReason(reasons, "uxpass", `user-facing experience surface: ${path}`);
    }

    if (path.includes("flowpass") || path.includes("onboarding") || path.includes("checkout") || path.includes("signup") || path.includes("sign-up") || path.includes("login") || path.includes("handoff") || path.includes("navigation") || path.includes("journey") || path.includes("funnel") || path.includes("route") || path.startsWith("src/pages/")) {
      addReason(reasons, "flowpass", `journey or route surface: ${path}`);
    }

    if (path.startsWith("public/") || path === "index.html" || path.includes("landing") || path.includes("homepage") || path.includes("geopass") || path.includes("llms.txt") || path.includes("schema.org") || hasAny(pathWords, ["seo", "meta", "sitemap", "robots", "canonical", "schema"])) {
      addReason(reasons, "seopass", `public/SEO surface: ${path}`);
    }

    if (path.includes("geopass") || path.includes("llms.txt") || path.includes("schema.org") || path.includes("common-crawl") || path.includes("wikidata") || path.includes("structured-data") || hasAny(pathWords, ["geo", "generative", "engine", "ai", "answer", "crawlability", "sitemap", "robots", "canonical", "schema", "gptbot", "claudebot", "perplexitybot", "wikidata"])) {
      addReason(reasons, "geopass", `AI discovery/readiness surface: ${path}`);
    }

    if (path.includes("flowpass") || hasAny(pathWords, ["flow", "journey", "onboarding", "checkout", "handoff", "route", "cta", "form", "success", "failure"])) {
      addReason(reasons, "flowpass", `product journey surface: ${path}`);
    }

    if (/\.(md|mdx|txt)$/.test(path) || path.includes("copy") || path.includes("homepage") || path.includes("landing") || path.includes("pricing") || path.includes("docs/")) {
      if (!needsExactCopyProof) addReason(reasons, "copypass", `copy or docs surface: ${path}`);
    }

    if (path.includes("legal") || path.includes("terms") || path.includes("privacy") || path.includes("license") || path.includes("billing") || path.includes("pricing") || path.includes("subprocessor") || path.includes("dpa")) {
      addReason(reasons, "legalpass", `legal or commercial surface: ${path}`);
    }

    if (path.includes("enterprise") || path.includes("compliance") || path.includes("audit") || path.includes("evidence") || path.includes("receipt") || path.includes("policy") || path.includes("ruleset") || path.includes("secret-scanning") || path.endsWith("package-lock.json") || path.endsWith("pnpm-lock.yaml") || path.endsWith("yarn.lock") || path.includes("dependabot") || hasAny(pathWords, ["soc", "iso", "gdpr", "dpa"])) {
      addReason(reasons, "compliancepass", `enterprise/compliance evidence surface: ${path}`);
    }

    if (path.includes("auth") || path.includes("oauth") || path.includes("session") || path.includes("password") || path.includes("passkey") || path.includes("keychain") || path.includes("credential") || path.includes("credentials") || path.includes("token") || path.includes("secret") || path.includes("security") || path.includes("redaction") || path.includes("sanitize") || path.includes("csrf") || path.includes("csp") || path.includes("rls") || path.includes("supabase/migrations") || path.endsWith("package.json") || path.endsWith("package-lock.json") || path.endsWith("pnpm-lock.yaml") || path.endsWith("yarn.lock") || path.includes("dependabot")) {
      addReason(reasons, "securitypass", `security-sensitive surface: ${path}`);
    }

    if (path.includes("rotatepass") || path.includes("credential") || path.includes("credentials") || path.includes("revocation") || path.includes("local-session") || path.includes("browser-profile") || path.includes("token") || path.includes("secret") || path.includes("keychain") || path.includes("password") || path.includes("redaction") || path.includes("system-credentials") || path.includes("provider-response") || path.includes("rotation")) {
      addReason(reasons, "rotatepass", `credential rotation/redaction surface: ${path}`);
    }

    if (path.includes("commonsensepass") || path.includes("orchestrator") || path.includes("heartbeat") || path.includes("runner") || path.includes("queue") || path.includes("boardroom") || path.includes("claim") || path.includes("proof") || path.includes("receipt") || path.includes("merge-ready") || path.includes("no-work") || path.includes("done")) {
      addReason(reasons, "commonsensepass", `claim/proof sanity surface: ${path}`);
    }

    if (path.includes("wakepass") || path.includes("pinballwake") || path.startsWith(".github/workflows/") || path.includes("workflow") || path.includes("heartbeat") || path.includes("dispatch") || hasAny(pathWords, ["ack"]) || path.includes("scheduled") || path.includes("cron") || path.includes("stale") || path.includes("lease") || path.includes("runner") || path.includes("queue")) {
      addReason(reasons, "wakepass", `wake/runner reliability surface: ${path}`);
    }

    if (codeFile(path) && !testFile(path)) addReason(reasons, "sloppass", `code quality surface: ${path}`);
  }

  if (hasAny(allText, ["mcp", "tool", "tools", "connector", "connectors", "api endpoint", "native endpoint"])) addReason(reasons, "testpass", "target text mentions tools/connectors/MCP");
  if (hasAny(allText, ["ui", "visual", "screen", "screenshots", "dashboard", "admin page", "admin ui", "admin screen", "admin dashboard", "layout", "spacing", "typography", "mobile", "responsive", "accessibility", "wcag", "keyboard", "screen reader", "focus", "target size"])) addReason(reasons, "uipass", "target text mentions UI/visual changes");
  if (hasAny(allText, ["ux", "usability", "easy to use", "journey", "navigation", "onboarding", "form", "forms", "feedback", "recovery", "confusion", "task completion", "user path"])) addReason(reasons, "uxpass", "target text mentions UX/journey changes");
  if (hasAny(allText, ["flow", "journey", "path", "route", "checkout", "signup", "sign up", "onboarding", "handoff", "navigation", "funnel", "success state", "failure state"])) addReason(reasons, "flowpass", "target text mentions journey/flow completion");
  if (hasAny(allText, ["security", "auth", "oauth", "credential", "credentials", "token", "tokens", "secret", "secrets", "key", "keys", "password", "redaction", "prompt injection", "insecure output", "llm", "model output", "sandbox"])) addReason(reasons, "securitypass", "target text mentions security/auth/keys");
  if (hasAny(allText, ["rotatepass", "rotation", "rotate", "revocation", "credential", "credentials", "token", "tokens", "secret", "secrets", "key", "keys", "redaction", "system credentials", "local session", "browser profile", "password"])) addReason(reasons, "rotatepass", "target text mentions credential rotation/redaction");
  if (hasAny(allText, ["copy", "wording", "homepage", "landing", "docs", "faq", "marketing", "public claim", "public claims"]) && !needsExactCopyProof) addReason(reasons, "copypass", "target text mentions copy/docs/claims");
  if (needsExactCopyProof) addReason(reasons, "fidelitypass", "target text asks for exact 1:1 copy proof");
  if (hasAny(allText, ["seo", "search", "meta", "sitemap", "robots", "canonical", "schema", "structured data"])) addReason(reasons, "seopass", "target text mentions SEO");
  if (hasAny(allText, ["geo", "geopass", "generative engine", "ai discovery", "ai citation", "llms", "crawlability", "common crawl", "wikidata", "brand mention", "answer engine"])) addReason(reasons, "geopass", "target text mentions generative-engine readiness");
  if (hasAny(allText, ["legal", "privacy", "terms", "license", "pricing", "billing", "invoice", "subprocessor", "compliance"])) addReason(reasons, "legalpass", "target text mentions legal/commercial risk");
  if (hasAny(allText, ["enterprise", "enterprisepass", "compliancepass", "compliance", "audit", "evidence", "receipt", "policy", "soc", "iso", "gdpr", "dpa", "secret scanning", "push protection"])) addReason(reasons, "compliancepass", "target text mentions enterprise/compliance evidence");
  if (hasAny(allText, ["commonsensepass", "common sense", "healthy", "quiet", "no work", "no_work", "done", "merge ready", "merge_ready", "stale proof", "green chip", "claim", "completion proof"])) addReason(reasons, "commonsensepass", "target text mentions claim/proof sanity");
  if (hasAny(allText, ["wakepass", "pinballwake", "wake", "heartbeat", "dispatch", "ack", "lease", "stale check", "scheduled", "cron", "runner", "queue", "job claim"])) addReason(reasons, "wakepass", "target text mentions wake/runner reliability");
  if (hasAny(allText, ["quality", "slop", "refactor", "code smell", "bug", "bugfix"])) addReason(reasons, "sloppass", "target text mentions quality or code risk");

  return CHECK_ORDER
    .filter((check) => reasons.has(check))
    .map((check) => ({ check, name: CHECK_LABELS[check], reasons: [...(reasons.get(check) ?? [])] }));
}

function selectCrewsCouncilTrigger(
  input: Record<string, unknown>,
  selected: SelectedCheck[],
  results: Map<string, NormalizedPassResult>,
): Record<string, unknown> {
  const files = changedFiles(input);
  const text = targetText(input);
  const allText = `${text} ${files.join(" ")}`;
  const selectedChecks = selected.map((item) => item.check);
  const selectedSet = new Set(selectedChecks);
  const providedResults = [...results.values()];
  const passedResults = providedResults.filter((item) => item.status === "passed");
  const blockerResults = providedResults.filter((item) => item.status === "blocker");
  const skippedResults = providedResults.filter((item) => item.status === "skipped");
  const highJudgmentChecks = selectedChecks.filter((check) => COUNCIL_HIGH_JUDGMENT_CHECKS.has(check));
  const reasons = new Set<string>();

  if (input.require_council === true || input.requireCouncil === true || input.force_council === true || input.forceCouncil === true) reasons.add("Council explicitly requested for this target.");
  if (hasAny(allText, COUNCIL_TRIGGER_TERMS)) reasons.add("Target language asks for judgement, debate, launch readiness, or a decision.");
  if (files.some((path) => path.includes("/crews/") || path.includes("crews") || path.includes("council"))) reasons.add("Crews or Council surface changed; dogfood Crews with its own Council judgement.");
  if (selectedChecks.length >= 4) reasons.add(`Broad XPass surface selected ${selectedChecks.length} checks; use a Council to interpret the combined evidence.`);
  if (highJudgmentChecks.length >= 2) reasons.add(`High-judgement checks overlap: ${highJudgmentChecks.map((check) => CHECK_LABELS[check]).join(", ")}.`);
  if ((selectedSet.has("legalpass") || selectedSet.has("securitypass")) && (selectedSet.has("copypass") || selectedSet.has("uxpass") || selectedSet.has("seopass")) && hasAny(allText, ["public", "publish", "release", "launch", "pricing", "homepage", "landing", "claims", "enterprise", "compliance"])) {
    reasons.add("Public, commercial, legal, or security evidence needs a named final judgement before release.");
  }
  if (blockerResults.length > 0 && passedResults.length > 0) reasons.add("Pass evidence is mixed; a Council should decide what the blockers mean before owners treat the target as ready.");
  if (skippedResults.length > 0 && selectedChecks.length >= 3) reasons.add("Some checks were skipped on a multi-pass target; use a Council to record accepted exclusions.");

  const triggerScore = Math.min(100, (reasons.size * 22) + Math.min(30, selectedChecks.length * 5));
  const needed = reasons.size > 0;
  const liteNeeded = Boolean(files.length || text || selectedChecks.length || providedResults.length);

  return {
    needed,
    status: needed ? (triggerScore >= 55 ? "recommended" : "consider") : "not_needed",
    trigger_score: triggerScore,
    suggested_template: needed ? "Council" : null,
    suggested_tool: needed ? "start_crew_run" : null,
    reasons: [...reasons],
    note: needed ? "Crews should interpret the evidence; XPass still owns the checks and receipts." : "XPass can handle this without a Crews Council.",
    lite_check: {
      needed: liteNeeded,
      status: liteNeeded ? "baseline" : "not_needed",
      suggested_template: liteNeeded ? "Council Lite" : null,
      mode: "anti_rubber_stamp",
      questions: liteNeeded ? COUNCIL_LITE_QUESTIONS : [],
      note: liteNeeded
        ? "Use this tiny dissent check before treating the answer as ready; escalate to full Council only when the recommendation says consider or recommended."
        : "No meaningful target was supplied for a light Crews check.",
    },
  };
}

function resultReason(
  result: string,
  selectedCount: number,
  blockers: NormalizedPassResult[],
  stale: NormalizedPassResult[],
  unscoped: NormalizedPassResult[],
) {
  if (selectedCount === 0) return "no_relevant_xpass_product_checks";
  if (result === "passed") return "xpass_receipt_green";
  if (result === "xpass_needed") return "missing_relevant_pass_results";
  if (blockers.length) return "pass_result_blocker";
  if (stale.length) return "stale_pass_result";
  if (unscoped.length) return "unscoped_pass_result";
  return "xpass_not_ready";
}

function normalizePassResult(value: unknown): NormalizedPassResult {
  const result = asRecord(value);
  const check = normalizeCheckName(result.check ?? result.name ?? result.id ?? result.pass);
  const status = normalize(result.status ?? result.result ?? result.verdict);
  let normalized: NormalizedStatus = "missing";
  if (PASS_STATUS.has(status)) normalized = "passed";
  if (BLOCKER_STATUS.has(status)) normalized = "blocker";
  if (SKIP_STATUS.has(status)) normalized = "skipped";

  return {
    check,
    name: CHECK_LABELS[check as XPassCheck] || compactText(result.name ?? check, 80),
    status: normalized,
    raw_status: status || null,
    run_id: compactText(result.run_id ?? result.runId ?? result.receipt_id ?? result.receiptId, 160),
    url: compactText(result.url ?? result.target_url ?? result.targetUrl ?? result.details_url ?? result.detailsUrl, 500),
    summary: compactText(result.summary ?? result.message, 500),
    generated_at: readString(result.generated_at ?? result.generatedAt) || null,
    target_sha: compactText(result.target_sha ?? result.targetSha ?? result.head_sha ?? result.headSha, 80),
  };
}

function resultMap(value: unknown): Map<string, NormalizedPassResult> {
  if (Array.isArray(value)) {
    return new Map(value.map((item) => {
      const normalized = normalizePassResult(item);
      return [normalized.check, normalized] as const;
    }));
  }
  if (value && typeof value === "object") {
    return new Map(Object.entries(value as Record<string, unknown>).map(([check, item]) => {
      const normalized = normalizePassResult({ check, ...asRecord(item) });
      return [normalized.check, normalized] as const;
    }));
  }
  return new Map();
}

function target(input: Record<string, unknown>): InspectedTarget {
  const value = asRecord(input.target);
  return {
    type: compactText(value.type ?? value.kind ?? input.target_type ?? input.targetType ?? "change", 80),
    id: compactText(value.id ?? value.pr_number ?? value.prNumber ?? input.pr_number ?? input.prNumber ?? input.id, 160),
    sha: compactText(value.sha ?? value.head_sha ?? value.headSha ?? input.sha ?? input.head_sha ?? input.headSha, 80),
    url: compactText(value.url ?? input.url, 500),
    ref: compactText(value.ref ?? input.ref, 500),
  };
}

function isStaleForTarget(result: NormalizedPassResult, inspectedTarget: InspectedTarget): boolean {
  return Boolean(result.target_sha && inspectedTarget.sha && result.target_sha !== inspectedTarget.sha);
}

function isUnscopedForTarget(result: NormalizedPassResult, inspectedTarget: InspectedTarget): boolean {
  return Boolean(inspectedTarget.sha && !result.target_sha);
}

function targetText(input: Record<string, unknown>): string {
  const value = asRecord(input.target);
  return [
    input.title,
    input.description,
    input.context,
    input.body,
    input.summary,
    value.title,
    value.description,
    ...safeList(input.tags),
  ].map((item) => String(item ?? "")).join(" ").toLowerCase();
}

function changedFiles(input: Record<string, unknown>): string[] {
  const value = asRecord(input.target);
  return uniq([
    ...safeList(input.changed_files),
    ...safeList(input.changedFiles),
    ...safeList(input.files),
    ...safeList(input.owned_files),
    ...safeList(input.ownedFiles),
    ...safeList(value.changed_files),
    ...safeList(value.files),
  ].map(normalizePath));
}

function passProductForPath(path: string): XPassCheck | "" {
  const packageMatch = path.match(/^packages\/([^/]*pass)(?:\/|$)/);
  if (packageMatch && PASS_PRODUCT_CHECKS.has(packageMatch[1] ?? "")) return PASS_PRODUCT_CHECKS.get(packageMatch[1] ?? "") ?? "";

  const docMatch = path.match(/^docs\/([^/]*pass)(?:[-_.].*)?\.(?:md|mdx|txt|json)$/);
  if (docMatch && PASS_PRODUCT_CHECKS.has(docMatch[1] ?? "")) return PASS_PRODUCT_CHECKS.get(docMatch[1] ?? "") ?? "";

  const apiMatch = path.match(/^api\/([^/]*pass)(?:[-_.].*)?\.(?:mjs|js|cjs|ts|tsx|jsx|json)$/);
  if (apiMatch && PASS_PRODUCT_CHECKS.has(apiMatch[1] ?? "")) return PASS_PRODUCT_CHECKS.get(apiMatch[1] ?? "") ?? "";

  return "";
}

function enterpriseReadinessSurface(path: string, allText: string): boolean {
  return path.includes("enterprise") || path.includes("compliance") || path.startsWith("public/enterprise/") || hasAny(allText, ENTERPRISE_READINESS_TERMS);
}

function normalizeCheckName(value: unknown): string {
  const key = normalize(value).replace(/[\s_-]+/g, "");
  if (key === "qualitypass" || key === "quality") return "sloppass";
  if (key === "enterprisepass" || key === "enterprise" || key === "compliance") return "compliancepass";
  return CHECK_ORDER.find((check) => check === key || CHECK_LABELS[check].toLowerCase() === key) || key;
}

function readKnownCheckList(value: unknown): XPassCheck[] {
  return uniq(safeList(value).map(normalizeCheckName).filter(isKnownCheck));
}

function isKnownCheck(value: string): value is XPassCheck {
  return (CHECK_ORDER as readonly string[]).includes(value);
}

function safeList(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function normalize(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

function compactText(value: unknown, max = 500): string {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function normalizePath(value: unknown): string {
  return String(value ?? "").replace(/\\/g, "/").replace(/^\/+/, "").trim().toLowerCase();
}

function uniq<T>(values: T[]): T[] {
  return [...new Set(values.filter(Boolean))];
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => new RegExp(`\\b${escapeRegex(term)}\\b`, "i").test(text));
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function exactCopyRequest(text: string): boolean {
  return /(\b1:1\b|\b1 for 1\b|\bone-to-one\b|\bone for one\b|\bexact copy\b|\bcopy exactly\b|\bcopy this without changing\b|\bexactly as source\b|\bverbatim\b|\bword-for-word\b|\bbyte-level\b|\btranscribe\b|\bmirror\b|\bpreserve exactly\b)/i.test(text);
}

function codeFile(path: string): boolean {
  return /\.(mjs|js|cjs|ts|tsx|jsx|json|yaml|yml|css|scss|html)$/.test(path);
}

function testFile(path: string): boolean {
  return /(^|\/)(__tests__|tests?)\//.test(path) || /\.(test|spec)\.(mjs|js|ts|tsx|jsx)$/.test(path);
}

function addReason(map: Map<XPassCheck, Set<string>>, check: XPassCheck, reason: string): void {
  if (!map.has(check)) map.set(check, new Set());
  map.get(check)?.add(reason);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function receiptId(value: Record<string, unknown>): string {
  const hash = createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
  return `xpass_${hash}`;
}

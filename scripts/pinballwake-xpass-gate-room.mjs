#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const CHECK_ORDER = [
  "testpass",
  "uxpass",
  "securitypass",
  "commonsensepass",
  "flowpass",
  "geopass",
  "rotatepass",
  "copypass",
  "seopass",
  "legalpass",
  "sloppass",
  "wakepass",
];

const CHECK_LABELS = {
  testpass: "TestPass",
  uxpass: "UXPass",
  securitypass: "SecurityPass",
  commonsensepass: "CommonSensePass",
  flowpass: "FlowPass",
  geopass: "GEOPass",
  rotatepass: "RotatePass",
  copypass: "CopyPass",
  seopass: "SEOPass",
  legalpass: "LegalPass",
  sloppass: "SlopPass",
  wakepass: "WakePass",
};

const PASS_PRODUCT_CHECKS = new Map([
  ["commonsensepass", "commonsensepass"],
  ["copypass", "copypass"],
  ["flowpass", "flowpass"],
  ["geopass", "geopass"],
  ["legalpass", "legalpass"],
  ["securitypass", "securitypass"],
  ["seopass", "seopass"],
  ["sloppass", "sloppass"],
  ["testpass", "testpass"],
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

const PASS_STATUS = new Set(["pass", "passed", "success", "green", "ok"]);
const BLOCKER_STATUS = new Set(["fail", "failed", "failure", "blocker", "blocked", "red"]);
const SKIP_STATUS = new Set(["skip", "skipped", "not_applicable", "not-applicable"]);

function getArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

function compactText(value, max = 500) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function normalizePath(value) {
  return String(value ?? "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .trim()
    .toLowerCase();
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function hasAny(text, terms) {
  return terms.some((term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text));
}

function codeFile(path) {
  return /\.(mjs|js|cjs|ts|tsx|jsx|json|yaml|yml|css|scss|html)$/.test(path);
}

function testFile(path) {
  return /(^|\/)(__tests__|tests?)\//.test(path) || /\.(test|spec)\.(mjs|js|ts|tsx|jsx)$/.test(path);
}

function passProductForPath(path) {
  const packageMatch = path.match(/^packages\/([^/]*pass)(?:\/|$)/);
  if (packageMatch && PASS_PRODUCT_CHECKS.has(packageMatch[1])) return packageMatch[1];

  const docMatch = path.match(/^docs\/([^/]*pass)(?:[-_.].*)?\.(?:md|mdx|txt|json)$/);
  if (docMatch && PASS_PRODUCT_CHECKS.has(docMatch[1])) return docMatch[1];

  const apiMatch = path.match(/^api\/([^/]*pass)(?:[-_.].*)?\.(?:mjs|js|cjs|ts|tsx|jsx|json)$/);
  if (apiMatch && PASS_PRODUCT_CHECKS.has(apiMatch[1])) return apiMatch[1];

  return "";
}

function enterpriseReadinessSurface(path, allText) {
  return (
    path.includes("enterprise") ||
    path.includes("compliance") ||
    path.startsWith("public/enterprise/") ||
    hasAny(allText, ENTERPRISE_READINESS_TERMS)
  );
}

function targetText(input = {}) {
  return [
    input.title,
    input.description,
    input.context,
    input.body,
    input.summary,
    input.target?.title,
    input.target?.description,
    ...safeList(input.tags),
  ]
    .join(" ")
    .toLowerCase();
}

function changedFiles(input = {}) {
  return uniq([
    ...safeList(input.changed_files),
    ...safeList(input.changedFiles),
    ...safeList(input.files),
    ...safeList(input.owned_files),
    ...safeList(input.ownedFiles),
    ...safeList(input.target?.changed_files),
    ...safeList(input.target?.files),
  ].map(normalizePath));
}

function addReason(map, check, reason) {
  if (!map.has(check)) map.set(check, new Set());
  map.get(check).add(reason);
}

export function selectXPassChecks(input = {}) {
  const files = changedFiles(input);
  const text = targetText(input);
  const reasons = new Map();
  const allText = `${text} ${files.join(" ")}`;

  for (const path of files) {
    const pathWords = path.replace(/[\/_.-]+/g, " ");
    const passProduct = passProductForPath(path);

    if (passProduct) {
      const productCheck = PASS_PRODUCT_CHECKS.get(passProduct);
      addReason(reasons, "testpass", `XPass product implementation needs proof tests: ${path}`);
      addReason(reasons, productCheck, `XPass product should dogfood its own specialist check: ${path}`);
      if (codeFile(path) && !testFile(path)) {
        addReason(reasons, "sloppass", `XPass product implementation needs code-quality dogfood: ${path}`);
      }
    }

    if (enterpriseReadinessSurface(path, allText)) {
      addReason(reasons, "testpass", `enterprise-readiness evidence needs runnable proof: ${path}`);
      addReason(reasons, "securitypass", `enterprise-readiness evidence covers security and credential hygiene: ${path}`);
      addReason(reasons, "commonsensepass", `enterprise-readiness evidence must avoid false compliance claims: ${path}`);
      addReason(reasons, "copypass", `enterprise-readiness wording surface: ${path}`);
      addReason(reasons, "legalpass", `compliance/readiness positioning surface: ${path}`);
      if (codeFile(path) && !testFile(path)) {
        addReason(reasons, "sloppass", `enterprise-readiness implementation quality surface: ${path}`);
      }
    }

    if (path.includes("xpass") || path.includes("qcpass")) {
      addReason(reasons, "testpass", `multi-pass gate needs runnable proof: ${path}`);
      addReason(reasons, "commonsensepass", `multi-pass gate must avoid false green receipts: ${path}`);
    }

    if (
      path.startsWith("packages/mcp-server/") ||
      path.includes("/mcp") ||
      path.endsWith("mcp.json") ||
      path.includes("/tools/") ||
      path.includes("connector") ||
      path.includes("native-endpoints") ||
      path.includes("testpass") ||
      path.includes("uxpass") ||
      path.includes("flowpass")
    ) {
      addReason(reasons, "testpass", `tool or MCP surface: ${path}`);
    }

    if (
      path.startsWith("src/pages/") ||
      path.startsWith("src/components/") ||
      path.startsWith("src/layout") ||
      path.startsWith("src/App".toLowerCase()) ||
      /\.(tsx|jsx|css|scss|html)$/.test(path) ||
      path === "index.html"
    ) {
      addReason(reasons, "uxpass", `user interface surface: ${path}`);
    }

    if (
      path.startsWith("public/") ||
      path === "index.html" ||
      path.includes("landing") ||
      path.includes("homepage") ||
      path.includes("geopass") ||
      path.includes("llms.txt") ||
      path.includes("schema.org") ||
      hasAny(pathWords, ["seo", "meta", "sitemap", "robots"])
    ) {
      addReason(reasons, "seopass", `public/SEO surface: ${path}`);
    }

    if (
      path.includes("geopass") ||
      path.includes("llms.txt") ||
      path.includes("schema.org") ||
      hasAny(pathWords, ["geo", "ai", "answer", "engine", "gptbot", "claudebot", "perplexitybot", "wikidata"])
    ) {
      addReason(reasons, "geopass", `AI answer-engine readiness surface: ${path}`);
    }

    if (
      path.includes("flowpass") ||
      hasAny(pathWords, ["flow", "journey", "onboarding", "checkout", "handoff", "route", "cta", "form", "success", "failure"])
    ) {
      addReason(reasons, "flowpass", `product journey surface: ${path}`);
    }

    if (
      /\.(md|mdx|txt)$/.test(path) ||
      path.includes("copy") ||
      path.includes("homepage") ||
      path.includes("landing") ||
      path.includes("pricing") ||
      path.includes("docs/")
    ) {
      addReason(reasons, "copypass", `copy or docs surface: ${path}`);
    }

    if (
      path.includes("legal") ||
      path.includes("terms") ||
      path.includes("privacy") ||
      path.includes("license") ||
      path.includes("billing") ||
      path.includes("pricing") ||
      path.includes("subprocessor") ||
      path.includes("dpa")
    ) {
      addReason(reasons, "legalpass", `legal or commercial surface: ${path}`);
    }

    if (
      path.includes("auth") ||
      path.includes("oauth") ||
      path.includes("session") ||
      path.includes("password") ||
      path.includes("passkey") ||
      path.includes("keychain") ||
      path.includes("credential") ||
      path.includes("credentials") ||
      path.includes("token") ||
      path.includes("secret") ||
      path.includes("security") ||
      path.includes("redaction") ||
      path.includes("sanitize") ||
      path.includes("csrf") ||
      path.includes("csp") ||
      path.includes("rls") ||
      path.includes("supabase/migrations")
    ) {
      addReason(reasons, "securitypass", `security-sensitive surface: ${path}`);
    }

    if (
      path.includes("rotatepass") ||
      path.includes("credential") ||
      path.includes("credentials") ||
      path.includes("keychain") ||
      path.includes("revocation") ||
      path.includes("local-session") ||
      path.includes("browser-profile") ||
      path.includes("password")
    ) {
      addReason(reasons, "rotatepass", `credential lifecycle surface: ${path}`);
    }

    if (
      path.includes("commonsensepass") ||
      path.includes("orchestrator") ||
      path.includes("heartbeat") ||
      path.includes("runner") ||
      path.includes("claim") ||
      path.includes("proof") ||
      path.includes("queue") ||
      path.includes("done") ||
      path.includes("merge-ready")
    ) {
      addReason(reasons, "commonsensepass", `worker claim/proof surface: ${path}`);
    }

    if (
      path.includes("wakepass") ||
      path.includes("heartbeat") ||
      path.includes("scheduled") ||
      path.includes("cron") ||
      path.includes("stale") ||
      path.includes("dispatch") ||
      hasAny(pathWords, ["ack"])
    ) {
      addReason(reasons, "wakepass", `wake or dispatch surface: ${path}`);
    }

    if (codeFile(path) && !testFile(path)) {
      addReason(reasons, "sloppass", `code quality surface: ${path}`);
    }
  }

  if (hasAny(allText, ["mcp", "tool", "tools", "connector", "connectors", "api endpoint", "native endpoint"])) {
    addReason(reasons, "testpass", "target text mentions tools/connectors/MCP");
  }
  if (hasAny(allText, ["ui", "ux", "visual", "screen", "screenshots", "navigation", "dashboard", "admin", "accessibility", "wcag", "keyboard", "screen reader", "focus", "target size"])) {
    addReason(reasons, "uxpass", "target text mentions UI/UX/visual changes");
  }
  if (hasAny(allText, ["security", "auth", "oauth", "credential", "credentials", "token", "tokens", "secret", "secrets", "key", "keys", "password", "redaction", "prompt injection", "insecure output", "llm", "model output", "sandbox"])) {
    addReason(reasons, "securitypass", "target text mentions security/auth/keys");
  }
  if (hasAny(allText, ["common sense", "commonsense", "false done", "no work", "healthy", "merge ready", "claim", "claims", "proof", "receipt", "queue", "orchestrator", "heartbeat"])) {
    addReason(reasons, "commonsensepass", "target text mentions worker claims or proof sanity");
  }
  if (hasAny(allText, ["flow", "journey", "onboarding", "checkout", "signup", "handoff", "end to end", "e2e", "cta", "form", "success state", "failure state"])) {
    addReason(reasons, "flowpass", "target text mentions product journey or end-to-end flow");
  }
  if (hasAny(allText, ["geo", "generative engine", "answer engine", "ai overview", "ai mode", "gptbot", "claudebot", "perplexity", "llms.txt", "wikidata", "schema.org"])) {
    addReason(reasons, "geopass", "target text mentions AI answer-engine readiness");
  }
  if (hasAny(allText, ["rotate", "rotation", "revocation", "credential", "credentials", "keychain", "local session", "browser profile", "password"])) {
    addReason(reasons, "rotatepass", "target text mentions credential lifecycle");
  }
  if (hasAny(allText, ["wake", "wakepass", "ack", "missed ack", "stale", "heartbeat", "cron", "schedule", "scheduled", "dispatch"])) {
    addReason(reasons, "wakepass", "target text mentions wakes, stale work, or schedules");
  }
  if (hasAny(allText, ["copy", "wording", "homepage", "landing", "docs", "faq", "marketing", "public claim", "public claims"])) {
    addReason(reasons, "copypass", "target text mentions copy/docs/claims");
  }
  if (hasAny(allText, ["seo", "search", "meta", "sitemap", "robots"])) {
    addReason(reasons, "seopass", "target text mentions SEO");
  }
  if (hasAny(allText, ["legal", "privacy", "terms", "license", "pricing", "billing", "invoice", "subprocessor", "compliance"])) {
    addReason(reasons, "legalpass", "target text mentions legal/commercial risk");
  }
  if (hasAny(allText, ["quality", "slop", "refactor", "code smell", "bug", "bugfix"])) {
    addReason(reasons, "sloppass", "target text mentions quality or code risk");
  }

  return CHECK_ORDER
    .filter((check) => reasons.has(check))
    .map((check) => ({
      check,
      name: CHECK_LABELS[check],
      reasons: [...reasons.get(check)],
    }));
}

function normalizeCheckName(value) {
  const key = normalize(value).replace(/[\s_-]+/g, "");
  if (key === "qualitypass") return "sloppass";
  if (key === "quality") return "sloppass";
  return CHECK_ORDER.find((check) => check === key || CHECK_LABELS[check].toLowerCase() === key) || key;
}

function normalizePassResult(result = {}) {
  const check = normalizeCheckName(result.check || result.name || result.id || result.pass);
  const status = normalize(result.status || result.result || result.verdict || "");
  let normalized = "missing";
  if (PASS_STATUS.has(status)) normalized = "passed";
  if (BLOCKER_STATUS.has(status)) normalized = "blocker";
  if (SKIP_STATUS.has(status)) normalized = "skipped";

  return {
    check,
    name: CHECK_LABELS[check] || compactText(result.name || check, 80),
    status: normalized,
    raw_status: status || null,
    run_id: compactText(result.run_id || result.runId || result.receipt_id || result.receiptId || "", 160),
    url: compactText(result.url || result.target_url || result.targetUrl || result.details_url || result.detailsUrl || "", 500),
    summary: compactText(result.summary || result.message || "", 500),
    generated_at: result.generated_at || result.generatedAt || null,
    target_sha: compactText(result.target_sha || result.targetSha || result.head_sha || result.headSha || "", 80),
  };
}

function resultMap(passResults = []) {
  if (Array.isArray(passResults)) {
    return new Map(passResults.map((result) => {
      const normalized = normalizePassResult(result);
      return [normalized.check, normalized];
    }));
  }
  if (passResults && typeof passResults === "object") {
    return new Map(Object.entries(passResults).map(([check, result]) => {
      const normalized = normalizePassResult({ check, ...(result || {}) });
      return [normalized.check, normalized];
    }));
  }
  return new Map();
}

function target(input = {}) {
  const value = input.target || {};
  return {
    type: compactText(value.type || input.target_type || input.targetType || "change", 80),
    id: compactText(value.id || value.pr_number || value.prNumber || input.pr_number || input.prNumber || input.id || "", 160),
    sha: compactText(value.sha || value.head_sha || value.headSha || input.sha || input.head_sha || input.headSha || "", 80),
    url: compactText(value.url || input.url || "", 500),
  };
}

function isStaleForTarget(result, inspectedTarget) {
  return Boolean(result?.target_sha && inspectedTarget?.sha && result.target_sha !== inspectedTarget.sha);
}

function isUnscopedForTarget(result, inspectedTarget) {
  return Boolean(result && inspectedTarget?.sha && !result.target_sha);
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
  now,
}) {
  return {
    kind: "xpass_receipt",
    generated_at: now,
    target: inspectedTarget,
    checks_selected: selected.map((check) => ({
      check: check.check,
      name: check.name,
      reasons: check.reasons,
    })),
    checks_skipped: skipped,
    evidence: provided.map((result) => ({
      check: result.check,
      name: result.name,
      status: result.status,
      run_id: result.run_id || null,
      url: result.url || null,
      summary: result.summary || null,
      target_sha: result.target_sha || null,
    })),
    action_needed: [
      ...missing.map((check) => `Run ${CHECK_LABELS[check] || check}.`),
      ...blockers.map((result) => `${result.name} returned ${result.status}.`),
      ...stale.map((result) => `${result.name} receipt is stale for this target.`),
      ...unscoped.map((result) => `${result.name} receipt is missing target scope for this target.`),
    ],
    staleness: {
      stale_checks: stale.map((result) => result.check),
      unscoped_checks: unscoped.map((result) => result.check),
      target_sha: inspectedTarget.sha || null,
    },
  };
}

export function evaluateXPassGate(input = {}) {
  const mode = normalize(input.mode || "advisory");
  const enforce = mode === "enforce" || input.enforce === true;
  const now = input.now || new Date().toISOString();
  const inspectedTarget = target(input);
  const selected = selectXPassChecks(input);
  const selectedChecks = selected.map((check) => check.check);
  const available = new Set(safeList(input.available_checks || input.availableChecks).map(normalizeCheckName));
  const hasAvailability = available.size > 0;
  const results = resultMap(input.pass_results || input.passResults || input.results);

  const skipped = [];
  const missing = [];
  const provided = [];
  const blockers = [];
  const stale = [];
  const unscoped = [];

  for (const selectedCheck of selectedChecks) {
    if (hasAvailability && !available.has(selectedCheck)) {
      skipped.push({
        check: selectedCheck,
        name: CHECK_LABELS[selectedCheck],
        reason: "pass_not_available",
      });
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
      skipped.push({
        check: selectedCheck,
        name: CHECK_LABELS[selectedCheck],
        reason: result.summary || "pass_result_skipped",
      });
    }
  }

  const receipt = makeReceipt({
    inspectedTarget,
    selected,
    provided,
    missing: uniq(missing),
    blockers,
    stale,
    unscoped,
    skipped,
    now,
  });

  const hardIssues = blockers.length + stale.length + unscoped.length;
  const missingCount = uniq(missing).length;
  const issueCount = hardIssues + missingCount;
  const ok = enforce ? issueCount === 0 : hardIssues === 0;
  const result = selected.length === 0
    ? "no_relevant_checks"
    : issueCount === 0
      ? "passed"
      : hardIssues > 0
        ? "blocker"
        : "xpass_needed";

  return {
    ok,
    action: "xpass_gate_room",
    mode: enforce ? "enforce" : "advisory",
    result,
    reason: selected.length === 0
      ? "no_relevant_pass_family_checks"
      : result === "passed"
        ? "xpass_receipt_green"
        : result === "xpass_needed"
          ? "missing_relevant_pass_results"
          : blockers.length
            ? "pass_result_blocker"
            : stale.length
              ? "stale_pass_result"
              : "unscoped_pass_result",
    target: inspectedTarget,
    selected_checks: selected,
    missing_checks: uniq(missing),
    blocked_checks: blockers.map((result) => result.check),
    stale_checks: stale.map((result) => result.check),
    unscoped_checks: unscoped.map((result) => result.check),
    skipped_checks: skipped,
    receipt,
  };
}

export async function readXPassGateInput(filePath) {
  if (!filePath) return { ok: false, reason: "missing_input_path" };
  return JSON.parse(await readFile(filePath, "utf8"));
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  readXPassGateInput(getArg("input", process.env.PINBALLWAKE_XPASS_GATE_INPUT || ""))
    .then((input) => evaluateXPassGate(input))
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.ok ? 0 : 1;
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

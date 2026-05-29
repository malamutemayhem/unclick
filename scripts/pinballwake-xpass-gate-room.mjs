#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const CHECK_ORDER = [
  "testpass",
  "uxpass",
  "securitypass",
  "copypass",
  "fidelitypass",
  "seopass",
  "legalpass",
  "commonsensepass",
  "sloppass",
  "compliancepass",
];

const CHECK_LABELS = {
  testpass: "TestPass",
  uxpass: "UXPass",
  securitypass: "SecurityPass",
  copypass: "CopyPass",
  fidelitypass: "FidelityPass",
  seopass: "SEOPass",
  legalpass: "LegalPass",
  commonsensepass: "CommonSensePass",
  sloppass: "SlopPass",
  compliancepass: "CompliancePass",
};

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

function exactCopyRequest(text) {
  return /(\b1:1\b|\bone-to-one\b|\bexact copy\b|\bcopy exactly\b|\bcopy this without changing\b|\bverbatim\b|\bword-for-word\b|\bbyte-level\b|\btranscribe\b|\bmirror\b|\bpreserve exactly\b)/i.test(text);
}

function codeFile(path) {
  return /\.(mjs|js|cjs|ts|tsx|jsx|json|yaml|yml|css|scss|html)$/.test(path);
}

function testFile(path) {
  return /(^|\/)(__tests__|tests?)\//.test(path) || /\.(test|spec)\.(mjs|js|ts|tsx|jsx)$/.test(path);
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
  const needsExactCopyProof = exactCopyRequest(allText);

  for (const path of files) {
    const pathWords = path.replace(/[\/_.-]+/g, " ");

    if (
      path.startsWith("packages/mcp-server/") ||
      path.includes("/mcp") ||
      path.endsWith("mcp.json") ||
      path.includes("/tools/") ||
      path.includes("connector") ||
      path.includes("native-endpoints") ||
      path.includes("testpass") ||
      path.includes("uxpass")
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
      hasAny(pathWords, ["seo", "meta", "sitemap", "robots"])
    ) {
      addReason(reasons, "seopass", `public/SEO surface: ${path}`);
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

    if (codeFile(path) && !testFile(path)) {
      addReason(reasons, "sloppass", `code quality surface: ${path}`);
    }
  }

  if (hasAny(allText, ["mcp", "tool", "tools", "connector", "connectors", "api endpoint", "native endpoint"])) {
    addReason(reasons, "testpass", "target text mentions tools/connectors/MCP");
  }
  if (hasAny(allText, ["ui", "ux", "visual", "screen", "screenshots", "navigation", "dashboard", "admin"])) {
    addReason(reasons, "uxpass", "target text mentions UI/UX/visual changes");
  }
  if (hasAny(allText, ["security", "auth", "oauth", "credential", "credentials", "token", "tokens", "secret", "secrets", "key", "keys", "password", "redaction"])) {
    addReason(reasons, "securitypass", "target text mentions security/auth/keys");
  }
  if (hasAny(allText, ["copy", "wording", "homepage", "landing", "docs", "faq", "marketing", "public claim", "public claims"]) && !needsExactCopyProof) {
    addReason(reasons, "copypass", "target text mentions copy/docs/claims");
  }
  if (needsExactCopyProof) {
    addReason(reasons, "fidelitypass", "target text asks for exact 1:1 copy proof");
  }
  if (hasAny(allText, ["seo", "search", "meta", "sitemap", "robots"])) {
    addReason(reasons, "seopass", "target text mentions SEO");
  }
  if (hasAny(allText, ["legal", "privacy", "terms", "license", "pricing", "billing", "invoice", "subprocessor", "compliance"])) {
    addReason(reasons, "legalpass", "target text mentions legal/commercial risk");
  }
  if (hasAny(allText, ["compliance", "enterprise", "audit", "auditor", "procurement", "soc", "iso", "policy", "readiness"])) {
    addReason(reasons, "compliancepass", "target text mentions compliance or enterprise readiness");
  }
  if (hasAny(allText, ["healthy", "quiet", "pass claim", "no work", "no-work", "done", "merge-ready", "merge ready", "duplicate wake", "duplicate-wake"])) {
    addReason(reasons, "commonsensepass", "target text mentions a trusted status claim");
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
  if (key === "enterprisepass") return "compliancepass";
  if (key === "enterprise") return "compliancepass";
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
  const selectedByCheck = new Map(selected.map((check) => [check.check, check]));
  const providedByCheck = new Map(provided.map((result) => [result.check, result]));
  const missingSet = new Set(missing);
  const blockerSet = new Set(blockers.map((result) => result.check));
  const skippedByCheck = new Map(skipped.map((item) => [item.check, item]));
  const improvementSignals = [
    ...missing.map((check) => ({
      check,
      name: CHECK_LABELS[check] || check,
      signal: "selected_check_missing_receipt",
      action: "Add or rerun the receipt, then decide whether the pass needs a stronger runner or worker reminder.",
    })),
    ...blockers.map((result) => ({
      check: result.check,
      name: result.name,
      signal: "pass_returned_blocker",
      action: "Fix the target or improve the pass rule if this blocker is noisy.",
    })),
    ...stale.map((result) => ({
      check: result.check,
      name: result.name,
      signal: "stale_receipt",
      action: "Tighten receipt freshness or rerun behavior for this pass.",
    })),
    ...unscoped.map((result) => ({
      check: result.check,
      name: result.name,
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
  const fullChecklist = CHECK_ORDER.map((check) => {
    const selectedCheck = selectedByCheck.get(check);
    if (!selectedCheck) {
      return {
        check,
        name: CHECK_LABELS[check],
        status: "not_applicable",
        reason: "not_selected_for_target",
      };
    }

    const skippedCheck = skippedByCheck.get(check);
    if (skippedCheck) {
      return {
        check,
        name: CHECK_LABELS[check],
        status: "not_run",
        reason: skippedCheck.reason,
      };
    }

    const result = providedByCheck.get(check);
    if (blockerSet.has(check)) {
      return {
        check,
        name: CHECK_LABELS[check],
        status: "blocker",
        reason: result?.summary || "pass_result_blocker",
      };
    }
    if (result?.status === "passed") {
      return {
        check,
        name: CHECK_LABELS[check],
        status: "pass",
        reason: "receipt_green",
      };
    }
    if (result?.status === "skipped") {
      return {
        check,
        name: CHECK_LABELS[check],
        status: "not_applicable",
        reason: result.summary || "pass_result_skipped",
      };
    }
    if (missingSet.has(check)) {
      return {
        check,
        name: CHECK_LABELS[check],
        status: "missing",
        reason: "selected_but_no_receipt",
      };
    }
    return {
      check,
      name: CHECK_LABELS[check],
      status: "not_run",
      reason: "selected_without_receipt",
    };
  });

  return {
    kind: "xpass_receipt",
    generated_at: now,
    target: inspectedTarget,
    full_checklist: fullChecklist,
    checks_selected: selected.map((check) => ({
      check: check.check,
      name: check.name,
      reasons: check.reasons,
    })),
    checks_skipped: skipped,
    improvement_signals: improvementSignals,
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

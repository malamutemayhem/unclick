export const TESTPASS_PR_COMMENT_MARKER = "<!-- unclick:testpass-pr-check -->";

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function count(summary, key) {
  return Math.max(0, Math.trunc(numberValue(summary?.[key])));
}

function pct(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function cell(label, value) {
  return `| ${label} | ${value ?? 0} |`;
}

function safeText(value, fallback = "") {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text || fallback;
}

export function buildTestPassPrCommentBody(input = {}) {
  const status = safeText(input.status, "unknown");
  const runId = safeText(input.runId, "(unknown)");
  const failureKind = safeText(input.failureKind, "unknown");
  const httpCode = safeText(input.httpCode, "000");
  const summary = input.summary && typeof input.summary === "object" ? input.summary : {};
  const failCount = Math.max(0, Math.trunc(numberValue(input.failCount ?? summary.fail)));
  const total = Math.max(0, Math.trunc(numberValue(input.total ?? summary.total)));
  const checked = count(summary, "check");
  const failed = count(summary, "fail");
  const other = count(summary, "other");
  const na = count(summary, "na");
  const pending = count(summary, "pending");
  const decided = checked + failed + other;
  const checkedPassRate = decided > 0 ? checked / decided : 0;

  if (failureKind.startsWith("infra_")) {
    const authReason = safeText(input.authReason);
    const howToFix = safeText(input.howToFix);
    const headlines = {
      infra_auth: ":warning: TestPass: infra issue (auth)",
      infra_vercel_auth: ":warning: TestPass: infra issue (Vercel preview auth)",
      infra_vercel_pending: ":warning: TestPass: Vercel preview still building",
      infra_http: ":warning: TestPass: infra issue (API error)",
      infra_transport: ":warning: TestPass: infra issue (transport)",
    };
    const authReasonSuffix = authReason ? ` (${authReason})` : "";
    const explanations = {
      infra_vercel_auth:
        `The Vercel preview blocked the automation request${authReasonSuffix} ` +
        `(HTTP ${httpCode}). ` +
        (howToFix ||
          "Confirm `VERCEL_AUTOMATION_BYPASS_SECRET` is available to GitHub Actions and matches the Vercel Protection Bypass for Automation secret, then re-run the workflow."),
      infra_vercel_pending:
        "The Vercel preview was not ready before TestPass reached its wait limit. " +
        (howToFix ||
          "Wait for the Vercel preview deployment to finish, then re-run the workflow."),
      infra_auth:
        `The TestPass API rejected the provided bearer token${authReasonSuffix} ` +
        `(HTTP ${httpCode}). ` +
        (howToFix ||
          "Use a valid Supabase JWT or uc_ UnClick API key in `TESTPASS_TOKEN`, then re-run the workflow."),
      infra_http:
        `The TestPass API returned HTTP ${httpCode}. This is a service-side issue, not a problem with this PR. Re-run the workflow in a few minutes.`,
      infra_transport:
        "Could not reach the TestPass API (DNS, connection, or timeout). This is not a problem with this PR. Re-run the workflow.",
    };

    return [
      TESTPASS_PR_COMMENT_MARKER,
      `### ${headlines[failureKind] || ":warning: TestPass: infra issue"}`,
      "",
      explanations[failureKind] || `Infra failure: \`${failureKind}\` (HTTP ${httpCode}).`,
      "",
      "_This sticky comment is updated automatically because TestPass failed before it could check anything. The PR itself has not been evaluated._",
    ].join("\n");
  }

  const statusEmoji =
    status === "complete" && failCount === 0 ? ":white_check_mark: PASS" :
    status === "failed" || failCount > 0 ? ":x: FAIL" :
    status === "running" ? ":hourglass_flowing_sand: RUNNING" :
    ":grey_question: UNKNOWN";

  return [
    TESTPASS_PR_COMMENT_MARKER,
    `### TestPass: ${statusEmoji}`,
    "",
    `**Run:** \`${runId}\``,
    `**Status:** \`${status}\``,
    `**Failures:** ${failCount}`,
    `**Checked pass rate:** ${pct(checkedPassRate)} (${checked}/${decided || 0} checked; ${na} n/a)`,
    "",
    "| Verdict | Count |",
    "| --- | ---: |",
    cell(":white_check_mark: check", checked),
    cell(":x: fail", failed),
    cell(":grey_question: other", other),
    cell(":heavy_minus_sign: n/a", na),
    cell(":hourglass: pending", pending),
    cell("**total**", total),
    "",
    "_Future TestPass PR runs update this sticky comment instead of adding another receipt._",
  ].join("\n");
}

export function selectExistingTestPassComment(comments = []) {
  const usable = comments
    .filter((comment) => Number.isInteger(comment?.id))
    .filter((comment) => {
      const login = comment.user?.login || comment.author?.login || "";
      return login === "github-actions[bot]" || login === "github-actions";
    });

  const marked = usable.find((comment) => String(comment.body || "").includes(TESTPASS_PR_COMMENT_MARKER));
  if (marked) return marked;

  return usable
    .filter((comment) => /^### TestPass:/m.test(String(comment.body || "")))
    .sort((a, b) => Date.parse(b.created_at || b.createdAt || 0) - Date.parse(a.created_at || a.createdAt || 0))[0] || null;
}

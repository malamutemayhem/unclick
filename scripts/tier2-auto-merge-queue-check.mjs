#!/usr/bin/env node

import { spawn } from "node:child_process";

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  return /^(1|true|yes|y|on)$/i.test(String(value).trim());
}

function parseBoundedInt(value, fallback, min, max) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function compact(value, max = 160) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function parseCsv(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeMergeState(value) {
  return String(value ?? "").trim().toUpperCase() || "UNKNOWN";
}

function normalizeConclusion(value) {
  return String(value ?? "").trim().toUpperCase();
}

function normalizeReviewDecision(value) {
  return String(value ?? "").trim().toUpperCase();
}

function boundedNumber(value, fallback = 0) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, parsed);
}

function prNumber(pr = {}) {
  const parsed = Number.parseInt(String(pr.number ?? pr.pr_number ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function isSensitiveHeadRefName(value) {
  const headRefName = String(value || "").trim();
  return /\b(auth|billing|payment|stripe|secret|credential|migration|schema|rls|tenant)\b/i.test(headRefName);
}

function isDependencyHeadRefName(value) {
  return /^dependabot\//i.test(String(value || "").trim());
}

export function scoreTier2PullRequestRisk(pr = {}, { ignoreUnstableMergeState = false } = {}) {
  const reasons = [];
  let score = 0;
  const mergeState = normalizeMergeState(pr.mergeStateStatus ?? pr.merge_state_status);
  const changedFiles = boundedNumber(pr.changedFiles ?? pr.changed_files);
  const changedLines = boundedNumber(pr.additions) + boundedNumber(pr.deletions);
  const headRefName = String(pr.headRefName || pr.head?.ref || "").trim();

  if (Boolean(pr.isDraft ?? pr.draft)) {
    score += 35;
    reasons.push("draft");
  }

  if (mergeState !== "CLEAN" && !(mergeState === "UNSTABLE" && ignoreUnstableMergeState)) {
    score += 30;
    reasons.push(`merge_state_${mergeState.toLowerCase()}`);
  }

  if (changedFiles > 30) {
    score += 25;
    reasons.push("many_files");
  } else if (changedFiles > 12) {
    score += 15;
    reasons.push("several_files");
  }

  if (changedLines > 2000) {
    score += 25;
    reasons.push("large_diff");
  } else if (changedLines > 500) {
    score += 15;
    reasons.push("medium_diff");
  }

  if (isSensitiveHeadRefName(headRefName)) {
    score += 25;
    reasons.push("sensitive_branch_name");
  }

  if (isDependencyHeadRefName(headRefName)) {
    score += 25;
    reasons.push("dependency_update_requires_review");
  }

  const boundedScore = Math.min(100, score);
  return {
    score: boundedScore,
    level: boundedScore >= 60 ? "high" : boundedScore >= 30 ? "medium" : "low",
    reasons,
  };
}

function latestApprovalCount(pr = {}) {
  const latestReviews = Array.isArray(pr.latestReviews ?? pr.latest_reviews) ? pr.latestReviews ?? pr.latest_reviews : [];
  return latestReviews.filter((review) => normalizeConclusion(review?.state) === "APPROVED").length;
}

function hasReviewApproval(pr = {}) {
  return normalizeReviewDecision(pr.reviewDecision ?? pr.review_decision) === "APPROVED" || latestApprovalCount(pr) > 0;
}

function reviewProofComments(pr = {}) {
  const comments = Array.isArray(pr.comments) ? pr.comments : [];
  return comments.filter((comment) => {
    const body = String(comment?.body || "");
    if (!/\b(review pass|reviewed pass|approve|approved|approval|safety review passed)\b/i.test(body)) return false;
    if (!/\b(reviewer|reviewer hat|safety review|verified|review passed)\b/i.test(body)) return false;
    if (!/\b(proof|verified|test|tests|checks|ci|local proof|github checks)\b/i.test(body)) return false;
    if (/\b(blocker|hold|do not merge|not safe|failing|failed|red|dirty|unresolved)\b/i.test(body)) return false;
    return true;
  });
}

function reviewProofCommentCount(pr = {}) {
  return reviewProofComments(pr).length;
}

function hasReviewProofComment(pr = {}) {
  return reviewProofCommentCount(pr) > 0;
}

function summarizeChecks(pr = {}, { optionalPendingChecks = [] } = {}) {
  const rollup = Array.isArray(pr.statusCheckRollup ?? pr.status_check_rollup)
    ? pr.statusCheckRollup ?? pr.status_check_rollup
    : [];
  if (rollup.length === 0) {
    return {
      state: "missing",
      green: false,
      total: 0,
      failed: [],
      pending: [],
      optionalPending: [],
    };
  }

  const failed = [];
  const pending = [];
  const optionalPending = [];
  const acceptableConclusions = new Set(["SUCCESS", "NEUTRAL", "SKIPPED"]);
  const optionalPendingNames = new Set(optionalPendingChecks.map((name) => name.toLowerCase()));

  for (const check of rollup) {
    const name = compact(check?.name || check?.context || check?.workflowName || "unnamed-check", 120);
    const status = normalizeConclusion(check?.status || check?.state);
    const conclusion = normalizeConclusion(check?.conclusion || check?.state);

    if (status && status !== "COMPLETED" && status !== "SUCCESS") {
      if (optionalPendingNames.has(name.toLowerCase())) {
        optionalPending.push(name);
        continue;
      }
      pending.push(name);
      continue;
    }

    if (conclusion && !acceptableConclusions.has(conclusion)) {
      failed.push(name);
    }
  }

  return {
    state: pending.length > 0 ? "pending" : failed.length > 0 ? "red" : "green",
    green: pending.length === 0 && failed.length === 0,
    total: rollup.length,
    failed,
    pending,
    optionalPending,
  };
}

function safePrSummary(pr = {}, options = {}) {
  const checks = summarizeChecks(pr, options);
  const mergeState = normalizeMergeState(pr.mergeStateStatus ?? pr.merge_state_status);
  const risk = scoreTier2PullRequestRisk(pr, {
    ignoreUnstableMergeState: mergeState === "UNSTABLE" && checks.green,
  });
  const reviewProofCount = reviewProofCommentCount(pr);
  const approvedReviewCount = latestApprovalCount(pr);
  const reviewApproved = hasReviewApproval(pr);
  return {
    number: prNumber(pr),
    isDraft: Boolean(pr.isDraft ?? pr.draft),
    mergeStateStatus: normalizeMergeState(pr.mergeStateStatus ?? pr.merge_state_status),
    url: String(pr.url || pr.html_url || "").trim(),
    headRefName: compact(pr.headRefName || pr.head?.ref || "", 120),
    changedFiles: boundedNumber(pr.changedFiles ?? pr.changed_files),
    additions: boundedNumber(pr.additions),
    deletions: boundedNumber(pr.deletions),
    reviewDecision: normalizeReviewDecision(pr.reviewDecision ?? pr.review_decision),
    approvedReviewCount,
    hasReviewApproval: reviewApproved,
    reviewProofCommentCount: reviewProofCount,
    hasReviewProofComment: reviewProofCount > 0,
    hasReviewEvidence: reviewApproved || reviewProofCount > 0,
    check_state: checks.state,
    checks_green: checks.green,
    check_count: checks.total,
    failed_checks: checks.failed,
    pending_checks: checks.pending,
    optional_pending_checks: checks.optionalPending,
    risk_score: risk.score,
    risk_level: risk.level,
    risk_reasons: risk.reasons,
  };
}

function auditReasons(summary = {}) {
  const reasons = [];
  if (summary.isDraft) reasons.push("draft");
  if (summary.mergeStateStatus !== "CLEAN") {
    const mergeReason = `merge_state_${String(summary.mergeStateStatus || "UNKNOWN").toLowerCase()}`;
    if ((summary.risk_reasons || []).includes(mergeReason)) {
      reasons.push(mergeReason);
    }
  }
  if (summary.risk_level !== "low") {
    reasons.push(`risk_${summary.risk_level || "unknown"}`);
  }
  for (const reason of summary.risk_reasons || []) {
    if (!reasons.includes(reason)) reasons.push(reason);
  }
  return reasons;
}

function reviewProofCanClearReviewableRisk(summary = {}) {
  if (!summary.hasReviewProofComment) return false;
  const riskReasons = Array.isArray(summary.risk_reasons) ? summary.risk_reasons : [];
  return riskReasons.length > 0 && riskReasons.every((reason) => ["medium_diff", "several_files"].includes(reason));
}

function mergeGateReasons(summary = {}, { allowUnreviewedLowRisk = false, allowReviewProofComments = false } = {}) {
  let reasons = [...auditReasons(summary)];
  if (allowReviewProofComments && reviewProofCanClearReviewableRisk(summary)) {
    reasons = reasons.filter((reason) => !["risk_medium", "medium_diff", "several_files"].includes(reason));
  }

  if (!summary.checks_green) {
    if (summary.check_state === "missing") reasons.push("checks_missing");
    else if (summary.check_state === "pending") reasons.push("checks_pending");
    else reasons.push("checks_not_green");
  }

  const reviewSatisfied =
    summary.hasReviewApproval ||
    (allowUnreviewedLowRisk && summary.risk_level === "low") ||
    (allowReviewProofComments && summary.hasReviewProofComment);
  if (!reviewSatisfied) {
    reasons.push("missing_review_approval");
  }

  return [...new Set(reasons)];
}

function auditKey(summary = {}, index = 0) {
  return summary.number ? `#${summary.number}` : `unknown-${index + 1}`;
}

export function evaluateTier2AutoMergeQueue({
  prs = [],
  now = new Date().toISOString(),
  execute = false,
  allowUnreviewedLowRisk = false,
  allowReviewProofComments = false,
  optionalPendingChecks = [],
} = {}) {
  const openPrs = Array.isArray(prs) ? prs : [];
  const summaries = openPrs.map((pr) => safePrSummary(pr, { optionalPendingChecks }));
  if (openPrs.length === 0) {
    return {
      ok: true,
      action: "tier2_auto_merge_queue_check",
      result: "idle",
      reason: "open_pr_queue_empty",
      now,
      open_pr_count: 0,
      safe_to_merge_count: 0,
      safe_to_merge_pr_numbers: [],
      execute: false,
      execution_requested: Boolean(execute),
      allow_unreviewed_low_risk: Boolean(allowUnreviewedLowRisk),
      allow_review_proof_comments: Boolean(allowReviewProofComments),
      optional_pending_checks: optionalPendingChecks,
      no_execute_reason: "open_pr_queue_empty",
      low_risk_count: 0,
      candidate_count: 0,
      candidate_pr_numbers: [],
      blocked_prs: [],
      blocked_reasons_by_pr: {},
      summaries: [],
    };
  }

  const candidates = [];
  const safeToMerge = [];
  const blockedPrs = [];
  const blockedReasonsByPr = {};

  for (const [index, summary] of summaries.entries()) {
    const reasons = auditReasons(summary);
    if (reasons.length === 0) {
      candidates.push(summary);
    }

    const gateReasons = mergeGateReasons(summary, { allowUnreviewedLowRisk, allowReviewProofComments });
    if (gateReasons.length === 0) {
      safeToMerge.push(summary);
    } else {
      const key = auditKey(summary, index);
      blockedPrs.push({ number: summary.number, reasons: gateReasons });
      blockedReasonsByPr[key] = gateReasons;
    }
  }

  const shouldExecute = Boolean(execute) && safeToMerge.length > 0;
  return {
    ok: true,
    action: "tier2_auto_merge_queue_check",
    result: "queue_not_empty",
    reason: shouldExecute ? "safe_candidates_ready_for_auto_merge" : "scheduled_queue_gate_check",
    now,
    open_pr_count: openPrs.length,
    safe_to_merge_count: safeToMerge.length,
    safe_to_merge_pr_numbers: safeToMerge.map((summary) => summary.number).filter(Number.isFinite),
    execute: shouldExecute,
    execution_requested: Boolean(execute),
    allow_unreviewed_low_risk: Boolean(allowUnreviewedLowRisk),
    allow_review_proof_comments: Boolean(allowReviewProofComments),
    optional_pending_checks: optionalPendingChecks,
    no_execute_reason: shouldExecute ? "" : Boolean(execute) ? "no_safe_candidates" : "execution_disabled",
    low_risk_count: candidates.length,
    candidate_count: candidates.length,
    candidate_pr_numbers: candidates.map((summary) => summary.number).filter(Number.isFinite),
    blocked_prs: blockedPrs,
    blocked_reasons_by_pr: blockedReasonsByPr,
    summaries,
  };
}

export async function runCommandJson(command, args, { cwd = process.cwd(), env = process.env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env,
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      resolve({ ok: false, exit_code: null, reason: "command_failed", output: compact(error.message, 500) });
    });
    child.on("close", (code) => {
      if (code !== 0) {
        resolve({ ok: false, exit_code: code, reason: "command_failed", output: compact(stderr || stdout, 500) });
        return;
      }
      try {
        resolve({ ok: true, value: JSON.parse(stdout || "[]") });
      } catch {
        resolve({ ok: false, exit_code: code, reason: "invalid_json", output: compact(stdout, 500) });
      }
    });
  });
}

export async function fetchOpenPullRequests({
  repo = process.env.GITHUB_REPOSITORY || "malamutemayhem/unclick",
  limit = parseBoundedInt(process.env.TIER2_AUTOMERGE_PR_LIMIT, 30, 1, 100),
  cwd = process.cwd(),
  runJson = runCommandJson,
  hydratePotentialCandidates = parseBoolean(process.env.TIER2_AUTOMERGE_HYDRATE_POTENTIAL_CANDIDATES, true),
} = {}) {
  const result = await runJson(
    "gh",
    [
      "pr",
      "list",
      "--repo",
      repo,
      "--state",
      "open",
      "--limit",
      String(limit),
      "--json",
      "number,isDraft,mergeStateStatus,url,headRefName,changedFiles,additions,deletions,reviewDecision,latestReviews,statusCheckRollup,comments",
    ],
    { cwd },
  );
  if (!result.ok) return result;
  const listedPrs = Array.isArray(result.value) ? result.value : [];
  if (!hydratePotentialCandidates) return { ok: true, prs: listedPrs };

  const prs = [];
  for (const pr of listedPrs) {
    if (!shouldHydratePullRequestDetail(pr)) {
      prs.push(pr);
      continue;
    }

    const number = prNumber(pr);
    const detail = await fetchPullRequestDetail({ repo, number, cwd, runJson });
    prs.push(detail.ok ? detail.pr : pr);
  }

  return { ok: true, prs };
}

function shouldHydratePullRequestDetail(pr = {}) {
  if (Boolean(pr.isDraft ?? pr.draft)) return false;
  if (normalizeMergeState(pr.mergeStateStatus ?? pr.merge_state_status) === "CLEAN") return false;

  const changedFiles = boundedNumber(pr.changedFiles ?? pr.changed_files);
  const changedLines = boundedNumber(pr.additions) + boundedNumber(pr.deletions);
  const headRefName = String(pr.headRefName || pr.head?.ref || "").trim();

  if (changedFiles > 30 || changedLines > 2000) return false;
  if (isSensitiveHeadRefName(headRefName) || isDependencyHeadRefName(headRefName)) return false;
  return Number.isFinite(prNumber(pr));
}

export async function fetchPullRequestDetail({
  repo = process.env.GITHUB_REPOSITORY || "malamutemayhem/unclick",
  number,
  cwd = process.cwd(),
  runJson = runCommandJson,
} = {}) {
  if (!Number.isFinite(number)) {
    return { ok: false, reason: "missing_pr_number" };
  }

  const result = await runJson(
    "gh",
    [
      "pr",
      "view",
      String(number),
      "--repo",
      repo,
      "--json",
      "number,isDraft,mergeStateStatus,url,headRefName,changedFiles,additions,deletions,reviewDecision,latestReviews,statusCheckRollup,comments",
    ],
    { cwd },
  );
  if (!result.ok) return result;
  return { ok: true, pr: result.value && typeof result.value === "object" ? result.value : {} };
}

export async function runCommandText(command, args, { cwd = process.cwd(), env = process.env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env,
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      resolve({ ok: false, exit_code: null, reason: "command_failed", output: compact(error.message, 500) });
    });
    child.on("close", (code) => {
      resolve({
        ok: code === 0,
        exit_code: code,
        reason: code === 0 ? "ok" : "command_failed",
        output: compact(stderr || stdout, 500),
      });
    });
  });
}

export async function mergePullRequest({
  repo = process.env.GITHUB_REPOSITORY || "malamutemayhem/unclick",
  number,
  cwd = process.cwd(),
  runText = runCommandText,
} = {}) {
  if (!Number.isFinite(number)) {
    return { ok: false, reason: "missing_pr_number", output: "" };
  }
  return runText(
    "gh",
    [
      "pr",
      "merge",
      String(number),
      "--repo",
      repo,
      "--squash",
      "--delete-branch=false",
      "--subject",
      `Auto-merge PR #${number}`,
      "--body",
      "Tier-2 auto-merge: clean low-risk PR with green checks and satisfied review/override gate.",
    ],
    { cwd },
  );
}

export async function runTier2AutoMergeQueueCheck(options = {}) {
  const fetched = await fetchOpenPullRequests(options);
  if (!fetched.ok) {
    return {
      ok: false,
      action: "tier2_auto_merge_queue_check",
      result: "blocker",
      reason: fetched.reason || "fetch_open_prs_failed",
      execute: false,
      output: fetched.output || "",
    };
  }

  const execute =
    typeof options.execute === "boolean" ? options.execute : parseBoolean(process.env.TIER2_AUTOMERGE_EXECUTE, false);
  const allowUnreviewedLowRisk =
    typeof options.allowUnreviewedLowRisk === "boolean"
      ? options.allowUnreviewedLowRisk
      : parseBoolean(process.env.TIER2_AUTOMERGE_ALLOW_UNREVIEWED_LOW_RISK, false);
  const allowReviewProofComments =
    typeof options.allowReviewProofComments === "boolean"
      ? options.allowReviewProofComments
      : parseBoolean(process.env.TIER2_AUTOMERGE_ALLOW_REVIEW_PROOF_COMMENTS, false);
  const maxMerges =
    typeof options.maxMerges === "number"
      ? Math.max(0, Math.min(10, Math.trunc(options.maxMerges)))
      : parseBoundedInt(process.env.TIER2_AUTOMERGE_MAX_MERGES, 1, 0, 10);
  const optionalPendingChecks = Array.isArray(options.optionalPendingChecks)
    ? options.optionalPendingChecks
    : parseCsv(process.env.TIER2_AUTOMERGE_OPTIONAL_PENDING_CHECKS || "Cursor Bugbot");

  const evaluated = evaluateTier2AutoMergeQueue({
    prs: fetched.prs,
    now: options.now || new Date().toISOString(),
    execute,
    allowUnreviewedLowRisk,
    allowReviewProofComments,
    optionalPendingChecks,
  });

  if (!evaluated.execute) return evaluated;

  const mergePr = options.mergePr || mergePullRequest;
  const prNumbers = evaluated.safe_to_merge_pr_numbers.slice(0, maxMerges);
  const mergeResults = [];

  for (const number of prNumbers) {
    const result = await mergePr({
      repo: options.repo || process.env.GITHUB_REPOSITORY || "malamutemayhem/unclick",
      number,
      cwd: options.cwd || process.cwd(),
    });
    mergeResults.push({
      number,
      ok: Boolean(result.ok),
      reason: result.reason || (result.ok ? "ok" : "command_failed"),
      output: result.ok ? "" : compact(result.output || "", 300),
    });
  }

  const failed = mergeResults.filter((result) => !result.ok);
  return {
    ...evaluated,
    ok: failed.length === 0,
    result: failed.length === 0 ? "merged" : "merge_blocker",
    reason: failed.length === 0 ? "safe_candidates_auto_merged" : "auto_merge_command_failed",
    max_merges: maxMerges,
    merged_count: mergeResults.filter((result) => result.ok).length,
    merge_results: mergeResults,
  };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  runTier2AutoMergeQueueCheck()
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.ok ? 0 : 1;
    })
    .catch((error) => {
      console.error(compact(error?.message || error, 500));
      process.exitCode = 1;
    });
}

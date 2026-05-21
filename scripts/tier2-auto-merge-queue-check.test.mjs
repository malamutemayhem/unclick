import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  evaluateTier2AutoMergeQueue,
  fetchOpenPullRequests,
  runTier2AutoMergeQueueCheck,
  scoreTier2PullRequestRisk,
} from "./tier2-auto-merge-queue-check.mjs";

describe("Tier-2 auto-merge queue check", () => {
  it("reports a scheduled no-op when the live PR queue is empty", () => {
    const result = evaluateTier2AutoMergeQueue({
      prs: [],
      now: "2026-05-09T08:45:00.000Z",
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "idle");
    assert.equal(result.reason, "open_pr_queue_empty");
    assert.equal(result.open_pr_count, 0);
    assert.equal(result.low_risk_count, 0);
    assert.equal(result.execute, false);
    assert.equal(result.no_execute_reason, "open_pr_queue_empty");
    assert.equal(result.candidate_count, 0);
    assert.deepEqual(result.candidate_pr_numbers, []);
    assert.deepEqual(result.safe_to_merge_pr_numbers, []);
    assert.deepEqual(result.blocked_prs, []);
  });

  it("does not merge a low-risk PR without review approval unless override is enabled", () => {
    const result = evaluateTier2AutoMergeQueue({
      prs: [
        {
          number: 604,
          isDraft: false,
          mergeStateStatus: "CLEAN",
          url: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/604",
          headRefName: "codex/example",
          changedFiles: 2,
          additions: 80,
          deletions: 20,
          statusCheckRollup: [{ __typename: "CheckRun", name: "Website", status: "COMPLETED", conclusion: "SUCCESS" }],
        },
      ],
      now: "2026-05-09T08:45:00.000Z",
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "queue_not_empty");
    assert.equal(result.reason, "scheduled_queue_gate_check");
    assert.equal(result.open_pr_count, 1);
    assert.equal(result.safe_to_merge_count, 0);
    assert.equal(result.low_risk_count, 1);
    assert.equal(result.execute, false);
    assert.equal(result.no_execute_reason, "execution_disabled");
    assert.equal(result.candidate_count, 1);
    assert.deepEqual(result.candidate_pr_numbers, [604]);
    assert.deepEqual(result.blocked_reasons_by_pr["#604"], ["missing_review_approval"]);
    assert.deepEqual(result.summaries[0], {
      number: 604,
      isDraft: false,
      mergeStateStatus: "CLEAN",
      url: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/604",
      headRefName: "codex/example",
      changedFiles: 2,
      additions: 80,
      deletions: 20,
      reviewDecision: "",
      approvedReviewCount: 0,
      hasReviewApproval: false,
      reviewProofCommentCount: 0,
      hasReviewProofComment: false,
      hasReviewEvidence: false,
      check_state: "green",
      checks_green: true,
      check_count: 1,
      failed_checks: [],
      pending_checks: [],
      optional_pending_checks: [],
      risk_score: 0,
      risk_level: "low",
      risk_reasons: [],
    });
  });

  it("identifies reviewed green low-risk PRs as safe merge candidates", () => {
    const result = evaluateTier2AutoMergeQueue({
      prs: [
        {
          number: 640,
          isDraft: false,
          mergeStateStatus: "CLEAN",
          url: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/640",
          headRefName: "codex/docs-chip",
          changedFiles: 2,
          additions: 20,
          deletions: 5,
          reviewDecision: "APPROVED",
          latestReviews: [{ state: "APPROVED" }],
          statusCheckRollup: [
            { __typename: "StatusContext", context: "Vercel", state: "SUCCESS" },
            { __typename: "CheckRun", name: "Cursor Bugbot", status: "IN_PROGRESS", conclusion: "" },
          ],
        },
      ],
      now: "2026-05-09T08:45:00.000Z",
      optionalPendingChecks: ["Cursor Bugbot"],
    });

    assert.equal(result.execute, false);
    assert.equal(result.safe_to_merge_count, 1);
    assert.deepEqual(result.safe_to_merge_pr_numbers, [640]);
    assert.equal(result.no_execute_reason, "execution_disabled");
    assert.deepEqual(result.blocked_prs, []);
    assert.deepEqual(result.summaries[0].optional_pending_checks, ["Cursor Bugbot"]);
  });

  it("allows reviewer-hat proof comments to clear reviewable diff risk", () => {
    const result = evaluateTier2AutoMergeQueue({
      prs: [
        {
          number: 977,
          isDraft: false,
          mergeStateStatus: "CLEAN",
          url: "https://github.com/malamutemayhem/unclick/pull/977",
          headRefName: "cursor/seatrelay-v1-aabc",
          changedFiles: 2,
          additions: 772,
          deletions: 0,
          reviewDecision: "",
          latestReviews: [],
          comments: [
            {
              body: "REVIEW PASS (Codex reviewer hat): safety review passed. Verified guards and proof trail. Local proof: npm test = 49 passed. GitHub checks green.",
            },
          ],
          statusCheckRollup: [{ __typename: "CheckRun", name: "Website", status: "COMPLETED", conclusion: "SUCCESS" }],
        },
      ],
      now: "2026-05-21T11:20:00.000Z",
      execute: true,
      allowReviewProofComments: true,
      allowUnreviewedLowRisk: true,
    });

    assert.equal(result.execute, true);
    assert.equal(result.safe_to_merge_count, 1);
    assert.deepEqual(result.safe_to_merge_pr_numbers, [977]);
    assert.deepEqual(result.blocked_prs, []);
    assert.equal(result.summaries[0].hasReviewProofComment, true);
    assert.deepEqual(result.summaries[0].risk_reasons, ["medium_diff"]);
  });

  it("does not treat HOLD or blocker comments as reviewer proof", () => {
    const result = evaluateTier2AutoMergeQueue({
      prs: [
        {
          number: 978,
          isDraft: false,
          mergeStateStatus: "CLEAN",
          url: "https://github.com/malamutemayhem/unclick/pull/978",
          headRefName: "cursor/seatrelay-v1-aabc",
          changedFiles: 2,
          additions: 772,
          deletions: 0,
          reviewDecision: "",
          latestReviews: [],
          comments: [
            {
              body: "REVIEW PASS? HOLD: blocker remains. Local proof exists but do not merge.",
            },
          ],
          statusCheckRollup: [{ __typename: "CheckRun", name: "Website", status: "COMPLETED", conclusion: "SUCCESS" }],
        },
      ],
      now: "2026-05-21T11:20:00.000Z",
      execute: true,
      allowReviewProofComments: true,
      allowUnreviewedLowRisk: true,
    });

    assert.equal(result.execute, false);
    assert.deepEqual(result.blocked_reasons_by_pr["#978"], ["medium_diff"]);
    assert.equal(result.summaries[0].hasReviewProofComment, false);
  });

  it("audits candidates and blocked PRs before granting merge execution", () => {
    const result = evaluateTier2AutoMergeQueue({
      prs: [
        {
          number: 640,
          isDraft: false,
          mergeStateStatus: "CLEAN",
          url: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/640",
          headRefName: "codex/docs-chip",
          changedFiles: 2,
          additions: 20,
          deletions: 5,
          reviewDecision: "APPROVED",
          latestReviews: [{ state: "APPROVED" }],
          statusCheckRollup: [{ __typename: "CheckRun", name: "Website", status: "COMPLETED", conclusion: "SUCCESS" }],
        },
        {
          number: 641,
          isDraft: true,
          mergeStateStatus: "DIRTY",
          url: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/641",
          headRefName: "codex/auth-migration",
          changedFiles: 35,
          additions: 1500,
          deletions: 750,
          statusCheckRollup: [{ __typename: "CheckRun", name: "Website", status: "COMPLETED", conclusion: "FAILURE" }],
        },
      ],
      now: "2026-05-09T08:45:00.000Z",
      execute: true,
    });

    assert.equal(result.execute, true);
    assert.equal(result.safe_to_merge_count, 1);
    assert.deepEqual(result.safe_to_merge_pr_numbers, [640]);
    assert.equal(result.candidate_count, 1);
    assert.deepEqual(result.candidate_pr_numbers, [640]);
    assert.deepEqual(result.blocked_reasons_by_pr["#641"], [
      "draft",
      "merge_state_dirty",
      "risk_high",
      "many_files",
      "large_diff",
      "sensitive_branch_name",
      "checks_not_green",
      "missing_review_approval",
    ]);
    assert.deepEqual(result.blocked_prs, [
      {
        number: 641,
        reasons: [
          "draft",
          "merge_state_dirty",
          "risk_high",
          "many_files",
          "large_diff",
          "sensitive_branch_name",
          "checks_not_green",
          "missing_review_approval",
        ],
      },
    ]);
  });

  it("adds a conservative PR risk score to queue summaries", () => {
    const low = scoreTier2PullRequestRisk({
      isDraft: false,
      mergeStateStatus: "CLEAN",
      changedFiles: 2,
      additions: 80,
      deletions: 20,
      headRefName: "codex/docs-chip",
    });
    const high = scoreTier2PullRequestRisk({
      isDraft: true,
      mergeStateStatus: "DIRTY",
      changedFiles: 35,
      additions: 1500,
      deletions: 750,
      headRefName: "codex/auth-migration",
    });

    assert.deepEqual(low, { score: 0, level: "low", reasons: [] });
    assert.equal(high.level, "high");
    assert.equal(high.score, 100);
    assert.deepEqual(high.reasons, [
      "draft",
      "merge_state_dirty",
      "many_files",
      "large_diff",
      "sensitive_branch_name",
    ]);

    const dependency = scoreTier2PullRequestRisk({
      isDraft: false,
      mergeStateStatus: "CLEAN",
      changedFiles: 2,
      additions: 2,
      deletions: 2,
      headRefName: "dependabot/npm_and_yarn/example-1.2.3",
    });
    assert.equal(dependency.level, "low");
    assert.deepEqual(dependency.reasons, ["dependency_update_requires_review"]);
  });

  it("fetches open PRs with gh without printing token-bearing environment values", async () => {
    const calls = [];
    const result = await fetchOpenPullRequests({
      repo: "owner/repo",
      limit: 5,
      runJson: async (command, args, options) => {
        calls.push({ command, args, options });
        return { ok: true, value: [{ number: 1, isDraft: true }] };
      },
    });

    assert.equal(result.ok, true);
    assert.equal(result.prs.length, 1);
    assert.equal(calls[0].command, "gh");
    assert.deepEqual(calls[0].args.slice(0, 6), ["pr", "list", "--repo", "owner/repo", "--state", "open"]);
    assert.equal(
      calls[0].args.includes(
        "number,isDraft,mergeStateStatus,url,headRefName,changedFiles,additions,deletions,reviewDecision,latestReviews,statusCheckRollup,comments",
      ),
      true,
    );
    assert.equal(Object.hasOwn(calls[0].options, "env"), false);
  });

  it("hydrates likely-safe PRs when list merge state is stale or unknown", async () => {
    const calls = [];
    const result = await fetchOpenPullRequests({
      repo: "owner/repo",
      limit: 5,
      runJson: async (command, args, options) => {
        calls.push({ command, args, options });
        if (args[1] === "list") {
          return {
            ok: true,
            value: [
              {
                number: 42,
                isDraft: false,
                mergeStateStatus: "UNKNOWN",
                headRefName: "codex/small-safe-change",
                changedFiles: 2,
                additions: 10,
                deletions: 3,
              },
            ],
          };
        }
        return {
          ok: true,
          value: {
            number: 42,
            isDraft: false,
            mergeStateStatus: "CLEAN",
            headRefName: "codex/small-safe-change",
            changedFiles: 2,
            additions: 10,
            deletions: 3,
          },
        };
      },
    });

    assert.equal(result.ok, true);
    assert.equal(result.prs[0].mergeStateStatus, "CLEAN");
    assert.equal(calls.length, 2);
    assert.deepEqual(calls[1].args.slice(0, 5), ["pr", "view", "42", "--repo", "owner/repo"]);
    assert.equal(calls[1].args.includes("number,isDraft,mergeStateStatus,url,headRefName,changedFiles,additions,deletions,reviewDecision,latestReviews,statusCheckRollup,comments"), true);
    assert.equal(Object.hasOwn(calls[1].options, "env"), false);
  });

  it("executes a capped merge when the queue has approved safe candidates", async () => {
    const merged = [];
    const result = await runTier2AutoMergeQueueCheck({
      repo: "owner/repo",
      execute: true,
      maxMerges: 1,
      runJson: async () => ({
        ok: true,
        value: [
          {
            number: 700,
            isDraft: false,
            mergeStateStatus: "CLEAN",
            url: "https://github.com/owner/repo/pull/700",
            headRefName: "codex/small-safe-change",
            changedFiles: 1,
            additions: 12,
            deletions: 3,
            reviewDecision: "APPROVED",
            latestReviews: [{ state: "APPROVED" }],
            statusCheckRollup: [{ __typename: "CheckRun", name: "CI", status: "COMPLETED", conclusion: "SUCCESS" }],
          },
        ],
      }),
      mergePr: async ({ repo, number }) => {
        merged.push({ repo, number });
        return { ok: true, reason: "ok", output: "" };
      },
    });

    assert.equal(result.ok, true);
    assert.equal(result.result, "merged");
    assert.equal(result.merged_count, 1);
    assert.deepEqual(merged, [{ repo: "owner/repo", number: 700 }]);
    assert.deepEqual(result.merge_results, [{ number: 700, ok: true, reason: "ok", output: "" }]);
  });

  it("returns a blocker if the scheduled live fetch fails", async () => {
    const result = await runTier2AutoMergeQueueCheck({
      runJson: async () => ({ ok: false, reason: "command_failed", output: "gh auth missing" }),
    });

    assert.equal(result.ok, false);
    assert.equal(result.result, "blocker");
    assert.equal(result.reason, "command_failed");
    assert.equal(result.execute, false);
  });
});

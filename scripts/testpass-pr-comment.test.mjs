import test from "node:test";
import assert from "node:assert/strict";
import {
  buildTestPassPrCommentBody,
  selectExistingTestPassComment,
  TESTPASS_PR_COMMENT_MARKER,
} from "./testpass-pr-comment.mjs";

test("product pass comment emphasizes zero failures over n/a-heavy raw pass rate", () => {
  const body = buildTestPassPrCommentBody({
    runId: "run-123",
    status: "complete",
    failCount: 0,
    total: 17,
    failureKind: "product",
    httpCode: "200",
    summary: { total: 17, check: 8, fail: 0, other: 0, na: 9, pending: 0 },
  });

  assert.match(body, new RegExp(TESTPASS_PR_COMMENT_MARKER));
  assert.match(body, /TestPass: :white_check_mark: PASS/);
  assert.match(body, /\*\*Failures:\*\* 0/);
  assert.match(body, /\*\*Checked pass rate:\*\* 100\.0% \(8\/8 checked; 9 n\/a\)/);
  assert.doesNotMatch(body, /47\.1%/);
});

test("infra comment stays clearly non-product and sticky", () => {
  const body = buildTestPassPrCommentBody({
    failureKind: "infra_auth",
    httpCode: "401",
    authReason: "api_key_inactive",
    howToFix: "Refresh TESTPASS_TOKEN.",
  });

  assert.match(body, new RegExp(TESTPASS_PR_COMMENT_MARKER));
  assert.match(body, /infra issue \(auth\)/);
  assert.match(body, /Refresh TESTPASS_TOKEN\./);
  assert.match(body, /PR itself has not been evaluated/);
});

test("sticky selector prefers marked comment, then newest legacy TestPass bot comment", () => {
  const marked = {
    id: 3,
    user: { login: "github-actions[bot]" },
    body: `${TESTPASS_PR_COMMENT_MARKER}\n### TestPass: :white_check_mark: PASS`,
    created_at: "2026-05-27T10:00:00Z",
  };
  assert.equal(selectExistingTestPassComment([
    {
      id: 2,
      user: { login: "github-actions[bot]" },
      body: "### TestPass: :x: FAIL",
      created_at: "2026-05-27T11:00:00Z",
    },
    marked,
  ]), marked);

  const newestLegacy = {
    id: 5,
    user: { login: "github-actions[bot]" },
    body: "### TestPass: :white_check_mark: PASS",
    created_at: "2026-05-27T12:00:00Z",
  };
  assert.equal(selectExistingTestPassComment([
    {
      id: 4,
      user: { login: "github-actions[bot]" },
      body: "### TestPass: :x: FAIL",
      created_at: "2026-05-27T11:00:00Z",
    },
    newestLegacy,
  ]), newestLegacy);
});

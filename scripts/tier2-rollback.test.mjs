import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  planTier2Rollback,
  prNumber,
  runTier2Rollback,
} from "./tier2-rollback.mjs";

const NOW = "2026-06-02T12:00:00.000Z";

function mergedPr(overrides = {}) {
  return {
    number: 1234,
    state: "MERGED",
    title: "Add a small low-risk helper",
    url: "https://github.com/malamutemayhem/unclick/pull/1234",
    mergedAt: "2026-06-02T11:30:00.000Z",
    mergeCommit: { oid: "abcdef0123456789abcdef0123456789abcdef01" },
    headRefName: "feature/small-helper",
    baseRefName: "main",
    ...overrides,
  };
}

describe("planTier2Rollback", () => {
  it("plans a revert for a recently merged PR", () => {
    const plan = planTier2Rollback({ pr: mergedPr(), now: NOW });
    assert.equal(plan.eligible, true);
    assert.equal(plan.number, 1234);
    assert.equal(plan.base_ref, "main");
    assert.equal(plan.merge_commit, "abcdef012345");
    assert.equal(plan.revert_branch, "revert/pr-1234-abcdef012345");
    assert.match(plan.revert_title, /Revert PR #1234/);
  });

  it("emits a no-force, no-delete command plan in safe order", () => {
    const plan = planTier2Rollback({ pr: mergedPr(), now: NOW });
    const flat = plan.commands.map(([cmd, args]) => `${cmd} ${args.join(" ")}`);
    assert.equal(flat[0], "git fetch origin main");
    assert.equal(flat[1], "git checkout -B revert/pr-1234-abcdef012345 origin/main");
    assert.equal(flat[2], "git revert --no-edit abcdef012345");
    assert.equal(flat[3], "git push origin revert/pr-1234-abcdef012345");
    assert.ok(flat[4].startsWith("gh pr create"));
    // Hard safety invariants: nothing destructive may appear in the plan.
    const joined = flat.join(" | ");
    assert.ok(!/--force/.test(joined), "plan must never force-push");
    assert.ok(!/reset --hard/.test(joined), "plan must never hard-reset");
    assert.ok(!/branch -D|push .*--delete|:refs\//.test(joined), "plan must never delete branches");
  });

  it("refuses a PR that is not merged", () => {
    const plan = planTier2Rollback({ pr: mergedPr({ state: "OPEN" }), now: NOW });
    assert.equal(plan.eligible, false);
    assert.equal(plan.reason, "not_merged");
  });

  it("refuses a merged PR with no squash commit recorded", () => {
    const plan = planTier2Rollback({ pr: mergedPr({ mergeCommit: null }), now: NOW });
    assert.equal(plan.eligible, false);
    assert.equal(plan.reason, "no_merge_commit");
  });

  it("refuses a merge older than the max age window", () => {
    const plan = planTier2Rollback({
      pr: mergedPr({ mergedAt: "2026-05-20T00:00:00.000Z" }),
      now: NOW,
      maxAgeHours: 72,
    });
    assert.equal(plan.eligible, false);
    assert.equal(plan.reason, "merge_too_old");
  });

  it("allows an old merge when allowOld is set", () => {
    const plan = planTier2Rollback({
      pr: mergedPr({ mergedAt: "2026-05-20T00:00:00.000Z" }),
      now: NOW,
      maxAgeHours: 72,
      allowOld: true,
    });
    assert.equal(plan.eligible, true);
  });

  it("rejects a missing pr number", () => {
    const plan = planTier2Rollback({ pr: { number: "nope" }, now: NOW });
    assert.equal(plan.eligible, false);
    assert.equal(plan.reason, "missing_pr_number");
  });
});

describe("runTier2Rollback", () => {
  it("returns a plan without running any command in dry-run (default)", async () => {
    const calls = [];
    const result = await runTier2Rollback({
      number: 1234,
      now: NOW,
      fetchPr: async () => ({ ok: true, pr: mergedPr() }),
      runText: async (command, args) => { calls.push([command, args]); return { ok: true }; },
    });
    assert.equal(result.result, "planned");
    assert.equal(result.execute, false);
    assert.equal(result.eligible, true);
    assert.deepEqual(calls, [], "dry-run must not execute any command");
  });

  it("runs the ordered commands when execute is true", async () => {
    const calls = [];
    const result = await runTier2Rollback({
      number: 1234,
      execute: true,
      now: NOW,
      fetchPr: async () => ({ ok: true, pr: mergedPr() }),
      runText: async (command, args) => { calls.push(`${command} ${args[0]}`); return { ok: true }; },
    });
    assert.equal(result.result, "reverted");
    assert.equal(result.execute, true);
    assert.equal(calls.length, 5);
    assert.deepEqual(calls, ["git fetch", "git checkout", "git revert", "git push", "gh pr"]);
  });

  it("stops at the first failed command and reports a blocker", async () => {
    let count = 0;
    const result = await runTier2Rollback({
      number: 1234,
      execute: true,
      now: NOW,
      fetchPr: async () => ({ ok: true, pr: mergedPr() }),
      runText: async () => { count += 1; return count >= 3 ? { ok: false, reason: "conflict", output: "merge conflict" } : { ok: true }; },
    });
    assert.equal(result.ok, false);
    assert.equal(result.result, "rollback_blocker");
    assert.equal(result.steps.length, 3, "must stop at the first failure");
  });

  it("skips an ineligible PR without executing", async () => {
    const calls = [];
    const result = await runTier2Rollback({
      number: 1234,
      execute: true,
      now: NOW,
      fetchPr: async () => ({ ok: true, pr: mergedPr({ state: "OPEN" }) }),
      runText: async (command) => { calls.push(command); return { ok: true }; },
    });
    assert.equal(result.result, "skipped");
    assert.deepEqual(calls, []);
  });

  it("reports a blocker when the PR cannot be fetched", async () => {
    const result = await runTier2Rollback({
      number: 1234,
      now: NOW,
      fetchPr: async () => ({ ok: false, reason: "command_failed", output: "gh not found" }),
    });
    assert.equal(result.ok, false);
    assert.equal(result.result, "blocker");
  });
});

describe("prNumber", () => {
  it("parses positive integers and rejects junk", () => {
    assert.equal(prNumber("1234"), 1234);
    assert.equal(prNumber(56), 56);
    assert.equal(prNumber("0"), null);
    assert.equal(prNumber("-3"), null);
    assert.equal(prNumber("abc"), null);
    assert.equal(prNumber(undefined), null);
  });
});

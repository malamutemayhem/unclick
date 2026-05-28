import { describe, expect, it } from "vitest";
import {
  buildFishbowlPrMergeProofComment,
  buildFishbowlPrMergeVerifierAgentId,
  extractFishbowlTodoIdsFromText,
  hasFishbowlPrMergeProofComment,
  parseFishbowlMergedPullRequest,
} from "./lib/fishbowl-pr-merge-reconcile";

const todoId = "55e85295-ad6d-42fc-bead-2743abf5e4ec";

describe("Fishbowl PR merge reconciliation helpers", () => {
  it("extracts linked todo ids from close words and admin links", () => {
    const ids = extractFishbowlTodoIdsFromText(
      [
        `Closes ${todoId}`,
        `Proof: /admin/jobs#todo-${todoId}`,
        `Boardroom todo ${todoId}`,
      ].join("\n"),
    );

    expect(ids).toEqual([todoId]);
  });

  it("normalizes GitHub pull_request.closed payloads", () => {
    const parsed = parseFishbowlMergedPullRequest({
      action: "closed",
      repository: { full_name: "malamutemayhem/unclick" },
      pull_request: {
        number: 1169,
        html_url: "https://github.com/malamutemayhem/unclick/pull/1169",
        title: "Ship stale overwrite detector",
        body: `Closes ${todoId}`,
        merged: true,
        merged_at: "2026-05-29T01:23:45Z",
        merge_commit_sha: "5db60a2f9bd0a6461c839ff5a756b8b66123abcd",
      },
    });

    expect(parsed.error).toBeUndefined();
    expect(parsed.pr).toMatchObject({
      number: 1169,
      repositoryFullName: "malamutemayhem/unclick",
      merged: true,
      mergeCommitSha: "5db60a2f9bd0a6461c839ff5a756b8b66123abcd",
      linkedTodoIds: [todoId],
    });
  });

  it("keeps unmerged pull requests visible without pretending they are done", () => {
    const parsed = parseFishbowlMergedPullRequest({
      pull_request: {
        number: 1170,
        body: `Closes ${todoId}`,
        merged: false,
        merge_commit_sha: "abc1234",
      },
    });

    expect(parsed.pr?.merged).toBe(false);
    expect(parsed.pr?.linkedTodoIds).toEqual([todoId]);
  });

  it("builds independent verifier ids within the Boardroom agent id limit", () => {
    expect(buildFishbowlPrMergeVerifierAgentId("codex-builder")).toBe("codex-builder-github-merge-proof");
    expect(buildFishbowlPrMergeVerifierAgentId("x".repeat(140))).toHaveLength(128);
  });

  it("builds proof comments that satisfy the close gate and dedupe cleanly", () => {
    const pr = parseFishbowlMergedPullRequest({
      repository_full_name: "malamutemayhem/unclick",
      pr_number: 1169,
      pr_url: "https://github.com/malamutemayhem/unclick/pull/1169",
      merged: true,
      merged_at: "2026-05-29T01:23:45Z",
      merge_commit_sha: "5db60a2f9bd0a6461c839ff5a756b8b66123abcd",
      linked_todo_ids: [todoId],
    }).pr;

    expect(pr).not.toBeNull();
    const text = buildFishbowlPrMergeProofComment({ pr: pr!, todoId });
    expect(text).toContain("PASS: PR #1169 merged");
    expect(text).toContain("merge commit 5db60a2f9bd0a6461c839ff5a756b8b66123abcd");
    expect(hasFishbowlPrMergeProofComment([{ text }], pr!)).toBe(true);
  });
});

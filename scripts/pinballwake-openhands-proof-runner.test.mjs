import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  buildDocsOnlyFixturePatch,
  buildOpenHandsCliArgs,
  checkOpenHandsHeadlessSettings,
  compactOutput,
  createDraftPrCoderoom,
  createFixtureOpenHandsRunner,
  createOpenHandsCliRunner,
  createSafeCodeRoomSubmitter,
  resolveCodeRoomSubmitterAuthEnv,
  runOpenHandsProof,
  splitArgs,
} from "./pinballwake-openhands-proof-runner.mjs";

const NOW = new Date("2026-05-16T23:40:00.000Z");
const FIXTURE = "docs/openhands-proof-fixture.md";

describe("OpenHands proof runner helpers", () => {
  test("splits quoted CLI args and injects the prompt as one argument", () => {
    assert.deepEqual(splitArgs('--headless --json --task "{prompt}"'), ["--headless", "--json", "--task", "{prompt}"]);

    const args = buildOpenHandsCliArgs({
      prompt: "Edit docs only\nReturn a patch.",
      argsTemplate: "--headless --json --task {prompt}",
    });

    assert.deepEqual(args, ["--headless", "--json", "--task", "Edit docs only\nReturn a patch."]);
  });

  test("builds a docs-only fixture patch inside the owned file", () => {
    const patch = buildDocsOnlyFixturePatch({
      filePath: FIXTURE,
      proofLine: "- proof run: unit-test",
    });

    assert.match(patch, /diff --git a\/docs\/openhands-proof-fixture\.md b\/docs\/openhands-proof-fixture\.md/);
    assert.match(patch, /\+[-] proof run: unit-test/);
  });

  test("compacts long CLI output without hiding the final error", () => {
    const output = `${"downloading package\n".repeat(400)}FINAL ERROR: OpenHands could not start`;
    const compacted = compactOutput(output, 600);

    assert.match(compacted, /downloading package/);
    assert.match(compacted, /omitted \d+ chars/);
    assert.match(compacted, /FINAL ERROR: OpenHands could not start/);
    assert.ok(compacted.length <= 650);
  });

  test("requires explicit settings for headless env override", () => {
    const missing = checkOpenHandsHeadlessSettings({
      args: ["--headless", "--json", "--override-with-envs", "--task", "do work"],
      env: {},
    });

    assert.equal(missing.ok, false);
    assert.equal(missing.reason, "openhands_headless_settings_required");
    assert.doesNotMatch(missing.output, /real-token-value/);

    const ready = checkOpenHandsHeadlessSettings({
      args: ["--headless", "--json", "--override-with-envs", "--task", "do work"],
      env: { LLM_API_KEY: "secret", LLM_MODEL: "openai/gpt-5" },
    });

    assert.equal(ready.ok, true);
  });

  test("fails fast before invoking OpenHands when headless settings are absent", async () => {
    let calls = 0;
    const runner = createOpenHandsCliRunner({
      env: { OPENHANDS_ARGS: "--headless --json --override-with-envs --task {prompt}" },
      runProcess: async () => {
        calls += 1;
        return { ok: true, output: "" };
      },
    });

    const result = await runner({
      prompt: "Patch a docs file",
      scopePack: { owned_files: [FIXTURE] },
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "openhands_headless_settings_required");
    assert.equal(calls, 0);
  });

  test("invokes OpenHands when headless env settings are present", async () => {
    const calls = [];
    const runner = createOpenHandsCliRunner({
      env: {
        OPENHANDS_ARGS: "--headless --json --override-with-envs --task {prompt}",
        LLM_API_KEY: "secret",
        LLM_MODEL: "openai/gpt-5",
      },
      runProcess: async (command, args) => {
        calls.push([command, args]);
        return { ok: true, exit_code: 0, output: buildDocsOnlyFixturePatch({ filePath: FIXTURE }) };
      },
    });

    const result = await runner({
      prompt: "Patch a docs file",
      scopePack: { owned_files: [FIXTURE] },
    });

    assert.equal(result.ok, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0], "openhands");
    assert.deepEqual(calls[0][1], ["--headless", "--json", "--override-with-envs", "--task", "Patch a docs file"]);
  });

  test("runs fixture OpenHands through the worker and coderoom", async () => {
    let coderoomCalls = 0;
    const result = await runOpenHandsProof({
      now: NOW,
      env: { OPENHANDS_TEST_MODE: "1" },
      filePath: FIXTURE,
      openHands: createFixtureOpenHandsRunner({ filePath: FIXTURE, now: NOW }),
      coderoom: async ({ changedFiles, patch }) => {
        coderoomCalls += 1;
        assert.deepEqual(changedFiles, [FIXTURE]);
        assert.match(patch, /proof run: 2026-05-16T23:40:00.000Z/);
        return {
          ok: true,
          pr_url: "https://github.com/malamutemayhem/unclick/pull/902",
          head_sha_after: "abc123",
          test_run_id: "openhands-fixture-2026",
          test_exit_code: 0,
          status: "draft_pr_created",
        };
      },
    });

    assert.equal(result.ok, true);
    assert.equal(coderoomCalls, 1);
    assert.equal(result.receipt.receipt_type, "openhands_worker_pass");
    assert.equal(result.receipt.evidence.pr_url, "https://github.com/malamutemayhem/unclick/pull/902");
  });
});

describe("draft PR coderoom binding", () => {
  test("refuses non-docs patches before any git write", async () => {
    const calls = [];
    const coderoom = createDraftPrCoderoom({
      runProcess: async (command, args) => {
        calls.push([command, args]);
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await coderoom({
      job: { owned_files: ["src/not-docs.ts"] },
      changedFiles: ["src/not-docs.ts"],
      patch: "diff --git a/src/not-docs.ts b/src/not-docs.ts\n--- a/src/not-docs.ts\n+++ b/src/not-docs.ts\n@@ -1 +1 @@\n-old\n+new\n",
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "non_docs_patch_refused");
    assert.deepEqual(calls, []);
  });

  test("creates a draft PR only after clean status and docs-only validation", async () => {
    const calls = [];
    const coderoom = createDraftPrCoderoom({
      branchName: "codex/openhands-proof-test",
      runProcess: async (command, args, options = {}) => {
        calls.push([command, args, Boolean(options.stdin)]);
        if (command === "gh") {
          return { ok: true, stdout: "https://github.com/malamutemayhem/unclick/pull/902\n", stderr: "", output: "" };
        }
        if (command === "git" && args[0] === "rev-parse") {
          return { ok: true, stdout: "abc123\n", stderr: "", output: "" };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await coderoom({
      job: { todo_id: "todo-1", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: draft-pr-test" }),
      summary: "Docs-only proof.",
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.pr_url, "https://github.com/malamutemayhem/unclick/pull/902");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 2).join(" ")}`),
      [
        "git status --porcelain",
        "git checkout -b",
        "git apply --whitespace=nowarn",
        "git add docs/openhands-proof-fixture.md",
        "git commit -m",
        "git push -u",
        "gh pr create",
        "git rev-parse HEAD",
      ],
    );
    assert.equal(calls[2][2], true);
  });
});

describe("safe CodeRoom submitter", () => {
  test("refuses default GITHUB_TOKEN-only auth before git or gh calls", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { GITHUB_TOKEN: "default-actions-token" },
      runProcess: async (command, args) => {
        calls.push([command, args]);
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-token", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: token refusal" }),
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "missing_scoped_app_token");
    assert.deepEqual(calls, []);
  });

  test("rejects an app token that matches the default GITHUB_TOKEN", () => {
    const result = resolveCodeRoomSubmitterAuthEnv({
      GITHUB_TOKEN: "same-token",
      CODEROOM_GITHUB_APP_TOKEN: "same-token",
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "app_token_matches_default_github_token");
    assert.equal(result.token_source, "CODEROOM_GITHUB_APP_TOKEN");
  });

  test("rejects protected paths before git or gh writes", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      runProcess: async (command, args) => {
        calls.push([command, args]);
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-protected", owned_files: [".github/workflows/ci.yml"] },
      changedFiles: [".github/workflows/ci.yml"],
      patch:
        "diff --git a/.github/workflows/ci.yml b/.github/workflows/ci.yml\n--- a/.github/workflows/ci.yml\n+++ b/.github/workflows/ci.yml\n@@ -1 +1 @@\n-old\n+new\n",
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "protected_workflow_path");
    assert.deepEqual(calls, []);
  });

  test("returns existing PR before creating a duplicate branch", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      branchName: "codex/openhands-submit-todo-1",
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "gh" && args[1] === "list") {
          return {
            ok: true,
            stdout: "https://github.com/malamutemayhem/unclick/pull/930\n",
            stderr: "",
            output: "",
          };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-1", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: idempotent" }),
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, "existing_pr");
    assert.equal(result.idempotent, true);
    assert.equal(result.pr_url, "https://github.com/malamutemayhem/unclick/pull/930");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 2).join(" ")}`),
      ["git status --porcelain", "gh pr list"],
    );
  });

  test("creates a PR and enables auto-merge only after validation", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      branchName: "codex/openhands-submit-todo-2",
      title: "docs: submit OpenHands patch",
      runProcess: async (command, args, options = {}) => {
        calls.push([command, args, Boolean(options.stdin), options.env?.GH_TOKEN, options.env?.GITHUB_TOKEN]);
        if (command === "gh" && args[1] === "list") {
          return { ok: true, stdout: "", stderr: "", output: "" };
        }
        if (command === "gh" && args[1] === "create") {
          return { ok: true, stdout: "https://github.com/malamutemayhem/unclick/pull/931\n", stderr: "", output: "" };
        }
        if (command === "git" && args[0] === "rev-parse") {
          return { ok: true, stdout: "abc123\n", stderr: "", output: "" };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-2", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: auto-merge" }),
      summary: "Docs-only submitter proof.",
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, "pr_created_auto_merge_enabled");
    assert.equal(result.auto_merge_enabled, true);
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 3).join(" ")}`),
      [
        "git status --porcelain",
        "gh pr list --head",
        "git checkout -b codex/openhands-submit-todo-2",
        "git apply --check --whitespace=error",
        "git apply --whitespace=nowarn -",
        "git diff --check",
        "git add docs/openhands-proof-fixture.md",
        "git commit -m docs: submit OpenHands patch",
        "gh auth setup-git",
        "git push -u origin",
        "gh pr create --title",
        "git rev-parse HEAD",
        "gh pr merge --auto",
      ],
    );
    assert.equal(calls[3][2], true);
    assert.equal(calls[4][2], true);
    assert.ok(calls.every((call) => call[3] === "app-token" && call[4] === "app-token"));
  });

  test("fails closed when git apply check fails", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      branchName: "codex/openhands-submit-todo-3",
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "gh" && args[1] === "list") {
          return { ok: true, stdout: "", stderr: "", output: "" };
        }
        if (command === "git" && args[0] === "apply" && args[1] === "--check") {
          return { ok: false, stdout: "", stderr: "patch does not apply", output: "patch does not apply" };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-3", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: fail closed" }),
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "git_failed");
    assert.match(result.output, /patch does not apply/);
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 2).join(" ")}`),
      ["git status --porcelain", "gh pr list", "git checkout -b", "git apply --check"],
    );
  });
});

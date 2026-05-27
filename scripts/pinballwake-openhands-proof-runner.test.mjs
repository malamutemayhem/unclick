import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  buildDocsOnlyFixturePatch,
  buildOpenHandsCliArgs,
  captureOwnedWorktreeDiff,
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
    assert.equal(calls.length, 2);
    assert.equal(calls[0][0], "openhands");
    assert.deepEqual(calls[0][1], ["--headless", "--json", "--override-with-envs", "--task", "Patch a docs file"]);
    assert.equal(calls[1][0], "git");
    assert.deepEqual(calls[1][1], ["diff", "--name-only", "--"]);
  });

  test("returns a specific reason when the OpenHands CLI exits before a patch", async () => {
    const runner = createOpenHandsCliRunner({
      env: {
        OPENHANDS_ARGS: "--headless --json --override-with-envs --task {prompt}",
        LLM_API_KEY: "secret",
        LLM_MODEL: "openai/gpt-5",
      },
      runProcess: async () => ({
        ok: false,
        exit_code: 1,
        output: "OpenHands exited before producing a trusted unified diff.",
      }),
    });

    const result = await runner({
      prompt: "Patch a docs file",
      scopePack: { owned_files: [FIXTURE] },
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "openhands_cli_failed");
    assert.equal(result.exit_code, 1);
    assert.match(result.output, /trusted unified diff/);
  });

  test("returns a specific reason when OpenHands completes without a trusted patch", async () => {
    const runner = createOpenHandsCliRunner({
      env: {
        OPENHANDS_ARGS: "--headless --json --override-with-envs --task {prompt}",
        LLM_API_KEY: "secret",
        LLM_MODEL: "openai/gpt-5",
      },
      runProcess: async () => ({
        ok: true,
        exit_code: 0,
        output: "OpenHands finished without a patch block.",
      }),
    });

    const result = await runner({
      prompt: "Patch a docs file",
      scopePack: { owned_files: [FIXTURE] },
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "openhands_missing_unified_diff");
    assert.equal(result.exit_code, 0);
    assert.match(result.output, /completed without a trusted unified diff/);
    assert.match(result.output, /diff --git patch/);
  });

  test("captures an owned-file worktree diff when OpenHands edits instead of printing a patch", async () => {
    const calls = [];
    const patch = buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: worktree-capture" });
    const runner = createOpenHandsCliRunner({
      env: {
        OPENHANDS_ARGS: "--headless --json --override-with-envs --task {prompt}",
        LLM_API_KEY: "secret",
        LLM_MODEL: "openai/gpt-5",
      },
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command !== "git") {
          return { ok: true, exit_code: 0, output: "OpenHands edited the fixture file directly." };
        }
        if (args[0] === "diff" && args[1] === "--name-only") {
          return { ok: true, stdout: `${FIXTURE}\n`, stderr: "", output: `${FIXTURE}\n` };
        }
        if (args[0] === "diff" && args[1] === "--") {
          return { ok: true, stdout: patch, stderr: "", output: patch };
        }
        if (args[0] === "restore") {
          return { ok: true, stdout: "", stderr: "", output: "" };
        }
        if (args[0] === "diff" && args[1] === "--quiet") {
          return { ok: true, stdout: "", stderr: "", output: "" };
        }
        throw new Error(`unexpected git command ${args.join(" ")}`);
      },
    });

    const result = await runner({
      prompt: "Patch a docs file",
      scopePack: { owned_files: [FIXTURE] },
    });

    assert.equal(result.ok, true);
    assert.equal(result.patch, patch);
    assert.deepEqual(result.changed_files, [FIXTURE]);
    assert.match(result.summary, /captured from git diff/);
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 3).join(" ")}`),
      [
        "openhands --headless --json --override-with-envs",
        "git diff --name-only --",
        "git diff -- docs/openhands-proof-fixture.md",
        "git restore --worktree --",
        "git diff --quiet --",
      ],
    );
  });

  test("fails closed when OpenHands edits outside owned files", async () => {
    const runner = createOpenHandsCliRunner({
      env: {
        OPENHANDS_ARGS: "--headless --json --override-with-envs --task {prompt}",
        LLM_API_KEY: "secret",
        LLM_MODEL: "openai/gpt-5",
      },
      runProcess: async (command, args) => {
        if (command !== "git") {
          return { ok: true, exit_code: 0, output: "OpenHands edited files directly." };
        }
        if (args[0] === "diff" && args[1] === "--name-only") {
          return { ok: true, stdout: "src/not-owned.ts\n", stderr: "", output: "src/not-owned.ts\n" };
        }
        throw new Error(`unexpected git command ${args.join(" ")}`);
      },
    });

    const result = await runner({
      prompt: "Patch a docs file",
      scopePack: { owned_files: [FIXTURE] },
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "openhands_unowned_worktree_diff");
    assert.match(result.output, /outside ownership/);
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

  test("restores a pre-applied owned docs patch before draft PR creation", async () => {
    const calls = [];
    let statusCalls = 0;
    const coderoom = createDraftPrCoderoom({
      branchName: "codex/openhands-proof-test",
      runProcess: async (command, args, options = {}) => {
        calls.push([command, args, Boolean(options.stdin)]);
        if (command === "git" && args[0] === "status") {
          statusCalls += 1;
          return {
            ok: true,
            stdout: statusCalls === 1 ? ` M ${FIXTURE}\n` : "",
            stderr: "",
            output: "",
          };
        }
        if (command === "gh") {
          return { ok: true, stdout: "https://github.com/malamutemayhem/unclick/pull/903\n", stderr: "", output: "" };
        }
        if (command === "git" && args[0] === "rev-parse") {
          return { ok: true, stdout: "def456\n", stderr: "", output: "" };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await coderoom({
      job: { todo_id: "todo-1", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: draft-pr-restore-test" }),
      summary: "Docs-only proof.",
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.pr_url, "https://github.com/malamutemayhem/unclick/pull/903");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 3).join(" ")}`),
      [
        "git status --porcelain",
        "git restore --staged --worktree",
        "git status --porcelain",
        "git checkout -b codex/openhands-proof-test",
        "git apply --whitespace=nowarn -",
        "git add docs/openhands-proof-fixture.md",
        "git commit -m test(autopilot): prove OpenHands docs patch path",
        "git push -u origin",
        "gh pr create --draft",
        "git rev-parse HEAD",
      ],
    );
    assert.equal(calls[4][2], true);
  });

  test("cleans an untracked patch-owned docs file before draft PR creation", async () => {
    const calls = [];
    let statusCalls = 0;
    const coderoom = createDraftPrCoderoom({
      branchName: "codex/openhands-proof-test",
      runProcess: async (command, args, options = {}) => {
        calls.push([command, args, Boolean(options.stdin)]);
        if (command === "git" && args[0] === "status") {
          statusCalls += 1;
          return { ok: true, stdout: statusCalls === 1 ? `?? ${FIXTURE}\n` : "", stderr: "", output: "" };
        }
        if (command === "gh") {
          return { ok: true, stdout: "https://github.com/malamutemayhem/unclick/pull/904\n", stderr: "", output: "" };
        }
        if (command === "git" && args[0] === "rev-parse") {
          return { ok: true, stdout: "fed789\n", stderr: "", output: "" };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await coderoom({
      job: { todo_id: "todo-1", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: draft-pr-clean-untracked-test" }),
      summary: "Docs-only proof.",
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.pr_url, "https://github.com/malamutemayhem/unclick/pull/904");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 4).join(" ")}`),
      [
        "git status --porcelain",
        "git clean -f -- docs/openhands-proof-fixture.md",
        "git status --porcelain",
        "git checkout -b codex/openhands-proof-test",
        "git apply --whitespace=nowarn -",
        "git add docs/openhands-proof-fixture.md",
        "git commit -m test(autopilot): prove OpenHands docs patch path",
        "git push -u origin codex/openhands-proof-test",
        "gh pr create --draft --title",
        "git rev-parse HEAD",
      ],
    );
    assert.equal(calls[4][2], true);
  });

  test("does not clean unrelated untracked files before draft PR creation", async () => {
    const calls = [];
    const coderoom = createDraftPrCoderoom({
      branchName: "codex/openhands-proof-test",
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "git" && args[0] === "status") {
          return { ok: true, stdout: `?? src/unrelated.ts\n`, stderr: "", output: "" };
        }
        throw new Error(`unexpected command ${command} ${args.join(" ")}`);
      },
    });

    const result = await coderoom({
      job: { todo_id: "todo-1", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: draft-pr-unrelated-untracked-test" }),
      summary: "Docs-only proof.",
      testRunId: "unit-test",
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "dirty_worktree");
    assert.deepEqual(result.dirty_files, ["src/unrelated.ts"]);
    assert.deepEqual(calls.map(([command, args]) => `${command} ${args.slice(0, 2).join(" ")}`), [
      "git status --porcelain",
    ]);
  });
});

describe("safe CodeRoom submitter", () => {
  test("captures and restores owned worktree diffs", async () => {
    const calls = [];
    const patch = buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: helper" });
    const result = await captureOwnedWorktreeDiff({
      ownedFiles: [FIXTURE],
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (args[0] === "diff" && args[1] === "--name-only") {
          return { ok: true, stdout: `${FIXTURE}\n`, stderr: "", output: `${FIXTURE}\n` };
        }
        if (args[0] === "diff" && args[1] === "--") {
          return { ok: true, stdout: patch, stderr: "", output: patch };
        }
        if (args[0] === "restore") {
          return { ok: true, stdout: "", stderr: "", output: "" };
        }
        if (args[0] === "diff" && args[1] === "--quiet") {
          return { ok: true, stdout: "", stderr: "", output: "" };
        }
        throw new Error(`unexpected command ${command} ${args.join(" ")}`);
      },
    });

    assert.equal(result.ok, true);
    assert.equal(result.patch, patch);
    assert.deepEqual(result.changed_files, [FIXTURE]);
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 3).join(" ")}`),
      [
        "git diff --name-only --",
        "git diff -- docs/openhands-proof-fixture.md",
        "git restore --worktree --",
        "git diff --quiet --",
      ],
    );
  });

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

  test("ignores the generated autonomous runner ledger during clean-worktree checks", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      branchName: "codex/openhands-submit-todo-ledger",
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "git" && args[0] === "status") {
          return {
            ok: true,
            stdout: " M .pinballwake/coding-room-ledger.json\n",
            stderr: "",
            output: "",
          };
        }
        if (command === "gh" && args[1] === "list") {
          return {
            ok: true,
            stdout: "https://github.com/malamutemayhem/unclick/pull/932\n",
            stderr: "",
            output: "",
          };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-ledger", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: ledger ignored" }),
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, "existing_pr");
    assert.equal(result.pr_url, "https://github.com/malamutemayhem/unclick/pull/932");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 2).join(" ")}`),
      ["git status --porcelain", "gh pr list"],
    );
  });

  test("restores a pre-applied owned patch before CodeRoom submit", async () => {
    const calls = [];
    let statusCalls = 0;
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      branchName: "codex/openhands-submit-todo-preapplied",
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "git" && args[0] === "status") {
          statusCalls += 1;
          return {
            ok: true,
            stdout:
              statusCalls === 1
                ? `M  ${FIXTURE}\n M .pinballwake/coding-room-ledger.json\n`
                : " M .pinballwake/coding-room-ledger.json\n",
            stderr: "",
            output: "",
          };
        }
        if (command === "gh" && args[1] === "list") {
          return {
            ok: true,
            stdout: "https://github.com/malamutemayhem/unclick/pull/933\n",
            stderr: "",
            output: "",
          };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-preapplied", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: preapplied restored" }),
      testRunId: "unit-test",
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, "existing_pr");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 4).join(" ")}`),
      [
        "git status --porcelain",
        "git restore --staged --worktree --",
        "git status --porcelain",
        "gh pr list --head codex/openhands-submit-todo-preapplied",
      ],
    );
  });

  test("cleans an untracked patch-owned file before CodeRoom submit", async () => {
    const calls = [];
    let statusCalls = 0;
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      branchName: "codex/openhands-submit-todo-untracked",
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "git" && args[0] === "status") {
          statusCalls += 1;
          return {
            ok: true,
            stdout: statusCalls === 1 ? `?? ${FIXTURE}\n` : "",
            stderr: "",
            output: "",
          };
        }
        if (command === "gh" && args[1] === "list") {
          return {
            ok: true,
            stdout: "https://github.com/malamutemayhem/unclick/pull/934\n",
            stderr: "",
            output: "",
          };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-untracked", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: untracked" }),
    });

    assert.equal(result.ok, true);
    assert.equal(result.status, "existing_pr");
    assert.deepEqual(
      calls.map(([command, args]) => `${command} ${args.slice(0, 4).join(" ")}`),
      [
        "git status --porcelain",
        "git clean -f -- docs/openhands-proof-fixture.md",
        "git status --porcelain",
        "gh pr list --head codex/openhands-submit-todo-untracked",
      ],
    );
  });

  test("does not clean unrelated untracked files before CodeRoom submit", async () => {
    const calls = [];
    const submitter = createSafeCodeRoomSubmitter({
      env: { CODEROOM_GITHUB_APP_TOKEN: "app-token" },
      runProcess: async (command, args) => {
        calls.push([command, args]);
        if (command === "git" && args[0] === "status") {
          return { ok: true, stdout: `?? src/unrelated.ts\n`, stderr: "", output: "" };
        }
        return { ok: true, stdout: "", stderr: "", output: "" };
      },
    });

    const result = await submitter({
      job: { todo_id: "todo-unrelated-untracked", owned_files: [FIXTURE] },
      changedFiles: [FIXTURE],
      patch: buildDocsOnlyFixturePatch({ filePath: FIXTURE, proofLine: "- proof run: unrelated untracked" }),
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "dirty_worktree");
    assert.deepEqual(result.dirty_files, ["src/unrelated.ts"]);
    assert.deepEqual(calls.map(([command, args]) => `${command} ${args[0]}`), ["git status"]);
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

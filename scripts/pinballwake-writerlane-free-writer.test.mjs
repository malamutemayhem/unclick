import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile as writeFileFs } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import {
  buildFullContentsPrompt,
  createWriterLaneFreeWriterRunner,
  extractChangedFilesFromPatch,
  extractUnifiedDiff,
  gateWriterLaneDiff,
  parseFileBlocks,
} from "./pinballwake-writerlane-free-writer.mjs";

const MODEL_A = { id: "m-a", openRouterModel: "vendor/a:free", bestFor: ["code"], contextTokens: 100000, bestAt: "", empirical: { status: "proven", note: "" } };
const MODEL_B = { id: "m-b", openRouterModel: "vendor/b:free", bestFor: ["code"], contextTokens: 100000, bestAt: "", empirical: { status: "trial", note: "" } };

const OWNED = ["docs/x.md"];
const GOOD_PATCH = [
  "diff --git a/docs/x.md b/docs/x.md",
  "--- a/docs/x.md",
  "+++ b/docs/x.md",
  "@@ -1 +1,2 @@",
  " line",
  "+hello world",
  "",
].join("\n");

function fakeFetchOnce(content, { status = 200 } = {}) {
  return async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => ({ choices: [{ message: { content } }] }),
  });
}

function fileBlock(path, body) {
  return `FILE: ${path}\n\`\`\`\n${body}\n\`\`\``;
}

function okProcess() {
  return async () => ({ ok: true, exit_code: 0, stdout: "", stderr: "", output: "" });
}

describe("writerlane free-writer: happy path", () => {
  it("writes files, runs tests, captures the diff, and returns a validated patch", async () => {
    const order = [];
    const writes = [];
    let prompt = "";
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k", LLM_BASE_URL: "https://example.test/api/v1" },
      models: [MODEL_A],
      fetchImpl: async (_url, init) => {
        prompt = JSON.parse(init.body).messages[0].content;
        return fakeFetchOnce(fileBlock("docs/x.md", "hello world"))();
      },
      readFileImpl: async ({ path }) => `current ${path}\nold line`,
      runProcess: async () => {
        order.push("test");
        return { ok: true, exit_code: 0, output: "" };
      },
      writeFileImpl: async ({ path, content }) => {
        order.push("write");
        writes.push({ path, content });
      },
      captureDiff: async ({ ownedFiles }) => {
        order.push("capture");
        return { ok: true, patch: GOOD_PATCH, changed_files: ownedFiles };
      },
    });

    const result = await runner({
      prompt: "Runner brief: preserve the existing heading and only add the requested line.",
      scopePack: { owned_files: OWNED, verification: ["node --test docs/x.test.mjs"] },
    });

    assert.equal(result.ok, true);
    assert.equal(result.model, "m-a");
    assert.deepEqual(result.changed_files, ["docs/x.md"]);
    assert.match(result.patch, /hello world/);
    assert.deepEqual(result.validation, { testsPassed: true, clean: true, withinDiffBudget: true });
    assert.equal(result.diff_source, "worktree");
    assert.match(prompt, /Current owned file contents:/);
    assert.match(prompt, /CURRENT FILE: docs\/x\.md/);
    assert.match(prompt, /Runner task prompt:/);
    assert.match(prompt, /preserve the existing heading/);
    assert.match(prompt, /current docs\/x\.md/);
    assert.match(prompt, /old line/);
    // ordering: write the file, run the real test, THEN capture (capture reverts)
    assert.deepEqual(order, ["write", "test", "capture"]);
    assert.deepEqual(writes, [{ path: "docs/x.md", content: "hello world\n" }]);
  });

  it("keeps current-file context distinct from response file markers and bounded", async () => {
    let prompt = "";
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      maxContextFileBytes: 56,
      maxContextTotalBytes: 56,
      fetchImpl: async (_url, init) => {
        prompt = JSON.parse(init.body).messages[0].content;
        return fakeFetchOnce(fileBlock("docs/x.md", "hello world"))();
      },
      readFileImpl: async () => `${"a".repeat(120)}tail-never-visible`,
      runProcess: okProcess(),
      writeFileImpl: async () => {},
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
    });

    const result = await runner({
      prompt: "Runner brief: preserve the existing heading and only add the requested line.",
      scopePack: { owned_files: OWNED, verification: ["node --test docs/x.test.mjs"] },
    });

    assert.equal(result.ok, true);
    assert.match(prompt, /CURRENT FILE: docs\/x\.md/);
    assert.doesNotMatch(prompt, /tail-never-visible/);
    assert.match(prompt, /\[truncated for writer context\]/);
  });

  it("loads current-file context from cwd with the production reader", async () => {
    const root = await mkdtemp(join(tmpdir(), "writerlane-context-"));
    try {
      await mkdir(join(root, "docs"), { recursive: true });
      await writeFileFs(join(root, "docs", "x.md"), "current file from disk\n", "utf8");

      let prompt = "";
      const runner = createWriterLaneFreeWriterRunner({
        cwd: root,
        env: { LLM_API_KEY: "k" },
        models: [MODEL_A],
        fetchImpl: async (_url, init) => {
          prompt = JSON.parse(init.body).messages[0].content;
          return fakeFetchOnce(fileBlock("docs/x.md", "hello world"))();
        },
        runProcess: okProcess(),
        writeFileImpl: async () => {},
        captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
      });

      const result = await runner({ scopePack: { owned_files: OWNED, verification: ["node --test docs/x.test.mjs"] } });

      assert.equal(result.ok, true);
      assert.match(prompt, /CURRENT FILE: docs\/x\.md/);
      assert.match(prompt, /current file from disk/);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("safely falls back when a model follows the runner and returns an owned unified diff", async () => {
    const commands = [];
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      fetchImpl: fakeFetchOnce(GOOD_PATCH),
      runProcess: async (command, args, options = {}) => {
        commands.push(`${command} ${args.join(" ")}`);
        if (command === "git" && args[0] === "apply") {
          assert.equal(options.stdin, GOOD_PATCH.trimEnd());
        }
        return { ok: true, exit_code: 0, stdout: "", stderr: "", output: "" };
      },
      writeFileImpl: async () => assert.fail("unified diff fallback should not write full contents directly"),
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
    });

    const result = await runner({
      prompt: "Return a unified diff patch only.",
      scopePack: { owned_files: OWNED, verification: ["node --test docs/x.test.mjs"] },
    });

    assert.equal(result.ok, true);
    assert.equal(result.model, "m-a");
    assert.deepEqual(result.changed_files, ["docs/x.md"]);
    assert.deepEqual(commands, [
      "git apply --check --whitespace=error -",
      "git apply --whitespace=nowarn -",
      "node --test docs/x.test.mjs",
    ]);
  });
});

describe("writerlane free-writer: fail-closed paths", () => {
  it("fails closed when OpenRouter is unconfigured (no key)", async () => {
    const runner = createWriterLaneFreeWriterRunner({ env: {}, models: [MODEL_A] });
    const result = await runner({ scopePack: { owned_files: OWNED } });
    assert.equal(result.ok, false);
    assert.equal(result.reason, "writerlane_openrouter_unconfigured");
  });

  it("requires owned files", async () => {
    const runner = createWriterLaneFreeWriterRunner({ env: { LLM_API_KEY: "k" }, models: [MODEL_A] });
    const result = await runner({ scopePack: { owned_files: [] } });
    assert.equal(result.ok, false);
    assert.equal(result.reason, "owned_files_required");
  });

  it("records writerlane_tests_failed and exhausts the chain when tests fail", async () => {
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      fetchImpl: fakeFetchOnce(fileBlock("docs/x.md", "hello world")),
      runProcess: async () => ({ ok: false, exit_code: 1, output: "boom" }),
      writeFileImpl: async () => {},
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
    });
    const result = await runner({ scopePack: { owned_files: OWNED, verification: ["node --test docs/x.test.mjs"] } });
    assert.equal(result.ok, false);
    assert.equal(result.reason, "writerlane_free_chain_exhausted");
    assert.equal(result.attempts[0].reason, "writerlane_tests_failed");
  });

  it("rejects unclean output (chat-template junk in added lines)", async () => {
    const dirtyPatch = [
      "diff --git a/docs/x.md b/docs/x.md",
      "--- a/docs/x.md",
      "+++ b/docs/x.md",
      "@@ -1 +1,2 @@",
      " line",
      "+stray </assistant>",
    ].join("\n");
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      fetchImpl: fakeFetchOnce(fileBlock("docs/x.md", "stray </assistant>")),
      runProcess: okProcess(),
      writeFileImpl: async () => {},
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: dirtyPatch, changed_files: ownedFiles }),
    });
    const result = await runner({ scopePack: { owned_files: OWNED, verification: ["node --test x"] } });
    assert.equal(result.ok, false);
    assert.equal(result.attempts[0].reason, "writerlane_unclean_output");
  });

  it("passes a capture failure (e.g. unowned diff) through as the attempt reason", async () => {
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      fetchImpl: fakeFetchOnce(fileBlock("docs/x.md", "hello world")),
      runProcess: okProcess(),
      writeFileImpl: async () => {},
      captureDiff: async () => ({ ok: false, reason: "openhands_unowned_worktree_diff" }),
    });
    const result = await runner({ scopePack: { owned_files: OWNED, verification: ["node --test x"] } });
    assert.equal(result.ok, false);
    assert.equal(result.attempts[0].reason, "openhands_unowned_worktree_diff");
  });

  it("records writerlane_no_file_contents when the model returns no parseable file block", async () => {
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      fetchImpl: fakeFetchOnce("I cannot help with that."),
      runProcess: okProcess(),
      writeFileImpl: async () => {},
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
    });
    const result = await runner({ scopePack: { owned_files: ["docs/x.md", "docs/y.md"], verification: ["node --test x"] } });
    assert.equal(result.ok, false);
    assert.equal(result.attempts[0].reason, "writerlane_no_file_contents");
  });

  it("fails closed when there is no verification command (allowMissingTests defaults false)", async () => {
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A],
      fetchImpl: fakeFetchOnce(fileBlock("docs/x.md", "hello world")),
      runProcess: okProcess(),
      writeFileImpl: async () => {},
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
    });
    const result = await runner({ scopePack: { owned_files: OWNED } });
    assert.equal(result.ok, false);
    assert.equal(result.attempts[0].reason, "writerlane_tests_failed");
  });
});

describe("writerlane free-writer: fallback chain", () => {
  it("falls through a rate-limited model to the next and succeeds", async () => {
    let call = 0;
    const runner = createWriterLaneFreeWriterRunner({
      env: { LLM_API_KEY: "k" },
      models: [MODEL_A, MODEL_B],
      fetchImpl: async () => {
        call += 1;
        if (call === 1) return { ok: false, status: 429, json: async () => ({}) };
        return { ok: true, status: 200, json: async () => ({ choices: [{ message: { content: fileBlock("docs/x.md", "hello world") } }] }) };
      },
      runProcess: okProcess(),
      writeFileImpl: async () => {},
      captureDiff: async ({ ownedFiles }) => ({ ok: true, patch: GOOD_PATCH, changed_files: ownedFiles }),
    });
    const result = await runner({ scopePack: { owned_files: OWNED, verification: ["node --test x"] } });
    assert.equal(result.ok, true);
    assert.equal(result.model, "m-b");
    assert.equal(result.attempts[0].reason, "writerlane_rate_limited");
    assert.equal(result.attempts[1].ok, true);
  });
});

describe("writerlane free-writer: pure helpers", () => {
  it("parseFileBlocks keeps only owned paths and dedupes", () => {
    const content = [fileBlock("docs/x.md", "A"), fileBlock("secret/evil.txt", "B"), fileBlock("docs/x.md", "C")].join("\n\n");
    const blocks = parseFileBlocks(content, ["docs/x.md"]);
    assert.equal(blocks.length, 1);
    assert.equal(blocks[0].path, "docs/x.md");
    assert.equal(blocks[0].content, "C");
  });

  it("parseFileBlocks falls back to a lone fenced block for a single owned file", () => {
    const blocks = parseFileBlocks("```\njust code\n```", ["src/only.mjs"]);
    assert.equal(blocks.length, 1);
    assert.equal(blocks[0].path, "src/only.mjs");
    assert.equal(blocks[0].content, "just code");
  });

  it("gateWriterLaneDiff rejects unowned, hunkless, and empty patches", () => {
    assert.equal(gateWriterLaneDiff({ patch: "", ownedFiles: OWNED }).reason, "openhands_missing_unified_diff");
    assert.equal(
      gateWriterLaneDiff({ patch: "diff --git a/docs/x.md b/docs/x.md\n--- a/docs/x.md\n+++ b/docs/x.md\n", ownedFiles: OWNED }).reason,
      "openhands_no_diff_hunks",
    );
    const unowned = [
      "diff --git a/secret/evil.txt b/secret/evil.txt",
      "--- a/secret/evil.txt",
      "+++ b/secret/evil.txt",
      "@@ -0,0 +1 @@",
      "+pwned",
    ].join("\n");
    assert.equal(gateWriterLaneDiff({ patch: unowned, ownedFiles: OWNED }).reason, "openhands_unowned_worktree_diff");
  });

  it("gateWriterLaneDiff accepts an owned worktree diff under autonomy mode", () => {
    const gate = gateWriterLaneDiff({ patch: GOOD_PATCH, ownedFiles: OWNED, proofMode: "autonomy" });
    assert.equal(gate.ok, true);
    assert.equal(gate.autonomyProof, true);
    assert.deepEqual(gate.changedFiles, ["docs/x.md"]);
  });

  it("extractChangedFilesFromPatch reads the git header b/ path", () => {
    assert.deepEqual(extractChangedFilesFromPatch(GOOD_PATCH), ["docs/x.md"]);
  });

  it("buildFullContentsPrompt lists owned files and verification commands", () => {
    const prompt = buildFullContentsPrompt({
      ownedFiles: OWNED,
      scopePack: { verification: ["node --test x"] },
      model: MODEL_A,
      runnerPrompt: "Runner prompt detail. Return a unified diff patch only.",
      currentFiles: [{ path: "docs/x.md", content: "old file" }],
    });
    assert.match(prompt, /FILE: <path>/);
    assert.match(prompt, /WriterLane output format wins/);
    assert.match(prompt, /Do not return a unified diff/);
    assert.match(prompt, /- docs\/x\.md/);
    assert.match(prompt, /node --test x/);
    assert.match(prompt, /Current owned file contents:/);
    assert.match(prompt, /CURRENT FILE: docs\/x\.md/);
    assert.match(prompt, /Runner prompt detail/);
    assert.match(prompt, /old file/);
  });

  it("extractUnifiedDiff reads raw and fenced model patches", () => {
    assert.equal(extractUnifiedDiff(GOOD_PATCH), GOOD_PATCH.trimEnd());
    assert.equal(extractUnifiedDiff(`Here:\n\`\`\`diff\n${GOOD_PATCH}\n\`\`\``), GOOD_PATCH.trimEnd());
    assert.equal(extractUnifiedDiff("no patch here"), "");
  });
});

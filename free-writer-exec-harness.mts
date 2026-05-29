// free-writer-exec-harness.mts
//
// STANDALONE controlled-execute test rig for the WriterLane free-model OpenHands
// execution backend that merged in #1052 (api/lib/writerlane/openhands-backend.ts).
// NOT wired into the repo, the autonomous runner, any workflow, or cron. It is a
// local probe answering one question: "can a free model (qwen-coder first)
// actually produce a real, owned, hunk-bearing diff for one tiny docs-only job,
// end to end through the #1052 backend and its autonomy proof gate?"
//
// It does this by:
//   1. building a fresh docs-only ScopePack inside a throwaway temp git sandbox
//      (nothing touches the real repo),
//   2. instantiating the #1052 backend with { enabled: true }, proofMode
//      "autonomy",
//   3. injecting a REAL OpenHands runner that shells OpenHands headless (uvx)
//      pointed at OpenRouter, walking the candidate free models qwen-coder first,
//      then capturing the TRUSTED git-diff of the owned files (diffSource
//      "worktree") exactly like scripts/pinballwake-openhands-proof-runner.mjs'
//      captureOwnedWorktreeDiff.
//
// SAFETY:
//   - api/lib/writerlane/* is imported READ-ONLY; this file edits none of it.
//   - All writes land in an OS temp dir; the real repo/worktree is never touched.
//   - The OpenRouter key is read locally from a credentials file and passed ONLY
//     into the OpenHands subprocess env. It is NEVER printed, echoed, logged, or
//     written anywhere. The harness refers to it only as "[OpenRouter key]".
//   - Default mode is a DRY readiness check that fires NO model call. A real run
//     requires the explicit --go flag AND a present uvx + key.
//   - It never pushes, opens a PR, merges, or commits to the real repo.

import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  createOpenHandsWriterLaneBackend,
  gateOpenHandsDiff,
  MAX_PATCH_BYTES,
  type OpenHandsRunInput,
  type OpenHandsRunResult,
} from "./api/lib/writerlane/openhands-backend.js";
import {
  WRITERLANE_FREE_MODELS,
  rankFreeModelsForTask,
} from "./api/lib/writerlane/writerlane-free-models.js";
import { inferWriterLaneTaskKind } from "./api/lib/writerlane/writerlane-router.js";
import type {
  WriterLaneInput,
  WriterLaneScopePack,
} from "./api/lib/writerlane/writerlane-types.js";

// ---------------------------------------------------------------------------
// Config (all overridable via env; sane defaults baked in).
// ---------------------------------------------------------------------------
const APIS_FILE = process.env.HARNESS_APIS_FILE ?? "C:\\G\\UnClick\\Credentials\\APIs.txt";
const OPENHANDS_COMMAND = process.env.HARNESS_OPENHANDS_COMMAND ?? "uvx";
// {prompt} is replaced with the full WriterLane prompt as a single argv entry.
const OPENHANDS_ARGS_TEMPLATE =
  process.env.HARNESS_OPENHANDS_ARGS ??
  "--python 3.12 --from openhands-ai openhands --headless --override-with-envs --task {prompt}";
const OPENROUTER_BASE_URL = process.env.HARNESS_OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
const PER_MODEL_TIMEOUT_MS = Number(process.env.HARNESS_TIMEOUT_MS ?? 10 * 60 * 1000);
const REQUEST_TIMEOUT_MS = Number(process.env.HARNESS_REQUEST_TIMEOUT_MS ?? 120_000);
const OWNED_DOC = "docs/free-writer-canary.md";
const GO = process.argv.includes("--go") || process.env.HARNESS_GO === "1";
// Retry on HTTP 429 with a short increasing backoff (handles per-minute rate
// throttling; a daily free-tier cap will simply exhaust the retries and report).
const MAX_429_RETRIES = Number(process.env.HARNESS_MAX_429_RETRIES ?? 3);
const BACKOFF_BASE_MS = Number(process.env.HARNESS_BACKOFF_MS ?? 6_000);
// Force a single model (skip the fallback chain). `--qwen-only` is shorthand for
// the rank-1 candidate; `--model=<openrouter-slug>` forces any specific one.
const ONLY_MODEL: string | null = (() => {
  const arg = process.argv.find((a) => a.startsWith("--model="));
  if (arg) return arg.slice("--model=".length);
  if (process.argv.includes("--qwen-only")) return "qwen/qwen3-coder:free";
  return null;
})();
// Comparison sweep: run EVERY model independently (reset between each), do not
// stop at first success, capture per-model telemetry + diff + gate verdict.
const SWEEP = process.argv.includes("--sweep");
const SWEEP_429_MAX_ATTEMPTS = Number(process.env.HARNESS_SWEEP_429_ATTEMPTS ?? 3);
const MAX_RETRY_WAIT_MS = Number(process.env.HARNESS_MAX_RETRY_WAIT_MS ?? 30_000);
const APIS_FILE_FOR_DEEPSEEK = APIS_FILE;
// Real-code-slice sweep: model must produce WORKING code (provided tests pass),
// not just a diff that clears the scope gate.
const CODE = process.argv.includes("--code");
const MERGE = process.argv.includes("--merge");
const MODELS_CHECK = process.argv.includes("--models");
const TEST_TIMEOUT_MS = Number(process.env.HARNESS_TEST_TIMEOUT_MS ?? 30_000);
const CODE_OWNED = "src/chunk.mjs"; // owned by the model
const CODE_TEST = "src/chunk.test.mjs"; // the oracle/spec - NOT owned by the model
// Comma-separated free slugs for the --merge sweep (set after the --models check).
const MERGE_MODELS = (process.env.HARNESS_MODELS ?? "openai/gpt-oss-120b:free")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
// Offline rig check: simulate a model edit (NO network, NO model) and prove the
// sandbox capture -> #1052 autonomy gate path yields a trusted, owned patch.
const SELFTEST = process.argv.includes("--selftest");

// ---------------------------------------------------------------------------
// OpenRouter key: read locally, never surfaced. Returns presence + the value
// held only in memory for the subprocess env.
// ---------------------------------------------------------------------------
function loadOpenRouterKey(): { present: boolean; value: string | null } {
  if (!existsSync(APIS_FILE)) return { present: false, value: null };
  const text = readFileSync(APIS_FILE, "utf8");
  const lines = text.split(/\r?\n/);
  // Prefer the value on a line explicitly labelled OpenRouter.
  for (const line of lines) {
    if (/openrouter/i.test(line)) {
      const m = line.match(/sk-or-[A-Za-z0-9_\-]+/);
      if (m) return { present: true, value: m[0] };
    }
  }
  // Fallback: any OpenRouter-shaped token anywhere in the file.
  const any = text.match(/sk-or-(?:v1-)?[A-Za-z0-9_\-]{20,}/);
  return any ? { present: true, value: any[0] } : { present: false, value: null };
}

// Generic local key lookup by label (e.g. "deepseek"). Returns the token only in
// memory; never printed. Picks an sk-... token on a labelled line, excluding the
// OpenRouter sk-or- token.
function loadKeyByLabel(label: string): string | null {
  if (!existsSync(APIS_FILE_FOR_DEEPSEEK)) return null;
  const lines = readFileSync(APIS_FILE_FOR_DEEPSEEK, "utf8").split(/\r?\n/);
  const re = new RegExp(label, "i");
  for (const line of lines) {
    if (re.test(line)) {
      const m = line.match(/sk-(?!or-)[A-Za-z0-9_\-]{16,}/);
      if (m) return m[0];
    }
  }
  return null;
}

function commandExists(cmd: string): boolean {
  const probe = process.platform === "win32" ? "where" : "which";
  const res = spawnSyncCapture(probe, [cmd]);
  return res.code === 0 && res.stdout.trim().length > 0;
}

// ---------------------------------------------------------------------------
// Throwaway git sandbox. The owned docs file is committed as a baseline so the
// model's edit shows up as a real, diffable change to a tracked file.
// ---------------------------------------------------------------------------
function makeSandbox(): string {
  const dir = mkdtempSync(join(tmpdir(), "wl-free-exec-"));
  const docDir = join(dir, "docs");
  run("git", ["init", "-q"], dir);
  run("git", ["config", "user.email", "harness@local"], dir);
  run("git", ["config", "user.name", "wl-free-exec-harness"], dir);
  // Baseline content for the canary doc (tracked + committed).
  mkdirp(docDir);
  writeFileSync(
    join(dir, OWNED_DOC),
    [
      "# Free-writer canary",
      "",
      "This throwaway doc exists only so a free-model writer can prove it can edit",
      "one owned docs file end to end through the #1052 WriterLane backend.",
      "",
      "<!-- free-writer-canary -->",
      "",
    ].join("\n"),
    "utf8",
  );
  run("git", ["add", "-A"], dir);
  run("git", ["commit", "-q", "-m", "baseline canary doc"], dir);
  return dir;
}

function mkdirp(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

// ---------------------------------------------------------------------------
// Real code-slice sandbox: an owned, UNIMPLEMENTED chunk() + a sibling test
// oracle the model does NOT own. The model must make the tests pass.
// ---------------------------------------------------------------------------
const CHUNK_BASELINE = `/**
 * Split \`arr\` into consecutive subarrays of length \`size\`.
 * - The last chunk may be shorter than \`size\`.
 * - \`size <= 0\` throws a RangeError.
 * - An empty array returns [].
 *
 * Contract (TypeScript): export function chunk<T>(arr: T[], size: number): T[][]
 *
 * @template T
 * @param {T[]} arr
 * @param {number} size
 * @returns {T[][]}
 */
export function chunk(arr, size) {
  throw new Error("not implemented");
}
`;

const CHUNK_TEST = `import test from "node:test";
import assert from "node:assert/strict";
import { chunk } from "./chunk.mjs";

test("splits into consecutive chunks; last may be shorter", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
test("empty array returns []", () => {
  assert.deepEqual(chunk([], 3), []);
});
test("size larger than length returns one chunk", () => {
  assert.deepEqual(chunk([1, 2, 3], 5), [[1, 2, 3]]);
});
test("size = 0 throws RangeError", () => {
  assert.throws(() => chunk([1, 2, 3], 0), RangeError);
});
test("size = -1 throws RangeError", () => {
  assert.throws(() => chunk([1, 2, 3], -1), RangeError);
});
`;

const MERGE_BASELINE = `/**
 * Merge all overlapping AND adjacent intervals; return them sorted by start.
 * - Input may be unsorted.
 * - Adjacent intervals (touching endpoints, e.g. [1,2] and [2,3]) merge into [1,3].
 * - Nested intervals are absorbed (e.g. [1,10] and [3,4] -> [1,10]).
 * - An empty array returns [].
 *
 * Contract (TypeScript): export function mergeIntervals(intervals: [number, number][]): [number, number][]
 *
 * @param {[number, number][]} intervals
 * @returns {[number, number][]}
 */
export function mergeIntervals(intervals) {
  throw new Error("not implemented");
}
`;

const MERGE_TEST = `import test from "node:test";
import assert from "node:assert/strict";
import { mergeIntervals } from "./mergeIntervals.mjs";

test("overlapping intervals merge", () => {
  assert.deepEqual(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
});
test("adjacent intervals merge (touching endpoints)", () => {
  assert.deepEqual(mergeIntervals([[1, 2], [2, 3]]), [[1, 3]]);
});
test("nested interval absorbed", () => {
  assert.deepEqual(mergeIntervals([[1, 10], [3, 4]]), [[1, 10]]);
});
test("unsorted input is handled", () => {
  assert.deepEqual(mergeIntervals([[8, 10], [1, 3], [2, 6], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
});
test("empty returns empty", () => {
  assert.deepEqual(mergeIntervals([]), []);
});
test("single interval unchanged", () => {
  assert.deepEqual(mergeIntervals([[5, 7]]), [[5, 7]]);
});
`;

interface SliceSpec {
  readonly name: string;
  readonly ownedPath: string;
  readonly testPath: string;
  readonly exportName: string;
  readonly baseline: string;
  readonly testContent: string;
  readonly changeIntent: string;
  readonly proofRequirements: string[];
}

const CHUNK_SLICE: SliceSpec = {
  name: "chunk",
  ownedPath: CODE_OWNED,
  testPath: CODE_TEST,
  exportName: "chunk",
  baseline: CHUNK_BASELINE,
  testContent: CHUNK_TEST,
  changeIntent:
    "Implement the chunk() function in src/chunk.mjs exactly per its JSDoc contract: " +
    "split arr into consecutive subarrays of length size; the last chunk may be shorter; " +
    "size <= 0 throws a RangeError; an empty array returns []. Change ONLY this file.",
  proofRequirements: [
    "Produce a real owned diff with a hunk for src/chunk.mjs only.",
    "The provided test file src/chunk.test.mjs must pass for every case.",
    "Do not edit the test file or any other file.",
  ],
};

const MERGE_SLICE: SliceSpec = {
  name: "mergeIntervals",
  ownedPath: "src/mergeIntervals.mjs",
  testPath: "src/mergeIntervals.test.mjs",
  exportName: "mergeIntervals",
  baseline: MERGE_BASELINE,
  testContent: MERGE_TEST,
  changeIntent:
    "Implement mergeIntervals() in src/mergeIntervals.mjs per its JSDoc: merge all overlapping " +
    "AND adjacent intervals (touching endpoints like [1,2] and [2,3] merge into [1,3]); return the " +
    "result sorted by start; the input may be unsorted; an empty array returns []. Change ONLY this file.",
  proofRequirements: [
    "Produce a real owned diff with a hunk for src/mergeIntervals.mjs only.",
    "Every case in src/mergeIntervals.test.mjs must pass (overlap, adjacency, nested, unsorted, empty, single).",
    "Do not edit the test file or any other file.",
  ],
};

function makeSliceSandbox(slice: SliceSpec): string {
  const dir = mkdtempSync(join(tmpdir(), "wl-code-exec-"));
  run("git", ["init", "-q"], dir);
  run("git", ["config", "user.email", "harness@local"], dir);
  run("git", ["config", "user.name", "wl-free-exec-harness"], dir);
  mkdirSync(join(dir, "src"), { recursive: true });
  writeFileSync(join(dir, slice.ownedPath), slice.baseline, "utf8");
  writeFileSync(join(dir, slice.testPath), slice.testContent, "utf8");
  run("git", ["add", "-A"], dir);
  run("git", ["commit", "-q", "-m", `baseline ${slice.name} slice (unimplemented + oracle)`], dir);
  return dir;
}

function buildSliceScopePack(slice: SliceSpec): WriterLaneScopePack {
  return { ownedFiles: [slice.ownedPath], changeIntent: slice.changeIntent, proofRequirements: slice.proofRequirements };
}

function buildSliceCoderMessages(slice: SliceSpec, current: string): { system: string; user: string } {
  const system =
    "You are a precise software engineer. You edit a single source file. " +
    "You output ONLY the complete new contents of the file: no commentary, no markdown code fences.";
  const user = [
    `File path: ${slice.ownedPath}`,
    "",
    "Current file contents (between <<<FILE and FILE>>>):",
    "<<<FILE",
    current,
    "FILE>>>",
    "",
    `Task: ${slice.changeIntent}`,
    "",
    "Requirements:",
    ...slice.proofRequirements.map((r) => `- ${r}`),
    "",
    `Implement the function body so every behavior in the JSDoc holds. Keep the export name \`${slice.exportName}\`. ` +
      "Return ONLY the full new contents of the file. No code fences, no explanation.",
  ].join("\n");
  return { system, user };
}

function parseNodeTestCounts(output: string): { passed: number; failed: number } {
  const p = output.match(/^#\s*pass\s+(\d+)/m);
  const f = output.match(/^#\s*fail\s+(\d+)/m);
  return { passed: p ? Number(p[1]) : 0, failed: f ? Number(f[1]) : 0 };
}

// ---------------------------------------------------------------------------
// The REAL injected OpenHands runner.
//
// Per attempt: reset the sandbox to baseline, run OpenHands headless (uvx) with
// the OpenRouter key + the model's slug in the subprocess env only, then capture
// the TRUSTED worktree diff of the owned files (diffSource "worktree"). Returns
// fail-closed reasons so the backend's free-model chain can walk to the next
// candidate. Never throws for ordinary failure.
// ---------------------------------------------------------------------------
function makeOpenHandsRunner(sandbox: string, openRouterKey: string) {
  return async function runner(input: OpenHandsRunInput): Promise<OpenHandsRunResult> {
    // Each attempt starts from the committed baseline so the captured diff
    // reflects ONLY this model's edits.
    run("git", ["reset", "--hard", "-q"], sandbox);
    run("git", ["clean", "-fdq"], sandbox);

    const args = buildArgs(OPENHANDS_ARGS_TEMPLATE, input.prompt);
    const childEnv: NodeJS.ProcessEnv = {
      ...process.env,
      // OpenHands/litellm read these when invoked with --override-with-envs.
      LLM_API_KEY: openRouterKey, // [OpenRouter key] - never logged
      LLM_MODEL: `openrouter/${input.model.openRouterModel}`,
      LLM_BASE_URL: OPENROUTER_BASE_URL,
      OPENHANDS_TASK_PROMPT: input.prompt,
      // Keep OpenHands operating on the sandbox as its workspace.
      WORKSPACE_BASE: sandbox,
    };

    const proc = await runProcess(OPENHANDS_COMMAND, args, sandbox, childEnv, input.timeoutMs);
    if (!proc.ok) {
      return { ok: false, reason: "openhands_cli_failed", summary: tail(proc.output) };
    }

    const capture = captureOwnedWorktreeDiff(sandbox, input.scopePack.ownedFiles);
    if (!capture.ok) {
      return { ok: false, reason: capture.reason, summary: capture.detail };
    }
    if (!capture.patch.trim()) {
      return { ok: false, reason: "openhands_missing_unified_diff" };
    }

    return {
      ok: true,
      patch: capture.patch,
      changedFiles: capture.changedFiles,
      diffSource: "worktree", // the ONLY source the autonomy gate trusts
      summary: `captured git diff of owned files for ${input.model.openRouterModel}`,
    };
  };
}

// Mirrors captureOwnedWorktreeDiff in pinballwake-openhands-proof-runner.mjs:
// confirm every changed file is owned, capture the diff, then restore the
// worktree so it ends clean.
function captureOwnedWorktreeDiff(
  cwd: string,
  ownedFiles: string[],
): { ok: true; patch: string; changedFiles: string[] } | { ok: false; reason: string; detail?: string } {
  const owned = new Set(ownedFiles.map(normalizePath).filter(Boolean));
  const names = run("git", ["diff", "--name-only", "--"], cwd);
  if (!names.ok) return { ok: false, reason: "git_diff_name_only_failed", detail: tail(names.output) };
  const changed = names.stdout
    .split(/\r?\n/)
    .map(normalizePath)
    .filter(Boolean);
  if (changed.length === 0) return { ok: true, patch: "", changedFiles: [] };
  const outside = changed.filter((f) => !owned.has(f));
  if (outside.length) {
    return { ok: false, reason: "openhands_unowned_worktree_diff", detail: outside.join(", ") };
  }
  const diff = run("git", ["diff", "--", ...changed], cwd);
  if (!diff.ok) return { ok: false, reason: "git_diff_capture_failed", detail: tail(diff.output) };
  run("git", ["restore", "--worktree", "--", ...changed], cwd);
  return { ok: true, patch: diff.stdout, changedFiles: changed };
}

// Shared chat prompt: ask the model for the FULL new contents of the owned doc.
function buildWriterMessages(
  scopePack: WriterLaneScopePack,
  current: string,
): { system: string; user: string } {
  const system =
    "You are a precise technical-docs editor. You edit a single Markdown file. " +
    "You output ONLY the complete new contents of the file: no commentary, no code fences.";
  const user = [
    `File path: ${OWNED_DOC}`,
    "",
    "Current file contents (between <<<FILE and FILE>>>):",
    "<<<FILE",
    current,
    "FILE>>>",
    "",
    `Change to make: ${scopePack.changeIntent}`,
    "",
    "Requirements:",
    ...scopePack.proofRequirements.map((r) => `- ${r}`),
    "",
    "Return ONLY the full new file contents (Markdown). No code fences, no explanation.",
  ].join("\n");
  return { system, user };
}

// ---------------------------------------------------------------------------
// The REAL injected runner (direct OpenRouter free-model writer).
//
// Path of least resistance (no OpenHands/uvx): per attempt, reset the sandbox,
// ask the model (via OpenRouter chat-completions) for the FULL new contents of
// the owned doc, WRITE that to the owned file, then capture the trusted git diff
// of the owned files (diffSource "worktree"). We never pass model-emitted diff
// text straight through (that is the untrusted path the #1052 gate rejects); the
// patch always comes from a real `git diff` of files the model actually wrote.
// The OpenRouter key is used ONLY in the Authorization header, never logged.
// ---------------------------------------------------------------------------
function makeDirectOpenRouterRunner(sandbox: string, openRouterKey: string) {
  return async function runner(input: OpenHandsRunInput): Promise<OpenHandsRunResult> {
    run("git", ["reset", "--hard", "-q"], sandbox);
    run("git", ["clean", "-fdq"], sandbox);

    const docAbs = join(sandbox, OWNED_DOC);
    const current = readFileSync(docAbs, "utf8");
    const { system, user } = buildWriterMessages(input.scopePack, current);

    let content: string | null = null;
    let lastReason = "openrouter_rate_limited_429";
    let last429Detail = "";
    for (let attempt = 0; attempt <= MAX_429_RETRIES; attempt++) {
      if (attempt > 0) {
        const wait = BACKOFF_BASE_MS * attempt;
        console.log(`    429 on ${input.model.openRouterModel}; backoff ${wait}ms then retry ${attempt}/${MAX_429_RETRIES}`);
        await sleep(wait);
      }
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const resp = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openRouterKey}`, // [OpenRouter key] - never logged
            "Content-Type": "application/json",
            "X-Title": "unclick-wl-free-exec-harness",
          },
          body: JSON.stringify({
            model: input.model.openRouterModel,
            temperature: 0,
            max_tokens: 2000,
            messages: [
              { role: "system", content: system },
              { role: "user", content: user },
            ],
          }),
          signal: controller.signal,
        });
        if (resp.status === 429) {
          last429Detail = tail(await resp.text().catch(() => ""), 300);
          console.log(`    429 body from ${input.model.openRouterModel}: ${last429Detail || "(empty)"}`);
          lastReason = "openrouter_rate_limited_429";
          continue; // retry with backoff
        }
        if (!resp.ok) {
          const body = await resp.text().catch(() => "");
          return { ok: false, reason: `openrouter_http_${resp.status}`, summary: tail(body, 300) };
        }
        const data: any = await resp.json();
        if (data?.error) {
          return { ok: false, reason: "openrouter_error", summary: tail(String(data.error?.message ?? data.error), 300) };
        }
        const raw = data?.choices?.[0]?.message?.content;
        const text = Array.isArray(raw) ? raw.map((p: any) => p?.text ?? "").join("") : String(raw ?? "");
        if (!text.trim()) {
          return { ok: false, reason: "openrouter_no_usable_output" };
        }
        content = extractFileContent(text);
        break;
      } catch (e) {
        const aborted = e instanceof Error && e.name === "AbortError";
        return { ok: false, reason: aborted ? "openrouter_timeout" : "openrouter_request_failed" };
      } finally {
        clearTimeout(timer);
      }
    }
    if (content === null) {
      if (last429Detail) console.log(`    final 429 detail: ${last429Detail}`);
      return { ok: false, reason: lastReason }; // 429 persisted across all retries
    }

    writeFileSync(docAbs, content, "utf8");
    const capture = captureOwnedWorktreeDiff(sandbox, input.scopePack.ownedFiles);
    if (!capture.ok) {
      return { ok: false, reason: capture.reason, summary: capture.detail };
    }
    if (!capture.patch.trim()) {
      return { ok: false, reason: "model_made_no_change" };
    }
    return {
      ok: true,
      patch: capture.patch,
      changedFiles: capture.changedFiles,
      diffSource: "worktree", // the ONLY source the autonomy gate trusts
      summary: `direct openrouter writer: ${input.model.openRouterModel}`,
    };
  };
}

// Take the model's reply and yield file content: if it wrapped the file in a
// fenced block, use the first block's body; otherwise the whole reply. Ensure a
// single trailing newline so the captured diff stays clean.
function extractFileContent(raw: string): string {
  const fence = raw.match(/```[A-Za-z0-9_-]*\r?\n([\s\S]*?)```/);
  const body = (fence ? fence[1] : raw).replace(/\s+$/, "");
  return body + "\n";
}

// ---------------------------------------------------------------------------
// ScopePack + backend wiring.
// ---------------------------------------------------------------------------
function buildScopePack(): WriterLaneScopePack {
  return {
    ownedFiles: [OWNED_DOC],
    changeIntent:
      "Add a short '## Canary' section to docs/free-writer-canary.md (a few lines) " +
      "stating that the free-model writer successfully edited this owned docs file. " +
      "Change only this one file.",
    proofRequirements: [
      "Return a unified diff limited to docs/free-writer-canary.md.",
      "The diff must add at least one new line under a new '## Canary' heading.",
      "Do not touch any other file.",
    ],
  };
}

// ---------------------------------------------------------------------------
// Offline self-test: simulate a model editing the owned doc, then run the SAME
// trusted-capture -> #1052 gate path the real run uses. No network, no model.
// Confirms the rig (sandbox + git diff capture + autonomy gate) is sound, so a
// "harness ready" claim is backed by the gate actually accepting a real diff.
// ---------------------------------------------------------------------------
function runSelfTest(input: WriterLaneInput): boolean {
  const owned = input.scopePack.ownedFiles;
  const sandbox = makeSandbox();
  console.log(`selftest sandbox   : ${sandbox}`);

  // --- positive path: edit the OWNED file, capture, gate under autonomy ---
  const docPath = join(sandbox, OWNED_DOC);
  writeFileSync(
    docPath,
    readFileSync(docPath, "utf8") +
      "\n## Canary\n\nThe free-model writer successfully edited this owned docs file.\n(simulated edit - no model was called)\n",
    "utf8",
  );
  const capture = captureOwnedWorktreeDiff(sandbox, owned);
  if (!capture.ok) {
    console.log(`SELFTEST FAIL: capture rejected -> ${capture.reason} ${capture.detail ?? ""}`);
    return false;
  }
  const gate = gateOpenHandsDiff({
    result: { ok: true, patch: capture.patch, changedFiles: capture.changedFiles, diffSource: "worktree" },
    ownedFiles: owned,
    proofMode: "autonomy",
    prompt: "(selftest)",
    maxPatchBytes: MAX_PATCH_BYTES,
  });
  const positiveOk = gate.ok && gate.autonomyProof === true;
  console.log(`positive (owned worktree edit) : gate.ok=${gate.ok} autonomyProof=${gate.ok ? gate.autonomyProof : "n/a"}` + (gate.ok ? "" : ` reason=${gate.reason}`));

  // --- negative A: a valid owned patch but UNTRUSTED source must fail closed ---
  const untrusted = gateOpenHandsDiff({
    result: { ok: true, patch: capture.patch, changedFiles: capture.changedFiles, diffSource: "model_stdout" },
    ownedFiles: owned,
    proofMode: "autonomy",
    prompt: "(selftest)",
    maxPatchBytes: MAX_PATCH_BYTES,
  });
  const negAOk = !untrusted.ok && untrusted.reason === "openhands_untrusted_diff_source";
  console.log(`negative (model_stdout source) : rejected=${!untrusted.ok}` + (untrusted.ok ? "" : ` reason=${untrusted.reason}`));

  // --- negative B: a diff touching an UNOWNED file must fail closed ---
  const unownedPatch = capture.patch.replace(/free-writer-canary\.md/g, "secret-elsewhere.md");
  const unowned = gateOpenHandsDiff({
    result: { ok: true, patch: unownedPatch, diffSource: "worktree" },
    ownedFiles: owned,
    proofMode: "autonomy",
    prompt: "(selftest)",
    maxPatchBytes: MAX_PATCH_BYTES,
  });
  const negBOk = !unowned.ok && unowned.reason === "openhands_unowned_worktree_diff";
  console.log(`negative (unowned file diff)   : rejected=${!unowned.ok}` + (unowned.ok ? "" : ` reason=${unowned.reason}`));

  const allOk = positiveOk && negAOk && negBOk;
  console.log(`\nSELFTEST ${allOk ? "PASS" : "FAIL"}: rig capture+gate path is ${allOk ? "sound" : "BROKEN"}.`);
  if (positiveOk) {
    console.log("  --- captured patch (simulated) ---");
    console.log(capture.patch);
  }
  return allOk;
}

// ---------------------------------------------------------------------------
// Process + path helpers (shell:false, windowsHide).
// ---------------------------------------------------------------------------
function buildArgs(template: string, prompt: string): string[] {
  const parts = template.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [];
  return parts.map((p) => (p === "{prompt}" ? prompt : p.replace(/^["']|["']$/g, "")));
}

function normalizePath(v: string): string {
  return String(v ?? "").replace(/\\/g, "/").replace(/^\/+/, "").trim();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tail(s: string, n = 800): string {
  const t = String(s ?? "");
  return t.length > n ? t.slice(t.length - n) : t;
}

interface ProcResult {
  ok: boolean;
  code: number | null;
  stdout: string;
  stderr: string;
  output: string;
}

function spawnSyncCapture(cmd: string, args: string[]): ProcResult {
  const r = spawnSync(cmd, args, { encoding: "utf8", windowsHide: true, shell: false });
  const stdout = r.stdout ?? "";
  const stderr = r.stderr ?? "";
  return { ok: r.status === 0, code: r.status, stdout, stderr, output: `${stdout}\n${stderr}` };
}

// Synchronous git helper (sandbox setup + diff capture).
function run(cmd: string, args: string[], cwd: string): ProcResult {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", windowsHide: true, shell: false });
  const stdout = r.stdout ?? "";
  const stderr = r.stderr ?? "";
  return { ok: r.status === 0, code: r.status, stdout, stderr, output: `${stdout}\n${stderr}` };
}

// Async process with timeout (the OpenHands call).
function runProcess(
  cmd: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv,
  timeoutMs: number,
): Promise<ProcResult> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env, shell: false, windowsHide: true });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill("SIGTERM");
      resolve({ ok: false, code: null, stdout, stderr, output: `${stdout}\n${stderr}\nTIMEOUT ${timeoutMs}ms` });
    }, timeoutMs);
    child.stdout?.on("data", (c) => (stdout += c.toString()));
    child.stderr?.on("data", (c) => (stderr += c.toString()));
    child.on("error", (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ ok: false, code: null, stdout, stderr, output: `${stdout}\n${stderr}\n${e.message}` });
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ ok: code === 0, code, stdout, stderr, output: `${stdout}\n${stderr}` });
    });
    child.stdin?.end();
  });
}

// ---------------------------------------------------------------------------
// Comparison sweep: run each model independently through the same canary
// ScopePack + the #1052 gate. Reset between models; never stop at first success.
// ---------------------------------------------------------------------------
interface EndpointSpec {
  readonly label: string;
  readonly model: string; // id sent to the API
  readonly free: boolean;
  readonly baseUrl: string;
  readonly provider: "openrouter" | "deepseek";
  // Reasoning models (e.g. R1) spend completion budget on hidden reasoning before
  // the answer, so they need a larger cap or the file gets truncated.
  readonly maxTokens?: number;
}

interface CallResult {
  ok: boolean;
  content?: string;
  reason?: string;
  httpStatus?: number;
  latencyMs: number;
  retries: number;
  usage?: { p?: number; c?: number; t?: number };
  detail?: string;
}

interface SweepRow {
  label: string;
  model: string;
  free: boolean;
  pass: boolean;
  reason: string;
  latencyMs: number;
  retries: number;
  usage?: { p?: number; c?: number; t?: number };
  added: number;
  removed: number;
  hasCanary: boolean;
  chatter: boolean;
  diff: string;
}

function resolveRetryAfterMs(resp: Response, bodyText: string): number {
  let secs = 0;
  const h = resp.headers.get("retry-after");
  if (h && !Number.isNaN(Number(h))) secs = Number(h);
  if (!secs) {
    const m = bodyText.match(/"retry_after_seconds"\s*:\s*([0-9.]+)/);
    if (m) secs = Number(m[1]);
  }
  if (!secs) secs = 5;
  return Math.min(secs * 1000, MAX_RETRY_WAIT_MS) + 250 + Math.floor(Math.random() * 500);
}

function analyzeDiff(patch: string): { added: number; removed: number; hasCanary: boolean; chatter: boolean } {
  let added = 0;
  let removed = 0;
  let hasCanary = false;
  let chatter = false;
  for (const l of patch.split(/\r?\n/)) {
    if (l.startsWith("+++") || l.startsWith("---")) continue;
    if (l.startsWith("+")) {
      added++;
      const c = l.slice(1);
      if (/##\s*canary/i.test(c)) hasCanary = true;
      if (
        /```|<\/?(assistant|system|user|s)>|<\|/i.test(c) ||
        /\b(here is|here's|sure[,!]|i have|i've|as an ai|certainly|let me)\b/i.test(c)
      ) {
        chatter = true;
      }
    } else if (l.startsWith("-")) {
      removed++;
    }
  }
  return { added, removed, hasCanary, chatter };
}

async function callModel(ep: EndpointSpec, apiKey: string, system: string, user: string): Promise<CallResult> {
  let lastLatency = 0;
  let retries = 0;
  for (let attempt = 1; attempt <= SWEEP_429_MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const t0 = Date.now();
    try {
      const resp = await fetch(`${ep.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`, // key used ONLY here; never logged
          "Content-Type": "application/json",
          ...(ep.provider === "openrouter" ? { "X-Title": "unclick-wl-free-exec-harness" } : {}),
        },
        body: JSON.stringify({
          model: ep.model,
          temperature: 0,
          max_tokens: ep.maxTokens ?? 4096,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
        signal: controller.signal,
      });
      lastLatency = Date.now() - t0;
      const bodyText = await resp.text().catch(() => "");

      if (resp.status === 429) {
        if (attempt < SWEEP_429_MAX_ATTEMPTS) {
          const wait = resolveRetryAfterMs(resp, bodyText);
          retries++;
          console.log(`    [${ep.model}] 429 - honoring Retry-After ~${Math.round(wait / 1000)}s (attempt ${attempt}/${SWEEP_429_MAX_ATTEMPTS})`);
          clearTimeout(timer);
          await sleep(wait);
          continue;
        }
        return { ok: false, reason: "rate_limited_unavailable", httpStatus: 429, latencyMs: lastLatency, retries };
      }

      if (!resp.ok) {
        const lc = bodyText.toLowerCase();
        if (resp.status === 404 || (resp.status === 400 && /no endpoints|not found|not a valid model|invalid model|no allowed providers/.test(lc))) {
          return { ok: false, reason: "model_not_available", httpStatus: resp.status, latencyMs: lastLatency, retries, detail: tail(bodyText, 200) };
        }
        if (resp.status === 401 || resp.status === 402 || resp.status === 403 || /insufficient|credit|payment required|quota|billing/.test(lc)) {
          return { ok: false, reason: "paid_unavailable", httpStatus: resp.status, latencyMs: lastLatency, retries, detail: tail(bodyText, 200) };
        }
        return { ok: false, reason: `http_${resp.status}`, httpStatus: resp.status, latencyMs: lastLatency, retries, detail: tail(bodyText, 200) };
      }

      let data: any;
      try {
        data = JSON.parse(bodyText);
      } catch {
        return { ok: false, reason: "bad_json_response", latencyMs: lastLatency, retries };
      }
      if (data?.error) {
        const m = String(data.error?.message ?? data.error).toLowerCase();
        if (/insufficient|credit|payment|quota|billing/.test(m)) return { ok: false, reason: "paid_unavailable", latencyMs: lastLatency, retries, detail: tail(String(data.error?.message ?? ""), 200) };
        if (/not found|no endpoints|invalid model/.test(m)) return { ok: false, reason: "model_not_available", latencyMs: lastLatency, retries, detail: tail(String(data.error?.message ?? ""), 200) };
        return { ok: false, reason: "api_error", latencyMs: lastLatency, retries, detail: tail(String(data.error?.message ?? ""), 200) };
      }
      const u = data?.usage;
      const usage = u ? { p: u.prompt_tokens, c: u.completion_tokens, t: u.total_tokens } : undefined;
      const raw = data?.choices?.[0]?.message?.content;
      const text = Array.isArray(raw) ? raw.map((p: any) => p?.text ?? "").join("") : String(raw ?? "");
      if (!text.trim()) {
        return { ok: false, reason: "no_usable_output", latencyMs: lastLatency, retries, usage };
      }
      return { ok: true, content: extractFileContent(text), latencyMs: lastLatency, retries, usage };
    } catch (e) {
      const aborted = e instanceof Error && e.name === "AbortError";
      return { ok: false, reason: aborted ? "timeout" : "request_failed", latencyMs: Date.now() - t0, retries };
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, reason: "rate_limited_unavailable", latencyMs: lastLatency, retries };
}

async function runSweep(): Promise<void> {
  const scopePack = buildScopePack();
  const orKey = loadOpenRouterKey();
  const dsKey = loadKeyByLabel("deepseek");

  const freeSlugs = [
    "poolside/laguna-m.1:free",
    "qwen/qwen3-coder:free",
    "deepseek/deepseek-v4-flash:free",
    "openai/gpt-oss-120b:free",
    "z-ai/glm-4.5-air:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-4-31b-it:free",
    "minimax/minimax-m2.5:free",
    "poolside/laguna-xs.2:free",
  ];

  const jobs: Array<{ ep: EndpointSpec; apiKey: string | null }> = freeSlugs.map((slug) => ({
    ep: { label: slug, model: slug, free: true, baseUrl: OPENROUTER_BASE_URL, provider: "openrouter" },
    apiKey: orKey.value,
  }));

  // Paid benchmark: prefer a direct DeepSeek key; else paid model via OpenRouter.
  if (dsKey) {
    jobs.push({
      ep: { label: "deepseek-chat (PAID, direct DeepSeek API)", model: "deepseek-chat", free: false, baseUrl: "https://api.deepseek.com", provider: "deepseek" },
      apiKey: dsKey,
    });
  } else {
    jobs.push({
      ep: { label: "deepseek/deepseek-chat (PAID, via OpenRouter credits)", model: "deepseek/deepseek-chat", free: false, baseUrl: OPENROUTER_BASE_URL, provider: "openrouter" },
      apiKey: orKey.value,
    });
  }

  console.log("=== WriterLane free-model COMPARISON SWEEP (#1052 gate) ===");
  console.log(`proofMode          : autonomy   gate: gateOpenHandsDiff() from openhands-backend.ts (#1052)`);
  console.log(`OpenRouter key     : ${orKey.present ? "PRESENT (withheld)" : "MISSING"}`);
  console.log(`DeepSeek direct key: ${dsKey ? "PRESENT (withheld)" : "absent -> paid via OpenRouter"}`);
  console.log(`429 policy         : honor Retry-After, up to ${SWEEP_429_MAX_ATTEMPTS} attempts, then rate_limited_unavailable`);
  console.log(`models             : ${jobs.length} (${freeSlugs.length} free + 1 paid benchmark)\n`);

  const sandbox = makeSandbox();
  console.log(`sandbox            : ${sandbox}\n`);

  const rows: SweepRow[] = [];
  for (const { ep, apiKey } of jobs) {
    run("git", ["reset", "--hard", "-q"], sandbox);
    run("git", ["clean", "-fdq"], sandbox);
    process.stdout.write(`-> ${ep.label} ... `);

    const base: SweepRow = {
      label: ep.label, model: ep.model, free: ep.free, pass: false, reason: "", latencyMs: 0,
      retries: 0, usage: undefined, added: 0, removed: 0, hasCanary: false, chatter: false, diff: "",
    };

    if (!apiKey) {
      rows.push({ ...base, reason: ep.free ? "no_openrouter_key" : "paid_unavailable" });
      console.log(base.reason);
      continue;
    }

    const current = readFileSync(join(sandbox, OWNED_DOC), "utf8");
    const { system, user } = buildWriterMessages(scopePack, current);
    const res = await callModel(ep, apiKey, system, user);
    base.latencyMs = res.latencyMs;
    base.retries = res.retries;
    base.usage = res.usage;

    if (!res.ok) {
      rows.push({ ...base, reason: res.reason ?? "unknown_error" });
      console.log(`${res.reason}${res.detail ? " (" + res.detail.replace(/\s+/g, " ").slice(0, 120) + ")" : ""}`);
      continue;
    }

    writeFileSync(join(sandbox, OWNED_DOC), res.content as string, "utf8");
    const cap = captureOwnedWorktreeDiff(sandbox, scopePack.ownedFiles);
    if (!cap.ok) {
      rows.push({ ...base, reason: cap.reason });
      console.log(`gate-pre-fail: ${cap.reason}`);
      continue;
    }
    if (!cap.patch.trim()) {
      rows.push({ ...base, reason: "model_made_no_change" });
      console.log("model_made_no_change");
      continue;
    }
    const gate = gateOpenHandsDiff({
      result: { ok: true, patch: cap.patch, changedFiles: cap.changedFiles, diffSource: "worktree" },
      ownedFiles: scopePack.ownedFiles,
      proofMode: "autonomy",
      prompt: user,
      maxPatchBytes: MAX_PATCH_BYTES,
    });
    const q = analyzeDiff(cap.patch);
    const pass = gate.ok && gate.autonomyProof === true;
    rows.push({
      ...base,
      pass,
      reason: pass ? "" : gate.ok ? "no_autonomy_proof" : gate.reason,
      added: q.added, removed: q.removed, hasCanary: q.hasCanary, chatter: q.chatter,
      diff: cap.patch,
    });
    console.log(`${pass ? "PASS" : "fail:" + (gate.ok ? "no_autonomy" : gate.reason)} (${res.latencyMs}ms, +${q.added}/-${q.removed})`);
  }

  // ---- summary table ----
  console.log("\n=== SWEEP RESULTS ===");
  const fmtUsage = (u?: { p?: number; c?: number; t?: number }) =>
    u && (u.p ?? u.c ?? u.t) !== undefined ? `${u.p ?? "?"}/${u.c ?? "?"}/${u.t ?? "?"}` : "-";
  for (const r of rows) {
    console.log(
      `${r.pass ? "PASS" : "FAIL"} | ${r.free ? "free" : "PAID"} | ${r.model}\n` +
        `      gate=${r.pass ? "autonomyProof=true" : r.reason} | latency=${r.latencyMs}ms | tokens(p/c/t)=${fmtUsage(r.usage)} | retries=${r.retries}` +
        (r.pass || r.added || r.removed ? ` | +${r.added}/-${r.removed} canary=${r.hasCanary} chatter=${r.chatter}` : ""),
    );
  }

  // ---- diffs for passing models ----
  console.log("\n=== DIFFS (passing models) ===");
  for (const r of rows.filter((x) => x.pass)) {
    console.log(`--- ${r.model} ---`);
    console.log(r.diff.trimEnd());
    console.log("");
  }

  // ---- machine-readable dump (for the report) ----
  console.log("=== JSON ===");
  console.log(JSON.stringify(rows.map(({ diff, ...rest }) => ({ ...rest, diffLines: diff ? diff.split(/\r?\n/).length : 0 })), null, 0));
}

// ---------------------------------------------------------------------------
// Code-slice sweep: the meaningful bar. Success requires BOTH the #1052 gate to
// pass (owned-only, real diff) AND the provided test oracle to pass (the code
// actually works). Tests run in a child process with a timeout so an infinite
// loop cannot stall the sweep.
// ---------------------------------------------------------------------------
interface CodeRow {
  label: string;
  model: string;
  free: boolean;
  testPass: boolean;
  gatePass: boolean;
  reason: string;
  latencyMs: number;
  retries: number;
  usage?: { p?: number; c?: number; t?: number };
  added: number;
  removed: number;
  chatter: boolean;
  testsPassed: number;
  testsFailed: number;
  diff: string;
}

function buildOpenRouterJob(slug: string, orKeyValue: string | null, maxTokens?: number): { ep: EndpointSpec; apiKey: string | null } {
  return { ep: { label: slug, model: slug, free: slug.endsWith(":free"), baseUrl: OPENROUTER_BASE_URL, provider: "openrouter", maxTokens }, apiKey: orKeyValue };
}

async function runSliceSweep(slice: SliceSpec, jobs: Array<{ ep: EndpointSpec; apiKey: string | null }>): Promise<void> {
  const scopePack = buildSliceScopePack(slice);

  console.log(`=== WriterLane CODE-SLICE SWEEP: ${slice.name}() (#1052 gate + working-code oracle) ===`);
  console.log(`owned file         : ${slice.ownedPath}   test oracle (not owned): ${slice.testPath}`);
  console.log(`success            : gate pass (owned diff + hunk) AND all provided tests pass`);
  console.log(`429 policy         : honor Retry-After, up to ${SWEEP_429_MAX_ATTEMPTS} attempts; test timeout ${TEST_TIMEOUT_MS}ms`);
  console.log(`models             : ${jobs.length}\n`);

  const sandbox = makeSliceSandbox(slice);
  console.log(`sandbox            : ${sandbox}\n`);

  const rows: CodeRow[] = [];
  for (const { ep, apiKey } of jobs) {
    run("git", ["reset", "--hard", "-q"], sandbox);
    run("git", ["clean", "-fdq"], sandbox);
    process.stdout.write(`-> ${ep.label} ... `);

    const base: CodeRow = {
      label: ep.label, model: ep.model, free: ep.free, testPass: false, gatePass: false, reason: "",
      latencyMs: 0, retries: 0, usage: undefined, added: 0, removed: 0, chatter: false,
      testsPassed: 0, testsFailed: 0, diff: "",
    };

    if (!apiKey) {
      rows.push({ ...base, reason: ep.free ? "no_openrouter_key" : "paid_unavailable" });
      console.log(base.reason);
      continue;
    }

    const current = readFileSync(join(sandbox, slice.ownedPath), "utf8");
    const { system, user } = buildSliceCoderMessages(slice, current);
    const res = await callModel(ep, apiKey, system, user);
    base.latencyMs = res.latencyMs;
    base.retries = res.retries;
    base.usage = res.usage;
    if (!res.ok) {
      // For paid benchmarks, an unavailable slug or no credits both surface as
      // paid_unavailable (per the brief); keep transient rate limits distinct.
      let reason = res.reason ?? "unknown_error";
      if (!ep.free && (reason === "model_not_available" || reason === "paid_unavailable")) {
        reason = "paid_unavailable";
      }
      rows.push({ ...base, reason });
      console.log(reason + (res.detail ? ` :: ${res.detail.replace(/\s+/g, " ").slice(0, 200)}` : ""));
      continue;
    }

    // Write the model's implementation, THEN run the oracle (file in place),
    // THEN capture the owned diff for the gate (the capture reverts the file).
    writeFileSync(join(sandbox, slice.ownedPath), res.content as string, "utf8");
    const t = await runProcess("node", ["--test", "--test-reporter=tap", slice.testPath], sandbox, process.env, TEST_TIMEOUT_MS);
    const timedOut = !t.ok && t.code === null && /TIMEOUT/.test(t.output);
    const counts = parseNodeTestCounts(t.output);
    // Exit code is authoritative (node --test exits non-zero on any failure or a
    // load-time throw); counts are for display.
    const testPass = t.ok && !timedOut;

    const cap = captureOwnedWorktreeDiff(sandbox, scopePack.ownedFiles);
    let gatePass = false;
    let gateReason = "";
    let diff = "";
    if (cap.ok && cap.patch.trim()) {
      const gate = gateOpenHandsDiff({
        result: { ok: true, patch: cap.patch, changedFiles: cap.changedFiles, diffSource: "worktree" },
        ownedFiles: scopePack.ownedFiles,
        proofMode: "autonomy",
        prompt: user,
        maxPatchBytes: MAX_PATCH_BYTES,
      });
      gatePass = gate.ok && gate.autonomyProof === true;
      gateReason = gatePass ? "" : gate.ok ? "no_autonomy_proof" : gate.reason;
      diff = cap.patch;
    } else {
      gateReason = cap.ok ? "model_made_no_change" : cap.reason;
    }
    const q = analyzeDiff(diff || "");
    const reason = testPass
      ? gatePass
        ? ""
        : `gate_fail:${gateReason}`
      : timedOut
        ? "test_timeout_or_infinite_loop"
        : counts.passed + counts.failed > 0
          ? `tests_failed(${counts.failed}/${counts.passed + counts.failed})`
          : "tests_errored";

    rows.push({
      ...base, testPass, gatePass, reason,
      added: q.added, removed: q.removed, chatter: q.chatter,
      testsPassed: counts.passed, testsFailed: counts.failed, diff,
    });
    const verdict = testPass && gatePass ? "SUCCESS" : testPass ? "tests-ok/gate-fail" : `FAIL(${reason})`;
    console.log(`${verdict} [tests ${counts.passed}/${counts.passed + counts.failed}, gate=${gatePass}, ${res.latencyMs}ms]`);
  }

  // ---- summary ----
  console.log("\n=== CODE-SLICE RESULTS ===");
  const fmtUsage = (u?: { p?: number; c?: number; t?: number }) =>
    u && (u.p ?? u.c ?? u.t) !== undefined ? `${u.p ?? "?"}/${u.c ?? "?"}/${u.t ?? "?"}` : "-";
  for (const r of rows) {
    const ok = r.testPass && r.gatePass;
    console.log(
      `${ok ? "SUCCESS" : "FAIL  "} | ${r.free ? "free" : "PAID"} | ${r.model}\n` +
        `      tests=${r.testsPassed}/${r.testsPassed + r.testsFailed} pass | gate=${r.gatePass} | ${r.reason || "all good"} | ${r.latencyMs}ms | tok=${fmtUsage(r.usage)} | retries=${r.retries} | +${r.added}/-${r.removed} chatter=${r.chatter}`,
    );
  }

  console.log("\n=== WINNING / NOTABLE DIFFS ===");
  for (const r of rows.filter((x) => x.diff)) {
    const tag = r.testPass && r.gatePass ? "WORKS" : r.testPass ? "tests-ok" : "broken/tests-fail";
    console.log(`--- [${tag}] ${r.model} (tests ${r.testsPassed}/${r.testsPassed + r.testsFailed}) ---`);
    console.log(r.diff.trimEnd());
    console.log("");
  }

  console.log("=== JSON ===");
  console.log(JSON.stringify(rows.map(({ diff, ...rest }) => ({ ...rest, diffLines: diff ? diff.split(/\r?\n/).length : 0 })), null, 0));
}

// chunk slice: free registry + both paid DeepSeek variants.
async function runCodeSweep(): Promise<void> {
  const orKey = loadOpenRouterKey();
  const dsKey = loadKeyByLabel("deepseek");
  const freeSlugs = [
    "z-ai/glm-4.5-air:free",
    "openai/gpt-oss-120b:free",
    "minimax/minimax-m2.5:free",
    "poolside/laguna-m.1:free",
    "poolside/laguna-xs.2:free",
    "qwen/qwen3-coder:free",
    "deepseek/deepseek-v4-flash:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-4-31b-it:free",
  ];
  const jobs = freeSlugs.map((s) => buildOpenRouterJob(s, orKey.value));
  if (dsKey) {
    jobs.push({ ep: { label: "deepseek-chat (PAID V-series, direct DeepSeek API)", model: "deepseek-chat", free: false, baseUrl: "https://api.deepseek.com", provider: "deepseek" }, apiKey: dsKey });
    jobs.push({ ep: { label: "deepseek-reasoner (PAID R1, direct DeepSeek API)", model: "deepseek-reasoner", free: false, baseUrl: "https://api.deepseek.com", provider: "deepseek", maxTokens: 8000 }, apiKey: dsKey });
  } else {
    jobs.push(buildOpenRouterJob("deepseek/deepseek-chat", orKey.value));
    jobs.push(buildOpenRouterJob("deepseek/deepseek-r1", orKey.value, 8000));
  }
  await runSliceSweep(CHUNK_SLICE, jobs);
}

// mergeIntervals slice: the model list comes from HARNESS_MODELS (set after the
// --models availability check). Free, via OpenRouter.
async function runMergeSweep(): Promise<void> {
  const orKey = loadOpenRouterKey();
  const jobs = MERGE_MODELS.map((s) => buildOpenRouterJob(s, orKey.value, s.includes("r1") || s.includes("reason") ? 8000 : undefined));
  console.log(`merge model set    : ${MERGE_MODELS.join(", ")}\n`);
  await runSliceSweep(MERGE_SLICE, jobs);
}

// ---------------------------------------------------------------------------
// PART 1: OpenRouter availability check. Query the live models list, report which
// candidate families have a 100%-free variant, then test-ping each to confirm it
// answers (200) / is throttled (429) / unavailable (404) / needs credits (402).
// ---------------------------------------------------------------------------
async function pingModel(slug: string, key: string): Promise<string> {
  try {
    const resp = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Title": "unclick-wl-free-exec-harness" },
      body: JSON.stringify({ model: slug, max_tokens: 1, messages: [{ role: "user", content: "hi" }] }),
    });
    if (resp.ok) return "ok (200, free-available)";
    if (resp.status === 429) return "429 (free-available, just throttled)";
    if (resp.status === 404) return "404 (not available)";
    if (resp.status === 402) return "402 (needs credits / not free)";
    const body = await resp.text().catch(() => "");
    return `http_${resp.status} (${tail(body, 100).replace(/\s+/g, " ")})`;
  } catch {
    return "request_failed";
  }
}

async function runModelsCheck(): Promise<void> {
  const orKey = loadOpenRouterKey();
  if (!orKey.present || !orKey.value) {
    console.error("no OpenRouter key found; cannot query models list");
    process.exitCode = 2;
    return;
  }
  const resp = await fetch(`${OPENROUTER_BASE_URL}/models`, { headers: { Authorization: `Bearer ${orKey.value}` } });
  if (!resp.ok) {
    console.error(`models list HTTP ${resp.status}`);
    process.exitCode = 1;
    return;
  }
  const data: any = await resp.json();
  const models: any[] = Array.isArray(data?.data) ? data.data : [];
  const isFree = (m: any) =>
    String(m?.id ?? "").endsWith(":free") ||
    (m?.pricing && Number(m.pricing.prompt) === 0 && Number(m.pricing.completion) === 0);
  const freeIds = models.filter(isFree).map((m) => String(m.id)).sort();

  const families: Array<{ name: string; re: RegExp }> = [
    { name: "qwen3-coder / qwen3-coder-next", re: /qwen3-coder/i },
    { name: "qwen3-next (e.g. qwen3-next-80b-a3b-instruct)", re: /qwen3-next/i },
    { name: "deepseek (looking for v3.2 / v4-flash)", re: /deepseek/i },
    { name: "moonshot Kimi (K2 / K2.5)", re: /kimi|moonshot/i },
    { name: "z-ai GLM newer coding (glm-4.6 / 4.7 / air)", re: /glm-4\.[5-9]/i },
  ];

  console.log("=== PART 1: OpenRouter free-availability check ===");
  console.log(`total models in list: ${models.length}; free variants: ${freeIds.length}\n`);
  const toPing = new Set<string>();
  for (const fam of families) {
    const hits = freeIds.filter((id) => fam.re.test(id));
    console.log(`${fam.name}:`);
    if (hits.length === 0) {
      console.log("   (no 100%-free variant in the live models list)");
    } else {
      for (const id of hits) {
        console.log(`   - ${id}`);
        toPing.add(id);
      }
    }
  }

  console.log("\n--- test pings (max_tokens=1; confirms not 402/404) ---");
  for (const slug of [...toPing].sort()) {
    console.log(`   ${slug}: ${await pingModel(slug, orKey.value)}`);
  }
}

// ---------------------------------------------------------------------------
// Main.
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  if (MODELS_CHECK) {
    await runModelsCheck();
    return;
  }
  if (MERGE) {
    await runMergeSweep();
    return;
  }
  if (CODE) {
    await runCodeSweep();
    return;
  }
  if (SWEEP) {
    await runSweep();
    return;
  }

  const scopePack = buildScopePack();
  const input: WriterLaneInput = { scopePack, proofMode: "autonomy" };
  const taskKind = inferWriterLaneTaskKind(input);
  const effectiveModels = ONLY_MODEL
    ? WRITERLANE_FREE_MODELS.filter((m) => m.openRouterModel === ONLY_MODEL)
    : WRITERLANE_FREE_MODELS;
  const order = rankFreeModelsForTask(taskKind, effectiveModels);

  const key = loadOpenRouterKey();
  const uvxPresent = commandExists(OPENHANDS_COMMAND);

  console.log("=== WriterLane free-model controlled-execute harness (#1052) ===");
  console.log(`mode               : ${GO ? "GO (will fire real model calls)" : "DRY readiness check (no model call)"}`);
  console.log(`backend            : OpenHandsWriterLaneBackend { enabled: true }`);
  console.log(`proofMode          : ${input.proofMode}`);
  console.log(`inferred taskKind  : ${taskKind}`);
  console.log(`OpenRouter key     : ${key.present ? "PRESENT (value withheld)" : "MISSING"}`);
  console.log(`runner             : direct OpenRouter chat-completions (${OPENROUTER_BASE_URL})`);
  console.log(`request timeout    : ${REQUEST_TIMEOUT_MS} ms/model`);
  console.log(`model filter       : ${ONLY_MODEL ? ONLY_MODEL + " (forced single model)" : "full fallback chain"}`);
  console.log(`429 retries        : up to ${MAX_429_RETRIES}, backoff ${BACKOFF_BASE_MS}ms x attempt`);
  void uvxPresent;
  void OPENHANDS_COMMAND;
  void OPENHANDS_ARGS_TEMPLATE;
  console.log("");
  console.log("ScopePack:");
  console.log(`  ownedFiles        : ${JSON.stringify(scopePack.ownedFiles)}`);
  console.log(`  changeIntent      : ${scopePack.changeIntent}`);
  console.log(`  proofRequirements :`);
  for (const r of scopePack.proofRequirements) console.log(`    - ${r}`);
  console.log("");
  console.log("Candidate model order (qwen-coder first):");
  order.forEach((m, i) =>
    console.log(`  ${String(i + 1).padStart(2)}. ${m.id.padEnd(22)} ${m.openRouterModel}  [prio ${m.priority ?? 0}, ${m.status}]`),
  );
  console.log("");

  if (SELFTEST) {
    console.log("SELFTEST mode: simulating a model edit; no network, no model call.\n");
    const ok = runSelfTest(input);
    process.exitCode = ok ? 0 : 1;
    return;
  }

  if (!GO) {
    console.log("DRY mode: no model was called. Re-run with --go to fire real calls.");
    console.log(`Prereqs -> key: ${key.present ? "y" : "n"} | uvx: ${uvxPresent ? "y" : "n"}`);
    return;
  }

  // --go path: only the key is required for the direct OpenRouter writer.
  if (!key.present) {
    console.error("REFUSING: no OpenRouter key found in credentials file. Nothing was called.");
    process.exitCode = 2;
    return;
  }

  if (ONLY_MODEL && effectiveModels.length === 0) {
    console.error(`REFUSING: forced model '${ONLY_MODEL}' is not in the WriterLane free-model registry. Nothing was called.`);
    process.exitCode = 2;
    return;
  }

  const sandbox = makeSandbox();
  console.log(`sandbox            : ${sandbox}`);
  const runner = makeDirectOpenRouterRunner(sandbox, key.value as string);
  const backend = createOpenHandsWriterLaneBackend({
    runner,
    enabled: true,
    ...(ONLY_MODEL ? { models: effectiveModels } : {}),
  });

  console.log("Walking the free-model chain via the #1052 backend...\n");
  const outcome = await backend.runChain(input);

  console.log("=== ATTEMPTS ===");
  for (const a of outcome.attempts) {
    console.log(`  ${a.ok ? "PASS" : "fail"}  ${a.modelId.padEnd(22)} ${a.openRouterModel}  ${a.ok ? "" : "-> " + a.reason}`);
  }
  console.log("\n=== RESULT ===");
  if (outcome.result.ok) {
    console.log(`SUCCESS: free model produced a trusted, owned diff.`);
    console.log(`  autonomyProof : ${outcome.result.proof.autonomyProof}`);
    console.log(`  changedFiles  : ${JSON.stringify(outcome.result.changedFiles)}`);
    console.log(`  notes         : ${outcome.result.proof.notes ?? ""}`);
    console.log("  --- captured patch ---");
    console.log(outcome.result.patch);
  } else {
    console.log(`FAILED CLOSED: ${outcome.result.reason}`);
  }
}

main().catch((e) => {
  // Never leak env/key in error output.
  console.error("harness error:", e instanceof Error ? e.message : String(e));
  process.exitCode = 1;
});

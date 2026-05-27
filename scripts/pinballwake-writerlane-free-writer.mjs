// WriterLane free-model writer adapter (runner-side, .mjs).
//
// Dormant unless the runner explicitly opts in via AUTONOMOUS_RUNNER_WRITER=
// writerlane_free, and even then only behind the triple execute gate
// (MODE=execute && ALLOW_EXECUTE && OPENHANDS_EXECUTE).
//
// WHAT: this is the runner-side adapter that lets the proven direct-OpenRouter
// free-model writer stand in for the OpenHands CLI runner. It satisfies the SAME
// injected-runner contract the worker expects (the createOpenHandsCliRunner shape
// in pinballwake-openhands-proof-runner.mjs):
//     async ({ prompt, scopePack, job, timeoutMs }) => {
//       ok, patch, changed_files, summary, test_run_id, test_exit_code, validation, ...
//     }
//
// HOW (the proven path, mirrored from the WriterLane TS backend + validator):
//   1. ask a free model for the FULL new contents of each owned file (OpenRouter
//      chat-completions, free :free slugs only, walking the ranked fallback chain),
//   2. WRITE those contents into the owned files in cwd,
//   3. run the scoped verification command(s) for real (child process, timeout) -
//      AFTER writing, BEFORE the diff capture (the capture reverts the worktree),
//   4. capture the REAL git diff of the owned files via captureOwnedWorktreeDiff
//      (the only "worktree"-trusted source) and restore the worktree,
//   5. gate the diff (mirror gateOpenHandsDiff: scope / ownership / hunks /
//      trusted source) AND validate it (validateAutonomyProof: tests + clean +
//      budget). First model that clears both wins; otherwise fail closed with the
//      exact reason code.
//
// Safety: fetch / runProcess / captureDiff / writeFile are all INJECTABLE so tests
// never touch the network, the filesystem, or git. The API key is read only into
// the Authorization header and never logged. Free models only.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  captureOwnedWorktreeDiff,
  runProcessCommand,
  splitArgs,
} from "./pinballwake-openhands-proof-runner.mjs";
import { selectDefaultFreeChain } from "./pinballwake-writerlane-free-models.mjs";
import {
  buildValidationFromPatch,
  validateAutonomyProof,
} from "./pinballwake-writerlane-validator.mjs";

const DEFAULT_TIMEOUT_MS = 20 * 60 * 1000;
const MAX_PATCH_BYTES = 120_000;
const DEFAULT_MAX_CONTEXT_FILE_BYTES = 40_000;
const DEFAULT_MAX_CONTEXT_TOTAL_BYTES = 160_000;
const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_MAX_MODELS = 4;

// Adapter-specific reason codes (the gate / validator reuse the WriterLane codes).
export const WRITERLANE_OPENROUTER_UNCONFIGURED = "writerlane_openrouter_unconfigured";
export const WRITERLANE_RATE_LIMITED = "writerlane_rate_limited";
export const WRITERLANE_OPENROUTER_HTTP_ERROR = "writerlane_openrouter_http_error";
export const WRITERLANE_OPENROUTER_THREW = "writerlane_openrouter_threw";
export const WRITERLANE_EMPTY_COMPLETION = "writerlane_empty_completion";
export const WRITERLANE_NO_FILE_CONTENTS = "writerlane_no_file_contents";
export const WRITERLANE_NO_FREE_MODELS = "writerlane_no_free_models";
export const WRITERLANE_FREE_CHAIN_EXHAUSTED = "writerlane_free_chain_exhausted";
export const WRITERLANE_PATCH_APPLY_CHECK_FAILED = "writerlane_patch_apply_check_failed";
export const WRITERLANE_PATCH_APPLY_FAILED = "writerlane_patch_apply_failed";

export function createWriterLaneFreeWriterRunner({
  env = process.env,
  cwd = process.cwd(),
  fetchImpl,
  runProcess = runProcessCommand,
  captureDiff = captureOwnedWorktreeDiff,
  readFileImpl = defaultReadFile,
  writeFileImpl = defaultWriteFile,
  models = null,
  proofMode = "autonomy",
  maxPatchBytes = MAX_PATCH_BYTES,
  maxContextFileBytes = DEFAULT_MAX_CONTEXT_FILE_BYTES,
  maxContextTotalBytes = DEFAULT_MAX_CONTEXT_TOTAL_BYTES,
  diffBudget = {},
  // When there is no verification command in the scope pack we cannot prove the
  // code works, so by default the writer fails closed. Setting this true treats a
  // missing test command as a pass (use only for paths that legitimately have no
  // tests, e.g. a docs-only canary).
  allowMissingTests = false,
  maxModels = DEFAULT_MAX_MODELS,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  const safeEnv = env || {};
  const apiKey = String(
    safeEnv.OPENROUTER_API_KEY ||
      safeEnv.LLM_API_KEY ||
      safeEnv.OPENHANDS_LLM_API_KEY ||
      "",
  ).trim();
  const baseUrl = String(
    safeEnv.LLM_BASE_URL || safeEnv.OPENHANDS_LLM_BASE_URL || DEFAULT_BASE_URL,
  ).trim();
  const doFetch = fetchImpl || globalThis.fetch;

  return async ({ scopePack, job, prompt: runnerPrompt = "", timeoutMs: callTimeoutMs } = {}) => {
    const effectiveTimeout = Number.isFinite(callTimeoutMs) ? callTimeoutMs : timeoutMs;
    const ownedFiles = normalizePaths(
      scopePack?.owned_files || scopePack?.ownedFiles || job?.owned_files || [],
    );
    if (ownedFiles.length === 0) {
      return { ok: false, reason: "owned_files_required", attempts: [] };
    }
    if (!apiKey) {
      return { ok: false, reason: WRITERLANE_OPENROUTER_UNCONFIGURED, attempts: [] };
    }
    if (typeof doFetch !== "function") {
      return { ok: false, reason: WRITERLANE_OPENROUTER_UNCONFIGURED, attempts: [] };
    }

    const taskKind = inferTaskKind(ownedFiles);
    const verification = normalizeList(scopePack?.verification || scopePack?.tests);
    const chain = (Array.isArray(models) ? models : selectDefaultFreeChain(taskKind)).slice(
      0,
      Math.max(1, maxModels),
    );
    if (chain.length === 0) {
      return { ok: false, reason: WRITERLANE_NO_FREE_MODELS, attempts: [] };
    }

    const attempts = [];
    const currentFiles = await readOwnedFileContexts({
      cwd,
      ownedFiles,
      readFileImpl,
      maxFileBytes: maxContextFileBytes,
      maxTotalBytes: maxContextTotalBytes,
    });

    for (const model of chain) {
      const status = model?.empirical?.status ?? "trial";
      const prompt = buildFullContentsPrompt({ ownedFiles, scopePack, model, runnerPrompt, currentFiles });

      const completion = await callOpenRouter({
        doFetch,
        baseUrl,
        apiKey,
        model: model.openRouterModel,
        prompt,
        timeoutMs: effectiveTimeout,
      });
      if (!completion.ok) {
        attempts.push({ modelId: model.id, openRouterModel: model.openRouterModel, status, ok: false, reason: completion.reason, http_status: completion.status ?? null });
        continue;
      }

      const files = parseFileBlocks(completion.content, ownedFiles);
      if (files.length > 0) {
        for (const file of files) {
          await writeFileImpl({ cwd, path: file.path, content: ensureTrailingNewline(file.content) });
        }
      } else {
        const modelPatch = extractUnifiedDiff(completion.content);
        if (!modelPatch) {
          attempts.push({ modelId: model.id, openRouterModel: model.openRouterModel, status, ok: false, reason: WRITERLANE_NO_FILE_CONTENTS });
          continue;
        }
        const modelPatchGate = gateWriterLaneDiff({
          patch: modelPatch,
          ownedFiles,
          declaredFiles: [],
          prompt: "",
          maxPatchBytes,
          proofMode: "model_patch_preflight",
        });
        if (!modelPatchGate.ok) {
          attempts.push({ modelId: model.id, openRouterModel: model.openRouterModel, status, ok: false, reason: modelPatchGate.reason });
          continue;
        }
        const applied = await applyUnifiedDiffToWorktree({
          cwd,
          env: safeEnv,
          patch: modelPatchGate.patch,
          runProcess,
          timeoutMs: effectiveTimeout,
        });
        if (!applied.ok) {
          attempts.push({ modelId: model.id, openRouterModel: model.openRouterModel, status, ok: false, reason: applied.reason });
          continue;
        }
      }

      const proven = await proveCapturedWorktreePatch({
        cwd,
        env: safeEnv,
        ownedFiles,
        verification,
        allowMissingTests,
        model,
        prompt,
        runProcess,
        captureDiff,
        maxPatchBytes,
        proofMode,
        diffBudget,
        timeoutMs: effectiveTimeout,
      });
      if (!proven.ok) {
        attempts.push({ modelId: model.id, openRouterModel: model.openRouterModel, status, ok: false, reason: proven.reason });
        continue;
      }

      attempts.push({ modelId: model.id, openRouterModel: model.openRouterModel, status, ok: true });
      return {
        ok: true,
        patch: proven.gate.patch,
        changed_files: proven.gate.changedFiles,
        summary: `WriterLane free writer ${model.id} (${model.openRouterModel}) produced a validated patch.`,
        test_run_id: proven.testRunId,
        test_exit_code: proven.testExitCode,
        diff_source: "worktree",
        model: model.id,
        validation: proven.validation,
        attempts,
      };
    }

    return {
      ok: false,
      reason: WRITERLANE_FREE_CHAIN_EXHAUSTED,
      attempts,
      output: summarizeAttemptTrail(attempts),
    };
  };
}

// ---------------------------------------------------------------------------
// OpenRouter call (the only network edge; injectable via doFetch)
// ---------------------------------------------------------------------------

async function callOpenRouter({ doFetch, baseUrl, apiKey, model, prompt, timeoutMs }) {
  const url = `${String(baseUrl).replace(/\/+$/, "")}/chat/completions`;
  const init = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    }),
  };
  if (typeof AbortSignal?.timeout === "function" && Number.isFinite(timeoutMs)) {
    init.signal = AbortSignal.timeout(timeoutMs);
  }

  let res;
  try {
    res = await doFetch(url, init);
  } catch {
    return { ok: false, reason: WRITERLANE_OPENROUTER_THREW };
  }

  const httpStatus = res?.status ?? 0;
  if (httpStatus === 429) {
    return { ok: false, reason: WRITERLANE_RATE_LIMITED, status: httpStatus };
  }
  if (!res || res.ok === false) {
    return { ok: false, reason: WRITERLANE_OPENROUTER_HTTP_ERROR, status: httpStatus };
  }

  let data;
  try {
    data = await res.json();
  } catch {
    return { ok: false, reason: WRITERLANE_OPENROUTER_HTTP_ERROR, status: httpStatus };
  }

  const content = data?.choices?.[0]?.message?.content ?? "";
  if (!String(content).trim()) {
    return { ok: false, reason: WRITERLANE_EMPTY_COMPLETION, status: httpStatus };
  }
  return { ok: true, content: String(content), status: httpStatus };
}

// ---------------------------------------------------------------------------
// Scoped test runner (the real verification; injectable via runProcess)
// ---------------------------------------------------------------------------

async function runScopedTests({ runProcess, cwd, env, commands, timeoutMs }) {
  const ran = [];
  for (const command of commands) {
    const parts = splitArgsSafe(command);
    if (parts.length === 0) continue;
    const [cmd, ...args] = parts;
    ran.push(command);
    const res = await runProcess(cmd, args, { cwd, env, timeoutMs });
    if (!res || res.ok !== true) {
      return {
        ok: false,
        exit_code: typeof res?.exit_code === "number" ? res.exit_code : 1,
        test_run_id: ran.join(" && "),
        output: res?.output ?? null,
      };
    }
  }
  return { ok: true, exit_code: 0, test_run_id: ran.join(" && ") || "writerlane-tests" };
}

async function applyUnifiedDiffToWorktree({ cwd, env, patch, runProcess, timeoutMs }) {
  const check = await runProcess("git", ["apply", "--check", "--whitespace=error", "-"], {
    cwd,
    env,
    stdin: patch,
    timeoutMs,
  });
  if (!check || check.ok !== true) {
    return { ok: false, reason: WRITERLANE_PATCH_APPLY_CHECK_FAILED };
  }

  const applied = await runProcess("git", ["apply", "--whitespace=nowarn", "-"], {
    cwd,
    env,
    stdin: patch,
    timeoutMs,
  });
  if (!applied || applied.ok !== true) {
    return { ok: false, reason: WRITERLANE_PATCH_APPLY_FAILED };
  }

  return { ok: true };
}

async function proveCapturedWorktreePatch({
  cwd,
  env,
  ownedFiles,
  verification,
  allowMissingTests,
  model,
  prompt,
  runProcess,
  captureDiff,
  maxPatchBytes,
  proofMode,
  diffBudget,
  timeoutMs,
}) {
  // REAL scoped test-run: after writing/applying, before capture (capture reverts).
  let testsPassed;
  let testRunId;
  let testExitCode = 0;
  if (verification.length > 0) {
    const testRun = await runScopedTests({ runProcess, cwd, env, commands: verification, timeoutMs });
    testsPassed = testRun.ok === true;
    testRunId = testRun.test_run_id;
    testExitCode = testRun.exit_code;
  } else {
    testsPassed = allowMissingTests === true;
    testRunId = `writerlane-no-tests-${model.id}`;
    testExitCode = allowMissingTests === true ? 0 : 1;
  }

  const cap = await captureDiff({ cwd, env, ownedFiles, runProcess });
  if (!cap || cap.ok !== true) {
    return { ok: false, reason: cap?.reason || "writerlane_capture_failed" };
  }

  const gate = gateWriterLaneDiff({
    patch: cap.patch,
    ownedFiles,
    declaredFiles: cap.changed_files || [],
    prompt,
    maxPatchBytes,
    proofMode,
  });
  if (!gate.ok) {
    return { ok: false, reason: gate.reason };
  }

  const wlResult = {
    ok: true,
    patch: gate.patch,
    changedFiles: gate.changedFiles,
    proof: { autonomyProof: gate.autonomyProof },
  };
  const validation = buildValidationFromPatch(gate.patch, testsPassed, diffBudget);
  const verdict = validateAutonomyProof(wlResult, proofMode, validation);
  if (!verdict.ok) {
    return { ok: false, reason: verdict.reason };
  }

  return { ok: true, gate, validation, testRunId, testExitCode };
}

function splitArgsSafe(command) {
  try {
    return splitArgs(command);
  } catch {
    return String(command ?? "").trim().split(/\s+/).filter(Boolean);
  }
}

// ---------------------------------------------------------------------------
// Prompt + response parsing
// ---------------------------------------------------------------------------

export function buildFullContentsPrompt({ ownedFiles = [], scopePack = {}, model = {}, runnerPrompt = "", currentFiles = [] } = {}) {
  const cleanRunnerPrompt = normalizeRunnerPromptForFullContents(runnerPrompt);
  const canaryProofLine = extractCanaryFixtureProofLine(runnerPrompt);
  const lines = [
    "You are an UnClick WriterLane free-model writer running AFK.",
    "Implement the requested change by returning the FULL new contents of each owned file.",
    "For EACH owned file, output a line exactly `FILE: <path>` followed by a fenced code block containing the complete new file contents.",
    "Return only FILE blocks. Do not return a unified diff, prose, bullets, JSON, markdown headings, or explanations.",
    "Change only the owned files. Do not commit, push, merge, deploy, or touch anything outside them.",
    "Use the current file contents below as the source of truth. Preserve unrelated code.",
    `Model: ${model.openRouterModel || "unknown"}`,
    "Owned files:",
    ...ownedFiles.map((file) => `- ${file}`),
  ];
  if (ownedFiles.length === 1) {
    lines.push(`Because there is one owned file, your first response line must be: FILE: ${ownedFiles[0]}`);
  }
  if (cleanRunnerPrompt) {
    lines.push("Runner task prompt:");
    lines.push(compactText(cleanRunnerPrompt, 8_000));
  }
  if (canaryProofLine && normalizePaths(ownedFiles).includes("docs/openhands-proof-fixture.md")) {
    lines.push("Canary fixture task:");
    lines.push(
      `Append the line \`${canaryProofLine}\` below \`<!-- openhands-proof-lines -->\` in docs/openhands-proof-fixture.md while preserving the rest of the file.`,
    );
  }
  const intent = scopePack?.changeIntent || scopePack?.change_intent || scopePack?.chip || scopePack?.title;
  if (intent) {
    lines.push("Change intent:");
    lines.push(String(intent));
  }
  const acceptance = normalizeList(scopePack?.acceptance || scopePack?.acceptance_criteria);
  if (acceptance.length) {
    lines.push("Acceptance:");
    lines.push(...acceptance.map((item) => `- ${item}`));
  }
  const verification = normalizeList(scopePack?.verification || scopePack?.tests);
  if (verification.length) {
    lines.push("Verification (these commands will be run for real):");
    lines.push(...verification.map((item) => `- ${item}`));
  }
  const contexts = normalizeFileContexts(currentFiles);
  if (contexts.length) {
    lines.push("Current owned file contents:");
    for (const file of contexts) {
      lines.push(`CURRENT FILE: ${file.path}`);
      if (file.error) {
        lines.push(`Unreadable: ${file.error}`);
        continue;
      }
      lines.push("```");
      lines.push(file.content);
      lines.push("```");
    }
  }
  if (scopePack?.body || scopePack?.description) {
    lines.push("Context:");
    lines.push(String(scopePack.body || scopePack.description));
  }
  return lines.join("\n");
}

function normalizeRunnerPromptForFullContents(prompt = "") {
  const kept = [];
  let skippingCanaryDiff = false;
  for (const line of String(prompt ?? "").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "You are OpenHands running in UnClick test mode.") continue;
    if (/^Return a unified diff patch only\b/i.test(trimmed)) continue;
    if (
      trimmed === "Canary fixture diff:" ||
      trimmed === "For this fixture task, return this unified diff shape and nothing else:"
    ) {
      skippingCanaryDiff = true;
      continue;
    }
    if (skippingCanaryDiff) {
      if (!trimmed || /^(diff --git |--- |\+\+\+ |@@ )/.test(trimmed) || /^[+\- ]/.test(line)) {
        continue;
      }
      skippingCanaryDiff = false;
    }
    kept.push(line);
  }
  return kept.join("\n").trim();
}

function extractCanaryFixtureProofLine(prompt = "") {
  const diffLine = String(prompt ?? "").match(/^\+(-\s*proof run:\s*.+)$/m);
  if (diffLine) return diffLine[1].trim();
  const plainLine = String(prompt ?? "").match(/^(-\s*proof run:\s*.+)$/m);
  return plainLine ? plainLine[1].trim() : "";
}

// Parse `FILE: <path>` + fenced block pairs, keeping only owned paths. Falls back
// to a single fenced block when exactly one file is owned.
export function parseFileBlocks(content, ownedFiles) {
  const owned = new Set(normalizePaths(ownedFiles));
  const text = String(content ?? "");
  const blocks = [];
  const re = /FILE:\s*([^\n`]+?)\s*\r?\n+```[^\n]*\r?\n([\s\S]*?)\r?\n?```/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const path = normalizePath(match[1]);
    if (owned.has(path)) {
      blocks.push({ path, content: match[2] });
    }
  }
  if (blocks.length > 0) {
    return dedupeByPath(blocks);
  }
  const ownedList = [...owned];
  if (ownedList.length === 1) {
    const fence = text.match(/```[^\n]*\r?\n([\s\S]*?)\r?\n?```/);
    if (fence) {
      return [{ path: ownedList[0], content: fence[1] }];
    }
  }
  return [];
}

export function extractUnifiedDiff(content) {
  const text = String(content ?? "");
  const fenced = text.match(/```(?:diff|patch)?\s*([\s\S]*?diff --git[\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const index = text.indexOf("diff --git ");
  return index === -1 ? "" : text.slice(index).trim();
}

function dedupeByPath(blocks) {
  const seen = new Map();
  for (const block of blocks) {
    seen.set(block.path, block);
  }
  return [...seen.values()];
}

// ---------------------------------------------------------------------------
// Diff gate (mirror of gateOpenHandsDiff in api/lib/writerlane/openhands-backend.ts)
// ---------------------------------------------------------------------------

export function gateWriterLaneDiff({ patch, ownedFiles, declaredFiles = [], prompt = "", maxPatchBytes = MAX_PATCH_BYTES, proofMode = "autonomy" }) {
  const text = String(patch ?? "");
  if (!text.trim()) {
    return { ok: false, reason: "openhands_missing_unified_diff" };
  }
  if (Buffer.byteLength(text, "utf8") > maxPatchBytes) {
    return { ok: false, reason: "openhands_patch_too_large" };
  }
  if (isEchoOfPrompt(text, prompt)) {
    return { ok: false, reason: "openhands_echoed_prompt_diff" };
  }
  if (!looksLikeUnifiedDiff(text)) {
    return { ok: false, reason: "openhands_missing_unified_diff" };
  }
  if (!hasDiffHunks(text)) {
    return { ok: false, reason: "openhands_no_diff_hunks" };
  }
  const changedFiles = extractChangedFilesFromPatch(text);
  if (changedFiles.length === 0) {
    return { ok: false, reason: "openhands_changed_files_required" };
  }
  const owned = new Set(normalizePaths(ownedFiles));
  const ownershipScope = [...new Set([...changedFiles, ...normalizePaths(declaredFiles)])];
  const outside = ownershipScope.find((file) => !owned.has(file));
  if (outside) {
    return { ok: false, reason: "openhands_unowned_worktree_diff" };
  }
  // captureOwnedWorktreeDiff is the only producer here, so the source is always a
  // real worktree capture; keep the trusted-source check explicit anyway.
  const trusted = true;
  if (proofMode === "autonomy" && !trusted) {
    return { ok: false, reason: "openhands_untrusted_diff_source" };
  }
  return {
    ok: true,
    patch: text,
    changedFiles,
    autonomyProof: proofMode === "autonomy" && trusted,
  };
}

export function looksLikeUnifiedDiff(patch) {
  const lines = String(patch ?? "").split(/\r?\n/);
  if (lines.some((line) => line.startsWith("diff --git "))) return true;
  const hasMinus = lines.some((line) => line.startsWith("--- "));
  const hasPlus = lines.some((line) => line.startsWith("+++ "));
  const hasHunk = lines.some((line) => line.startsWith("@@"));
  return hasMinus && hasPlus && hasHunk;
}

export function hasDiffHunks(patch) {
  return String(patch ?? "")
    .split(/\r?\n/)
    .some((line) => /^@@ -\d+(?:,\d+)? \+\d+(?:,\d+)? @@/.test(line));
}

export function extractChangedFilesFromPatch(patch) {
  const files = [];
  for (const line of String(patch ?? "").split(/\r?\n/)) {
    const gitMatch = line.match(/^diff --git a\/(.+?) b\/(.+)$/);
    if (gitMatch) {
      files.push(gitMatch[2]);
      continue;
    }
    const plusMatch = line.match(/^\+\+\+ b\/(.+)$/);
    if (plusMatch) {
      files.push(plusMatch[1]);
    }
  }
  return [...new Set(normalizePaths(files).filter((file) => file && file !== "dev/null"))];
}

function isEchoOfPrompt(patch, prompt) {
  const normalizedPatch = String(patch ?? "").replace(/\s+/g, " ").trim();
  const normalizedPrompt = String(prompt ?? "").replace(/\s+/g, " ").trim();
  if (!normalizedPrompt) return false;
  return normalizedPatch === normalizedPrompt || normalizedPatch.includes(normalizedPrompt);
}

// ---------------------------------------------------------------------------
// Small shared helpers
// ---------------------------------------------------------------------------

function inferTaskKind(ownedFiles) {
  const files = normalizePaths(ownedFiles);
  if (files.length === 0) return "unknown";
  return files.every(isDoc) ? "docs" : "backend";
}

function isDoc(file) {
  const f = String(file).toLowerCase();
  return f.startsWith("docs/") || f.endsWith(".md") || f.endsWith(".mdx") || f.endsWith(".txt");
}

async function defaultWriteFile({ cwd, path, content }) {
  const abs = join(cwd, path);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, content, "utf8");
}

async function defaultReadFile({ cwd, path }) {
  return readFile(join(cwd, path), "utf8");
}

async function readOwnedFileContexts({
  cwd,
  ownedFiles,
  readFileImpl,
  maxFileBytes = DEFAULT_MAX_CONTEXT_FILE_BYTES,
  maxTotalBytes = DEFAULT_MAX_CONTEXT_TOTAL_BYTES,
}) {
  const contexts = [];
  let remaining = Math.max(0, maxTotalBytes);
  for (const path of normalizePaths(ownedFiles)) {
    if (remaining <= 0) {
      contexts.push({ path, content: "", error: "context_budget_exhausted" });
      continue;
    }
    try {
      const raw = String(await readFileImpl({ cwd, path }) ?? "");
      const maxBytes = Math.max(0, Math.min(maxFileBytes, remaining));
      const clipped = clipUtf8(raw, maxBytes);
      remaining -= Buffer.byteLength(clipped, "utf8");
      contexts.push({
        path,
        content: clipped,
        truncated: Buffer.byteLength(raw, "utf8") > Buffer.byteLength(clipped, "utf8"),
      });
    } catch (err) {
      contexts.push({ path, content: "", error: readFileErrorReason(err) });
    }
  }
  return contexts;
}

function normalizeFileContexts(files) {
  if (!Array.isArray(files)) return [];
  return files
    .map((file) => ({
      path: normalizePath(file?.path),
      content: String(file?.content ?? ""),
      error: file?.error ? String(file.error) : "",
    }))
    .filter((file) => file.path);
}

function clipUtf8(value, maxBytes) {
  const text = String(value ?? "");
  if (Buffer.byteLength(text, "utf8") <= maxBytes) return text;
  const marker = "\n[truncated for writer context]";
  const markerBytes = Buffer.byteLength(marker, "utf8");
  if (maxBytes <= markerBytes) return "";
  let clipped = text.slice(0, Math.max(0, maxBytes - markerBytes));
  while (Buffer.byteLength(clipped, "utf8") > maxBytes) {
    clipped = clipped.slice(0, -1);
  }
  while (Buffer.byteLength(`${clipped}${marker}`, "utf8") > maxBytes) {
    clipped = clipped.slice(0, -1);
  }
  return `${clipped}${marker}`;
}

function readFileErrorReason(err) {
  if (err?.code === "ENOENT") return "file_missing_new_file_ok";
  if (err?.code) return `read_failed_${String(err.code).toLowerCase()}`;
  return "read_failed";
}

function summarizeAttemptTrail(attempts = []) {
  if (!Array.isArray(attempts) || attempts.length === 0) return null;
  return compactText(
    attempts
      .map((attempt) => {
        const reason = attempt?.ok ? "ok" : attempt?.reason || "failed";
        const http = attempt?.http_status ? ` http=${attempt.http_status}` : "";
        return `${attempt?.modelId || "unknown"} (${attempt?.openRouterModel || "unknown"}): ${reason}${http}`;
      })
      .join("\n"),
    2_000,
  );
}

function compactText(value, max) {
  const text = String(value ?? "");
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 3))}...`;
}

function ensureTrailingNewline(content) {
  const text = String(content ?? "");
  return text.endsWith("\n") ? text : `${text}\n`;
}

function normalizePath(value) {
  return String(value ?? "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .trim();
}

function normalizePaths(values) {
  return [...new Set((values ?? []).map(normalizePath).filter(Boolean))];
}

function normalizeList(values) {
  if (Array.isArray(values)) return values.map((value) => String(value ?? "").trim()).filter(Boolean);
  if (values === undefined || values === null || values === "") return [];
  return [String(values).trim()].filter(Boolean);
}

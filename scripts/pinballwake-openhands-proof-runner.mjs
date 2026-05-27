#!/usr/bin/env node

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";

import { validateCodingRoomBuildPatch } from "./pinballwake-build-executor.mjs";
import { runOpenHandsWorker } from "./pinballwake-openhands-worker.mjs";

const DEFAULT_PROOF_FILE = "docs/openhands-proof-fixture.md";
const DEFAULT_TODO_ID = "036de894-82a1-49c7-ac19-67335950c626";
const DEFAULT_BRANCH_PREFIX = "codex/openhands-proof";
const DEFAULT_SUBMITTER_BRANCH_PREFIX = "codex/openhands-submit";
const DEFAULT_TITLE = "test(autopilot): prove OpenHands docs patch path";
const DEFAULT_TIMEOUT_MS = 20 * 60 * 1000;
const CODEROOM_APP_TOKEN_ENV_KEYS = ["CODEROOM_GITHUB_APP_TOKEN", "AUTONOMOUS_RUNNER_GITHUB_APP_TOKEN"];

export const DEFAULT_CODEROOM_PROTECTED_PATH_PATTERNS = [
  { reason: "protected_workflow_path", pattern: /^\.github\/workflows\//i },
  { reason: "protected_ruleset_path", pattern: /^\.github\/rulesets?\//i },
  { reason: "protected_supabase_migration_path", pattern: /^supabase\/migrations\//i },
  { reason: "protected_env_path", pattern: /(^|\/)\.env(?:\.|$)/i },
  { reason: "protected_secret_path", pattern: /(^|\/)(secrets?|credentials?|private[-_]?keys?|keychain)(\/|\.|$)/i },
];

function parseBoolean(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

function getArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

export function compactOutput(value, max = 2000) {
  const text = String(value ?? "").trim();
  if (text.length <= max) return text;
  const marker = `\n... omitted ${text.length - max} chars ...\n`;
  const budget = Math.max(0, max - marker.length);
  const head = Math.ceil(budget * 0.35);
  const tail = Math.max(0, budget - head);
  return `${text.slice(0, head)}${marker}${text.slice(text.length - tail)}`;
}

function normalizePath(value) {
  return String(value ?? "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .trim();
}

function parseGitStatusPaths(output) {
  return parseGitStatusEntries(output).map((entry) => entry.path);
}

function parseGitStatusEntries(output) {
  return String(output ?? "")
    .split(/\r?\n/)
    .map((line) => {
      const code = line.slice(0, 2);
      const rawPath = line.slice(3).trim();
      const path = normalizePath(rawPath.includes(" -> ") ? rawPath.split(" -> ").pop() : rawPath);
      return { code, path };
    })
    .filter((entry) => entry.path);
}

function isGeneratedRunnerLedgerPath(path) {
  const normalized = normalizePath(path).replace(/\/+$/, "");
  return (
    normalized === ".pinballwake" ||
    normalized === ".pinballwake/coding-room-ledger.json"
  );
}

function normalizeList(values) {
  if (Array.isArray(values)) return values.map((value) => String(value ?? "").trim()).filter(Boolean);
  if (values === undefined || values === null || values === "") return [];
  return [String(values).trim()].filter(Boolean);
}

function safeStamp(value = new Date()) {
  return String(value instanceof Date ? value.toISOString() : value)
    .replace(/[^0-9A-Za-z._:-]/g, "-")
    .slice(0, 80);
}

function safeSlug(value, fallback = "job") {
  const slug = String(value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  return slug || fallback;
}

export function splitArgs(value) {
  const parts = [];
  let current = "";
  let quote = "";

  for (const char of String(value ?? "")) {
    if (quote) {
      if (char === quote) {
        quote = "";
      } else {
        current += char;
      }
      continue;
    }

    if (char === "\"" || char === "'") {
      quote = char;
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        parts.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (quote) {
    throw new Error("unclosed_quote");
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

export function resolveCodeRoomSubmitterAuthEnv(env = process.env) {
  const source = CODEROOM_APP_TOKEN_ENV_KEYS.find((key) => String(env[key] || "").trim());
  if (!source) {
    return { ok: false, reason: "missing_scoped_app_token" };
  }

  const token = String(env[source] || "").trim();
  const defaultToken = String(env.GITHUB_TOKEN || "").trim();
  if (defaultToken && token === defaultToken) {
    return { ok: false, reason: "app_token_matches_default_github_token", token_source: source };
  }

  return {
    ok: true,
    token_source: source,
    env: {
      ...env,
      GH_TOKEN: token,
      GITHUB_TOKEN: token,
    },
  };
}

export function buildOpenHandsCliArgs({ prompt, argsTemplate = "" } = {}) {
  const template = String(argsTemplate || "--headless --json --task {prompt}").trim();
  const parts = splitArgs(template);
  const replaced = parts.map((part) => (part === "{prompt}" ? String(prompt ?? "") : part));
  return replaced.includes(String(prompt ?? "")) ? replaced : [...replaced, "--task", String(prompt ?? "")];
}

function hasValue(value) {
  return String(value ?? "").trim().length > 0;
}

export function checkOpenHandsHeadlessSettings({ args = [], env = process.env } = {}) {
  const safeArgs = Array.isArray(args) ? args : [];
  if (!safeArgs.includes("--headless")) {
    return { ok: true };
  }

  if (parseBoolean(env.OPENHANDS_ALLOW_STORED_SETTINGS) || parseBoolean(env.OPENHANDS_SETTINGS_PRESENT)) {
    return { ok: true };
  }

  const usesEnvOverride = safeArgs.includes("--override-with-envs");
  const hasRequiredEnv = hasValue(env.LLM_API_KEY) && hasValue(env.LLM_MODEL);
  if (usesEnvOverride && hasRequiredEnv) {
    return { ok: true };
  }

  return {
    ok: false,
    reason: "openhands_headless_settings_required",
    output: [
      "OpenHands headless settings are missing.",
      "Set saved OpenHands settings, or run with --override-with-envs plus LLM_API_KEY and LLM_MODEL.",
      "No secret values were read or printed.",
    ].join(" "),
  };
}

export function buildDocsOnlyFixturePatch({
  filePath = DEFAULT_PROOF_FILE,
  proofLine = `- proof run: ${safeStamp(new Date())}`,
} = {}) {
  const file = normalizePath(filePath);
  return [
    `diff --git a/${file} b/${file}`,
    "index 1111111..2222222 100644",
    `--- a/${file}`,
    `+++ b/${file}`,
    "@@ -3,4 +3,5 @@",
    " This fixture exists so the autopilot can prove a docs-only patch path without",
    " touching product code, production data, secrets, billing, DNS, or deploys.",
    "",
    " <!-- openhands-proof-lines -->",
    `+${proofLine}`,
    "",
  ].join("\n");
}

export function createFixtureOpenHandsRunner({ filePath = DEFAULT_PROOF_FILE, now = new Date() } = {}) {
  return async () => ({
    ok: true,
    patch: buildDocsOnlyFixturePatch({
      filePath,
      proofLine: `- proof run: ${safeStamp(now)}`,
    }),
    changed_files: [normalizePath(filePath)],
    summary: "Fixture OpenHands proof produced a docs-only patch.",
    test_run_id: `openhands-fixture-${safeStamp(now)}`,
    test_exit_code: 0,
  });
}

export function createOpenHandsCliRunner({
  command,
  argsTemplate = "",
  cwd = process.cwd(),
  env = process.env,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  readPatchFile = readFile,
  runProcess = runProcessCommand,
} = {}) {
  const safeCommand = String(command || env.OPENHANDS_COMMAND || "openhands").trim();

  return async ({ prompt, scopePack }) => {
    const args = buildOpenHandsCliArgs({
      prompt,
      argsTemplate: argsTemplate || env.OPENHANDS_ARGS || "",
    });
    const settingsCheck = checkOpenHandsHeadlessSettings({ args, env });
    if (!settingsCheck.ok) {
      return {
        ok: false,
        reason: settingsCheck.reason,
        exit_code: null,
        output: settingsCheck.output,
      };
    }

    const result = await runProcess(safeCommand, args, {
      cwd,
      env: {
        ...env,
        OPENHANDS_TASK_PROMPT: prompt,
      },
      timeoutMs,
    });

    if (!result.ok) {
      return {
        ok: false,
        reason: "openhands_cli_failed",
        exit_code: result.exit_code,
        output: result.output,
      };
    }

    const patchFile = String(env.OPENHANDS_PATCH_FILE || "").trim();
    const outputPatch = patchFile ? await readPatchFile(patchFile, "utf8") : extractUnifiedDiff(result.output);
    const worktreeCapture = await captureOwnedWorktreeDiff({
      cwd,
      env,
      ownedFiles: scopePack?.owned_files || [],
      runProcess,
    });
    if (!worktreeCapture.ok) {
      return {
        ok: false,
        reason: worktreeCapture.reason,
        exit_code: result.exit_code,
        output: compactOutput(
          [
            "OpenHands left an unsafe or unrestorable worktree diff.",
            worktreeCapture.output || "",
            result.output || "",
          ].join("\n"),
        ),
      };
    }

    const patch = outputPatch || worktreeCapture.patch;
    if (!String(patch || "").trim()) {
      return {
        ok: false,
        reason: "openhands_missing_unified_diff",
        exit_code: result.exit_code,
        output: compactOutput(
          [
            "OpenHands CLI completed without a trusted unified diff.",
            "Expected output must include a diff --git patch for the owned docs fixture.",
            result.output,
          ].join("\n"),
        ),
      };
    }

    return {
      ok: true,
      patch,
      changed_files: worktreeCapture.changed_files?.length ? worktreeCapture.changed_files : scopePack?.owned_files || [],
      summary: outputPatch
        ? "OpenHands CLI produced a test-mode patch."
        : "OpenHands CLI applied an owned-file patch captured from git diff.",
      test_run_id: result.run_id || "openhands-cli",
      test_exit_code: result.exit_code,
      output: result.output,
    };
  };
}

export function buildProofJob({ todoId = DEFAULT_TODO_ID, filePath = DEFAULT_PROOF_FILE } = {}) {
  const file = normalizePath(filePath);
  return {
    job_id: `coding-room:openhands-proof:${todoId}`,
    todo_id: todoId,
    title: "OpenHands proof v1: ScopePack to draft PR, no local PowerShell",
    chip: "OpenHands test-mode proof",
    owned_files: [file],
    expected_proof: {
      requires_pr: true,
      requires_changed_files: true,
      requires_non_overlap: true,
      requires_tests: true,
      tests: ["node --test scripts/pinballwake-openhands-proof-runner.test.mjs"],
    },
  };
}

export function buildProofScopePack({
  scopePackCommentId = "",
  filePath = DEFAULT_PROOF_FILE,
} = {}) {
  const file = normalizePath(filePath);
  return {
    scope_pack_comment_id: scopePackCommentId || null,
    owned_files: [file],
    acceptance: [
      "OpenHands returns a unified diff patch for a docs-only fixture.",
      "Coderoom rejects non-docs or outside-owned-file patches.",
      "Draft PR creation is opt-in and never auto-merges.",
    ],
    verification: ["node --test scripts/pinballwake-openhands-proof-runner.test.mjs"],
    body: "Test-mode only proof for OpenHands to coderoom draft PR flow.",
  };
}

export function createDraftPrCoderoom({
  cwd = process.cwd(),
  env = process.env,
  branchName,
  title = DEFAULT_TITLE,
  body = "",
  runProcess = runProcessCommand,
} = {}) {
  return async ({ job, patch, changedFiles, summary, testRunId }) => {
    const normalizedChanged = (changedFiles || []).map(normalizePath);
    const nonDocs = normalizedChanged.find((file) => !file.startsWith("docs/"));
    if (nonDocs) {
      return { ok: false, reason: "non_docs_patch_refused", file: nonDocs };
    }

    const validation = validateCodingRoomBuildPatch({
      patch,
      ownedFiles: job?.owned_files || [],
    });
    if (!validation.ok) {
      return {
        ok: false,
        reason: validation.reason,
        file: validation.file || null,
      };
    }

    const status = await runProcess("git", ["status", "--porcelain"], { cwd, env });
    if (!status.ok) return { ok: false, reason: "git_status_failed", output: status.output };
    if (status.stdout.trim()) {
      return { ok: false, reason: "dirty_worktree" };
    }

    const branch = branchName || `${DEFAULT_BRANCH_PREFIX}-${safeStamp(new Date())}`;
    const bodyText =
      body ||
      [
        "Test-mode OpenHands proof.",
        "",
        `Todo: ${job?.todo_id || DEFAULT_TODO_ID}`,
        `Summary: ${summary || "Docs-only proof patch."}`,
        `Test run: ${testRunId || "not supplied"}`,
        "",
        "No production data, secrets, deploy, billing, DNS, or auto-merge.",
      ].join("\n");

    const commands = [
      ["git", ["checkout", "-b", branch]],
      ["git", ["apply", "--whitespace=nowarn", "-"], { stdin: patch }],
      ["git", ["add", ...normalizedChanged]],
      ["git", ["commit", "-m", title]],
      ["git", ["push", "-u", "origin", branch]],
      ["gh", ["pr", "create", "--draft", "--title", title, "--body", bodyText]],
    ];

    let prUrl = "";
    for (const [command, args, options = {}] of commands) {
      const result = await runProcess(command, args, { cwd, env, ...options });
      if (!result.ok) {
        return {
          ok: false,
          reason: `${command}_failed`,
          output: result.output,
        };
      }
      if (command === "gh") {
        prUrl = result.stdout.trim();
      }
    }

    const sha = await runProcess("git", ["rev-parse", "HEAD"], { cwd, env });
    return {
      ok: true,
      pr_url: prUrl || null,
      head_sha_after: sha.stdout.trim() || null,
      test_run_id: testRunId || null,
      test_exit_code: 0,
      status: "draft_pr_created",
    };
  };
}

export function inspectSafeCoderoomPatchPaths({
  changedFiles = [],
  ownedFiles = [],
  allowProtectedSurfaces = false,
  protectedPathPatterns = DEFAULT_CODEROOM_PROTECTED_PATH_PATTERNS,
} = {}) {
  const normalizedChanged = (changedFiles || []).map(normalizePath).filter(Boolean);
  const owned = new Set((ownedFiles || []).map(normalizePath).filter(Boolean));
  const outside = normalizedChanged.find((file) => !owned.has(file));
  if (outside) {
    return { ok: false, reason: "patch_file_outside_ownership", file: outside };
  }

  if (!allowProtectedSurfaces) {
    for (const file of normalizedChanged) {
      const match = protectedPathPatterns.find((entry) => entry.pattern.test(file));
      if (match) {
        return { ok: false, reason: match.reason, file };
      }
    }
  }

  return { ok: true, changed_files: normalizedChanged };
}

export function createSafeCodeRoomSubmitter({
  cwd = process.cwd(),
  env = process.env,
  branchName,
  title = "",
  body = "",
  draft = false,
  autoMerge = true,
  allowProtectedSurfaces,
  runProcess = runProcessCommand,
  now = new Date(),
} = {}) {
  return async ({ job, scopePack, patch, changedFiles, summary, testRunId }) => {
    const ownedFiles = job?.owned_files?.length ? job.owned_files : scopePack?.owned_files || [];
    const validation = validateCodingRoomBuildPatch({
      patch,
      ownedFiles,
    });
    if (!validation.ok) {
      return {
        ok: false,
        reason: validation.reason,
        file: validation.file || null,
      };
    }

    const normalizedChanged = (changedFiles?.length ? changedFiles : validation.changed_files).map(normalizePath);
    const safety = inspectSafeCoderoomPatchPaths({
      changedFiles: normalizedChanged,
      ownedFiles,
      allowProtectedSurfaces:
        typeof allowProtectedSurfaces === "boolean"
          ? allowProtectedSurfaces
          : parseBoolean(env.AUTONOMOUS_RUNNER_ALLOW_PROTECTED_SURFACES),
    });
    if (!safety.ok) return safety;

    const auth = resolveCodeRoomSubmitterAuthEnv(env);
    if (!auth.ok) {
      return {
        ok: false,
        reason: auth.reason,
        token_source: auth.token_source || null,
      };
    }
    const submitterEnv = auth.env;

    let status = await runProcess("git", ["status", "--porcelain"], { cwd, env: submitterEnv });
    if (!status.ok) return { ok: false, reason: "git_status_failed", output: status.output };
    let dirtyEntries = parseGitStatusEntries(status.stdout);
    let blockingDirtyEntries = dirtyEntries.filter((entry) => !isGeneratedRunnerLedgerPath(entry.path));
    if (blockingDirtyEntries.length) {
      const changedSet = new Set(normalizedChanged);
      const unrelatedDirtyEntries = blockingDirtyEntries.filter((entry) => !changedSet.has(entry.path));
      if (unrelatedDirtyEntries.length) {
        return { ok: false, reason: "dirty_worktree", dirty_files: blockingDirtyEntries.map((entry) => entry.path) };
      }

      const trackedDirtyEntries = blockingDirtyEntries.filter((entry) => !entry.code.includes("?"));
      if (trackedDirtyEntries.length) {
        const restore = await runProcess(
          "git",
          ["restore", "--staged", "--worktree", "--", ...trackedDirtyEntries.map((entry) => entry.path)],
          {
            cwd,
            env: submitterEnv,
          },
        );
        if (!restore.ok) {
          return { ok: false, reason: "git_restore_preexisting_patch_failed", output: restore.output };
        }
      }

      const untrackedDirtyEntries = blockingDirtyEntries.filter((entry) => entry.code.includes("?"));
      if (untrackedDirtyEntries.length) {
        const clean = await runProcess("git", ["clean", "-f", "--", ...untrackedDirtyEntries.map((entry) => entry.path)], {
          cwd,
          env: submitterEnv,
        });
        if (!clean.ok) {
          return { ok: false, reason: "git_clean_preexisting_patch_failed", output: clean.output };
        }
      }

      status = await runProcess("git", ["status", "--porcelain"], { cwd, env: submitterEnv });
      if (!status.ok) return { ok: false, reason: "git_status_failed", output: status.output };
      dirtyEntries = parseGitStatusEntries(status.stdout);
      blockingDirtyEntries = dirtyEntries.filter((entry) => !isGeneratedRunnerLedgerPath(entry.path));
    }
    const blockingDirtyFiles = blockingDirtyEntries.map((entry) => entry.path);
    if (blockingDirtyFiles.length) {
      return { ok: false, reason: "dirty_worktree", dirty_files: blockingDirtyFiles };
    }

    const todoId = safeSlug(job?.todo_id || job?.id || job?.job_id || safeStamp(now));
    const branch = branchName || `${DEFAULT_SUBMITTER_BRANCH_PREFIX}-${todoId}`;
    const existing = await runProcess(
      "gh",
      ["pr", "list", "--head", branch, "--state", "open", "--json", "url", "--jq", ".[0].url // \"\""],
      { cwd, env: submitterEnv },
    );
    if (!existing.ok) return { ok: false, reason: "gh_pr_list_failed", output: existing.output };
    const existingUrl = existing.stdout.trim();
    if (existingUrl) {
      return {
        ok: true,
        pr_url: existingUrl,
        head_sha_after: null,
        test_run_id: testRunId || null,
        test_exit_code: 0,
        status: "existing_pr",
        idempotent: true,
      };
    }

    const prTitle = title || `autopilot: submit ${compactOutput(job?.title || job?.job_id || todoId, 80)}`;
    const bodyText =
      body ||
      [
        "OpenHands CodeRoom submitter PR.",
        "",
        `Todo: ${job?.todo_id || job?.id || "unknown"}`,
        `Summary: ${summary || "OpenHands produced a scoped patch."}`,
        `Test run: ${testRunId || "not supplied"}`,
        "",
        "Safety: protected paths rejected before branch creation; patch limited to owned files.",
      ].join("\n");

    const commands = [
      ["git", ["checkout", "-b", branch]],
      ["git", ["apply", "--check", "--whitespace=error", "-"], { stdin: patch }],
      ["git", ["apply", "--whitespace=nowarn", "-"], { stdin: patch }],
      ["git", ["diff", "--check"]],
      ["git", ["add", ...normalizedChanged]],
      ["git", ["commit", "-m", prTitle]],
      ["gh", ["auth", "setup-git"]],
      ["git", ["push", "-u", "origin", branch]],
      ["gh", ["pr", "create", ...(draft ? ["--draft"] : []), "--title", prTitle, "--body", bodyText]],
    ];

    let prUrl = "";
    for (const [command, args, options = {}] of commands) {
      const result = await runProcess(command, args, { cwd, env: submitterEnv, ...options });
      if (!result.ok) return { ok: false, reason: `${command}_failed`, output: result.output };
      if (command === "gh" && args[1] === "create") prUrl = result.stdout.trim();
    }

    const sha = await runProcess("git", ["rev-parse", "HEAD"], { cwd, env: submitterEnv });
    if (!sha.ok) return { ok: false, reason: "git_rev_parse_failed", output: sha.output };

    let autoMergeResult = { ok: true, skipped: true, reason: draft ? "draft_pr" : "auto_merge_disabled" };
    if (autoMerge && !draft) {
      autoMergeResult = await runProcess("gh", ["pr", "merge", "--auto", "--squash", prUrl], {
        cwd,
        env: submitterEnv,
      });
      if (!autoMergeResult.ok) {
        return { ok: false, reason: "gh_auto_merge_failed", output: autoMergeResult.output, pr_url: prUrl };
      }
    }

    return {
      ok: true,
      pr_url: prUrl || null,
      head_sha_after: sha.stdout.trim() || null,
      test_run_id: testRunId || null,
      test_exit_code: 0,
      status: autoMerge && !draft ? "pr_created_auto_merge_enabled" : "pr_created",
      auto_merge_enabled: Boolean(autoMerge && !draft),
    };
  };
}

export async function runOpenHandsProof({
  env = process.env,
  cwd = process.cwd(),
  now = new Date(),
  filePath = DEFAULT_PROOF_FILE,
  openHands,
  coderoom,
  runProcess,
} = {}) {
  const safeEnv = env || {};
  const job = buildProofJob({ filePath });
  const scopePack = buildProofScopePack({ filePath });
  const selectedOpenHands =
    openHands ||
    (parseBoolean(safeEnv.OPENHANDS_PROOF_FIXTURE_PATCH)
      ? createFixtureOpenHandsRunner({ filePath, now })
      : createOpenHandsCliRunner({ cwd, env: safeEnv, runProcess }));

  const selectedCoderoom =
    coderoom ||
    (parseBoolean(safeEnv.OPENHANDS_CREATE_DRAFT_PR)
      ? createDraftPrCoderoom({ cwd, env: safeEnv, runProcess })
      : undefined);

  return runOpenHandsWorker({
    job,
    scopePack,
    openHands: selectedOpenHands,
    coderoom: selectedCoderoom,
    env: safeEnv,
    testMode: parseBoolean(safeEnv.OPENHANDS_TEST_MODE),
    now,
  });
}

export async function runProcessCommand(command, args = [], options = {}) {
  const { cwd = process.cwd(), env = process.env, timeoutMs = DEFAULT_TIMEOUT_MS, stdin = "" } = options;
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env,
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      child.kill("SIGTERM");
      resolve({
        ok: false,
        exit_code: null,
        stdout,
        stderr,
        output: compactOutput(`${stdout}\n${stderr}\nTimed out after ${timeoutMs}ms`),
      });
    }, timeoutMs);

    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve({
        ok: false,
        exit_code: null,
        stdout,
        stderr,
        output: compactOutput(error.message),
      });
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve({
        ok: code === 0,
        exit_code: code,
        stdout,
        stderr,
        output: compactOutput(`${stdout}\n${stderr}`),
      });
    });
    if (stdin) {
      child.stdin.write(stdin);
    }
    child.stdin.end();
  });
}

export async function captureOwnedWorktreeDiff({
  cwd = process.cwd(),
  env = process.env,
  ownedFiles = [],
  runProcess = runProcessCommand,
} = {}) {
  const owned = [...new Set((ownedFiles || []).map(normalizePath).filter(Boolean))];
  if (owned.length === 0) return { ok: true, patch: "", changed_files: [] };

  const changed = await runProcess("git", ["diff", "--name-only", "--"], { cwd, env });
  if (!changed.ok) {
    return { ok: false, reason: "git_diff_name_only_failed", output: changed.output };
  }

  const changedFiles = normalizeList(changed.stdout)
    .flatMap((text) => text.split(/\r?\n/))
    .map(normalizePath)
    .filter(Boolean);
  if (changedFiles.length === 0) return { ok: true, patch: "", changed_files: [] };

  const ownedSet = new Set(owned);
  const outside = changedFiles.filter((file) => !ownedSet.has(file));
  if (outside.length) {
    return {
      ok: false,
      reason: "openhands_unowned_worktree_diff",
      output: `Changed files outside ownership: ${outside.join(", ")}`,
      changed_files: changedFiles,
      outside_files: outside,
    };
  }

  const diff = await runProcess("git", ["diff", "--", ...changedFiles], { cwd, env });
  if (!diff.ok) {
    return { ok: false, reason: "git_diff_capture_failed", output: diff.output, changed_files: changedFiles };
  }

  const restore = await runProcess("git", ["restore", "--worktree", "--", ...changedFiles], { cwd, env });
  if (!restore.ok) {
    return { ok: false, reason: "git_restore_owned_diff_failed", output: restore.output, changed_files: changedFiles };
  }

  const verify = await runProcess("git", ["diff", "--quiet", "--", ...changedFiles], { cwd, env });
  if (!verify.ok) {
    return {
      ok: false,
      reason: "git_restore_owned_diff_unclean",
      output: verify.output,
      changed_files: changedFiles,
    };
  }

  return { ok: true, patch: diff.stdout || diff.output || "", changed_files: changedFiles };
}

function extractUnifiedDiff(output) {
  const text = String(output ?? "");
  const fenced = text.match(/```(?:diff|patch)?\s*([\s\S]*?diff --git[\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const index = text.indexOf("diff --git ");
  return index === -1 ? "" : text.slice(index).trim();
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  runOpenHandsProof({
    filePath: getArg("file", process.env.OPENHANDS_PROOF_FILE || DEFAULT_PROOF_FILE),
  })
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.ok ? 0 : 1;
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

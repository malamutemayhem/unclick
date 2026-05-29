#!/usr/bin/env node

import { spawn } from "node:child_process";

import {
  createCodingRoomJobLedger,
  readCodingRoomJobLedger,
  submitCodingRoomBuildResult,
  writeCodingRoomJobLedger,
} from "./pinballwake-coding-room.mjs";

const DEFAULT_PATCH_MAX_BYTES = 120000;

function parseBoolean(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

function getArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function compactOutput(value, max = 2000) {
  const text = String(value ?? "").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function normalizePath(value) {
  return String(value ?? "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .trim();
}

function isUnsafePath(value) {
  const normalized = normalizePath(value);
  if (!normalized || normalized === "/dev/null") {
    return true;
  }

  if (normalized.startsWith("../") || normalized.includes("/../") || normalized.endsWith("/..")) {
    return true;
  }

  if (normalized.startsWith(".git/") || /^[a-zA-Z]:/.test(normalized)) {
    return true;
  }

  return false;
}

function parseDiffPath(value) {
  const raw = String(value ?? "").trim();
  if (raw === "/dev/null") return raw;
  return normalizePath(raw.replace(/^[ab]\//, "").split(/\s+/)[0]);
}

const REQUIRED_EXECUTOR_PACKET_FIELDS = [
  "repo",
  "branch_or_worktree",
  "owned_files",
  "acceptance",
  "verification",
  "stop_conditions",
  "proof_required",
  "commonsensepass_result",
];

function hasText(value) {
  return String(value ?? "").trim().length > 0;
}

function hasListItems(value) {
  return Array.isArray(value) && value.some((item) => hasText(item));
}

function hasProofRequirement(value) {
  if (hasText(value) && typeof value !== "object") {
    return true;
  }

  if (Array.isArray(value)) {
    return hasListItems(value);
  }

  return value && typeof value === "object" && Object.keys(value).length > 0;
}

function readCommonSensePassVerdict(value) {
  if (value === true) return "pass";
  if (typeof value === "string") return value.trim().toLowerCase();
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";

  for (const key of ["verdict", "result", "decision", "status", "outcome"]) {
    if (hasText(value[key])) {
      return String(value[key]).trim().toLowerCase();
    }
  }

  if (value.ok === true || value.allowed === true || value.safe === true) {
    return "pass";
  }

  return "";
}

function isCommonSensePassAllowed(value) {
  return ["pass", "passed", "allow", "allowed", "approved", "safe", "ok"].includes(readCommonSensePassVerdict(value));
}

function unsafeAuthorityReason(value) {
  const text = String(value ?? "").toLowerCase();
  if (!text.trim()) return "";

  const guarded = /\b(no|not|never|without|disallow|disallowed|reject|refuse|blocked|block)\b.{0,30}\b(merge|deploy|schedule|workflow|secret|billing|dns|delete|destructive|force push|force-push|production)\b/.test(text);
  if (guarded) return "";

  if (/\b(merge|auto-merge|approve|mark done|complete todo|close todo|deploy|production deploy|schedule|workflow edit|secret|billing|dns|delete data|data deletion|force push|force-push|migration)\b/.test(text)) {
    return "unsafe_authority_request";
  }

  return "";
}

function dangerousVerificationReason(value) {
  const command = String(value ?? "").trim();
  if (!command) return "missing_verification_command";

  if (/[;&|<>`]/.test(command)) {
    return "unbounded_verification_command";
  }

  if (/\b(rm\s+-rf|git\s+reset\s+--hard|git\s+push\s+--force|gh\s+pr\s+merge|npm\s+publish|vercel\s+--prod)\b/i.test(command)) {
    return "unsafe_verification_command";
  }

  return "";
}

function getExecutorPacket(job) {
  return job?.build?.executor_packet ?? job?.build?.executorPacket ?? job?.executor_packet ?? job?.execution_packet ?? null;
}

export function validateExecutorPacket(packet, { jobOwnedFiles = [] } = {}) {
  if (!packet || typeof packet !== "object" || Array.isArray(packet)) {
    return { ok: false, reason: "missing_executor_packet" };
  }

  for (const field of REQUIRED_EXECUTOR_PACKET_FIELDS) {
    if (!(field in packet)) {
      return { ok: false, reason: "missing_required_field", field };
    }
  }

  if (!hasText(packet.repo)) {
    return { ok: false, reason: "missing_repo" };
  }

  if (!hasText(packet.branch_or_worktree)) {
    return { ok: false, reason: "missing_branch_or_worktree" };
  }

  if (!hasListItems(packet.owned_files)) {
    return { ok: false, reason: "missing_owned_files" };
  }

  const ownedFiles = packet.owned_files.map(normalizePath);
  const unsafeFile = ownedFiles.find((file) => isUnsafePath(file));
  if (unsafeFile) {
    return { ok: false, reason: "unsafe_owned_file", file: unsafeFile };
  }

  const jobOwned = new Set((jobOwnedFiles || []).map(normalizePath));
  if (jobOwned.size > 0) {
    const outside = ownedFiles.find((file) => !jobOwned.has(file));
    if (outside) {
      return { ok: false, reason: "packet_file_outside_job_ownership", file: outside };
    }
  }

  if (!hasListItems(packet.acceptance)) {
    return { ok: false, reason: "missing_acceptance" };
  }

  if (!hasListItems(packet.verification)) {
    return { ok: false, reason: "missing_verification" };
  }

  const unsafeVerification = packet.verification
    .map((command) => ({ command: String(command ?? ""), reason: dangerousVerificationReason(command) }))
    .find((item) => item.reason);
  if (unsafeVerification) {
    return { ok: false, reason: unsafeVerification.reason, command: unsafeVerification.command };
  }

  if (!hasListItems(packet.stop_conditions)) {
    return { ok: false, reason: "missing_stop_conditions" };
  }

  if (!hasProofRequirement(packet.proof_required)) {
    return { ok: false, reason: "missing_proof_required" };
  }

  if (!isCommonSensePassAllowed(packet.commonsensepass_result)) {
    return { ok: false, reason: "commonsensepass_not_passed" };
  }

  for (const field of ["authority", "requested_authority", "permissions", "allowed_actions", "actions", "next_action"]) {
    const values = Array.isArray(packet[field]) ? packet[field] : [packet[field]];
    const unsafe = values.find((value) => unsafeAuthorityReason(value));
    if (unsafe) {
      return { ok: false, reason: unsafeAuthorityReason(unsafe), field };
    }
  }

  return {
    ok: true,
    owned_files: ownedFiles,
    verification: packet.verification.map((item) => String(item).trim()).filter(Boolean),
  };
}

export function validateCodingRoomBuildPatch({ patch, ownedFiles = [], maxBytes = DEFAULT_PATCH_MAX_BYTES } = {}) {
  const text = String(patch ?? "");
  if (!text.trim()) {
    return { ok: false, reason: "missing_patch" };
  }

  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    return { ok: false, reason: "patch_too_large" };
  }

  if (/^GIT binary patch$/m.test(text) || /^Binary files /m.test(text)) {
    return { ok: false, reason: "binary_patch_not_allowed" };
  }

  const owned = new Set((ownedFiles || []).map(normalizePath));
  if (owned.size === 0) {
    return { ok: false, reason: "missing_owned_files" };
  }

  const changedFiles = new Set();
  const lines = text.split(/\r?\n/);
  const unsafeMetadata = lines.find((line) =>
    /^(rename|copy) (from|to) /.test(line) ||
    /^(new|deleted) file mode /.test(line) ||
    /^(old|new) mode /.test(line) ||
    /^similarity index /.test(line) ||
    /^dissimilarity index /.test(line)
  );
  if (unsafeMetadata) {
    return { ok: false, reason: "unsafe_patch_metadata" };
  }

  for (const line of lines) {
    if (line.startsWith("diff --git ")) {
      const match = /^diff --git\s+a\/(.+?)\s+b\/(.+)$/.exec(line);
      if (!match) {
        return { ok: false, reason: "malformed_diff_header" };
      }

      const left = parseDiffPath(match[1]);
      const right = parseDiffPath(match[2]);
      for (const file of [left, right]) {
        if (isUnsafePath(file)) {
          return { ok: false, reason: "unsafe_patch_path", file };
        }
      }

      if (left !== right) {
        return { ok: false, reason: "rename_or_move_not_allowed", file: right };
      }

      changedFiles.add(right);
      continue;
    }

    if (line.startsWith("--- ") || line.startsWith("+++ ")) {
      const file = parseDiffPath(line.slice(4));
      if (file === "/dev/null") {
        return { ok: false, reason: "create_or_delete_not_allowed" };
      }

      if (isUnsafePath(file)) {
        return { ok: false, reason: "unsafe_patch_path", file };
      }

      changedFiles.add(file);
    }
  }

  if (changedFiles.size === 0) {
    return { ok: false, reason: "patch_has_no_files" };
  }

  const outside = [...changedFiles].find((file) => !owned.has(file));
  if (outside) {
    return { ok: false, reason: "patch_file_outside_ownership", file: outside };
  }

  return { ok: true, changed_files: [...changedFiles] };
}

export async function runGitApplyPatch(patch, { cwd = process.cwd(), check = false } = {}) {
  return new Promise((resolve) => {
    const child = spawn("git", check ? ["apply", "--check", "--whitespace=error"] : ["apply", "--whitespace=nowarn"], {
      cwd,
      shell: false,
      windowsHide: true,
      env: process.env,
    });
    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      resolve({
        ok: false,
        exit_code: null,
        output: compactOutput(error.message),
      });
    });
    child.on("close", (code) => {
      resolve({
        ok: code === 0,
        exit_code: code,
        output: compactOutput(`${stdout}\n${stderr}`),
      });
    });
    child.stdin.end(patch);
  });
}

function buildBlocker({ job, blocker, now }) {
  return {
    ok: true,
    job: submitCodingRoomBuildResult({
      job,
      buildResult: {
        result: "blocker",
        blocker,
      },
      now,
    }).job,
    result: "blocker",
    reason: "build_blocker",
    blocker,
  };
}

export async function executeCodingRoomBuildJob({
  job,
  cwd = process.cwd(),
  applyPatch = runGitApplyPatch,
  now = new Date().toISOString(),
  dryRun = false,
} = {}) {
  if (!job) {
    return { ok: false, reason: "missing_job" };
  }

  if (job.status !== "claimed" && job.status !== "building") {
    return { ok: false, reason: "job_not_claimed" };
  }

  const executorPacket = getExecutorPacket(job);
  if (executorPacket) {
    const packetValidation = validateExecutorPacket(executorPacket, {
      jobOwnedFiles: job.owned_files || [],
    });
    if (!packetValidation.ok) {
      return buildBlocker({
        job,
        blocker: `Executor packet rejected: ${packetValidation.reason}${packetValidation.field ? ` (${packetValidation.field})` : ""}${packetValidation.file ? ` (${packetValidation.file})` : ""}`,
        now,
      });
    }
  }

  const patch = job.build?.patch || "";
  const validation = validateCodingRoomBuildPatch({
    patch,
    ownedFiles: job.owned_files || [],
  });
  if (!validation.ok) {
    return buildBlocker({
      job,
      blocker: `Build patch rejected: ${validation.reason}${validation.file ? ` (${validation.file})` : ""}`,
      now,
    });
  }

  const checked = await applyPatch(patch, { cwd, check: true });
  if (!checked.ok) {
    return buildBlocker({
      job,
      blocker: `Build patch check failed: ${checked.output || `exit ${checked.exit_code}`}`,
      now,
    });
  }

  if (dryRun) {
    return {
      ok: true,
      job,
      result: "dry_run",
      changed_files: validation.changed_files,
    };
  }

  const applied = await applyPatch(patch, { cwd, check: false });
  if (!applied.ok) {
    return buildBlocker({
      job,
      blocker: `Build patch apply failed: ${applied.output || `exit ${applied.exit_code}`}`,
      now,
    });
  }

  const result = submitCodingRoomBuildResult({
    job,
    buildResult: {
      result: "done",
      changedFiles: validation.changed_files,
      summary: "Applied owned-file build patch; ready for proof executor.",
    },
    now,
  });

  return {
    ok: result.ok,
    reason: result.reason,
    job: result.job,
    result: result.ok ? "done" : "blocker",
    changed_files: validation.changed_files,
  };
}

export async function executeCodingRoomBuildLedgerJob({
  ledger,
  jobId,
  cwd = process.cwd(),
  applyPatch = runGitApplyPatch,
  now = new Date().toISOString(),
  dryRun = false,
} = {}) {
  const next = createCodingRoomJobLedger({
    jobs: ledger?.jobs || [],
    updatedAt: now,
  });
  const index = next.jobs.findIndex((job) => job.job_id === jobId);
  if (index === -1) {
    return { ok: false, reason: "missing_job" };
  }

  const result = await executeCodingRoomBuildJob({
    job: next.jobs[index],
    cwd,
    applyPatch,
    now,
    dryRun,
  });

  if (result.job) {
    next.jobs[index] = result.job;
  }

  return {
    ...result,
    ledger: next,
  };
}

export async function executeCodingRoomBuildLedgerFile({
  ledgerPath,
  jobId,
  cwd = process.cwd(),
  dryRun = false,
} = {}) {
  if (!ledgerPath) {
    return { ok: false, reason: "missing_ledger_path" };
  }

  if (!jobId) {
    return { ok: false, reason: "missing_job_id" };
  }

  const ledger = await readCodingRoomJobLedger(ledgerPath);
  const result = await executeCodingRoomBuildLedgerJob({
    ledger,
    jobId,
    cwd,
    dryRun,
  });

  if (result.ok && !dryRun) {
    await writeCodingRoomJobLedger(ledgerPath, result.ledger);
  }

  return {
    ...result,
    dry_run: dryRun,
    ledger_path: ledgerPath,
  };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  executeCodingRoomBuildLedgerFile({
    ledgerPath: getArg("ledger", process.env.CODING_ROOM_LEDGER_PATH || ""),
    jobId: getArg("job-id", process.env.CODING_ROOM_JOB_ID || ""),
    dryRun: process.argv.includes("--dry-run") || parseBoolean(process.env.CODING_ROOM_BUILD_DRY_RUN),
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

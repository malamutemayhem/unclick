// WriterLane OpenHands execution backend (execution slice).
//
// Dead code. Nothing in this repo wires it yet: not the autopilot runner, not
// CodeRoom, not OpenHands, not the watcher, not cron. This is the AFK-middle
// writer that sits BEHIND the merged backend selector (writerlane-router.ts):
// given a job it tries a free model, validates the resulting diff, and either
// returns a trusted patch or fails closed with an exact reason. Selection among
// BACKENDS stays in the router; selection among FREE MODELS (the fallback
// chain) stays here, inside this backend.
//
// Purity / safety:
//   - Implements the WriterLaneBackend contract; produce() FAILS CLOSED and
//     never throws.
//   - The OpenHands runner is INJECTED. This module never shells out, never
//     spawns uvx / openhands, never touches the network, a DB, the filesystem,
//     git, or secrets. The trusted real-diff capture (git diff of owned files)
//     lives in the injected runner / proof-runner world, not here. Mirrors the
//     injected-runner pattern in scripts/pinballwake-openhands-worker.mjs.
//   - FREE models only by default. Non-free models are an explicit,
//     off-by-default option (allowNonFreeModels), never the default.
//   - The diff gate is pure: canned / echoed / empty / unowned / untrusted
//     output can NEVER pass as autonomy proof.

import {
  inferWriterLaneTaskKind,
  type WriterLaneTaskKind,
} from "./writerlane-router.js";
import {
  WRITERLANE_FREE_MODELS,
  isFreeModelSlug,
  rankFreeModelsForTask,
  type WriterLaneFreeModel,
} from "./writerlane-free-models.js";
import type {
  WriterLaneBackend,
  WriterLaneInput,
  WriterLaneProofMode,
  WriterLaneResult,
  WriterLaneScopePack,
  WriterLaneSuccess,
} from "./writerlane-types.js";

export const OPENHANDS_BACKEND_KIND = "openhands";

// Mirrors scripts/pinballwake-openhands-worker.mjs defaults so the lib and the
// real driver agree on caps.
export const DEFAULT_OPENHANDS_TIMEOUT_MS = 20 * 60 * 1000;
export const MAX_PATCH_BYTES = 120_000;

// How the injected runner says it obtained the diff. Only "worktree" - a diff
// captured from a real git diff of the owned files (see
// captureOwnedWorktreeDiff in pinballwake-openhands-proof-runner.mjs) - is
// trusted enough to count as autonomy proof. Everything else is untrusted.
export type OpenHandsDiffSource =
  | "worktree"
  | "model_stdout"
  | "canned"
  | "echoed"
  | "unknown";

export interface OpenHandsRunInput {
  readonly model: WriterLaneFreeModel;
  readonly prompt: string;
  readonly scopePack: WriterLaneScopePack;
  readonly proofMode: WriterLaneProofMode;
  readonly timeoutMs: number;
}

export interface OpenHandsRunResult {
  readonly ok: boolean;
  // Unified diff. For a trusted result this is the captured git diff of the
  // owned files; for untrusted sources it may be raw model text.
  readonly patch?: string;
  readonly changedFiles?: string[];
  readonly diffSource?: OpenHandsDiffSource;
  // Exact failure reason when ok === false.
  readonly reason?: string;
  readonly summary?: string;
}

// The injected runner. Same shape spirit as the .mjs worker's
// `openHands: async ({ prompt, job, scopePack, timeoutMs }) => result`, adapted
// for WriterLane (per-model + proofMode). It must resolve to an
// OpenHandsRunResult; if it throws, the chain records openhands_runner_threw
// and moves on.
export type OpenHandsRunner = (
  input: OpenHandsRunInput,
) => Promise<OpenHandsRunResult>;

export interface OpenHandsBackendOptions {
  readonly runner: OpenHandsRunner;
  // Defaults to the free-model registry. Useful to inject a fixed chain in
  // tests.
  readonly models?: WriterLaneFreeModel[];
  // OFF by default. When false (the default) any non-":free" slug in `models`
  // is excluded before the chain runs. Setting true is the explicit, opt-in
  // door for paid / subscription models; it is never the default.
  readonly allowNonFreeModels?: boolean;
  readonly timeoutMs?: number;
  readonly maxPatchBytes?: number;
  readonly buildPrompt?: (
    input: WriterLaneInput,
    model: WriterLaneFreeModel,
  ) => string;
  readonly inferTaskKind?: (input: WriterLaneInput) => WriterLaneTaskKind;
}

// One entry per free model the chain actually attempted, in order.
export interface OpenHandsAttempt {
  readonly modelId: string;
  readonly openRouterModel: string;
  readonly ok: boolean;
  // Exact rejection reason code when ok === false.
  readonly reason?: string;
}

// Full trace returned by runChain. produce() returns only `.result` to satisfy
// the contract; tests and future callers can read the attempt trail here.
export interface OpenHandsExecOutcome {
  readonly result: WriterLaneResult;
  readonly attempts: OpenHandsAttempt[];
  readonly taskKind: WriterLaneTaskKind;
  readonly modelsTried: string[];
}

interface GateAccept {
  readonly ok: true;
  readonly patch: string;
  readonly changedFiles: string[];
  readonly autonomyProof: boolean;
}

interface GateReject {
  readonly ok: false;
  readonly reason: string;
}

export type DiffGateOutcome = GateAccept | GateReject;

export interface DiffGateInput {
  readonly result: OpenHandsRunResult | null | undefined;
  readonly ownedFiles: string[];
  readonly proofMode: WriterLaneProofMode;
  readonly prompt: string;
  readonly maxPatchBytes: number;
}

// Pure real-diff gate. Decides whether one runner result yields a usable,
// trusted diff. By construction it NEVER returns autonomyProof = true unless
// the diff came from a real worktree capture under autonomy mode, so canned /
// echoed / empty / unowned output can never be passed off as autonomous work.
export function gateOpenHandsDiff(input: DiffGateInput): DiffGateOutcome {
  const { result, proofMode, prompt, maxPatchBytes } = input;

  if (!result || result.ok === false) {
    return { ok: false, reason: reasonOr(result?.reason, "openhands_reported_failure") };
  }

  const patch = String(result.patch ?? "");
  if (!patch.trim()) {
    return { ok: false, reason: "openhands_missing_unified_diff" };
  }

  if (Buffer.byteLength(patch, "utf8") > maxPatchBytes) {
    return { ok: false, reason: "openhands_patch_too_large" };
  }

  if (isEchoOfPrompt(patch, prompt)) {
    return { ok: false, reason: "openhands_echoed_prompt_diff" };
  }

  if (!looksLikeUnifiedDiff(patch)) {
    return { ok: false, reason: "openhands_missing_unified_diff" };
  }

  const changedFiles = extractChangedFilesFromPatch(patch);
  if (changedFiles.length === 0) {
    return { ok: false, reason: "openhands_changed_files_required" };
  }

  const owned = new Set(normalizePaths(input.ownedFiles));
  const outside = changedFiles.find((file) => !owned.has(file));
  if (outside) {
    return { ok: false, reason: "openhands_unowned_worktree_diff" };
  }

  const trusted = (result.diffSource ?? "unknown") === "worktree";

  // Autonomy mode demands a real captured diff. Untrusted sources (model
  // stdout, canned, echoed, unknown) cannot stand in for autonomous work.
  if (proofMode === "autonomy" && !trusted) {
    return { ok: false, reason: "openhands_untrusted_diff_source" };
  }

  return {
    ok: true,
    patch,
    changedFiles,
    // True only for a real worktree diff under autonomy mode. Plumbing mode
    // never claims autonomy.
    autonomyProof: proofMode === "autonomy" && trusted,
  };
}

export class OpenHandsWriterLaneBackend implements WriterLaneBackend {
  readonly kind = OPENHANDS_BACKEND_KIND;
  readonly isFixture = false;

  constructor(private readonly options: OpenHandsBackendOptions) {}

  async produce(input: WriterLaneInput): Promise<WriterLaneResult> {
    return (await this.runChain(input)).result;
  }

  // Walks the ranked free-model chain. Tries each model via the injected
  // runner, gates the diff, and returns on the first trusted success. Records
  // every model tried with its exact rejection reason; if all fail, fails
  // closed with writerlane_free_chain_exhausted.
  async runChain(input: WriterLaneInput): Promise<OpenHandsExecOutcome> {
    const inferTaskKind = this.options.inferTaskKind ?? inferWriterLaneTaskKind;
    const taskKind = inferTaskKind(input);
    const attempts: OpenHandsAttempt[] = [];

    const finish = (result: WriterLaneResult): OpenHandsExecOutcome => ({
      result,
      attempts,
      taskKind,
      modelsTried: attempts.map((attempt) => attempt.modelId),
    });

    const runner = this.options.runner;
    if (typeof runner !== "function") {
      return finish({ ok: false, reason: "openhands_runner_not_provided" });
    }

    const allowNonFree = this.options.allowNonFreeModels === true;
    const baseModels = this.options.models ?? WRITERLANE_FREE_MODELS;
    const eligible = baseModels.filter(
      (model) => allowNonFree || isFreeModelSlug(model.openRouterModel),
    );
    if (eligible.length === 0) {
      return finish({ ok: false, reason: "writerlane_no_free_models" });
    }

    const ranked = rankFreeModelsForTask(taskKind, eligible);
    const timeoutMs = this.options.timeoutMs ?? DEFAULT_OPENHANDS_TIMEOUT_MS;
    const maxPatchBytes = this.options.maxPatchBytes ?? MAX_PATCH_BYTES;
    const buildPrompt = this.options.buildPrompt ?? buildWriterLanePrompt;

    for (const model of ranked) {
      const prompt = buildPrompt(input, model);
      let runResult: OpenHandsRunResult;
      try {
        runResult = await runner({
          model,
          prompt,
          scopePack: input.scopePack,
          proofMode: input.proofMode,
          timeoutMs,
        });
      } catch {
        attempts.push({
          modelId: model.id,
          openRouterModel: model.openRouterModel,
          ok: false,
          reason: "openhands_runner_threw",
        });
        continue;
      }

      const gate = gateOpenHandsDiff({
        result: runResult,
        ownedFiles: input.scopePack.ownedFiles,
        proofMode: input.proofMode,
        prompt,
        maxPatchBytes,
      });

      if (!gate.ok) {
        attempts.push({
          modelId: model.id,
          openRouterModel: model.openRouterModel,
          ok: false,
          reason: gate.reason,
        });
        continue;
      }

      attempts.push({
        modelId: model.id,
        openRouterModel: model.openRouterModel,
        ok: true,
      });

      const success: WriterLaneSuccess = {
        ok: true,
        patch: gate.patch,
        changedFiles: gate.changedFiles,
        proof: {
          autonomyProof: gate.autonomyProof,
          notes: `openhands free-model writer: ${model.id} (${model.openRouterModel}); trusted=${gate.autonomyProof}`,
        },
      };
      return finish(success);
    }

    return finish({ ok: false, reason: "writerlane_free_chain_exhausted" });
  }
}

// Convenience factory. No default singleton: a runner must always be injected,
// so there is no inert "default" backend to misuse.
export function createOpenHandsWriterLaneBackend(
  options: OpenHandsBackendOptions,
): OpenHandsWriterLaneBackend {
  return new OpenHandsWriterLaneBackend(options);
}

// Deterministic, side-effect-free prompt builder. Mirrors the spirit of
// buildOpenHandsTaskPrompt in the .mjs worker but stays inside the WriterLane
// contract types.
export function buildWriterLanePrompt(
  input: WriterLaneInput,
  model: WriterLaneFreeModel,
): string {
  const scopePack = input.scopePack;
  const lines = [
    "You are an UnClick WriterLane free-model writer running AFK.",
    "Return ONLY a unified diff (git patch) limited to the owned files.",
    "Do not commit, push, merge, deploy, or touch anything outside the owned files.",
    `Model: ${model.openRouterModel}`,
    `Proof mode: ${input.proofMode}`,
    `Change intent: ${scopePack.changeIntent}`,
    "Owned files:",
    ...scopePack.ownedFiles.map((file) => `- ${file}`),
  ];
  if (scopePack.proofRequirements.length) {
    lines.push("Proof requirements:");
    lines.push(...scopePack.proofRequirements.map((item) => `- ${item}`));
  }
  return lines.join("\n");
}

// A patch must carry real unified-diff structure: either a git header or the
// classic ---/+++/@@ trio. This rejects plain prose and echoed prompts.
export function looksLikeUnifiedDiff(patch: string): boolean {
  const lines = String(patch ?? "").split(/\r?\n/);
  const hasGitHeader = lines.some((line) => line.startsWith("diff --git "));
  if (hasGitHeader) return true;
  const hasMinus = lines.some((line) => line.startsWith("--- "));
  const hasPlus = lines.some((line) => line.startsWith("+++ "));
  const hasHunk = lines.some((line) => line.startsWith("@@"));
  return hasMinus && hasPlus && hasHunk;
}

// Parse the set of changed file paths from a unified diff. Prefers the git
// header's b/ path and falls back to +++ lines. Pure string work.
export function extractChangedFilesFromPatch(patch: string): string[] {
  const files: string[] = [];
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
  return [
    ...new Set(
      normalizePaths(files).filter((file) => file && file !== "dev/null"),
    ),
  ];
}

function isEchoOfPrompt(patch: string, prompt: string): boolean {
  const normalizedPatch = patch.replace(/\s+/g, " ").trim();
  const normalizedPrompt = String(prompt ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalizedPrompt) return false;
  return (
    normalizedPatch === normalizedPrompt ||
    normalizedPatch.includes(normalizedPrompt)
  );
}

function normalizePaths(values: string[]): string[] {
  return (values ?? [])
    .map((value) =>
      String(value ?? "")
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")
        .trim(),
    )
    .filter(Boolean);
}

function reasonOr(reason: string | undefined | null, fallback: string): string {
  const trimmed = String(reason ?? "").trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

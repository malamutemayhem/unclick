// WriterLane free-model registry (execution backend slice).
//
// Dead code. Nothing in this repo wires it yet: not the autopilot runner, not
// CodeRoom, not OpenHands, not the watcher. This is the data-driven catalog of
// the FREE OpenRouter models the OpenHands execution backend is allowed to try
// as AFK backup hands, plus pure ranking helpers used to order the fallback
// chain.
//
// Pure data + pure functions. No DB, no LLM, no network, no shell, no side
// effects. Free models ONLY: every row's openRouterModel MUST be a ":free"
// OpenRouter slug (or the explicit free meta-route). Paid / subscription models
// are an explicit, off-by-default concern handled by the backend, never seeded
// here.

import type { WriterLaneTaskKind } from "./writerlane-router.js";

// Coarse capability tags for a free model. Used only to bias ranking; the diff
// gate, not these tags, is what actually decides whether output is trustworthy.
export type FreeModelCapability =
  | "code" // can attempt code patches
  | "docs" // doc / markdown editing
  | "reasoning" // multi-step reasoning
  | "fast"; // low latency, small context

// Vetting status, set from real run verdicts:
//   - "vetted":  a real run produced WORKING, clean output (tests + scope gate).
//   - "trial":   real and usable, but no clean verdict yet - never ran, or only
//                ever rate-limited, or passed with a concern not yet trusted.
//                Treat output as unproven until a live run confirms it.
//   - "flagged": a real run gave a BAD verdict (broken / junk output). Kept in
//                the registry but deprioritized hard; the validator layer is the
//                safety net that rejects its junk at runtime.
// See requireVetted on the backend for the strict mode that admits only vetted
// models.
export type FreeModelStatus = "vetted" | "trial" | "flagged";

// Machine-readable cautions about a model's observed failure modes. Advisory:
// they document why a row is ranked where it is. The validator layer, not these
// tags, is what actually rejects bad output at runtime.
//   - "over-edit-risk":      observed deleting docstrings / editing beyond scope.
//   - "junk-prone":          observed leaking chat-template tags / non-code junk.
//   - "unverified":          real slug, but no clean verdict yet (e.g. only ever
//                            rate-limited).
//   - "tiny":                too small to trust for non-trivial code.
//   - "unpredictable-route": a meta auto-route, not a pinned model.
export type FreeModelCaution =
  | "over-edit-risk"
  | "junk-prone"
  | "unverified"
  | "tiny"
  | "unpredictable-route";

export interface WriterLaneFreeModel {
  // Stable internal id used in attempt logs and fallback records.
  readonly id: string;
  // OpenRouter model slug. MUST be free: a ":free" slug or the free meta-route
  // (see isFreeModelSlug). Do not invent slugs: only add rows for models
  // verified to exist and to be free.
  readonly openRouterModel: string;
  // Human-readable parameter scale, e.g. "70B". Advisory only; "unknown" when
  // the size is not encoded in the model name.
  readonly paramScale: string;
  readonly capabilities: FreeModelCapability[];
  // Task kinds this model is comparatively good at (mirrors the router's
  // WriterLaneTaskKind vocabulary so ranking can line up with task inference).
  readonly strengths: WriterLaneTaskKind[];
  // Vetting status. New rows start at "trial" until a real run gives a verdict.
  readonly status: FreeModelStatus;
  // Observed failure modes (advisory). Absent / empty means none recorded.
  readonly cautions?: FreeModelCaution[];
  // True for a reasoner-class model reserved for genuinely hard problems. Such
  // models are kept OFF the default chain - selectDefaultFreeChain excludes them
  // unless hardProblem is set. On well-specified slices a reasoner buys nothing
  // but latency and tokens (the R1-vs-V finding: identical minimal code, ~1.7x
  // slower, ~2.6x the output), so it must never lead the default path.
  readonly reasonerClass?: boolean;
  // Higher is tried earlier. This is the PRIMARY ranking key (the seeded order
  // below), with task-fit as a tiebreaker. Defaults to 0.
  readonly priority?: number;
  readonly notes?: string;
}

// ---------------------------------------------------------------------------
// FREE-MODEL REGISTRY
//
// Ranked candidate chain. ALL real models below are verified-real free
// OpenRouter ids. The order and status now reflect real code-slice run verdicts
// (not a flat seed):
//   - PROVEN-CLEAN coders are ranked top and marked "vetted": openai/gpt-oss-120b
//     (fastest, beat both paid DeepSeeks on a real code slice), minimax/minimax-m2.5,
//     and poolside/laguna-m.1 - each wrote WORKING code that passed tests + the
//     scope gate.
//   - UNVERIFIED reals stay "trial" (cautions: ["unverified"]): they only ever
//     rate-limited and never got a verdict (qwen3-coder, deepseek-v4-flash,
//     llama-3.3-70b, gemma-4-31b).
//   - glm-4.5-air is "trial" with cautions ["over-edit-risk"]: it passed tests but
//     DELETED a docstring (over-edited, +14/-14). The validator's diff-budget /
//     doc-preservation guard is what gates that risk.
//   - poolside/laguna-xs.2 is "flagged" + deprioritized: it passed the scope gate
//     but shipped a stray "</assistant>" chat-template tag (a syntax error). Kept
//     only so the validator can demonstrate catching its junk.
//
// Ranking is priority-primary (this seeded order), task-fit as a tiebreaker, id
// as the final tiebreak. To EXTEND: add a row with a real ":free" slug and a
// priority that places it in the chain. The tiny Liquid model and the
// openrouter/free meta-route are deliberately last-ditch only. Reasoner-class
// rows (reasonerClass: true) stay OFF the default chain (selectDefaultFreeChain).
//
//   { id, openRouterModel: "<vendor>/<model>:free", paramScale, capabilities,
//     strengths, status, cautions?, reasonerClass?, priority, notes }
//
// <-- ADD / PROMOTE FREE MODEL ROWS HERE. -->
// ---------------------------------------------------------------------------
export const WRITERLANE_FREE_MODELS: WriterLaneFreeModel[] = [
  {
    // PROVEN best for code: 5/5 tests + scope gate on a real code slice, fastest
    // of the field (993ms), beat both paid DeepSeeks at equal quality.
    id: "gpt-oss-120b",
    openRouterModel: "openai/gpt-oss-120b:free",
    paramScale: "120B",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "vetted",
    priority: 100,
    notes:
      "Proven #1 code writer: working code, 5/5 tests + scope gate, fastest of the field.",
  },
  {
    // Proven-clean coder: wrote working code (5/5 tests + scope gate).
    id: "minimax-m2.5",
    openRouterModel: "minimax/minimax-m2.5:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "vetted",
    priority: 90,
    notes: "Proven coder: working code, 5/5 tests + scope gate.",
  },
  {
    // Proven-clean coder: wrote working code (5/5 tests + scope gate).
    id: "poolside-laguna-m1",
    openRouterModel: "poolside/laguna-m.1:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "vetted",
    priority: 80,
    notes: "Proven coder: working code, 5/5 tests + scope gate.",
  },
  {
    // Historically the rank-1 candidate but only ever rate-limited (HTTP 429) on
    // the shared free pool, so it has NO verdict yet. Unverified, not unfit.
    id: "qwen3-coder",
    openRouterModel: "qwen/qwen3-coder:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    cautions: ["unverified"],
    priority: 70,
    notes:
      "Strong code candidate but UNVERIFIED: only ever rate-limited, never got a gate verdict.",
  },
  {
    // Passed tests but DELETED a docstring (over-edited, +14/-14). Usable, but the
    // validator diff-budget / doc-preservation guard must gate it.
    id: "glm-4.5-air",
    openRouterModel: "z-ai/glm-4.5-air:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    cautions: ["over-edit-risk"],
    priority: 50,
    notes:
      "Passed tests but over-edited (deleted a docstring, +14/-14). Gate with the diff-budget guard.",
  },
  {
    id: "deepseek-v4-flash",
    openRouterModel: "deepseek/deepseek-v4-flash:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning", "fast"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    cautions: ["unverified"],
    priority: 40,
    notes: "Unverified code candidate: rate-limited out before a verdict.",
  },
  {
    id: "llama-3.3-70b",
    openRouterModel: "meta-llama/llama-3.3-70b-instruct:free",
    paramScale: "70B",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    cautions: ["unverified"],
    priority: 30,
    notes: "Unverified general instruct candidate: rate-limited out before a verdict.",
  },
  {
    id: "gemma-4-31b",
    openRouterModel: "google/gemma-4-31b-it:free",
    paramScale: "31B",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    cautions: ["unverified"],
    priority: 20,
    notes: "Unverified instruct candidate: rate-limited out before a verdict.",
  },
  {
    // FLAGGED junk-prone: passed the scope gate but shipped a stray
    // "</assistant>" chat-template tag (a JS syntax error). Deprioritized hard;
    // kept only so the validator can demonstrate rejecting its junk.
    id: "poolside-laguna-xs2",
    openRouterModel: "poolside/laguna-xs.2:free",
    paramScale: "unknown",
    capabilities: ["code", "fast"],
    strengths: ["backend", "script", "tests", "config", "mixed"],
    status: "flagged",
    cautions: ["junk-prone"],
    priority: -5,
    notes:
      "Junk-prone: passed the scope gate but leaked a </assistant> tag (syntax error). Deprioritized.",
  },
  {
    // Tiny last-ditch only. The whole point of this slice is to STOP betting AFK
    // writing on a 1.2B nudge model, so it sits near the bottom of the chain.
    id: "liquid-lfm-2.5-1.2b",
    openRouterModel: "liquid/lfm-2.5-1.2b-instruct:free",
    paramScale: "1.2B",
    capabilities: ["fast", "docs"],
    strengths: ["docs"],
    status: "trial",
    cautions: ["tiny"],
    priority: -10,
    notes:
      "Tiny last-ditch fallback (1.2B). Likely too weak for non-trivial code; kept only so the chain is never empty.",
  },
  {
    // Canary / absolute last resort. The openrouter/free meta auto-route is less
    // predictable than a pinned slug, so it is never a primary route.
    id: "openrouter-free-meta",
    openRouterModel: "openrouter/free",
    paramScale: "n/a (meta route)",
    capabilities: ["reasoning"],
    strengths: ["mixed"],
    status: "trial",
    cautions: ["unpredictable-route"],
    priority: -20,
    notes:
      "Unpredictable free meta auto-route. Canary / last fallback only, never a primary route.",
  },
];

const FREE_META_ROUTES: ReadonlySet<string> = new Set(["openrouter/free"]);

// A slug counts as free when it carries the ":free" suffix OpenRouter uses for
// no-cost routes, or it is the explicit free meta-route. Anything else is
// treated as paid / unknown and excluded by default.
export function isFreeModelSlug(slug: string): boolean {
  const normalized = String(slug ?? "")
    .trim()
    .toLowerCase();
  return normalized.endsWith(":free") || FREE_META_ROUTES.has(normalized);
}

export function listWriterLaneFreeModels(): WriterLaneFreeModel[] {
  return WRITERLANE_FREE_MODELS.map((model) => ({ ...model }));
}

export function listFreeModelsByStatus(
  status: FreeModelStatus,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
): WriterLaneFreeModel[] {
  return models.filter((model) => model.status === status).map((m) => ({ ...m }));
}

// Code-ish task kinds. "docs" is intentionally excluded so a docs job does not
// reward a model purely for being code-capable.
const CODE_TASK_KINDS: ReadonlySet<WriterLaneTaskKind> = new Set([
  "backend",
  "frontend",
  "script",
  "config",
  "tests",
  "mixed",
  "unknown",
]);

// Secondary, task-fit signal. Only breaks ties between equal-priority models.
function taskFitScore(
  model: WriterLaneFreeModel,
  taskKind: WriterLaneTaskKind,
): number {
  let score = 0;
  if (model.strengths.includes(taskKind)) {
    score += 30;
  } else if (model.strengths.includes("mixed")) {
    score += 10;
  }
  if (model.capabilities.includes("code") && CODE_TASK_KINDS.has(taskKind)) {
    score += 20;
  }
  if (model.capabilities.includes("docs") && taskKind === "docs") {
    score += 20;
  }
  return score;
}

// Pure, deterministic ranking. Priority is the primary key (the seeded chain
// order), task-fit is the tiebreaker, and id is the final tiebreak so the
// fallback order is stable across runs. Ranks WHATEVER it is given - it does not
// filter reasoner-class rows; selectDefaultFreeChain owns the default-path filter.
export function rankFreeModelsForTask(
  taskKind: WriterLaneTaskKind,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
): WriterLaneFreeModel[] {
  return [...models].sort((left, right) => {
    const byPriority = (right.priority ?? 0) - (left.priority ?? 0);
    if (byPriority !== 0) return byPriority;
    const byFit = taskFitScore(right, taskKind) - taskFitScore(left, taskKind);
    if (byFit !== 0) return byFit;
    return left.id.localeCompare(right.id);
  });
}

// The DEFAULT free-model chain for a task. Reasoner-class models are reserved for
// genuinely hard problems and stay OFF this default path unless hardProblem is
// set. Pure: filter, then rank. Future live wiring should select the chain
// through here (not by calling rankFreeModelsForTask directly) so a reasoner can
// never silently lead the default path.
export function selectDefaultFreeChain(
  taskKind: WriterLaneTaskKind,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
  opts: { hardProblem?: boolean } = {},
): WriterLaneFreeModel[] {
  const pool =
    opts.hardProblem === true
      ? models
      : models.filter((model) => model.reasonerClass !== true);
  return rankFreeModelsForTask(taskKind, pool);
}

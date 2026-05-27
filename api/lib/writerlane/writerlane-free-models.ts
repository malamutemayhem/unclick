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

// Vetting status. Models start as "trial": real, usable now, but NOT yet
// UnClick-vetted - the system should treat their output as unproven until live
// runs validate them. A model is promoted to "vetted" only after real runs
// confirm it. See requireVetted on the backend for the strict mode that admits
// only vetted models.
export type FreeModelStatus = "trial" | "vetted";

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
  // Vetting status. New rows default to "trial".
  readonly status: FreeModelStatus;
  // Higher is tried earlier. This is the PRIMARY ranking key (the seeded order
  // below), with task-fit as a tiebreaker. Defaults to 0.
  readonly priority?: number;
  readonly notes?: string;
}

// ---------------------------------------------------------------------------
// FREE-MODEL REGISTRY
//
// Ranked candidate chain. ALL real models below are verified-real free
// OpenRouter ids, seeded as "trial" (not yet UnClick-vetted): usable now, but
// treated as unproven until live runs validate them, after which a row can be
// promoted to status "vetted".
//
// Ranking is priority-primary (this seeded order), task-fit as a tiebreaker, id
// as the final tiebreak. To EXTEND: add a row with a real ":free" slug and a
// priority that places it in the chain. The tiny Liquid model and the
// openrouter/free meta-route are deliberately last-ditch only.
//
//   { id, openRouterModel: "<vendor>/<model>:free", paramScale, capabilities,
//     strengths, status: "trial", priority, notes }
//
// <-- ADD / PROMOTE FREE MODEL ROWS HERE. -->
// ---------------------------------------------------------------------------
export const WRITERLANE_FREE_MODELS: WriterLaneFreeModel[] = [
  {
    id: "qwen3-coder",
    openRouterModel: "qwen/qwen3-coder:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 100,
    notes: "Rank #1 code writer candidate. Trial until live runs validate it.",
  },
  {
    id: "poolside-laguna-m1",
    openRouterModel: "poolside/laguna-m.1:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 90,
    notes: "Trial code candidate.",
  },
  {
    id: "poolside-laguna-xs2",
    openRouterModel: "poolside/laguna-xs.2:free",
    paramScale: "unknown",
    capabilities: ["code", "fast"],
    strengths: ["backend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 80,
    notes: "Trial small/fast code candidate.",
  },
  {
    id: "deepseek-v4-flash",
    openRouterModel: "deepseek/deepseek-v4-flash:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning", "fast"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 70,
    notes: "Trial code candidate.",
  },
  {
    id: "gpt-oss-120b",
    openRouterModel: "openai/gpt-oss-120b:free",
    paramScale: "120B",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 60,
    notes: "Trial large open-weight candidate.",
  },
  {
    id: "glm-4.5-air",
    openRouterModel: "z-ai/glm-4.5-air:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 50,
    notes: "Trial code candidate.",
  },
  {
    id: "llama-3.3-70b",
    openRouterModel: "meta-llama/llama-3.3-70b-instruct:free",
    paramScale: "70B",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 40,
    notes: "Trial general instruct candidate.",
  },
  {
    id: "minimax-m2.5",
    openRouterModel: "minimax/minimax-m2.5:free",
    paramScale: "unknown",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 30,
    notes: "Trial code candidate.",
  },
  {
    id: "gemma-4-31b",
    openRouterModel: "google/gemma-4-31b-it:free",
    paramScale: "31B",
    capabilities: ["code", "reasoning"],
    strengths: ["backend", "frontend", "script", "tests", "config", "mixed"],
    status: "trial",
    priority: 20,
    notes: "Trial instruct candidate.",
  },
  {
    // Tiny last-ditch only. The whole point of this slice is to STOP betting AFK
    // writing on a 1.2B nudge model, so it sits at the bottom of the chain.
    id: "liquid-lfm-2.5-1.2b",
    openRouterModel: "liquid/lfm-2.5-1.2b-instruct:free",
    paramScale: "1.2B",
    capabilities: ["fast", "docs"],
    strengths: ["docs"],
    status: "trial",
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
// fallback order is stable across runs.
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

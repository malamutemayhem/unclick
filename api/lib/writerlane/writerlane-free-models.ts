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
// are an explicit, off-by-default concern handled by the config + backend, never
// seeded here.
//
// Each row carries INFORMED metadata so the selector makes an evidence-based
// choice, not just a priority number:
//   - bestFor / contextTokens / bestAt : PRE-RESEARCHED model capabilities.
//   - empirical { status, note }        : what OUR dogfooding actually proved.
// The selector ranks by FIT (task-kind affinity) then EMPIRICAL status
// (proven > trial > flagged), with priority as a manual tiebreak. It reads the
// metadata; it never hardcodes model names.
//
// ===========================================================================
// HOW TO ADD / UPDATE / RETIRE A MODEL  (models evolve fast; keep this trivial)
// ===========================================================================
// Everything below is a DATA TABLE. Adding, removing, re-ranking, or re-tagging
// a model is a ONE-ROW edit with NO logic changes:
//
//   ADD     : append one row to WRITERLANE_FREE_MODELS. Required fields:
//             { id, openRouterModel (a real ":free" slug - never invent one),
//               bestFor: ModelAffinity[], contextTokens (advisory; 0 = unknown),
//               bestAt: "<short research note>",
//               empirical: { status: "trial", note: "untested" } }.
//             New models start "trial" until a real run gives a verdict.
//   PROMOTE : after a clean run, set empirical.status -> "proven" and write the
//             evidence into empirical.note (e.g. "5/5 code slice, fastest").
//   FLAG    : after a bad run, set empirical.status -> "flagged" and record the
//             failure mode in empirical.note (e.g. "deleted docstring"). It is
//             kept (so the chain is never empty) but ranks below all proven/trial
//             models of the same affinity; the validator layer rejects its junk.
//   RE-RANK : nudge `priority` (a within-tier tiebreak only - affinity + status
//             dominate). No code edit.
//   RETIRE  : delete the row. No code edit.
//   RESERVE : set reasonerClass: true to keep a reasoner-class model OFF the
//             default chain (hard-problems only - see selectDefaultFreeChain).
//
// Do NOT add selection logic here for a single model. If the table cannot
// express a routing rule, change the SELECTOR (fitScore), not a model name.
// ===========================================================================

import type { WriterLaneTaskKind } from "./writerlane-router.js";

// Pre-researched task affinities. A model lists every category it is good at.
// "general" is a wildcard fallback (a broadly capable model that fits any task
// at reduced weight). reasoning / multimodal are carried as informed metadata;
// the router does not yet infer those task kinds, so they do not currently score
// (extend requiredAffinityForTask when a matching task kind is added).
export type ModelAffinity =
  | "code"
  | "docs"
  | "reasoning"
  | "multimodal"
  | "general";

// Empirical dogfooding verdict tier, set from real run results:
//   - "proven":  a real run produced WORKING, clean output (tests + scope gate).
//   - "trial":   real and usable, but no clean verdict yet - never ran, or only
//                ever rate-limited. Treat output as unproven until a run confirms.
//   - "flagged": a real run gave a BAD verdict (broken / junk output). Kept but
//                deprioritized below all proven/trial of the same affinity; the
//                validator layer is the safety net that rejects its junk.
// See requireProven on the backend for the strict mode that admits only proven
// models.
export type EmpiricalStatus = "proven" | "trial" | "flagged";

export interface EmpiricalVerdict {
  readonly status: EmpiricalStatus;
  // What our dogfooding actually proved (or that it is untested). One short line.
  readonly note: string;
}

export interface WriterLaneFreeModel {
  // Stable internal id used in attempt logs and fallback records.
  readonly id: string;
  // OpenRouter model slug. MUST be free: a ":free" slug or the free meta-route
  // (see isFreeModelSlug). Do not invent slugs: only add rows for models
  // verified to exist and to be free.
  readonly openRouterModel: string;
  // --- pre-researched "best-for" metadata (from model research) ---
  // Task affinities this model is good at. Drives the selector's fit score.
  readonly bestFor: ModelAffinity[];
  // Context window in tokens. Advisory (update freely as a one-row edit); 0 means
  // unknown / varies (e.g. a meta auto-route). Used to filter models that cannot
  // fit a large job (selectDefaultFreeChain minContextTokens).
  readonly contextTokens: number;
  // Short human "best at..." note sourced from model research.
  readonly bestAt: string;
  // --- empirical dogfooding verdict (what OUR runs proved) ---
  readonly empirical: EmpiricalVerdict;
  // --- routing knobs ---
  // True for a reasoner-class model reserved for genuinely hard problems. Kept
  // OFF the default chain (selectDefaultFreeChain excludes it unless hardProblem
  // is set): on well-specified slices a reasoner buys nothing but latency and
  // tokens (the R1-vs-V finding: identical minimal code, ~1.7x slower, ~2.6x the
  // output), so it must never lead the default path.
  readonly reasonerClass?: boolean;
  // Manual within-tier tiebreak (higher tried earlier). Affinity + empirical
  // status dominate; priority only orders models that tie on both. Defaults to 0.
  readonly priority?: number;
}

// ---------------------------------------------------------------------------
// FREE-MODEL REGISTRY  (the data table - see HOW-TO block above)
//
// Rows are grouped for human readability: proven coders, then trial coders, then
// flagged, then tiny / meta last-ditch. NOTE: row order is NOT the chain order.
// The real per-task order is computed by the selector from affinity + empirical
// status + priority, so the chain differs by task kind (a docs job ranks
// docs-affinity models first). Do not assume array order is the fallback order.
// ---------------------------------------------------------------------------
export const WRITERLANE_FREE_MODELS: WriterLaneFreeModel[] = [
  {
    id: "gpt-oss-120b",
    openRouterModel: "openai/gpt-oss-120b:free",
    bestFor: ["code", "docs", "reasoning", "general"],
    contextTokens: 131072,
    bestAt: "Large open-weight generalist; strong, fast code edits and docs.",
    empirical: { status: "proven", note: "5/5 code slice, fastest, beat paid" },
    priority: 100,
  },
  {
    id: "minimax-m2.5",
    openRouterModel: "minimax/minimax-m2.5:free",
    bestFor: ["code", "reasoning", "general"],
    contextTokens: 200000,
    bestAt: "Agentic coding and multi-step reasoning at long context.",
    empirical: { status: "proven", note: "5/5 code slice, clean" },
    priority: 90,
  },
  {
    id: "poolside-laguna-m1",
    openRouterModel: "poolside/laguna-m.1:free",
    bestFor: ["code"],
    contextTokens: 128000,
    bestAt: "Code-specialized writer.",
    empirical: {
      status: "proven",
      note: "5/5 code slice (minor: stray blank line)",
    },
    priority: 80,
  },
  {
    id: "qwen3-coder",
    openRouterModel: "qwen/qwen3-coder:free",
    bestFor: ["code", "reasoning"],
    contextTokens: 262144,
    bestAt: "Coding-specialized with very large context.",
    empirical: {
      status: "trial",
      note: "only ever rate-limited, no verdict yet",
    },
    priority: 70,
  },
  {
    id: "deepseek-v4-flash",
    openRouterModel: "deepseek/deepseek-v4-flash:free",
    bestFor: ["code", "reasoning"],
    contextTokens: 131072,
    bestAt: "Fast code and reasoning.",
    empirical: { status: "trial", note: "rate-limited out, no verdict yet" },
    priority: 60,
  },
  {
    id: "llama-3.3-70b",
    openRouterModel: "meta-llama/llama-3.3-70b-instruct:free",
    bestFor: ["code", "reasoning", "general"],
    contextTokens: 131072,
    bestAt: "General instruct; broad tasks, decent code.",
    empirical: { status: "trial", note: "rate-limited out, no verdict yet" },
    priority: 50,
  },
  {
    id: "gemma-4-31b",
    openRouterModel: "google/gemma-4-31b-it:free",
    bestFor: ["code", "reasoning", "general"],
    contextTokens: 131072,
    bestAt: "Mid-size general instruct.",
    empirical: { status: "trial", note: "rate-limited out, no verdict yet" },
    priority: 40,
  },
  {
    // FLAGGED: passed tests but over-edited (deleted a docstring, +14/-14). The
    // validator's diff-budget / doc-preservation guard is what gates this risk.
    id: "glm-4.5-air",
    openRouterModel: "z-ai/glm-4.5-air:free",
    bestFor: ["code", "reasoning", "general"],
    contextTokens: 131072,
    bestAt: "Lightweight reasoning plus code.",
    empirical: { status: "flagged", note: "over-edits, deleted docstring" },
    priority: 30,
  },
  {
    // FLAGGED: passed the scope gate but shipped a stray "</assistant>" chat-
    // template tag (a JS syntax error). Kept only so the validator can
    // demonstrate rejecting its junk.
    id: "poolside-laguna-xs2",
    openRouterModel: "poolside/laguna-xs.2:free",
    bestFor: ["code"],
    contextTokens: 32768,
    bestAt: "Tiny, fast code drafts.",
    empirical: {
      status: "flagged",
      note: "emits junk (</assistant> tag), broken code",
    },
    priority: 20,
  },
  {
    // Tiny last-ditch only. The whole point of this slice is to STOP betting AFK
    // writing on a 1.2B nudge model, so it sits near the bottom of the chain.
    id: "liquid-lfm-2.5-1.2b",
    openRouterModel: "liquid/lfm-2.5-1.2b-instruct:free",
    bestFor: ["docs", "general"],
    contextTokens: 32768,
    bestAt: "Tiny, fast docs and nudges; too weak for non-trivial code.",
    empirical: { status: "trial", note: "untested tiny last-ditch fallback" },
    priority: 10,
  },
  {
    // Canary / absolute last resort. The openrouter/free meta auto-route is less
    // predictable than a pinned slug, so it is never a primary route.
    id: "openrouter-free-meta",
    openRouterModel: "openrouter/free",
    bestFor: ["general"],
    contextTokens: 0,
    bestAt: "Auto-routed free model; capability and context vary.",
    empirical: { status: "trial", note: "untested unpredictable auto-route" },
    priority: 0,
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
  status: EmpiricalStatus,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
): WriterLaneFreeModel[] {
  return models
    .filter((model) => model.empirical.status === status)
    .map((m) => ({ ...m }));
}

// ---------------------------------------------------------------------------
// SELECTOR  (informed: reads metadata, never hardcodes model names)
// ---------------------------------------------------------------------------

// Score weights. Affinity dominates (relevance first), empirical status is the
// secondary signal (proven > trial > flagged), priority is the final tiebreak.
const AFFINITY_EXACT = 1000; // model.bestFor includes the task's required affinity
const AFFINITY_GENERAL = 300; // model.bestFor includes the "general" wildcard
const STATUS_WEIGHT: Record<EmpiricalStatus, number> = {
  proven: 200,
  trial: 100,
  flagged: 0,
};

// Map a router task kind to the model affinity it needs. Docs jobs need a docs
// writer; everything else needs code. Extend here (one place) when a new task
// kind (e.g. multimodal) starts being inferred.
function requiredAffinityForTask(taskKind: WriterLaneTaskKind): ModelAffinity {
  return taskKind === "docs" ? "docs" : "code";
}

// Pure fit score for one model on one task: affinity match + empirical status.
// Exported so callers / logs can show WHY a model ranked where it did.
export function fitScore(
  model: WriterLaneFreeModel,
  taskKind: WriterLaneTaskKind,
): number {
  const need = requiredAffinityForTask(taskKind);
  let affinity = 0;
  if (model.bestFor.includes(need)) {
    affinity = AFFINITY_EXACT;
  } else if (model.bestFor.includes("general")) {
    affinity = AFFINITY_GENERAL;
  }
  return affinity + STATUS_WEIGHT[model.empirical.status];
}

// Pure, deterministic ranking. Fit (affinity + status) is the primary key,
// priority is the within-tier tiebreak, and id is the final tiebreak so the
// fallback order is stable across runs. Ranks WHATEVER it is given - it does not
// filter reasoner-class rows; selectDefaultFreeChain owns the default-path filter.
export function rankFreeModelsForTask(
  taskKind: WriterLaneTaskKind,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
): WriterLaneFreeModel[] {
  return [...models].sort((left, right) => {
    const byFit = fitScore(right, taskKind) - fitScore(left, taskKind);
    if (byFit !== 0) return byFit;
    const byPriority = (right.priority ?? 0) - (left.priority ?? 0);
    if (byPriority !== 0) return byPriority;
    return left.id.localeCompare(right.id);
  });
}

export interface DefaultChainOptions {
  // Hard-problem mode: include reasoner-class models (off the default path).
  readonly hardProblem?: boolean;
  // Drop models whose context window is smaller than this (advisory contextTokens
  // of 0 = unknown is treated as not meeting any positive minimum).
  readonly minContextTokens?: number;
}

// The DEFAULT free-model chain for a task. Reasoner-class models are reserved for
// genuinely hard problems and stay OFF this default path unless hardProblem is
// set; models too small for a stated minimum context are dropped. Pure: filter,
// then rank. Future live wiring should select the chain through here (not by
// calling rankFreeModelsForTask directly) so a reasoner can never silently lead
// the default path.
export function selectDefaultFreeChain(
  taskKind: WriterLaneTaskKind,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
  opts: DefaultChainOptions = {},
): WriterLaneFreeModel[] {
  let pool =
    opts.hardProblem === true
      ? models
      : models.filter((model) => model.reasonerClass !== true);
  if (typeof opts.minContextTokens === "number") {
    const min = opts.minContextTokens;
    pool = pool.filter((model) => model.contextTokens >= min);
  }
  return rankFreeModelsForTask(taskKind, pool);
}

// Convenience: the single best free model for a task under the default chain, or
// null when the pool is empty.
export function topFreeModelForTask(
  taskKind: WriterLaneTaskKind,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
  opts: DefaultChainOptions = {},
): WriterLaneFreeModel | null {
  return selectDefaultFreeChain(taskKind, models, opts)[0] ?? null;
}

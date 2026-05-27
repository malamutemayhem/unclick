// WriterLane free-model registry - runtime .mjs mirror.
//
// Dead code. Nothing wires it: not the runner, not CodeRoom, not OpenHands, not
// the watcher, not cron.
//
// WHY this file exists as a .mjs duplicate of api/lib/writerlane/writerlane-free-models.ts:
// the autopilot runner (scripts/pinballwake-autonomous-runner.mjs) is plain
// `node ...mjs` with no tsx / build step, so it CANNOT import the TypeScript
// WriterLane lib at runtime. This module is the hand-kept runtime mirror of the
// MERGED registry + selector (PR #1055). The TS file stays the canonical spec;
// keep this in sync as a one-row edit whenever a model row changes there.
//
// Pure data + pure functions. No DB, no LLM, no network, no shell, no side
// effects.

// Empirical dogfooding verdict tier (mirrors EmpiricalStatus in the TS lib).
//   proven  : a real run produced WORKING, clean output (tests + scope gate).
//   trial   : real and usable, but no clean verdict yet (never ran / rate-limited).
//   flagged : a real run gave a BAD verdict (broken / junk output). Kept but
//             deprioritized; the validator layer rejects its junk.

// FREE-MODEL REGISTRY (mirror of WRITERLANE_FREE_MODELS). Row order is NOT the
// chain order: the selector computes the per-task order from affinity + empirical
// status + priority.
export const WRITERLANE_FREE_MODELS = [
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

const FREE_META_ROUTES = new Set(["openrouter/free"]);

// A slug is free when it carries the ":free" suffix or is the free meta-route.
export function isFreeModelSlug(slug) {
  const normalized = String(slug ?? "")
    .trim()
    .toLowerCase();
  return normalized.endsWith(":free") || FREE_META_ROUTES.has(normalized);
}

export function listWriterLaneFreeModels() {
  return WRITERLANE_FREE_MODELS.map((model) => ({ ...model }));
}

export function listFreeModelsByStatus(status, models = WRITERLANE_FREE_MODELS) {
  return models
    .filter((model) => model.empirical.status === status)
    .map((model) => ({ ...model }));
}

// Score weights (mirror the TS selector). Affinity dominates, empirical status is
// the secondary signal, priority is the final tiebreak.
const AFFINITY_EXACT = 1000;
const AFFINITY_GENERAL = 300;
const STATUS_WEIGHT = { proven: 200, trial: 100, flagged: 0 };

// Docs jobs need a docs writer; everything else needs code.
function requiredAffinityForTask(taskKind) {
  return taskKind === "docs" ? "docs" : "code";
}

// Pure fit score for one model on one task: affinity match + empirical status.
export function fitScore(model, taskKind) {
  const need = requiredAffinityForTask(taskKind);
  let affinity = 0;
  if (model.bestFor.includes(need)) {
    affinity = AFFINITY_EXACT;
  } else if (model.bestFor.includes("general")) {
    affinity = AFFINITY_GENERAL;
  }
  return affinity + (STATUS_WEIGHT[model.empirical.status] ?? 0);
}

// Pure, deterministic ranking. Fit is the primary key, priority the within-tier
// tiebreak, id the final tiebreak. Ranks WHATEVER it is given (does not filter
// reasoner-class rows; selectDefaultFreeChain owns the default-path filter).
export function rankFreeModelsForTask(taskKind, models = WRITERLANE_FREE_MODELS) {
  return [...models].sort((left, right) => {
    const byFit = fitScore(right, taskKind) - fitScore(left, taskKind);
    if (byFit !== 0) return byFit;
    const byPriority = (right.priority ?? 0) - (left.priority ?? 0);
    if (byPriority !== 0) return byPriority;
    return left.id.localeCompare(right.id);
  });
}

// The DEFAULT free-model chain for a task. Reasoner-class models stay OFF this
// path unless hardProblem is set; models too small for a stated minimum context
// are dropped. Pure: filter, then rank.
export function selectDefaultFreeChain(taskKind, models = WRITERLANE_FREE_MODELS, opts = {}) {
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

// The single best free model for a task under the default chain, or null.
export function topFreeModelForTask(taskKind, models = WRITERLANE_FREE_MODELS, opts = {}) {
  return selectDefaultFreeChain(taskKind, models, opts)[0] ?? null;
}

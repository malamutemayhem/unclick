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
// OpenRouter slug. Paid / subscription models are an explicit, off-by-default
// concern handled by the backend, never seeded here.

import type { WriterLaneTaskKind } from "./writerlane-router.js";

// Coarse capability tags for a free model. Used only to bias ranking; the diff
// gate, not these tags, is what actually decides whether output is trustworthy.
export type FreeModelCapability =
  | "code" // can attempt code patches
  | "docs" // doc / markdown editing
  | "reasoning" // multi-step reasoning
  | "fast"; // low latency, small context

export interface WriterLaneFreeModel {
  // Stable internal id used in attempt logs and fallback records.
  readonly id: string;
  // OpenRouter model slug. MUST end in ":free" (see isFreeModelSlug). Do not
  // invent slugs: only add rows for models verified to exist and to be free.
  readonly openRouterModel: string;
  // Human-readable parameter scale, e.g. "1.2B". Advisory only.
  readonly paramScale: string;
  readonly capabilities: FreeModelCapability[];
  // Task kinds this model is comparatively good at (mirrors the router's
  // WriterLaneTaskKind vocabulary so ranking can line up with task inference).
  readonly strengths: WriterLaneTaskKind[];
  // Higher is tried earlier when task-fit ties. Defaults to 0.
  readonly priority?: number;
  readonly notes?: string;
}

// ---------------------------------------------------------------------------
// FREE-MODEL REGISTRY
//
// To EXTEND the fallback chain, ADD A ROW HERE. Each row must reference a real
// ":free" OpenRouter slug (free models only). The verified list of
// code-capable free models is tracked separately and lands as additional rows;
// this slice ships only the single free model already inventoried in
// api/lib/ai-provider-inventory.ts so nothing here is invented.
//
//   {
//     id: "<short-stable-id>",
//     openRouterModel: "<vendor>/<model>:free",
//     paramScale: "<e.g. 8B>",
//     capabilities: ["code", "reasoning"],
//     strengths: ["backend", "script", "tests"],
//     priority: 10,
//     notes: "why this model is here / known limits",
//   },
//
// <-- ADD A FREE MODEL ROW ABOVE THIS LINE to extend the chain. -->
// ---------------------------------------------------------------------------
export const WRITERLANE_FREE_MODELS: WriterLaneFreeModel[] = [
  {
    id: "liquid-lfm-2.5-1.2b",
    openRouterModel: "liquid/lfm-2.5-1.2b-instruct:free",
    paramScale: "1.2B",
    capabilities: ["fast", "docs"],
    strengths: ["docs"],
    priority: 0,
    notes:
      "Only free model currently inventoried (ai-provider-inventory.ts). At 1.2B it is likely too weak for non-trivial code; kept as a docs / canary seed. Add stronger free code models as higher-priority rows above it.",
  },
];

// A slug counts as free only when it explicitly carries the ":free" suffix
// OpenRouter uses for its no-cost routes. Anything else is treated as paid /
// unknown and excluded by default.
export function isFreeModelSlug(slug: string): boolean {
  return String(slug ?? "")
    .trim()
    .toLowerCase()
    .endsWith(":free");
}

export function listWriterLaneFreeModels(): WriterLaneFreeModel[] {
  return WRITERLANE_FREE_MODELS.map((model) => ({ ...model }));
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

function scoreModelForTask(
  model: WriterLaneFreeModel,
  taskKind: WriterLaneTaskKind,
): number {
  let score = model.priority ?? 0;
  if (model.strengths.includes(taskKind)) {
    score += 100;
  } else if (model.strengths.includes("mixed")) {
    score += 25;
  }
  if (model.capabilities.includes("code") && CODE_TASK_KINDS.has(taskKind)) {
    score += 40;
  }
  if (model.capabilities.includes("docs") && taskKind === "docs") {
    score += 40;
  }
  return score;
}

// Pure, deterministic ranking of the free models for a given task kind. Ties
// break on id so the fallback order is stable across runs.
export function rankFreeModelsForTask(
  taskKind: WriterLaneTaskKind,
  models: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
): WriterLaneFreeModel[] {
  return [...models].sort((left, right) => {
    const byScore =
      scoreModelForTask(right, taskKind) - scoreModelForTask(left, taskKind);
    if (byScore !== 0) return byScore;
    return left.id.localeCompare(right.id);
  });
}

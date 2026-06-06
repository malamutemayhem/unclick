// WriterLane default system config (free-only gate slice).
//
// Dead code. Nothing in this repo wires it yet: not the autopilot runner, not
// CodeRoom, not OpenHands, not the watcher, not cron. This module defines the
// DEFAULT WriterLane system config and the single place the paid path is gated.
//
// The rule: the active default path is FREE MODELS ONLY. The paid / subscription
// code path stays present but is OFF BY DEFAULT, behind one flag (allowPaidModels,
// default false). Both the model-admission filter and the router selection policy
// derive from this one config, so "free-only" is the default everywhere and paid
// is a single, explicit, deliberate opt-in.
//
// Pure data + pure functions. No DB, no LLM, no network, no shell, no side
// effects.

import {
  isFreeModelSlug,
  type WriterLaneFreeModel,
} from "./writerlane-free-models.js";
import type { WriterLaneSelectionPolicy } from "./writerlane-router.js";

export interface WriterLaneSystemConfig {
  // The master gate. Default false => only ":free" models are admitted and the
  // derived router policy forbids paid AND subscription backends. Set true ONLY
  // to deliberately open the paid path. This is the one off-by-default flag that
  // closes the paid gate.
  readonly allowPaidModels: boolean;
}

// THE default system config: free-only, paid closed. Frozen so a caller cannot
// mutate the shared default in place; use withWriterLaneConfig to derive an
// override.
export const DEFAULT_WRITERLANE_CONFIG: WriterLaneSystemConfig = Object.freeze({
  allowPaidModels: false,
});

// Derive a config from the default with explicit overrides. The only way to turn
// the paid path on is to pass allowPaidModels: true here (or build a config by
// hand); it is never on by default.
export function withWriterLaneConfig(
  overrides: Partial<WriterLaneSystemConfig> = {},
): WriterLaneSystemConfig {
  return { ...DEFAULT_WRITERLANE_CONFIG, ...overrides };
}

// Admit only the models the config allows. The default config admits exactly the
// ":free" slugs; any paid / unknown slug is excluded unless allowPaidModels is
// true. Returns copies so callers cannot mutate the registry rows.
export function admitModels(
  models: WriterLaneFreeModel[],
  config: WriterLaneSystemConfig = DEFAULT_WRITERLANE_CONFIG,
): WriterLaneFreeModel[] {
  const allowed = config.allowPaidModels
    ? models
    : models.filter((model) => isFreeModelSlug(model.openRouterModel));
  return allowed.map((model) => ({ ...model }));
}

// Derive the router selection policy from the config. Free-first is always on;
// paid and subscription backends are gated behind the single allowPaidModels
// flag; the fixture backend is never auto-allowed (it can never be autonomy
// proof anyway).
export function toSelectionPolicy(
  config: WriterLaneSystemConfig = DEFAULT_WRITERLANE_CONFIG,
): WriterLaneSelectionPolicy {
  return {
    allowPaid: config.allowPaidModels,
    allowSubscription: config.allowPaidModels,
    allowFixture: false,
    preferFree: true,
  };
}

// True when the config keeps the paid path closed (the default). A small named
// predicate so callers can assert "are we free-only right now?" without poking
// at the flag directly.
export function isFreeOnly(
  config: WriterLaneSystemConfig = DEFAULT_WRITERLANE_CONFIG,
): boolean {
  return config.allowPaidModels !== true;
}

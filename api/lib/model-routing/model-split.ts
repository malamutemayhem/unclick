// Architect / editor model split (cost lever slice).
//
// The aider-style split: send high-context, low-frequency PLANNING work to a
// strong "architect" model, and low-context, high-frequency EDIT / apply /
// classify work to a cheap, fast "editor" model. Combined with prompt caching
// this is the "biggest single missed lever" (+1.5-3x cost-efficiency in fleet
// research). See docs/model-routing-cost-lever.md for the per-call-site map.
//
// Pure config: a role -> model resolver with env overrides and safe defaults.
// No network, no side effects.

export type ModelRole = "architect" | "editor";

// Env var per role. Set these per deploy to override the defaults without a code
// change (e.g. ARCHITECT_MODEL=claude-sonnet-4-6).
export const MODEL_ROLE_ENV: Record<ModelRole, string> = {
  architect: "ARCHITECT_MODEL",
  editor: "EDITOR_MODEL",
};

// Safe defaults. The editor default matches the existing arena default so wiring
// arena through this resolver is behaviour-preserving. The architect default is a
// strong-but-cost-aware model for planning.
export const DEFAULT_MODELS: Record<ModelRole, string> = {
  architect: "claude-sonnet-4-6",
  editor: "claude-haiku-4-5-20251001",
};

// Resolve the model id for a role: env override if set and non-empty, else the
// default. Never throws; an unknown env value falls through to the default.
export function resolveModelForRole(
  role: ModelRole,
  env: Record<string, string | undefined> = process.env,
): string {
  const key = MODEL_ROLE_ENV[role];
  const raw = env[key];
  if (typeof raw === "string" && raw.trim() !== "") return raw.trim();
  return DEFAULT_MODELS[role];
}

export interface CallSiteProfile {
  // Does the call carry a large, mostly-stable context (system + tools + docs)?
  readonly highContext: boolean;
  // Is the call made often (per turn / per row / per tick)?
  readonly highFrequency: boolean;
}

// Classify a call site into a role from its traffic shape:
//   - high frequency  -> editor (cheap/fast wins; volume dominates cost)
//   - low frequency + high context -> architect (quality of the plan dominates)
//   - low frequency + low context  -> editor (no reason to pay for the big model)
export function roleForCallSite(profile: CallSiteProfile): ModelRole {
  if (profile.highFrequency) return "editor";
  return profile.highContext ? "architect" : "editor";
}

// Convenience: resolve the model for a call site in one step.
export function resolveModelForCallSite(
  profile: CallSiteProfile,
  env: Record<string, string | undefined> = process.env,
): string {
  return resolveModelForRole(roleForCallSite(profile), env);
}

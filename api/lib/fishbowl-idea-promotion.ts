// Idea-promotion governance (Boardroom Ideas board).
//
// Two rules live here, kept pure so they are trivially testable and reusable:
//   1. A vote THRESHOLD: a normal (non-admin) promotion of an idea to a todo
//      needs at least N distinct upvotes from registered agents. This stops the
//      ideas board from being ornamental - votes have to mean something before
//      an idea becomes work.
//   2. An admin OVERRIDE LABEL: a human admin may still promote any idea, but
//      when they promote one that is below threshold the promotion is marked
//      "promoted-by-admin (override)" so the bypass is visible, not silent.
//
// Pure data + pure functions. No DB, no network, no side effects. The
// memory-admin promote handler calls evaluateIdeaPromotion() to decide and
// surfaces the resulting label so the override is traceable in the feed, the
// API response, and the admin UI.

// Default minimum distinct upvotes a non-admin promotion needs. Sourced from the
// Build I spec ("require >= 3 distinct upvotes from registered agents"). Override
// per-tenant/deploy with the env var below.
export const DEFAULT_IDEA_PROMOTE_THRESHOLD = 3;

// Env knob for the threshold. A non-negative integer; 0 makes votes advisory
// (any idea is promotable) without removing the admin-override path.
export const IDEA_PROMOTE_THRESHOLD_ENV = "FISHBOWL_IDEA_PROMOTE_THRESHOLD";

// Human-readable labels for a promotion. The override label text is the exact
// wording the spec asks the UI to show.
export const PROMOTION_LABEL_ADMIN_OVERRIDE = "promoted-by-admin (override)";
export const PROMOTION_LABEL_VOTE_BACKED = "vote-backed";

// Resolve the upvote threshold from the environment. Falls back to the default
// when unset, empty, or not a finite number; clamps to a non-negative integer so
// a typo can never make promotion impossible or negative.
export function resolveIdeaPromoteThreshold(
  env: Record<string, string | undefined> = process.env,
): number {
  const raw = env[IDEA_PROMOTE_THRESHOLD_ENV];
  if (raw == null || String(raw).trim() === "") {
    return DEFAULT_IDEA_PROMOTE_THRESHOLD;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_IDEA_PROMOTE_THRESHOLD;
  const floored = Math.floor(parsed);
  return floored < 0 ? 0 : floored;
}

export interface IdeaPromotionInput {
  // Distinct up-voters. The votes table is keyed by (tenant, idea, voter), so the
  // stored upvotes counter is already a distinct-agent count.
  readonly upvotes: number;
  // True only for the human admin caller (verified upstream via the admin-ui
  // profile anti-spoof check).
  readonly isAdminCaller: boolean;
  // Optional explicit threshold; defaults to resolveIdeaPromoteThreshold().
  readonly threshold?: number;
}

export interface IdeaPromotionDecision {
  // May this promotion proceed?
  readonly allowed: boolean;
  // True when an admin promoted an idea that did NOT meet the threshold.
  readonly adminOverride: boolean;
  // The threshold that was applied (echoed for clear error/response messages).
  readonly threshold: number;
  // The distinct-upvote count that was evaluated.
  readonly upvotes: number;
  // Short machine/human reason string for logs and API responses.
  readonly reason: string;
}

// Decide whether an idea may be promoted to a todo.
//   - A normal agent needs upvotes >= threshold.
//   - A human admin may always promote; when the idea is below threshold the
//     decision is flagged adminOverride so callers can label the bypass.
export function evaluateIdeaPromotion(
  input: IdeaPromotionInput,
): IdeaPromotionDecision {
  const threshold =
    input.threshold ?? resolveIdeaPromoteThreshold();
  const upvotes = Number.isFinite(input.upvotes) ? input.upvotes : 0;
  const meetsThreshold = upvotes >= threshold;

  if (meetsThreshold) {
    return {
      allowed: true,
      adminOverride: false,
      threshold,
      upvotes,
      reason: `${upvotes} upvotes >= threshold ${threshold}`,
    };
  }

  if (input.isAdminCaller) {
    return {
      allowed: true,
      adminOverride: true,
      threshold,
      upvotes,
      reason: `admin override: ${upvotes} upvotes < threshold ${threshold}`,
    };
  }

  return {
    allowed: false,
    adminOverride: false,
    threshold,
    upvotes,
    reason: `${upvotes} upvotes < threshold ${threshold}; needs more upvotes or an admin override`,
  };
}

// The label to show / store for a completed promotion.
export function ideaPromotionLabel(decision: IdeaPromotionDecision): string {
  return decision.adminOverride
    ? PROMOTION_LABEL_ADMIN_OVERRIDE
    : PROMOTION_LABEL_VOTE_BACKED;
}

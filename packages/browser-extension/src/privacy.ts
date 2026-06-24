// Privacy tiers and the k-anonymity gate that lets us build a shared network safely.

import type { ConnectorDraft } from "./connector-draft.js";

export type PrivacyTier = "off" | "me_only" | "public";

/** New sites default to me-only: useful to the user, nothing shared. */
export const DEFAULT_TIER: PrivacyTier = "me_only";

/** A shape only becomes eligible for the public pool after this many distinct users see it. */
export const K_ANONYMITY_THRESHOLD = 3;

export interface SiteSetting {
  host: string;
  tier: PrivacyTier;
}

/** Should the sensor capture at all for this tier? */
export function shouldCapture(tier: PrivacyTier): boolean {
  return tier !== "off";
}

/** May shapes from this tier ever leave the device for the public pool? */
export function canShareToPublic(tier: PrivacyTier): boolean {
  return tier === "public";
}

/** Has a shape been seen by enough distinct users to be non-identifying? */
export function canPromoteToPublic(
  distinctUserCount: number,
  threshold: number = K_ANONYMITY_THRESHOLD,
): boolean {
  return distinctUserCount >= threshold;
}

/**
 * Final gate for sending a drafted connector to the public pool.
 * Must be a read operation, the user's site tier must be public, and the
 * k-anonymity threshold must be met.
 */
export function isPublicPromotable(
  draft: ConnectorDraft,
  tier: PrivacyTier,
  distinctUserCount: number,
  threshold: number = K_ANONYMITY_THRESHOLD,
): boolean {
  return (
    draft.autoPromotable &&
    canShareToPublic(tier) &&
    canPromoteToPublic(distinctUserCount, threshold)
  );
}

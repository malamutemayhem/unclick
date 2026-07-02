// Learn-this-site + coverage: honest counts (not a fake percentage) of what the
// sensor has mapped for a host, and whether to offer to learn a new site.

import { classifyOperation } from "./connector-draft.js";
import type { PrivacyTier } from "./privacy.js";
import type { Shape } from "./types.js";

export interface Coverage {
  endpoints: number;
  reads: number;
  writes: number;
}

/** Count what has been mapped for a host. Honest counts, no invented completeness %. */
export function coverageForHost(shapes: Shape[]): Coverage {
  let reads = 0;
  let writes = 0;
  for (const s of shapes ?? []) {
    if (classifyOperation(s.method) === "read") reads += 1;
    else writes += 1;
  }
  return { endpoints: (shapes ?? []).length, reads, writes };
}

/** A short human label for the coverage of a host. */
export function coverageLabel(coverage: Coverage): string {
  if (coverage.endpoints === 0) return "nothing learned yet";
  return `${coverage.endpoints} endpoint(s): ${coverage.reads} read, ${coverage.writes} write`;
}

export interface LearnContext {
  host: string;
  tier: PrivacyTier;
  /** True when the host already has a first-party OAuth connector (no need to learn it). */
  hasOAuthConnector: boolean;
  /** True when we have already captured shapes for this host. */
  alreadyLearned: boolean;
}

/**
 * Offer to learn a site only when it has no clean OAuth connector, we have not
 * already learned it, and the user has not turned capture off for it.
 */
export function shouldOfferLearn(ctx: LearnContext): boolean {
  if (ctx.tier === "off") return false;
  if (ctx.hasOAuthConnector) return false;
  if (ctx.alreadyLearned) return false;
  return true;
}

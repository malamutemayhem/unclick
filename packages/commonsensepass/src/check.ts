import { ClaimInput, CommonSensePassResult } from "./schema.js";
import { checkR1, checkR2, checkR3, checkR4, checkR5, checkR6 } from "./rules.js";

type RuleFn = (input: ClaimInput) => CommonSensePassResult | null;

const RULES: RuleFn[] = [checkR1, checkR2, checkR3, checkR4, checkR5, checkR6];

/**
 * commonsensepassCheck - verdict-only sanity gate.
 *
 * Dispatches the claim through R1-R6; returns the first non-null verdict.
 * If no rule fires, returns HOLD so unsupported claim kinds cannot become a
 * silent "all good" result. Does NOT mutate source state, build, merge, or
 * close.
 *
 * Verdicts:
 *   PASS      - claim is consistent with evidence; safe to proceed.
 *   BLOCKER   - claim is contradicted by evidence; do not proceed.
 *   HOLD      - claim is missing required evidence; supply it and retry.
 *   SUPPRESS  - claim is a duplicate / no-op; drop it silently.
 *   ROUTE     - claim valid but should be handled elsewhere.
 */
export function commonsensepassCheck(
  input: ClaimInput,
): CommonSensePassResult {
  for (const rule of RULES) {
    const result = rule(input);
    if (result) return result;
  }
  return {
    verdict: "HOLD",
    rule_id: null,
    reason: `Claim "${input.claim}" matched no rule; CommonSensePass cannot verify it.`,
    evidence: input.evidence ?? [],
    next_action: "use_supported_claim_kind_or_add_rule",
  };
}

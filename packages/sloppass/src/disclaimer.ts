import type { SlopPassDisclaimer } from "./types.js";

export const SLOPPASS_DISCLAIMER: SlopPassDisclaimer = {
  headline: "SlopPass is a scoped quality review, not a guarantee that the code is good.",
  body:
    "SlopPass reports evidence-based code quality risks it can observe in the target and scope for this run. It does not certify correctness, replace full testing or human review, or verify every runtime path, dependency, environment, or future change.",
  compact: "Scoped review only. Not a correctness certification, full test suite, or quality guarantee.",
};

export function renderDisclaimer(mode: "headline" | "body" | "compact" = "body"): string {
  return SLOPPASS_DISCLAIMER[mode];
}

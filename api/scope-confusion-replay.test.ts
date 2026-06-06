import { describe, expect, it } from "vitest";

import {
  buildPrReviewObligation,
  evaluateAgentObligationState,
  validateAgentObligationReceipt,
} from "./lib/agent-obligations";
import { evaluateLaneClaim, normalizeScopeTokens, normalizeWorkerLane } from "./lib/worker-lanes";

// Cross-lane scope-confusion + signed-ACK replay regression pack.
//
// These assert two abuse shapes the fleet must keep blocking:
//   1. SCOPE CONFUSION  - a claim/token scoped to one lane being honoured by a
//      different lane, or a denylisted token sneaking in via an allowlist match
//      or label spoofing.
//   2. RECEIPT REPLAY   - a signed ACK/PASS receipt minted for one obligation
//      (one PR / wake / lane) being replayed verbatim against a sibling
//      obligation, or arriving after the obligation has gone stale.
//
// The baseline happy-path coverage lives in worker-lanes.test.ts and
// agent-obligations.test.ts; this pack locks in the cross-lane guarantees they
// do not exercise.

const enforceLane = (agentId: string, allow: string[], deny: string[] = []) =>
  normalizeWorkerLane({
    apiKeyHash: `hash-${agentId}`,
    agentId,
    role: agentId,
    scopeAllowlist: allow,
    scopeDenylist: deny,
    enforceMode: "enforce",
  });

describe("scope confusion: lane token isolation", () => {
  it("rejects a denylisted token even when it also appears in the allowlist", () => {
    // Privileged-token-sneaks-through: allowlist and denylist both name the same
    // token. Denylist must win, otherwise an allowlist match would launder it.
    const lane = enforceLane("security-seat", ["security", "deploy"], ["deploy"]);

    expect(evaluateLaneClaim(lane, ["deploy"])).toEqual({
      decision: "reject",
      reason: "scope_denylist_match",
      matched_token: "deploy",
    });
  });

  it("blocks denylist evasion through casing and punctuation spoofing", () => {
    const lane = enforceLane("watcher-seat", ["watch"], ["build"]);

    // All of these normalize to the denylisted "build" token. Note the
    // normalizer keeps : _ / - so a token like "build/x" stays distinct on
    // purpose; only punctuation outside that set collapses away.
    for (const spoof of ["BUILD", "Build!!", "  build  ", "build."]) {
      expect(evaluateLaneClaim(lane, [spoof])).toMatchObject({
        decision: "reject",
        reason: "scope_denylist_match",
        matched_token: "build",
      });
    }
    expect(normalizeScopeTokens(["BUILD", "Build!!", " build "])).toEqual(["build"]);
  });

  it("does not let one lane's accepted claim replay onto a foreign lane", () => {
    // Same todo tokens, two lanes. Lane A owns it; Lane B must not honour the
    // identical claim just because it was valid somewhere.
    const claimTokens = ["memory", "recall"];
    const laneA = enforceLane("memory-seat", ["memory"]);
    const laneB = enforceLane("seats-seat", ["seats", "routing"]);

    expect(evaluateLaneClaim(laneA, claimTokens)).toMatchObject({
      decision: "allow",
      reason: "scope_allowlist_match",
      matched_token: "memory",
    });
    expect(evaluateLaneClaim(laneB, claimTokens)).toEqual({
      decision: "reject",
      reason: "scope_allowlist_miss",
    });
  });
});

describe("signed-ACK replay: obligation isolation", () => {
  const obligationA = buildPrReviewObligation({
    id: "obligation-pr-695-review",
    prNumber: 695,
    prUrl: "https://github.com/malamutemayhem/unclick/pull/695",
    wakeId: "wake-pull_request-pr-695-aaaa",
    ownerLane: "Reviewer",
    nextAction: "ACK wake, review PR #695, post PASS/HOLD/BLOCKER with proof.",
    createdAt: "2026-06-02T00:00:00.000Z",
    ttlSeconds: 600,
    fallbackOwner: "master",
  });

  const obligationB = buildPrReviewObligation({
    id: "obligation-pr-696-review",
    prNumber: 696,
    prUrl: "https://github.com/malamutemayhem/unclick/pull/696",
    wakeId: "wake-pull_request-pr-696-bbbb",
    ownerLane: "Reviewer",
    nextAction: "ACK wake, review PR #696, post PASS/HOLD/BLOCKER with proof.",
    createdAt: "2026-06-02T00:00:00.000Z",
    ttlSeconds: 600,
    fallbackOwner: "master",
  });

  // A receipt that legitimately clears obligation A.
  const receiptForA = {
    text: "PASS: PR #695 review complete; proof: https://github.com/malamutemayhem/unclick/pull/695#issuecomment-1",
    author_agent_id: "reviewer-seat",
    created_at: "2026-06-02T00:05:00.000Z",
  };

  it("accepts the receipt against its own obligation", () => {
    expect(validateAgentObligationReceipt(obligationA, receiptForA, new Date("2026-06-02T00:05:00.000Z"))).toMatchObject({
      accepted: true,
      status: "accepted",
      receipt_type: "PASS",
    });
  });

  it("rejects that same receipt replayed against a sibling obligation", () => {
    // Verbatim replay onto PR #696: the proof points at #695, so it must fail.
    expect(validateAgentObligationReceipt(obligationB, receiptForA, new Date("2026-06-02T00:05:00.000Z"))).toMatchObject({
      accepted: false,
      reason: "receipt_does_not_match_obligation",
      receipt_type: "PASS",
    });
  });

  it("rejects an ACK that only cites a foreign lane's wake id", () => {
    // Proof present and on-repo, but the wake id belongs to obligation A.
    const crossWakeAck = {
      text: "ACK wake-pull_request-pr-695-aaaa. proof: https://github.com/malamutemayhem/unclick/pull/695",
    };
    expect(validateAgentObligationReceipt(obligationB, crossWakeAck, new Date("2026-06-02T00:05:00.000Z"))).toMatchObject({
      accepted: false,
      reason: "receipt_does_not_match_obligation",
    });
  });

  it("rejects a receipt type the obligation does not accept (type confusion)", () => {
    // Obligation that only accepts PASS must reject a matching bare ACK.
    const passOnly = buildPrReviewObligation({
      id: "obligation-pr-695-review",
      prNumber: 695,
      prUrl: "https://github.com/malamutemayhem/unclick/pull/695",
      wakeId: "wake-pull_request-pr-695-aaaa",
      nextAction: "Review and PASS only.",
      createdAt: "2026-06-02T00:00:00.000Z",
      ttlSeconds: 600,
      fallbackOwner: "master",
      acceptedReceiptTypes: ["PASS"],
    });

    const bareAck = {
      text: "ACK wake-pull_request-pr-695-aaaa. proof: https://github.com/malamutemayhem/unclick/pull/695",
    };
    expect(validateAgentObligationReceipt(passOnly, bareAck, new Date("2026-06-02T00:05:00.000Z"))).toMatchObject({
      accepted: false,
      reason: "receipt_type_not_allowed",
      receipt_type: "ACK",
    });
  });

  it("surfaces stale debt and fallback ownership for a late replayed receipt", () => {
    const afterTtl = new Date("2026-06-02T00:20:00.000Z"); // 20 min > 10 min TTL

    // The obligation is stale on its own timeline.
    expect(evaluateAgentObligationState(obligationA, afterTtl)).toMatchObject({
      accepted: false,
      status: "stale",
      reason: "ttl_expired",
      fallback_owner: "master",
    });

    // A wrong/replayed receipt arriving after TTL is rejected AND carries the
    // stale fallback ownership through, so the debt stays visible.
    const replayWrong = validateAgentObligationReceipt(
      obligationA,
      { text: "PASS: PR #696 done; proof: https://github.com/malamutemayhem/unclick/pull/696" },
      afterTtl,
    );
    expect(replayWrong).toMatchObject({
      accepted: false,
      status: "stale",
      reason: "receipt_does_not_match_obligation",
      fallback_owner: "master",
    });
  });

  it("rejects a fake-done receipt that carries no proof or recognised type", () => {
    expect(
      validateAgentObligationReceipt(obligationA, { text: "Done, looks good to me." }, new Date("2026-06-02T00:05:00.000Z")),
    ).toMatchObject({ accepted: false, reason: "unrecognized_receipt" });
  });
});

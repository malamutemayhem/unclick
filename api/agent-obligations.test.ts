import { describe, expect, it } from "vitest";

import {
  buildPrReviewObligation,
  evaluateAgentObligationState,
  validateAgentObligationReceipt,
} from "./lib/agent-obligations";

const obligation = buildPrReviewObligation({
  id: "obligation-pr-695-review",
  prNumber: 695,
  prUrl: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/695",
  wakeId: "wake-pull_request-pr-695-6ca75834776e",
  ownerLane: "Reviewer",
  nextAction: "ACK the wake, review PR #695, then post PASS, HOLD, or BLOCKER with proof.",
  createdAt: "2026-05-10T15:27:56.000Z",
  ttlSeconds: 600,
  fallbackOwner: "master",
});

describe("agent obligations", () => {
  it("represents a PR review ACK request with owner, TTL, fallback, and proof fields", () => {
    expect(obligation).toMatchObject({
      id: "obligation-pr-695-review",
      kind: "pr_review_ack",
      source: {
        kind: "pull_request",
        id: "pr-695",
        pr_number: 695,
        url: "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/695",
        wake_id: "wake-pull_request-pr-695-6ca75834776e",
      },
      owner_lane: "Reviewer",
      next_action: "ACK the wake, review PR #695, then post PASS, HOLD, or BLOCKER with proof.",
      accepted_receipt_types: ["ACK", "PASS", "HOLD", "BLOCKER", "proof"],
      ttl_seconds: 600,
      fallback_owner: "master",
      proof_required: true,
      status: "open",
    });
  });

  it("accepts a matching PASS receipt with proof", () => {
    const result = validateAgentObligationReceipt(obligation, {
      text:
        "PASS: PR #695 review complete; proof: https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/695#issuecomment-1",
      author_agent_id: "reviewer-seat",
      created_at: "2026-05-10T15:30:00.000Z",
    });

    expect(result).toMatchObject({
      accepted: true,
      status: "accepted",
      reason: "receipt_matches_obligation",
      receipt_type: "PASS",
    });
    expect(result.proof_links).toEqual([
      "https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/695#issuecomment-1",
    ]);
  });

  it("accepts an ACK only when it carries matching proof", () => {
    const missingProof = validateAgentObligationReceipt(obligation, {
      text: "ACK wake-pull_request-pr-695-6ca75834776e, reviewing next.",
    });

    expect(missingProof).toMatchObject({
      accepted: false,
      reason: "proof_required",
      receipt_type: "ACK",
    });

    const withProof = validateAgentObligationReceipt(obligation, {
      text:
        "ACK wake-pull_request-pr-695-6ca75834776e. proof: https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/695",
    });

    expect(withProof).toMatchObject({
      accepted: true,
      status: "accepted",
      receipt_type: "ACK",
    });
  });

  it("rejects fake done text and unrelated PR receipts", () => {
    expect(
      validateAgentObligationReceipt(obligation, {
        text: "Done reviewing the wake.",
      }),
    ).toMatchObject({
      accepted: false,
      reason: "unrecognized_receipt",
    });

    expect(
      validateAgentObligationReceipt(obligation, {
        text: "PASS: PR #696 review complete; proof: https://github.com/malamutemayhem/unclick-agent-native-endpoints/pull/696",
      }),
    ).toMatchObject({
      accepted: false,
      reason: "receipt_does_not_match_obligation",
      receipt_type: "PASS",
    });
  });

  it("marks stale TTL debt with visible fallback ownership", () => {
    const result = evaluateAgentObligationState(obligation, new Date("2026-05-10T15:45:00.000Z"));

    expect(result).toMatchObject({
      accepted: false,
      status: "stale",
      reason: "ttl_expired",
      fallback_owner: "master",
      visible_debt_reason: "No accepted receipt for pr-695 before TTL; route to master.",
    });
  });
});

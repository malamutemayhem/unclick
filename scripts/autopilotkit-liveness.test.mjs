import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  evaluateAutoPilotKitLiveness,
  extractMissedAckSignals,
  normalizeSeatLiveness,
  parseMs,
} from "./lib/autopilotkit-liveness.mjs";

const NOW = "2026-05-09T22:37:17.000Z";
const NOW_MS = parseMs(NOW);

describe("AutoPilotKit liveness helpers", () => {
  it("normalizes a dormant coordinator into an advisory fallback signal", () => {
    const worker = normalizeSeatLiveness(
      {
        agent_id: "master",
        display_name: "Master Coordinator",
        user_agent_hint: "unclick-master/coordinator",
        last_seen_at: "2026-05-06T03:59:07.640Z",
      },
      { nowMs: NOW_MS },
    );

    assert.equal(worker.lane, "coordinator");
    assert.equal(worker.freshness, "dormant");
    assert(worker.reasons.includes("coordinator_fallback_needed"));
  });

  it("builds Review Coordinator and Jobs Manager adapter packets without execute authority", () => {
    const result = evaluateAutoPilotKitLiveness({
      now: NOW,
      profiles: [
        {
          agent_id: "claude-cowork-seat",
          display_name: "Reviewer Seat",
          current_status: "ACKed PR #640 wake; actual diff pass deferred",
          last_seen_at: "2026-05-09T22:30:00.000Z",
          current_status_updated_at: "2026-05-09T22:30:00.000Z",
        },
        {
          agent_id: "master",
          display_name: "Master Coordinator",
          last_seen_at: "2026-05-06T03:59:07.640Z",
        },
      ],
      messages: [
        {
          id: "wake-640",
          tags: ["wakepass", "reroute"],
          text: "WakePass auto-reroute. Reason: missed ACK for Review Coordinator.",
        },
      ],
    });

    assert.equal(result.safe_mode.read_only, true);
    assert.equal(result.adapter_examples.review_coordinator.execute, false);
    assert.equal(result.adapter_examples.jobs_manager.execute, false);
    assert(result.adapter_examples.review_coordinator.reason_codes.includes("missed_ack_reroute_detected"));
    assert(result.adapter_examples.jobs_manager.reason_codes.includes("coordinator_fallback_needed"));
  });

  it("redacts sensitive text from missed ACK excerpts", () => {
    const signals = extractMissedAckSignals([
      {
        id: "wake-secret",
        tags: ["wakepass"],
        text: "WakePass auto-reroute with token sk-testsecret1234567890 in copied debug text",
      },
    ]);

    assert.equal(signals.length, 1);
    assert.equal(signals[0].excerpt, "[redacted-sensitive-text]");
  });
});

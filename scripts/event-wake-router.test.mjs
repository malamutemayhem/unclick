import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildReliabilityDispatchRequest,
  wakeDispatchId,
} from "./event-wake-router.mjs";

describe("event wake router reliability dispatch", () => {
  it("creates stable dispatch IDs from wake event IDs", () => {
    const first = wakeDispatchId("wake-workflow_run-workflow-run-123-abc");
    const second = wakeDispatchId("wake-workflow_run-workflow-run-123-abc");

    assert.equal(first, second);
    assert.match(first, /^dispatch_[a-f0-9]{32}$/);
  });

  it("marks wake handoffs as ACK-required WakePass dispatches", () => {
    const request = buildReliabilityDispatchRequest({
      eventId: "wake-workflow_run-workflow-run-123-abc",
      decision: {
        owner: "🤖",
        reason: "PR checks completed green for TestPass PR Check on PR #310",
        urgency: "high",
      },
      triage: { used: false },
      result: { message_id: "msg-123" },
      event: {
        action: "completed",
        workflow_run: {
          id: 123,
          html_url: "https://github.com/acme/repo/actions/runs/123",
        },
      },
      ackSeconds: 600,
    });

    assert.equal(request.source, "wakepass");
    assert.equal(request.target_agent_id, "🤖");
    assert.equal(request.task_ref, "wake-workflow_run-workflow-run-123-abc");
    assert.equal(request.payload.ack_required, true);
    assert.equal(request.payload.handoff_message_id, "msg-123");
    assert.equal(request.payload.ack_fail_after_seconds, 600);
    assert.equal(request.payload.wake_owner, "🤖");
    assert.equal(request.payload.github_subject, "workflow-run-123");
  });

  it("defaults missed-ACK handoff leases to ten minutes", () => {
    const request = buildReliabilityDispatchRequest({
      eventId: "wake-workflow_run-workflow-run-456-def",
      decision: {
        owner: "🤖",
        reason: "PR checks completed green",
        urgency: "high",
      },
      triage: { used: false },
      result: { message_id: "msg-456" },
      event: { workflow_run: { id: 456 } },
    });

    assert.equal(request.time_bucket_seconds, 600);
    assert.equal(request.payload.ack_fail_after_seconds, 600);
  });
});

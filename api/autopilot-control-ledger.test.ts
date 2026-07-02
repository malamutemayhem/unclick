import { describe, expect, it } from "vitest";

import {
  buildAutopilotEventRow,
  createAutopilotZeroTouchMetrics,
  planAutopilotIqOutcomeLedgerEvent,
  planAutoPilotKitRecommendationLedgerEvents,
  planFishbowlPostLedgerEvent,
  planTodoLedgerEvents,
} from "./lib/autopilot-control-ledger";

const now = new Date("2026-05-09T00:00:00.000Z");

describe("autopilot control ledger helpers", () => {
  it("builds idempotent typed event rows", () => {
    const row = buildAutopilotEventRow({
      apiKeyHash: "hash_123",
      eventType: "claim",
      actorAgentId: "runner",
      refKind: "todo",
      refId: "todo-123",
      now,
      payload: { to: "runner", status: "in_progress" },
    });

    expect(row).toMatchObject({
      api_key_hash: "hash_123",
      event_type: "claim",
      actor_agent_id: "runner",
      ref_kind: "todo",
      ref_id: "todo-123",
      created_at: "2026-05-09T00:00:00.000Z",
    });
    expect(row.idempotency_key).toContain("claim:todo:todo-123:runner:");
  });

  it("records explicit lease grant events", () => {
    const row = buildAutopilotEventRow({
      apiKeyHash: "hash_123",
      eventType: "lease_grant",
      actorAgentId: "runner",
      refKind: "dispatch",
      refId: "dispatch-123",
      now,
      payload: { lease_owner: "runner", lease_minutes: 10 },
    });

    expect(row).toMatchObject({
      event_type: "lease_grant",
      actor_agent_id: "runner",
      ref_kind: "dispatch",
      ref_id: "dispatch-123",
      payload: { lease_owner: "runner", lease_minutes: 10 },
    });
    expect(row.idempotency_key).toContain("lease_grant:dispatch:dispatch-123:runner:");
  });

  it("records lane check decisions for role-fit routing", () => {
    const row = buildAutopilotEventRow({
      apiKeyHash: "hash_123",
      eventType: "lane_check",
      actorAgentId: "watcher-seat",
      refKind: "todo",
      refId: "todo-123",
      now,
      payload: {
        decision: "reject",
        reason: "Builder lane task assigned to Watcher seat",
        suggested_recipient: "builder-seat",
      },
    });

    expect(row).toMatchObject({
      event_type: "lane_check",
      actor_agent_id: "watcher-seat",
      ref_kind: "todo",
      ref_id: "todo-123",
      payload: {
        decision: "reject",
        reason: "Builder lane task assigned to Watcher seat",
        suggested_recipient: "builder-seat",
      },
    });
    expect(row.idempotency_key).toContain("lane_check:todo:todo-123:watcher-seat:");
  });

  it("plans todo state and claim events from before/after rows", () => {
    const events = planTodoLedgerEvents({
      todoId: "todo-123",
      actorAgentId: "runner",
      now,
      before: { status: "open", assigned_to_agent_id: null, title: "Build ledger" },
      after: { status: "in_progress", assigned_to_agent_id: "runner", title: "Build ledger" },
    });

    expect(events.map((event) => event.eventType)).toEqual(["todo_state_change", "claim"]);
    expect(events[0]).toMatchObject({
      actorAgentId: "runner",
      refKind: "todo",
      refId: "todo-123",
      payload: { from: "open", to: "in_progress", title: "Build ledger" },
    });
    expect(events[1]).toMatchObject({
      payload: { from: null, to: "runner", status: "in_progress" },
    });
  });

  it("plans release events when a todo is unassigned", () => {
    const events = planTodoLedgerEvents({
      todoId: "todo-123",
      actorAgentId: "runner",
      now,
      before: { status: "in_progress", assigned_to_agent_id: "runner" },
      after: { status: "open", assigned_to_agent_id: null },
    });

    expect(events.map((event) => event.eventType)).toEqual(["todo_state_change", "release"]);
  });

  it("turns structured ACK posts into ack events without storing full chat text", () => {
    const event = planFishbowlPostLedgerEvent({
      actorAgentId: "reviewer",
      messageId: "message-2",
      threadId: "message-1",
      now,
      tags: ["answer", "handoff"],
      recipients: ["all"],
      text: [
        "ACK",
        "Current chip: PR #600 review",
        "Next action: run focused proof",
        "ETA: 15m",
        "Blocker: none",
      ].join("\n"),
    });

    expect(event).toMatchObject({
      eventType: "ack",
      actorAgentId: "reviewer",
      refKind: "dispatch",
      refId: "message-1",
      payload: {
        current_chip: "PR #600 review",
        next_action: "run focused proof",
        eta: "15m",
        blocker: "none",
        message_id: "message-2",
        thread_id: "message-1",
      },
    });
    expect(JSON.stringify(event?.payload)).not.toContain("ACK\\n");
  });

  it("rejects payloads that look like secrets", () => {
    expect(() =>
      buildAutopilotEventRow({
        apiKeyHash: "hash_123",
        eventType: "proof_result",
        actorAgentId: "runner",
        refKind: "todo",
        refId: "todo-123",
        now,
        payload: { api_key: "uc_abc1234567890def" },
      }),
    ).toThrow(/sensitive key/);
  });

  it("plans advisory AutoPilotKit reroute recommendations as lane check ledger events", () => {
    const events = planAutoPilotKitRecommendationLedgerEvents({
      actorAgentId: "autopilotkit",
      refKind: "run",
      refId: "wake-528",
      source: "review_coordinator",
      now,
      recommendations: [
        {
          action: "reroute_missed_ack_to_live_worker",
          reason: "missed_ack_reroute_detected",
          target_lane: "reviewer",
          proof_message_id: "msg-528",
        },
        {
          action: "activate_second_tier_coordinator",
          reason: "coordinator_fallback_needed",
          target_lane: "coordinator",
        },
      ],
    });

    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({
      eventType: "lane_check",
      actorAgentId: "autopilotkit",
      refKind: "run",
      refId: "wake-528",
      payload: {
        source: "review_coordinator",
        decision: "advisory",
        advisory: true,
        execute: false,
        recommendation_action: "reroute_missed_ack_to_live_worker",
        reason_code: "missed_ack_reroute_detected",
        target_lane: "reviewer",
        proof_message_id: "msg-528",
      },
    });
  });

  it("keeps AutoPilotKit recommendation rows idempotent and sanitized", () => {
    const event = planAutoPilotKitRecommendationLedgerEvents({
      actorAgentId: "autopilotkit",
      refId: "run-123",
      now,
      recommendations: [
        {
          action: "separate_ack_from_diff_review",
          reason: "deferred_review_or_ack_only",
          target_lane: "reviewer",
          affected_agent_ids: ["review-seat", "review-seat-2"],
        },
      ],
    })[0];

    const first = buildAutopilotEventRow({ ...event, apiKeyHash: "hash_123" });
    const second = buildAutopilotEventRow({ ...event, apiKeyHash: "hash_123" });

    expect(first.idempotency_key).toBe(second.idempotency_key);
    expect(first.payload).toMatchObject({
      decision: "advisory",
      execute: false,
      affected_agent_ids: ["review-seat", "review-seat-2"],
    });
    expect(JSON.stringify(first.payload)).not.toContain("undefined");
  });

  it("rejects common API secret patterns in payload values even when the key looks benign", () => {
    const secretValues = [
      "sk_live_0000000000fake",
      "sk_test_0000000000fake",
      "rk_live_0000000000fake",
      "whsec_0000000000fake",
      "xoxb-0000000000-fake000000",
      "xoxp-0000000000-fake000000",
      "AKIAFAKE00000000FAKE",
      "pk_live_0000000000fake",
      "wh_live_0000000000fake",
    ];
    for (const secret of secretValues) {
      expect(
        () =>
          buildAutopilotEventRow({
            apiKeyHash: "hash_123",
            eventType: "proof_result",
            actorAgentId: "runner",
            refKind: "todo",
            refId: "todo-123",
            now,
            payload: { note: `deployed with config ${secret} active` },
          }),
        `should reject secret: "${secret}"`,
      ).toThrow(/sensitive text/);
    }
  });

  it("rejects secret-looking AutoPilotKit recommendation text at row build time", () => {
    const event = planAutoPilotKitRecommendationLedgerEvents({
      actorAgentId: "autopilotkit",
      refId: "run-123",
      now,
      recommendations: [
        {
          action: "reroute_missed_ack_to_live_worker",
          reason: "authorization: bearer sk-test-not-real-secret",
          target_lane: "reviewer",
        },
      ],
    })[0];

    expect(() => buildAutopilotEventRow({ ...event, apiKeyHash: "hash_123" })).toThrow(/sensitive text/);
  });

  it("plans AutopilotIQ outcomes as capture-only proof result rows", () => {
    const event = planAutopilotIqOutcomeLedgerEvent({
      actorAgentId: "autopilotiq",
      refKind: "todo",
      refId: "todo-123",
      now,
      outcome: "win",
      learnedSignal: "Checking PR proof before marking done prevents false closure.",
      rewardDelta: 2,
      confidence: 0.8,
      proofRefs: [
        { kind: "pr", ref: "1243", note: "checks green" },
        "boardroom-comment-1",
      ],
    });

    expect(event).toMatchObject({
      eventType: "proof_result",
      actorAgentId: "autopilotiq",
      refKind: "todo",
      refId: "todo-123",
      payload: {
        schema_version: "autopilotiq_outcome_v1",
        source: "autopilotiq",
        storage: "mc_autopilot_events",
        capture_mode: "shadow",
        advisory: true,
        execute: false,
        applies_to_future_routing: false,
        outcome: "win",
        learned_signal: "Checking PR proof before marking done prevents false closure.",
        reward_delta: 2,
        penalty_delta: 0,
        confidence: 0.8,
        stale_after: "2026-05-23T00:00:00.000Z",
        quarantine: false,
      },
    });

    const row = buildAutopilotEventRow({ ...event, apiKeyHash: "hash_123" });
    expect(row.payload.proof_refs).toEqual([
      { kind: "pr", ref: "1243", note: "checks green" },
      { kind: "receipt", ref: "boardroom-comment-1" },
    ]);
  });

  it("quarantines weak AutopilotIQ outcomes until proof exists", () => {
    const event = planAutopilotIqOutcomeLedgerEvent({
      actorAgentId: "autopilotiq",
      refId: "todo-123",
      now,
      outcome: "miss",
      learnedSignal: "A stale green chip caused a false done attempt.",
      penaltyDelta: 3,
      confidence: 0.9,
      proofRefs: [],
    });

    expect(event.payload).toMatchObject({
      capture_mode: "shadow",
      execute: false,
      applies_to_future_routing: false,
      outcome: "miss",
      reward_delta: 0,
      penalty_delta: 3,
      confidence: 0.25,
      quarantine: true,
      bad_learning_prevention: {
        shadow_mode_only: true,
        requires_proof_refs: true,
        stale_after_required: true,
        quarantine_reasons: ["missing_proof_refs", "non_win_outcome", "low_confidence", "penalty_exceeds_reward"],
      },
    });
  });

  it("keeps AutopilotIQ outcome proof refs under the existing secret scrubber", () => {
    const event = planAutopilotIqOutcomeLedgerEvent({
      actorAgentId: "autopilotiq",
      refId: "todo-123",
      now,
      outcome: "win",
      proofRefs: [{ kind: "log", ref: "authorization: bearer sk-test-not-real-secret" }],
    });

    expect(() => buildAutopilotEventRow({ ...event, apiKeyHash: "hash_123" })).toThrow(/sensitive text/);
  });

  it("scores refs with only automation events as zero-touch", () => {
    const metrics = createAutopilotZeroTouchMetrics([
      {
        event_type: "claim",
        actor_agent_id: "github-action-queuepush",
        ref_kind: "todo",
        ref_id: "todo-123",
        payload: { source: "wakepass" },
        created_at: "2026-05-09T00:00:00.000Z",
      },
      {
        event_type: "proof_result",
        actor_agent_id: "unclick-builder-tether-seat",
        ref_kind: "todo",
        ref_id: "todo-123",
        payload: { result: "pass" },
        created_at: "2026-05-09T00:05:00.000Z",
      },
    ]);

    expect(metrics).toMatchObject({
      total_refs: 1,
      zero_touch_refs: 1,
      human_touched_refs: 0,
      human_touch_count: 0,
      automation_event_count: 2,
    });
    expect(metrics.refs[0]).toMatchObject({
      ref_kind: "todo",
      ref_id: "todo-123",
      zero_touch: true,
      human_touch_count: 0,
    });
  });

  it("counts operator chat and human actors as human touches", () => {
    const metrics = createAutopilotZeroTouchMetrics([
      {
        event_type: "dispatch",
        actor_agent_id: "github-action-queuepush",
        ref_kind: "pr",
        ref_id: "1015",
        payload: { source: "wakepass" },
        created_at: "2026-05-09T00:00:00.000Z",
      },
      {
        event_type: "merge_decision",
        actor_agent_id: "unclick-builder-tether-seat",
        ref_kind: "pr",
        ref_id: "1015",
        payload: { trigger_source: "operator_chat" },
        created_at: "2026-05-09T00:02:00.000Z",
      },
      {
        event_type: "ack",
        actor_agent_id: "human-616d4beb-4960-451d-bbd3-4d4347a7f9f5",
        ref_kind: "todo",
        ref_id: "todo-operator",
        payload: { blocker: "answered" },
        created_at: "2026-05-09T00:03:00.000Z",
      },
    ]);

    expect(metrics).toMatchObject({
      total_refs: 2,
      zero_touch_refs: 0,
      human_touched_refs: 2,
      human_touch_count: 2,
      automation_event_count: 1,
    });
    expect(metrics.touch_reason_counts).toMatchObject({
      "trigger_source:operator_chat": 1,
      human_actor: 1,
    });
  });
});

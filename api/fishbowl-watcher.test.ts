import { describe, expect, it } from "vitest";
import { createHeartbeat, createReclaimSignal } from "../packages/mcp-server/src/reliability.js";
import {
  CHECKIN_ACK_LEASE_SECONDS,
  CHECKIN_ACTIVE_GRACE_MS,
  CHECKIN_DORMANT_SUPPRESS_MS,
  CHECKIN_OVERDUE_SUPPRESS_MS,
  WORKER_SELF_HEALING_REASSIGN_ATTEMPT_LIMIT,
  WAKEPASS_REROUTE_LEASE_SECONDS,
  buildDispatchReclaimSignal,
  buildMissedCheckinDispatch,
  buildOpenStaleTodoReleasePlan,
  buildWorkerMovementWorkflowPilotProofText,
  buildWakepassAutoReroutePlan,
  buildWorkerSelfHealingSignal,
  hasRecentWorkerSelfHealingReleaseSignal,
  hasRecentWorkerSelfHealingTodoSignal,
  isMissedCheckinDispatch,
  isMissedCheckinCandidate,
  isReclaimableDispatchCandidate,
  isWakepassAutoRerouteEligible,
  messageAcknowledgesDispatch,
  planWorkerMovementWorkflowPilot,
  planWorkerMovementWorkflowPilotProofSignal,
  planWorkerSelfHealingDecision,
  planWorkerSelfHealingTodoRelease,
  planWorkerSelfHealingTodoSignal,
  resolveWakepassRerouteTarget,
  shouldMarkDispatchStaleAfterReclaimSignalInsert,
  workerSelfHealingProtectedReason,
  type DispatchRow,
  type FishbowlMessageAckRow,
  type ProfileRow,
} from "./fishbowl-watcher.js";

const baseProfile: ProfileRow = {
  api_key_hash: "hash_123",
  agent_id: "worker-1",
  emoji: "🦾",
  display_name: "Worker One",
  last_seen_at: "2026-05-01T00:30:00.000Z",
  current_status: "working",
  current_status_updated_at: "2026-05-01T00:30:00.000Z",
  next_checkin_at: "2026-05-01T01:10:00.000Z",
};

const baseDispatch: DispatchRow = {
  api_key_hash: "hash_123",
  dispatch_id: "dispatch_abc",
  source: "wakepass",
  target_agent_id: "worker-1",
  task_ref: "wake-pr-123",
  status: "leased",
  lease_owner: "worker-1",
  lease_expires_at: "2026-05-01T01:10:00.000Z",
  last_real_action_at: null,
  payload: {
    ack_required: true,
    handoff_message_id: "msg-123",
    wake_reason: "PR ready for review",
  },
  created_at: "2026-05-01T01:00:00.000Z",
  updated_at: "2026-05-01T01:00:00.000Z",
};

describe("fishbowl watcher PinballWake ACK coverage", () => {
  it("treats missed next_checkin_at as an action-needed ACK dispatch", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");

    expect(isMissedCheckinCandidate(baseProfile, nowMs)).toBe(true);

    const dispatch = buildMissedCheckinDispatch(baseProfile, nowMs);

    expect(dispatch.source).toBe("wakepass");
    expect(dispatch.targetAgentId).toBe("worker-1");
    expect(dispatch.status).toBe("leased");
    expect(dispatch.leaseOwner).toBe("worker-1");
    expect(dispatch.leaseExpiresAt).toBe("2026-05-01T01:32:00.000Z");
    expect(dispatch.taskRef).toBe(
      "fishbowl-checkin:worker-1:2026-05-01T01:10:00.000Z",
    );
    expect(dispatch.payload).toMatchObject({
      ack_required: true,
      route_attempted: "fishbowl-watcher",
      wake_reason: "missed_next_checkin",
      wake_urgency: "high",
      ack_fail_after_seconds: CHECKIN_ACK_LEASE_SECONDS,
      agent_id: "worker-1",
      overdue_minutes: 12,
    });
  });

  it("keeps non-action profiles silent", () => {
    const nowMs = Date.parse("2026-05-01T01:09:00.000Z");
    expect(isMissedCheckinCandidate(baseProfile, nowMs)).toBe(false);

    expect(
      isMissedCheckinCandidate(
        {
          ...baseProfile,
          last_seen_at: "2026-05-01T01:11:00.000Z",
        },
        Date.parse("2026-05-01T01:22:00.000Z"),
      ),
    ).toBe(false);

    expect(
      isMissedCheckinCandidate(
        {
          ...baseProfile,
          next_checkin_at: null,
        },
        Date.parse("2026-05-01T01:22:00.000Z"),
      ),
    ).toBe(false);
  });

  it("suppresses missed check-ins for agents seen within the active grace window", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");

    expect(
      isMissedCheckinCandidate(
        {
          ...baseProfile,
          last_seen_at: new Date(nowMs - CHECKIN_ACTIVE_GRACE_MS + 1_000).toISOString(),
          next_checkin_at: "2026-05-01T01:21:00.000Z",
        },
        nowMs,
      ),
    ).toBe(false);
  });

  it("suppresses missed check-ins once the missed window is old noise", () => {
    const nowMs = Date.parse("2026-05-01T14:00:00.000Z");

    expect(
      isMissedCheckinCandidate(
        {
          ...baseProfile,
          last_seen_at: new Date(nowMs - CHECKIN_OVERDUE_SUPPRESS_MS - 60_000).toISOString(),
          next_checkin_at: new Date(nowMs - CHECKIN_OVERDUE_SUPPRESS_MS - 1_000).toISOString(),
        },
        nowMs,
      ),
    ).toBe(false);
  });

  it("suppresses missed check-ins for long-dormant agents", () => {
    const nowMs = Date.parse("2026-05-08T01:22:00.000Z");

    expect(
      isMissedCheckinCandidate(
        {
          ...baseProfile,
          last_seen_at: new Date(nowMs - CHECKIN_DORMANT_SUPPRESS_MS - 1_000).toISOString(),
          next_checkin_at: "2026-05-08T01:10:00.000Z",
        },
        nowMs,
      ),
    ).toBe(false);
  });

  it("missed ACK reclaim is visible and heartbeat can close the leased dispatch", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");
    const dispatch = buildMissedCheckinDispatch(baseProfile, nowMs);

    const reclaimSignal = createReclaimSignal(dispatch, 30);
    expect(reclaimSignal.action).toBe("handoff_ack_missing");
    expect(reclaimSignal.payload).toMatchObject({
      dispatch_id: dispatch.dispatchId,
      target_agent_id: "worker-1",
      ack_required: true,
    });

    const heartbeat = createHeartbeat({
      apiKeyHash: "hash_123",
      agentId: "worker-1",
      dispatchId: dispatch.dispatchId,
      state: "completed",
      currentTask: "ACK missed check-in handoff",
      nextAction: "resume normal heartbeat",
      createdAt: new Date("2026-05-01T01:23:00.000Z"),
    });

    expect(heartbeat).toMatchObject({
      agentId: dispatch.leaseOwner,
      dispatchId: dispatch.dispatchId,
      state: "completed",
    });
  });

  it("classifies expired ACK leases as reclaimable missing-ACK work", () => {
    const nowMs = Date.parse("2026-05-01T01:12:30.000Z");

    expect(isReclaimableDispatchCandidate(baseDispatch, nowMs)).toBe(true);

    const signal = buildDispatchReclaimSignal(baseDispatch, nowMs);

    expect(signal).toMatchObject({
      action: "handoff_ack_missing",
      summary: "WakePass reliability miss: no ACK arrived before reclaim for worker-1",
      payload: {
        dispatch_id: "dispatch_abc",
        source: "wakepass",
        target_agent_id: "worker-1",
        task_ref: "wake-pr-123",
        stale_seconds: 150,
        ack_required: true,
        handoff_message_id: "msg-123",
        wake_reason: "PR ready for review",
      },
    });
  });

  it("matches threaded ACK replies that name the exact wake event", () => {
    const wakeEventId = "wake-pull_request-pr-508-5e6cd76ba13e";
    const dispatch: DispatchRow = {
      ...baseDispatch,
      task_ref: wakeEventId,
      payload: {
        ack_required: true,
        handoff_message_id: "msg-123",
        wake_event_id: wakeEventId,
      },
    };
    const message: FishbowlMessageAckRow = {
      id: "msg-ack",
      text: `ACK ${wakeEventId}. PASS: already merged.`,
      thread_id: "msg-123",
      created_at: "2026-05-01T01:12:00.000Z",
      author_agent_id: "chatgpt-codex-heartbeat",
    };

    expect(messageAcknowledgesDispatch(dispatch, message)).toBe(true);
  });

  it("matches threaded QueuePush ACK replies without requiring repeated packet text", () => {
    const dispatch: DispatchRow = {
      ...baseDispatch,
      task_ref: "fishbowl-message:msg-queuepush",
      payload: {
        kind: "message_handoff",
        ack_required: true,
        handoff_message_id: "msg-queuepush",
        summary:
          "QueuePush ID: queuepush:v3:pr-544:blocked_chris_only:caef570:e53888490d",
      },
    };
    const message: FishbowlMessageAckRow = {
      id: "msg-ack",
      text: "ACK. BLOCKER: exact Chris decision still required.",
      thread_id: "msg-queuepush",
      created_at: "2026-05-01T01:12:00.000Z",
      author_agent_id: "chatgpt-codex-heartbeat",
    };

    expect(messageAcknowledgesDispatch(dispatch, message)).toBe(true);
  });

  it("does not count wake prompt copy as an ACK reply", () => {
    const wakeEventId = "wake-pull_request-pr-508-5e6cd76ba13e";
    const message: FishbowlMessageAckRow = {
      id: "msg-123",
      text: `Wake event id: ${wakeEventId}\nACK requested: reply ACK ${wakeEventId}`,
      thread_id: null,
      created_at: "2026-05-01T01:00:00.000Z",
      author_agent_id: "github-action-wake-router",
    };

    expect(
      messageAcknowledgesDispatch(
        {
          ...baseDispatch,
          task_ref: wakeEventId,
          payload: {
            ack_required: true,
            wake_event_id: wakeEventId,
          },
        },
        message,
      ),
    ).toBe(false);
  });

  it("does not reclaim active or non-leased dispatches", () => {
    const beforeExpiryMs = Date.parse("2026-05-01T01:09:59.000Z");
    const afterExpiryMs = Date.parse("2026-05-01T01:12:30.000Z");

    expect(isReclaimableDispatchCandidate(baseDispatch, beforeExpiryMs)).toBe(false);
    expect(buildDispatchReclaimSignal(baseDispatch, beforeExpiryMs)).toBeNull();

    expect(
      isReclaimableDispatchCandidate(
        {
          ...baseDispatch,
          status: "completed",
        },
        afterExpiryMs,
      ),
    ).toBe(false);
  });

  it("keeps expired leases retryable when reclaim signal insert fails", () => {
    expect(
      shouldMarkDispatchStaleAfterReclaimSignalInsert({
        message: "temporary mc_signals insert failure",
      }),
    ).toBe(false);

    expect(shouldMarkDispatchStaleAfterReclaimSignalInsert(null)).toBe(true);
  });

  it("plans a Coordinator reroute for missed QueuePush todo ACKs", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");
    const todoDispatch: DispatchRow = {
      ...baseDispatch,
      dispatch_id: "dispatch_builder_ack",
      target_agent_id: "chatgpt-codex-desktop",
      task_ref: "702a7edd-7464-4879-801b-c4ee0dcbe539",
      payload: {
        kind: "todo_assignment",
        ack_required: true,
        title: "Builder ACK needed: PR #554 owner lift decision",
        summary: "QueuePush owner decision is waiting on Builder ACK.",
      },
    };
    const signal = buildDispatchReclaimSignal(todoDispatch, nowMs);
    expect(signal?.action).toBe("handoff_ack_missing");

    const plan = buildWakepassAutoReroutePlan({
      row: todoDispatch,
      signal: signal!,
      profiles: [
        {
          ...baseProfile,
          agent_id: "master",
          emoji: "🧭",
          display_name: "Coordinator",
          last_seen_at: "2026-05-01T01:20:00.000Z",
        },
      ],
      nowMs,
    });

    expect(plan).not.toBeNull();
    expect(plan?.dispatch).toMatchObject({
      source: "wakepass",
      targetAgentId: "master",
      status: "leased",
      leaseOwner: "master",
      taskRef: "wakepass-reroute:dispatch_builder_ack",
      leaseExpiresAt: new Date(
        nowMs + WAKEPASS_REROUTE_LEASE_SECONDS * 1000,
      ).toISOString(),
      payload: {
        kind: "wakepass_auto_reroute",
        ack_required: true,
        original_dispatch_id: "dispatch_builder_ack",
        original_target_agent_id: "chatgpt-codex-desktop",
        reroute_target_role: "coordinator",
      },
    });
    expect(plan?.messageText).toContain("Coordinator action");
    expect(plan?.signal).toMatchObject({
      action: "handoff_ack_rerouted",
      severity: "info",
      payload: {
        rerouted: true,
        reroute_target_agent_id: "master",
      },
    });
  });

  it("does not auto-reroute stale check-in noise", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");
    const staleCheckinDispatch = {
      ...baseDispatch,
      task_ref: "fishbowl-checkin:worker-1:2026-05-01T01:10:00.000Z",
      payload: {
        ack_required: true,
        wake_reason: "missed_next_checkin",
      },
    };
    const signal = buildDispatchReclaimSignal(staleCheckinDispatch, nowMs);

    expect(isMissedCheckinDispatch(staleCheckinDispatch)).toBe(true);
    expect(signal).toMatchObject({
      action: "stale_dispatch_reclaimed",
      summary: "Reclaimed stale missed check-in dispatch for worker-1",
      payload: {
        wake_reason: "missed_next_checkin",
      },
    });
    expect(isWakepassAutoRerouteEligible(staleCheckinDispatch)).toBe(false);
    expect(
      buildWakepassAutoReroutePlan({
        row: staleCheckinDispatch,
        signal: signal!,
        profiles: [],
        nowMs,
      }),
    ).toBeNull();
  });

  it("falls back to the default Coordinator when registry profiles are missing", () => {
    expect(resolveWakepassRerouteTarget([])).toEqual({
      agentId: "master",
      recipient: "🧭",
      role: "coordinator",
      reason: "default_coordinator",
    });
  });
});

describe("worker self-healing decision plan", () => {
  it("preserves an active todo lease even when the worker missed check-in", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");

    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-active-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-fresh",
        lease_expires_at: "2026-05-01T01:25:00.000Z",
        reclaim_count: 1,
      },
      profile: baseProfile,
      latestHandoffReceiptId: "handoff-latest-1",
      nowMs,
    });

    expect(decision).toMatchObject({
      action: "active_lease_preserved",
      todo_id: "todo-active-lease",
      assigned_to_agent_id: "worker-1",
      lease_token: "lease-fresh",
      lease_expires_at: "2026-05-01T01:25:00.000Z",
      reclaim_count: 1,
      next_reclaim_count: 1,
      latest_handoff_receipt_id: "handoff-latest-1",
      reason: "active_lease_not_expired",
    });
  });

  it("marks an expired todo lease reclaimable with the next reclaim count", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-old",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-2",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(decision).toMatchObject({
      action: "expired_lease_reclaimable",
      todo_id: "todo-expired-lease",
      assigned_to_agent_id: "worker-1",
      lease_token: "lease-old",
      reclaim_count: 2,
      next_reclaim_count: 3,
      latest_handoff_receipt_id: "handoff-latest-2",
      reason: "lease_expired",
    });
  });

  it("protects human and manual-only work from stale lease reclaim", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");
    const protectedCases = [
      {
        todo: {
          id: "todo-human-owned",
          status: "in_progress",
          assigned_to_agent_id: "human-chris",
          lease_token: "lease-old",
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: 2,
        },
        reason: "human_owned_work_protected",
      },
      {
        todo: {
          id: "todo-manual-only",
          title: "manual_only operator handoff",
          status: "in_progress",
          assigned_to_agent_id: "worker-1",
          lease_token: "lease-old",
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: 1,
        },
        reason: "manual_only_protected",
      },
      {
        todo: {
          id: "todo-human-blocker",
          description: "human blocker: needs operator merge approval",
          status: "in_progress",
          assigned_to_agent_id: "worker-1",
          lease_token: "lease-old",
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: 0,
        },
        reason: "human_blocker_protected",
      },
    ];

    for (const testCase of protectedCases) {
      const decision = planWorkerSelfHealingDecision({
        todo: testCase.todo,
        profile: null,
        latestHandoffReceiptId: "handoff-protected",
        nowMs,
      });

      expect(decision).toMatchObject({
        action: "no_action",
        todo_id: testCase.todo.id,
        next_reclaim_count: testCase.todo.reclaim_count,
        latest_handoff_receipt_id: "handoff-protected",
        reason: testCase.reason,
      });
      expect(buildWorkerSelfHealingSignal(decision)).toBeNull();
    }
  });

  it("flags a stale worker for action when no active todo lease exists", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");

    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-stale-worker",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 0,
      },
      profile: baseProfile,
      latestHandoffReceiptId: "handoff-latest-3",
      nowMs,
    });

    expect(decision).toMatchObject({
      action: "stale_worker_action_needed",
      todo_id: "todo-stale-worker",
      assigned_to_agent_id: "worker-1",
      profile_agent_id: "worker-1",
      next_checkin_at: "2026-05-01T01:10:00.000Z",
      last_seen_at: "2026-05-01T00:30:00.000Z",
      latest_handoff_receipt_id: "handoff-latest-3",
      reason: "missed_next_checkin_without_active_lease",
    });
  });

  it("carries the latest handoff receipt through resume-safe no-action decisions", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-current-worker",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: null,
      },
      profile: {
        ...baseProfile,
        last_seen_at: "2026-05-01T01:21:00.000Z",
        next_checkin_at: "2026-05-01T01:30:00.000Z",
      },
      latestHandoffReceiptId: "handoff-latest-4",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(decision).toMatchObject({
      action: "no_action",
      todo_id: "todo-current-worker",
      reclaim_count: 0,
      next_reclaim_count: 0,
      latest_handoff_receipt_id: "handoff-latest-4",
      reason: "no_stale_worker_or_reclaimable_lease",
    });
  });

  it("turns an expired lease decision into a reclaim signal without exposing the token", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-5",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    const signal = buildWorkerSelfHealingSignal(decision);

    expect(signal).toMatchObject({
      action: "worker_self_healing_reclaimable_lease",
      severity: "action_needed",
      summary: "Todo todo-expired-lease has an expired worker lease and can be reclaimed.",
      payload: {
        todo_id: "todo-expired-lease",
        assigned_to_agent_id: "worker-1",
        has_lease_token: true,
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
        next_reclaim_count: 3,
        latest_handoff_receipt_id: "handoff-latest-5",
        reason: "lease_expired",
      },
    });
    expect(signal?.payload).not.toHaveProperty("lease_token");
  });

  it("plans an insert row for an expired lease signal without exposing the token", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-5",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    const plan = planWorkerSelfHealingTodoSignal({
      apiKeyHash: "hash_123",
      decision,
      emittedAt: "2026-05-01T01:22:01.000Z",
    });

    expect(plan).toMatchObject({
      signal: {
        action: "worker_self_healing_reclaimable_lease",
        severity: "action_needed",
      },
      insert: {
        api_key_hash: "hash_123",
        tool: "fishbowl",
        action: "worker_self_healing_reclaimable_lease",
        severity: "action_needed",
        summary: "Todo todo-expired-lease has an expired worker lease and can be reclaimed.",
        deep_link: "/admin/jobs#todo-todo-expired-lease",
        payload: {
          todo_id: "todo-expired-lease",
          assigned_to_agent_id: "worker-1",
          has_lease_token: true,
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: 2,
          next_reclaim_count: 3,
          latest_handoff_receipt_id: "handoff-latest-5",
          reason: "lease_expired",
          emitted_at: "2026-05-01T01:22:01.000Z",
        },
      },
    });
    expect(plan?.insert.payload).not.toHaveProperty("lease_token");
  });

  it("dedupes worker self-healing todo signals by action and todo id", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-5",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });
    const plan = planWorkerSelfHealingTodoSignal({
      apiKeyHash: "hash_123",
      decision,
      emittedAt: "2026-05-01T01:22:01.000Z",
    });

    expect(plan).not.toBeNull();
    expect(
      hasRecentWorkerSelfHealingTodoSignal(
        [
          {
            action: "worker_self_healing_reclaimable_lease",
            payload: {
              todo_id: "todo-expired-lease",
            },
          },
        ],
        plan!,
      ),
    ).toBe(true);
    expect(
      hasRecentWorkerSelfHealingTodoSignal(
        [
          {
            action: "worker_self_healing_reclaimable_lease",
            payload: {
              todo_id: "other-todo",
            },
          },
          {
            action: "worker_self_healing_stale_worker",
            payload: {
              todo_id: "todo-expired-lease",
            },
          },
        ],
        plan!,
      ),
    ).toBe(false);
  });

  it("turns a stale worker decision into an action-needed signal with profile context", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-stale-worker",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 0,
      },
      profile: baseProfile,
      latestHandoffReceiptId: "handoff-latest-6",
      nowMs,
    });

    expect(buildWorkerSelfHealingSignal(decision)).toMatchObject({
      action: "worker_self_healing_stale_worker",
      severity: "action_needed",
      payload: {
        todo_id: "todo-stale-worker",
        profile_agent_id: "worker-1",
        next_checkin_at: "2026-05-01T01:10:00.000Z",
        last_seen_at: "2026-05-01T00:30:00.000Z",
        next_reclaim_count: 1,
        reason: "missed_next_checkin_without_active_lease",
      },
    });
  });

  it("plans a proof-backed release for an expired in-progress lease", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-8",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    const release = planWorkerSelfHealingTodoRelease({
      apiKeyHash: "hash_123",
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      decision,
      releasedAt: "2026-05-01T01:22:01.000Z",
    });

    expect(release).toMatchObject({
      signal: {
        action: "worker_self_healing_stale_owner_released",
        severity: "info",
      },
      insert: {
        api_key_hash: "hash_123",
        tool: "fishbowl",
        action: "worker_self_healing_stale_owner_released",
        severity: "info",
        deep_link: "/admin/jobs#todo-todo-expired-lease",
        payload: {
          todo_id: "todo-expired-lease",
          previous_assigned_to_agent_id: "worker-1",
          next_status: "open",
          released_stale_owner: true,
          bonded_handoff_required: true,
          reassignment_attempts_capped_at: WORKER_SELF_HEALING_REASSIGN_ATTEMPT_LIMIT,
        },
      },
      update: {
        status: "open",
        assigned_to_agent_id: null,
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 3,
        updated_at: "2026-05-01T01:22:01.000Z",
      },
    });
    expect(JSON.stringify(release)).not.toContain("lease-secret");
  });

  it("plans a release for a stale in-progress owner without an active lease", () => {
    const todo = {
      id: "todo-stale-worker",
      status: "in_progress",
      assigned_to_agent_id: "worker-1",
      lease_token: null,
      lease_expires_at: null,
      reclaim_count: 0,
    };
    const decision = planWorkerSelfHealingDecision({
      todo,
      profile: baseProfile,
      latestHandoffReceiptId: "handoff-latest-9",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    const release = planWorkerSelfHealingTodoRelease({
      apiKeyHash: "hash_123",
      todo,
      decision,
      releasedAt: "2026-05-01T01:22:01.000Z",
    });

    expect(decision).toMatchObject({
      action: "stale_worker_action_needed",
      next_reclaim_count: 1,
      reason: "missed_next_checkin_without_active_lease",
    });
    expect(release).toMatchObject({
      update: {
        status: "open",
        assigned_to_agent_id: null,
        reclaim_count: 1,
      },
      insert: {
        payload: {
          bonded_handoff_required: true,
          profile_agent_id: "worker-1",
          released_stale_owner: true,
        },
      },
    });
  });

  it("does not release protected, open, or capped stale-owner candidates", () => {
    const nowMs = Date.parse("2026-05-01T01:22:00.000Z");
    const releaseCases = [
      {
        todo: {
          id: "todo-human",
          status: "in_progress",
          assigned_to_agent_id: "human-chris",
          lease_token: "lease-old",
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: 0,
        },
      },
      {
        todo: {
          id: "todo-open",
          status: "open",
          assigned_to_agent_id: "worker-1",
          lease_token: "lease-old",
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: 0,
        },
      },
      {
        todo: {
          id: "todo-capped",
          status: "in_progress",
          assigned_to_agent_id: "worker-1",
          lease_token: "lease-old",
          lease_expires_at: "2026-05-01T01:10:00.000Z",
          reclaim_count: WORKER_SELF_HEALING_REASSIGN_ATTEMPT_LIMIT,
        },
      },
    ];

    for (const { todo } of releaseCases) {
      const decision = planWorkerSelfHealingDecision({
        todo,
        profile: null,
        latestHandoffReceiptId: null,
        nowMs,
      });

      expect(
        planWorkerSelfHealingTodoRelease({
          apiKeyHash: "hash_123",
          todo,
          decision,
          releasedAt: "2026-05-01T01:22:01.000Z",
        }),
      ).toBeNull();
    }
  });

  it("dedupes release proof by todo id and release flag", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: null,
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });
    const release = planWorkerSelfHealingTodoRelease({
      apiKeyHash: "hash_123",
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      decision,
      releasedAt: "2026-05-01T01:22:01.000Z",
    });

    expect(release).not.toBeNull();
    expect(
      hasRecentWorkerSelfHealingReleaseSignal(
        [
          {
            action: "worker_self_healing_stale_owner_released",
            payload: {
              todo_id: "todo-expired-lease",
              released_stale_owner: true,
            },
          },
        ],
        release!,
      ),
    ).toBe(true);
    expect(
      hasRecentWorkerSelfHealingReleaseSignal(
        [
          {
            action: "worker_self_healing_stale_owner_released",
            payload: {
              todo_id: "todo-expired-lease",
              released_stale_owner: false,
            },
          },
        ],
        release!,
      ),
    ).toBe(false);
  });

  it("keeps no-action decisions quiet", () => {
    const decision = planWorkerSelfHealingDecision({
      todo: {
        id: "todo-current-worker",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 0,
      },
      profile: {
        ...baseProfile,
        last_seen_at: "2026-05-01T01:21:00.000Z",
        next_checkin_at: "2026-05-01T01:30:00.000Z",
      },
      latestHandoffReceiptId: "handoff-latest-7",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(buildWorkerSelfHealingSignal(decision)).toBeNull();
    expect(
      planWorkerSelfHealingTodoSignal({
        apiKeyHash: "hash_123",
        decision,
        emittedAt: "2026-05-01T01:22:01.000Z",
      }),
    ).toBeNull();
  });
});

describe("WriterLane Slice 2b open-stale todo release wiring", () => {
  // Fixed reference clock. Thresholds (from fishbowl-todo-actionability): an
  // open assigned todo is "stale" only after 6h of age AND a dormant owner
  // (last seen > 1h ago, or no profile, or a role assignee).
  const NOW = "2026-05-26T12:00:00.000Z";
  const nowMs = Date.parse(NOW);
  const HOUR = 60 * 60 * 1000;
  const agedUpdatedAt = new Date(nowMs - 8 * HOUR).toISOString(); // > 6h: aged
  const freshUpdatedAt = new Date(nowMs - 3 * HOUR).toISOString(); // < 6h: not aged
  const dormantSeenAt = new Date(nowMs - 2 * HOUR).toISOString(); // > 1h: dormant
  const liveSeenAt = new Date(nowMs - 7 * 60 * 1000).toISOString(); // < 1h: live

  const openStaleTodo = (overrides: Record<string, unknown> = {}) => ({
    id: "todo-open-stale",
    status: "open",
    assigned_to_agent_id: "worker-7",
    lease_token: null,
    lease_expires_at: null,
    reclaim_count: 0,
    updated_at: agedUpdatedAt,
    created_at: agedUpdatedAt,
    ...overrides,
  });

  const buildPlan = (
    overrides: Record<string, unknown> = {},
    extra: { ownerLastSeenAt?: string | null; isProtected?: boolean } = {},
  ) =>
    buildOpenStaleTodoReleasePlan({
      apiKeyHash: "hash_123",
      todo: openStaleTodo(overrides) as never,
      ownerLastSeenAt:
        "ownerLastSeenAt" in extra ? extra.ownerLastSeenAt ?? null : dormantSeenAt,
      isProtected: extra.isProtected ?? false,
      releasedAt: NOW,
      nowMs,
    });

  it("releases a genuinely stale open todo with a dormant non-role owner", () => {
    const plan = buildPlan();
    expect(plan).toMatchObject({
      signal: {
        action: "worker_self_healing_stale_owner_released",
        severity: "info",
      },
      insert: {
        api_key_hash: "hash_123",
        tool: "fishbowl",
        action: "worker_self_healing_stale_owner_released",
        deep_link: "/admin/jobs#todo-todo-open-stale",
        payload: {
          todo_id: "todo-open-stale",
          classification: "stale_assigned_open",
          previous_status: "open",
          previous_assigned_to_agent_id: "worker-7",
          next_status: "open",
          released_stale_owner: true,
          bonded_handoff_required: true,
          reclaim_count: 0,
          next_reclaim_count: 1,
        },
      },
      update: {
        status: "open",
        assigned_to_agent_id: null,
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 1,
        updated_at: NOW,
      },
    });
  });

  it("releases when the owner has no profile (treated as dormant)", () => {
    const plan = buildPlan({}, { ownerLastSeenAt: null });
    expect(plan).not.toBeNull();
    expect(plan!.update.assigned_to_agent_id).toBeNull();
    expect(plan!.update.reclaim_count).toBe(1);
  });

  it("leaves a fresh-owner open todo untouched (live within 1h)", () => {
    expect(buildPlan({}, { ownerLastSeenAt: liveSeenAt })).toBeNull();
  });

  it("leaves a not-yet-aged open todo untouched even with a dormant owner", () => {
    expect(buildPlan({ updated_at: freshUpdatedAt, created_at: freshUpdatedAt })).toBeNull();
  });

  it("leaves role-assigned open todos untouched", () => {
    for (const role of ["master", "coordinator", "pinballwake-job-runner"]) {
      expect(buildPlan({ assigned_to_agent_id: role })).toBeNull();
    }
  });

  it("never touches in_progress todos via this path", () => {
    // status=in_progress classifies as stale_in_progress, not stale_assigned_open,
    // so the open-stale helper declines and the existing in_progress planner owns it.
    expect(buildPlan({ status: "in_progress" })).toBeNull();
  });

  it("never releases when the caller marks the todo protected", () => {
    // The watcher computes isProtected via workerSelfHealingProtectedReason and
    // passes it in; the helper trusts that flag and refuses to plan a release.
    expect(buildPlan({}, { isProtected: true })).toBeNull();
    expect(
      buildPlan(
        { title: "human_blocker: owner must approve before any move" },
        { isProtected: true },
      ),
    ).toBeNull();
    expect(
      buildPlan({ assigned_to_agent_id: "human-chris" }, { isProtected: true }),
    ).toBeNull();
  });

  it("protection gate (watcher input) flags human/manual todos and clears normal ones", () => {
    // This is the gate the watcher runs before planning a release. It must flag
    // human/manual work so isProtected=true reaches the helper.
    expect(
      workerSelfHealingProtectedReason({
        id: "t",
        status: "open",
        assigned_to_agent_id: "worker-7",
        title: "human_blocker: needs owner approval",
      } as never),
    ).toBe("human_blocker_protected");
    expect(
      workerSelfHealingProtectedReason({
        id: "t",
        status: "open",
        assigned_to_agent_id: "worker-7",
        title: "manual-only deploy step",
      } as never),
    ).toBe("manual_only_protected");
    expect(
      workerSelfHealingProtectedReason({
        id: "t",
        status: "open",
        assigned_to_agent_id: "human-chris",
        title: "ordinary task",
      } as never),
    ).toBe("human_owned_work_protected");
    // A plain worker-owned open todo is NOT protected -> relies on age/liveness.
    expect(
      workerSelfHealingProtectedReason({
        id: "t",
        status: "open",
        assigned_to_agent_id: "worker-7",
        title: "ordinary task",
      } as never),
    ).toBeNull();
  });

  it("respects the reclaim cap (< 3) and bumps reclaim_count", () => {
    expect(buildPlan({ reclaim_count: 3 })).toBeNull();
    const plan = buildPlan({ reclaim_count: 2 });
    expect(plan).not.toBeNull();
    expect(plan!.update.reclaim_count).toBe(3);
    expect(plan!.insert.payload.reclaim_count).toBe(2);
    expect(plan!.insert.payload.next_reclaim_count).toBe(3);
  });

  // ── Canary safety (AFK canary seed 8719dc4f-1650-4ea9-bca8-e92a9819f0ba) ──
  // The canary is an open todo assigned to the autonomous runner. It is now
  // protected-by-id: workerSelfHealingProtectedReason returns a protected reason
  // for its exact todo id, so the watcher never releases it regardless of age or
  // owner liveness. Defense-in-depth still holds via the age + owner-liveness
  // gates in a healthy system. The protection is scoped to this seed id only and
  // does NOT protect the runner agent globally.
  const canaryTodo = (overrides: Record<string, unknown> = {}) =>
    openStaleTodo({
      id: "8719dc4f-1650-4ea9-bca8-e92a9819f0ba",
      title: "AFK canary seed: docs-only OpenHands proof fixture",
      assigned_to_agent_id: "pinballwake-autonomous-runner",
      priority: "urgent",
      ...overrides,
    });

  it("protects the canary seed by id (returns canary_seed_protected)", () => {
    expect(workerSelfHealingProtectedReason(canaryTodo() as never)).toBe(
      "canary_seed_protected",
    );
    // Case-insensitive id match (UUIDs may arrive upper-cased).
    expect(
      workerSelfHealingProtectedReason(
        canaryTodo({ id: "8719DC4F-1650-4EA9-BCA8-E92A9819F0BA" }) as never,
      ),
    ).toBe("canary_seed_protected");
  });

  it("does NOT release the canary even when aged AND owner dormant (protected-by-id)", () => {
    // Worst case for the canary: aged > 6h with a dormant owner — exactly the
    // sustained-outage edge. The watcher computes isProtected via the gate, so
    // the open-stale sweep must refuse to plan a release.
    const todo = canaryTodo({ updated_at: agedUpdatedAt, created_at: agedUpdatedAt });
    const isProtected = workerSelfHealingProtectedReason(todo as never) !== null;
    expect(isProtected).toBe(true);
    const plan = buildOpenStaleTodoReleasePlan({
      apiKeyHash: "hash_123",
      todo: todo as never,
      ownerLastSeenAt: dormantSeenAt,
      isProtected,
      releasedAt: NOW,
      nowMs,
    });
    expect(plan).toBeNull();
  });

  it("does NOT protect a different runner-owned open todo (scoped to seed id only)", () => {
    // A legitimate stale runner-owned job (NOT the canary id) must stay
    // releasable; per-seed protection must not become global runner protection.
    const todo = openStaleTodo({
      id: "11111111-2222-3333-4444-555555555555",
      assigned_to_agent_id: "pinballwake-autonomous-runner",
    });
    expect(workerSelfHealingProtectedReason(todo as never)).toBeNull();
    const plan = buildOpenStaleTodoReleasePlan({
      apiKeyHash: "hash_123",
      todo: todo as never,
      ownerLastSeenAt: dormantSeenAt,
      isProtected: false,
      releasedAt: NOW,
      nowMs,
    });
    expect(plan).not.toBeNull();
    expect(plan!.update.assigned_to_agent_id).toBeNull();
  });

  it("leaves the canary untouched when its owner is live (< 1h)", () => {
    const plan = buildOpenStaleTodoReleasePlan({
      apiKeyHash: "hash_123",
      todo: canaryTodo() as never,
      ownerLastSeenAt: liveSeenAt,
      isProtected: false,
      releasedAt: NOW,
      nowMs,
    });
    expect(plan).toBeNull();
  });

  it("leaves the canary untouched via the age gate even if its owner is dormant", () => {
    // Primary protection in a healthy system: the canary is re-exercised
    // regularly so updated_at stays < 6h and it is never even classified stale.
    const plan = buildOpenStaleTodoReleasePlan({
      apiKeyHash: "hash_123",
      todo: canaryTodo({ updated_at: freshUpdatedAt, created_at: freshUpdatedAt }) as never,
      ownerLastSeenAt: dormantSeenAt,
      isProtected: false,
      releasedAt: NOW,
      nowMs,
    });
    expect(plan).toBeNull();
  });

  it("leaves the canary untouched when explicitly protected", () => {
    const plan = buildOpenStaleTodoReleasePlan({
      apiKeyHash: "hash_123",
      todo: canaryTodo() as never,
      ownerLastSeenAt: dormantSeenAt,
      isProtected: true,
      releasedAt: NOW,
      nowMs,
    });
    expect(plan).toBeNull();
  });

  it("returns null for blank apiKeyHash or releasedAt (no-op guard)", () => {
    expect(
      buildOpenStaleTodoReleasePlan({
        apiKeyHash: "  ",
        todo: openStaleTodo() as never,
        ownerLastSeenAt: dormantSeenAt,
        isProtected: false,
        releasedAt: NOW,
        nowMs,
      }),
    ).toBeNull();
    expect(
      buildOpenStaleTodoReleasePlan({
        apiKeyHash: "hash_123",
        todo: openStaleTodo() as never,
        ownerLastSeenAt: dormantSeenAt,
        isProtected: false,
        releasedAt: "   ",
        nowMs,
      }),
    ).toBeNull();
  });
});

describe("Vercel worker movement workflow pilot plan", () => {
  it("builds a dry-run start plan for one safe expired lease candidate", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "Worker self-healing: heartbeat timeout, reclaim, and resume-safe queue behavior",
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-8",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(plan).toMatchObject({
      mode: "dry_run",
      action: "start_dry_run",
      candidate_id: "todo-expired-lease",
      safety: {
        allowed: true,
        reason: "safe_proof_only_candidate",
      },
      owner_age_minutes: 12,
      decision: {
        action: "expired_lease_reclaimable",
        latest_handoff_receipt_id: "handoff-latest-8",
      },
      signal: {
        action: "worker_self_healing_reclaimable_lease",
      },
      proof: {
        next_safe_step: "start Vercel Workflow in dry-run mode and post proof only",
        payload: {
          proof_mode: "dry_run",
          action: "start_dry_run",
          has_lease_token: true,
          planned_signal_action: "worker_self_healing_reclaimable_lease",
        },
      },
    });
    expect(plan.workflow_key).toContain("todo-expired-lease");
    expect(JSON.stringify(plan.proof.payload)).not.toContain("lease-secret");
    expect(buildWorkerMovementWorkflowPilotProofText(plan)).toContain(
      "Vercel worker movement pilot start_dry_run",
    );
  });

  it("refuses security-gated candidates even when the stale lease is detectable", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "SECURITY: deactivate legacy plaintext api_keys_legacy rows after owner auth",
      todo: {
        id: "todo-security",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 0,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-9",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(plan).toMatchObject({
      mode: "dry_run",
      action: "post_refusal_proof",
      candidate_id: "todo-security",
      safety: {
        allowed: false,
        reason: "owner_or_security_gated_job",
      },
      signal: null,
      proof: {
        next_safe_step:
          "post refusal proof and leave the job with its owner (owner_or_security_gated_job)",
        payload: {
          action: "post_refusal_proof",
          planned_signal_action: "worker_self_healing_reclaimable_lease",
        },
      },
    });
    expect(JSON.stringify(plan)).not.toContain("lease-secret");
  });

  it("posts refusal proof instead of starting workflow for protected human/manual work", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "SeatRelay manual-only operator blocker",
      todo: {
        id: "todo-manual-only",
        title: "manual_only operator handoff",
        status: "in_progress",
        assigned_to_agent_id: "human-chris",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-protected",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(plan).toMatchObject({
      mode: "dry_run",
      action: "post_refusal_proof",
      candidate_id: "todo-manual-only",
      safety: {
        allowed: false,
        reason: "manual_only_protected",
      },
      signal: null,
      decision: {
        action: "no_action",
        has_lease_token: true,
        reason: "human_owned_work_protected",
      },
      proof: {
        next_safe_step:
          "post refusal proof and leave the job with its owner (manual_only_protected)",
        payload: {
          action: "post_refusal_proof",
          planned_signal_action: null,
        },
      },
    });
    expect(JSON.stringify(plan)).not.toContain("lease-secret");
  });

  it("posts refusal proof for pure human-owned protected work", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "ordinary stale lease",
      todo: {
        id: "todo-human-owned-only",
        status: "in_progress",
        assigned_to_agent_id: "human-chris",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 1,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-human-owned",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });
    const proof = planWorkerMovementWorkflowPilotProofSignal({
      apiKeyHash: "hash_123",
      plan,
      emittedAt: "2026-05-01T01:22:00.000Z",
    });

    expect(plan).toMatchObject({
      mode: "dry_run",
      action: "post_refusal_proof",
      candidate_id: "todo-human-owned-only",
      safety: {
        allowed: false,
        reason: "human_owned_work_protected",
      },
      signal: null,
      decision: {
        action: "no_action",
        has_lease_token: true,
        reason: "human_owned_work_protected",
      },
      proof: {
        next_safe_step:
          "post refusal proof and leave the job with its owner (human_owned_work_protected)",
        payload: {
          action: "post_refusal_proof",
          planned_signal_action: null,
        },
      },
    });
    expect(proof?.signal).toMatchObject({
      action: "worker_movement_workflow_pilot_blocker",
      severity: "action_needed",
      payload: {
        proof_status: "BLOCKER",
        safety_reason: "human_owned_work_protected",
      },
    });
    expect(JSON.stringify({ plan, proof })).not.toContain("lease-secret");
  });

  it("skips workflow start when existing planner finds no movement needed", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "Worker self-healing: heartbeat timeout, reclaim, and resume-safe queue behavior",
      todo: {
        id: "todo-current-worker",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: null,
        lease_expires_at: null,
        reclaim_count: 0,
      },
      profile: {
        ...baseProfile,
        last_seen_at: "2026-05-01T01:21:00.000Z",
        next_checkin_at: "2026-05-01T01:30:00.000Z",
      },
      latestHandoffReceiptId: "handoff-latest-10",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(plan).toMatchObject({
      mode: "dry_run",
      action: "skip_no_action",
      safety: {
        allowed: false,
        reason: "no_stale_worker_or_reclaimable_lease",
      },
      signal: null,
      owner_age_minutes: 0,
      proof: {
        next_safe_step: "skip workflow start and keep cron watcher as fallback",
      },
    });
  });

  it("turns a safe dry-run plan into a PASS proof signal insert", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "Worker self-healing: heartbeat timeout, reclaim, and resume-safe queue behavior",
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-11",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    const proof = planWorkerMovementWorkflowPilotProofSignal({
      apiKeyHash: "hash_123",
      plan,
      emittedAt: "2026-05-01T01:22:01.000Z",
    });

    expect(proof).toMatchObject({
      signal: {
        action: "worker_movement_workflow_pilot_pass",
        severity: "info",
        summary:
          "PASS: Vercel worker movement pilot start_dry_run; candidate todo-expired-lease; owner age 12m; decision expired_lease_reclaimable; reason safe_proof_only_candidate; next start Vercel Workflow in dry-run mode and post proof only",
        payload: {
          proof_status: "PASS",
          candidate_id: "todo-expired-lease",
          action: "start_dry_run",
          next_safe_step: "start Vercel Workflow in dry-run mode and post proof only",
          emitted_at: "2026-05-01T01:22:01.000Z",
        },
      },
      insert: {
        api_key_hash: "hash_123",
        tool: "fishbowl",
        action: "worker_movement_workflow_pilot_pass",
        severity: "info",
        deep_link: "/admin/jobs#todo-todo-expired-lease",
      },
    });
    expect(JSON.stringify(proof)).not.toContain("lease-secret");
  });

  it("turns a refused candidate into a BLOCKER proof signal insert", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "SECURITY: deactivate legacy plaintext api_keys_legacy rows after owner auth",
      todo: {
        id: "todo-security",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 0,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-12",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    const proof = planWorkerMovementWorkflowPilotProofSignal({
      apiKeyHash: "hash_123",
      plan,
      emittedAt: "2026-05-01T01:22:01.000Z",
      deepLink: "/admin/jobs#todo-security",
    });

    expect(proof).toMatchObject({
      signal: {
        action: "worker_movement_workflow_pilot_blocker",
        severity: "action_needed",
        payload: {
          proof_status: "BLOCKER",
          candidate_id: "todo-security",
          action: "post_refusal_proof",
          safety_reason: "owner_or_security_gated_job",
        },
      },
      insert: {
        api_key_hash: "hash_123",
        tool: "fishbowl",
        action: "worker_movement_workflow_pilot_blocker",
        severity: "action_needed",
        deep_link: "/admin/jobs#todo-security",
      },
    });
    expect(proof?.signal.summary).toContain("BLOCKER:");
    expect(JSON.stringify(proof)).not.toContain("lease-secret");
  });

  it("does not plan a proof signal without a tenant hash or emitted time", () => {
    const plan = planWorkerMovementWorkflowPilot({
      title: "Worker self-healing: heartbeat timeout, reclaim, and resume-safe queue behavior",
      todo: {
        id: "todo-expired-lease",
        status: "in_progress",
        assigned_to_agent_id: "worker-1",
        lease_token: "lease-secret",
        lease_expires_at: "2026-05-01T01:10:00.000Z",
        reclaim_count: 2,
      },
      profile: null,
      latestHandoffReceiptId: "handoff-latest-13",
      nowMs: Date.parse("2026-05-01T01:22:00.000Z"),
    });

    expect(
      planWorkerMovementWorkflowPilotProofSignal({
        apiKeyHash: "",
        plan,
        emittedAt: "2026-05-01T01:22:01.000Z",
      }),
    ).toBeNull();
    expect(
      planWorkerMovementWorkflowPilotProofSignal({
        apiKeyHash: "hash_123",
        plan,
        emittedAt: "",
      }),
    ).toBeNull();
  });
});

import { describe, expect, it } from "vitest";
import { buildOrchestratorContext } from "./lib/orchestrator-context";
import {
  normalizeBoardroomTerminology,
  polishBoardroomSignal,
} from "./lib/boardroom-signal-polish";

describe("Boardroom signal polish", () => {
  it("normalizes retired Boardroom source names in summaries", () => {
    const summary = normalizeBoardroomTerminology(
      "fishbowl stale fishbowl-message:abc and fishbowl-checkin:worker-1:2026-06-03",
    );

    expect(summary).toContain("boardroom stale boardroom-message:abc");
    expect(summary).toContain("boardroom-checkin:worker-1");
    expect(summary).not.toMatch(/fishbowl/i);
  });

  it("marks stale Boardroom dispatches as history noise", () => {
    const polish = polishBoardroomSignal({
      sourceKind: "dispatch",
      source: "fishbowl",
      status: "stale",
      summary: 'fishbowl stale fishbowl-message:abc {"kind":"message_handoff"}',
      tags: ["dispatch", "fishbowl", "stale"],
    });

    expect(polish).toMatchObject({
      isNoise: true,
      reason: "stale-boardroom-source",
    });
    expect(polish.summary).not.toMatch(/fishbowl/i);
    expect(polish.tags).toEqual(expect.arrayContaining(["boardroom", "noise:stale-source"]));
  });

  it("hides discontinued automation check names from live summaries", () => {
    const polish = polishBoardroomSignal({
      sourceKind: "signal",
      tool: "Cursor Bugbot",
      action: "review_failed",
      severity: "critical",
      summary: "Cursor Bugbot found an issue",
      tags: ["signal", "Cursor Bugbot", "critical"],
    });

    expect(polish).toMatchObject({
      isNoise: true,
      reason: "retired-automation-check",
      summary: "Discontinued automation check ignored as non-operational noise.",
    });
    expect(JSON.stringify(polish)).not.toMatch(/bugbot/i);
  });

  it("keeps real action-needed signals visible", () => {
    const polish = polishBoardroomSignal({
      sourceKind: "signal",
      tool: "github_action",
      action: "deploy_failed",
      severity: "critical",
      summary: "Vercel deploy failed on production build",
      tags: ["signal", "github_action", "critical"],
    });

    expect(polish.isNoise).toBe(false);
    expect(polish.summary).toContain("Vercel deploy failed");
    expect(polish.tags).not.toContain("noise:stale-source");
  });

  it("does not emit em dashes in polished text", () => {
    const outputs = [
      normalizeBoardroomTerminology("Fishbowl handoff"),
      polishBoardroomSignal({
        sourceKind: "signal",
        tool: "Cursor Bugbot",
        action: "review_failed",
        severity: "critical",
        summary: "Cursor Bugbot found an issue",
      }).summary,
    ];

    expect(outputs.join(" ")).not.toContain("—");
  });

  it("prevents stale source and discontinued check noise from becoming active blockers", () => {
    const context = buildOrchestratorContext({
      generatedAt: "2026-06-04T03:50:00.000Z",
      profiles: [
        {
          agent_id: "worker-live",
          display_name: "Worker Live",
          user_agent_hint: "codex-desktop",
          last_seen_at: "2026-06-04T03:45:00.000Z",
        },
      ],
      messages: [],
      todos: [
        {
          id: "todo-active",
          title: "Current active work",
          description: "Fresh owned work should stay visible.",
          status: "in_progress",
          priority: "urgent",
          created_by_agent_id: "router",
          assigned_to_agent_id: "worker-live",
          created_at: "2026-06-04T03:00:00.000Z",
          updated_at: "2026-06-04T03:40:00.000Z",
        },
      ],
      comments: [],
      dispatches: [
        {
          dispatch_id: "dispatch-old-message",
          source: "fishbowl",
          target_agent_id: "worker-old",
          task_ref: null,
          status: "stale",
          payload: {
            kind: "message_handoff",
            source_ref: "fishbowl-message:abc",
            tags: ["blocker", "fyi"],
          },
          created_at: "2026-06-03T19:30:01.000Z",
          updated_at: "2026-06-03T19:30:01.000Z",
        },
        {
          dispatch_id: "dispatch-old-checkin",
          source: "wakepass",
          target_agent_id: "worker-old",
          task_ref: null,
          status: "stale",
          payload: {
            source_ref: "fishbowl-checkin:worker-old:2026-06-03T03:04:50.834+00:00",
          },
          created_at: "2026-06-03T03:30:39.000Z",
          updated_at: "2026-06-03T03:30:39.000Z",
        },
      ],
      signals: [
        {
          id: "signal-retired-check",
          tool: "Cursor Bugbot",
          action: "review_failed",
          severity: "critical",
          summary: "Cursor Bugbot review failed",
          created_at: "2026-06-04T03:35:00.000Z",
        },
      ],
      sessions: [],
      library: [],
      businessContext: [],
      conversationTurns: [],
    });

    expect(context.current_state_card.blocker_count).toBe(0);
    expect(context.current_state_card.blockers).toHaveLength(0);
    expect(context.rolling_snapshot.active_blockers).toHaveLength(0);
    expect(context.seat_handshake.active_blocker).toBeNull();

    const publicContext = JSON.stringify({
      state: context.current_state_card,
      continuity: context.continuity_events,
      rolling: context.rolling_snapshot,
      handshake: context.seat_handshake,
    });
    expect(publicContext).not.toMatch(/fishbowl/i);
    expect(publicContext).not.toMatch(/bugbot/i);
  });
});

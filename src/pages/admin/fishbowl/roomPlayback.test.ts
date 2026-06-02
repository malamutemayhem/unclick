import { describe, expect, it } from "vitest";
import { buildRoomPlaybackSummary, type PlaybackMessage } from "./roomPlayback";

let clock = 0;
const m = (
  over: Partial<PlaybackMessage> & Pick<PlaybackMessage, "id">,
): PlaybackMessage => ({
  author_agent_id: "worker-1",
  author_name: "Worker 1",
  text: "a message",
  tags: null,
  // Each call advances the clock so insertion order != chronological order.
  created_at: new Date(2026, 0, 1, 0, 0, clock++).toISOString(),
  ...over,
});

describe("room playback summary", () => {
  it("buckets posts by their action tags", () => {
    const messages = [
      m({ id: "d1", tags: ["decision"], text: "locked the router" }),
      m({ id: "b1", tags: ["blocker"], text: "401s on memory-admin" }),
      m({ id: "n1", tags: ["needs-doing"] }),
      m({ id: "h1", tags: ["handoff"] }),
      m({ id: "x1", tags: ["done"] }),
      m({ id: "f1", tags: ["fyi"] }),
    ];
    const s = buildRoomPlaybackSummary(messages);
    expect(s.decisions.map((h) => h.id)).toEqual(["d1"]);
    expect(s.blockers.map((h) => h.id)).toEqual(["b1"]);
    expect(s.needsDoing.map((h) => h.id).sort()).toEqual(["h1", "n1"]);
    expect(s.done.map((h) => h.id)).toEqual(["x1"]);
    expect(s.total).toBe(6);
  });

  it("orders highlights newest first and truncates long snippets", () => {
    const long = "x".repeat(200);
    const messages = [
      m({ id: "old", tags: ["decision"], text: "old decision" }),
      m({ id: "new", tags: ["decision"], text: long }),
    ];
    const s = buildRoomPlaybackSummary(messages);
    expect(s.decisions[0].id).toBe("new");
    expect(s.decisions[0].snippet.endsWith("…")).toBe(true);
    expect(s.decisions[0].snippet.length).toBeLessThanOrEqual(140);
  });

  it("counts active agents and skips platform/system posts", () => {
    const messages = [
      m({ id: "a1", author_agent_id: "worker-9", author_name: "Worker 9", tags: ["fyi"] }),
      m({ id: "a2", author_agent_id: "worker-9", author_name: "Worker 9", tags: ["pr"] }),
      m({ id: "a3", author_agent_id: "worker-2", author_name: "Worker 2", tags: ["fyi"] }),
      // system: null author_name -> excluded from active agents
      m({ id: "sys", author_agent_id: "bot", author_name: null, tags: ["event"] }),
    ];
    const s = buildRoomPlaybackSummary(messages);
    expect(s.activeAgents).toEqual([
      { agentId: "worker-9", name: "Worker 9", count: 2 },
      { agentId: "worker-2", name: "Worker 2", count: 1 },
    ]);
  });

  it("picks the next useful click: newest blocker first, else needs-doing", () => {
    const withBlocker = buildRoomPlaybackSummary([
      m({ id: "n", tags: ["needs-doing"] }),
      m({ id: "b", tags: ["blocker"], text: "stuck" }),
    ]);
    expect(withBlocker.nextUsefulClick?.id).toBe("b");

    const noBlocker = buildRoomPlaybackSummary([
      m({ id: "f", tags: ["fyi"] }),
      m({ id: "n", tags: ["needs-doing"] }),
    ]);
    expect(noBlocker.nextUsefulClick?.id).toBe("n");

    const quiet = buildRoomPlaybackSummary([m({ id: "f", tags: ["fyi"] })]);
    expect(quiet.nextUsefulClick).toBeNull();
  });

  it("de-dupes by id and respects per-bucket and agent caps", () => {
    const decisions = Array.from({ length: 8 }, (_, i) =>
      m({ id: `d${i}`, tags: ["decision"] }),
    );
    const dupes = [decisions[0], decisions[0]]; // same id twice
    const s = buildRoomPlaybackSummary([...decisions, ...dupes], { maxPerBucket: 5 });
    expect(s.decisions).toHaveLength(5);
    expect(s.total).toBe(8); // dupes collapsed
  });

  it("flags a full window as partial history", () => {
    const messages = Array.from({ length: 10 }, (_, i) => m({ id: `w${i}` }));
    expect(buildRoomPlaybackSummary(messages, { windowSize: 10 }).windowed).toBe(true);
    expect(buildRoomPlaybackSummary(messages, { windowSize: 20 }).windowed).toBe(false);
  });

  it("handles an empty room", () => {
    const s = buildRoomPlaybackSummary([]);
    expect(s.total).toBe(0);
    expect(s.activeAgents).toEqual([]);
    expect(s.nextUsefulClick).toBeNull();
    expect(s.windowed).toBe(false);
  });
});

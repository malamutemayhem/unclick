import { describe, expect, it } from "vitest";

import {
  type BoardroomReadBounds,
  compactBoardroomReadForStrictClients,
} from "./lib/boardroom-read-bounds";

const message = (
  id: string,
  overrides: Partial<{ text: string; created_at: string; tags: string[]; recipients: string[] }> = {},
) => ({
  id,
  author_agent_id: `seat-${id}`,
  author_emoji: "🤖",
  author_name: null,
  recipients: overrides.recipients ?? ["all"],
  tags: overrides.tags ?? [],
  thread_id: null,
  created_at: overrides.created_at ?? `2026-06-02T00:00:${id.padStart(2, "0")}.000Z`,
  text: overrides.text ?? `body-${id}`,
  // Field strict clients should not need; bounder must not pass it through.
  user_agent_hint: "unclick-mcp-server/very-long-client-string",
});

const agent = (id: string, lastSeen: string) => ({
  agent_id: id,
  emoji: "🛰️",
  display_name: `Agent ${id}`,
  user_agent_hint: "codex-desktop/gpt-5",
  created_at: "2026-05-01T00:00:00.000Z",
  last_seen_at: lastSeen,
  current_status: null,
  current_status_updated_at: null,
  next_checkin_at: null,
});

const bounds = (result: unknown): BoardroomReadBounds =>
  (result as { _bounds: BoardroomReadBounds })._bounds;

describe("Boardroom strict-client read bounds", () => {
  it("caps the feed to the most recent messages in ascending time order", () => {
    const raw = {
      messages: Array.from({ length: 50 }, (_, i) =>
        message(String(i + 1), { created_at: `2026-06-02T00:${String(i).padStart(2, "0")}:00.000Z` }),
      ),
      mentions: [],
    };

    const result = compactBoardroomReadForStrictClients(raw, { maxMessages: 5 }) as {
      messages: Array<{ id: string }>;
    };

    expect(result.messages.map((m) => m.id)).toEqual(["46", "47", "48", "49", "50"]);
    expect(bounds(result)).toMatchObject({
      compact: true,
      messages_returned: 5,
      messages_available: 50,
    });
  });

  it("truncates long message bodies and flags it", () => {
    const raw = {
      messages: [message("1", { text: "x".repeat(5000) })],
      mentions: [],
    };

    const result = compactBoardroomReadForStrictClients(raw, { maxTextChars: 100 }) as {
      messages: Array<{ text: string }>;
    };

    expect(result.messages[0].text.length).toBe(100);
    expect(result.messages[0].text.endsWith("...")).toBe(true);
    expect(bounds(result).text_truncated).toBe(true);
  });

  it("preserves the mentions lane even when the feed is heavily trimmed", () => {
    // The strict-client failure mode is dropping a message addressed to the
    // caller because the feed overflowed. Mentions must survive that.
    const raw = {
      messages: Array.from({ length: 200 }, (_, i) => message(`feed-${i}`)),
      mentions: [
        message("mention-1", { text: "ACK needed from you", recipients: ["🧪"] }),
        message("mention-2", { text: "blocker for worker 14", recipients: ["🧪"] }),
      ],
    };

    const result = compactBoardroomReadForStrictClients(raw, { maxMessages: 10 }) as {
      mentions: Array<{ id: string }>;
    };

    expect(result.mentions.map((m) => m.id)).toEqual(["mention-1", "mention-2"]);
    expect(bounds(result)).toMatchObject({ mentions_returned: 2, mentions_available: 2 });
  });

  it("shapes the agent roster to essential fields and caps it by last_seen", () => {
    const raw = {
      messages: [],
      mentions: [],
      agents: [
        agent("old", "2026-05-01T00:00:00.000Z"),
        agent("newest", "2026-06-02T00:00:00.000Z"),
        agent("mid", "2026-05-20T00:00:00.000Z"),
      ],
    };

    const result = compactBoardroomReadForStrictClients(raw, { maxAgents: 2 }) as {
      agents: Array<Record<string, unknown>>;
    };

    expect(result.agents.map((a) => a.agent_id)).toEqual(["newest", "mid"]);
    // Verbose transport fields must be dropped.
    expect(result.agents[0]).not.toHaveProperty("user_agent_hint");
    expect(result.agents[0]).toMatchObject({ agent_id: "newest", display_name: "Agent newest" });
    expect(bounds(result)).toMatchObject({ agents_returned: 2, agents_available: 3 });
  });

  it("drops the verbose transport field from shaped messages", () => {
    const result = compactBoardroomReadForStrictClients({
      messages: [message("1")],
      mentions: [],
    }) as { messages: Array<Record<string, unknown>> };

    expect(result.messages[0]).not.toHaveProperty("user_agent_hint");
    expect(result.messages[0]).toMatchObject({ id: "1", author_agent_id: "seat-1" });
  });

  it("shrinks a large room well under the strict-client ceiling", () => {
    // Mirror the live failure: a busy room serialized to ~100KB and overflowed.
    const raw = {
      messages: Array.from({ length: 300 }, (_, i) => message(`m-${i}`, { text: "y".repeat(2000) })),
      mentions: [],
      agents: Array.from({ length: 80 }, (_, i) => agent(`a-${i}`, "2026-06-01T00:00:00.000Z")),
    };

    const rawSize = JSON.stringify(raw).length;
    const result = compactBoardroomReadForStrictClients(raw);
    const boundedSize = JSON.stringify(result).length;

    expect(rawSize).toBeGreaterThan(100_000);
    expect(boundedSize).toBeLessThan(25_000);
  });

  it("reports a next_steps paging hint only when the feed was trimmed", () => {
    const trimmed = compactBoardroomReadForStrictClients({
      messages: Array.from({ length: 30 }, (_, i) => message(`m-${i}`)),
      mentions: [],
    });
    expect(bounds(trimmed).next_steps).toMatch(/Re-read with `since`/);

    const whole = compactBoardroomReadForStrictClients({
      messages: [message("1")],
      mentions: [],
    });
    expect(bounds(whole).next_steps).toMatch(/within strict-client bounds/);
  });

  it("passes non-object payloads through untouched", () => {
    expect(compactBoardroomReadForStrictClients(null)).toBeNull();
    expect(compactBoardroomReadForStrictClients("not json")).toBe("not json");
    expect(compactBoardroomReadForStrictClients([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("tolerates a missing mentions/agents lane without inventing one", () => {
    const result = compactBoardroomReadForStrictClients({ messages: [message("1")] }) as Record<
      string,
      unknown
    >;
    expect(result).toHaveProperty("mentions");
    expect(result.mentions).toEqual(expect.any(Array));
    // agents was absent in the input, so it must stay absent.
    expect(result).not.toHaveProperty("agents");
  });
});

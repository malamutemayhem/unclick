import { describe, expect, it } from "vitest";
import type { UIMessage } from "ai";
import {
  councilReceiptFromMetadata,
  isThreadUnread,
  mergeThreadRows,
  nextCursor,
  rowToUiMessage,
  streamEndedSilently,
  type ThreadMessageRow,
} from "./chatSync";

function ui(id: string, role: "user" | "assistant", text: string): UIMessage {
  return { id, role, parts: [{ type: "text", text }] } as UIMessage;
}

function row(
  id: string,
  senderKind: string,
  content: string,
  createdAt?: string,
): ThreadMessageRow {
  return {
    id,
    sender_id: senderKind === "human" ? "you" : "openrouter",
    sender_kind: senderKind,
    model: senderKind === "human" ? null : "openai/gpt-4o-mini",
    content,
    created_at: createdAt ?? "2026-07-01T00:00:00Z",
  };
}

describe("rowToUiMessage", () => {
  it("maps human rows to user turns and agent rows to assistant turns", () => {
    expect(rowToUiMessage(row("a", "human", "hi")).role).toBe("user");
    expect(rowToUiMessage(row("b", "agent", "hello")).role).toBe("assistant");
    expect(rowToUiMessage(row("c", "system", "note")).role).toBe("assistant");
  });
});

describe("nextCursor", () => {
  it("returns the newest created_at across rows", () => {
    const rows = [
      row("a", "human", "1", "2026-07-01T00:00:01Z"),
      row("b", "human", "2", "2026-07-01T00:00:05Z"),
      row("c", "human", "3", "2026-07-01T00:00:03Z"),
    ];
    expect(nextCursor(rows, null)).toBe("2026-07-01T00:00:05Z");
  });

  it("keeps the previous cursor when rows are older or unparsable", () => {
    const prev = "2026-07-01T00:00:10Z";
    expect(nextCursor([row("a", "human", "1", "2026-07-01T00:00:05Z")], prev)).toBe(prev);
    expect(nextCursor([{ ...row("b", "human", "2"), created_at: "not-a-date" }], prev)).toBe(prev);
    expect(nextCursor([], prev)).toBe(prev);
    expect(nextCursor([], null)).toBeNull();
  });
});

describe("mergeThreadRows", () => {
  it("appends genuinely new rows in order", () => {
    const existing = [ui("m1", "user", "hello room")];
    const { messages, added } = mergeThreadRows(existing, [
      row("db-2", "human", "hi from the other member"),
      row("db-3", "agent", "assistant reply"),
    ]);
    expect(added).toHaveLength(2);
    expect(messages).toHaveLength(3);
    expect(messages[1].role).toBe("user");
    expect(messages[2].role).toBe("assistant");
  });

  it("skips rows whose id is already shown", () => {
    const existing = [ui("db-2", "user", "same row")];
    const { messages, added } = mergeThreadRows(existing, [
      row("db-2", "human", "same row"),
    ]);
    expect(added).toHaveLength(0);
    expect(messages).toBe(existing);
  });

  it("skips rows that duplicate an optimistic local turn with a different id", () => {
    // The local send shows the user turn with a client id; the DB poll
    // returns the same content under the row's UUID. Must not double up.
    const existing = [ui("local-1", "user", "hello room")];
    const { messages, added } = mergeThreadRows(existing, [
      row("db-9", "human", "hello room"),
      row("db-10", "human", "a genuinely new turn"),
    ]);
    expect(added).toHaveLength(1);
    expect(added[0].id).toBe("db-10");
    expect(messages).toHaveLength(2);
  });

  it("skips the streamed assistant turn when it comes back from persistence", () => {
    const existing = [
      ui("local-1", "user", "question"),
      ui("stream-1", "assistant", "streamed answer"),
    ];
    const { added } = mergeThreadRows(existing, [
      row("db-11", "agent", "streamed answer"),
    ]);
    expect(added).toHaveLength(0);
  });

  it("returns the same array reference when nothing changed", () => {
    const existing = [ui("m1", "user", "hello")];
    expect(mergeThreadRows(existing, []).messages).toBe(existing);
  });
});

describe("isThreadUnread", () => {
  const base = {
    id: "t1",
    shared: true,
    updated_at: "2026-07-01T00:10:00Z",
  };

  it("is unread when a shared room changed after the read cursor", () => {
    expect(
      isThreadUnread(
        { ...base, my_last_read_at: "2026-07-01T00:05:00Z" },
        null,
      ),
    ).toBe(true);
  });

  it("is read when the cursor is newer than the last change", () => {
    expect(
      isThreadUnread(
        { ...base, my_last_read_at: "2026-07-01T00:15:00Z" },
        null,
      ),
    ).toBe(false);
  });

  it("treats a never-read shared room as unread", () => {
    expect(isThreadUnread({ ...base, my_last_read_at: null }, null)).toBe(true);
  });

  it("never marks the open thread or a solo thread unread", () => {
    expect(
      isThreadUnread({ ...base, my_last_read_at: null }, "t1"),
    ).toBe(false);
    expect(
      isThreadUnread(
        { ...base, shared: false, my_last_read_at: null },
        null,
      ),
    ).toBe(false);
  });
});

describe("councilReceiptFromMetadata", () => {
  it("parses a persisted council receipt", () => {
    const receipt = councilReceiptFromMetadata({
      council: [
        {
          label: "Claude",
          handle: "Claude",
          slug: "anthropic",
          model: "claude-haiku",
          status: "answered",
          ms: 1200,
          error: null,
          brief: "short brief",
        },
        {
          label: "GPT",
          handle: "GPT",
          slug: "openrouter",
          model: "openai/gpt-4o-mini",
          status: "skipped",
          ms: 5,
          error: "OpenRouter key is not connected",
          brief: null,
        },
      ],
    });
    expect(receipt).toHaveLength(2);
    expect(receipt[0]).toMatchObject({ status: "answered", ms: 1200 });
    expect(receipt[1]).toMatchObject({ status: "skipped" });
  });

  it("returns [] for missing or malformed metadata", () => {
    expect(councilReceiptFromMetadata(null)).toEqual([]);
    expect(councilReceiptFromMetadata({})).toEqual([]);
    expect(councilReceiptFromMetadata({ council: "nope" })).toEqual([]);
    expect(
      councilReceiptFromMetadata({ council: [{ status: "weird" }] }),
    ).toEqual([]);
  });
});

describe("streamEndedSilently", () => {
  it("flags an assistant turn that ended with no text", () => {
    const messages = [
      ui("m1", "user", "question"),
      ui("m2", "assistant", ""),
    ];
    expect(streamEndedSilently(messages, false)).toBe(true);
  });

  it("flags a stream that never produced an assistant turn", () => {
    expect(streamEndedSilently([ui("m1", "user", "question")], false)).toBe(
      true,
    );
  });

  it("stays quiet for a normal answer, an error, or an empty canvas", () => {
    expect(
      streamEndedSilently(
        [ui("m1", "user", "q"), ui("m2", "assistant", "answer")],
        false,
      ),
    ).toBe(false);
    expect(
      streamEndedSilently([ui("m1", "user", "q"), ui("m2", "assistant", "")], true),
    ).toBe(false);
    expect(streamEndedSilently([], false)).toBe(false);
  });
});

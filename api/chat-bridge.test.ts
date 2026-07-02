import { describe, it, expect } from "vitest";
import {
  BRIDGE_ONLINE_WINDOW_MS,
  composeBridgeSystem,
  isBridgeOnline,
  isBridgeRuntime,
  renderBridgePrompt,
  validateEnqueueRequest,
  type BridgeTranscriptMessage,
} from "./chat-bridge";

describe("isBridgeRuntime", () => {
  it("accepts only the two official subscription CLIs", () => {
    expect(isBridgeRuntime("claude-code")).toBe(true);
    expect(isBridgeRuntime("codex-cli")).toBe(true);
    expect(isBridgeRuntime("chatgpt-web")).toBe(false);
    expect(isBridgeRuntime("claude")).toBe(false);
    expect(isBridgeRuntime(undefined)).toBe(false);
  });
});

describe("validateEnqueueRequest", () => {
  const base = {
    seat_handle: "claude-sub",
    runtime: "claude-code",
    messages: [{ role: "user", content: "hello" }],
  };

  it("accepts a minimal valid request", () => {
    const parsed = validateEnqueueRequest(base);
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) {
      expect(parsed.seat_handle).toBe("claude-sub");
      expect(parsed.runtime).toBe("claude-code");
      expect(parsed.messages).toHaveLength(1);
      expect(parsed.thread_id).toBeUndefined();
    }
  });

  it("rejects bad handles, runtimes, and empty messages", () => {
    expect(validateEnqueueRequest({ ...base, seat_handle: "Bad Handle!" })).toHaveProperty("error");
    expect(validateEnqueueRequest({ ...base, seat_handle: "" })).toHaveProperty("error");
    expect(validateEnqueueRequest({ ...base, runtime: "chatgpt-web" })).toHaveProperty("error");
    expect(validateEnqueueRequest({ ...base, messages: [] })).toHaveProperty("error");
    expect(
      validateEnqueueRequest({ ...base, messages: [{ role: "user", content: "  " }] }),
    ).toHaveProperty("error");
  });

  it("drops malformed turns but keeps usable ones", () => {
    const parsed = validateEnqueueRequest({
      ...base,
      messages: [
        { role: "wizard", content: "nope" },
        { role: "assistant", content: "prior answer", author: "GLM seat" },
        { role: "user", content: "the real question" },
      ],
    });
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) {
      expect(parsed.messages).toHaveLength(2);
      expect(parsed.messages[0].author).toBe("GLM seat");
    }
  });

  it("keeps only the newest turns past the window and caps content length", () => {
    const many = Array.from({ length: 60 }, (_, i) => ({
      role: "user" as const,
      content: `turn ${i} ${"x".repeat(9000)}`,
    }));
    const parsed = validateEnqueueRequest({ ...base, messages: many });
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) {
      expect(parsed.messages.length).toBe(40);
      expect(parsed.messages[0].content.startsWith("turn 20 ")).toBe(true);
      expect(parsed.messages[0].content.length).toBeLessThanOrEqual(8000);
    }
  });

  it("carries a thread_id through when present", () => {
    const parsed = validateEnqueueRequest({ ...base, thread_id: " abc-123 " });
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) expect(parsed.thread_id).toBe("abc-123");
  });
});

describe("renderBridgePrompt", () => {
  it("labels humans, seats, and system notes", () => {
    const messages: BridgeTranscriptMessage[] = [
      { role: "system", content: "room note" },
      { role: "assistant", content: "earlier answer", author: "gpt-seat" },
      { role: "user", content: "what next?" },
    ];
    const prompt = renderBridgePrompt(messages);
    expect(prompt).toContain("System note:\nroom note");
    expect(prompt).toContain("Seat (gpt-seat):\nearlier answer");
    expect(prompt).toContain("Human:\nwhat next?");
    expect(prompt).toContain("--- transcript ---");
  });

  it("keeps the transcript tail when the total cap trims", () => {
    const messages: BridgeTranscriptMessage[] = [
      { role: "user", content: `OLD ${"a".repeat(30000)}` },
      { role: "user", content: "NEWEST QUESTION" },
    ];
    const prompt = renderBridgePrompt(messages);
    expect(prompt).toContain("NEWEST QUESTION");
    expect(prompt).not.toContain("OLD aaaa");
  });
});

describe("composeBridgeSystem", () => {
  it("names the runtime and seat handle honestly", () => {
    const sys = composeBridgeSystem({
      runtime: "claude-code",
      seatHandle: "claude-sub",
      memoryBlock: "",
    });
    expect(sys).toContain('@claude-sub');
    expect(sys).toContain("Claude Code CLI");
    expect(sys).toContain("Claude subscription");
    expect(sys).not.toContain("UnClick memory:");
  });

  it("appends the memory block when present", () => {
    const sys = composeBridgeSystem({
      runtime: "codex-cli",
      seatHandle: "gpt-sub",
      memoryBlock: "## Standing rules\n- be terse",
    });
    expect(sys).toContain("Codex CLI");
    expect(sys).toContain("ChatGPT subscription");
    expect(sys).toContain("## Standing rules");
  });
});

describe("isBridgeOnline", () => {
  const now = Date.parse("2026-07-02T12:00:00.000Z");

  it("is online within the heartbeat window", () => {
    const recent = new Date(now - BRIDGE_ONLINE_WINDOW_MS + 5_000).toISOString();
    expect(isBridgeOnline(recent, now)).toBe(true);
  });

  it("is offline past the window, when never seen, or on junk input", () => {
    const stale = new Date(now - BRIDGE_ONLINE_WINDOW_MS - 5_000).toISOString();
    expect(isBridgeOnline(stale, now)).toBe(false);
    expect(isBridgeOnline(null, now)).toBe(false);
    expect(isBridgeOnline(undefined, now)).toBe(false);
    expect(isBridgeOnline("not-a-date", now)).toBe(false);
  });
});

import { describe, it, expect } from "vitest";
import {
  BRIDGE_ONLINE_WINDOW_MS,
  composeBridgeSystem,
  isBridgeOnline,
  isBridgeRuntime,
  renderBridgePrompt,
  validateBridgeImages,
  validateEnqueueRequest,
  type BridgeTranscriptMessage,
} from "./chat-bridge";

describe("isBridgeRuntime", () => {
  it("accepts only official subscription CLI runtimes from the registry", () => {
    expect(isBridgeRuntime("claude-code")).toBe(true);
    expect(isBridgeRuntime("codex-cli")).toBe(true);
    expect(isBridgeRuntime("gemini-cli")).toBe(true);
    expect(isBridgeRuntime("copilot-cli")).toBe(true);
    expect(isBridgeRuntime("cursor-cli")).toBe(true);
    expect(isBridgeRuntime("chatgpt-web")).toBe(false);
    expect(isBridgeRuntime("claude")).toBe(false);
    expect(isBridgeRuntime(undefined)).toBe(false);
  });
});

describe("validateBridgeImages", () => {
  const png = (chars: number) => `data:image/png;base64,${"A".repeat(chars)}`;

  it("accepts valid image data URLs and strips them to stored shape", () => {
    const out = validateBridgeImages([
      { name: "shot 1.png", data_url: png(400) },
      { data_url: "data:image/jpeg;base64,QUJD" },
    ]);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({ name: "shot_1.png", media_type: "image/png" });
    expect(out[0].data).toBe("A".repeat(400));
    expect(out[1].media_type).toBe("image/jpeg");
    expect(out[1].name).toBe("image-2.jpeg");
  });

  it("drops non-image, malformed, oversized, and overflow items", () => {
    expect(validateBridgeImages(undefined)).toEqual([]);
    expect(
      validateBridgeImages([
        { data_url: "data:text/html;base64,QUJD" },
        { data_url: "https://example.com/x.png" },
        { data_url: `data:image/png;base64,${"A".repeat(1_200_001)}` },
        { data_url: "data:image/png;base64," },
      ]),
    ).toEqual([]);
    // 4th image drops (max 3)
    expect(
      validateBridgeImages(Array.from({ length: 4 }, () => ({ data_url: png(10) }))),
    ).toHaveLength(3);
    // total cap: the third one would push past 3M chars, so it drops
    expect(
      validateBridgeImages([
        { data_url: png(1_200_000) },
        { data_url: png(1_200_000) },
        { data_url: png(1_200_000) },
      ]),
    ).toHaveLength(2);
  });
});

describe("validateEnqueueRequest", () => {
  const base = {
    seat_handle: "claude-sub",
    runtime: "claude-code",
    messages: [{ role: "user", content: "hello" }],
  };

  it("accepts a minimal valid request (read mode, no images by default)", () => {
    const parsed = validateEnqueueRequest(base);
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) {
      expect(parsed.seat_handle).toBe("claude-sub");
      expect(parsed.runtime).toBe("claude-code");
      expect(parsed.tool_mode).toBe("read");
      expect(parsed.attachments).toEqual([]);
      expect(parsed.messages).toHaveLength(1);
      expect(parsed.thread_id).toBeUndefined();
    }
  });

  it("carries build mode and images through", () => {
    const parsed = validateEnqueueRequest({
      ...base,
      tool_mode: "build",
      images: [{ name: "a.png", data_url: "data:image/png;base64,QUJD" }],
    });
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) {
      expect(parsed.tool_mode).toBe("build");
      expect(parsed.attachments).toHaveLength(1);
    }
  });

  it("defaults unknown tool_mode to read", () => {
    const parsed = validateEnqueueRequest({ ...base, tool_mode: "yolo" });
    expect("error" in parsed).toBe(false);
    if (!("error" in parsed)) expect(parsed.tool_mode).toBe("read");
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
      toolMode: "read",
    });
    expect(sys).toContain('@claude-sub');
    expect(sys).toContain("Claude Code CLI");
    expect(sys).toContain("Claude subscription");
    expect(sys).not.toContain("UnClick memory:");
  });

  it("states the tool policy for full-tier runtimes by mode", () => {
    const readSys = composeBridgeSystem({
      runtime: "codex-cli",
      seatHandle: "gpt-sub",
      memoryBlock: "## Standing rules\n- be terse",
      toolMode: "read",
    });
    expect(readSys).toContain("Codex CLI");
    expect(readSys).toContain("Read-first mode is active");
    expect(readSys).toContain("## Standing rules");

    const buildSys = composeBridgeSystem({
      runtime: "claude-code",
      seatHandle: "claude-sub",
      memoryBlock: "",
      toolMode: "build",
    });
    expect(buildSys).toContain("Build mode is active");
    expect(buildSys).toContain("gmail_search");
  });

  it("tells basic-tier runtimes they have no tools attached", () => {
    const sys = composeBridgeSystem({
      runtime: "gemini-cli",
      seatHandle: "gemini-sub",
      memoryBlock: "",
      toolMode: "build",
    });
    expect(sys).toContain("Gemini CLI");
    expect(sys).toContain("No UnClick tools are attached");
    expect(sys).not.toContain("Build mode is active");
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

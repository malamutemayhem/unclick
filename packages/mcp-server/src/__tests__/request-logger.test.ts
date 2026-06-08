import { describe, it, expect, vi, beforeEach } from "vitest";
import { logToolCall, setLogSink, LogBuffer } from "../request-logger.js";
import type { RequestLogEntry } from "../request-logger.js";

describe("logToolCall", () => {
  let captured: RequestLogEntry[];

  beforeEach(() => {
    captured = [];
    setLogSink((entry) => captured.push(entry));
  });

  it("logs a successful tool call", async () => {
    await logToolCall("test_tool", { name: "hello" }, async () => ({ result: "ok" }));
    expect(captured).toHaveLength(1);
    expect(captured[0].tool).toBe("test_tool");
    expect(captured[0].status).toBe("success");
    expect(captured[0].durationMs).toBeGreaterThanOrEqual(0);
    expect(captured[0].correlationId).toBeTruthy();
  });

  it("logs a failed tool call", async () => {
    await expect(
      logToolCall("bad_tool", { x: 1 }, async () => { throw new Error("boom"); }),
    ).rejects.toThrow("boom");
    expect(captured).toHaveLength(1);
    expect(captured[0].status).toBe("error");
    expect(captured[0].error).toBe("boom");
  });

  it("masks secrets in args", async () => {
    await logToolCall("tool", { api_key: "sk_secret_123" }, async () => ({}));
    expect(captured[0].args!.api_key).toContain("...");
    expect(captured[0].args!.api_key).not.toBe("sk_secret_123");
  });

  it("redacts URLs in log entries", async () => {
    await logToolCall("tool", undefined, async () => ({
      url: "https://api.example.com?token=secret123",
    }));
    expect(captured[0].url).toContain("token=***");
  });

  it("records httpStatus when provided", async () => {
    await logToolCall("tool", undefined, async () => ({ httpStatus: 200 }));
    expect(captured[0].httpStatus).toBe(200);
  });

  it("generates unique correlation IDs", async () => {
    await logToolCall("a", undefined, async () => ({}));
    await logToolCall("b", undefined, async () => ({}));
    expect(captured[0].correlationId).not.toBe(captured[1].correlationId);
  });
});

describe("LogBuffer", () => {
  it("flushes when maxSize is reached", () => {
    const flushed: RequestLogEntry[][] = [];
    const buffer = new LogBuffer(3, (entries) => flushed.push(entries));

    const entry: RequestLogEntry = {
      correlationId: "test",
      tool: "t",
      timestamp: new Date().toISOString(),
      durationMs: 0,
      status: "success",
    };

    buffer.add(entry);
    buffer.add(entry);
    expect(flushed).toHaveLength(0);
    buffer.add(entry);
    expect(flushed).toHaveLength(1);
    expect(flushed[0]).toHaveLength(3);
  });

  it("manual flush works", () => {
    const flushed: RequestLogEntry[][] = [];
    const buffer = new LogBuffer(100, (entries) => flushed.push(entries));

    buffer.add({
      correlationId: "x",
      tool: "t",
      timestamp: "",
      durationMs: 0,
      status: "success",
    });

    expect(buffer.size).toBe(1);
    buffer.flush();
    expect(flushed).toHaveLength(1);
    expect(buffer.size).toBe(0);
  });

  it("flush is a no-op when empty", () => {
    const flushed: RequestLogEntry[][] = [];
    const buffer = new LogBuffer(10, (entries) => flushed.push(entries));
    buffer.flush();
    expect(flushed).toHaveLength(0);
  });
});

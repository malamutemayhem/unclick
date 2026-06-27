import { describe, it, expect } from "vitest";
import { compress, estimateTokenCount, trimToTokenBudget } from "../conversation-compressor.js";

describe("compress", () => {
  it("returns unchanged if under limit", () => {
    const msgs = [
      { role: "user" as const, content: "hi" },
      { role: "assistant" as const, content: "hello" },
    ];
    const result = compress(msgs, 10);
    expect(result.compressedCount).toBe(2);
    expect(result.compressionRatio).toBe(1);
  });

  it("compresses long conversations", () => {
    const msgs = Array.from({ length: 20 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
      content: `Message ${i}`,
    }));
    const result = compress(msgs, 5);
    expect(result.compressedCount).toBeLessThan(20);
    expect(result.messages.some((m) => m.content.includes("[Conversation summary"))).toBe(true);
  });

  it("keeps system messages", () => {
    const msgs = [
      { role: "system" as const, content: "You are helpful" },
      { role: "user" as const, content: "a" },
      { role: "assistant" as const, content: "b" },
      { role: "user" as const, content: "c" },
      { role: "assistant" as const, content: "d" },
      { role: "user" as const, content: "e" },
    ];
    const result = compress(msgs, 3);
    expect(result.messages.some((m) => m.content === "You are helpful")).toBe(true);
  });

  it("uses custom summarizer", () => {
    const msgs = Array.from({ length: 10 }, (_, i) => ({
      role: "user" as const,
      content: `msg ${i}`,
    }));
    const result = compress(msgs, 3, { summarize: () => "custom summary" });
    expect(result.messages.some((m) => m.content.includes("custom summary"))).toBe(true);
  });
});

describe("estimateTokenCount", () => {
  it("estimates tokens for messages", () => {
    const count = estimateTokenCount([{ role: "user", content: "hello world" }]);
    expect(count).toBeGreaterThan(0);
  });
});

describe("trimToTokenBudget", () => {
  it("keeps recent messages within budget", () => {
    const msgs = [
      { role: "user" as const, content: "a".repeat(100) },
      { role: "user" as const, content: "b".repeat(100) },
      { role: "user" as const, content: "short" },
    ];
    const trimmed = trimToTokenBudget(msgs, 10);
    expect(trimmed.length).toBeLessThan(msgs.length);
    expect(trimmed[trimmed.length - 1].content).toBe("short");
  });
});

import { describe, it, expect } from "vitest";
import { estimateTokens, truncateToTokens, chunkByTokens, countMessages } from "../token-counter.js";

describe("estimateTokens", () => {
  it("estimates word-based tokens", () => {
    const tokens = estimateTokens("hello world this is a test");
    expect(tokens).toBeGreaterThan(0);
    expect(tokens).toBeLessThan(20);
  });

  it("handles empty string", () => {
    expect(estimateTokens("")).toBe(0);
  });

  it("handles long text", () => {
    const long = "word ".repeat(1000);
    const tokens = estimateTokens(long);
    expect(tokens).toBeGreaterThan(500);
  });
});

describe("truncateToTokens", () => {
  it("truncates to approximate token limit", () => {
    const text = "The quick brown fox jumps over the lazy dog and keeps running forever";
    const truncated = truncateToTokens(text, 5);
    expect(truncated.split(" ").length).toBeLessThanOrEqual(6);
  });

  it("returns full text if under limit", () => {
    expect(truncateToTokens("hi", 100)).toBe("hi");
  });
});

describe("chunkByTokens", () => {
  it("splits text into chunks", () => {
    const text = "First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.";
    const chunks = chunkByTokens(text, 10);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(estimateTokens(chunk)).toBeLessThanOrEqual(15);
    }
  });

  it("handles short text as single chunk", () => {
    expect(chunkByTokens("Short.", 100)).toEqual(["Short."]);
  });
});

describe("countMessages", () => {
  it("estimates message array tokens", () => {
    const messages = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there!" },
    ];
    const count = countMessages(messages);
    expect(count).toBeGreaterThan(0);
  });
});

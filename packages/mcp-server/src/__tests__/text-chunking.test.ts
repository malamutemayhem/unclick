import { describe, it, expect } from "vitest";
import { chunkTextSmart, chunkTextWithOverlap, estimateTokens } from "../text-chunking.js";

describe("chunkTextSmart", () => {
  it("returns single chunk for short text", () => {
    expect(chunkTextSmart("Hello world", 100)).toEqual(["Hello world"]);
  });

  it("returns empty array for empty text", () => {
    expect(chunkTextSmart("", 100)).toEqual([]);
  });

  it("breaks at paragraph boundaries", () => {
    const text = "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.";
    const chunks = chunkTextSmart(text, 30);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]).toContain("First");
  });

  it("breaks at sentence boundaries when no paragraph break", () => {
    const text = "First sentence. Second sentence. Third sentence. Fourth sentence.";
    const chunks = chunkTextSmart(text, 40);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it("breaks at word boundaries as last resort", () => {
    const text = "one two three four five six seven eight nine ten";
    const chunks = chunkTextSmart(text, 15);
    for (const chunk of chunks) {
      expect(chunk).not.toMatch(/^\s/);
      expect(chunk).not.toMatch(/\s$/);
    }
  });

  it("handles text shorter than limit", () => {
    expect(chunkTextSmart("short", 1000)).toEqual(["short"]);
  });

  it("makes progress even with no break points", () => {
    const text = "a".repeat(50);
    const chunks = chunkTextSmart(text, 10);
    expect(chunks.length).toBe(5);
    expect(chunks.every((c) => c.length <= 10)).toBe(true);
  });
});

describe("chunkTextWithOverlap", () => {
  it("adds overlap between chunks", () => {
    const text = "First part of the text. Second part of the text. Third part.";
    const chunks = chunkTextWithOverlap(text, 30, 10);
    expect(chunks.length).toBeGreaterThan(1);
    if (chunks.length > 1) {
      expect(chunks[1].length).toBeGreaterThan(0);
    }
  });

  it("returns single chunk without overlap", () => {
    expect(chunkTextWithOverlap("short", 100, 10)).toEqual(["short"]);
  });
});

describe("estimateTokens", () => {
  it("estimates roughly 4 chars per token", () => {
    expect(estimateTokens("Hello world")).toBe(3);
  });

  it("handles empty string", () => {
    expect(estimateTokens("")).toBe(0);
  });

  it("rounds up", () => {
    expect(estimateTokens("Hi")).toBe(1);
  });
});

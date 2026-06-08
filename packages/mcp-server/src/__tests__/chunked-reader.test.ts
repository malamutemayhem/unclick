import { describe, it, expect } from "vitest";
import { fixedChunk, sentenceChunk, paragraphChunk, wordChunk, recursiveChunk } from "../chunked-reader.js";

describe("fixedChunk", () => {
  it("splits by character count", () => {
    const chunks = fixedChunk("abcdefghij", 3);
    expect(chunks.map((c) => c.text)).toEqual(["abc", "def", "ghi", "j"]);
  });

  it("supports overlap", () => {
    const chunks = fixedChunk("abcdefgh", 4, 2);
    expect(chunks[0].text).toBe("abcd");
    expect(chunks[1].text).toBe("cdef");
  });

  it("returns empty for zero size", () => {
    expect(fixedChunk("hello", 0)).toEqual([]);
  });

  it("assigns sequential indices", () => {
    const chunks = fixedChunk("abcdef", 2);
    expect(chunks.map((c) => c.index)).toEqual([0, 1, 2]);
  });
});

describe("sentenceChunk", () => {
  it("groups sentences", () => {
    const text = "First sentence. Second sentence. Third sentence. Fourth sentence.";
    const chunks = sentenceChunk(text, 2);
    expect(chunks.length).toBe(2);
    expect(chunks[0].text).toContain("First");
    expect(chunks[0].text).toContain("Second");
  });

  it("handles text without periods", () => {
    const chunks = sentenceChunk("no periods here");
    expect(chunks.length).toBe(1);
  });
});

describe("paragraphChunk", () => {
  it("splits by double newline", () => {
    const text = "Para one.\n\nPara two.\n\nPara three.";
    const chunks = paragraphChunk(text);
    expect(chunks.length).toBe(3);
    expect(chunks[0].text).toBe("Para one.");
  });

  it("filters empty paragraphs", () => {
    const text = "A.\n\n\n\nB.";
    const chunks = paragraphChunk(text);
    expect(chunks.length).toBe(2);
  });
});

describe("wordChunk", () => {
  it("splits by word count", () => {
    const chunks = wordChunk("one two three four five six", 3);
    expect(chunks.map((c) => c.text)).toEqual(["one two three", "four five six"]);
  });

  it("supports overlap", () => {
    const chunks = wordChunk("a b c d e f", 3, 1);
    expect(chunks[0].text).toBe("a b c");
    expect(chunks[1].text).toBe("c d e");
  });
});

describe("recursiveChunk", () => {
  it("keeps short text as single chunk", () => {
    const chunks = recursiveChunk("short text", 100);
    expect(chunks.length).toBe(1);
  });

  it("splits long text recursively", () => {
    const text = "Paragraph one here.\n\nParagraph two here.\n\nParagraph three here.";
    const chunks = recursiveChunk(text, 25);
    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) {
      expect(c.text.length).toBeLessThanOrEqual(30);
    }
  });
});

import { describe, it, expect } from "vitest";
import { chunkString, chunkArray, chunkIterable, processChunked } from "../chunked-reader.js";

describe("chunkString", () => {
  it("splits string into chunks", () => {
    expect(chunkString("abcdef", 2)).toEqual(["ab", "cd", "ef"]);
  });

  it("handles non-even splits", () => {
    expect(chunkString("abcde", 2)).toEqual(["ab", "cd", "e"]);
  });

  it("handles empty string", () => {
    expect(chunkString("", 3)).toEqual([]);
  });

  it("throws for invalid size", () => {
    expect(() => chunkString("abc", 0)).toThrow();
  });
});

describe("chunkArray", () => {
  it("splits array into chunks", () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles empty array", () => {
    expect(chunkArray([], 3)).toEqual([]);
  });
});

describe("chunkIterable", () => {
  it("yields chunks from iterable", () => {
    const chunks = [...chunkIterable([1, 2, 3, 4, 5], 2)];
    expect(chunks).toEqual([[1, 2], [3, 4], [5]]);
  });
});

describe("processChunked", () => {
  it("processes items in chunks", async () => {
    const results = await processChunked([1, 2, 3, 4, 5], 2, async (chunk) => {
      return chunk.reduce((a, b) => a + b, 0);
    });
    expect(results).toEqual([3, 7, 5]);
  });
});

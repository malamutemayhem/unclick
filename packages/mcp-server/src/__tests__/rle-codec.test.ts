import { describe, it, expect } from "vitest";
import { RleCodec } from "../rle-codec.js";

describe("RleCodec", () => {
  it("encodes repeated characters", () => {
    expect(RleCodec.encode("aaabbbcc")).toBe("3a3b2c");
  });

  it("encodes single characters without count", () => {
    expect(RleCodec.encode("abc")).toBe("abc");
  });

  it("decodes run-length encoded string", () => {
    expect(RleCodec.decode("3a3b2c")).toBe("aaabbbcc");
  });

  it("round-trips encode/decode", () => {
    const original = "aaaaabbbbcccdde";
    expect(RleCodec.decode(RleCodec.encode(original))).toBe(original);
  });

  it("handles empty string", () => {
    expect(RleCodec.encode("")).toBe("");
    expect(RleCodec.decode("")).toBe("");
  });

  it("encodes arrays with generic types", () => {
    const runs = RleCodec.encodeArray([1, 1, 1, 2, 2, 3]);
    expect(runs).toEqual([
      { value: 1, count: 3 },
      { value: 2, count: 2 },
      { value: 3, count: 1 },
    ]);
  });

  it("decodes arrays", () => {
    const result = RleCodec.decodeArray([
      { value: "a", count: 3 },
      { value: "b", count: 2 },
    ]);
    expect(result).toEqual(["a", "a", "a", "b", "b"]);
  });

  it("calculates compression ratio", () => {
    expect(RleCodec.compressionRatio("aaaaaaaaaa")).toBeLessThan(1);
    expect(RleCodec.compressionRatio("abcdef")).toBeGreaterThanOrEqual(1);
  });

  it("counts runs", () => {
    expect(RleCodec.runCount("aaabbbcc")).toBe(3);
    expect(RleCodec.runCount("abcde")).toBe(5);
  });

  it("finds longest run", () => {
    const result = RleCodec.longestRun("aabbbcccc");
    expect(result).toEqual({ char: "c", length: 4 });
  });

  it("returns null for empty longest run", () => {
    expect(RleCodec.longestRun("")).toBeNull();
  });
});

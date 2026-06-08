import { describe, it, expect } from "vitest";
import { distance, similarity, closest, withinDistance } from "../levenshtein.js";

describe("levenshtein", () => {
  it("identical strings have distance 0", () => {
    expect(distance("hello", "hello")).toBe(0);
  });

  it("empty vs non-empty", () => {
    expect(distance("", "abc")).toBe(3);
    expect(distance("abc", "")).toBe(3);
  });

  it("single edit operations", () => {
    expect(distance("cat", "bat")).toBe(1);
    expect(distance("cat", "cats")).toBe(1);
    expect(distance("cats", "cat")).toBe(1);
  });

  it("multiple edits", () => {
    expect(distance("kitten", "sitting")).toBe(3);
  });

  it("similarity returns 0-1 range", () => {
    expect(similarity("abc", "abc")).toBe(1);
    expect(similarity("abc", "xyz")).toBeCloseTo(0, 1);
    expect(similarity("", "")).toBe(1);
  });

  it("closest finds nearest match", () => {
    expect(closest("helo", ["hello", "world", "help"])).toBe("hello");
  });

  it("closest returns undefined for empty list", () => {
    expect(closest("test", [])).toBeUndefined();
  });

  it("withinDistance filters candidates", () => {
    const result = withinDistance("cat", ["bat", "dog", "car", "cap"], 1);
    expect(result).toContain("bat");
    expect(result).toContain("car");
    expect(result).toContain("cap");
    expect(result).not.toContain("dog");
  });
});

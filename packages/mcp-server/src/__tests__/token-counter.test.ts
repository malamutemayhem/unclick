import { describe, it, expect } from "vitest";
import { countTokens, countTokensBatch, totalTokens, truncateToTokens, fitsInBudget, remainingBudget, splitByTokenLimit } from "../token-counter.js";

describe("countTokens", () => {
  it("counts words", () => {
    expect(countTokens("hello world")).toBe(2);
  });

  it("handles empty string", () => {
    expect(countTokens("")).toBe(0);
  });

  it("handles extra whitespace", () => {
    expect(countTokens("  hello   world  ")).toBe(2);
  });

  it("handles single word", () => {
    expect(countTokens("hello")).toBe(1);
  });
});

describe("countTokensBatch", () => {
  it("counts tokens for multiple texts", () => {
    expect(countTokensBatch(["a b", "c d e"])).toEqual([2, 3]);
  });
});

describe("totalTokens", () => {
  it("sums all tokens", () => {
    expect(totalTokens(["hello world", "foo bar baz"])).toBe(5);
  });

  it("returns 0 for empty array", () => {
    expect(totalTokens([])).toBe(0);
  });
});

describe("truncateToTokens", () => {
  it("truncates long text", () => {
    expect(truncateToTokens("a b c d e", 3)).toBe("a b c");
  });

  it("returns full text if within limit", () => {
    expect(truncateToTokens("a b", 5)).toBe("a b");
  });
});

describe("fitsInBudget", () => {
  it("returns true when fits", () => {
    expect(fitsInBudget("hello world", 5)).toBe(true);
  });

  it("returns false when over", () => {
    expect(fitsInBudget("a b c d e f", 3)).toBe(false);
  });
});

describe("remainingBudget", () => {
  it("calculates remaining", () => {
    expect(remainingBudget(["hello world", "foo"], 10)).toBe(7);
  });

  it("returns 0 when over budget", () => {
    expect(remainingBudget(["a b c d e f g h i j"], 5)).toBe(0);
  });
});

describe("splitByTokenLimit", () => {
  it("splits text into chunks", () => {
    const chunks = splitByTokenLimit("a b c d e f", 2);
    expect(chunks).toEqual(["a b", "c d", "e f"]);
  });

  it("handles remainder", () => {
    const chunks = splitByTokenLimit("a b c d e", 3);
    expect(chunks).toEqual(["a b c", "d e"]);
  });

  it("single chunk when under limit", () => {
    expect(splitByTokenLimit("hello", 10)).toEqual(["hello"]);
  });
});

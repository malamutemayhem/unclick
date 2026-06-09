import { describe, it, expect } from "vitest";
import {
  editDistance, hammingDistance, isOneAway, findLadder,
  findAllLadders, ladderLength, isLadderPossible, validateLadder,
  SAMPLE_DICTIONARY,
} from "../word-ladder.js";

const DICT = SAMPLE_DICTIONARY();

describe("editDistance", () => {
  it("0 for same word", () => {
    expect(editDistance("cat", "cat")).toBe(0);
  });

  it("1 for one letter diff", () => {
    expect(editDistance("cat", "bat")).toBe(1);
  });

  it("3 for all different", () => {
    expect(editDistance("abc", "xyz")).toBe(3);
  });
});

describe("hammingDistance", () => {
  it("0 for identical", () => {
    expect(hammingDistance("hello", "hello")).toBe(0);
  });

  it("-1 for different lengths", () => {
    expect(hammingDistance("hi", "hey")).toBe(-1);
  });
});

describe("isOneAway", () => {
  it("true for one letter change", () => {
    expect(isOneAway("cat", "bat")).toBe(true);
  });

  it("false for two changes", () => {
    expect(isOneAway("cat", "dog")).toBe(false);
  });

  it("false for different lengths", () => {
    expect(isOneAway("cat", "cats")).toBe(false);
  });
});

describe("findLadder", () => {
  it("finds cat to dog", () => {
    const result = findLadder("cat", "dog", DICT);
    expect(result.found).toBe(true);
    expect(result.path[0]).toBe("cat");
    expect(result.path[result.path.length - 1]).toBe("dog");
  });

  it("returns not found for impossible", () => {
    const result = findLadder("xyz", "abc", ["xyz"]);
    expect(result.found).toBe(false);
  });

  it("same word returns single step", () => {
    const result = findLadder("cat", "cat", DICT);
    expect(result.found).toBe(true);
    expect(result.steps).toBe(0);
  });
});

describe("findAllLadders", () => {
  it("finds multiple paths", () => {
    const results = findAllLadders("cat", "dog", DICT);
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].found).toBe(true);
  });
});

describe("ladderLength", () => {
  it("returns step count", () => {
    const len = ladderLength("cat", "dog", DICT);
    expect(len).toBeGreaterThan(0);
  });

  it("returns -1 for impossible", () => {
    expect(ladderLength("xyz", "abc", ["xyz"])).toBe(-1);
  });
});

describe("isLadderPossible", () => {
  it("true for connected words", () => {
    expect(isLadderPossible("cat", "bat", DICT)).toBe(true);
  });
});

describe("validateLadder", () => {
  it("valid ladder", () => {
    expect(validateLadder(["cat", "bat", "bad"])).toBe(true);
  });

  it("invalid ladder", () => {
    expect(validateLadder(["cat", "dog"])).toBe(false);
  });

  it("single word is valid", () => {
    expect(validateLadder(["cat"])).toBe(true);
  });
});

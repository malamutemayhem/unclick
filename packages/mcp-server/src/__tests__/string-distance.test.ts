import { describe, it, expect } from "vitest";
import { levenshtein, similarity, findClosest, didYouMean } from "../string-distance.js";

describe("levenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  it("returns length for empty vs non-empty", () => {
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein("abc", "")).toBe(3);
  });

  it("counts single character edits", () => {
    expect(levenshtein("cat", "hat")).toBe(1);
    expect(levenshtein("cat", "cats")).toBe(1);
    expect(levenshtein("cats", "cat")).toBe(1);
  });

  it("handles multiple edits", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });
});

describe("similarity", () => {
  it("returns 1 for identical strings", () => {
    expect(similarity("hello", "hello")).toBe(1);
  });

  it("returns 0 for completely different strings of same length", () => {
    expect(similarity("abc", "xyz")).toBe(0);
  });

  it("returns 1 for two empty strings", () => {
    expect(similarity("", "")).toBe(1);
  });

  it("returns value between 0 and 1", () => {
    const sim = similarity("hello", "hallo");
    expect(sim).toBeGreaterThan(0);
    expect(sim).toBeLessThan(1);
  });
});

describe("findClosest", () => {
  const candidates = ["github", "gitlab", "gitea", "bitbucket", "slack", "stripe"];

  it("finds close matches", () => {
    const results = findClosest("githb", candidates);
    expect(results[0].value).toBe("github");
  });

  it("respects maxResults", () => {
    const results = findClosest("git", candidates, { maxResults: 2 });
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("filters by minSimilarity", () => {
    const results = findClosest("zzzzz", candidates, { minSimilarity: 0.8 });
    expect(results).toHaveLength(0);
  });

  it("returns empty for no matches", () => {
    expect(findClosest("xyzzy", ["a", "b"], { minSimilarity: 0.9 })).toHaveLength(0);
  });
});

describe("didYouMean", () => {
  const tools = ["github_action", "slack_send", "stripe_charges", "spotify_search"];

  it("suggests closest match", () => {
    expect(didYouMean("github_acton", tools)).toBe("github_action");
  });

  it("suggests for typos", () => {
    expect(didYouMean("slack_sned", tools)).toBe("slack_send");
  });

  it("returns undefined for no close match", () => {
    expect(didYouMean("xyzzy_tool", tools)).toBeUndefined();
  });
});

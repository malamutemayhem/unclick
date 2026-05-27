import { describe, it, expect } from "vitest";
import {
  lintVerdictText,
  assertVerdictText,
  FORBIDDEN_PHRASES,
  ALLOWED_PHRASES,
} from "../passguard/verdict-linter.js";

describe("PassGuard verdict-linter", () => {
  it("passes plain issue-spotter language", () => {
    const text =
      "This clause appears unusual and may shift risk to the customer. " +
      "Consider whether the indemnity warrants review against the precedent " +
      "seen in similar contracts.";
    expect(lintVerdictText(text).ok).toBe(true);
  });

  it("flags every forbidden phrase listed in the verb library", () => {
    for (const { phrase } of FORBIDDEN_PHRASES) {
      const sample = `In this case the user ${phrase} take action.`;
      const result = lintVerdictText(sample);
      expect(
        result.ok,
        `expected "${phrase}" to be flagged, got ${JSON.stringify(result)}`
      ).toBe(false);
      expect(result.issues.some((i) => i.phrase === phrase)).toBe(true);
    }
  });

  it("matches case-insensitively", () => {
    const result = lintVerdictText("You MUST seek further review.");
    expect(result.ok).toBe(false);
    expect(result.issues[0].phrase).toBe("must");
  });

  it("matches multi-word phrases across variable whitespace", () => {
    const result = lintVerdictText(
      "The right thing to do is accept this. We   represent   you.",
    );

    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.phrase === "the right thing to do is")).toBe(true);
    expect(result.issues.some((issue) => issue.phrase === "we represent you")).toBe(true);
  });

  it("blocks substitute-lawyer and unsupported compliance claims", () => {
    const result = lintVerdictText(
      "LegalPass is an AI lawyer with automatic compliance and a 100% compliant badge.",
    );

    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.phrase === "ai lawyer")).toBe(true);
    expect(result.issues.some((issue) => issue.phrase === "automatic compliance")).toBe(true);
    expect(result.issues.some((issue) => issue.phrase === "100% compliant")).toBe(true);
  });

  it("blocks imperative legal referral wording in verdict text", () => {
    const result = lintVerdictText(
      "Ask a qualified practitioner before acting on this item.",
    );

    expect(result.issues.some(
      (issue) => issue.phrase === "ask a qualified practitioner",
    )).toBe(true);
  });

  it("matches whole words only, not substrings", () => {
    // 'mustard' contains 'must' as a substring but should not match.
    const result = lintVerdictText("The mustard clause is unusual.");
    expect(result.ok).toBe(true);
  });

  it("assertVerdictText throws on forbidden phrasing", () => {
    expect(() =>
      assertVerdictText("You should consult counsel.", "test")
    ).toThrow(/forbidden phrasing/);
  });

  it("assertVerdictText is silent on clean output", () => {
    expect(() =>
      assertVerdictText("This warrants review by counsel.")
    ).not.toThrow();
  });

  it("documents the allowed framing language", () => {
    expect(ALLOWED_PHRASES).toContain("appears");
    expect(ALLOWED_PHRASES).toContain("may");
    expect(ALLOWED_PHRASES).toContain("consider");
    expect(ALLOWED_PHRASES).toContain("in similar contracts");
    expect(ALLOWED_PHRASES).toContain("warrants review");
    expect(ALLOWED_PHRASES).toContain("you may want to review with a lawyer");
  });
});

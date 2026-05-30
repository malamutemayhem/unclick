import { describe, expect, it } from "vitest";
import { buildAiStyleDirective, normalizeAiStyleValue } from "./memory-admin";

describe("AI style preferences", () => {
  it("falls back to sensible defaults for empty or non-object input", () => {
    const value = normalizeAiStyleValue({});
    expect(value).toMatchObject({
      response_length: "medium",
      complexity: "analogies",
      format: "prose",
      emoji_level: "light",
      custom_instructions: "",
      privacy: "style-only",
    });
    // Garbage input is treated as "no preferences set", not a throw.
    expect(normalizeAiStyleValue("not json")).toMatchObject({ response_length: "medium" });
    expect(normalizeAiStyleValue(null)).toMatchObject({ emoji_level: "light" });
  });

  it("clamps out-of-range enum values back to the defaults", () => {
    const value = normalizeAiStyleValue({
      response_length: "epic",
      complexity: 42,
      format: "interpretive-dance",
      emoji_level: "MAXIMUM",
    });
    expect(value.response_length).toBe("medium");
    expect(value.complexity).toBe("analogies");
    expect(value.format).toBe("prose");
    expect(value.emoji_level).toBe("light");
  });

  it("preserves valid selections", () => {
    const value = normalizeAiStyleValue({
      response_length: "brief",
      complexity: "simple",
      format: "visual",
      emoji_level: "none",
    });
    expect(value).toMatchObject({
      response_length: "brief",
      complexity: "simple",
      format: "visual",
      emoji_level: "none",
    });
  });

  it("sanitizes custom instructions (collapses whitespace, caps length)", () => {
    const value = normalizeAiStyleValue({
      custom_instructions: "  Australian   spelling.\n\nLead with the answer.  ",
    });
    expect(value.custom_instructions).toBe("Australian spelling. Lead with the answer.");

    const long = normalizeAiStyleValue({ custom_instructions: "x".repeat(900) });
    expect(long.custom_instructions.length).toBe(600);
  });

  it("keeps `directive` as the first key so it survives JSON truncation for compact clients", () => {
    const value = normalizeAiStyleValue({ response_length: "brief", emoji_level: "none" });
    expect(Object.keys(value)[0]).toBe("directive");
    // The serialized form (what compact startup context truncates to ~130 chars)
    // leads with the directive, so the rules are not lost.
    expect(JSON.stringify(value).startsWith('{"directive":')).toBe(true);
  });

  it("builds an imperative directive that reflects the chosen rules", () => {
    const directive = buildAiStyleDirective({
      response_length: "brief",
      complexity: "simple",
      format: "visual",
      emoji_level: "none",
      custom_instructions: "Australian spelling",
    });
    expect(directive).toContain("brief");
    expect(directive).toContain("plain English");
    expect(directive).toContain("visuals");
    expect(directive).toContain("no emoji");
    expect(directive).toContain("Australian spelling");
    expect(directive.toLowerCase()).toContain("always honor");
  });

  it("caps an overlong directive so it cannot bloat the startup payload", () => {
    const directive = buildAiStyleDirective({
      response_length: "detailed",
      complexity: "technical",
      format: "bullets",
      emoji_level: "expressive",
      custom_instructions: "y".repeat(500),
    });
    expect(directive.length).toBeLessThanOrEqual(300);
  });
});

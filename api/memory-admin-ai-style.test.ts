import { describe, expect, it } from "vitest";
import { buildAiStyleDirective, normalizeAiStyleValue } from "./memory-admin";

describe("AI style preferences", () => {
  it("falls back to sensible defaults for empty or non-object input", () => {
    const value = normalizeAiStyleValue({});
    expect(value).toMatchObject({
      response_length: "medium",
      complexity: "simple",
      analogies: "on",
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
      analogies: "MAYBE",
      format: "interpretive-dance",
      emoji_level: "MAXIMUM",
    });
    expect(value.response_length).toBe("medium");
    expect(value.complexity).toBe("simple");
    expect(value.analogies).toBe("on");
    expect(value.format).toBe("prose");
    expect(value.emoji_level).toBe("light");
  });

  it("preserves valid selections", () => {
    const value = normalizeAiStyleValue({
      response_length: "brief",
      complexity: "technical",
      analogies: "off",
      format: "visual",
      emoji_level: "none",
    });
    expect(value).toMatchObject({
      response_length: "brief",
      complexity: "technical",
      analogies: "off",
      format: "visual",
      emoji_level: "none",
    });
  });

  it("migrates the legacy `complexity: analogies` value to simple + analogies on", () => {
    // Old saved rows used a single "analogies" complexity value. Reading level
    // and the analogies technique are now separate, so the legacy value maps to
    // plain English with analogies switched on.
    const migrated = normalizeAiStyleValue({ complexity: "analogies" });
    expect(migrated.complexity).toBe("simple");
    expect(migrated.analogies).toBe("on");

    // An explicit analogies field always wins over the legacy inference.
    const explicit = normalizeAiStyleValue({ complexity: "analogies", analogies: "off" });
    expect(explicit.complexity).toBe("simple");
    expect(explicit.analogies).toBe("off");
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
      analogies: "on",
      format: "visual",
      emoji_level: "none",
      custom_instructions: "Australian spelling",
    });
    expect(directive).toContain("brief");
    expect(directive).toContain("plain English");
    expect(directive).toContain("analogies");
    expect(directive).toContain("visuals");
    expect(directive).toContain("no emoji");
    expect(directive).toContain("Australian spelling");
    expect(directive.toLowerCase()).toContain("always honor");
  });

  it("omits the analogies clause when analogies are off", () => {
    const directive = buildAiStyleDirective({
      response_length: "medium",
      complexity: "technical",
      analogies: "off",
      format: "prose",
      emoji_level: "light",
      custom_instructions: "",
    });
    expect(directive).not.toContain("analogies");
  });

  it("caps an overlong directive so it cannot bloat the startup payload", () => {
    const directive = buildAiStyleDirective({
      response_length: "detailed",
      complexity: "technical",
      analogies: "on",
      format: "bullets",
      emoji_level: "expressive",
      custom_instructions: "y".repeat(500),
    });
    expect(directive.length).toBeLessThanOrEqual(300);
  });
});

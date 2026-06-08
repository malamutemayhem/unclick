import { describe, it, expect } from "vitest";
import { PasswordStrength } from "../password-strength.js";

describe("PasswordStrength", () => {
  it("rates weak passwords", () => {
    const result = PasswordStrength.analyze("abc");
    expect(result.strength).toBe("very weak");
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it("rates strong passwords", () => {
    const result = PasswordStrength.analyze("MyStr0ng!Pass#2024");
    expect(["strong", "very strong"]).toContain(result.strength);
    expect(result.score).toBeGreaterThanOrEqual(5);
  });

  it("calculates entropy", () => {
    const entropy = PasswordStrength.calculateEntropy("abcd");
    expect(entropy).toBeGreaterThan(0);
    const longer = PasswordStrength.calculateEntropy("abcdefgh");
    expect(longer).toBeGreaterThan(entropy);
  });

  it("returns zero entropy for empty string", () => {
    expect(PasswordStrength.calculateEntropy("")).toBe(0);
  });

  it("detects repeating characters", () => {
    expect(PasswordStrength.hasRepeatingChars("aaa")).toBe(true);
    expect(PasswordStrength.hasRepeatingChars("abab")).toBe(false);
  });

  it("detects sequential characters", () => {
    expect(PasswordStrength.hasSequentialChars("abc")).toBe(true);
    expect(PasswordStrength.hasSequentialChars("cba")).toBe(true);
    expect(PasswordStrength.hasSequentialChars("ace")).toBe(false);
  });

  it("checks policy compliance", () => {
    const result = PasswordStrength.meetsPolicy("Hello1!", {
      minLength: 6,
      requireUpper: true,
      requireLower: true,
      requireDigit: true,
      requireSpecial: true,
    });
    expect(result.passes).toBe(true);
    expect(result.failures).toHaveLength(0);
  });

  it("reports policy failures", () => {
    const result = PasswordStrength.meetsPolicy("hello", {
      minLength: 8,
      requireUpper: true,
      requireDigit: true,
    });
    expect(result.passes).toBe(false);
    expect(result.failures.length).toBeGreaterThan(0);
  });

  it("generates suggestion of correct length", () => {
    const pwd = PasswordStrength.generateSuggestion(20);
    expect(pwd.length).toBe(20);
  });

  it("penalizes repeating chars in score", () => {
    const withRepeat = PasswordStrength.analyze("Aaa1!bbbccc");
    const suggestions = withRepeat.suggestions;
    expect(suggestions).toContain("Avoid repeating characters");
  });
});

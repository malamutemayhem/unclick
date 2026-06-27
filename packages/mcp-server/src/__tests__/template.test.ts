import { describe, it, expect } from "vitest";
import { interpolate, extractPlaceholders, validateTemplate } from "../template.js";

describe("interpolate", () => {
  it("replaces simple placeholders", () => {
    expect(interpolate("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
  });

  it("handles multiple placeholders", () => {
    expect(interpolate("{{a}} and {{b}}", { a: "X", b: "Y" })).toBe("X and Y");
  });

  it("handles dotted paths", () => {
    expect(interpolate("{{user.name}}", { user: { name: "Alice" } })).toBe("Alice");
  });

  it("replaces missing values with empty string", () => {
    expect(interpolate("Hi {{name}}", {})).toBe("Hi ");
  });

  it("converts numbers to strings", () => {
    expect(interpolate("Count: {{n}}", { n: 42 })).toBe("Count: 42");
  });

  it("handles null values as empty string", () => {
    expect(interpolate("{{x}}", { x: null })).toBe("");
  });

  it("leaves text without placeholders unchanged", () => {
    expect(interpolate("no placeholders here", {})).toBe("no placeholders here");
  });

  it("handles repeated placeholders", () => {
    expect(interpolate("{{x}} and {{x}}", { x: "A" })).toBe("A and A");
  });
});

describe("extractPlaceholders", () => {
  it("finds all placeholder names", () => {
    expect(extractPlaceholders("{{a}} {{b}} {{a}}")).toEqual(["a", "b"]);
  });

  it("finds dotted paths", () => {
    expect(extractPlaceholders("{{user.name}}")).toEqual(["user.name"]);
  });

  it("returns empty for no placeholders", () => {
    expect(extractPlaceholders("plain text")).toEqual([]);
  });
});

describe("validateTemplate", () => {
  it("passes when all values present", () => {
    const result = validateTemplate("{{a}} {{b}}", { a: 1, b: 2 });
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it("reports missing values", () => {
    const result = validateTemplate("{{a}} {{b}} {{c}}", { a: 1 });
    expect(result.valid).toBe(false);
    expect(result.missing).toContain("b");
    expect(result.missing).toContain("c");
  });

  it("handles nested paths", () => {
    const result = validateTemplate("{{user.name}}", { user: { name: "A" } });
    expect(result.valid).toBe(true);
  });
});

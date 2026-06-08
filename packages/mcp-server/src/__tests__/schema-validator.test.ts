import { describe, it, expect } from "vitest";
import { validate, isValid } from "../schema-validator.js";

describe("validate", () => {
  it("checks type", () => {
    const errors = validate(42, { type: "string" });
    expect(errors.length).toBe(1);
    expect(errors[0].message).toContain("expected string");
  });

  it("passes valid type", () => {
    expect(validate("hi", { type: "string" })).toEqual([]);
  });

  it("checks required", () => {
    expect(validate(undefined, { required: true })).toEqual([{ path: "$", message: "required" }]);
  });

  it("checks minLength", () => {
    const errors = validate("ab", { type: "string", minLength: 3 });
    expect(errors.length).toBe(1);
  });

  it("checks number range", () => {
    expect(validate(5, { type: "number", min: 1, max: 10 })).toEqual([]);
    expect(validate(15, { type: "number", max: 10 }).length).toBe(1);
  });

  it("validates nested objects", () => {
    const schema = {
      type: "object" as const,
      properties: {
        name: { type: "string" as const, required: true },
        age: { type: "number" as const, min: 0 },
      },
    };
    expect(validate({ name: "Alice", age: 30 }, schema)).toEqual([]);
    const errors = validate({ age: -1 }, schema);
    expect(errors.length).toBe(2);
  });

  it("validates arrays", () => {
    const schema = { type: "array" as const, items: { type: "number" as const } };
    expect(validate([1, 2, 3], schema)).toEqual([]);
    expect(validate([1, "two"], schema).length).toBe(1);
  });

  it("checks enum", () => {
    expect(validate("red", { enum: ["red", "green", "blue"] })).toEqual([]);
    expect(validate("pink", { enum: ["red", "green", "blue"] }).length).toBe(1);
  });

  it("checks pattern", () => {
    expect(validate("abc123", { type: "string", pattern: "^[a-z]+\\d+$" })).toEqual([]);
    expect(validate("ABC", { type: "string", pattern: "^[a-z]+$" }).length).toBe(1);
  });
});

describe("isValid", () => {
  it("returns boolean", () => {
    expect(isValid("hello", { type: "string" })).toBe(true);
    expect(isValid(42, { type: "string" })).toBe(false);
  });
});

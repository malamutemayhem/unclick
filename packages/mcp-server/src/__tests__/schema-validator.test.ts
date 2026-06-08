import { describe, it, expect } from "vitest";
import { validate, isValid } from "../schema-validator.js";
import type { Schema } from "../schema-validator.js";

describe("validate", () => {
  it("validates strings", () => {
    const schema: Schema = { type: "string" };
    expect(validate("hello", schema)).toEqual([]);
    expect(validate(42, schema)).toHaveLength(1);
  });

  it("validates string constraints", () => {
    const schema: Schema = { type: "string", minLength: 2, maxLength: 5 };
    expect(validate("ab", schema)).toEqual([]);
    expect(validate("a", schema)).toHaveLength(1);
    expect(validate("abcdef", schema)).toHaveLength(1);
  });

  it("validates string pattern", () => {
    const schema: Schema = { type: "string", pattern: "^[a-z]+$" };
    expect(validate("abc", schema)).toEqual([]);
    expect(validate("ABC", schema)).toHaveLength(1);
  });

  it("validates numbers", () => {
    const schema: Schema = { type: "number", min: 0, max: 100 };
    expect(validate(50, schema)).toEqual([]);
    expect(validate(-1, schema)).toHaveLength(1);
    expect(validate(101, schema)).toHaveLength(1);
  });

  it("validates integer constraint", () => {
    const schema: Schema = { type: "number", integer: true };
    expect(validate(5, schema)).toEqual([]);
    expect(validate(5.5, schema)).toHaveLength(1);
  });

  it("validates boolean", () => {
    expect(validate(true, { type: "boolean" })).toEqual([]);
    expect(validate("true", { type: "boolean" })).toHaveLength(1);
  });

  it("validates null", () => {
    expect(validate(null, { type: "null" })).toEqual([]);
    expect(validate(0, { type: "null" })).toHaveLength(1);
  });

  it("validates arrays", () => {
    const schema: Schema = { type: "array", items: { type: "number" }, minItems: 1 };
    expect(validate([1, 2, 3], schema)).toEqual([]);
    expect(validate([], schema)).toHaveLength(1);
    expect(validate([1, "two"], schema)).toHaveLength(1);
  });

  it("validates objects with required", () => {
    const schema: Schema = {
      type: "object",
      properties: { name: { type: "string" }, age: { type: "number" } },
      required: ["name"],
    };
    expect(validate({ name: "Alice", age: 30 }, schema)).toEqual([]);
    expect(validate({ age: 30 }, schema)).toHaveLength(1);
  });

  it("any type accepts anything", () => {
    expect(validate(42, { type: "any" })).toEqual([]);
    expect(validate("hello", { type: "any" })).toEqual([]);
  });

  it("reports path in errors", () => {
    const schema: Schema = { type: "object", properties: { items: { type: "array", items: { type: "string" } } } };
    const errors = validate({ items: [1] }, schema);
    expect(errors[0].path).toBe("$.items[0]");
  });
});

describe("isValid", () => {
  it("returns boolean", () => {
    expect(isValid("hello", { type: "string" })).toBe(true);
    expect(isValid(42, { type: "string" })).toBe(false);
  });
});

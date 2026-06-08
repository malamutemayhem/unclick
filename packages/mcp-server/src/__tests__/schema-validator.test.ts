import { describe, it, expect } from "vitest";
import { validate, isValid } from "../schema-validator.js";

describe("schema-validator", () => {
  it("validates string type", () => {
    expect(isValid("hello", { type: "string" })).toBe(true);
    expect(isValid(42, { type: "string" })).toBe(false);
  });

  it("validates string minLength and maxLength", () => {
    expect(isValid("ab", { type: "string", minLength: 3 })).toBe(false);
    expect(isValid("abcdef", { type: "string", maxLength: 3 })).toBe(false);
    expect(isValid("abc", { type: "string", minLength: 2, maxLength: 5 })).toBe(true);
  });

  it("validates string pattern", () => {
    expect(isValid("abc123", { type: "string", pattern: "^[a-z]+\\d+$" })).toBe(true);
    expect(isValid("ABC", { type: "string", pattern: "^[a-z]+$" })).toBe(false);
  });

  it("validates number type", () => {
    expect(isValid(42, { type: "number" })).toBe(true);
    expect(isValid("42", { type: "number" })).toBe(false);
  });

  it("validates number min/max", () => {
    expect(isValid(5, { type: "number", min: 0, max: 10 })).toBe(true);
    expect(isValid(-1, { type: "number", min: 0 })).toBe(false);
  });

  it("validates integer", () => {
    expect(isValid(5, { type: "number", integer: true })).toBe(true);
    expect(isValid(5.5, { type: "number", integer: true })).toBe(false);
  });

  it("validates boolean", () => {
    expect(isValid(true, { type: "boolean" })).toBe(true);
    expect(isValid(0, { type: "boolean" })).toBe(false);
  });

  it("validates null", () => {
    expect(isValid(null, { type: "null" })).toBe(true);
    expect(isValid(undefined, { type: "null" })).toBe(false);
  });

  it("validates any", () => {
    expect(isValid("anything", { type: "any" })).toBe(true);
    expect(isValid(null, { type: "any" })).toBe(true);
  });

  it("validates array", () => {
    expect(isValid([1, 2], { type: "array" })).toBe(true);
    expect(isValid("not array", { type: "array" })).toBe(false);
  });

  it("validates array items", () => {
    const schema = { type: "array" as const, items: { type: "number" as const } };
    expect(isValid([1, 2, 3], schema)).toBe(true);
    expect(isValid([1, "two"], schema)).toBe(false);
  });

  it("validates array length", () => {
    expect(isValid([1], { type: "array", minItems: 2 })).toBe(false);
    expect(isValid([1, 2, 3], { type: "array", maxItems: 2 })).toBe(false);
  });

  it("validates object", () => {
    expect(isValid({}, { type: "object" })).toBe(true);
    expect(isValid(null, { type: "object" })).toBe(false);
  });

  it("validates required fields", () => {
    const schema = { type: "object" as const, required: ["name"] };
    expect(isValid({ name: "A" }, schema)).toBe(true);
    expect(isValid({}, schema)).toBe(false);
  });

  it("validates nested properties", () => {
    const schema = {
      type: "object" as const,
      properties: { name: { type: "string" as const }, age: { type: "number" as const } },
    };
    expect(isValid({ name: "A", age: 30 }, schema)).toBe(true);
    expect(isValid({ name: "A", age: "thirty" }, schema)).toBe(false);
  });

  it("returns error paths", () => {
    const errors = validate({ name: 42 }, {
      type: "object",
      properties: { name: { type: "string" } },
    });
    expect(errors).toHaveLength(1);
    expect(errors[0].path).toBe("name");
  });
});

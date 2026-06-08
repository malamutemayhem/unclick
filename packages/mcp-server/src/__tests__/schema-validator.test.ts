import { describe, it, expect } from "vitest";
import { validate, isValid } from "../schema-validator.js";

describe("schema-validator", () => {
  it("validates string type", () => {
    expect(isValid("hello", { type: "string" })).toBe(true);
    expect(isValid(42, { type: "string" })).toBe(false);
  });

  it("validates number type", () => {
    expect(isValid(42, { type: "number" })).toBe(true);
    expect(isValid("42", { type: "number" })).toBe(false);
  });

  it("validates boolean type", () => {
    expect(isValid(true, { type: "boolean" })).toBe(true);
    expect(isValid(1, { type: "boolean" })).toBe(false);
  });

  it("validates null type", () => {
    expect(isValid(null, { type: "null" })).toBe(true);
    expect(isValid(null, { type: "string" })).toBe(false);
  });

  it("any type accepts everything", () => {
    expect(isValid("hi", { type: "any" })).toBe(true);
    expect(isValid(42, { type: "any" })).toBe(true);
    expect(isValid(null, { type: "any" })).toBe(true);
  });

  it("validates minLength/maxLength", () => {
    expect(isValid("abc", { type: "string", minLength: 2 })).toBe(true);
    expect(isValid("a", { type: "string", minLength: 2 })).toBe(false);
    expect(isValid("abcdef", { type: "string", maxLength: 3 })).toBe(false);
  });

  it("validates min/max for numbers", () => {
    expect(isValid(5, { type: "number", min: 1, max: 10 })).toBe(true);
    expect(isValid(0, { type: "number", min: 1 })).toBe(false);
    expect(isValid(11, { type: "number", max: 10 })).toBe(false);
  });

  it("validates pattern", () => {
    expect(isValid("abc123", { type: "string", pattern: "^[a-z]+\\d+$" })).toBe(true);
    expect(isValid("ABC", { type: "string", pattern: "^[a-z]+$" })).toBe(false);
  });

  it("validates enum", () => {
    expect(isValid("a", { type: "string", enum: ["a", "b", "c"] })).toBe(true);
    expect(isValid("d", { type: "string", enum: ["a", "b", "c"] })).toBe(false);
  });

  it("validates array items", () => {
    expect(isValid([1, 2, 3], { type: "array", items: { type: "number" } })).toBe(true);
    const errors = validate([1, "two", 3], { type: "array", items: { type: "number" } });
    expect(errors).toHaveLength(1);
    expect(errors[0].path).toBe("[1]");
  });

  it("validates object properties", () => {
    const schema = {
      type: "object" as const,
      properties: { name: { type: "string" as const }, age: { type: "number" as const } },
    };
    expect(isValid({ name: "Alice", age: 30 }, schema)).toBe(true);
    expect(isValid({ name: "Alice", age: "thirty" }, schema)).toBe(false);
  });

  it("validates required fields", () => {
    const schema = {
      type: "object" as const,
      requiredFields: ["name"],
      properties: { name: { type: "string" as const } },
    };
    expect(isValid({ name: "Alice" }, schema)).toBe(true);
    const errors = validate({}, schema);
    expect(errors.some((e) => e.message.includes("Required"))).toBe(true);
  });

  it("required flag on missing value", () => {
    const errors = validate(undefined, { type: "string", required: true });
    expect(errors).toHaveLength(1);
  });

  it("returns paths for nested errors", () => {
    const schema = {
      type: "object" as const,
      properties: { user: { type: "object" as const, properties: { name: { type: "string" as const } } } },
    };
    const errors = validate({ user: { name: 42 } }, schema);
    expect(errors[0].path).toBe("user.name");
  });
});

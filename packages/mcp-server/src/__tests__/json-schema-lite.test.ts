import { describe, it, expect } from "vitest";
import { validate, isValid, assertValid, SchemaValidationError } from "../json-schema-lite.js";

describe("validate", () => {
  it("passes when no constraints", () => {
    expect(validate("anything", {})).toEqual([]);
  });

  it("checks string type", () => {
    expect(validate("hi", { type: "string" })).toEqual([]);
    expect(validate(42, { type: "string" })).toHaveLength(1);
  });

  it("checks number type", () => {
    expect(validate(42, { type: "number" })).toEqual([]);
    expect(validate("42", { type: "number" })).toHaveLength(1);
  });

  it("checks boolean type", () => {
    expect(validate(true, { type: "boolean" })).toEqual([]);
    expect(validate("true", { type: "boolean" })).toHaveLength(1);
  });

  it("checks null type", () => {
    expect(validate(null, { type: "null" })).toEqual([]);
    expect(validate(0, { type: "null" })).toHaveLength(1);
  });

  it("allows union types", () => {
    expect(validate("hi", { type: ["string", "null"] })).toEqual([]);
    expect(validate(null, { type: ["string", "null"] })).toEqual([]);
    expect(validate(42, { type: ["string", "null"] })).toHaveLength(1);
  });

  it("checks enum values", () => {
    expect(validate("a", { enum: ["a", "b", "c"] })).toEqual([]);
    expect(validate("z", { enum: ["a", "b", "c"] })).toHaveLength(1);
  });

  it("checks minLength", () => {
    expect(validate("abc", { type: "string", minLength: 2 })).toEqual([]);
    expect(validate("a", { type: "string", minLength: 2 })).toHaveLength(1);
  });

  it("checks maxLength", () => {
    expect(validate("ab", { type: "string", maxLength: 3 })).toEqual([]);
    expect(validate("abcd", { type: "string", maxLength: 3 })).toHaveLength(1);
  });

  it("checks pattern", () => {
    expect(validate("abc123", { type: "string", pattern: "^[a-z]+\\d+$" })).toEqual([]);
    expect(validate("ABC", { type: "string", pattern: "^[a-z]+$" })).toHaveLength(1);
  });

  it("checks minimum", () => {
    expect(validate(5, { type: "number", minimum: 1 })).toEqual([]);
    expect(validate(0, { type: "number", minimum: 1 })).toHaveLength(1);
  });

  it("checks maximum", () => {
    expect(validate(5, { type: "number", maximum: 10 })).toEqual([]);
    expect(validate(11, { type: "number", maximum: 10 })).toHaveLength(1);
  });

  it("checks required fields", () => {
    const schema = { type: "object" as const, required: ["name", "age"] };
    expect(validate({ name: "Jo", age: 30 }, schema)).toEqual([]);
    expect(validate({ name: "Jo" }, schema)).toHaveLength(1);
  });

  it("validates nested properties", () => {
    const schema = {
      type: "object" as const,
      properties: {
        name: { type: "string" as const },
        age: { type: "number" as const },
      },
    };
    expect(validate({ name: "Jo", age: 30 }, schema)).toEqual([]);
    expect(validate({ name: "Jo", age: "thirty" }, schema)).toHaveLength(1);
  });

  it("validates array items", () => {
    const schema = { type: "array" as const, items: { type: "number" as const } };
    expect(validate([1, 2, 3], schema)).toEqual([]);
    expect(validate([1, "two", 3], schema)).toHaveLength(1);
  });

  it("includes paths in errors", () => {
    const schema = {
      type: "object" as const,
      properties: {
        user: {
          type: "object" as const,
          properties: {
            name: { type: "string" as const },
          },
        },
      },
    };
    const errors = validate({ user: { name: 123 } }, schema);
    expect(errors[0].path).toBe("user.name");
  });

  it("includes array indices in paths", () => {
    const schema = { type: "array" as const, items: { type: "string" as const } };
    const errors = validate(["ok", 42], schema);
    expect(errors[0].path).toBe("[1]");
  });
});

describe("isValid", () => {
  it("returns true for valid", () => {
    expect(isValid("hello", { type: "string" })).toBe(true);
  });

  it("returns false for invalid", () => {
    expect(isValid(42, { type: "string" })).toBe(false);
  });
});

describe("assertValid", () => {
  it("does not throw for valid data", () => {
    expect(() => assertValid("hello", { type: "string" })).not.toThrow();
  });

  it("throws SchemaValidationError for invalid data", () => {
    expect(() => assertValid(42, { type: "string" })).toThrow(SchemaValidationError);
  });

  it("error contains all validation errors", () => {
    try {
      assertValid({ x: 1 }, { type: "object", required: ["a", "b"] });
    } catch (e) {
      expect(e).toBeInstanceOf(SchemaValidationError);
      expect((e as SchemaValidationError).errors).toHaveLength(2);
    }
  });
});

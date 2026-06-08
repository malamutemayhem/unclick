import { describe, it, expect } from "vitest";
import { validate, isValid, Schema } from "../schema-validator.js";

describe("validate", () => {
  it("validates strings", () => {
    const schema: Schema = { type: "string" };
    expect(validate("hello", schema).valid).toBe(true);
    expect(validate(42, schema).valid).toBe(false);
  });

  it("validates string constraints", () => {
    const schema: Schema = { type: "string", minLength: 2, maxLength: 5 };
    expect(validate("ab", schema).valid).toBe(true);
    expect(validate("a", schema).valid).toBe(false);
    expect(validate("abcdef", schema).valid).toBe(false);
  });

  it("validates string pattern", () => {
    const schema: Schema = { type: "string", pattern: "^[A-Z]+$" };
    expect(validate("ABC", schema).valid).toBe(true);
    expect(validate("abc", schema).valid).toBe(false);
  });

  it("validates numbers", () => {
    const schema: Schema = { type: "number", min: 0, max: 100 };
    expect(validate(50, schema).valid).toBe(true);
    expect(validate(-1, schema).valid).toBe(false);
    expect(validate(101, schema).valid).toBe(false);
  });

  it("validates integers", () => {
    const schema: Schema = { type: "number", integer: true };
    expect(validate(5, schema).valid).toBe(true);
    expect(validate(5.5, schema).valid).toBe(false);
  });

  it("validates booleans", () => {
    const schema: Schema = { type: "boolean" };
    expect(validate(true, schema).valid).toBe(true);
    expect(validate("true", schema).valid).toBe(false);
  });

  it("validates arrays", () => {
    const schema: Schema = { type: "array", items: { type: "number" }, minItems: 1 };
    expect(validate([1, 2], schema).valid).toBe(true);
    expect(validate([], schema).valid).toBe(false);
    expect(validate([1, "x"], schema).valid).toBe(false);
  });

  it("validates objects", () => {
    const schema: Schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
      },
    };
    expect(validate({ name: "Alice", age: 30 }, schema).valid).toBe(true);
    expect(validate({ name: 42, age: 30 }, schema).valid).toBe(false);
  });

  it("validates nested objects", () => {
    const schema: Schema = {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
    };
    expect(validate({ user: { name: "Bob" } }, schema).valid).toBe(true);
    expect(validate({ user: { name: 123 } }, schema).valid).toBe(false);
  });

  it("validates enums", () => {
    const schema: Schema = { type: "enum", values: ["a", "b", "c"] };
    expect(validate("a", schema).valid).toBe(true);
    expect(validate("d", schema).valid).toBe(false);
  });

  it("validates unions", () => {
    const schema: Schema = { type: "union", schemas: [{ type: "string" }, { type: "number" }] };
    expect(validate("hi", schema).valid).toBe(true);
    expect(validate(42, schema).valid).toBe(true);
    expect(validate(true, schema).valid).toBe(false);
  });

  it("handles optional fields", () => {
    const schema: Schema = {
      type: "object",
      properties: {
        required: { type: "string" },
        optional: { type: "string", optional: true },
      },
    };
    expect(validate({ required: "x" }, schema).valid).toBe(true);
    expect(validate({}, schema).valid).toBe(false);
  });

  it("rejects additional properties", () => {
    const schema: Schema = {
      type: "object",
      properties: { a: { type: "string" } },
      additionalProperties: false,
    };
    expect(validate({ a: "x", b: "y" }, schema).valid).toBe(false);
  });

  it("collects error paths", () => {
    const schema: Schema = {
      type: "object",
      properties: {
        items: { type: "array", items: { type: "number" } },
      },
    };
    const result = validate({ items: [1, "bad", 3] }, schema);
    expect(result.valid).toBe(false);
    expect(result.errors[0].path).toBe("items[1]");
  });
});

describe("isValid", () => {
  it("returns boolean", () => {
    expect(isValid(42, { type: "number" })).toBe(true);
    expect(isValid("x", { type: "number" })).toBe(false);
  });
});

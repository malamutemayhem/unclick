import { describe, it, expect } from "vitest";
import { validate, isValid, string, number, boolean, array, object, literal, union, any } from "../type-schema.js";

describe("type-schema", () => {
  describe("string validation", () => {
    it("accepts valid string", () => {
      expect(isValid("hello", string())).toBe(true);
    });

    it("rejects non-string", () => {
      expect(isValid(42, string())).toBe(false);
    });

    it("enforces minLength", () => {
      expect(isValid("ab", string({ minLength: 3 }))).toBe(false);
      expect(isValid("abc", string({ minLength: 3 }))).toBe(true);
    });

    it("enforces maxLength", () => {
      expect(isValid("abcd", string({ maxLength: 3 }))).toBe(false);
    });

    it("enforces pattern", () => {
      expect(isValid("abc", string({ pattern: "^[a-z]+$" }))).toBe(true);
      expect(isValid("123", string({ pattern: "^[a-z]+$" }))).toBe(false);
    });
  });

  describe("number validation", () => {
    it("accepts valid number", () => {
      expect(isValid(42, number())).toBe(true);
    });

    it("rejects NaN", () => {
      expect(isValid(NaN, number())).toBe(false);
    });

    it("rejects non-number", () => {
      expect(isValid("42", number())).toBe(false);
    });

    it("enforces integer", () => {
      expect(isValid(3.5, number({ integer: true }))).toBe(false);
      expect(isValid(3, number({ integer: true }))).toBe(true);
    });

    it("enforces min/max", () => {
      expect(isValid(5, number({ min: 10 }))).toBe(false);
      expect(isValid(15, number({ max: 10 }))).toBe(false);
    });
  });

  describe("boolean validation", () => {
    it("accepts boolean", () => {
      expect(isValid(true, boolean())).toBe(true);
    });

    it("rejects non-boolean", () => {
      expect(isValid(1, boolean())).toBe(false);
    });
  });

  describe("array validation", () => {
    it("accepts valid array", () => {
      expect(isValid([1, 2], array(number()))).toBe(true);
    });

    it("rejects non-array", () => {
      expect(isValid("nope", array(string()))).toBe(false);
    });

    it("validates items", () => {
      const errors = validate(["a", 2], array(string()));
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].path).toBe("[1]");
    });

    it("enforces minItems/maxItems", () => {
      expect(isValid([1], array(number(), { minItems: 2 }))).toBe(false);
      expect(isValid([1, 2, 3], array(number(), { maxItems: 2 }))).toBe(false);
    });
  });

  describe("object validation", () => {
    it("accepts valid object", () => {
      const schema = object({ name: string(), age: number() }, ["name"]);
      expect(isValid({ name: "Alice", age: 30 }, schema)).toBe(true);
    });

    it("rejects non-object", () => {
      expect(isValid(null, object({}))).toBe(false);
      expect(isValid([], object({}))).toBe(false);
    });

    it("reports missing required fields", () => {
      const schema = object({ x: number() }, ["x"]);
      const errors = validate({}, schema);
      expect(errors).toHaveLength(1);
      expect(errors[0].message).toBe("Required");
    });

    it("validates property types", () => {
      const schema = object({ x: number() });
      const errors = validate({ x: "bad" }, schema);
      expect(errors).toHaveLength(1);
    });

    it("ignores extra properties", () => {
      const schema = object({ x: number() });
      expect(isValid({ x: 1, y: 2 }, schema)).toBe(true);
    });
  });

  describe("literal validation", () => {
    it("matches exact value", () => {
      expect(isValid("yes", literal("yes"))).toBe(true);
      expect(isValid("no", literal("yes"))).toBe(false);
    });
  });

  describe("union validation", () => {
    it("accepts if any schema matches", () => {
      expect(isValid("hello", union(string(), number()))).toBe(true);
      expect(isValid(42, union(string(), number()))).toBe(true);
    });

    it("rejects if none match", () => {
      expect(isValid(true, union(string(), number()))).toBe(false);
    });
  });

  describe("any validation", () => {
    it("accepts anything", () => {
      expect(isValid(null, any())).toBe(true);
      expect(isValid(42, any())).toBe(true);
      expect(isValid("x", any())).toBe(true);
    });
  });

  describe("path reporting", () => {
    it("reports nested paths", () => {
      const schema = object({ items: array(object({ id: number() }, ["id"])) });
      const errors = validate({ items: [{}] }, schema);
      expect(errors[0].path).toBe("items[0].id");
    });
  });
});

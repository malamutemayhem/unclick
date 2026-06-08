import { describe, it, expect } from "vitest";
import { validate, isValid } from "../schema-validator.js";
import type { Schema } from "../schema-validator.js";

describe("schema-validator", () => {
  describe("string", () => {
    const s: Schema = { type: "string", minLength: 2, maxLength: 5 };
    it("passes valid string", () => { expect(isValid("hi", s)).toBe(true); });
    it("fails non-string", () => { expect(isValid(42, s)).toBe(false); });
    it("fails too short", () => { expect(isValid("a", s)).toBe(false); });
    it("fails too long", () => { expect(isValid("toolong", s)).toBe(false); });
    it("pattern validates", () => {
      expect(isValid("abc", { type: "string", pattern: "^[a-z]+$" })).toBe(true);
      expect(isValid("ABC", { type: "string", pattern: "^[a-z]+$" })).toBe(false);
    });
    it("enum validates", () => {
      expect(isValid("a", { type: "string", enum: ["a", "b"] })).toBe(true);
      expect(isValid("c", { type: "string", enum: ["a", "b"] })).toBe(false);
    });
  });

  describe("number", () => {
    it("passes valid number", () => { expect(isValid(42, { type: "number" })).toBe(true); });
    it("fails non-number", () => { expect(isValid("42", { type: "number" })).toBe(false); });
    it("integer check", () => {
      expect(isValid(3, { type: "number", integer: true })).toBe(true);
      expect(isValid(3.5, { type: "number", integer: true })).toBe(false);
    });
    it("min/max", () => {
      expect(isValid(5, { type: "number", min: 1, max: 10 })).toBe(true);
      expect(isValid(0, { type: "number", min: 1 })).toBe(false);
    });
  });

  describe("boolean", () => {
    it("passes", () => { expect(isValid(true, { type: "boolean" })).toBe(true); });
    it("fails", () => { expect(isValid(1, { type: "boolean" })).toBe(false); });
  });

  describe("null", () => {
    it("passes", () => { expect(isValid(null, { type: "null" })).toBe(true); });
    it("fails", () => { expect(isValid(undefined, { type: "null" })).toBe(false); });
  });

  describe("array", () => {
    it("passes valid array", () => {
      expect(isValid([1, 2], { type: "array", items: { type: "number" } })).toBe(true);
    });
    it("fails item validation", () => {
      expect(isValid([1, "x"], { type: "array", items: { type: "number" } })).toBe(false);
    });
    it("minItems/maxItems", () => {
      expect(isValid([1], { type: "array", minItems: 2 })).toBe(false);
      expect(isValid([1, 2, 3], { type: "array", maxItems: 2 })).toBe(false);
    });
  });

  describe("object", () => {
    const s: Schema = {
      type: "object",
      properties: { name: { type: "string" }, age: { type: "number" } },
      required: ["name"],
    };
    it("passes valid object", () => { expect(isValid({ name: "Jo", age: 5 }, s)).toBe(true); });
    it("fails missing required", () => { expect(isValid({ age: 5 }, s)).toBe(false); });
    it("additionalProperties false", () => {
      const strict: Schema = { type: "object", properties: { a: { type: "string" } }, additionalProperties: false };
      expect(isValid({ a: "x", b: 1 }, strict)).toBe(false);
    });
  });

  describe("union", () => {
    const s: Schema = { type: "union", schemas: [{ type: "string" }, { type: "number" }] };
    it("matches first", () => { expect(isValid("hi", s)).toBe(true); });
    it("matches second", () => { expect(isValid(42, s)).toBe(true); });
    it("fails none", () => { expect(isValid(true, s)).toBe(false); });
  });

  describe("validate returns paths", () => {
    it("error paths are correct", () => {
      const errors = validate({ name: 123 }, {
        type: "object",
        properties: { name: { type: "string" } },
      });
      expect(errors[0].path).toBe(".name");
    });
  });
});

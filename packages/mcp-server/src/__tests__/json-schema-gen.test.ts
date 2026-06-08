import { describe, it, expect } from "vitest";
import { inferSchema, inferSchemaFromMultiple } from "../json-schema-gen.js";

describe("json-schema-gen", () => {
  describe("inferSchema", () => {
    it("string", () => { expect(inferSchema("hello")).toEqual({ type: "string" }); });
    it("integer", () => { expect(inferSchema(42)).toEqual({ type: "integer" }); });
    it("number", () => { expect(inferSchema(3.14)).toEqual({ type: "number" }); });
    it("boolean", () => { expect(inferSchema(true)).toEqual({ type: "boolean" }); });
    it("null", () => { expect(inferSchema(null)).toEqual({ type: "null" }); });

    it("array of strings", () => {
      const s = inferSchema(["a", "b"]);
      expect(s.type).toBe("array");
      expect(s.items).toEqual({ type: "string" });
    });

    it("empty array", () => {
      expect(inferSchema([])).toEqual({ type: "array", items: {} });
    });

    it("object", () => {
      const s = inferSchema({ name: "Jo", age: 5 });
      expect(s.type).toBe("object");
      expect((s.properties as Record<string, unknown>)["name"]).toEqual({ type: "string" });
      expect((s.required as string[])).toContain("name");
    });
  });

  describe("inferSchemaFromMultiple", () => {
    it("merges compatible objects", () => {
      const s = inferSchemaFromMultiple([{ a: 1, b: "x" }, { a: 2, b: "y", c: true }]);
      expect(s.type).toBe("object");
      expect((s.required as string[])).toContain("a");
      expect((s.required as string[])).toContain("b");
    });

    it("widens integer to number", () => {
      const s = inferSchemaFromMultiple([1, 3.5]);
      expect(s.type).toBe("number");
    });

    it("returns empty for empty array", () => {
      expect(inferSchemaFromMultiple([])).toEqual({});
    });
  });
});

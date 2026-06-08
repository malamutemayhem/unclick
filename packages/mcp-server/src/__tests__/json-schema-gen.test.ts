import { describe, it, expect } from "vitest";
import { infer, inferFromSamples } from "../json-schema-gen.js";

describe("infer", () => {
  it("infers string type", () => {
    expect(infer("hello")).toEqual({ type: "string" });
  });

  it("infers integer type", () => {
    expect(infer(42)).toEqual({ type: "integer" });
  });

  it("infers number type for floats", () => {
    expect(infer(3.14)).toEqual({ type: "number" });
  });

  it("infers boolean type", () => {
    expect(infer(true)).toEqual({ type: "boolean" });
  });

  it("infers null type", () => {
    expect(infer(null)).toEqual({ type: "null" });
  });

  it("infers object type", () => {
    const schema = infer({ name: "Alice", age: 30 });
    expect(schema.type).toBe("object");
    expect(schema.properties?.name).toEqual({ type: "string" });
    expect(schema.properties?.age).toEqual({ type: "integer" });
    expect(schema.required).toContain("name");
    expect(schema.required).toContain("age");
  });

  it("infers array type", () => {
    const schema = infer([1, 2, 3]);
    expect(schema.type).toBe("array");
    expect(schema.items).toEqual({ type: "integer" });
  });

  it("infers empty array", () => {
    const schema = infer([]);
    expect(schema.type).toBe("array");
  });

  it("infers nested objects", () => {
    const schema = infer({ user: { name: "Alice" } });
    expect(schema.properties?.user?.type).toBe("object");
    expect(schema.properties?.user?.properties?.name?.type).toBe("string");
  });
});

describe("inferFromSamples", () => {
  it("merges consistent samples", () => {
    const schema = inferFromSamples([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
    expect(schema.type).toBe("object");
    expect(schema.properties?.name?.type).toBe("string");
    expect(schema.properties?.age?.type).toBe("integer");
  });

  it("handles empty samples", () => {
    expect(inferFromSamples([])).toEqual({});
  });

  it("handles single sample", () => {
    expect(inferFromSamples([42])).toEqual({ type: "integer" });
  });

  it("marks optional fields from missing keys", () => {
    const schema = inferFromSamples([
      { name: "Alice", age: 30 },
      { name: "Bob" },
    ]);
    expect(schema.required).not.toContain("age");
    expect(schema.required).toContain("name");
  });
});

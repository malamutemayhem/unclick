import { describe, it, expect } from "vitest";
import { validateStructured, coerce, applyDefaults } from "../structured-output.js";

describe("validateStructured", () => {
  it("validates string type", () => {
    const errors = validateStructured("hello", { type: "string" });
    expect(errors).toEqual([]);
  });

  it("rejects wrong type", () => {
    const errors = validateStructured(42, { type: "string" });
    expect(errors.length).toBe(1);
    expect(errors[0].message).toContain("Expected string");
  });

  it("validates object with required", () => {
    const schema = {
      type: "object" as const,
      required: ["name"],
      properties: { name: { type: "string" as const } },
    };
    expect(validateStructured({ name: "Alice" }, schema)).toEqual([]);
    expect(validateStructured({}, schema).length).toBe(1);
  });

  it("validates nested objects", () => {
    const schema = {
      type: "object" as const,
      properties: {
        address: {
          type: "object" as const,
          properties: { city: { type: "string" as const } },
        },
      },
    };
    const errors = validateStructured({ address: { city: 123 } }, schema);
    expect(errors.length).toBe(1);
    expect(errors[0].path).toBe("$.address.city");
  });

  it("validates array items", () => {
    const schema = { type: "array" as const, items: { type: "number" as const } };
    expect(validateStructured([1, 2, 3], schema)).toEqual([]);
    expect(validateStructured([1, "two"], schema).length).toBe(1);
  });

  it("validates string constraints", () => {
    const schema = { type: "string" as const, minLength: 3, maxLength: 5 };
    expect(validateStructured("ab", schema).length).toBe(1);
    expect(validateStructured("abcdef", schema).length).toBe(1);
    expect(validateStructured("abc", schema)).toEqual([]);
  });

  it("validates number range", () => {
    const schema = { type: "number" as const, minimum: 0, maximum: 100 };
    expect(validateStructured(-1, schema).length).toBe(1);
    expect(validateStructured(101, schema).length).toBe(1);
    expect(validateStructured(50, schema)).toEqual([]);
  });

  it("validates enum", () => {
    const schema = { type: "string" as const, enum: ["a", "b", "c"] };
    expect(validateStructured("a", schema)).toEqual([]);
    expect(validateStructured("d", schema).length).toBe(1);
  });

  it("validates pattern", () => {
    const schema = { type: "string" as const, pattern: "^[a-z]+$" };
    expect(validateStructured("abc", schema)).toEqual([]);
    expect(validateStructured("ABC", schema).length).toBe(1);
  });

  it("supports union types", () => {
    const schema = { type: ["string", "null"] as ("string" | "null")[] };
    expect(validateStructured("hello", schema)).toEqual([]);
    expect(validateStructured(null, schema)).toEqual([]);
    expect(validateStructured(42, schema).length).toBe(1);
  });
});

describe("coerce", () => {
  it("coerces string to number", () => {
    expect(coerce("42", { type: "number" })).toBe(42);
  });

  it("coerces to boolean", () => {
    expect(coerce("true", { type: "boolean" })).toBe(true);
    expect(coerce("false", { type: "boolean" })).toBe(false);
  });

  it("wraps non-array in array", () => {
    expect(coerce("x", { type: "array" })).toEqual(["x"]);
  });

  it("coerces number to string", () => {
    expect(coerce(42, { type: "string" })).toBe("42");
  });
});

describe("applyDefaults", () => {
  it("applies top-level default", () => {
    expect(applyDefaults(undefined, { type: "string", default: "hi" })).toBe("hi");
  });

  it("applies nested defaults", () => {
    const schema = {
      type: "object" as const,
      properties: {
        name: { type: "string" as const, default: "anon" },
        age: { type: "number" as const },
      },
    };
    expect(applyDefaults({ age: 30 }, schema)).toEqual({ name: "anon", age: 30 });
  });

  it("does not override existing values", () => {
    expect(applyDefaults("existing", { type: "string", default: "hi" })).toBe("existing");
  });
});

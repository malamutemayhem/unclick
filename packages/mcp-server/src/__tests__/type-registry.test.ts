import { describe, it, expect } from "vitest";
import { TypeRegistry } from "../type-registry.js";

describe("TypeRegistry", () => {
  it("has built-in primitives", () => {
    const reg = new TypeRegistry();
    expect(reg.has("string")).toBe(true);
    expect(reg.has("number")).toBe(true);
    expect(reg.has("boolean")).toBe(true);
    expect(reg.has("null")).toBe(true);
    expect(reg.has("any")).toBe(true);
  });

  it("validates primitives", () => {
    const reg = new TypeRegistry();
    expect(reg.validate("string", "hello")).toBe(true);
    expect(reg.validate("string", 42)).toBe(false);
    expect(reg.validate("number", 42)).toBe(true);
    expect(reg.validate("boolean", true)).toBe(true);
    expect(reg.validate("null", null)).toBe(true);
    expect(reg.validate("null", 0)).toBe(false);
    expect(reg.validate("any", "anything")).toBe(true);
  });

  it("defines and validates structs", () => {
    const reg = new TypeRegistry();
    reg.defineStruct("User", [
      { name: "name", type: "string" },
      { name: "age", type: "number" },
      { name: "bio", type: "string", required: false },
    ]);
    expect(reg.validate("User", { name: "Alice", age: 30 })).toBe(true);
    expect(reg.validate("User", { name: "Alice", age: 30, bio: "hi" })).toBe(true);
    expect(reg.validate("User", { name: "Alice" })).toBe(false); // missing required age
    expect(reg.validate("User", { name: "Alice", age: "thirty" })).toBe(false); // wrong type
    expect(reg.validate("User", null)).toBe(false);
    expect(reg.validate("User", "string")).toBe(false);
  });

  it("defines and validates enums", () => {
    const reg = new TypeRegistry();
    reg.defineEnum("Color", ["red", "green", "blue"]);
    expect(reg.validate("Color", "red")).toBe(true);
    expect(reg.validate("Color", "yellow")).toBe(false);
    expect(reg.validate("Color", 42)).toBe(false);
  });

  it("defines and validates arrays", () => {
    const reg = new TypeRegistry();
    reg.defineArray("Numbers", "number");
    expect(reg.validate("Numbers", [1, 2, 3])).toBe(true);
    expect(reg.validate("Numbers", [])).toBe(true);
    expect(reg.validate("Numbers", [1, "two"])).toBe(false);
    expect(reg.validate("Numbers", "not-array")).toBe(false);
  });

  it("defines and validates optionals", () => {
    const reg = new TypeRegistry();
    reg.defineOptional("MaybeString", "string");
    expect(reg.validate("MaybeString", "hello")).toBe(true);
    expect(reg.validate("MaybeString", null)).toBe(true);
    expect(reg.validate("MaybeString", undefined)).toBe(true);
    expect(reg.validate("MaybeString", 42)).toBe(false);
  });

  it("defines and validates unions", () => {
    const reg = new TypeRegistry();
    reg.defineUnion("StringOrNumber", ["string", "number"]);
    expect(reg.validate("StringOrNumber", "hi")).toBe(true);
    expect(reg.validate("StringOrNumber", 42)).toBe(true);
    expect(reg.validate("StringOrNumber", true)).toBe(false);
  });

  it("resolves aliases", () => {
    const reg = new TypeRegistry();
    reg.defineAlias("Text", "string");
    expect(reg.validate("Text", "hello")).toBe(true);
    expect(reg.validate("Text", 42)).toBe(false);
    const resolved = reg.resolve("Text");
    expect(resolved?.name).toBe("string");
  });

  it("computes dependencies", () => {
    const reg = new TypeRegistry();
    reg.defineStruct("Address", [{ name: "street", type: "string" }]);
    reg.defineStruct("Person", [
      { name: "name", type: "string" },
      { name: "address", type: "Address" },
    ]);
    const deps = reg.dependencies("Person");
    expect(deps.has("Address")).toBe(true);
    expect(deps.has("string")).toBe(true);
    expect(deps.has("Person")).toBe(false);
  });

  it("lists all types and counts", () => {
    const reg = new TypeRegistry();
    reg.defineEnum("Status", ["active", "inactive"]);
    const all = reg.allTypes();
    expect(all).toContain("string");
    expect(all).toContain("Status");
    expect(reg.typeCount()).toBeGreaterThanOrEqual(6);
  });

  it("returns undefined for unknown types", () => {
    const reg = new TypeRegistry();
    expect(reg.get("Unknown")).toBeUndefined();
    expect(reg.resolve("Unknown")).toBeUndefined();
    expect(reg.validate("Unknown", "x")).toBe(false);
  });

  it("validates nested struct types", () => {
    const reg = new TypeRegistry();
    reg.defineStruct("Point", [
      { name: "x", type: "number" },
      { name: "y", type: "number" },
    ]);
    reg.defineStruct("Line", [
      { name: "start", type: "Point" },
      { name: "end", type: "Point" },
    ]);
    expect(reg.validate("Line", { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } })).toBe(true);
    expect(reg.validate("Line", { start: { x: 0, y: "bad" }, end: { x: 1, y: 1 } })).toBe(false);
  });
});

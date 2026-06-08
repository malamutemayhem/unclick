import { describe, it, expect } from "vitest";
import { deepFreeze, isDeepFrozen, frozenCopy } from "../deep-freeze.js";

describe("deepFreeze", () => {
  it("freezes top-level properties", () => {
    const obj = deepFreeze({ a: 1, b: "hi" });
    expect(() => { (obj as Record<string, unknown>).a = 2; }).toThrow();
  });

  it("freezes nested objects", () => {
    const obj = deepFreeze({ nested: { value: 1 } });
    expect(() => { (obj as Record<string, unknown>).nested = {}; }).toThrow();
  });

  it("freezes arrays", () => {
    const obj = deepFreeze({ items: [1, 2, 3] });
    expect(() => { (obj.items as number[]).push(4); }).toThrow();
  });

  it("returns the same object", () => {
    const original = { x: 1 };
    const frozen = deepFreeze(original);
    expect(frozen).toBe(original);
  });
});

describe("isDeepFrozen", () => {
  it("returns true for primitives", () => {
    expect(isDeepFrozen(42)).toBe(true);
    expect(isDeepFrozen("hello")).toBe(true);
    expect(isDeepFrozen(null)).toBe(true);
  });

  it("returns false for unfrozen object", () => {
    expect(isDeepFrozen({ a: 1 })).toBe(false);
  });

  it("returns false for shallow-frozen with unfrozen nested", () => {
    const obj = Object.freeze({ nested: { a: 1 } });
    expect(isDeepFrozen(obj)).toBe(false);
  });

  it("returns true for deep-frozen object", () => {
    expect(isDeepFrozen(deepFreeze({ nested: { a: 1 } }))).toBe(true);
  });
});

describe("frozenCopy", () => {
  it("creates an independent frozen copy", () => {
    const original = { a: 1, nested: { b: 2 } };
    const copy = frozenCopy(original);
    original.a = 99;
    expect(copy.a).toBe(1);
    expect(isDeepFrozen(copy)).toBe(true);
  });
});

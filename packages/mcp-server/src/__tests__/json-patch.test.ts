import { describe, it, expect } from "vitest";
import { applyPatch } from "../json-patch.js";

describe("json-patch", () => {
  it("adds a property", () => {
    const result = applyPatch({ a: 1 }, [{ op: "add", path: "/b", value: 2 }]);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("removes a property", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "remove", path: "/b" }]);
    expect(result).toEqual({ a: 1 });
  });

  it("replaces a property", () => {
    const result = applyPatch({ a: 1 }, [{ op: "replace", path: "/a", value: 99 }]);
    expect(result).toEqual({ a: 99 });
  });

  it("moves a property", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "move", from: "/a", path: "/c" }]);
    expect(result).toEqual({ b: 2, c: 1 });
  });

  it("copies a property", () => {
    const result = applyPatch({ a: 1 }, [{ op: "copy", from: "/a", path: "/b" }]);
    expect(result).toEqual({ a: 1, b: 1 });
  });

  it("test passes when value matches", () => {
    expect(() =>
      applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 1 }])
    ).not.toThrow();
  });

  it("test throws when value mismatches", () => {
    expect(() =>
      applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 2 }])
    ).toThrow("Test failed");
  });

  it("works with nested paths", () => {
    const result = applyPatch({ a: { b: { c: 1 } } }, [
      { op: "replace", path: "/a/b/c", value: 42 },
    ]);
    expect(result).toEqual({ a: { b: { c: 42 } } });
  });

  it("works with arrays", () => {
    const result = applyPatch({ items: [1, 2, 3] }, [
      { op: "add", path: "/items/1", value: 99 },
    ]);
    expect(result).toEqual({ items: [1, 99, 2, 3] });
  });

  it("removes from array", () => {
    const result = applyPatch({ items: [1, 2, 3] }, [
      { op: "remove", path: "/items/1" },
    ]);
    expect(result).toEqual({ items: [1, 3] });
  });

  it("appends to array with dash", () => {
    const result = applyPatch({ items: [1, 2] }, [
      { op: "add", path: "/items/-", value: 3 },
    ]);
    expect(result).toEqual({ items: [1, 2, 3] });
  });

  it("applies multiple ops in sequence", () => {
    const result = applyPatch({ x: 1 }, [
      { op: "add", path: "/y", value: 2 },
      { op: "replace", path: "/x", value: 10 },
      { op: "remove", path: "/y" },
    ]);
    expect(result).toEqual({ x: 10 });
  });

  it("does not mutate original doc", () => {
    const original = { a: 1, b: { c: 2 } };
    applyPatch(original, [{ op: "replace", path: "/b/c", value: 99 }]);
    expect(original.b.c).toBe(2);
  });
});

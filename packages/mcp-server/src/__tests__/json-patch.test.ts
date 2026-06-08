import { describe, it, expect } from "vitest";
import { applyPatch, getPath } from "../json-patch.js";

describe("json-patch", () => {
  it("add operation", () => {
    const result = applyPatch({ a: 1 }, [{ op: "add", path: "/b", value: 2 }]);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("remove operation", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "remove", path: "/b" }]);
    expect(result).toEqual({ a: 1 });
  });

  it("replace operation", () => {
    const result = applyPatch({ a: 1 }, [{ op: "replace", path: "/a", value: 99 }]);
    expect(result).toEqual({ a: 99 });
  });

  it("move operation", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "move", from: "/a", path: "/c" }]);
    expect(result).toEqual({ b: 2, c: 1 });
  });

  it("copy operation", () => {
    const result = applyPatch({ a: 1 }, [{ op: "copy", from: "/a", path: "/b" }]);
    expect(result).toEqual({ a: 1, b: 1 });
  });

  it("test operation passes", () => {
    expect(() => applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 1 }])).not.toThrow();
  });

  it("test operation fails", () => {
    expect(() => applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 2 }])).toThrow("Test failed");
  });

  it("nested path operations", () => {
    const result = applyPatch({ a: { b: 1 } }, [{ op: "replace", path: "/a/b", value: 42 }]);
    expect(result).toEqual({ a: { b: 42 } });
  });

  it("array add with index", () => {
    const result = applyPatch({ items: [1, 3] }, [{ op: "add", path: "/items/1", value: 2 }]);
    expect(result).toEqual({ items: [1, 2, 3] });
  });

  it("array append with dash", () => {
    const result = applyPatch({ items: [1, 2] }, [{ op: "add", path: "/items/-", value: 3 }]);
    expect(result).toEqual({ items: [1, 2, 3] });
  });

  it("multiple operations in sequence", () => {
    const result = applyPatch({ x: 1 }, [
      { op: "add", path: "/y", value: 2 },
      { op: "replace", path: "/x", value: 10 },
    ]);
    expect(result).toEqual({ x: 10, y: 2 });
  });
});

describe("getPath", () => {
  it("resolves root", () => {
    expect(getPath({ a: 1 }, "")).toEqual({ a: 1 });
  });

  it("resolves nested", () => {
    expect(getPath({ a: { b: { c: 3 } } }, "/a/b/c")).toBe(3);
  });

  it("resolves array index", () => {
    expect(getPath([10, 20, 30], "/1")).toBe(20);
  });
});

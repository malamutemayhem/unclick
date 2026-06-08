import { describe, it, expect } from "vitest";
import { applyPatch, diff } from "../json-patch.js";

describe("applyPatch", () => {
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
    const result = applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 1 }]);
    expect(result).toEqual({ a: 1 });
  });

  it("test operation fails", () => {
    expect(() => applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 2 }])).toThrow("Test failed");
  });

  it("nested path", () => {
    const result = applyPatch({ a: { b: 1 } }, [{ op: "replace", path: "/a/b", value: 2 }]);
    expect(result).toEqual({ a: { b: 2 } });
  });

  it("array add", () => {
    const result = applyPatch({ items: [1, 2] }, [{ op: "add", path: "/items/-", value: 3 }]);
    expect(result).toEqual({ items: [1, 2, 3] });
  });

  it("multiple operations", () => {
    const result = applyPatch({ x: 1 }, [
      { op: "add", path: "/y", value: 2 },
      { op: "replace", path: "/x", value: 10 },
    ]);
    expect(result).toEqual({ x: 10, y: 2 });
  });
});

describe("diff", () => {
  it("produces empty patch for identical objects", () => {
    expect(diff({ a: 1 }, { a: 1 })).toEqual([]);
  });

  it("detects additions", () => {
    const ops = diff({ a: 1 }, { a: 1, b: 2 });
    expect(ops.some((op) => op.op === "add" && op.path === "/b")).toBe(true);
  });

  it("detects removals", () => {
    const ops = diff({ a: 1, b: 2 }, { a: 1 });
    expect(ops.some((op) => op.op === "remove" && op.path === "/b")).toBe(true);
  });

  it("detects changes", () => {
    const ops = diff({ a: 1 }, { a: 2 });
    expect(ops.some((op) => op.op === "replace")).toBe(true);
  });

  it("roundtrips", () => {
    const before = { name: "Alice", age: 30, tags: ["a"] };
    const after = { name: "Bob", age: 30, tags: ["a", "b"] };
    const ops = diff(before, after);
    const result = applyPatch(before, ops);
    expect(result).toEqual(after);
  });
});

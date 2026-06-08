import { describe, it, expect } from "vitest";
import { applyPatch, createPatch, testPatch, PatchOp } from "../json-patch.js";

describe("applyPatch", () => {
  it("add operation", () => {
    const doc = { a: 1 };
    const result = applyPatch(doc, [{ op: "add", path: "/b", value: 2 }]);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("remove operation", () => {
    const doc = { a: 1, b: 2 };
    const result = applyPatch(doc, [{ op: "remove", path: "/b" }]);
    expect(result).toEqual({ a: 1 });
  });

  it("replace operation", () => {
    const doc = { a: 1 };
    const result = applyPatch(doc, [{ op: "replace", path: "/a", value: 99 }]);
    expect(result).toEqual({ a: 99 });
  });

  it("move operation", () => {
    const doc = { a: 1, b: 2 };
    const result = applyPatch(doc, [{ op: "move", from: "/a", path: "/c" }]);
    expect(result).toEqual({ b: 2, c: 1 });
  });

  it("copy operation", () => {
    const doc = { a: 1 };
    const result = applyPatch(doc, [{ op: "copy", from: "/a", path: "/b" }]);
    expect(result).toEqual({ a: 1, b: 1 });
  });

  it("test operation passes", () => {
    const doc = { a: 1 };
    const result = applyPatch(doc, [{ op: "test", path: "/a", value: 1 }]);
    expect(result).toEqual({ a: 1 });
  });

  it("test operation fails", () => {
    const doc = { a: 1 };
    expect(() => applyPatch(doc, [{ op: "test", path: "/a", value: 2 }])).toThrow();
  });

  it("does not mutate original", () => {
    const doc = { a: 1 };
    applyPatch(doc, [{ op: "add", path: "/b", value: 2 }]);
    expect(doc).toEqual({ a: 1 });
  });

  it("applies multiple patches", () => {
    const doc = { a: 1 };
    const result = applyPatch(doc, [
      { op: "add", path: "/b", value: 2 },
      { op: "replace", path: "/a", value: 10 },
    ]);
    expect(result).toEqual({ a: 10, b: 2 });
  });
});

describe("createPatch", () => {
  it("detects additions", () => {
    const patches = createPatch({ a: 1 }, { a: 1, b: 2 });
    expect(patches.some((p) => p.op === "add")).toBe(true);
  });

  it("detects removals", () => {
    const patches = createPatch({ a: 1, b: 2 }, { a: 1 });
    expect(patches.some((p) => p.op === "remove")).toBe(true);
  });

  it("detects replacements", () => {
    const patches = createPatch({ a: 1 }, { a: 2 });
    expect(patches.some((p) => p.op === "replace")).toBe(true);
  });

  it("returns empty for identical objects", () => {
    expect(createPatch({ a: 1 }, { a: 1 })).toEqual([]);
  });
});

describe("testPatch", () => {
  it("returns true for valid patches", () => {
    expect(testPatch({ a: 1 }, [{ op: "replace", path: "/a", value: 2 }])).toBe(true);
  });

  it("returns false for failing test op", () => {
    expect(testPatch({ a: 1 }, [{ op: "test", path: "/a", value: 999 }])).toBe(false);
  });
});

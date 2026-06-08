import { describe, it, expect } from "vitest";
import { diff, applyDiffs, hasDiffs } from "../object-differ.js";

describe("diff", () => {
  it("returns empty for identical objects", () => {
    expect(diff({ a: 1 }, { a: 1 })).toEqual([]);
  });

  it("detects added keys", () => {
    const d = diff({ a: 1 }, { a: 1, b: 2 });
    expect(d.length).toBe(1);
    expect(d[0].type).toBe("added");
    expect(d[0].path).toBe("b");
    expect(d[0].newValue).toBe(2);
  });

  it("detects removed keys", () => {
    const d = diff({ a: 1, b: 2 }, { a: 1 });
    expect(d.length).toBe(1);
    expect(d[0].type).toBe("removed");
    expect(d[0].path).toBe("b");
  });

  it("detects changed values", () => {
    const d = diff({ a: 1 }, { a: 2 });
    expect(d[0].type).toBe("changed");
    expect(d[0].oldValue).toBe(1);
    expect(d[0].newValue).toBe(2);
  });

  it("handles nested objects", () => {
    const d = diff({ a: { b: 1 } }, { a: { b: 2 } });
    expect(d[0].path).toBe("a.b");
    expect(d[0].type).toBe("changed");
  });

  it("detects primitives directly", () => {
    const d = diff(1, 2);
    expect(d[0].type).toBe("changed");
  });
});

describe("applyDiffs", () => {
  it("applies added/changed/removed", () => {
    const original = { a: 1, b: 2, c: 3 };
    const diffs = [
      { path: "a", type: "changed" as const, newValue: 10 },
      { path: "b", type: "removed" as const },
      { path: "d", type: "added" as const, newValue: 4 },
    ];
    const result = applyDiffs(original, diffs);
    expect(result.a).toBe(10);
    expect("b" in result).toBe(false);
    expect(result.d).toBe(4);
    expect(result.c).toBe(3);
  });
});

describe("hasDiffs", () => {
  it("returns false for equal", () => {
    expect(hasDiffs({ x: 1 }, { x: 1 })).toBe(false);
  });

  it("returns true for different", () => {
    expect(hasDiffs({ x: 1 }, { x: 2 })).toBe(true);
  });
});

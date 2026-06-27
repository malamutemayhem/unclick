import { describe, it, expect } from "vitest";
import { apply, diff } from "../json-patch.js";

describe("json-patch", () => {
  describe("apply", () => {
    it("add operation", () => {
      const doc = { a: 1 };
      const result = apply(doc, [{ op: "add", path: "/b", value: 2 }]);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it("remove operation", () => {
      const doc = { a: 1, b: 2 };
      const result = apply(doc, [{ op: "remove", path: "/b" }]);
      expect(result).toEqual({ a: 1 });
    });

    it("replace operation", () => {
      const doc = { a: 1 };
      const result = apply(doc, [{ op: "replace", path: "/a", value: 99 }]);
      expect(result).toEqual({ a: 99 });
    });

    it("move operation", () => {
      const doc = { a: 1, b: 2 };
      const result = apply(doc, [{ op: "move", from: "/a", path: "/c" }]);
      expect(result).toEqual({ b: 2, c: 1 });
    });

    it("copy operation", () => {
      const doc = { a: 1 };
      const result = apply(doc, [{ op: "copy", from: "/a", path: "/b" }]);
      expect(result).toEqual({ a: 1, b: 1 });
    });

    it("test operation passes", () => {
      const doc = { a: 1 };
      expect(() => apply(doc, [{ op: "test", path: "/a", value: 1 }])).not.toThrow();
    });

    it("test operation fails", () => {
      const doc = { a: 1 };
      expect(() => apply(doc, [{ op: "test", path: "/a", value: 2 }])).toThrow("Test failed");
    });

    it("nested paths", () => {
      const doc = { a: { b: { c: 1 } } };
      const result = apply(doc, [{ op: "replace", path: "/a/b/c", value: 42 }]);
      expect(result).toEqual({ a: { b: { c: 42 } } });
    });

    it("array operations", () => {
      const doc = { arr: [1, 2, 3] };
      const result = apply(doc, [{ op: "replace", path: "/arr/1", value: 99 }]);
      expect(result).toEqual({ arr: [1, 99, 3] });
    });

    it("immutable - does not modify original", () => {
      const doc = { a: 1 };
      apply(doc, [{ op: "replace", path: "/a", value: 2 }]);
      expect(doc.a).toBe(1);
    });
  });

  describe("diff", () => {
    it("returns empty for equal objects", () => {
      expect(diff({ a: 1 }, { a: 1 })).toEqual([]);
    });

    it("detects added keys", () => {
      const ops = diff({ a: 1 }, { a: 1, b: 2 });
      expect(ops.some((o) => o.op === "add" && o.path === "/b")).toBe(true);
    });

    it("detects removed keys", () => {
      const ops = diff({ a: 1, b: 2 }, { a: 1 });
      expect(ops.some((o) => o.op === "remove" && o.path === "/b")).toBe(true);
    });

    it("detects replaced values", () => {
      const ops = diff({ a: 1 }, { a: 2 });
      expect(ops.some((o) => o.op === "replace")).toBe(true);
    });

    it("roundtrips - apply(diff(a,b)) equals b", () => {
      const a = { x: 1, y: { z: 2 }, arr: [1, 2] };
      const b = { x: 10, y: { z: 3, w: 4 }, arr: [1, 3, 5] };
      const patches = diff(a, b);
      expect(apply(a, patches)).toEqual(b);
    });
  });
});

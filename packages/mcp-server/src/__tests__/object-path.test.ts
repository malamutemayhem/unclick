import { describe, it, expect } from "vitest";
import { getPath, setPath, hasPath, deletePath, flattenObject, unflattenObject } from "../object-path.js";

describe("object-path", () => {
  const obj = { a: { b: { c: 42 } }, arr: [1, { x: 2 }, 3] };

  describe("getPath", () => {
    it("gets nested value with dot notation", () => {
      expect(getPath(obj, "a.b.c")).toBe(42);
    });

    it("gets array element with bracket notation", () => {
      expect(getPath(obj, "arr[1].x")).toBe(2);
    });

    it("gets array element with dot notation", () => {
      expect(getPath(obj, "arr.0")).toBe(1);
    });

    it("returns undefined for missing path", () => {
      expect(getPath(obj, "a.b.z")).toBeUndefined();
    });

    it("returns undefined for null intermediate", () => {
      expect(getPath({ a: null }, "a.b")).toBeUndefined();
    });

    it("accepts string array path", () => {
      expect(getPath(obj, ["a", "b", "c"])).toBe(42);
    });

    it("returns the root for empty string", () => {
      expect(getPath(obj, "")).toEqual(obj);
    });
  });

  describe("setPath", () => {
    it("sets a nested value immutably", () => {
      const result = setPath(obj, "a.b.c", 99) as Record<string, unknown>;
      expect(getPath(result, "a.b.c")).toBe(99);
      expect(obj.a.b.c).toBe(42);
    });

    it("creates intermediate objects", () => {
      const result = setPath({}, "a.b.c", 1);
      expect(getPath(result, "a.b.c")).toBe(1);
    });

    it("creates intermediate arrays for numeric keys", () => {
      const result = setPath({}, "a.0.b", "x");
      expect(getPath(result, "a.0.b")).toBe("x");
    });

    it("sets array elements with bracket notation", () => {
      const result = setPath({ arr: [1, 2, 3] }, "arr[1]", 99);
      expect(getPath(result, "arr[1]")).toBe(99);
    });
  });

  describe("hasPath", () => {
    it("returns true for existing path", () => {
      expect(hasPath(obj, "a.b.c")).toBe(true);
    });

    it("returns false for missing path", () => {
      expect(hasPath(obj, "a.b.z")).toBe(false);
    });

    it("returns true for array index", () => {
      expect(hasPath(obj, "arr[0]")).toBe(true);
    });

    it("returns false for out of bounds index", () => {
      expect(hasPath(obj, "arr[5]")).toBe(false);
    });

    it("returns false for null intermediate", () => {
      expect(hasPath({ a: null }, "a.b")).toBe(false);
    });
  });

  describe("deletePath", () => {
    it("deletes a nested key immutably", () => {
      const result = deletePath(obj, "a.b.c") as Record<string, unknown>;
      expect(hasPath(result, "a.b.c")).toBe(false);
      expect(obj.a.b.c).toBe(42);
    });

    it("splices array element", () => {
      const result = deletePath({ arr: [1, 2, 3] }, "arr[1]") as Record<string, unknown>;
      expect(getPath(result, "arr")).toEqual([1, 3]);
    });

    it("returns root unchanged if path does not exist", () => {
      const src = { a: 1 };
      const result = deletePath(src, "b.c") as Record<string, unknown>;
      expect(result).toEqual({ a: 1 });
    });
  });

  describe("flattenObject", () => {
    it("flattens nested objects", () => {
      expect(flattenObject({ a: { b: 1, c: { d: 2 } } })).toEqual({
        "a.b": 1,
        "a.c.d": 2,
      });
    });

    it("leaves arrays as-is", () => {
      expect(flattenObject({ a: [1, 2] })).toEqual({ a: [1, 2] });
    });

    it("returns empty for empty object", () => {
      expect(flattenObject({})).toEqual({});
    });
  });

  describe("unflattenObject", () => {
    it("unflattens dotted keys", () => {
      const result = unflattenObject({ "a.b": 1, "a.c": 2 });
      expect(result).toEqual({ a: { b: 1, c: 2 } });
    });

    it("roundtrips with flattenObject", () => {
      const original = { x: { y: { z: 5 } }, top: "hello" };
      expect(unflattenObject(flattenObject(original))).toEqual(original);
    });
  });
});

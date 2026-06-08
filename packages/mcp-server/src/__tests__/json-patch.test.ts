import { describe, it, expect } from "vitest";
import { applyPatch } from "../json-patch.js";

describe("json-patch", () => {
  it("add to object", () => {
    const result = applyPatch({ a: 1 }, [{ op: "add", path: "/b", value: 2 }]);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("add to array", () => {
    const result = applyPatch({ arr: [1, 3] }, [{ op: "add", path: "/arr/1", value: 2 }]);
    expect(result).toEqual({ arr: [1, 2, 3] });
  });

  it("add to end of array with -", () => {
    const result = applyPatch({ arr: [1] }, [{ op: "add", path: "/arr/-", value: 2 }]);
    expect(result).toEqual({ arr: [1, 2] });
  });

  it("remove from object", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "remove", path: "/b" }]);
    expect(result).toEqual({ a: 1 });
  });

  it("remove from array", () => {
    const result = applyPatch({ arr: [1, 2, 3] }, [{ op: "remove", path: "/arr/1" }]);
    expect(result).toEqual({ arr: [1, 3] });
  });

  it("replace value", () => {
    const result = applyPatch({ a: 1 }, [{ op: "replace", path: "/a", value: 99 }]);
    expect(result).toEqual({ a: 99 });
  });

  it("move value", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "move", from: "/a", path: "/c" }]);
    expect(result).toEqual({ b: 2, c: 1 });
  });

  it("copy value", () => {
    const result = applyPatch({ a: 1 }, [{ op: "copy", from: "/a", path: "/b" }]);
    expect(result).toEqual({ a: 1, b: 1 });
  });

  it("test passes", () => {
    const result = applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 1 }]);
    expect(result).toEqual({ a: 1 });
  });

  it("test fails", () => {
    expect(() => applyPatch({ a: 1 }, [{ op: "test", path: "/a", value: 2 }])).toThrow("Test failed");
  });

  it("does not mutate original", () => {
    const original = { a: 1 };
    applyPatch(original, [{ op: "add", path: "/b", value: 2 }]);
    expect(original).toEqual({ a: 1 });
  });

  it("multiple operations", () => {
    const result = applyPatch({ a: 1 }, [
      { op: "add", path: "/b", value: 2 },
      { op: "remove", path: "/a" },
      { op: "replace", path: "/b", value: 3 },
    ]);
    expect(result).toEqual({ b: 3 });
  });

  it("handles tilde escaping", () => {
    const result = applyPatch({ "a/b": 1, "c~d": 2 }, [
      { op: "replace", path: "/a~1b", value: 10 },
      { op: "replace", path: "/c~0d", value: 20 },
    ]);
    expect(result).toEqual({ "a/b": 10, "c~d": 20 });
  });
});

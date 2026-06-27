import { describe, it, expect } from "vitest";
import { diff, applyPatch } from "../diff-patch.js";

describe("diff", () => {
  it("detects added keys", () => {
    const ops = diff({}, { a: 1 });
    expect(ops).toEqual([{ op: "add", path: "a", value: 1 }]);
  });

  it("detects removed keys", () => {
    const ops = diff({ a: 1 }, {});
    expect(ops).toEqual([{ op: "remove", path: "a", oldValue: 1 }]);
  });

  it("detects replaced values", () => {
    const ops = diff({ a: 1 }, { a: 2 });
    expect(ops).toEqual([{ op: "replace", path: "a", value: 2, oldValue: 1 }]);
  });

  it("ignores unchanged values", () => {
    const ops = diff({ a: 1, b: 2 }, { a: 1, b: 2 });
    expect(ops).toEqual([]);
  });

  it("diffs nested objects", () => {
    const ops = diff(
      { config: { timeout: 5000 } },
      { config: { timeout: 10000 } },
    );
    expect(ops).toEqual([
      { op: "replace", path: "config.timeout", value: 10000, oldValue: 5000 },
    ]);
  });

  it("handles mixed changes", () => {
    const ops = diff(
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 99, d: 4 },
    );
    expect(ops).toHaveLength(3);
    expect(ops.find((o) => o.op === "replace")?.path).toBe("b");
    expect(ops.find((o) => o.op === "remove")?.path).toBe("c");
    expect(ops.find((o) => o.op === "add")?.path).toBe("d");
  });

  it("compares arrays by deep equality", () => {
    const ops = diff({ items: [1, 2] }, { items: [1, 2] });
    expect(ops).toEqual([]);
    const ops2 = diff({ items: [1, 2] }, { items: [1, 3] });
    expect(ops2).toHaveLength(1);
  });
});

describe("applyPatch", () => {
  it("applies add operation", () => {
    const result = applyPatch({}, [{ op: "add", path: "a", value: 1 }]);
    expect(result).toEqual({ a: 1 });
  });

  it("applies remove operation", () => {
    const result = applyPatch({ a: 1, b: 2 }, [{ op: "remove", path: "a", oldValue: 1 }]);
    expect(result).toEqual({ b: 2 });
  });

  it("applies replace operation", () => {
    const result = applyPatch({ a: 1 }, [{ op: "replace", path: "a", value: 2, oldValue: 1 }]);
    expect(result).toEqual({ a: 2 });
  });

  it("applies nested operations", () => {
    const result = applyPatch(
      { config: { timeout: 5000 } },
      [{ op: "replace", path: "config.timeout", value: 10000, oldValue: 5000 }],
    );
    expect(result).toEqual({ config: { timeout: 10000 } });
  });

  it("round-trips with diff", () => {
    const before = { a: 1, b: { c: 2 }, d: 3 };
    const after = { a: 1, b: { c: 99 }, e: 4 };
    const ops = diff(before, after);
    const result = applyPatch(before, ops);
    expect(result).toEqual(after);
  });

  it("does not mutate original", () => {
    const original = { a: 1 };
    applyPatch(original, [{ op: "replace", path: "a", value: 2, oldValue: 1 }]);
    expect(original.a).toBe(1);
  });
});

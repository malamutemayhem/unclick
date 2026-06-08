import { describe, it, expect } from "vitest";
import { schemaDiff, hasDiffs, summarize } from "../schema-diff.js";

describe("schema-diff", () => {
  it("detects added keys", () => {
    const diffs = schemaDiff({ a: 1 }, { a: 1, b: 2 });
    expect(diffs).toContainEqual({ path: "b", kind: "added", after: "number" });
  });

  it("detects removed keys", () => {
    const diffs = schemaDiff({ a: 1, b: 2 }, { a: 1 });
    expect(diffs).toContainEqual({ path: "b", kind: "removed", before: "number" });
  });

  it("detects changed values", () => {
    const diffs = schemaDiff({ a: 1 }, { a: "hello" });
    expect(diffs.length).toBe(1);
    expect(diffs[0].kind).toBe("changed");
  });

  it("detects nested changes", () => {
    const before = { config: { host: "localhost", port: 3000 } };
    const after = { config: { host: "localhost", port: 8080 } };
    const diffs = schemaDiff(before, after);
    expect(diffs).toContainEqual({ path: "config.port", kind: "changed", before: 3000, after: 8080 });
  });

  it("detects array changes", () => {
    const diffs = schemaDiff({ items: [1, 2] }, { items: [1, 2, 3] });
    expect(diffs.some((d) => d.kind === "added")).toBe(true);
  });

  it("returns empty for identical objects", () => {
    expect(schemaDiff({ a: 1 }, { a: 1 })).toEqual([]);
  });

  it("hasDiffs shortcut", () => {
    expect(hasDiffs({ a: 1 }, { a: 2 })).toBe(true);
    expect(hasDiffs({ a: 1 }, { a: 1 })).toBe(false);
  });

  it("summarize counts by kind", () => {
    const diffs = schemaDiff({ a: 1, b: 2 }, { a: 10, c: 3 });
    const summary = summarize(diffs);
    expect(summary.added).toBe(1);
    expect(summary.removed).toBe(1);
    expect(summary.changed).toBe(1);
  });
});

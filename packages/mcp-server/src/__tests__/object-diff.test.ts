import { describe, it, expect } from "vitest";
import { diffObjects, hasChanges, summarizeChanges } from "../object-diff.js";

describe("diffObjects", () => {
  it("detects added keys", () => {
    const changes = diffObjects({}, { name: "Alice" });
    expect(changes).toHaveLength(1);
    expect(changes[0]).toEqual({ key: "name", type: "added", newValue: "Alice" });
  });

  it("detects removed keys", () => {
    const changes = diffObjects({ name: "Alice" }, {});
    expect(changes).toHaveLength(1);
    expect(changes[0]).toEqual({ key: "name", type: "removed", oldValue: "Alice" });
  });

  it("detects changed values", () => {
    const changes = diffObjects({ name: "Alice" }, { name: "Bob" });
    expect(changes).toHaveLength(1);
    expect(changes[0]).toEqual({ key: "name", type: "changed", oldValue: "Alice", newValue: "Bob" });
  });

  it("returns empty for identical objects", () => {
    expect(diffObjects({ a: 1, b: "x" }, { a: 1, b: "x" })).toEqual([]);
  });

  it("handles mixed changes", () => {
    const changes = diffObjects(
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 99, d: 4 },
    );
    expect(changes).toHaveLength(3);
    expect(changes.find((c) => c.key === "b")?.type).toBe("changed");
    expect(changes.find((c) => c.key === "c")?.type).toBe("removed");
    expect(changes.find((c) => c.key === "d")?.type).toBe("added");
  });

  it("compares nested objects by value", () => {
    const changes = diffObjects(
      { config: { port: 3000 } },
      { config: { port: 3000 } },
    );
    expect(changes).toHaveLength(0);
  });

  it("detects nested object changes", () => {
    const changes = diffObjects(
      { config: { port: 3000 } },
      { config: { port: 8080 } },
    );
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("changed");
  });

  it("compares arrays by value", () => {
    expect(diffObjects({ tags: [1, 2] }, { tags: [1, 2] })).toHaveLength(0);
    expect(diffObjects({ tags: [1, 2] }, { tags: [1, 3] })).toHaveLength(1);
  });
});

describe("hasChanges", () => {
  it("returns false for identical objects", () => {
    expect(hasChanges({ a: 1 }, { a: 1 })).toBe(false);
  });

  it("returns true for different objects", () => {
    expect(hasChanges({ a: 1 }, { a: 2 })).toBe(true);
  });
});

describe("summarizeChanges", () => {
  it("formats a summary string", () => {
    const changes = diffObjects({ a: 1, b: 2 }, { a: 99, c: 3 });
    const summary = summarizeChanges(changes);
    expect(summary).toContain("~a");
    expect(summary).toContain("-b");
    expect(summary).toContain("+c");
  });

  it("returns 'no changes' for empty diff", () => {
    expect(summarizeChanges([])).toBe("no changes");
  });
});

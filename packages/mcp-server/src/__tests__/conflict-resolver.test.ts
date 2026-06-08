import { describe, it, expect } from "vitest";
import { resolveConflict, detectConflicts, autoResolve, ConflictItem } from "../conflict-resolver.js";

describe("resolveConflict", () => {
  it("returns undefined for empty", () => {
    expect(resolveConflict([])).toBeUndefined();
  });

  it("returns only value for single item", () => {
    expect(resolveConflict([{ source: "a", value: 42, timestamp: 1 }])).toBe(42);
  });

  it("latest picks most recent", () => {
    const items: ConflictItem<string>[] = [
      { source: "a", value: "old", timestamp: 1 },
      { source: "b", value: "new", timestamp: 2 },
    ];
    expect(resolveConflict(items, "latest")).toBe("new");
  });

  it("highest-priority picks highest", () => {
    const items: ConflictItem<string>[] = [
      { source: "a", value: "low", timestamp: 1, priority: 1 },
      { source: "b", value: "high", timestamp: 2, priority: 10 },
    ];
    expect(resolveConflict(items, "highest-priority")).toBe("high");
  });

  it("first picks first item", () => {
    const items: ConflictItem<string>[] = [
      { source: "a", value: "first", timestamp: 1 },
      { source: "b", value: "second", timestamp: 2 },
    ];
    expect(resolveConflict(items, "first")).toBe("first");
  });

  it("merge combines objects", () => {
    const items: ConflictItem<Record<string, number>>[] = [
      { source: "a", value: { x: 1 }, timestamp: 1 },
      { source: "b", value: { y: 2 }, timestamp: 2 },
    ];
    expect(resolveConflict(items, "merge")).toEqual({ x: 1, y: 2 });
  });
});

describe("detectConflicts", () => {
  it("detects conflicting values", () => {
    const records = [
      { source: "a", data: { name: "Alice", age: 30 } },
      { source: "b", data: { name: "Bob", age: 30 } },
    ];
    const conflicts = detectConflicts(records);
    expect(conflicts.length).toBe(1);
    expect(conflicts[0].key).toBe("name");
  });

  it("no conflicts for identical data", () => {
    const records = [
      { source: "a", data: { x: 1 } },
      { source: "b", data: { x: 1 } },
    ];
    expect(detectConflicts(records).length).toBe(0);
  });
});

describe("autoResolve", () => {
  it("resolves all conflicts", () => {
    const conflicts = [{ key: "name", values: [{ source: "a", value: "Alice" }, { source: "b", value: "Bob" }] }];
    const resolved = autoResolve(conflicts, "latest");
    expect(resolved.name).toBeDefined();
  });
});

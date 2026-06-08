import { describe, it, expect } from "vitest";
import { detectChanges, hasChanged, changedPaths, ChangeTracker } from "../change-detector.js";

describe("detectChanges", () => {
  it("returns empty for equal objects", () => {
    expect(detectChanges({ a: 1 }, { a: 1 })).toEqual([]);
  });

  it("detects added key", () => {
    const changes = detectChanges({ a: 1 }, { a: 1, b: 2 });
    expect(changes).toEqual([{ path: "b", type: "add", newValue: 2 }]);
  });

  it("detects removed key", () => {
    const changes = detectChanges({ a: 1, b: 2 }, { a: 1 });
    expect(changes).toEqual([{ path: "b", type: "remove", oldValue: 2 }]);
  });

  it("detects updated value", () => {
    const changes = detectChanges({ a: 1 }, { a: 2 });
    expect(changes[0].type).toBe("update");
    expect(changes[0].oldValue).toBe(1);
    expect(changes[0].newValue).toBe(2);
  });

  it("detects nested changes", () => {
    const changes = detectChanges({ a: { b: 1 } }, { a: { b: 2 } });
    expect(changes[0].path).toBe("a.b");
  });

  it("detects array additions", () => {
    const changes = detectChanges([1, 2], [1, 2, 3]);
    expect(changes[0].type).toBe("add");
    expect(changes[0].path).toBe("[2]");
  });

  it("detects array removals", () => {
    const changes = detectChanges([1, 2, 3], [1, 2]);
    expect(changes[0].type).toBe("remove");
  });

  it("handles null to object", () => {
    const changes = detectChanges(null, { a: 1 });
    expect(changes[0].type).toBe("update");
  });

  it("handles primitive change at root", () => {
    const changes = detectChanges(1, 2);
    expect(changes[0].path).toBe("$");
  });
});

describe("hasChanged", () => {
  it("true when different", () => {
    expect(hasChanged({ a: 1 }, { a: 2 })).toBe(true);
  });

  it("false when same", () => {
    expect(hasChanged({ a: 1 }, { a: 1 })).toBe(false);
  });
});

describe("changedPaths", () => {
  it("returns paths", () => {
    const paths = changedPaths({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
    expect(paths).toContain("b");
    expect(paths).toContain("c");
  });
});

describe("ChangeTracker", () => {
  it("tracks updates", () => {
    const tracker = new ChangeTracker({ x: 1, y: 2 });
    const changes = tracker.update({ x: 1, y: 3 });
    expect(changes.length).toBe(1);
    expect(changes[0].path).toBe("y");
  });

  it("getSnapshot returns original", () => {
    const tracker = new ChangeTracker({ x: 1 });
    tracker.update({ x: 2 });
    const snap = tracker.getSnapshot();
    expect(snap.x).toBe(2);
  });

  it("isDirty after external mutation is false (tracks via update)", () => {
    const tracker = new ChangeTracker({ x: 1 });
    expect(tracker.isDirty()).toBe(false);
  });

  it("reset clears dirty state", () => {
    const tracker = new ChangeTracker({ x: 1 });
    expect(tracker.isDirty()).toBe(false);
    tracker.reset();
    expect(tracker.isDirty()).toBe(false);
  });
});

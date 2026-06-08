import { describe, it, expect } from "vitest";
import { DiffTracker } from "../diff-tracker.js";

describe("DiffTracker", () => {
  it("tracks state", () => {
    const dt = new DiffTracker({ name: "Alice", age: 30 });
    expect(dt.state).toEqual({ name: "Alice", age: 30 });
  });

  it("set updates state", () => {
    const dt = new DiffTracker({ x: 1 });
    dt.set({ x: 2 });
    expect(dt.state.x).toBe(2);
  });

  it("undo reverts last change", () => {
    const dt = new DiffTracker({ x: 1 });
    dt.set({ x: 2 });
    dt.set({ x: 3 });
    dt.undo();
    expect(dt.state.x).toBe(2);
  });

  it("redo restores undone change", () => {
    const dt = new DiffTracker({ x: 1 });
    dt.set({ x: 2 });
    dt.undo();
    dt.redo();
    expect(dt.state.x).toBe(2);
  });

  it("undo returns false when nothing to undo", () => {
    const dt = new DiffTracker({ x: 1 });
    expect(dt.undo()).toBe(false);
  });

  it("redo returns false when nothing to redo", () => {
    const dt = new DiffTracker({ x: 1 });
    expect(dt.redo()).toBe(false);
  });

  it("new change clears redo stack", () => {
    const dt = new DiffTracker({ x: 1 });
    dt.set({ x: 2 });
    dt.undo();
    dt.set({ x: 3 });
    expect(dt.canRedo).toBe(false);
  });

  it("canUndo and canRedo", () => {
    const dt = new DiffTracker({ x: 1 });
    expect(dt.canUndo).toBe(false);
    dt.set({ x: 2 });
    expect(dt.canUndo).toBe(true);
    dt.undo();
    expect(dt.canRedo).toBe(true);
  });

  it("history returns change records", () => {
    const dt = new DiffTracker({ x: 1 });
    dt.set({ x: 2 });
    dt.set({ x: 3 });
    expect(dt.history().length).toBe(2);
  });

  it("diff detects changes", () => {
    const dt = new DiffTracker({ a: 1, b: 2 });
    const changes = dt.diff({ a: 1, b: 2 }, { a: 1, b: 3 });
    expect(changes.length).toBe(1);
    expect(changes[0].key).toBe("b");
  });

  it("reset clears everything", () => {
    const dt = new DiffTracker({ x: 1 });
    dt.set({ x: 2 });
    dt.reset({ x: 0 });
    expect(dt.state.x).toBe(0);
    expect(dt.changeCount).toBe(0);
  });

  it("does not mutate original", () => {
    const original = { x: 1 };
    const dt = new DiffTracker(original);
    dt.set({ x: 2 });
    expect(original.x).toBe(1);
  });
});

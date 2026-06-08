import { describe, it, expect } from "vitest";
import { UndoManager } from "../undo-manager.js";
import type { UndoableAction } from "../undo-manager.js";

function addAction(n: number): UndoableAction<number> {
  return {
    execute: (s) => s + n,
    undo: (s) => s - n,
    description: `add ${n}`,
  };
}

describe("UndoManager", () => {
  it("executes actions", () => {
    const mgr = new UndoManager(0);
    mgr.execute(addAction(5));
    expect(mgr.getState()).toBe(5);
  });

  it("undoes actions", () => {
    const mgr = new UndoManager(0);
    mgr.execute(addAction(5));
    mgr.execute(addAction(3));
    mgr.undo();
    expect(mgr.getState()).toBe(5);
  });

  it("redoes actions", () => {
    const mgr = new UndoManager(0);
    mgr.execute(addAction(5));
    mgr.undo();
    mgr.redo();
    expect(mgr.getState()).toBe(5);
  });

  it("clears redo on new action", () => {
    const mgr = new UndoManager(0);
    mgr.execute(addAction(5));
    mgr.undo();
    mgr.execute(addAction(10));
    expect(mgr.canRedo()).toBe(false);
  });

  it("canUndo/canRedo", () => {
    const mgr = new UndoManager(0);
    expect(mgr.canUndo()).toBe(false);
    mgr.execute(addAction(1));
    expect(mgr.canUndo()).toBe(true);
    expect(mgr.canRedo()).toBe(false);
  });

  it("tracks history", () => {
    const mgr = new UndoManager(0);
    mgr.execute(addAction(1));
    mgr.execute(addAction(2));
    expect(mgr.history()).toEqual(["add 1", "add 2"]);
  });

  it("respects maxHistory", () => {
    const mgr = new UndoManager(0, 3);
    for (let i = 0; i < 5; i++) mgr.execute(addAction(1));
    expect(mgr.undoCount()).toBe(3);
  });

  it("batch executes multiple actions", () => {
    const mgr = new UndoManager(0);
    mgr.batch([addAction(1), addAction(2), addAction(3)]);
    expect(mgr.getState()).toBe(6);
    mgr.undo();
    expect(mgr.getState()).toBe(0);
  });

  it("clear resets stacks", () => {
    const mgr = new UndoManager(0);
    mgr.execute(addAction(5));
    mgr.clear();
    expect(mgr.canUndo()).toBe(false);
  });

  it("returns null when nothing to undo/redo", () => {
    const mgr = new UndoManager(0);
    expect(mgr.undo()).toBeNull();
    expect(mgr.redo()).toBeNull();
  });
});

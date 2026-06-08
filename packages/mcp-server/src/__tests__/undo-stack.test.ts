import { describe, it, expect } from "vitest";
import { UndoStack } from "../undo-stack.js";

describe("UndoStack", () => {
  it("starts with initial value", () => {
    const s = new UndoStack("a");
    expect(s.current).toBe("a");
  });

  it("push updates current", () => {
    const s = new UndoStack("a");
    s.push("b");
    expect(s.current).toBe("b");
  });

  it("undo restores previous", () => {
    const s = new UndoStack("a");
    s.push("b");
    expect(s.undo()).toBe("a");
    expect(s.current).toBe("a");
  });

  it("redo restores undone", () => {
    const s = new UndoStack("a");
    s.push("b");
    s.undo();
    expect(s.redo()).toBe("b");
    expect(s.current).toBe("b");
  });

  it("push clears redo stack", () => {
    const s = new UndoStack("a");
    s.push("b");
    s.undo();
    s.push("c");
    expect(s.canRedo).toBe(false);
  });

  it("canUndo / canRedo", () => {
    const s = new UndoStack("a");
    expect(s.canUndo).toBe(false);
    expect(s.canRedo).toBe(false);
    s.push("b");
    expect(s.canUndo).toBe(true);
    s.undo();
    expect(s.canRedo).toBe(true);
  });

  it("undo returns undefined when empty", () => {
    const s = new UndoStack("a");
    expect(s.undo()).toBeUndefined();
  });

  it("redo returns undefined when empty", () => {
    const s = new UndoStack("a");
    expect(s.redo()).toBeUndefined();
  });

  it("undoCount / redoCount", () => {
    const s = new UndoStack("a");
    s.push("b");
    s.push("c");
    expect(s.undoCount).toBe(2);
    s.undo();
    expect(s.redoCount).toBe(1);
  });

  it("respects maxSize", () => {
    const s = new UndoStack(0, 3);
    s.push(1); s.push(2); s.push(3); s.push(4);
    expect(s.undoCount).toBe(3);
  });

  it("clear removes history", () => {
    const s = new UndoStack("a");
    s.push("b");
    s.clear();
    expect(s.canUndo).toBe(false);
    expect(s.current).toBe("b");
  });

  it("reset sets new state and clears history", () => {
    const s = new UndoStack("a");
    s.push("b");
    s.reset("x");
    expect(s.current).toBe("x");
    expect(s.canUndo).toBe(false);
  });
});

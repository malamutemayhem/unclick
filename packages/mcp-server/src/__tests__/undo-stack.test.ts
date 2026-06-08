import { describe, it, expect } from "vitest";
import { UndoStack } from "../undo-stack.js";

describe("undo-stack", () => {
  it("starts with initial state", () => {
    const stack = new UndoStack("a");
    expect(stack.current).toBe("a");
  });

  it("push and undo", () => {
    const stack = new UndoStack(1);
    stack.push(2);
    stack.push(3);
    expect(stack.current).toBe(3);
    stack.undo();
    expect(stack.current).toBe(2);
    stack.undo();
    expect(stack.current).toBe(1);
  });

  it("redo after undo", () => {
    const stack = new UndoStack("a");
    stack.push("b");
    stack.undo();
    stack.redo();
    expect(stack.current).toBe("b");
  });

  it("push clears redo stack", () => {
    const stack = new UndoStack(1);
    stack.push(2);
    stack.push(3);
    stack.undo();
    stack.push(4);
    expect(stack.canRedo).toBe(false);
  });

  it("canUndo/canRedo flags", () => {
    const stack = new UndoStack(0);
    expect(stack.canUndo).toBe(false);
    stack.push(1);
    expect(stack.canUndo).toBe(true);
    expect(stack.canRedo).toBe(false);
  });

  it("undo on empty returns undefined", () => {
    const stack = new UndoStack(0);
    expect(stack.undo()).toBeUndefined();
  });

  it("redo on empty returns undefined", () => {
    const stack = new UndoStack(0);
    expect(stack.redo()).toBeUndefined();
  });

  it("history returns all states", () => {
    const stack = new UndoStack("a");
    stack.push("b");
    stack.push("c");
    expect(stack.history()).toEqual(["a", "b", "c"]);
  });

  it("clear empties undo/redo", () => {
    const stack = new UndoStack(1);
    stack.push(2);
    stack.push(3);
    stack.undo();
    stack.clear();
    expect(stack.canUndo).toBe(false);
    expect(stack.canRedo).toBe(false);
    expect(stack.current).toBe(2);
  });
});

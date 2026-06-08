import { describe, it, expect } from "vitest";
import { UndoStack } from "../undo-stack.js";

describe("UndoStack", () => {
  it("tracks current state", () => {
    const stack = new UndoStack("a");
    expect(stack.state).toBe("a");
    stack.push("b");
    expect(stack.state).toBe("b");
  });

  it("undo restores previous", () => {
    const stack = new UndoStack("a");
    stack.push("b");
    stack.push("c");
    expect(stack.undo()).toBe("b");
    expect(stack.state).toBe("b");
    expect(stack.undo()).toBe("a");
    expect(stack.state).toBe("a");
  });

  it("redo restores undone", () => {
    const stack = new UndoStack("a");
    stack.push("b");
    stack.undo();
    expect(stack.redo()).toBe("b");
    expect(stack.state).toBe("b");
  });

  it("push clears redo stack", () => {
    const stack = new UndoStack("a");
    stack.push("b");
    stack.undo();
    stack.push("c");
    expect(stack.canRedo).toBe(false);
  });

  it("undo returns null when empty", () => {
    const stack = new UndoStack("a");
    expect(stack.undo()).toBeNull();
  });

  it("redo returns null when empty", () => {
    const stack = new UndoStack("a");
    expect(stack.redo()).toBeNull();
  });

  it("tracks canUndo/canRedo", () => {
    const stack = new UndoStack("a");
    expect(stack.canUndo).toBe(false);
    stack.push("b");
    expect(stack.canUndo).toBe(true);
    expect(stack.canRedo).toBe(false);
    stack.undo();
    expect(stack.canRedo).toBe(true);
  });

  it("respects maxSize", () => {
    const stack = new UndoStack(0, 3);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    expect(stack.undoCount).toBe(3);
  });

  it("clear empties stacks", () => {
    const stack = new UndoStack("a");
    stack.push("b");
    stack.clear();
    expect(stack.canUndo).toBe(false);
    expect(stack.state).toBe("b");
  });
});

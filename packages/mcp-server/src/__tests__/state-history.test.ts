import { describe, it, expect } from "vitest";
import { StateHistory } from "../state-history.js";

describe("StateHistory", () => {
  it("pushes and returns current", () => {
    const h = new StateHistory<number>();
    h.push(1);
    expect(h.current).toBe(1);
    expect(h.size).toBe(1);
  });

  it("undo returns previous state", () => {
    const h = new StateHistory<string>();
    h.push("a");
    h.push("b");
    expect(h.undo()).toBe("a");
    expect(h.current).toBe("a");
  });

  it("redo returns next state", () => {
    const h = new StateHistory<string>();
    h.push("a");
    h.push("b");
    h.undo();
    expect(h.redo()).toBe("b");
    expect(h.current).toBe("b");
  });

  it("undo at start returns undefined", () => {
    const h = new StateHistory<number>();
    h.push(1);
    expect(h.undo()).toBeUndefined();
  });

  it("redo at end returns undefined", () => {
    const h = new StateHistory<number>();
    h.push(1);
    expect(h.redo()).toBeUndefined();
  });

  it("push after undo discards redo history", () => {
    const h = new StateHistory<number>();
    h.push(1);
    h.push(2);
    h.push(3);
    h.undo();
    h.push(4);
    expect(h.current).toBe(4);
    expect(h.redo()).toBeUndefined();
    expect(h.size).toBe(3);
  });

  it("respects maxSize", () => {
    const h = new StateHistory<number>({ maxSize: 3 });
    h.push(1);
    h.push(2);
    h.push(3);
    h.push(4);
    expect(h.size).toBe(3);
    expect(h.undo()).toBe(3);
  });

  it("deep clones objects", () => {
    const h = new StateHistory<{ x: number }>();
    const obj = { x: 1 };
    h.push(obj);
    obj.x = 99;
    expect(h.current!.x).toBe(1);
  });

  it("canUndo and canRedo flags", () => {
    const h = new StateHistory<number>();
    expect(h.canUndo).toBe(false);
    expect(h.canRedo).toBe(false);
    h.push(1);
    h.push(2);
    expect(h.canUndo).toBe(true);
    expect(h.canRedo).toBe(false);
    h.undo();
    expect(h.canRedo).toBe(true);
  });

  it("clear resets everything", () => {
    const h = new StateHistory<number>();
    h.push(1);
    h.push(2);
    h.clear();
    expect(h.size).toBe(0);
    expect(h.current).toBeUndefined();
  });
});

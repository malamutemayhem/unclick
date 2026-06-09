import { describe, it, expect } from "vitest";
import { UndoManager, setField, arrayPush, arrayRemove, transform } from "../undo-redo.js";

describe("UndoRedo", () => {
  interface State {
    name: string;
    count: number;
    items: string[];
  }

  const initial: State = { name: "test", count: 0, items: [] };

  it("executes commands", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(setField<State, "count">("count", 5));
    expect(mgr.state.count).toBe(5);
  });

  it("undoes commands", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(setField<State, "count">("count", 5));
    mgr.undo();
    expect(mgr.state.count).toBe(0);
  });

  it("redoes commands", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(setField<State, "count">("count", 5));
    mgr.undo();
    mgr.redo();
    expect(mgr.state.count).toBe(5);
  });

  it("clears redo on new execute", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(setField<State, "count">("count", 5));
    mgr.undo();
    mgr.execute(setField<State, "count">("count", 10));
    expect(mgr.canRedo).toBe(false);
  });

  it("tracks undo/redo counts", () => {
    const mgr = new UndoManager(initial);
    expect(mgr.undoCount).toBe(0);
    mgr.execute(setField<State, "count">("count", 1));
    mgr.execute(setField<State, "count">("count", 2));
    expect(mgr.undoCount).toBe(2);
    mgr.undo();
    expect(mgr.undoCount).toBe(1);
    expect(mgr.redoCount).toBe(1);
  });

  it("array push and undo", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(arrayPush<State, "items", string>("items", "a"));
    mgr.execute(arrayPush<State, "items", string>("items", "b"));
    expect(mgr.state.items).toEqual(["a", "b"]);
    mgr.undo();
    expect(mgr.state.items).toEqual(["a"]);
  });

  it("array remove and undo", () => {
    const mgr = new UndoManager({ ...initial, items: ["a", "b", "c"] });
    mgr.execute(arrayRemove<State, "items", string>("items", 1));
    expect(mgr.state.items).toEqual(["a", "c"]);
    mgr.undo();
    expect(mgr.state.items).toEqual(["a", "b", "c"]);
  });

  it("transform command", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(transform<State>(
      (s) => ({ ...s, count: s.count + 10 }),
      (s) => ({ ...s, count: s.count - 10 }),
      "add 10"
    ));
    expect(mgr.state.count).toBe(10);
    mgr.undo();
    expect(mgr.state.count).toBe(0);
  });

  it("batch executes multiple commands", () => {
    const mgr = new UndoManager(initial);
    mgr.batch([
      setField<State, "name">("name", "updated"),
      setField<State, "count">("count", 42),
    ]);
    expect(mgr.state.name).toBe("updated");
    expect(mgr.state.count).toBe(42);
    mgr.undo();
    expect(mgr.state.name).toBe("test");
    expect(mgr.state.count).toBe(0);
  });

  it("history returns descriptions", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(setField<State, "count">("count", 1, "set count"));
    mgr.execute(setField<State, "name">("name", "x", "set name"));
    expect(mgr.history()).toEqual(["set count", "set name"]);
  });

  it("subscribe notifies on changes", () => {
    const mgr = new UndoManager(initial);
    const states: State[] = [];
    mgr.subscribe((s) => states.push({ ...s }));
    mgr.execute(setField<State, "count">("count", 1));
    mgr.undo();
    expect(states).toHaveLength(2);
  });

  it("clear removes history", () => {
    const mgr = new UndoManager(initial);
    mgr.execute(setField<State, "count">("count", 1));
    mgr.clear();
    expect(mgr.canUndo).toBe(false);
  });

  it("undo returns null when empty", () => {
    const mgr = new UndoManager(initial);
    expect(mgr.undo()).toBeNull();
  });

  it("redo returns null when empty", () => {
    const mgr = new UndoManager(initial);
    expect(mgr.redo()).toBeNull();
  });

  it("respects maxHistory", () => {
    const mgr = new UndoManager(initial, 3);
    for (let i = 0; i < 5; i++) {
      mgr.execute(setField<State, "count">("count", i));
    }
    expect(mgr.undoCount).toBe(3);
  });
});

import { describe, it, expect, vi } from "vitest";
import { StateStore, createStore } from "../state-store.js";

type Action = { type: "increment" } | { type: "decrement" } | { type: "set"; payload: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
    case "set": return action.payload;
    default: return state;
  }
}

describe("StateStore", () => {
  it("has initial state", () => {
    const store = createStore(0, reducer);
    expect(store.getState()).toBe(0);
  });

  it("dispatch updates state", () => {
    const store = createStore(0, reducer);
    store.dispatch({ type: "increment" });
    expect(store.getState()).toBe(1);
  });

  it("multiple dispatches", () => {
    const store = createStore(0, reducer);
    store.dispatch({ type: "increment" });
    store.dispatch({ type: "increment" });
    store.dispatch({ type: "decrement" });
    expect(store.getState()).toBe(1);
  });

  it("subscribe notifies on dispatch", () => {
    const store = createStore(0, reducer);
    const fn = vi.fn();
    store.subscribe(fn);
    store.dispatch({ type: "increment" });
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("unsubscribe stops notifications", () => {
    const store = createStore(0, reducer);
    const fn = vi.fn();
    const unsub = store.subscribe(fn);
    unsub();
    store.dispatch({ type: "increment" });
    expect(fn).not.toHaveBeenCalled();
  });

  it("select extracts state", () => {
    const store = createStore(42, reducer);
    expect(store.select((s: number) => s * 2)).toBe(84);
  });

  it("undo reverts last dispatch", () => {
    const store = createStore(0, reducer);
    store.dispatch({ type: "increment" });
    store.dispatch({ type: "increment" });
    expect(store.getState()).toBe(2);
    store.undo();
    expect(store.getState()).toBe(1);
  });

  it("undo returns false when no history", () => {
    const store = createStore(0, reducer);
    expect(store.undo()).toBe(false);
  });

  it("middleware intercepts dispatch", () => {
    const store = createStore(0, reducer);
    const log: string[] = [];
    store.use((_state: number, action: Action, next: () => number) => {
      log.push(`before:${action.type}`);
      const result = next();
      log.push(`after:${action.type}`);
      return result;
    });
    store.dispatch({ type: "increment" });
    expect(log).toEqual(["before:increment", "after:increment"]);
  });
});

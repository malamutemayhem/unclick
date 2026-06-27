import { describe, it, expect } from "vitest";
import { createStore, combineReducers } from "../state-store.js";

describe("Store", () => {
  it("holds initial state", () => {
    const store = createStore((s: number) => s, 0);
    expect(store.getState()).toBe(0);
  });

  it("dispatch updates state via reducer", () => {
    const store = createStore((s: number, a: { type: string }) => {
      if (a.type === "INC") return s + 1;
      return s;
    }, 0);
    store.dispatch({ type: "INC" });
    expect(store.getState()).toBe(1);
  });

  it("subscribe notifies on dispatch", () => {
    const store = createStore((s: number, a: { type: string }) => a.type === "INC" ? s + 1 : s, 0);
    const states: number[] = [];
    store.subscribe((s: number) => states.push(s));
    store.dispatch({ type: "INC" });
    store.dispatch({ type: "INC" });
    expect(states).toEqual([1, 2]);
  });

  it("unsubscribe stops notifications", () => {
    const store = createStore((s: number, a: { type: string }) => a.type === "INC" ? s + 1 : s, 0);
    const states: number[] = [];
    const unsub = store.subscribe((s: number) => states.push(s));
    store.dispatch({ type: "INC" });
    unsub();
    store.dispatch({ type: "INC" });
    expect(states).toEqual([1]);
  });

  it("select derives state", () => {
    const store = createStore((s: { count: number }) => s, { count: 42 });
    expect(store.select((s) => s.count)).toBe(42);
  });

  it("listenerCount", () => {
    const store = createStore((s: number) => s, 0);
    expect(store.listenerCount).toBe(0);
    const unsub = store.subscribe(() => {});
    expect(store.listenerCount).toBe(1);
    unsub();
    expect(store.listenerCount).toBe(0);
  });
});

describe("combineReducers", () => {
  it("combines multiple reducers", () => {
    type State = { count: number; name: string };
    const reducer = combineReducers<State>({
      count: (s: number = 0, a) => a.type === "INC" ? s + 1 : s,
      name: (s: string = "", a) => a.type === "SET_NAME" ? "updated" : s,
    });
    const store = createStore(reducer, { count: 0, name: "" });
    store.dispatch({ type: "INC" });
    expect(store.getState()).toEqual({ count: 1, name: "" });
  });
});

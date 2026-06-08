import { describe, it, expect, vi } from "vitest";
import { createStore, combineReducers, applyMiddleware } from "../state-reducer.js";

type Action = { type: "INCREMENT" } | { type: "DECREMENT" } | { type: "SET"; value: number };

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT": return state + 1;
    case "DECREMENT": return state - 1;
    case "SET": return action.value;
    default: return state;
  }
}

describe("Store", () => {
  it("getState returns initial state", () => {
    const store = createStore(counterReducer, 0);
    expect(store.getState()).toBe(0);
  });

  it("dispatch updates state", () => {
    const store = createStore(counterReducer, 0);
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(1);
  });

  it("multiple dispatches accumulate", () => {
    const store = createStore(counterReducer, 0);
    store.dispatch({ type: "INCREMENT" });
    store.dispatch({ type: "INCREMENT" });
    store.dispatch({ type: "DECREMENT" });
    expect(store.getState()).toBe(1);
  });

  it("subscribe is called on dispatch", () => {
    const store = createStore(counterReducer, 0);
    const listener = vi.fn();
    store.subscribe(listener);
    store.dispatch({ type: "INCREMENT" });
    expect(listener).toHaveBeenCalledWith(1);
  });

  it("unsubscribe stops notifications", () => {
    const store = createStore(counterReducer, 0);
    const listener = vi.fn();
    const unsub = store.subscribe(listener);
    unsub();
    store.dispatch({ type: "INCREMENT" });
    expect(listener).not.toHaveBeenCalled();
  });

  it("replaceReducer swaps logic", () => {
    const store = createStore(counterReducer, 5);
    store.replaceReducer((state, action) => {
      if (action.type === "INCREMENT") return state + 10;
      return state;
    });
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(15);
  });
});

describe("combineReducers", () => {
  it("combines multiple reducers", () => {
    type CombinedAction = { type: "INC_A" } | { type: "INC_B" };
    const combined = combineReducers<{ a: number; b: number }, CombinedAction>({
      a: (s, action) => action.type === "INC_A" ? s + 1 : s,
      b: (s, action) => action.type === "INC_B" ? s + 1 : s,
    });

    const store = createStore(combined, { a: 0, b: 0 });
    store.dispatch({ type: "INC_A" });
    expect(store.getState()).toEqual({ a: 1, b: 0 });
    store.dispatch({ type: "INC_B" });
    expect(store.getState()).toEqual({ a: 1, b: 1 });
  });

  it("returns same reference if nothing changed", () => {
    type NoopAction = { type: "NOOP" };
    const combined = combineReducers<{ x: number }, NoopAction>({
      x: (s) => s,
    });
    const state = { x: 5 };
    const next = combined(state, { type: "NOOP" });
    expect(next).toBe(state);
  });
});

describe("applyMiddleware", () => {
  it("middleware intercepts dispatch", () => {
    const store = createStore(counterReducer, 0);
    const log: string[] = [];
    const dispatch = applyMiddleware(store, (s, next, action) => {
      log.push("before");
      next(action);
      log.push("after");
    });
    dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(1);
    expect(log).toEqual(["before", "after"]);
  });

  it("multiple middlewares chain", () => {
    const store = createStore(counterReducer, 0);
    const order: number[] = [];
    const dispatch = applyMiddleware(
      store,
      (_s, next, action) => { order.push(1); next(action); },
      (_s, next, action) => { order.push(2); next(action); },
    );
    dispatch({ type: "INCREMENT" });
    expect(order).toEqual([1, 2]);
  });
});

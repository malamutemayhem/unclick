import { describe, it, expect } from "vitest";
import { EventStore } from "../event-sourcing.js";

interface Counter { count: number }

const counterReducer = (state: Counter, event: { type: string; payload: unknown }) => {
  switch (event.type) {
    case "increment": return { count: state.count + (event.payload as number) };
    case "decrement": return { count: state.count - (event.payload as number) };
    case "reset": return { count: 0 };
    default: return state;
  }
};

describe("EventStore", () => {
  it("starts with initial state", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    expect(store.currentState).toEqual({ count: 0 });
  });

  it("append and replay", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    store.append("increment", 5);
    store.append("increment", 3);
    store.append("decrement", 2);
    expect(store.currentState).toEqual({ count: 6 });
  });

  it("version tracks event count", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    store.append("increment", 1);
    store.append("increment", 1);
    expect(store.version).toBe(2);
  });

  it("stateAt returns historical state", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    store.append("increment", 10);
    store.append("increment", 20);
    store.append("increment", 30);
    expect(store.stateAt(1)).toEqual({ count: 10 });
    expect(store.stateAt(2)).toEqual({ count: 30 });
  });

  it("eventLog returns all events", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    store.append("increment", 1);
    store.append("reset", null);
    expect(store.eventLog.length).toBe(2);
    expect(store.eventLog[0].type).toBe("increment");
    expect(store.eventLog[1].type).toBe("reset");
  });

  it("eventsSince returns subset", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    store.append("increment", 1);
    store.append("increment", 2);
    store.append("increment", 3);
    const since = store.eventsSince(2);
    expect(since.length).toBe(1);
    expect(since[0].payload).toBe(3);
  });

  it("replay computes state from events", () => {
    const store = new EventStore(counterReducer, { count: 0 });
    const events = [
      { type: "increment", payload: 5, timestamp: 0, version: 1 },
      { type: "increment", payload: 3, timestamp: 0, version: 2 },
    ];
    expect(store.replay(events)).toEqual({ count: 8 });
  });

  it("takes snapshots", () => {
    const store = new EventStore(counterReducer, { count: 0 }, 2);
    store.append("increment", 1);
    store.append("increment", 1);
    store.append("increment", 1);
    expect(store.currentState).toEqual({ count: 3 });
  });
});

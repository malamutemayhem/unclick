import { describe, it, expect } from "vitest";
import { EventStore, replay } from "../event-sourcing.js";

describe("event-sourcing", () => {
  it("append stores events with versions", () => {
    const store = new EventStore();
    const e1 = store.append("order-1", "created", { total: 100 });
    const e2 = store.append("order-1", "paid", { method: "card" });
    expect(e1.version).toBe(1);
    expect(e2.version).toBe(2);
    expect(e1.type).toBe("created");
  });

  it("getStream returns all events", () => {
    const store = new EventStore();
    store.append("s1", "a", {});
    store.append("s1", "b", {});
    expect(store.getStream("s1")).toHaveLength(2);
  });

  it("getStream with fromVersion filters", () => {
    const store = new EventStore();
    store.append("s1", "a", {});
    store.append("s1", "b", {});
    store.append("s1", "c", {});
    expect(store.getStream("s1", 2)).toHaveLength(2);
  });

  it("getStream returns empty for unknown stream", () => {
    const store = new EventStore();
    expect(store.getStream("nope")).toEqual([]);
  });

  it("getLatestVersion tracks version", () => {
    const store = new EventStore();
    store.append("s1", "a", {});
    store.append("s1", "b", {});
    expect(store.getLatestVersion("s1")).toBe(2);
    expect(store.getLatestVersion("nope")).toBe(0);
  });

  it("streamIds lists all streams", () => {
    const store = new EventStore();
    store.append("a", "x", {});
    store.append("b", "y", {});
    expect(store.streamIds().sort()).toEqual(["a", "b"]);
  });

  it("totalEvents counts across streams", () => {
    const store = new EventStore();
    store.append("a", "x", {});
    store.append("a", "y", {});
    store.append("b", "z", {});
    expect(store.totalEvents).toBe(3);
  });

  it("replay rebuilds state from events", () => {
    const store = new EventStore();
    store.append("counter", "increment", { amount: 5 });
    store.append("counter", "increment", { amount: 3 });
    store.append("counter", "decrement", { amount: 2 });

    const events = store.getStream("counter");
    const total = replay(events, (state, event) => {
      const amount = (event.payload as { amount: number }).amount;
      return event.type === "increment" ? state + amount : state - amount;
    }, 0);
    expect(total).toBe(6);
  });
});

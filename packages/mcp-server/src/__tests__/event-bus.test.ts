import { describe, it, expect } from "vitest";
import { EventBus } from "../event-bus.js";

describe("EventBus", () => {
  it("on and emit", () => {
    const bus = new EventBus();
    const values: number[] = [];
    bus.on<number>("test", (v: number) => values.push(v));
    bus.emit("test", 1);
    bus.emit("test", 2);
    expect(values).toEqual([1, 2]);
  });

  it("unsubscribe stops events", () => {
    const bus = new EventBus();
    const values: number[] = [];
    const unsub = bus.on<number>("test", (v: number) => values.push(v));
    bus.emit("test", 1);
    unsub();
    bus.emit("test", 2);
    expect(values).toEqual([1]);
  });

  it("once fires only once", () => {
    const bus = new EventBus();
    const values: number[] = [];
    bus.once<number>("test", (v: number) => values.push(v));
    bus.emit("test", 1);
    bus.emit("test", 2);
    expect(values).toEqual([1]);
  });

  it("wildcard receives all events", () => {
    const bus = new EventBus();
    const received: unknown[] = [];
    bus.on("*", (data: unknown) => received.push(data));
    bus.emit("foo", 1);
    bus.emit("bar", 2);
    expect(received).toHaveLength(2);
  });

  it("off removes all handlers for event", () => {
    const bus = new EventBus();
    bus.on("test", () => {});
    bus.on("test", () => {});
    bus.off("test");
    expect(bus.listenerCount("test")).toBe(0);
  });

  it("clear removes everything", () => {
    const bus = new EventBus();
    bus.on("a", () => {});
    bus.on("b", () => {});
    bus.clear();
    expect(bus.events()).toEqual([]);
  });

  it("listenerCount and events", () => {
    const bus = new EventBus();
    bus.on("a", () => {});
    bus.on("a", () => {});
    bus.on("b", () => {});
    expect(bus.listenerCount("a")).toBe(2);
    expect(bus.events().sort()).toEqual(["a", "b"]);
  });
});

import { describe, it, expect } from "vitest";
import { SignalBus } from "../signal-bus.js";

describe("SignalBus", () => {
  it("on and emit fire handler", () => {
    const bus = new SignalBus();
    let called = false;
    bus.on("test", () => { called = true; });
    bus.emit("test");
    expect(called).toBe(true);
  });

  it("emit passes arguments", () => {
    const bus = new SignalBus();
    let received: unknown[] = [];
    bus.on("data", (...args) => { received = args; });
    bus.emit("data", 1, "hello");
    expect(received).toEqual([1, "hello"]);
  });

  it("once fires only once", () => {
    const bus = new SignalBus();
    let count = 0;
    bus.once("event", () => { count++; });
    bus.emit("event");
    bus.emit("event");
    expect(count).toBe(1);
  });

  it("off removes handler", () => {
    const bus = new SignalBus();
    let count = 0;
    const handler = () => { count++; };
    bus.on("event", handler);
    bus.emit("event");
    bus.off("event", handler);
    bus.emit("event");
    expect(count).toBe(1);
  });

  it("priority determines order", () => {
    const bus = new SignalBus();
    const order: number[] = [];
    bus.on("p", () => order.push(1), 1);
    bus.on("p", () => order.push(2), 10);
    bus.on("p", () => order.push(3), 5);
    bus.emit("p");
    expect(order).toEqual([2, 3, 1]);
  });

  it("listenerCount and signals work", () => {
    const bus = new SignalBus();
    bus.on("a", () => {});
    bus.on("a", () => {});
    bus.on("b", () => {});
    expect(bus.listenerCount("a")).toBe(2);
    expect(bus.signals().sort()).toEqual(["a", "b"]);
  });

  it("clear removes handlers for signal", () => {
    const bus = new SignalBus();
    bus.on("x", () => {});
    bus.clear("x");
    expect(bus.listenerCount("x")).toBe(0);
  });

  it("history records emitted signals", () => {
    const bus = new SignalBus();
    bus.emit("a", 1);
    bus.emit("b", 2);
    const history = bus.getHistory("a");
    expect(history.length).toBe(1);
    expect(history[0].args).toEqual([1]);
  });

  it("emit returns handler count", () => {
    const bus = new SignalBus();
    bus.on("x", () => {});
    bus.on("x", () => {});
    expect(bus.emit("x")).toBe(2);
    expect(bus.emit("y")).toBe(0);
  });
});

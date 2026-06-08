import { describe, it, expect } from "vitest";
import { EventBus, createMcpEventBus } from "../event-bus.js";

describe("EventBus", () => {
  it("fires handlers on emit", () => {
    const bus = new EventBus<{ ping: string }>();
    let received = "";
    bus.on("ping", (val) => { received = val; });
    bus.emit("ping", "hello");
    expect(received).toBe("hello");
  });

  it("supports multiple handlers", () => {
    const bus = new EventBus<{ tick: number }>();
    const values: number[] = [];
    bus.on("tick", (v) => values.push(v));
    bus.on("tick", (v) => values.push(v * 10));
    bus.emit("tick", 5);
    expect(values).toEqual([5, 50]);
  });

  it("unsubscribe via returned function", () => {
    const bus = new EventBus<{ x: number }>();
    let count = 0;
    const off = bus.on("x", () => { count++; });
    bus.emit("x", 1);
    off();
    bus.emit("x", 2);
    expect(count).toBe(1);
  });

  it("off removes a specific handler", () => {
    const bus = new EventBus<{ x: number }>();
    let count = 0;
    const handler = () => { count++; };
    bus.on("x", handler);
    bus.off("x", handler);
    bus.emit("x", 1);
    expect(count).toBe(0);
  });

  it("once fires only once", () => {
    const bus = new EventBus<{ x: string }>();
    let count = 0;
    bus.once("x", () => { count++; });
    bus.emit("x", "a");
    bus.emit("x", "b");
    expect(count).toBe(1);
  });

  it("swallows handler errors", () => {
    const bus = new EventBus<{ x: number }>();
    let reached = false;
    bus.on("x", () => { throw new Error("oops"); });
    bus.on("x", () => { reached = true; });
    bus.emit("x", 1);
    expect(reached).toBe(true);
  });

  it("removeAll clears specific event", () => {
    const bus = new EventBus<{ a: number; b: number }>();
    let aCount = 0;
    let bCount = 0;
    bus.on("a", () => { aCount++; });
    bus.on("b", () => { bCount++; });
    bus.removeAll("a");
    bus.emit("a", 1);
    bus.emit("b", 1);
    expect(aCount).toBe(0);
    expect(bCount).toBe(1);
  });

  it("removeAll with no arg clears everything", () => {
    const bus = new EventBus<{ a: number; b: number }>();
    bus.on("a", () => {});
    bus.on("b", () => {});
    bus.removeAll();
    expect(bus.listenerCount("a")).toBe(0);
    expect(bus.listenerCount("b")).toBe(0);
  });

  it("listenerCount tracks handlers", () => {
    const bus = new EventBus<{ x: number }>();
    expect(bus.listenerCount("x")).toBe(0);
    const off = bus.on("x", () => {});
    expect(bus.listenerCount("x")).toBe(1);
    off();
    expect(bus.listenerCount("x")).toBe(0);
  });

  it("emitting unknown event is a no-op", () => {
    const bus = new EventBus<{ x: number }>();
    expect(() => bus.emit("x", 1)).not.toThrow();
  });
});

describe("createMcpEventBus", () => {
  it("creates a typed bus", () => {
    const bus = createMcpEventBus();
    let tool = "";
    bus.on("tool:start", (e) => { tool = e.tool; });
    bus.emit("tool:start", { tool: "test", args: {} });
    expect(tool).toBe("test");
  });
});

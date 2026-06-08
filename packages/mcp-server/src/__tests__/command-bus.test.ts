import { describe, it, expect } from "vitest";
import { CommandBus } from "../command-bus.js";

describe("CommandBus", () => {
  it("dispatches to registered handler", () => {
    const bus = new CommandBus();
    bus.register("greet", (cmd) => `Hello ${cmd.payload}`);
    expect(bus.dispatch({ type: "greet", payload: "World" })).toBe("Hello World");
  });

  it("throws for unregistered command", () => {
    const bus = new CommandBus();
    expect(() => bus.dispatch({ type: "missing", payload: null })).toThrow("No handler");
  });

  it("unregister removes handler", () => {
    const bus = new CommandBus();
    bus.register("x", () => 1);
    expect(bus.unregister("x")).toBe(true);
    expect(bus.has("x")).toBe(false);
  });

  it("middleware wraps handler", () => {
    const bus = new CommandBus();
    const log: string[] = [];
    bus.use((cmd, next) => { log.push("before"); const r = next(); log.push("after"); return r; });
    bus.register("test", () => { log.push("handler"); return 42; });
    const result = bus.dispatch({ type: "test", payload: null });
    expect(result).toBe(42);
    expect(log).toEqual(["before", "handler", "after"]);
  });

  it("multiple middlewares execute in order", () => {
    const bus = new CommandBus();
    const log: number[] = [];
    bus.use((_cmd, next) => { log.push(1); return next(); });
    bus.use((_cmd, next) => { log.push(2); return next(); });
    bus.register("x", () => { log.push(3); });
    bus.dispatch({ type: "x", payload: null });
    expect(log).toEqual([1, 2, 3]);
  });

  it("has checks registration", () => {
    const bus = new CommandBus();
    bus.register("a", () => {});
    expect(bus.has("a")).toBe(true);
    expect(bus.has("b")).toBe(false);
  });

  it("registeredTypes lists all", () => {
    const bus = new CommandBus();
    bus.register("a", () => {});
    bus.register("b", () => {});
    expect(bus.registeredTypes.sort()).toEqual(["a", "b"]);
  });
});

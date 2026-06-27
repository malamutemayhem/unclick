import { describe, it, expect, vi } from "vitest";
import { TypedEmitter } from "../typed-emitter.js";

type Events = {
  message: string;
  count: number;
  done: void;
};

describe("TypedEmitter", () => {
  it("emits to registered handlers", () => {
    const emitter = new TypedEmitter<Events>();
    const handler = vi.fn();
    emitter.on("message", handler);
    emitter.emit("message", "hello");
    expect(handler).toHaveBeenCalledWith("hello");
  });

  it("supports multiple handlers", () => {
    const emitter = new TypedEmitter<Events>();
    const h1 = vi.fn();
    const h2 = vi.fn();
    emitter.on("message", h1);
    emitter.on("message", h2);
    emitter.emit("message", "hi");
    expect(h1).toHaveBeenCalled();
    expect(h2).toHaveBeenCalled();
  });

  it("off removes a handler", () => {
    const emitter = new TypedEmitter<Events>();
    const handler = vi.fn();
    emitter.on("message", handler);
    emitter.off("message", handler);
    emitter.emit("message", "hi");
    expect(handler).not.toHaveBeenCalled();
  });

  it("on returns unsubscribe function", () => {
    const emitter = new TypedEmitter<Events>();
    const handler = vi.fn();
    const unsub = emitter.on("message", handler);
    unsub();
    emitter.emit("message", "hi");
    expect(handler).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const emitter = new TypedEmitter<Events>();
    const handler = vi.fn();
    emitter.once("count", handler);
    emitter.emit("count", 1);
    emitter.emit("count", 2);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(1);
  });

  it("removeAll clears specific event", () => {
    const emitter = new TypedEmitter<Events>();
    emitter.on("message", vi.fn());
    emitter.on("count", vi.fn());
    emitter.removeAll("message");
    expect(emitter.listenerCount("message")).toBe(0);
    expect(emitter.listenerCount("count")).toBe(1);
  });

  it("removeAll with no arg clears everything", () => {
    const emitter = new TypedEmitter<Events>();
    emitter.on("message", vi.fn());
    emitter.on("count", vi.fn());
    emitter.removeAll();
    expect(emitter.listenerCount("message")).toBe(0);
    expect(emitter.listenerCount("count")).toBe(0);
  });

  it("listenerCount returns correct count", () => {
    const emitter = new TypedEmitter<Events>();
    expect(emitter.listenerCount("message")).toBe(0);
    emitter.on("message", vi.fn());
    emitter.on("message", vi.fn());
    expect(emitter.listenerCount("message")).toBe(2);
  });

  it("swallows handler errors", () => {
    const emitter = new TypedEmitter<Events>();
    const good = vi.fn();
    emitter.on("message", () => { throw new Error("bad"); });
    emitter.on("message", good);
    emitter.emit("message", "test");
    expect(good).toHaveBeenCalled();
  });
});

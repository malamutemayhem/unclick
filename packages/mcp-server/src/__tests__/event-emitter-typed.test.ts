import { describe, it, expect, vi } from "vitest";
import { TypedEventEmitter } from "../event-emitter-typed.js";

type TestEvents = {
  message: string;
  count: number;
  data: { id: number; name: string };
  [key: string]: unknown;
};

describe("TypedEventEmitter", () => {
  it("emits and receives events", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const fn = vi.fn();
    emitter.on("message", fn);
    emitter.emit("message", "hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("supports multiple listeners", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    emitter.on("count", fn1);
    emitter.on("count", fn2);
    emitter.emit("count", 42);
    expect(fn1).toHaveBeenCalledWith(42);
    expect(fn2).toHaveBeenCalledWith(42);
  });

  it("once fires only once", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const fn = vi.fn();
    emitter.once("message", fn);
    emitter.emit("message", "a");
    emitter.emit("message", "b");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("off removes listener", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    const fn = vi.fn();
    emitter.on("message", fn);
    emitter.off("message", fn);
    emitter.emit("message", "ignored");
    expect(fn).not.toHaveBeenCalled();
  });

  it("emit returns false when no listeners", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    expect(emitter.emit("message", "test")).toBe(false);
  });

  it("listenerCount tracks correctly", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.once("message", () => {});
    expect(emitter.listenerCount("message")).toBe(2);
  });

  it("removeAllListeners for specific event", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.on("count", () => {});
    emitter.removeAllListeners("message");
    expect(emitter.listenerCount("message")).toBe(0);
    expect(emitter.listenerCount("count")).toBe(1);
  });

  it("eventNames returns active events", () => {
    const emitter = new TypedEventEmitter<TestEvents>();
    emitter.on("message", () => {});
    emitter.on("count", () => {});
    const names = emitter.eventNames();
    expect(names).toContain("message");
    expect(names).toContain("count");
  });

  it("pipe forwards events", () => {
    const source = new TypedEventEmitter<TestEvents>();
    const target = new TypedEventEmitter<TestEvents>();
    const fn = vi.fn();
    target.on("message", fn);
    source.pipe("message", target);
    source.emit("message", "piped");
    expect(fn).toHaveBeenCalledWith("piped");
  });
});

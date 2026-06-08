import { describe, it, expect, vi } from "vitest";
import { PubSub } from "../pub-sub.js";

interface Events {
  message: string;
  count: number;
  done: void;
}

describe("PubSub", () => {
  it("emits and receives events", () => {
    const ps = new PubSub<Events>();
    const fn = vi.fn();
    ps.on("message", fn);
    ps.emit("message", "hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("different event types are independent", () => {
    const ps = new PubSub<Events>();
    const fn = vi.fn();
    ps.on("message", fn);
    ps.emit("count", 42);
    expect(fn).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const ps = new PubSub<Events>();
    const fn = vi.fn();
    ps.once("count", fn);
    ps.emit("count", 1);
    ps.emit("count", 2);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("unsubscribe via returned function", () => {
    const ps = new PubSub<Events>();
    const fn = vi.fn();
    const off = ps.on("message", fn);
    off();
    ps.emit("message", "hi");
    expect(fn).not.toHaveBeenCalled();
  });

  it("off removes all handlers for event", () => {
    const ps = new PubSub<Events>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    ps.on("message", fn1);
    ps.on("message", fn2);
    ps.off("message");
    ps.emit("message", "hi");
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
  });

  it("offAll removes everything", () => {
    const ps = new PubSub<Events>();
    ps.on("message", vi.fn());
    ps.on("count", vi.fn());
    ps.offAll();
    expect(ps.listenerCount("message")).toBe(0);
    expect(ps.listenerCount("count")).toBe(0);
  });

  it("listenerCount tracks handlers", () => {
    const ps = new PubSub<Events>();
    expect(ps.listenerCount("message")).toBe(0);
    const off = ps.on("message", () => {});
    expect(ps.listenerCount("message")).toBe(1);
    off();
    expect(ps.listenerCount("message")).toBe(0);
  });

  it("emit to non-existent event is safe", () => {
    const ps = new PubSub<Events>();
    expect(() => ps.emit("message", "x")).not.toThrow();
  });
});

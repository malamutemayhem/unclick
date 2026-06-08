import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "../event-emitter.js";

type TestEvents = { click: { x: number; y: number }; close: void; data: string };

describe("EventEmitter", () => {
  it("calls handler on emit", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn = vi.fn();
    ee.on("data", fn);
    ee.emit("data", "hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("supports multiple handlers", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    ee.on("data", fn1);
    ee.on("data", fn2);
    ee.emit("data", "test");
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  it("off removes a handler", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn = vi.fn();
    ee.on("data", fn);
    ee.off("data", fn);
    ee.emit("data", "test");
    expect(fn).not.toHaveBeenCalled();
  });

  it("on returns unsubscribe function", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn = vi.fn();
    const unsub = ee.on("data", fn);
    unsub();
    ee.emit("data", "test");
    expect(fn).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn = vi.fn();
    ee.once("data", fn);
    ee.emit("data", "first");
    ee.emit("data", "second");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("first");
  });

  it("removeAllListeners for specific event", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    ee.on("data", fn1);
    ee.on("close", fn2);
    ee.removeAllListeners("data");
    ee.emit("data", "test");
    ee.emit("close", undefined as any);
    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  it("removeAllListeners clears all", () => {
    const ee = new EventEmitter<TestEvents>();
    const fn = vi.fn();
    ee.on("data", fn);
    ee.on("close", fn);
    ee.removeAllListeners();
    ee.emit("data", "test");
    expect(fn).not.toHaveBeenCalled();
  });

  it("listenerCount returns correct count", () => {
    const ee = new EventEmitter<TestEvents>();
    expect(ee.listenerCount("data")).toBe(0);
    ee.on("data", () => {});
    ee.on("data", () => {});
    expect(ee.listenerCount("data")).toBe(2);
  });

  it("eventNames returns registered events", () => {
    const ee = new EventEmitter<TestEvents>();
    ee.on("data", () => {});
    ee.on("close", () => {});
    expect(ee.eventNames()).toContain("data");
    expect(ee.eventNames()).toContain("close");
  });

  it("emit with no listeners does nothing", () => {
    const ee = new EventEmitter<TestEvents>();
    expect(() => ee.emit("data", "hello")).not.toThrow();
  });
});

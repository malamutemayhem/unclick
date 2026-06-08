import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "../event-emitter.js";

interface TestEvents {
  data: string;
  count: number;
  empty: undefined;
}

describe("EventEmitter", () => {
  it("on and emit", () => {
    const ee = new EventEmitter<TestEvents>();
    const handler = vi.fn();
    ee.on("data", handler);
    ee.emit("data", "hello");
    expect(handler).toHaveBeenCalledWith("hello");
  });

  it("multiple handlers", () => {
    const ee = new EventEmitter<TestEvents>();
    const h1 = vi.fn();
    const h2 = vi.fn();
    ee.on("data", h1);
    ee.on("data", h2);
    ee.emit("data", "x");
    expect(h1).toHaveBeenCalled();
    expect(h2).toHaveBeenCalled();
  });

  it("off removes handler", () => {
    const ee = new EventEmitter<TestEvents>();
    const handler = vi.fn();
    ee.on("data", handler);
    ee.off("data", handler);
    ee.emit("data", "x");
    expect(handler).not.toHaveBeenCalled();
  });

  it("on returns unsubscribe function", () => {
    const ee = new EventEmitter<TestEvents>();
    const handler = vi.fn();
    const unsub = ee.on("data", handler);
    unsub();
    ee.emit("data", "x");
    expect(handler).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const ee = new EventEmitter<TestEvents>();
    const handler = vi.fn();
    ee.once("data", handler);
    ee.emit("data", "first");
    ee.emit("data", "second");
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith("first");
  });

  it("removeAllListeners for specific event", () => {
    const ee = new EventEmitter<TestEvents>();
    const h1 = vi.fn();
    const h2 = vi.fn();
    ee.on("data", h1);
    ee.on("count", h2);
    ee.removeAllListeners("data");
    ee.emit("data", "x");
    ee.emit("count", 1);
    expect(h1).not.toHaveBeenCalled();
    expect(h2).toHaveBeenCalled();
  });

  it("removeAllListeners clears everything", () => {
    const ee = new EventEmitter<TestEvents>();
    ee.on("data", vi.fn());
    ee.on("count", vi.fn());
    ee.removeAllListeners();
    expect(ee.eventNames()).toEqual([]);
  });

  it("listenerCount returns total", () => {
    const ee = new EventEmitter<TestEvents>();
    ee.on("data", vi.fn());
    ee.on("data", vi.fn());
    ee.once("data", vi.fn());
    expect(ee.listenerCount("data")).toBe(3);
  });

  it("eventNames returns active events", () => {
    const ee = new EventEmitter<TestEvents>();
    ee.on("data", vi.fn());
    ee.on("count", vi.fn());
    expect(ee.eventNames().sort()).toEqual(["count", "data"]);
  });

  it("waitFor resolves on emit", async () => {
    const ee = new EventEmitter<TestEvents>();
    const promise = ee.waitFor("data");
    ee.emit("data", "resolved");
    expect(await promise).toBe("resolved");
  });

  it("waitFor rejects on timeout", async () => {
    const ee = new EventEmitter<TestEvents>();
    await expect(ee.waitFor("data", 10)).rejects.toThrow("Timeout");
  });
});

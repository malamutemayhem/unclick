import { describe, it, expect } from "vitest";
import { EventEmitter } from "../event-emitter.js";

describe("EventEmitter", () => {
  it("on and emit", () => {
    const ee = new EventEmitter();
    const calls: unknown[] = [];
    ee.on("test", (v) => calls.push(v));
    ee.emit("test", 42);
    ee.emit("test", "hello");
    expect(calls).toEqual([42, "hello"]);
  });

  it("off removes handler", () => {
    const ee = new EventEmitter();
    const calls: unknown[] = [];
    const handler = (v: unknown) => calls.push(v);
    ee.on("test", handler);
    ee.emit("test", 1);
    ee.off("test", handler);
    ee.emit("test", 2);
    expect(calls).toEqual([1]);
  });

  it("on returns unsubscribe function", () => {
    const ee = new EventEmitter();
    const calls: unknown[] = [];
    const unsub = ee.on("test", (v) => calls.push(v));
    ee.emit("test", 1);
    unsub();
    ee.emit("test", 2);
    expect(calls).toEqual([1]);
  });

  it("once fires only once", () => {
    const ee = new EventEmitter();
    let count = 0;
    ee.once("test", () => count++);
    ee.emit("test");
    ee.emit("test");
    expect(count).toBe(1);
  });

  it("removeAllListeners for specific event", () => {
    const ee = new EventEmitter();
    let a = 0, b = 0;
    ee.on("a", () => a++);
    ee.on("b", () => b++);
    ee.removeAllListeners("a");
    ee.emit("a");
    ee.emit("b");
    expect(a).toBe(0);
    expect(b).toBe(1);
  });

  it("removeAllListeners for all events", () => {
    const ee = new EventEmitter();
    let count = 0;
    ee.on("a", () => count++);
    ee.on("b", () => count++);
    ee.removeAllListeners();
    ee.emit("a");
    ee.emit("b");
    expect(count).toBe(0);
  });

  it("listenerCount and eventNames", () => {
    const ee = new EventEmitter();
    ee.on("a", () => {});
    ee.on("a", () => {});
    ee.once("b", () => {});
    expect(ee.listenerCount("a")).toBe(2);
    expect(ee.listenerCount("b")).toBe(1);
    expect(ee.eventNames().sort()).toEqual(["a", "b"]);
  });
});

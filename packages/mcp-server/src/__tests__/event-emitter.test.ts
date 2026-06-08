import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "../event-emitter.js";

describe("EventEmitter", () => {
  it("emits events to listeners", () => {
    const ee = new EventEmitter<{ greet: string }>();
    const fn = vi.fn();
    ee.on("greet", fn);
    ee.emit("greet", "hello");
    expect(fn).toHaveBeenCalledWith("hello");
  });

  it("supports multiple listeners", () => {
    const ee = new EventEmitter<{ x: number }>();
    const a = vi.fn();
    const b = vi.fn();
    ee.on("x", a);
    ee.on("x", b);
    ee.emit("x", 42);
    expect(a).toHaveBeenCalledWith(42);
    expect(b).toHaveBeenCalledWith(42);
  });

  it("once fires only once", () => {
    const ee = new EventEmitter<{ x: number }>();
    const fn = vi.fn();
    ee.once("x", fn);
    ee.emit("x", 1);
    ee.emit("x", 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("off removes listener", () => {
    const ee = new EventEmitter<{ x: number }>();
    const fn = vi.fn();
    ee.on("x", fn);
    ee.off("x", fn);
    ee.emit("x", 1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("emit returns false for no listeners", () => {
    const ee = new EventEmitter();
    expect(ee.emit("nope", null)).toBe(false);
  });

  it("removeAllListeners clears all", () => {
    const ee = new EventEmitter<{ a: number; b: number }>();
    ee.on("a", () => {});
    ee.on("b", () => {});
    ee.removeAllListeners();
    expect(ee.eventNames()).toEqual([]);
  });

  it("removeAllListeners with event clears specific", () => {
    const ee = new EventEmitter<{ a: number; b: number }>();
    ee.on("a", () => {});
    ee.on("b", () => {});
    ee.removeAllListeners("a");
    expect(ee.listenerCount("a")).toBe(0);
    expect(ee.listenerCount("b")).toBe(1);
  });

  it("listenerCount returns count", () => {
    const ee = new EventEmitter<{ x: number }>();
    ee.on("x", () => {});
    ee.on("x", () => {});
    expect(ee.listenerCount("x")).toBe(2);
  });

  it("eventNames returns active events", () => {
    const ee = new EventEmitter<{ a: number; b: string }>();
    ee.on("a", () => {});
    ee.on("b", () => {});
    expect(ee.eventNames().sort()).toEqual(["a", "b"]);
  });
});

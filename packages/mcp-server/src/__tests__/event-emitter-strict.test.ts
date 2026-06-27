import { describe, it, expect, vi } from "vitest";
import { StrictEmitter } from "../event-emitter-strict.js";

describe("event-emitter-strict", () => {
  type Events = { click: { x: number; y: number }; close: void };

  it("on and emit work", () => {
    const emitter = new StrictEmitter<Events>();
    const fn = vi.fn();
    emitter.on("click", fn);
    emitter.emit("click", { x: 1, y: 2 });
    expect(fn).toHaveBeenCalledWith({ x: 1, y: 2 });
  });

  it("off removes listener", () => {
    const emitter = new StrictEmitter<Events>();
    const fn = vi.fn();
    emitter.on("click", fn);
    emitter.off("click", fn);
    emitter.emit("click", { x: 1, y: 2 });
    expect(fn).not.toHaveBeenCalled();
  });

  it("on returns unsubscribe function", () => {
    const emitter = new StrictEmitter<Events>();
    const fn = vi.fn();
    const unsub = emitter.on("click", fn);
    unsub();
    emitter.emit("click", { x: 1, y: 2 });
    expect(fn).not.toHaveBeenCalled();
  });

  it("once fires only once", () => {
    const emitter = new StrictEmitter<Events>();
    const fn = vi.fn();
    emitter.once("click", fn);
    emitter.emit("click", { x: 1, y: 2 });
    emitter.emit("click", { x: 3, y: 4 });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("listenerCount and eventNames", () => {
    const emitter = new StrictEmitter<Events>();
    emitter.on("click", () => {});
    emitter.on("click", () => {});
    expect(emitter.listenerCount("click")).toBe(2);
    expect(emitter.eventNames()).toEqual(["click"]);
  });

  it("removeAllListeners clears specific event", () => {
    const emitter = new StrictEmitter<Events>();
    emitter.on("click", () => {});
    emitter.on("close", () => {});
    emitter.removeAllListeners("click");
    expect(emitter.listenerCount("click")).toBe(0);
    expect(emitter.listenerCount("close")).toBe(1);
  });

  it("waitFor returns a promise", async () => {
    const emitter = new StrictEmitter<Events>();
    const p = emitter.waitFor("click");
    emitter.emit("click", { x: 5, y: 6 });
    const result = await p;
    expect(result).toEqual({ x: 5, y: 6 });
  });
});

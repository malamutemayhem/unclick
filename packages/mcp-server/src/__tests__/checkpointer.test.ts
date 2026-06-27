import { describe, it, expect } from "vitest";
import { Checkpointer } from "../checkpointer.js";

describe("Checkpointer", () => {
  it("save and restore", () => {
    const cp = new Checkpointer();
    const id = cp.save({ count: 5 });
    const restored = cp.restore(id);
    expect(restored).toEqual({ count: 5 });
  });

  it("restore returns deep copy", () => {
    const cp = new Checkpointer();
    const state = { items: [1, 2, 3] };
    const id = cp.save(state);
    state.items.push(4);
    const restored = cp.restore(id);
    expect(restored).toEqual({ items: [1, 2, 3] });
  });

  it("restoreLatest gets most recent", () => {
    const cp = new Checkpointer();
    cp.save({ v: 1 });
    cp.save({ v: 2 });
    cp.save({ v: 3 });
    expect(cp.restoreLatest()).toEqual({ v: 3 });
  });

  it("restoreByLabel finds labeled checkpoint", () => {
    const cp = new Checkpointer();
    cp.save({ v: 1 }, "start");
    cp.save({ v: 2 }, "middle");
    cp.save({ v: 3 }, "end");
    expect(cp.restoreByLabel("middle")).toEqual({ v: 2 });
  });

  it("returns undefined for missing", () => {
    const cp = new Checkpointer();
    expect(cp.restore("nope")).toBeUndefined();
    expect(cp.restoreLatest()).toBeUndefined();
    expect(cp.restoreByLabel("nope")).toBeUndefined();
  });

  it("respects max checkpoints", () => {
    const cp = new Checkpointer(3);
    cp.save(1); cp.save(2); cp.save(3); cp.save(4);
    expect(cp.size).toBe(3);
    expect(cp.restoreLatest()).toBe(4);
  });

  it("delete removes checkpoint", () => {
    const cp = new Checkpointer();
    const id = cp.save("test");
    expect(cp.delete(id)).toBe(true);
    expect(cp.restore(id)).toBeUndefined();
    expect(cp.delete(id)).toBe(false);
  });

  it("list returns all checkpoints", () => {
    const cp = new Checkpointer();
    cp.save(1, "a");
    cp.save(2, "b");
    expect(cp.list().length).toBe(2);
    expect(cp.list()[0].label).toBe("a");
  });

  it("clear empties all", () => {
    const cp = new Checkpointer();
    cp.save(1); cp.save(2);
    cp.clear();
    expect(cp.size).toBe(0);
  });
});

import { describe, it, expect, vi } from "vitest";
import { ObservableMap } from "../observable-map";

describe("ObservableMap", () => {
  it("sets and gets values", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    expect(m.get("a")).toBe(1);
    expect(m.size).toBe(1);
  });

  it("checks has", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    expect(m.has("a")).toBe(true);
    expect(m.has("b")).toBe(false);
  });

  it("deletes values", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    expect(m.delete("a")).toBe(true);
    expect(m.has("a")).toBe(false);
    expect(m.size).toBe(0);
  });

  it("returns false when deleting non-existent key", () => {
    const m = new ObservableMap<string, number>();
    expect(m.delete("nope")).toBe(false);
  });

  it("clears all entries", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    m.clear();
    expect(m.size).toBe(0);
  });

  it("returns keys, values, and entries", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.keys()).toEqual(["a", "b"]);
    expect(m.values()).toEqual([1, 2]);
    expect(m.entries()).toEqual([["a", 1], ["b", 2]]);
  });

  it("notifies on set", () => {
    const m = new ObservableMap<string, number>();
    const fn = vi.fn();
    m.subscribe(fn);
    m.set("x", 42);
    expect(fn).toHaveBeenCalledWith({ type: "set", key: "x", value: 42 });
  });

  it("notifies on delete", () => {
    const m = new ObservableMap<string, number>();
    m.set("x", 1);
    const fn = vi.fn();
    m.subscribe(fn);
    m.delete("x");
    expect(fn).toHaveBeenCalledWith({ type: "delete", key: "x" });
  });

  it("does not notify on failed delete", () => {
    const m = new ObservableMap<string, number>();
    const fn = vi.fn();
    m.subscribe(fn);
    m.delete("nope");
    expect(fn).not.toHaveBeenCalled();
  });

  it("notifies on clear", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    const fn = vi.fn();
    m.subscribe(fn);
    m.clear();
    expect(fn).toHaveBeenCalledWith({ type: "clear" });
  });

  it("unsubscribe stops notifications", () => {
    const m = new ObservableMap<string, number>();
    const fn = vi.fn();
    const unsub = m.subscribe(fn);
    unsub();
    m.set("a", 1);
    expect(fn).not.toHaveBeenCalled();
  });

  it("supports multiple subscribers", () => {
    const m = new ObservableMap<string, number>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    m.subscribe(fn1);
    m.subscribe(fn2);
    m.set("a", 1);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});

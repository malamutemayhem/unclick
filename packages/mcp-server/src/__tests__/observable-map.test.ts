import { describe, it, expect, vi } from "vitest";
import { ObservableMap } from "../observable-map.js";

describe("ObservableMap", () => {
  it("basic set and get", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    expect(m.get("a")).toBe(1);
    expect(m.has("a")).toBe(true);
    expect(m.size).toBe(1);
  });

  it("notifies on set", () => {
    const m = new ObservableMap<string, number>();
    const listener = vi.fn();
    m.subscribe(listener);
    m.set("x", 42);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({
      type: "set", key: "x", value: 42
    }));
  });

  it("notifies with oldValue on overwrite", () => {
    const m = new ObservableMap<string, number>();
    m.set("x", 1);
    const listener = vi.fn();
    m.subscribe(listener);
    m.set("x", 2);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({
      type: "set", key: "x", value: 2, oldValue: 1
    }));
  });

  it("notifies on delete", () => {
    const m = new ObservableMap<string, number>();
    m.set("x", 1);
    const listener = vi.fn();
    m.subscribe(listener);
    m.delete("x");
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({
      type: "delete", key: "x", oldValue: 1
    }));
  });

  it("delete returns false for missing key", () => {
    const m = new ObservableMap<string, number>();
    const listener = vi.fn();
    m.subscribe(listener);
    expect(m.delete("nope")).toBe(false);
    expect(listener).not.toHaveBeenCalled();
  });

  it("notifies on clear", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1);
    const listener = vi.fn();
    m.subscribe(listener);
    m.clear();
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ type: "clear" }));
    expect(m.size).toBe(0);
  });

  it("unsubscribe stops notifications", () => {
    const m = new ObservableMap<string, number>();
    const listener = vi.fn();
    const unsub = m.subscribe(listener);
    unsub();
    m.set("a", 1);
    expect(listener).not.toHaveBeenCalled();
  });

  it("keys/values/entries iterate", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1); m.set("b", 2);
    expect([...m.keys()]).toEqual(["a", "b"]);
    expect([...m.values()]).toEqual([1, 2]);
    expect([...m.entries()]).toEqual([["a", 1], ["b", 2]]);
  });

  it("forEach iterates", () => {
    const m = new ObservableMap<string, number>();
    m.set("x", 10);
    const results: [string, number][] = [];
    m.forEach((v, k) => results.push([k, v]));
    expect(results).toEqual([["x", 10]]);
  });

  it("toObject converts to record", () => {
    const m = new ObservableMap<string, number>();
    m.set("a", 1); m.set("b", 2);
    expect(m.toObject()).toEqual({ a: 1, b: 2 });
  });

  it("from creates from entries", () => {
    const m = ObservableMap.from([["a", 1], ["b", 2]] as [string, number][]);
    expect(m.size).toBe(2);
    expect(m.get("a")).toBe(1);
  });
});

import { describe, it, expect } from "vitest";
import { TopK } from "../topk.js";

describe("TopK", () => {
  it("tracks and returns top items", () => {
    const tk = new TopK<string>(2);
    tk.add("a", 5);
    tk.add("b", 10);
    tk.add("c", 3);
    const top = tk.top();
    expect(top).toHaveLength(2);
    expect(top[0]).toEqual({ item: "b", count: 10 });
    expect(top[1]).toEqual({ item: "a", count: 5 });
  });

  it("accumulates counts for same item", () => {
    const tk = new TopK<string>(3);
    tk.add("x");
    tk.add("x");
    tk.add("x");
    expect(tk.getCount("x")).toBe(3);
  });

  it("getCount returns 0 for unknown items", () => {
    const tk = new TopK<string>(3);
    expect(tk.getCount("nope")).toBe(0);
  });

  it("tracks size", () => {
    const tk = new TopK<string>(5);
    tk.add("a");
    tk.add("b");
    expect(tk.size).toBe(2);
  });

  it("reset clears all data", () => {
    const tk = new TopK<string>(3);
    tk.add("a", 10);
    tk.reset();
    expect(tk.size).toBe(0);
    expect(tk.top()).toEqual([]);
  });

  it("merge combines two TopK instances", () => {
    const a = new TopK<string>(3);
    a.add("x", 5);
    a.add("y", 3);
    const b = new TopK<string>(3);
    b.add("x", 2);
    b.add("z", 10);
    a.merge(b);
    expect(a.getCount("x")).toBe(7);
    expect(a.getCount("z")).toBe(10);
  });

  it("throws if k < 1", () => {
    expect(() => new TopK(0)).toThrow();
  });
});

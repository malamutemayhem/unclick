import { describe, it, expect } from "vitest";
import { deepEqual, deepClone, diff } from "../deep-equal.js";

describe("deepEqual", () => {
  it("primitives equal", () => { expect(deepEqual(1, 1)).toBe(true); });
  it("primitives not equal", () => { expect(deepEqual(1, 2)).toBe(false); });
  it("strings", () => { expect(deepEqual("a", "a")).toBe(true); });
  it("null/undefined", () => { expect(deepEqual(null, undefined)).toBe(false); });
  it("null vs null", () => { expect(deepEqual(null, null)).toBe(true); });
  it("type mismatch", () => { expect(deepEqual(1, "1")).toBe(false); });
  it("arrays equal", () => { expect(deepEqual([1, 2], [1, 2])).toBe(true); });
  it("arrays not equal", () => { expect(deepEqual([1, 2], [1, 3])).toBe(false); });
  it("arrays different length", () => { expect(deepEqual([1], [1, 2])).toBe(false); });
  it("objects equal", () => { expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true); });
  it("objects not equal", () => { expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false); });
  it("nested objects", () => { expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true); });
  it("Date equal", () => { expect(deepEqual(new Date(1000), new Date(1000))).toBe(true); });
  it("Date not equal", () => { expect(deepEqual(new Date(1000), new Date(2000))).toBe(false); });
  it("RegExp equal", () => { expect(deepEqual(/abc/i, /abc/i)).toBe(true); });
  it("RegExp not equal", () => { expect(deepEqual(/abc/i, /abc/g)).toBe(false); });
  it("Set equal", () => { expect(deepEqual(new Set([1, 2]), new Set([1, 2]))).toBe(true); });
  it("Set not equal", () => { expect(deepEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false); });
  it("Map equal", () => { expect(deepEqual(new Map([["a", 1]]), new Map([["a", 1]]))).toBe(true); });
  it("Map not equal", () => { expect(deepEqual(new Map([["a", 1]]), new Map([["a", 2]]))).toBe(false); });
});

describe("deepClone", () => {
  it("clones primitives", () => { expect(deepClone(42)).toBe(42); });
  it("clones arrays", () => {
    const a = [1, [2, 3]];
    const b = deepClone(a);
    expect(b).toEqual(a);
    (b[1] as number[])[0] = 99;
    expect((a[1] as number[])[0]).toBe(2);
  });
  it("clones objects", () => {
    const a = { x: { y: 1 } };
    const b = deepClone(a);
    b.x.y = 99;
    expect(a.x.y).toBe(1);
  });
  it("clones Date", () => {
    const d = new Date(1000);
    const c = deepClone(d);
    expect(c.getTime()).toBe(1000);
    expect(c).not.toBe(d);
  });
  it("clones Set", () => {
    const s = new Set([1, 2]);
    const c = deepClone(s);
    expect(c).toEqual(s);
    c.add(3);
    expect(s.size).toBe(2);
  });
  it("clones Map", () => {
    const m = new Map([["a", 1]]);
    const c = deepClone(m);
    c.set("b", 2);
    expect(m.size).toBe(1);
  });
  it("handles null", () => { expect(deepClone(null)).toBe(null); });
});

describe("diff", () => {
  it("returns empty for equal values", () => {
    expect(diff({ a: 1 }, { a: 1 })).toEqual([]);
  });
  it("detects changed value", () => {
    const d = diff({ a: 1 }, { a: 2 });
    expect(d).toHaveLength(1);
    expect(d[0]).toContain("a");
  });
  it("detects added key", () => {
    const d = diff({}, { a: 1 });
    expect(d).toHaveLength(1);
    expect(d[0]).toContain("<missing>");
  });
  it("detects removed key", () => {
    const d = diff({ a: 1 }, {});
    expect(d).toHaveLength(1);
    expect(d[0]).toContain("<missing>");
  });
  it("handles arrays", () => {
    const d = diff([1, 2], [1, 3]);
    expect(d).toHaveLength(1);
  });
});

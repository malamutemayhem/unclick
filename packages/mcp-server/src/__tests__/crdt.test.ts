import { describe, it, expect } from "vitest";
import {
  createGCounter, gIncrement, gValue, gMerge,
  createPNCounter, pnIncrement, pnDecrement, pnValue, pnMerge,
  createGSet, gSetAdd, gSetHas, gSetMerge,
  createLWWRegister, lwwSet, lwwMerge,
  createLWWMap, lwwMapSet, lwwMapGet, lwwMapMerge,
} from "../crdt.js";

describe("GCounter", () => {
  it("starts at zero", () => {
    expect(gValue(createGCounter("a"))).toBe(0);
  });

  it("increments", () => {
    let c = createGCounter("a");
    c = gIncrement(c);
    c = gIncrement(c, 5);
    expect(gValue(c)).toBe(6);
  });

  it("merges two counters", () => {
    let a = gIncrement(createGCounter("a"), 3);
    let b = gIncrement(createGCounter("b"), 7);
    const merged = gMerge(a, b);
    expect(gValue(merged)).toBe(10);
  });

  it("merge is idempotent", () => {
    let a = gIncrement(createGCounter("a"), 5);
    const m1 = gMerge(a, a);
    expect(gValue(m1)).toBe(5);
  });
});

describe("PNCounter", () => {
  it("increments and decrements", () => {
    let c = createPNCounter("a");
    c = pnIncrement(c, 10);
    c = pnDecrement(c, 3);
    expect(pnValue(c)).toBe(7);
  });

  it("merges two PN counters", () => {
    let a = pnIncrement(createPNCounter("a"), 10);
    let b = createPNCounter("b");
    b = pnIncrement(b, 5);
    b = pnDecrement(b, 2);
    const merged = pnMerge(a, b);
    expect(pnValue(merged)).toBe(13);
  });
});

describe("GSet", () => {
  it("adds and checks membership", () => {
    let s = createGSet<string>();
    s = gSetAdd(s, "hello");
    expect(gSetHas(s, "hello")).toBe(true);
    expect(gSetHas(s, "world")).toBe(false);
  });

  it("merges two sets", () => {
    let a = gSetAdd(createGSet<number>(), 1);
    a = gSetAdd(a, 2);
    let b = gSetAdd(createGSet<number>(), 2);
    b = gSetAdd(b, 3);
    const merged = gSetMerge(a, b);
    expect(merged.items.size).toBe(3);
    expect(gSetHas(merged, 1)).toBe(true);
    expect(gSetHas(merged, 3)).toBe(true);
  });
});

describe("LWWRegister", () => {
  it("updates with newer timestamp", () => {
    let r = createLWWRegister("old", 1);
    r = lwwSet(r, "new", 2);
    expect(r.value).toBe("new");
  });

  it("ignores older timestamp", () => {
    let r = createLWWRegister("current", 5);
    r = lwwSet(r, "old", 3);
    expect(r.value).toBe("current");
  });

  it("merges two registers", () => {
    const a = createLWWRegister("a", 1);
    const b = createLWWRegister("b", 2);
    expect(lwwMerge(a, b).value).toBe("b");
    expect(lwwMerge(b, a).value).toBe("b");
  });
});

describe("LWWMap", () => {
  it("sets and gets values", () => {
    let m = createLWWMap<string, number>();
    m = lwwMapSet(m, "x", 42, 1);
    expect(lwwMapGet(m, "x")).toBe(42);
  });

  it("last-write wins on same key", () => {
    let m = createLWWMap<string, string>();
    m = lwwMapSet(m, "k", "first", 1);
    m = lwwMapSet(m, "k", "second", 2);
    expect(lwwMapGet(m, "k")).toBe("second");
  });

  it("merges two maps", () => {
    let a = lwwMapSet(createLWWMap<string, number>(), "x", 1, 1);
    let b = lwwMapSet(createLWWMap<string, number>(), "x", 2, 2);
    b = lwwMapSet(b, "y", 10, 1);
    const merged = lwwMapMerge(a, b);
    expect(lwwMapGet(merged, "x")).toBe(2);
    expect(lwwMapGet(merged, "y")).toBe(10);
  });
});

import { describe, it, expect } from "vitest";
import { RefCountGC } from "../ref-count-gc.js";

describe("RefCountGC", () => {
  it("alloc creates objects", () => {
    const gc = new RefCountGC();
    const a = gc.alloc("hello");
    expect(gc.isAlive(a)).toBe(true);
    expect(gc.getData(a)).toBe("hello");
    expect(gc.liveCount).toBe(1);
  });

  it("root keeps object alive", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    gc.addRoot(a);
    expect(gc.getRefCount(a)).toBe(1);
    expect(gc.rootCount).toBe(1);
  });

  it("removing root collects object", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    gc.addRoot(a);
    gc.removeRoot(a);
    expect(gc.isAlive(a)).toBe(false);
  });

  it("addRef keeps referenced object alive", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    const b = gc.alloc();
    gc.addRoot(a);
    gc.addRef(a, b);
    expect(gc.getRefCount(b)).toBe(1);
    expect(gc.isAlive(b)).toBe(true);
  });

  it("removeRef decrements count", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    const b = gc.alloc();
    gc.addRoot(a);
    gc.addRef(a, b);
    gc.removeRef(a, b);
    expect(gc.isAlive(b)).toBe(false);
  });

  it("cascading collection", () => {
    const gc = new RefCountGC();
    const a = gc.alloc("a");
    const b = gc.alloc("b");
    const c = gc.alloc("c");
    gc.addRoot(a);
    gc.addRef(a, b);
    gc.addRef(b, c);
    gc.removeRoot(a);
    expect(gc.isAlive(a)).toBe(false);
    expect(gc.isAlive(b)).toBe(false);
    expect(gc.isAlive(c)).toBe(false);
  });

  it("collectCycles breaks cycles", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    const b = gc.alloc();
    gc.addRoot(a);
    gc.addRef(a, b);
    gc.addRef(b, a);
    gc.removeRoot(a);
    expect(gc.liveCount).toBeGreaterThan(0);
    const collected = gc.collectCycles();
    expect(collected).toBe(2);
    expect(gc.liveCount).toBe(0);
  });

  it("freedIds tracks collected objects", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    gc.addRoot(a);
    gc.removeRoot(a);
    expect(gc.freedIds).toContain(a);
  });

  it("stats returns summary", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    gc.addRoot(a);
    const s = gc.stats();
    expect(s.live).toBe(1);
    expect(s.roots).toBe(1);
  });

  it("multiple refs prevent collection", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    const b = gc.alloc();
    const c = gc.alloc();
    gc.addRoot(a);
    gc.addRoot(b);
    gc.addRef(a, c);
    gc.addRef(b, c);
    gc.removeRef(a, c);
    expect(gc.isAlive(c)).toBe(true);
    gc.removeRef(b, c);
    expect(gc.isAlive(c)).toBe(false);
  });

  it("weak refs do not prevent collection", () => {
    const gc = new RefCountGC();
    const a = gc.alloc();
    const b = gc.alloc();
    gc.addRoot(a);
    gc.addWeakRef(a, b);
    expect(gc.getRefCount(b)).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { Arena, TypedArena, PoolArena } from "../arena-alloc.js";

describe("Arena", () => {
  it("allocates memory", () => {
    const arena = new Arena(100);
    const { offset, view } = arena.alloc(10);
    expect(offset).toBe(0);
    expect(view.length).toBe(10);
    expect(arena.used).toBe(10);
  });

  it("allocates sequential blocks", () => {
    const arena = new Arena(100);
    const a = arena.alloc(5);
    const b = arena.alloc(3);
    expect(a.offset).toBe(0);
    expect(b.offset).toBe(5);
    expect(arena.used).toBe(8);
  });

  it("allocZeroed fills with zeros", () => {
    const arena = new Arena(100);
    const { view } = arena.allocZeroed(5);
    for (let i = 0; i < 5; i++) expect(view[i]).toBe(0);
  });

  it("get and set values", () => {
    const arena = new Arena(100);
    arena.alloc(5);
    arena.set(0, [1, 2, 3, 4, 5]);
    const data = arena.get(0, 5);
    expect(Array.from(data)).toEqual([1, 2, 3, 4, 5]);
  });

  it("mark and restore", () => {
    const arena = new Arena(100);
    arena.alloc(10);
    const mark = arena.mark();
    arena.alloc(20);
    expect(arena.used).toBe(30);
    arena.restore(mark);
    expect(arena.used).toBe(10);
  });

  it("grows when needed", () => {
    const arena = new Arena(4);
    arena.alloc(10);
    expect(arena.capacity).toBeGreaterThanOrEqual(10);
  });

  it("reset clears all", () => {
    const arena = new Arena(100);
    arena.alloc(50);
    arena.reset();
    expect(arena.used).toBe(0);
  });

  it("tracks available space", () => {
    const arena = new Arena(100);
    expect(arena.available).toBe(100);
    arena.alloc(30);
    expect(arena.available).toBe(70);
  });
});

describe("TypedArena", () => {
  it("allocates and retrieves items", () => {
    const arena = new TypedArena<string>();
    const h1 = arena.alloc("hello");
    const h2 = arena.alloc("world");
    expect(arena.get(h1)).toBe("hello");
    expect(arena.get(h2)).toBe("world");
    expect(arena.size).toBe(2);
  });

  it("frees and reuses slots", () => {
    const arena = new TypedArena<number>();
    const h1 = arena.alloc(1);
    arena.free(h1);
    expect(arena.size).toBe(0);
    const h2 = arena.alloc(2);
    expect(h2).toBe(h1);
  });

  it("forEach skips freed items", () => {
    const arena = new TypedArena<number>();
    arena.alloc(1);
    const h = arena.alloc(2);
    arena.alloc(3);
    arena.free(h);
    const values: number[] = [];
    arena.forEach((v) => values.push(v));
    expect(values).toEqual([1, 3]);
  });

  it("toArray returns active items", () => {
    const arena = new TypedArena<string>();
    arena.alloc("a");
    const h = arena.alloc("b");
    arena.alloc("c");
    arena.free(h);
    expect(arena.toArray()).toEqual(["a", "c"]);
  });
});

describe("PoolArena", () => {
  it("acquires and releases", () => {
    const pool = new PoolArena(() => ({ x: 0, y: 0 }));
    const { handle, value } = pool.acquire();
    value.x = 10;
    expect(pool.size).toBe(1);
    pool.release(handle);
    expect(pool.size).toBe(0);
  });

  it("reuses released items", () => {
    const pool = new PoolArena(() => ({ val: 0 }), 0, (item) => { item.val = 0; });
    const { handle: h1 } = pool.acquire();
    pool.release(h1);
    const { handle: h2 } = pool.acquire();
    expect(h2).toBe(h1);
    expect(pool.get(h2).val).toBe(0);
  });

  it("pre-allocates pool", () => {
    const pool = new PoolArena(() => 0, 5);
    expect(pool.poolSize).toBe(5);
    expect(pool.size).toBe(0);
  });
});

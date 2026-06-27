import { describe, it, expect } from "vitest";
import { FlyweightFactory, InternPool } from "../flyweight.js";

describe("FlyweightFactory", () => {
  it("creates and caches objects", () => {
    let created = 0;
    const factory = new FlyweightFactory<string, { name: string }>((key) => {
      created++;
      return { name: key };
    });
    const a1 = factory.get("a");
    const a2 = factory.get("a");
    expect(a1).toBe(a2);
    expect(created).toBe(1);
  });

  it("tracks hit rate", () => {
    const factory = new FlyweightFactory<number, number>((n) => n * 2);
    factory.get(1);
    factory.get(1);
    factory.get(2);
    const stats = factory.stats();
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(2);
    expect(stats.hitRate).toBeCloseTo(1 / 3, 2);
  });

  it("checks existence", () => {
    const factory = new FlyweightFactory<string, string>((k) => k.toUpperCase());
    expect(factory.has("test")).toBe(false);
    factory.get("test");
    expect(factory.has("test")).toBe(true);
  });

  it("evicts entries", () => {
    const factory = new FlyweightFactory<string, string>((k) => k);
    factory.get("a");
    expect(factory.evict("a")).toBe(true);
    expect(factory.has("a")).toBe(false);
    expect(factory.evict("b")).toBe(false);
  });

  it("clears all entries and stats", () => {
    const factory = new FlyweightFactory<string, string>((k) => k);
    factory.get("x");
    factory.clear();
    expect(factory.size()).toBe(0);
    expect(factory.stats().hits).toBe(0);
  });

  it("uses custom key function", () => {
    const factory = new FlyweightFactory<{ x: number; y: number }, string>(
      (p) => `${p.x},${p.y}`,
      (p) => `${p.x}:${p.y}`
    );
    const a = factory.get({ x: 1, y: 2 });
    const b = factory.get({ x: 1, y: 2 });
    expect(a).toBe(b);
    expect(factory.size()).toBe(1);
  });

  it("lists keys", () => {
    const factory = new FlyweightFactory<string, string>((k) => k);
    factory.get("a");
    factory.get("b");
    expect(factory.keys().length).toBe(2);
  });
});

describe("InternPool", () => {
  it("interns strings", () => {
    const pool = new InternPool();
    const a = pool.intern("hello");
    const b = pool.intern("hello");
    expect(a).toBe(b);
    expect(pool.isInterned("hello")).toBe(true);
  });

  it("tracks reference counts", () => {
    const pool = new InternPool();
    pool.intern("test");
    pool.intern("test");
    pool.intern("test");
    expect(pool.refCount("test")).toBe(3);
  });

  it("releases refs and removes when zero", () => {
    const pool = new InternPool();
    pool.intern("x");
    pool.intern("x");
    expect(pool.release("x")).toBe(false);
    expect(pool.refCount("x")).toBe(1);
    expect(pool.release("x")).toBe(true);
    expect(pool.isInterned("x")).toBe(false);
  });

  it("calculates memory saved", () => {
    const pool = new InternPool();
    const saved = pool.memorySaved(["hello", "hello", "hello", "world", "world"]);
    expect(saved).toBeGreaterThan(0);
  });

  it("reports size", () => {
    const pool = new InternPool();
    pool.intern("a");
    pool.intern("b");
    expect(pool.size()).toBe(2);
  });
});

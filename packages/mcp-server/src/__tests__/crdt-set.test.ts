import { describe, it, expect } from "vitest";
import { GSet, TwoPSet, LWWSet } from "../crdt-set.js";

describe("GSet", () => {
  it("add and has", () => {
    const s = new GSet<string>();
    s.add("a");
    expect(s.has("a")).toBe(true);
    expect(s.has("b")).toBe(false);
  });

  it("merge unions", () => {
    const a = new GSet<number>();
    a.add(1); a.add(2);
    const b = new GSet<number>();
    b.add(2); b.add(3);
    const merged = a.merge(b);
    expect(merged.size()).toBe(3);
    expect(merged.has(1)).toBe(true);
    expect(merged.has(3)).toBe(true);
  });
});

describe("TwoPSet", () => {
  it("add and remove", () => {
    const s = new TwoPSet<string>();
    s.add("x");
    expect(s.has("x")).toBe(true);
    s.remove("x");
    expect(s.has("x")).toBe(false);
  });

  it("remove is permanent", () => {
    const s = new TwoPSet<string>();
    s.add("x");
    s.remove("x");
    s.add("x");
    expect(s.has("x")).toBe(false);
  });

  it("merge converges", () => {
    const a = new TwoPSet<string>();
    a.add("x"); a.add("y");
    const b = new TwoPSet<string>();
    b.add("x"); b.remove("x");
    const merged = a.merge(b);
    expect(merged.has("x")).toBe(false);
    expect(merged.has("y")).toBe(true);
  });

  it("size reflects active elements", () => {
    const s = new TwoPSet<number>();
    s.add(1); s.add(2); s.add(3);
    s.remove(2);
    expect(s.size()).toBe(2);
  });
});

describe("LWWSet", () => {
  it("last write wins on add/remove", () => {
    const s = new LWWSet<string>();
    s.add("x", 1);
    s.remove("x", 2);
    expect(s.has("x")).toBe(false);
    s.add("x", 3);
    expect(s.has("x")).toBe(true);
  });

  it("merge takes latest timestamps", () => {
    const a = new LWWSet<string>();
    a.add("x", 5);
    const b = new LWWSet<string>();
    b.remove("x", 10);
    const merged = a.merge(b);
    expect(merged.has("x")).toBe(false);
  });

  it("concurrent adds from different replicas", () => {
    const a = new LWWSet<string>();
    a.add("p", 1);
    a.add("q", 2);
    const b = new LWWSet<string>();
    b.add("r", 1);
    b.remove("q", 3);
    const merged = a.merge(b);
    expect(merged.has("p")).toBe(true);
    expect(merged.has("q")).toBe(false);
    expect(merged.has("r")).toBe(true);
    expect(merged.size()).toBe(2);
  });
});

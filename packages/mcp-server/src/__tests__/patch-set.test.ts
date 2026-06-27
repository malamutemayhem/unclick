import { describe, it, expect } from "vitest";
import { PatchSet } from "../patch-set.js";

describe("PatchSet", () => {
  it("adds a value", () => {
    const ps = new PatchSet();
    ps.add("/name", "Alice");
    const result = ps.apply({});
    expect(result.name).toBe("Alice");
  });

  it("removes a value", () => {
    const ps = new PatchSet();
    ps.remove("/name");
    const result = ps.apply({ name: "Alice", age: 30 });
    expect(result.name).toBeUndefined();
    expect(result.age).toBe(30);
  });

  it("replaces a value", () => {
    const ps = new PatchSet();
    ps.replace("/name", "Bob");
    const result = ps.apply({ name: "Alice" });
    expect(result.name).toBe("Bob");
  });

  it("moves a value", () => {
    const ps = new PatchSet();
    ps.move("/old", "/new");
    const result = ps.apply({ old: 42 });
    expect(result.new).toBe(42);
    expect(result.old).toBeUndefined();
  });

  it("copies a value", () => {
    const ps = new PatchSet();
    ps.copy("/source", "/target");
    const result = ps.apply({ source: "data" });
    expect(result.source).toBe("data");
    expect(result.target).toBe("data");
  });

  it("handles nested paths", () => {
    const ps = new PatchSet();
    ps.add("/user/name", "Alice");
    ps.add("/user/age", 30);
    const result = ps.apply({});
    expect((result.user as any).name).toBe("Alice");
    expect((result.user as any).age).toBe(30);
  });

  it("chains operations", () => {
    const result = new PatchSet()
      .add("/a", 1)
      .add("/b", 2)
      .replace("/a", 10)
      .apply({});
    expect(result.a).toBe(10);
    expect(result.b).toBe(2);
  });

  it("does not mutate original", () => {
    const ps = new PatchSet();
    ps.add("/x", 42);
    const original = { y: 10 };
    const result = ps.apply(original);
    expect(original).toEqual({ y: 10 });
    expect(result.x).toBe(42);
  });

  it("creates inverse patch", () => {
    const ps = new PatchSet();
    ps.add("/name", "Alice");
    const inv = ps.inverse();
    expect(inv.size()).toBe(1);
    expect(inv.toJSON()[0].op).toBe("remove");
  });

  it("reports size and emptiness", () => {
    const ps = new PatchSet();
    expect(ps.isEmpty()).toBe(true);
    expect(ps.size()).toBe(0);
    ps.add("/a", 1);
    expect(ps.isEmpty()).toBe(false);
    expect(ps.size()).toBe(1);
  });

  it("serializes to JSON", () => {
    const ps = new PatchSet();
    ps.add("/x", 1);
    ps.remove("/y");
    const json = ps.toJSON();
    expect(json.length).toBe(2);
    expect(json[0].op).toBe("add");
  });
});

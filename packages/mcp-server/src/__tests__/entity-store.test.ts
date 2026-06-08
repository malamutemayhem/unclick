import { describe, it, expect } from "vitest";
import { EntityStore } from "../entity-store";

interface User {
  id: string;
  name: string;
  role: string;
}

describe("EntityStore", () => {
  it("puts and gets entities", () => {
    const store = new EntityStore<User>();
    store.put({ id: "1", name: "Alice", role: "admin" });
    expect(store.get("1")).toEqual({ id: "1", name: "Alice", role: "admin" });
    expect(store.size).toBe(1);
  });

  it("returns undefined for missing id", () => {
    const store = new EntityStore<User>();
    expect(store.get("nope")).toBeUndefined();
  });

  it("overwrites existing entity with same id", () => {
    const store = new EntityStore<User>();
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.put({ id: "1", name: "Alice B", role: "user" });
    expect(store.get("1")!.name).toBe("Alice B");
    expect(store.size).toBe(1);
  });

  it("deletes entities", () => {
    const store = new EntityStore<User>();
    store.put({ id: "1", name: "Alice", role: "admin" });
    expect(store.delete("1")).toBe(true);
    expect(store.get("1")).toBeUndefined();
    expect(store.size).toBe(0);
  });

  it("returns false when deleting non-existent id", () => {
    const store = new EntityStore<User>();
    expect(store.delete("nope")).toBe(false);
  });

  it("returns all entities", () => {
    const store = new EntityStore<User>();
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.put({ id: "2", name: "Bob", role: "user" });
    expect(store.all()).toHaveLength(2);
  });

  it("clears all entities and indices", () => {
    const store = new EntityStore<User>();
    store.addIndex("role");
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.clear();
    expect(store.size).toBe(0);
    expect(store.findBy("role", "admin")).toEqual([]);
  });

  it("findBy without index does linear scan", () => {
    const store = new EntityStore<User>();
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.put({ id: "2", name: "Bob", role: "user" });
    expect(store.findBy("role", "admin")).toEqual([{ id: "1", name: "Alice", role: "admin" }]);
  });

  it("findBy with index uses fast lookup", () => {
    const store = new EntityStore<User>();
    store.addIndex("role");
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.put({ id: "2", name: "Bob", role: "user" });
    store.put({ id: "3", name: "Carol", role: "admin" });
    const admins = store.findBy("role", "admin");
    expect(admins).toHaveLength(2);
    expect(admins.map((u) => u.id).sort()).toEqual(["1", "3"]);
  });

  it("index updates when entity is overwritten", () => {
    const store = new EntityStore<User>();
    store.addIndex("role");
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.put({ id: "1", name: "Alice", role: "user" });
    expect(store.findBy("role", "admin")).toEqual([]);
    expect(store.findBy("role", "user")).toHaveLength(1);
  });

  it("index updates when entity is deleted", () => {
    const store = new EntityStore<User>();
    store.addIndex("role");
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.delete("1");
    expect(store.findBy("role", "admin")).toEqual([]);
  });

  it("addIndex indexes existing entities", () => {
    const store = new EntityStore<User>();
    store.put({ id: "1", name: "Alice", role: "admin" });
    store.put({ id: "2", name: "Bob", role: "admin" });
    store.addIndex("role");
    expect(store.findBy("role", "admin")).toHaveLength(2);
  });

  it("addIndex is idempotent", () => {
    const store = new EntityStore<User>();
    store.addIndex("role");
    store.addIndex("role");
    store.put({ id: "1", name: "Alice", role: "admin" });
    expect(store.findBy("role", "admin")).toHaveLength(1);
  });
});

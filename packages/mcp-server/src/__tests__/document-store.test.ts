import { describe, it, expect } from "vitest";
import { DocumentStore } from "../document-store.js";

describe("DocumentStore", () => {
  it("creates collections", () => {
    const store = new DocumentStore();
    expect(store.createCollection("users")).toBe(true);
    expect(store.collectionNames()).toEqual(["users"]);
  });

  it("inserts and finds documents", () => {
    const store = new DocumentStore();
    store.createCollection("users");
    const id = store.insert("users", { name: "Alice", age: 30 });
    expect(id).toBe(1);
    const doc = store.findById("users", 1);
    expect(doc).not.toBeNull();
    expect(doc!.name).toBe("Alice");
  });

  it("queries by field", () => {
    const store = new DocumentStore();
    store.createCollection("users");
    store.insert("users", { name: "Alice", role: "admin" });
    store.insert("users", { name: "Bob", role: "user" });
    store.insert("users", { name: "Charlie", role: "admin" });
    const result = store.find("users", { role: "admin" });
    expect(result.total).toBe(2);
  });

  it("updates documents", () => {
    const store = new DocumentStore();
    store.createCollection("users");
    store.insert("users", { name: "Alice", age: 30 });
    const updated = store.update("users", { name: "Alice" }, { age: 31 });
    expect(updated).toBe(1);
    const doc = store.findById("users", 1);
    expect(doc!.age).toBe(31);
  });

  it("removes documents", () => {
    const store = new DocumentStore();
    store.createCollection("users");
    store.insert("users", { name: "Alice" });
    store.insert("users", { name: "Bob" });
    const removed = store.remove("users", { name: "Alice" });
    expect(removed).toBe(1);
    expect(store.collectionSize("users")).toBe(1);
  });

  it("counts documents", () => {
    const store = new DocumentStore();
    store.createCollection("items");
    store.insert("items", { type: "a" });
    store.insert("items", { type: "b" });
    store.insert("items", { type: "a" });
    expect(store.count("items")).toBe(3);
    expect(store.count("items", { type: "a" })).toBe(2);
  });

  it("drops collections", () => {
    const store = new DocumentStore();
    store.createCollection("temp");
    expect(store.dropCollection("temp")).toBe(true);
    expect(store.collectionNames()).toEqual([]);
  });

  it("aggregates numeric fields", () => {
    const store = new DocumentStore();
    store.createCollection("orders");
    store.insert("orders", { amount: 10 });
    store.insert("orders", { amount: 20 });
    store.insert("orders", { amount: 30 });
    expect(store.aggregate("orders", "amount", "sum")).toBe(60);
    expect(store.aggregate("orders", "amount", "avg")).toBe(20);
    expect(store.aggregate("orders", "amount", "min")).toBe(10);
    expect(store.aggregate("orders", "amount", "max")).toBe(30);
  });

  it("creates indexes", () => {
    const store = new DocumentStore();
    store.createCollection("users");
    store.insert("users", { name: "Alice" });
    expect(store.createIndex("users", "name")).toBe(true);
  });

  it("returns null for missing collection", () => {
    const store = new DocumentStore();
    expect(store.insert("missing", {})).toBeNull();
    expect(store.findById("missing", 1)).toBeNull();
  });

  it("finds all with empty query", () => {
    const store = new DocumentStore();
    store.createCollection("items");
    store.insert("items", { a: 1 });
    store.insert("items", { b: 2 });
    expect(store.find("items").total).toBe(2);
  });
});

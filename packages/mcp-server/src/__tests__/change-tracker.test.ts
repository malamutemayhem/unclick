import { describe, it, expect } from "vitest";
import { ChangeTracker } from "../change-tracker.js";

describe("ChangeTracker", () => {
  it("tracks field changes", () => {
    const ct = new ChangeTracker({ name: "Alice", age: 30 });
    ct.set("name", "Bob");
    expect(ct.get("name")).toBe("Bob");
    expect(ct.isDirty("name")).toBe(true);
    expect(ct.isDirty("age")).toBe(false);
  });

  it("ignores same-value sets", () => {
    const ct = new ChangeTracker({ x: 10 });
    ct.set("x", 10);
    expect(ct.isDirty()).toBe(false);
  });

  it("clears dirty when set back to original", () => {
    const ct = new ChangeTracker({ x: 10 });
    ct.set("x", 20);
    expect(ct.isDirty("x")).toBe(true);
    ct.set("x", 10);
    expect(ct.isDirty("x")).toBe(false);
  });

  it("lists dirty fields", () => {
    const ct = new ChangeTracker({ a: 1, b: 2, c: 3 });
    ct.set("a", 10);
    ct.set("c", 30);
    expect(ct.dirtyFields().sort()).toEqual(["a", "c"]);
  });

  it("reports changes with old and new values", () => {
    const ct = new ChangeTracker({ x: 1 });
    ct.set("x", 2);
    const changes = ct.changes();
    expect(changes.x.oldValue).toBe(1);
    expect(changes.x.newValue).toBe(2);
  });

  it("reverts a single field", () => {
    const ct = new ChangeTracker({ x: 10, y: 20 });
    ct.set("x", 99);
    ct.set("y", 88);
    ct.revert("x");
    expect(ct.get("x")).toBe(10);
    expect(ct.isDirty("x")).toBe(false);
    expect(ct.isDirty("y")).toBe(true);
  });

  it("reverts all fields", () => {
    const ct = new ChangeTracker({ a: 1, b: 2 });
    ct.set("a", 10);
    ct.set("b", 20);
    ct.revertAll();
    expect(ct.get("a")).toBe(1);
    expect(ct.get("b")).toBe(2);
    expect(ct.isDirty()).toBe(false);
  });

  it("commits changes as new baseline", () => {
    const ct = new ChangeTracker({ x: 1 });
    ct.set("x", 5);
    ct.commit();
    expect(ct.isDirty()).toBe(false);
    ct.set("x", 5);
    expect(ct.isDirty()).toBe(false);
    ct.set("x", 10);
    expect(ct.isDirty()).toBe(true);
  });

  it("takes snapshots", () => {
    const ct = new ChangeTracker({ x: 1 });
    ct.set("x", 42);
    const snap = ct.snapshot();
    expect(snap.x).toBe(42);
  });

  it("tracks history", () => {
    const ct = new ChangeTracker({ x: 0 });
    ct.set("x", 1);
    ct.set("x", 2);
    const history = ct.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].oldValue).toBe(0);
    expect(history[1].newValue).toBe(2);
  });

  it("gets history for specific field", () => {
    const ct = new ChangeTracker({ a: 0, b: 0 });
    ct.set("a", 1);
    ct.set("b", 2);
    ct.set("a", 3);
    expect(ct.historyFor("a").length).toBe(2);
    expect(ct.historyFor("b").length).toBe(1);
  });

  it("reports field count", () => {
    const ct = new ChangeTracker({ a: 1, b: 2 });
    expect(ct.fieldCount()).toBe(2);
  });
});

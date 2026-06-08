import { describe, it, expect } from "vitest";
import { Inventory } from "../inventory-system.js";
import type { Item } from "../inventory-system.js";

const sword: Item = { id: "sword", name: "Iron Sword", weight: 5, tags: ["weapon"] };
const potion: Item = { id: "potion", name: "Health Potion", stackable: true, maxStack: 10, weight: 0.5, tags: ["consumable"] };
const gem: Item = { id: "gem", name: "Ruby", stackable: true, weight: 0.1 };

describe("Inventory", () => {
  it("adds items", () => {
    const inv = new Inventory();
    expect(inv.add(sword)).toBe(1);
    expect(inv.has("sword")).toBe(true);
    expect(inv.count("sword")).toBe(1);
  });

  it("stacks stackable items", () => {
    const inv = new Inventory();
    inv.add(potion, 5);
    inv.add(potion, 3);
    expect(inv.count("potion")).toBe(8);
    expect(inv.slotCount()).toBe(1);
  });

  it("respects max stack", () => {
    const inv = new Inventory();
    inv.add(potion, 8);
    const added = inv.add(potion, 5);
    expect(added).toBe(2);
    expect(inv.count("potion")).toBe(10);
  });

  it("removes items", () => {
    const inv = new Inventory();
    inv.add(potion, 5);
    inv.remove("potion", 3);
    expect(inv.count("potion")).toBe(2);
  });

  it("deletes slot when empty", () => {
    const inv = new Inventory();
    inv.add(potion, 2);
    inv.remove("potion", 2);
    expect(inv.has("potion")).toBe(false);
  });

  it("respects max slots", () => {
    const inv = new Inventory(2);
    inv.add(sword);
    inv.add(potion);
    expect(inv.add(gem)).toBe(0);
    expect(inv.isFull()).toBe(true);
  });

  it("tracks weight", () => {
    const inv = new Inventory(10, 10);
    inv.add(sword);
    expect(inv.totalWeight()).toBe(5);
    expect(inv.remainingWeight()).toBe(5);
  });

  it("finds by tag", () => {
    const inv = new Inventory();
    inv.add(sword);
    inv.add(potion, 3);
    expect(inv.findByTag("weapon")).toHaveLength(1);
    expect(inv.findByTag("consumable")).toHaveLength(1);
  });

  it("transfers between inventories", () => {
    const a = new Inventory();
    const b = new Inventory();
    a.add(potion, 5);
    const transferred = a.transfer(b, "potion", 3);
    expect(transferred).toBe(3);
    expect(a.count("potion")).toBe(2);
    expect(b.count("potion")).toBe(3);
  });

  it("clears all items", () => {
    const inv = new Inventory();
    inv.add(sword);
    inv.add(potion, 3);
    inv.clear();
    expect(inv.slotCount()).toBe(0);
  });

  it("allItems returns all slots", () => {
    const inv = new Inventory();
    inv.add(sword);
    inv.add(potion, 3);
    expect(inv.allItems()).toHaveLength(2);
  });
});

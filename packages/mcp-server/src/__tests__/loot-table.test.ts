import { describe, it, expect } from "vitest";
import { LootTable, TieredLootSystem } from "../loot-table.js";

describe("LootTable", () => {
  it("adds and counts items", () => {
    const table = new LootTable("Chest");
    table.add({ id: "gold", name: "Gold", weight: 10 });
    table.add({ id: "gem", name: "Gem", weight: 5 });
    expect(table.itemCount()).toBe(2);
  });

  it("rolls an item", () => {
    const table = new LootTable("Chest");
    table.add({ id: "gold", name: "Gold", weight: 10 });
    const drop = table.roll(() => 0.5);
    expect(drop).not.toBeNull();
    expect(drop!.id).toBe("gold");
  });

  it("respects weights", () => {
    const table = new LootTable("Chest");
    table.add({ id: "common", name: "Common", weight: 90 });
    table.add({ id: "rare", name: "Rare", weight: 10 });
    let rareCount = 0;
    for (let i = 0; i < 1000; i++) {
      const drop = table.roll();
      if (drop?.id === "rare") rareCount++;
    }
    expect(rareCount).toBeGreaterThan(30);
    expect(rareCount).toBeLessThan(200);
  });

  it("rolls many", () => {
    const table = new LootTable("Chest");
    table.add({ id: "gold", name: "Gold", weight: 10 });
    const drops = table.rollMany(5, () => 0.5);
    expect(drops.length).toBe(5);
  });

  it("computes probability", () => {
    const table = new LootTable("Chest");
    table.add({ id: "a", name: "A", weight: 75 });
    table.add({ id: "b", name: "B", weight: 25 });
    expect(table.probability("a")).toBeCloseTo(0.75);
    expect(table.probability("b")).toBeCloseTo(0.25);
  });

  it("removes items", () => {
    const table = new LootTable("Chest");
    table.add({ id: "gold", name: "Gold", weight: 10 });
    expect(table.remove("gold")).toBe(true);
    expect(table.itemCount()).toBe(0);
  });

  it("handles quantity range", () => {
    const table = new LootTable("Mine");
    table.add({ id: "ore", name: "Ore", weight: 10, minQuantity: 1, maxQuantity: 5 });
    const drop = table.roll(() => 0.5);
    expect(drop!.quantity).toBeGreaterThanOrEqual(1);
    expect(drop!.quantity).toBeLessThanOrEqual(5);
  });

  it("filters by rarity", () => {
    const table = new LootTable("Boss");
    table.add({ id: "a", name: "A", weight: 10, rarity: "common" });
    table.add({ id: "b", name: "B", weight: 5, rarity: "rare" });
    table.add({ id: "c", name: "C", weight: 1, rarity: "rare" });
    const rare = table.filterByRarity("rare");
    expect(rare.length).toBe(2);
  });

  it("sorts by weight", () => {
    const table = new LootTable("Chest");
    table.add({ id: "a", name: "A", weight: 5 });
    table.add({ id: "b", name: "B", weight: 20 });
    table.sortByWeight();
    expect(table.getItems()[0].id).toBe("b");
  });

  it("returns null for empty table", () => {
    const table = new LootTable("Empty");
    expect(table.roll()).toBeNull();
  });
});

describe("TieredLootSystem", () => {
  it("manages multiple tables", () => {
    const sys = new TieredLootSystem();
    sys.addTable("common", new LootTable("Common"));
    sys.addTable("rare", new LootTable("Rare"));
    expect(sys.tableCount()).toBe(2);
    expect(sys.tableNames()).toContain("common");
  });

  it("rolls from specific table", () => {
    const sys = new TieredLootSystem();
    const table = new LootTable("Gear");
    table.add({ id: "sword", name: "Sword", weight: 10 });
    sys.addTable("gear", table);
    const drop = sys.roll("gear", () => 0.5);
    expect(drop!.id).toBe("sword");
  });

  it("rolls from all tables", () => {
    const sys = new TieredLootSystem();
    const t1 = new LootTable("A");
    t1.add({ id: "a", name: "A", weight: 10 });
    const t2 = new LootTable("B");
    t2.add({ id: "b", name: "B", weight: 10 });
    sys.addTable("t1", t1);
    sys.addTable("t2", t2);
    const drops = sys.rollFromAll(() => 0.5);
    expect(drops.length).toBe(2);
  });
});

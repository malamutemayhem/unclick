import { describe, it, expect } from "vitest";
import { CraftingSystem } from "../crafting-system.js";

describe("CraftingSystem", () => {
  function setup(): CraftingSystem {
    const cs = new CraftingSystem();
    cs.addRecipe({
      id: "sword",
      name: "Iron Sword",
      ingredients: [
        { itemId: "iron", quantity: 3 },
        { itemId: "wood", quantity: 1 },
      ],
      output: { itemId: "iron_sword", quantity: 1 },
    });
    return cs;
  }

  it("adds recipes", () => {
    const cs = setup();
    expect(cs.recipeCount()).toBe(1);
  });

  it("manages inventory", () => {
    const cs = setup();
    cs.addItem("iron", 10);
    expect(cs.getItemCount("iron")).toBe(10);
    cs.removeItem("iron", 3);
    expect(cs.getItemCount("iron")).toBe(7);
  });

  it("checks if can craft", () => {
    const cs = setup();
    expect(cs.canCraft("sword")).toBe(false);
    cs.addItem("iron", 3);
    cs.addItem("wood", 1);
    expect(cs.canCraft("sword")).toBe(true);
  });

  it("crafts item and consumes ingredients", () => {
    const cs = setup();
    cs.addItem("iron", 5);
    cs.addItem("wood", 2);
    const result = cs.craft("sword");
    expect(result).not.toBeNull();
    expect(result!.itemId).toBe("iron_sword");
    expect(cs.getItemCount("iron")).toBe(2);
    expect(cs.getItemCount("wood")).toBe(1);
    expect(cs.getItemCount("iron_sword")).toBe(1);
  });

  it("fails to craft without materials", () => {
    const cs = setup();
    expect(cs.craft("sword")).toBeNull();
  });

  it("crafts many", () => {
    const cs = setup();
    cs.addItem("iron", 9);
    cs.addItem("wood", 3);
    expect(cs.craftMany("sword", 5)).toBe(3);
    expect(cs.getItemCount("iron_sword")).toBe(3);
  });

  it("lists available recipes", () => {
    const cs = setup();
    cs.addItem("iron", 3);
    cs.addItem("wood", 1);
    expect(cs.availableRecipes().length).toBe(1);
  });

  it("respects level requirements", () => {
    const cs = new CraftingSystem();
    cs.addRecipe({
      id: "advanced",
      name: "Advanced",
      ingredients: [],
      output: { itemId: "x", quantity: 1 },
      level: 5,
    });
    expect(cs.canCraft("advanced")).toBe(false);
    cs.setLevel(5);
    expect(cs.canCraft("advanced")).toBe(true);
  });

  it("tracks experience", () => {
    const cs = setup();
    cs.addItem("iron", 3);
    cs.addItem("wood", 1);
    cs.craft("sword");
    expect(cs.getExperience()).toBe(10);
  });

  it("identifies missing ingredients", () => {
    const cs = setup();
    cs.addItem("iron", 1);
    const missing = cs.missingIngredients("sword");
    expect(missing.length).toBe(2);
    expect(missing.find((m) => m.itemId === "iron")!.quantity).toBe(2);
  });

  it("lists inventory items", () => {
    const cs = setup();
    cs.addItem("iron", 5);
    cs.addItem("wood", 3);
    expect(cs.inventoryItems().length).toBe(2);
  });

  it("removes recipes", () => {
    const cs = setup();
    expect(cs.removeRecipe("sword")).toBe(true);
    expect(cs.recipeCount()).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import {
  durability, maintenance, aesthetic, slip,
  dkCost, splinterFree, forGround, material,
  bestUse, deckTypeTypes,
} from "../deck-type-calc.js";

describe("durability", () => {
  it("ipe most durable", () => {
    expect(durability("tropical_hardwood_ipe")).toBeGreaterThan(durability("pressure_treated_wood"));
  });
});

describe("maintenance", () => {
  it("aluminum lowest maintenance", () => {
    expect(maintenance("aluminum_plank_interlocking")).toBeGreaterThan(maintenance("pressure_treated_wood"));
  });
});

describe("aesthetic", () => {
  it("ipe best aesthetic", () => {
    expect(aesthetic("tropical_hardwood_ipe")).toBeGreaterThan(aesthetic("aluminum_plank_interlocking"));
  });
});

describe("slip", () => {
  it("aluminum best slip resistance", () => {
    expect(slip("aluminum_plank_interlocking")).toBeGreaterThan(slip("pressure_treated_wood"));
  });
});

describe("dkCost", () => {
  it("ipe most expensive", () => {
    expect(dkCost("tropical_hardwood_ipe")).toBeGreaterThan(dkCost("pressure_treated_wood"));
  });
});

describe("splinterFree", () => {
  it("composite is splinter free", () => {
    expect(splinterFree("composite_wood_plastic")).toBe(true);
  });
  it("pressure treated not splinter free", () => {
    expect(splinterFree("pressure_treated_wood")).toBe(false);
  });
});

describe("forGround", () => {
  it("pressure treated for ground contact", () => {
    expect(forGround("pressure_treated_wood")).toBe(true);
  });
  it("pvc not for ground", () => {
    expect(forGround("pvc_cellular_vinyl")).toBe(false);
  });
});

describe("material", () => {
  it("composite uses wood fiber blend", () => {
    expect(material("composite_wood_plastic")).toBe("wood_fiber_hdpe_polymer_blend");
  });
});

describe("bestUse", () => {
  it("pvc for coastal pool deck", () => {
    expect(bestUse("pvc_cellular_vinyl")).toBe("coastal_pool_deck_moisture");
  });
});

describe("deckTypeTypes", () => {
  it("returns 5 types", () => {
    expect(deckTypeTypes()).toHaveLength(5);
  });
});

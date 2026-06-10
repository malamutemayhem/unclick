import { describe, it, expect } from "vitest";
import {
  filtration, capacity, changeEase, costPerUse,
  bagCost, reusable, allergenSeal, bagMaterial,
  bestVacuum, vacuumBags,
} from "../vacuum-bag-calc.js";

describe("filtration", () => {
  it("hepa cloth reusable best filtration", () => {
    expect(filtration("hepa_cloth_reusable")).toBeGreaterThan(filtration("shop_vac_wet_dry"));
  });
});

describe("capacity", () => {
  it("shop vac wet dry highest capacity", () => {
    expect(capacity("shop_vac_wet_dry")).toBeGreaterThan(capacity("robotic_dustbin_auto"));
  });
});

describe("changeEase", () => {
  it("robotic dustbin auto easiest to change", () => {
    expect(changeEase("robotic_dustbin_auto")).toBeGreaterThan(changeEase("shop_vac_wet_dry"));
  });
});

describe("costPerUse", () => {
  it("robotic dustbin auto lowest cost per use", () => {
    expect(costPerUse("robotic_dustbin_auto")).toBeGreaterThan(costPerUse("shop_vac_wet_dry"));
  });
});

describe("bagCost", () => {
  it("robotic dustbin auto most expensive bags", () => {
    expect(bagCost("robotic_dustbin_auto")).toBeGreaterThan(bagCost("upright_disposable_paper"));
  });
});

describe("reusable", () => {
  it("hepa cloth reusable is reusable", () => {
    expect(reusable("hepa_cloth_reusable")).toBe(true);
  });
  it("upright disposable paper is not", () => {
    expect(reusable("upright_disposable_paper")).toBe(false);
  });
});

describe("allergenSeal", () => {
  it("hepa cloth reusable has allergen seal", () => {
    expect(allergenSeal("hepa_cloth_reusable")).toBe(true);
  });
  it("upright disposable paper does not", () => {
    expect(allergenSeal("upright_disposable_paper")).toBe(false);
  });
});

describe("bagMaterial", () => {
  it("hepa cloth reusable uses synthetic hepa cloth", () => {
    expect(bagMaterial("hepa_cloth_reusable")).toBe("synthetic_hepa_cloth");
  });
});

describe("bestVacuum", () => {
  it("shop vac wet dry best for garage workshop jobsite", () => {
    expect(bestVacuum("shop_vac_wet_dry")).toBe("garage_workshop_jobsite");
  });
});

describe("vacuumBags", () => {
  it("returns 5 types", () => {
    expect(vacuumBags()).toHaveLength(5);
  });
});

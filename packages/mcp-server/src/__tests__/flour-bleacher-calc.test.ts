import { describe, it, expect } from "vitest";
import {
  whiteningEffect, bakingImprovement, treatmentSpeed, residueSafety,
  fbCost, chemical, forBread, bleacherConfig,
  bestUse, flourBleacherTypes,
} from "../flour-bleacher-calc.js";

describe("whiteningEffect", () => {
  it("chlorine gas best whitening effect", () => {
    expect(whiteningEffect("chlorine_gas")).toBeGreaterThan(whiteningEffect("natural_aging"));
  });
});

describe("bakingImprovement", () => {
  it("azodicarbonamide best baking improvement", () => {
    expect(bakingImprovement("azodicarbonamide")).toBeGreaterThan(bakingImprovement("benzoyl_peroxide"));
  });
});

describe("treatmentSpeed", () => {
  it("chlorine gas fastest treatment", () => {
    expect(treatmentSpeed("chlorine_gas")).toBeGreaterThan(treatmentSpeed("natural_aging"));
  });
});

describe("residueSafety", () => {
  it("natural aging safest residue", () => {
    expect(residueSafety("natural_aging")).toBeGreaterThan(residueSafety("chlorine_gas"));
  });
});

describe("fbCost", () => {
  it("ozone treatment most expensive", () => {
    expect(fbCost("ozone_treatment")).toBeGreaterThan(fbCost("natural_aging"));
  });
});

describe("chemical", () => {
  it("chlorine gas is chemical", () => {
    expect(chemical("chlorine_gas")).toBe(true);
  });
  it("natural aging not chemical", () => {
    expect(chemical("natural_aging")).toBe(false);
  });
});

describe("forBread", () => {
  it("benzoyl peroxide for bread", () => {
    expect(forBread("benzoyl_peroxide")).toBe(true);
  });
  it("chlorine gas not for bread", () => {
    expect(forBread("chlorine_gas")).toBe(false);
  });
});

describe("bleacherConfig", () => {
  it("ozone treatment uses gas inject oxidize decompose", () => {
    expect(bleacherConfig("ozone_treatment")).toBe("ozone_treatment_flour_bleacher_gas_inject_oxidize_decompose_clean");
  });
});

describe("bestUse", () => {
  it("natural aging for artisan flour clean label", () => {
    expect(bestUse("natural_aging")).toBe("artisan_flour_natural_aging_slow_oxidation_clean_label_bread");
  });
});

describe("flourBleacherTypes", () => {
  it("returns 5 types", () => {
    expect(flourBleacherTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  capacity, vaporLoss, safety, maintenance,
  stCost, secondaryContain, forVolatile, roof,
  bestUse, storageTankTypes,
} from "../storage-tank-calc.js";

describe("capacity", () => {
  it("floating roof largest capacity", () => {
    expect(capacity("floating_roof_external")).toBeGreaterThan(capacity("cryogenic_inner_outer"));
  });
});

describe("vaporLoss", () => {
  it("cryogenic best vapor loss control", () => {
    expect(vaporLoss("cryogenic_inner_outer")).toBeGreaterThan(vaporLoss("fixed_roof_cone"));
  });
});

describe("safety", () => {
  it("double wall highest safety", () => {
    expect(safety("double_wall_containment")).toBeGreaterThan(safety("fixed_roof_cone"));
  });
});

describe("maintenance", () => {
  it("fixed roof easiest maintenance", () => {
    expect(maintenance("fixed_roof_cone")).toBeGreaterThan(maintenance("floating_roof_external"));
  });
});

describe("stCost", () => {
  it("cryogenic most expensive", () => {
    expect(stCost("cryogenic_inner_outer")).toBeGreaterThan(stCost("fixed_roof_cone"));
  });
});

describe("secondaryContain", () => {
  it("double wall has secondary containment", () => {
    expect(secondaryContain("double_wall_containment")).toBe(true);
  });
  it("fixed roof no secondary containment", () => {
    expect(secondaryContain("fixed_roof_cone")).toBe(false);
  });
});

describe("forVolatile", () => {
  it("floating roof for volatile", () => {
    expect(forVolatile("floating_roof_external")).toBe(true);
  });
  it("fixed roof not for volatile", () => {
    expect(forVolatile("fixed_roof_cone")).toBe(false);
  });
});

describe("roof", () => {
  it("floating roof uses pontoon double deck", () => {
    expect(roof("floating_roof_external")).toBe("pontoon_double_deck_float_seal");
  });
});

describe("bestUse", () => {
  it("cryogenic for lng lox lin", () => {
    expect(bestUse("cryogenic_inner_outer")).toBe("lng_lox_lin_cryogenic_liquid_store");
  });
});

describe("storageTankTypes", () => {
  it("returns 5 types", () => {
    expect(storageTankTypes()).toHaveLength(5);
  });
});

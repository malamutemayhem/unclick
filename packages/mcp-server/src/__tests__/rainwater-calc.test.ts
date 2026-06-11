import { describe, it, expect } from "vitest";
import {
  capacity, durability, installEase, aesthetic,
  rwCost, underground, forPotable, material,
  bestUse, rainwaterTypes,
} from "../rainwater-calc.js";

describe("capacity", () => {
  it("concrete highest capacity", () => {
    expect(capacity("below_ground_concrete")).toBeGreaterThan(capacity("above_ground_poly_tank"));
  });
});

describe("durability", () => {
  it("concrete most durable", () => {
    expect(durability("below_ground_concrete")).toBeGreaterThan(durability("bladder_pillow_flexible"));
  });
});

describe("installEase", () => {
  it("bladder easiest install", () => {
    expect(installEase("bladder_pillow_flexible")).toBeGreaterThan(installEase("below_ground_concrete"));
  });
});

describe("aesthetic", () => {
  it("concrete best aesthetic", () => {
    expect(aesthetic("below_ground_concrete")).toBeGreaterThan(aesthetic("bladder_pillow_flexible"));
  });
});

describe("rwCost", () => {
  it("cistern most expensive", () => {
    expect(rwCost("cistern_stone_historic")).toBeGreaterThan(rwCost("above_ground_poly_tank"));
  });
});

describe("underground", () => {
  it("concrete is underground", () => {
    expect(underground("below_ground_concrete")).toBe(true);
  });
  it("poly tank not underground", () => {
    expect(underground("above_ground_poly_tank")).toBe(false);
  });
});

describe("forPotable", () => {
  it("concrete for potable", () => {
    expect(forPotable("below_ground_concrete")).toBe(true);
  });
  it("modular not potable", () => {
    expect(forPotable("modular_cube_matrix")).toBe(false);
  });
});

describe("material", () => {
  it("bladder uses reinforced pvc", () => {
    expect(material("bladder_pillow_flexible")).toBe("reinforced_pvc_bladder_pillow");
  });
});

describe("bestUse", () => {
  it("modular for parking lot", () => {
    expect(bestUse("modular_cube_matrix")).toBe("parking_lot_infiltration_reuse");
  });
});

describe("rainwaterTypes", () => {
  it("returns 5 types", () => {
    expect(rainwaterTypes()).toHaveLength(5);
  });
});

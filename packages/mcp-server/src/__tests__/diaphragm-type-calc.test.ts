import { describe, it, expect } from "vitest";
import {
  stiffness, strength, weight, fireRating,
  dCost, rigid, forSteel, connector,
  bestUse, diaphragmTypeTypes,
} from "../diaphragm-type-calc.js";

describe("stiffness", () => {
  it("concrete stiffest", () => {
    expect(stiffness("concrete_cast_in_place")).toBeGreaterThan(stiffness("wood_plywood_sheathing"));
  });
});

describe("strength", () => {
  it("concrete strongest", () => {
    expect(strength("concrete_cast_in_place")).toBeGreaterThan(strength("wood_plywood_sheathing"));
  });
});

describe("weight", () => {
  it("wood lightest (highest score)", () => {
    expect(weight("wood_plywood_sheathing")).toBeGreaterThan(weight("concrete_cast_in_place"));
  });
});

describe("fireRating", () => {
  it("concrete best fire rating", () => {
    expect(fireRating("concrete_cast_in_place")).toBeGreaterThan(fireRating("wood_plywood_sheathing"));
  });
});

describe("dCost", () => {
  it("concrete most expensive", () => {
    expect(dCost("concrete_cast_in_place")).toBeGreaterThan(dCost("wood_plywood_sheathing"));
  });
});

describe("rigid", () => {
  it("concrete is rigid", () => {
    expect(rigid("concrete_cast_in_place")).toBe(true);
  });
  it("wood not rigid", () => {
    expect(rigid("wood_plywood_sheathing")).toBe(false);
  });
});

describe("forSteel", () => {
  it("steel deck for steel frame", () => {
    expect(forSteel("steel_deck_welded")).toBe(true);
  });
  it("wood not for steel", () => {
    expect(forSteel("wood_plywood_sheathing")).toBe(false);
  });
});

describe("connector", () => {
  it("composite uses shear stud", () => {
    expect(connector("composite_deck_concrete")).toBe("shear_stud_headed_welded");
  });
});

describe("bestUse", () => {
  it("wood for residential", () => {
    expect(bestUse("wood_plywood_sheathing")).toBe("residential_light_frame_floor");
  });
});

describe("diaphragmTypeTypes", () => {
  it("returns 5 types", () => {
    expect(diaphragmTypeTypes()).toHaveLength(5);
  });
});

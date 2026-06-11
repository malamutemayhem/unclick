import { describe, it, expect } from "vitest";
import {
  nipPressure, pickupRate, fabricSpeed, uniformity,
  pmCost, pneumatic, forStretch, rollConfig,
  bestUse, padMangleTypes,
} from "../pad-mangle-calc.js";

describe("nipPressure", () => {
  it("three roll offset highest nip pressure", () => {
    expect(nipPressure("three_roll_offset")).toBeGreaterThan(nipPressure("kiss_roll"));
  });
});

describe("pickupRate", () => {
  it("vacuum slot best pickup rate", () => {
    expect(pickupRate("vacuum_slot")).toBeGreaterThan(pickupRate("kiss_roll"));
  });
});

describe("fabricSpeed", () => {
  it("kiss roll fastest fabric speed", () => {
    expect(fabricSpeed("kiss_roll")).toBeGreaterThan(fabricSpeed("three_roll_offset"));
  });
});

describe("uniformity", () => {
  it("vacuum slot best uniformity", () => {
    expect(uniformity("vacuum_slot")).toBeGreaterThan(uniformity("kiss_roll"));
  });
});

describe("pmCost", () => {
  it("vacuum slot most expensive", () => {
    expect(pmCost("vacuum_slot")).toBeGreaterThan(pmCost("kiss_roll"));
  });
});

describe("pneumatic", () => {
  it("two roll vertical is pneumatic", () => {
    expect(pneumatic("two_roll_vertical")).toBe(true);
  });
  it("vacuum slot not pneumatic", () => {
    expect(pneumatic("vacuum_slot")).toBe(false);
  });
});

describe("forStretch", () => {
  it("vacuum slot for stretch fabric", () => {
    expect(forStretch("vacuum_slot")).toBe(true);
  });
  it("two roll vertical not for stretch", () => {
    expect(forStretch("two_roll_vertical")).toBe(false);
  });
});

describe("rollConfig", () => {
  it("foam applicator uses foam generation unit", () => {
    expect(rollConfig("foam_applicator")).toBe("foam_generation_unit_apply_chemical_foam_low_wet_pickup_save");
  });
});

describe("bestUse", () => {
  it("kiss roll for one side coating", () => {
    expect(bestUse("kiss_roll")).toBe("one_side_coating_back_sizing_single_face_chemical_transfer");
  });
});

describe("padMangleTypes", () => {
  it("returns 5 types", () => {
    expect(padMangleTypes()).toHaveLength(5);
  });
});

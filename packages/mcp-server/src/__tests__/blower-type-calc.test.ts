import { describe, it, expect } from "vitest";
import {
  pressure, flow, efficiency, noise,
  bwCost, oilFree, forAeration, impeller,
  bestUse, blowerTypes,
} from "../blower-type-calc.js";

describe("pressure", () => {
  it("multistage highest pressure", () => {
    expect(pressure("multistage_centrifugal_turbo")).toBeGreaterThan(pressure("axial_propeller_tube"));
  });
});

describe("flow", () => {
  it("axial highest flow", () => {
    expect(flow("axial_propeller_tube")).toBeGreaterThan(flow("regenerative_side_channel"));
  });
});

describe("efficiency", () => {
  it("multistage most efficient", () => {
    expect(efficiency("multistage_centrifugal_turbo")).toBeGreaterThan(efficiency("regenerative_side_channel"));
  });
});

describe("noise", () => {
  it("multistage noisiest", () => {
    expect(noise("multistage_centrifugal_turbo")).toBeGreaterThan(noise("axial_propeller_tube"));
  });
});

describe("bwCost", () => {
  it("multistage most expensive", () => {
    expect(bwCost("multistage_centrifugal_turbo")).toBeGreaterThan(bwCost("axial_propeller_tube"));
  });
});

describe("oilFree", () => {
  it("rotary lobe is oil free", () => {
    expect(oilFree("positive_displacement_rotary_lobe")).toBe(true);
  });
});

describe("forAeration", () => {
  it("rotary lobe for aeration", () => {
    expect(forAeration("positive_displacement_rotary_lobe")).toBe(true);
  });
  it("axial not for aeration", () => {
    expect(forAeration("axial_propeller_tube")).toBe(false);
  });
});

describe("impeller", () => {
  it("axial uses propeller blade", () => {
    expect(impeller("axial_propeller_tube")).toBe("propeller_blade_tube_axial");
  });
});

describe("bestUse", () => {
  it("rotary lobe for wastewater aeration", () => {
    expect(bestUse("positive_displacement_rotary_lobe")).toBe("wastewater_aeration_pneumatic_convey");
  });
});

describe("blowerTypes", () => {
  it("returns 5 types", () => {
    expect(blowerTypes()).toHaveLength(5);
  });
});

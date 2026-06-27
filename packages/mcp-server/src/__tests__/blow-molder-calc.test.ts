import { describe, it, expect } from "vitest";
import {
  productionSpeed, wallUniformity, clarityFinish, sizeRange,
  bmCost, biaxial, forPET, molderConfig,
  bestUse, blowMolderTypes,
} from "../blow-molder-calc.js";

describe("productionSpeed", () => {
  it("stretch blow pet fastest production speed", () => {
    expect(productionSpeed("stretch_blow_pet")).toBeGreaterThan(productionSpeed("accumulator_head"));
  });
});

describe("wallUniformity", () => {
  it("injection blow best wall uniformity", () => {
    expect(wallUniformity("injection_blow")).toBeGreaterThan(wallUniformity("continuous_extrusion"));
  });
});

describe("clarityFinish", () => {
  it("stretch blow pet best clarity finish", () => {
    expect(clarityFinish("stretch_blow_pet")).toBeGreaterThan(clarityFinish("accumulator_head"));
  });
});

describe("sizeRange", () => {
  it("continuous extrusion and accumulator head widest size range", () => {
    expect(sizeRange("continuous_extrusion")).toBeGreaterThan(sizeRange("injection_blow"));
  });
});

describe("bmCost", () => {
  it("stretch blow pet most expensive", () => {
    expect(bmCost("stretch_blow_pet")).toBeGreaterThan(bmCost("extrusion_blow"));
  });
});

describe("biaxial", () => {
  it("stretch blow pet is biaxial", () => {
    expect(biaxial("stretch_blow_pet")).toBe(true);
  });
  it("extrusion blow not biaxial", () => {
    expect(biaxial("extrusion_blow")).toBe(false);
  });
});

describe("forPET", () => {
  it("stretch blow pet for PET", () => {
    expect(forPET("stretch_blow_pet")).toBe(true);
  });
  it("injection blow not for PET", () => {
    expect(forPET("injection_blow")).toBe(false);
  });
});

describe("molderConfig", () => {
  it("extrusion blow uses continuous parison", () => {
    expect(molderConfig("extrusion_blow")).toBe("continuous_parison_extrude_mold_close_blow_air_inflate_eject");
  });
});

describe("bestUse", () => {
  it("injection blow for pharmaceutical cosmetic", () => {
    expect(bestUse("injection_blow")).toBe("pharmaceutical_cosmetic_small_bottle_precise_neck_finish_wall");
  });
});

describe("blowMolderTypes", () => {
  it("returns 5 types", () => {
    expect(blowMolderTypes()).toHaveLength(5);
  });
});

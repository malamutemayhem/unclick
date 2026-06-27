import { describe, it, expect } from "vitest";
import {
  formAccuracy, surfaceFinish, shapeRange, durability,
  swageCost, multiGroove, forSoft, blockMaterial,
  bestUse, swageBlockJewels,
} from "../swage-block-jewel-calc.js";

describe("formAccuracy", () => {
  it("steel multi groove most accurate form", () => {
    expect(formAccuracy("steel_multi_groove")).toBeGreaterThan(formAccuracy("lead_soft_form"));
  });
});

describe("surfaceFinish", () => {
  it("brass single channel best surface finish", () => {
    expect(surfaceFinish("brass_single_channel")).toBeGreaterThan(surfaceFinish("lead_soft_form"));
  });
});

describe("shapeRange", () => {
  it("steel multi groove widest shape range", () => {
    expect(shapeRange("steel_multi_groove")).toBeGreaterThan(shapeRange("brass_single_channel"));
  });
});

describe("durability", () => {
  it("steel multi groove most durable", () => {
    expect(durability("steel_multi_groove")).toBeGreaterThan(durability("lead_soft_form"));
  });
});

describe("swageCost", () => {
  it("steel multi groove most expensive", () => {
    expect(swageCost("steel_multi_groove")).toBeGreaterThan(swageCost("hardwood_forming_block"));
  });
});

describe("multiGroove", () => {
  it("steel multi groove has multi groove", () => {
    expect(multiGroove("steel_multi_groove")).toBe(true);
  });
  it("brass single channel not multi groove", () => {
    expect(multiGroove("brass_single_channel")).toBe(false);
  });
});

describe("forSoft", () => {
  it("lead soft form is for soft", () => {
    expect(forSoft("lead_soft_form")).toBe(true);
  });
  it("steel multi groove not for soft", () => {
    expect(forSoft("steel_multi_groove")).toBe(false);
  });
});

describe("blockMaterial", () => {
  it("urethane cushion press uses urethane pad", () => {
    expect(blockMaterial("urethane_cushion_press")).toBe("urethane_pad");
  });
});

describe("bestUse", () => {
  it("steel multi groove best for wire channel form", () => {
    expect(bestUse("steel_multi_groove")).toBe("wire_channel_form");
  });
});

describe("swageBlockJewels", () => {
  it("returns 5 types", () => {
    expect(swageBlockJewels()).toHaveLength(5);
  });
});

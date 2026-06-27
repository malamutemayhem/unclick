import { describe, it, expect } from "vitest";
import {
  sizePickup, throughput, dryingEfficiency, yarnStrength,
  smCost, waterBased, forCotton, sizerConfig,
  bestUse, sizingMachineTypes,
} from "../sizing-machine-calc.js";

describe("sizePickup", () => {
  it("single end best size pickup", () => {
    expect(sizePickup("single_end")).toBeGreaterThan(sizePickup("hot_melt"));
  });
});

describe("throughput", () => {
  it("slasher sizer highest throughput", () => {
    expect(throughput("slasher_sizer")).toBeGreaterThan(throughput("single_end"));
  });
});

describe("dryingEfficiency", () => {
  it("hot melt best drying efficiency", () => {
    expect(dryingEfficiency("hot_melt")).toBeGreaterThan(dryingEfficiency("pre_wet_sizer"));
  });
});

describe("yarnStrength", () => {
  it("single end best yarn strength", () => {
    expect(yarnStrength("single_end")).toBeGreaterThan(yarnStrength("hot_melt"));
  });
});

describe("smCost", () => {
  it("hot melt most expensive", () => {
    expect(smCost("hot_melt")).toBeGreaterThan(smCost("single_end"));
  });
});

describe("waterBased", () => {
  it("slasher sizer is water based", () => {
    expect(waterBased("slasher_sizer")).toBe(true);
  });
  it("hot melt not water based", () => {
    expect(waterBased("hot_melt")).toBe(false);
  });
});

describe("forCotton", () => {
  it("slasher sizer for cotton", () => {
    expect(forCotton("slasher_sizer")).toBe(true);
  });
  it("hot melt not for cotton", () => {
    expect(forCotton("hot_melt")).toBe(false);
  });
});

describe("sizerConfig", () => {
  it("foam sizer uses foamed starch apply low wet pickup", () => {
    expect(sizerConfig("foam_sizer")).toBe("foam_sizer_machine_foamed_starch_apply_low_wet_pickup_fast_dry");
  });
});

describe("bestUse", () => {
  it("pre wet sizer for heavy cotton deep penetration", () => {
    expect(bestUse("pre_wet_sizer")).toBe("heavy_cotton_pre_wet_sizer_deep_size_penetration_strong_warp");
  });
});

describe("sizingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(sizingMachineTypes()).toHaveLength(5);
  });
});

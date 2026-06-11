import { describe, it, expect } from "vitest";
import {
  crystalSize, sizeDistribution, throughput, energyEfficiency,
  crCost_, continuous, forSugar, crystallizerConfig,
  bestUse, crystallizerTypes,
} from "../crystallizer-calc.js";

describe("crystalSize", () => {
  it("dtb draft tube best crystal size", () => {
    expect(crystalSize("dtb_draft_tube")).toBeGreaterThan(crystalSize("forced_circulation"));
  });
});

describe("sizeDistribution", () => {
  it("dtb draft tube best size distribution", () => {
    expect(sizeDistribution("dtb_draft_tube")).toBeGreaterThan(sizeDistribution("forced_circulation"));
  });
});

describe("throughput", () => {
  it("forced circulation highest throughput", () => {
    expect(throughput("forced_circulation")).toBeGreaterThan(throughput("cooling_crystallizer"));
  });
});

describe("energyEfficiency", () => {
  it("cooling crystallizer best energy efficiency", () => {
    expect(energyEfficiency("cooling_crystallizer")).toBeGreaterThan(energyEfficiency("forced_circulation"));
  });
});

describe("crCost_", () => {
  it("oslo fluidized most expensive", () => {
    expect(crCost_("oslo_fluidized")).toBeGreaterThan(crCost_("cooling_crystallizer"));
  });
});

describe("continuous", () => {
  it("evaporative crystallizer is continuous", () => {
    expect(continuous("evaporative_crystallizer")).toBe(true);
  });
  it("cooling crystallizer not continuous", () => {
    expect(continuous("cooling_crystallizer")).toBe(false);
  });
});

describe("forSugar", () => {
  it("cooling crystallizer for sugar", () => {
    expect(forSugar("cooling_crystallizer")).toBe(true);
  });
  it("dtb draft tube not for sugar", () => {
    expect(forSugar("dtb_draft_tube")).toBe(false);
  });
});

describe("crystallizerConfig", () => {
  it("forced circulation uses pump loop heat exchanger", () => {
    expect(crystallizerConfig("forced_circulation")).toBe("forced_circulation_crystallizer_pump_loop_heat_exchanger_high_rate");
  });
});

describe("bestUse", () => {
  it("dtb draft tube for pharmaceutical uniform crystal", () => {
    expect(bestUse("dtb_draft_tube")).toBe("pharmaceutical_chemical_dtb_crystallizer_uniform_large_crystal_pure");
  });
});

describe("crystallizerTypes", () => {
  it("returns 5 types", () => {
    expect(crystallizerTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  crystalSize, sizeDistribution, throughput, scaleUp,
  cdCost, evaporative, forLargeCrystal, circulation,
  bestUse, crystallizerDtbTypes,
} from "../crystallizer-dtb-calc.js";

describe("crystalSize", () => {
  it("oslo fluidized bed largest crystals", () => {
    expect(crystalSize("oslo_fluidized_bed")).toBeGreaterThan(crystalSize("reaction_crystallizer"));
  });
});

describe("sizeDistribution", () => {
  it("oslo fluidized bed best distribution", () => {
    expect(sizeDistribution("oslo_fluidized_bed")).toBeGreaterThan(sizeDistribution("forced_circulation_fc"));
  });
});

describe("throughput", () => {
  it("forced circulation highest throughput", () => {
    expect(throughput("forced_circulation_fc")).toBeGreaterThan(throughput("oslo_fluidized_bed"));
  });
});

describe("scaleUp", () => {
  it("forced circulation best scale up", () => {
    expect(scaleUp("forced_circulation_fc")).toBeGreaterThan(scaleUp("reaction_crystallizer"));
  });
});

describe("cdCost", () => {
  it("oslo fluidized bed most expensive", () => {
    expect(cdCost("oslo_fluidized_bed")).toBeGreaterThan(cdCost("cooling_disc_surface"));
  });
});

describe("evaporative", () => {
  it("draft tube baffle is evaporative", () => {
    expect(evaporative("draft_tube_baffle_std")).toBe(true);
  });
  it("cooling disc not evaporative", () => {
    expect(evaporative("cooling_disc_surface")).toBe(false);
  });
});

describe("forLargeCrystal", () => {
  it("oslo fluidized for large crystal", () => {
    expect(forLargeCrystal("oslo_fluidized_bed")).toBe(true);
  });
  it("reaction crystallizer not for large", () => {
    expect(forLargeCrystal("reaction_crystallizer")).toBe(false);
  });
});

describe("circulation", () => {
  it("forced circulation uses external pump", () => {
    expect(circulation("forced_circulation_fc")).toBe("external_pump_loop_heat_exchanger_flash_zone");
  });
});

describe("bestUse", () => {
  it("cooling disc for wax paraffin", () => {
    expect(bestUse("cooling_disc_surface")).toBe("wax_paraffin_fatty_acid_cooling_crystallization");
  });
});

describe("crystallizerDtbTypes", () => {
  it("returns 5 types", () => {
    expect(crystallizerDtbTypes()).toHaveLength(5);
  });
});

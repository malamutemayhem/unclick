import { describe, it, expect } from "vitest";
import {
  volumeFlow, throughput, pressureRatio, noiseLevel,
  rbCost, oilFree, forWastewater, blowerConfig,
  bestUse, rootsBlowerTypes,
} from "../roots-blower-calc.js";

describe("volumeFlow", () => {
  it("vacuum booster best volume flow", () => {
    expect(volumeFlow("vacuum_booster")).toBeGreaterThan(volumeFlow("coated_rotor"));
  });
});

describe("throughput", () => {
  it("two lobe highest throughput", () => {
    expect(throughput("two_lobe")).toBeGreaterThan(throughput("vacuum_booster"));
  });
});

describe("pressureRatio", () => {
  it("three lobe best pressure ratio", () => {
    expect(pressureRatio("three_lobe")).toBeGreaterThan(pressureRatio("two_lobe"));
  });
});

describe("noiseLevel", () => {
  it("twisted lobe best noise level (quietest)", () => {
    expect(noiseLevel("twisted_lobe")).toBeGreaterThan(noiseLevel("two_lobe"));
  });
});

describe("rbCost", () => {
  it("twisted lobe most expensive", () => {
    expect(rbCost("twisted_lobe")).toBeGreaterThan(rbCost("two_lobe"));
  });
});

describe("oilFree", () => {
  it("two lobe is oil free", () => {
    expect(oilFree("two_lobe")).toBe(true);
  });
  it("all types are oil free", () => {
    expect(oilFree("coated_rotor")).toBe(true);
  });
});

describe("forWastewater", () => {
  it("two lobe for wastewater", () => {
    expect(forWastewater("two_lobe")).toBe(true);
  });
  it("coated rotor not for wastewater", () => {
    expect(forWastewater("coated_rotor")).toBe(false);
  });
});

describe("blowerConfig", () => {
  it("coated rotor uses ptfe coat chemical resist gas boost", () => {
    expect(blowerConfig("coated_rotor")).toBe("coated_rotor_roots_blower_ptfe_coat_chemical_resist_gas_boost");
  });
});

describe("bestUse", () => {
  it("twisted lobe for aquaculture low noise fish pond aerate", () => {
    expect(bestUse("twisted_lobe")).toBe("aquaculture_twisted_lobe_roots_blower_low_noise_fish_pond_aerate");
  });
});

describe("rootsBlowerTypes", () => {
  it("returns 5 types", () => {
    expect(rootsBlowerTypes()).toHaveLength(5);
  });
});

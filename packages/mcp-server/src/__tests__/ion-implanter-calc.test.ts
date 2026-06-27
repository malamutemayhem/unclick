import { describe, it, expect } from "vitest";
import {
  doseUniformity, throughput, energyRange, depthControl,
  iiCost, highDose, forDeepWell, implanterConfig,
  bestUse, ionImplanterTypes,
} from "../ion-implanter-calc.js";

describe("doseUniformity", () => {
  it("focused ion beam best dose uniformity", () => {
    expect(doseUniformity("focused_ion_beam")).toBeGreaterThan(doseUniformity("plasma_immersion"));
  });
});

describe("throughput", () => {
  it("high current highest throughput", () => {
    expect(throughput("high_current")).toBeGreaterThan(throughput("focused_ion_beam"));
  });
});

describe("energyRange", () => {
  it("high energy best energy range", () => {
    expect(energyRange("high_energy")).toBeGreaterThan(energyRange("plasma_immersion"));
  });
});

describe("depthControl", () => {
  it("focused ion beam best depth control", () => {
    expect(depthControl("focused_ion_beam")).toBeGreaterThan(depthControl("plasma_immersion"));
  });
});

describe("iiCost", () => {
  it("focused ion beam most expensive", () => {
    expect(iiCost("focused_ion_beam")).toBeGreaterThan(iiCost("plasma_immersion"));
  });
});

describe("highDose", () => {
  it("high current is high dose", () => {
    expect(highDose("high_current")).toBe(true);
  });
  it("medium current not high dose", () => {
    expect(highDose("medium_current")).toBe(false);
  });
});

describe("forDeepWell", () => {
  it("high energy for deep well", () => {
    expect(forDeepWell("high_energy")).toBe(true);
  });
  it("high current not for deep well", () => {
    expect(forDeepWell("high_current")).toBe(false);
  });
});

describe("implanterConfig", () => {
  it("focused ion beam uses fib mask less direct write edit", () => {
    expect(implanterConfig("focused_ion_beam")).toBe("focused_ion_beam_implanter_fib_mask_less_direct_write_edit");
  });
});

describe("bestUse", () => {
  it("high energy for deep well mev retrograde buried layer", () => {
    expect(bestUse("high_energy")).toBe("deep_well_high_energy_implanter_mev_retrograde_buried_layer");
  });
});

describe("ionImplanterTypes", () => {
  it("returns 5 types", () => {
    expect(ionImplanterTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  etchUniformity, throughput, lineResolution, chemicalEfficiency,
  peCost_, automated, forFineTrace, etcherConfig,
  bestUse, pcbEtcherTypes,
} from "../pcb-etcher-calc.js";

describe("etchUniformity", () => {
  it("conveyorized etcher best etch uniformity", () => {
    expect(etchUniformity("conveyorized_etcher")).toBeGreaterThan(etchUniformity("bubble_etcher"));
  });
});

describe("throughput", () => {
  it("conveyorized etcher highest throughput", () => {
    expect(throughput("conveyorized_etcher")).toBeGreaterThan(throughput("bubble_etcher"));
  });
});

describe("lineResolution", () => {
  it("plasma etcher best line resolution", () => {
    expect(lineResolution("plasma_etcher")).toBeGreaterThan(lineResolution("bubble_etcher"));
  });
});

describe("chemicalEfficiency", () => {
  it("plasma etcher best chemical efficiency", () => {
    expect(chemicalEfficiency("plasma_etcher")).toBeGreaterThan(chemicalEfficiency("bubble_etcher"));
  });
});

describe("peCost_", () => {
  it("plasma etcher most expensive", () => {
    expect(peCost_("plasma_etcher")).toBeGreaterThan(peCost_("bubble_etcher"));
  });
});

describe("automated", () => {
  it("spray etcher is automated", () => {
    expect(automated("spray_etcher")).toBe(true);
  });
  it("bubble etcher not automated", () => {
    expect(automated("bubble_etcher")).toBe(false);
  });
});

describe("forFineTrace", () => {
  it("plasma etcher for fine trace", () => {
    expect(forFineTrace("plasma_etcher")).toBe(true);
  });
  it("spray etcher not for fine trace", () => {
    expect(forFineTrace("spray_etcher")).toBe(false);
  });
});

describe("etcherConfig", () => {
  it("conveyorized etcher uses inline spray conveyor continuous etch", () => {
    expect(etcherConfig("conveyorized_etcher")).toBe("conveyorized_pcb_etcher_inline_spray_conveyor_continuous_etch");
  });
});

describe("bestUse", () => {
  it("bubble etcher for hobby prototype simple tank small batch", () => {
    expect(bestUse("bubble_etcher")).toBe("hobby_prototype_bubble_etcher_simple_tank_small_batch_diy");
  });
});

describe("pcbEtcherTypes", () => {
  it("returns 5 types", () => {
    expect(pcbEtcherTypes()).toHaveLength(5);
  });
});

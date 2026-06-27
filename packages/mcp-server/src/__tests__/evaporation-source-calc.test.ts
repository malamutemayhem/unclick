import { describe, it, expect } from "vitest";
import {
  deposition_rate, throughput, materialRange, uniformity,
  esCost, highMelt, forOptical, sourceConfig,
  bestUse, evaporationSourceTypes,
} from "../evaporation-source-calc.js";

describe("deposition_rate", () => {
  it("electron beam best deposition rate", () => {
    expect(deposition_rate("electron_beam_evap")).toBeGreaterThan(deposition_rate("effusion_cell"));
  });
});

describe("throughput", () => {
  it("electron beam highest throughput", () => {
    expect(throughput("electron_beam_evap")).toBeGreaterThan(throughput("effusion_cell"));
  });
});

describe("materialRange", () => {
  it("electron beam best material range", () => {
    expect(materialRange("electron_beam_evap")).toBeGreaterThan(materialRange("resistive_boat"));
  });
});

describe("uniformity", () => {
  it("effusion cell best uniformity", () => {
    expect(uniformity("effusion_cell")).toBeGreaterThan(uniformity("resistive_boat"));
  });
});

describe("esCost", () => {
  it("electron beam most expensive", () => {
    expect(esCost("electron_beam_evap")).toBeGreaterThan(esCost("resistive_boat"));
  });
});

describe("highMelt", () => {
  it("electron beam handles high melt", () => {
    expect(highMelt("electron_beam_evap")).toBe(true);
  });
  it("resistive boat not high melt", () => {
    expect(highMelt("resistive_boat")).toBe(false);
  });
});

describe("forOptical", () => {
  it("electron beam for optical", () => {
    expect(forOptical("electron_beam_evap")).toBe(true);
  });
  it("resistive boat not for optical", () => {
    expect(forOptical("resistive_boat")).toBe(false);
  });
});

describe("sourceConfig", () => {
  it("effusion cell uses knudsen source precise flux mbe epitaxy", () => {
    expect(sourceConfig("effusion_cell")).toBe("effusion_cell_knudsen_source_precise_flux_mbe_epitaxy_ultra_pure");
  });
});

describe("bestUse", () => {
  it("flash evap for alloy film preserve composition", () => {
    expect(bestUse("flash_evap")).toBe("alloy_film_flash_evaporation_source_preserve_composition_co_deposit");
  });
});

describe("evaporationSourceTypes", () => {
  it("returns 5 types", () => {
    expect(evaporationSourceTypes()).toHaveLength(5);
  });
});

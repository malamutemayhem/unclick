import { describe, it, expect } from "vitest";
import {
  thermalPerf, vacuumRequired, installEase, durability,
  crCost, needsVacuum, forLng, system,
  bestUse, cryogenicInsulationTypes,
} from "../cryogenic-insulation-calc.js";

describe("thermalPerf", () => {
  it("multi layer mli best thermal performance", () => {
    expect(thermalPerf("multi_layer_mli")).toBeGreaterThan(thermalPerf("polyurethane_foam_spray"));
  });
});

describe("vacuumRequired", () => {
  it("mli highest vacuum requirement", () => {
    expect(vacuumRequired("multi_layer_mli")).toBeGreaterThan(vacuumRequired("cellular_glass_cryo"));
  });
});

describe("installEase", () => {
  it("polyurethane foam easiest install", () => {
    expect(installEase("polyurethane_foam_spray")).toBeGreaterThan(installEase("multi_layer_mli"));
  });
});

describe("durability", () => {
  it("cellular glass most durable", () => {
    expect(durability("cellular_glass_cryo")).toBeGreaterThan(durability("polyurethane_foam_spray"));
  });
});

describe("crCost", () => {
  it("mli most expensive", () => {
    expect(crCost("multi_layer_mli")).toBeGreaterThan(crCost("polyurethane_foam_spray"));
  });
});

describe("needsVacuum", () => {
  it("perlite fill needs vacuum", () => {
    expect(needsVacuum("perlite_fill_vacuum")).toBe(true);
  });
  it("polyurethane foam does not need vacuum", () => {
    expect(needsVacuum("polyurethane_foam_spray")).toBe(false);
  });
});

describe("forLng", () => {
  it("perlite fill for lng", () => {
    expect(forLng("perlite_fill_vacuum")).toBe(true);
  });
  it("mli not for lng", () => {
    expect(forLng("multi_layer_mli")).toBe(false);
  });
});

describe("system", () => {
  it("evacuated powder uses fine perlite opacifier", () => {
    expect(system("evacuated_powder_jacket")).toBe("fine_powder_perlite_opacifier_vacuum_annulus");
  });
});

describe("bestUse", () => {
  it("mli for liquid helium hydrogen", () => {
    expect(bestUse("multi_layer_mli")).toBe("liquid_helium_hydrogen_space_cryostat_dewar");
  });
});

describe("cryogenicInsulationTypes", () => {
  it("returns 5 types", () => {
    expect(cryogenicInsulationTypes()).toHaveLength(5);
  });
});

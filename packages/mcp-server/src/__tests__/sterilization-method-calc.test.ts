import { describe, it, expect } from "vitest";
import {
  microbialKill, materialCompatibility, cycleTime, operatingCost,
  safetyRisk, residueFree, suitableForPlastics, activeAgent,
  bestApplication, sterilizationMethods,
} from "../sterilization-method-calc.js";

describe("microbialKill", () => {
  it("autoclave highest microbial kill", () => {
    expect(microbialKill("autoclave")).toBeGreaterThan(microbialKill("dry_heat"));
  });
});

describe("materialCompatibility", () => {
  it("ethylene oxide most compatible", () => {
    expect(materialCompatibility("ethylene_oxide")).toBeGreaterThan(materialCompatibility("autoclave"));
  });
});

describe("cycleTime", () => {
  it("dry heat longest cycle", () => {
    expect(cycleTime("dry_heat")).toBeGreaterThan(cycleTime("gamma_irradiation"));
  });
});

describe("operatingCost", () => {
  it("plasma most expensive", () => {
    expect(operatingCost("plasma")).toBeGreaterThan(operatingCost("dry_heat"));
  });
});

describe("safetyRisk", () => {
  it("ethylene oxide highest risk", () => {
    expect(safetyRisk("ethylene_oxide")).toBeGreaterThan(safetyRisk("plasma"));
  });
});

describe("residueFree", () => {
  it("autoclave is residue free", () => {
    expect(residueFree("autoclave")).toBe(true);
  });
  it("ethylene oxide is not", () => {
    expect(residueFree("ethylene_oxide")).toBe(false);
  });
});

describe("suitableForPlastics", () => {
  it("ethylene oxide suitable for plastics", () => {
    expect(suitableForPlastics("ethylene_oxide")).toBe(true);
  });
  it("autoclave is not", () => {
    expect(suitableForPlastics("autoclave")).toBe(false);
  });
});

describe("activeAgent", () => {
  it("autoclave uses saturated steam", () => {
    expect(activeAgent("autoclave")).toBe("saturated_steam_121c");
  });
});

describe("bestApplication", () => {
  it("gamma irradiation for single use disposable", () => {
    expect(bestApplication("gamma_irradiation")).toBe("single_use_disposable");
  });
});

describe("sterilizationMethods", () => {
  it("returns 5 methods", () => {
    expect(sterilizationMethods()).toHaveLength(5);
  });
});

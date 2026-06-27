import { describe, it, expect } from "vitest";
import {
  clarity, flowSmooth, tempRange, colorEffect,
  fluxCost, opalescent, leadFree, fireTemp,
  bestUse, enamelFluxs,
} from "../enamel-flux-calc.js";

describe("clarity", () => {
  it("leaded flux traditional highest clarity", () => {
    expect(clarity("leaded_flux_traditional")).toBeGreaterThan(clarity("opalescent_flux_glow"));
  });
});

describe("flowSmooth", () => {
  it("soft flux low smoothest flow", () => {
    expect(flowSmooth("soft_flux_low")).toBeGreaterThan(flowSmooth("hard_flux_high"));
  });
});

describe("tempRange", () => {
  it("hard flux high widest temp range", () => {
    expect(tempRange("hard_flux_high")).toBeGreaterThan(tempRange("leaded_flux_traditional"));
  });
});

describe("colorEffect", () => {
  it("opalescent flux glow best color effect", () => {
    expect(colorEffect("opalescent_flux_glow")).toBeGreaterThan(colorEffect("soft_flux_low"));
  });
});

describe("fluxCost", () => {
  it("opalescent flux glow most expensive", () => {
    expect(fluxCost("opalescent_flux_glow")).toBeGreaterThan(fluxCost("medium_flux_standard"));
  });
});

describe("opalescent", () => {
  it("opalescent flux glow is opalescent", () => {
    expect(opalescent("opalescent_flux_glow")).toBe(true);
  });
  it("soft flux low not opalescent", () => {
    expect(opalescent("soft_flux_low")).toBe(false);
  });
});

describe("leadFree", () => {
  it("medium flux standard is lead free", () => {
    expect(leadFree("medium_flux_standard")).toBe(true);
  });
  it("leaded flux traditional not lead free", () => {
    expect(leadFree("leaded_flux_traditional")).toBe(false);
  });
});

describe("fireTemp", () => {
  it("hard flux high uses high 1550f fire", () => {
    expect(fireTemp("hard_flux_high")).toBe("high_1550f_fire");
  });
});

describe("bestUse", () => {
  it("medium flux standard best for general transparent base", () => {
    expect(bestUse("medium_flux_standard")).toBe("general_transparent_base");
  });
});

describe("enamelFluxs", () => {
  it("returns 5 types", () => {
    expect(enamelFluxs()).toHaveLength(5);
  });
});

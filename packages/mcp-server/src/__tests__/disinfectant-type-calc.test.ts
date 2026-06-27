import { describe, it, expect } from "vitest";
import {
  broadSpectrum, contactTime, surfaceCorrosion, costPerLiter,
  toxicity, environmentallyFriendly, sporicidal, activeChemistry,
  bestApplication, disinfectantTypes,
} from "../disinfectant-type-calc.js";

describe("broadSpectrum", () => {
  it("peracetic acid broadest spectrum", () => {
    expect(broadSpectrum("peracetic_acid")).toBeGreaterThan(broadSpectrum("quaternary_ammonium"));
  });
});

describe("contactTime", () => {
  it("quaternary ammonium longest contact time", () => {
    expect(contactTime("quaternary_ammonium")).toBeGreaterThan(contactTime("isopropyl_alcohol"));
  });
});

describe("surfaceCorrosion", () => {
  it("hypochlorite most corrosive", () => {
    expect(surfaceCorrosion("hypochlorite")).toBeGreaterThan(surfaceCorrosion("quaternary_ammonium"));
  });
});

describe("costPerLiter", () => {
  it("peracetic acid most expensive", () => {
    expect(costPerLiter("peracetic_acid")).toBeGreaterThan(costPerLiter("hypochlorite"));
  });
});

describe("toxicity", () => {
  it("peracetic acid most toxic", () => {
    expect(toxicity("peracetic_acid")).toBeGreaterThan(toxicity("hydrogen_peroxide"));
  });
});

describe("environmentallyFriendly", () => {
  it("hydrogen peroxide is eco friendly", () => {
    expect(environmentallyFriendly("hydrogen_peroxide")).toBe(true);
  });
  it("hypochlorite is not", () => {
    expect(environmentallyFriendly("hypochlorite")).toBe(false);
  });
});

describe("sporicidal", () => {
  it("hypochlorite is sporicidal", () => {
    expect(sporicidal("hypochlorite")).toBe(true);
  });
  it("quaternary ammonium is not", () => {
    expect(sporicidal("quaternary_ammonium")).toBe(false);
  });
});

describe("activeChemistry", () => {
  it("isopropyl alcohol is protein denaturant", () => {
    expect(activeChemistry("isopropyl_alcohol")).toBe("protein_denaturant_70pct");
  });
});

describe("bestApplication", () => {
  it("hypochlorite for blood spill", () => {
    expect(bestApplication("hypochlorite")).toBe("blood_spill_decontam");
  });
});

describe("disinfectantTypes", () => {
  it("returns 5 types", () => {
    expect(disinfectantTypes()).toHaveLength(5);
  });
});

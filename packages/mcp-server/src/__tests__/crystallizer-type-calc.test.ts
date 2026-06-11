import { describe, it, expect } from "vitest";
import {
  crystalSize, purity, throughput, energy,
  crCost, vacuum, forSalt, nucleation,
  bestUse, crystallizerTypes,
} from "../crystallizer-type-calc.js";

describe("crystalSize", () => {
  it("oslo largest crystals", () => {
    expect(crystalSize("oslo_fluidized_bed")).toBeGreaterThan(crystalSize("cooling_surface_scraped"));
  });
});

describe("purity", () => {
  it("dtb highest purity", () => {
    expect(purity("draft_tube_baffle_dtb")).toBeGreaterThan(purity("cooling_surface_scraped"));
  });
});

describe("throughput", () => {
  it("fc highest throughput", () => {
    expect(throughput("forced_circulation_fc")).toBeGreaterThan(throughput("oslo_fluidized_bed"));
  });
});

describe("energy", () => {
  it("cooling scraper most energy efficient", () => {
    expect(energy("cooling_surface_scraped")).toBeGreaterThan(energy("forced_circulation_fc"));
  });
});

describe("crCost", () => {
  it("vacuum most expensive", () => {
    expect(crCost("evaporative_adiabatic_vacuum")).toBeGreaterThan(crCost("cooling_surface_scraped"));
  });
});

describe("vacuum", () => {
  it("evaporative uses vacuum", () => {
    expect(vacuum("evaporative_adiabatic_vacuum")).toBe(true);
  });
  it("fc not vacuum", () => {
    expect(vacuum("forced_circulation_fc")).toBe(false);
  });
});

describe("forSalt", () => {
  it("fc for salt", () => {
    expect(forSalt("forced_circulation_fc")).toBe(true);
  });
  it("dtb not for salt", () => {
    expect(forSalt("draft_tube_baffle_dtb")).toBe(false);
  });
});

describe("nucleation", () => {
  it("oslo uses classified bed", () => {
    expect(nucleation("oslo_fluidized_bed")).toBe("classified_bed_growth_zone");
  });
});

describe("bestUse", () => {
  it("fc for salt sodium sulfate", () => {
    expect(bestUse("forced_circulation_fc")).toBe("salt_sodium_sulfate_bulk_crystal");
  });
});

describe("crystallizerTypes", () => {
  it("returns 5 types", () => {
    expect(crystallizerTypes()).toHaveLength(5);
  });
});

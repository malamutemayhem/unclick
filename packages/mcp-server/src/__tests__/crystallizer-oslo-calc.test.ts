import { describe, it, expect } from "vitest";
import {
  crystalPurity, yieldRate, energyUse, residence,
  coCost, vacuumOp, forUltrapure, supersaturation,
  bestUse, crystallizerOsloTypes,
} from "../crystallizer-oslo-calc.js";

describe("crystalPurity", () => {
  it("melt crystallizer highest purity", () => {
    expect(crystalPurity("oslo_melt_crystallizer")).toBeGreaterThan(crystalPurity("oslo_reactive_precip"));
  });
});

describe("yieldRate", () => {
  it("evaporative salt highest yield", () => {
    expect(yieldRate("oslo_evaporative_salt")).toBeGreaterThanOrEqual(yieldRate("oslo_growth_standard"));
  });
});

describe("energyUse", () => {
  it("vacuum cooling best energy use", () => {
    expect(energyUse("oslo_vacuum_cooling")).toBeGreaterThan(energyUse("oslo_evaporative_salt"));
  });
});

describe("residence", () => {
  it("evaporative salt longest residence", () => {
    expect(residence("oslo_evaporative_salt")).toBeGreaterThan(residence("oslo_reactive_precip"));
  });
});

describe("coCost", () => {
  it("melt crystallizer most expensive", () => {
    expect(coCost("oslo_melt_crystallizer")).toBeGreaterThan(coCost("oslo_reactive_precip"));
  });
});

describe("vacuumOp", () => {
  it("vacuum cooling uses vacuum", () => {
    expect(vacuumOp("oslo_vacuum_cooling")).toBe(true);
  });
  it("growth standard no vacuum", () => {
    expect(vacuumOp("oslo_growth_standard")).toBe(false);
  });
});

describe("forUltrapure", () => {
  it("melt crystallizer for ultrapure", () => {
    expect(forUltrapure("oslo_melt_crystallizer")).toBe(true);
  });
  it("evaporative salt not for ultrapure", () => {
    expect(forUltrapure("oslo_evaporative_salt")).toBe(false);
  });
});

describe("supersaturation", () => {
  it("reactive uses reagent addition", () => {
    expect(supersaturation("oslo_reactive_precip")).toBe("reagent_addition_rapid_mixing_precipitation");
  });
});

describe("bestUse", () => {
  it("evaporative salt for table salt", () => {
    expect(bestUse("oslo_evaporative_salt")).toBe("table_salt_nacl_multi_effect_evaporation");
  });
});

describe("crystallizerOsloTypes", () => {
  it("returns 5 types", () => {
    expect(crystallizerOsloTypes()).toHaveLength(5);
  });
});

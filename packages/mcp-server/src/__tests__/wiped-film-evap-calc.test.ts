import { describe, it, expect } from "vitest";
import {
  evapRate, residenceTime, heatSensitivity, viscosityRange,
  wfCost, molecular, forViscous, wiper,
  bestUse, wipedFilmEvapTypes,
} from "../wiped-film-evap-calc.js";

describe("evapRate", () => {
  it("agitated conical highest evap rate", () => {
    expect(evapRate("agitated_conical_wfe")).toBeGreaterThan(evapRate("short_path_molecular"));
  });
});

describe("residenceTime", () => {
  it("short path molecular shortest residence", () => {
    expect(residenceTime("short_path_molecular")).toBeGreaterThan(residenceTime("scraped_surface_cryst"));
  });
});

describe("heatSensitivity", () => {
  it("short path molecular best heat sensitivity", () => {
    expect(heatSensitivity("short_path_molecular")).toBeGreaterThan(heatSensitivity("scraped_surface_cryst"));
  });
});

describe("viscosityRange", () => {
  it("scraped surface widest viscosity range", () => {
    expect(viscosityRange("scraped_surface_cryst")).toBeGreaterThan(viscosityRange("short_path_molecular"));
  });
});

describe("wfCost", () => {
  it("short path molecular most expensive", () => {
    expect(wfCost("short_path_molecular")).toBeGreaterThan(wfCost("vertical_falling_wfe"));
  });
});

describe("molecular", () => {
  it("short path is molecular", () => {
    expect(molecular("short_path_molecular")).toBe(true);
  });
  it("vertical falling not molecular", () => {
    expect(molecular("vertical_falling_wfe")).toBe(false);
  });
});

describe("forViscous", () => {
  it("horizontal thin film for viscous", () => {
    expect(forViscous("horizontal_thin_film")).toBe(true);
  });
  it("short path not for viscous", () => {
    expect(forViscous("short_path_molecular")).toBe(false);
  });
});

describe("wiper", () => {
  it("scraped surface uses spring loaded blade", () => {
    expect(wiper("scraped_surface_cryst")).toBe("spring_loaded_scraper_blade_crystallizer_wall");
  });
});

describe("bestUse", () => {
  it("short path for essential oil distillation", () => {
    expect(bestUse("short_path_molecular")).toBe("essential_oil_vitamin_cbd_molecular_distill");
  });
});

describe("wipedFilmEvapTypes", () => {
  it("returns 5 types", () => {
    expect(wipedFilmEvapTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  heatTransfer, viscosityRange, foulingResist, precision,
  ssCost, continuous, forViscous, scraper,
  bestUse, scrapedSurfaceHeatTypes,
} from "../scraped-surface-heat-calc.js";

describe("heatTransfer", () => {
  it("votator and aseptic best heat transfer", () => {
    expect(heatTransfer("votator_thin_film")).toBeGreaterThan(heatTransfer("terlotherm_rotating"));
  });
});

describe("viscosityRange", () => {
  it("votator widest viscosity range", () => {
    expect(viscosityRange("votator_thin_film")).toBeGreaterThan(viscosityRange("crystallizer_scraped"));
  });
});

describe("foulingResist", () => {
  it("terlotherm and crystallizer best fouling resistance", () => {
    expect(foulingResist("terlotherm_rotating")).toBeGreaterThan(foulingResist("contherm_concentric"));
  });
});

describe("precision", () => {
  it("aseptic scraped best precision", () => {
    expect(precision("aseptic_scraped_sterile")).toBeGreaterThan(precision("terlotherm_rotating"));
  });
});

describe("ssCost", () => {
  it("aseptic scraped most expensive", () => {
    expect(ssCost("aseptic_scraped_sterile")).toBeGreaterThan(ssCost("terlotherm_rotating"));
  });
});

describe("continuous", () => {
  it("all scraped surface types are continuous", () => {
    expect(continuous("votator_thin_film")).toBe(true);
    expect(continuous("aseptic_scraped_sterile")).toBe(true);
  });
});

describe("forViscous", () => {
  it("votator for viscous", () => {
    expect(forViscous("votator_thin_film")).toBe(true);
  });
  it("crystallizer scraped not for viscous", () => {
    expect(forViscous("crystallizer_scraped")).toBe(false);
  });
});

describe("scraper", () => {
  it("terlotherm uses rotating outer cylinder", () => {
    expect(scraper("terlotherm_rotating")).toBe("rotating_outer_cylinder_inner_stationary");
  });
});

describe("bestUse", () => {
  it("aseptic scraped for uht dairy", () => {
    expect(bestUse("aseptic_scraped_sterile")).toBe("uht_dairy_aseptic_particle_gentle");
  });
});

describe("scrapedSurfaceHeatTypes", () => {
  it("returns 5 types", () => {
    expect(scrapedSurfaceHeatTypes()).toHaveLength(5);
  });
});

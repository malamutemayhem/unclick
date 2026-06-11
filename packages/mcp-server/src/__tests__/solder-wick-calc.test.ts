import { describe, it, expect } from "vitest";
import {
  absorption, precision, cleanness, flexibility,
  wickCost, fluxLoaded, forFine, braidWidth,
  bestUse, solderWicks,
} from "../solder-wick-calc.js";

describe("absorption", () => {
  it("heavy duty wide best absorption", () => {
    expect(absorption("heavy_duty_wide")).toBeGreaterThan(absorption("fine_pitch_narrow"));
  });
});

describe("precision", () => {
  it("fine pitch narrow most precise", () => {
    expect(precision("fine_pitch_narrow")).toBeGreaterThan(precision("heavy_duty_wide"));
  });
});

describe("cleanness", () => {
  it("no clean flux braid cleanest", () => {
    expect(cleanness("no_clean_flux_braid")).toBeGreaterThan(cleanness("standard_copper_braid"));
  });
});

describe("flexibility", () => {
  it("fine pitch narrow most flexible", () => {
    expect(flexibility("fine_pitch_narrow")).toBeGreaterThan(flexibility("heavy_duty_wide"));
  });
});

describe("wickCost", () => {
  it("no clean flux braid more expensive", () => {
    expect(wickCost("no_clean_flux_braid")).toBeGreaterThan(wickCost("standard_copper_braid"));
  });
});

describe("fluxLoaded", () => {
  it("rosin flux braid is flux loaded", () => {
    expect(fluxLoaded("rosin_flux_braid")).toBe(true);
  });
  it("standard copper braid not flux loaded", () => {
    expect(fluxLoaded("standard_copper_braid")).toBe(false);
  });
});

describe("forFine", () => {
  it("fine pitch narrow is for fine", () => {
    expect(forFine("fine_pitch_narrow")).toBe(true);
  });
  it("heavy duty wide not for fine", () => {
    expect(forFine("heavy_duty_wide")).toBe(false);
  });
});

describe("braidWidth", () => {
  it("fine pitch narrow uses 0 8mm ultra fine", () => {
    expect(braidWidth("fine_pitch_narrow")).toBe("0_8mm_ultra_fine");
  });
});

describe("bestUse", () => {
  it("no clean flux braid best for no wash board rework", () => {
    expect(bestUse("no_clean_flux_braid")).toBe("no_wash_board_rework");
  });
});

describe("solderWicks", () => {
  it("returns 5 types", () => {
    expect(solderWicks()).toHaveLength(5);
  });
});

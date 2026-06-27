import { describe, it, expect } from "vitest";
import {
  accuracy, fatigue, miniaturize, tempComp,
  sgpCost, fullBridge, forFatigue, gauge,
  bestUse, strainGaugePressTypes,
} from "../strain-gauge-press-calc.js";

describe("accuracy", () => {
  it("optical fiber bragg most accurate", () => {
    expect(accuracy("optical_fiber_bragg")).toBeGreaterThan(accuracy("thick_film_printed"));
  });
});

describe("fatigue", () => {
  it("optical fiber bragg best fatigue life", () => {
    expect(fatigue("optical_fiber_bragg")).toBeGreaterThan(fatigue("diffused_semi_mems"));
  });
});

describe("miniaturize", () => {
  it("diffused semi most miniaturizable", () => {
    expect(miniaturize("diffused_semi_mems")).toBeGreaterThan(miniaturize("wire_wound_legacy"));
  });
});

describe("tempComp", () => {
  it("optical fiber bragg best temp compensation", () => {
    expect(tempComp("optical_fiber_bragg")).toBeGreaterThan(tempComp("thick_film_printed"));
  });
});

describe("sgpCost", () => {
  it("optical fiber bragg most expensive", () => {
    expect(sgpCost("optical_fiber_bragg")).toBeGreaterThan(sgpCost("thick_film_printed"));
  });
});

describe("fullBridge", () => {
  it("bonded foil is full bridge", () => {
    expect(fullBridge("bonded_foil_standard")).toBe(true);
  });
  it("thick film not full bridge", () => {
    expect(fullBridge("thick_film_printed")).toBe(false);
  });
});

describe("forFatigue", () => {
  it("bonded foil for fatigue testing", () => {
    expect(forFatigue("bonded_foil_standard")).toBe(true);
  });
  it("diffused semi not for fatigue", () => {
    expect(forFatigue("diffused_semi_mems")).toBe(false);
  });
});

describe("gauge", () => {
  it("optical fiber uses bragg grating", () => {
    expect(gauge("optical_fiber_bragg")).toBe("fiber_bragg_grating_wavelength_shift");
  });
});

describe("bestUse", () => {
  it("bonded foil for load cell weigh bridge", () => {
    expect(bestUse("bonded_foil_standard")).toBe("load_cell_weigh_bridge_force_measure");
  });
});

describe("strainGaugePressTypes", () => {
  it("returns 5 types", () => {
    expect(strainGaugePressTypes()).toHaveLength(5);
  });
});

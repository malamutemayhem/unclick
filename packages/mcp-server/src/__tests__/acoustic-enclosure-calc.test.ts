import { describe, it, expect } from "vitest";
import {
  noiseReduction, ventilation, accessibility, weatherResist,
  aeCost, fullySealable, forOutdoor, construction,
  bestUse, acousticEnclosureTypes,
} from "../acoustic-enclosure-calc.js";

describe("noiseReduction", () => {
  it("full enclosure best noise reduction", () => {
    expect(noiseReduction("full_enclosure_modular")).toBeGreaterThan(noiseReduction("partial_barrier_hood"));
  });
});

describe("ventilation", () => {
  it("partial barrier best ventilation", () => {
    expect(ventilation("partial_barrier_hood")).toBeGreaterThan(ventilation("close_fitting_wrap"));
  });
});

describe("accessibility", () => {
  it("partial barrier best accessibility", () => {
    expect(accessibility("partial_barrier_hood")).toBeGreaterThan(accessibility("close_fitting_wrap"));
  });
});

describe("weatherResist", () => {
  it("outdoor weatherproof best weather resistance", () => {
    expect(weatherResist("outdoor_weatherproof")).toBeGreaterThan(weatherResist("partial_barrier_hood"));
  });
});

describe("aeCost", () => {
  it("outdoor weatherproof most expensive", () => {
    expect(aeCost("outdoor_weatherproof")).toBeGreaterThan(aeCost("partial_barrier_hood"));
  });
});

describe("fullySealable", () => {
  it("full enclosure is fully sealable", () => {
    expect(fullySealable("full_enclosure_modular")).toBe(true);
  });
  it("partial barrier not fully sealable", () => {
    expect(fullySealable("partial_barrier_hood")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("outdoor weatherproof for outdoor", () => {
    expect(forOutdoor("outdoor_weatherproof")).toBe(true);
  });
  it("full enclosure not for outdoor", () => {
    expect(forOutdoor("full_enclosure_modular")).toBe(false);
  });
});

describe("construction", () => {
  it("close fitting wrap uses mass loaded vinyl", () => {
    expect(construction("close_fitting_wrap")).toBe("mass_loaded_vinyl_barrier_close_wrap_foam");
  });
});

describe("bestUse", () => {
  it("ventilated enclosure for heat generating", () => {
    expect(bestUse("ventilated_enclosure")).toBe("heat_generating_equipment_motor_transformer");
  });
});

describe("acousticEnclosureTypes", () => {
  it("returns 5 types", () => {
    expect(acousticEnclosureTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  outputRate, mixingQuality, temperatureControl, profileAccuracy,
  reCost, continuous, forCompound, screw,
  bestUse, rubberExtruderTypes,
} from "../rubber-extruder-calc.js";

describe("outputRate", () => {
  it("twin screw rubber highest output", () => {
    expect(outputRate("twin_screw_rubber")).toBeGreaterThan(outputRate("strainer_filter"));
  });
});

describe("mixingQuality", () => {
  it("pin barrel best mixing quality", () => {
    expect(mixingQuality("pin_barrel")).toBeGreaterThan(mixingQuality("hot_feed"));
  });
});

describe("temperatureControl", () => {
  it("twin screw rubber best temperature control", () => {
    expect(temperatureControl("twin_screw_rubber")).toBeGreaterThan(temperatureControl("hot_feed"));
  });
});

describe("profileAccuracy", () => {
  it("strainer filter best profile accuracy", () => {
    expect(profileAccuracy("strainer_filter")).toBeGreaterThan(profileAccuracy("hot_feed"));
  });
});

describe("reCost", () => {
  it("twin screw rubber most expensive", () => {
    expect(reCost("twin_screw_rubber")).toBeGreaterThan(reCost("hot_feed"));
  });
});

describe("continuous", () => {
  it("all types are continuous", () => {
    expect(continuous("hot_feed")).toBe(true);
    expect(continuous("cold_feed")).toBe(true);
  });
});

describe("forCompound", () => {
  it("pin barrel for compound", () => {
    expect(forCompound("pin_barrel")).toBe(true);
  });
  it("hot feed not for compound", () => {
    expect(forCompound("hot_feed")).toBe(false);
  });
});

describe("screw", () => {
  it("pin barrel uses barrel pin interrupt", () => {
    expect(screw("pin_barrel")).toBe("barrel_pin_interrupt_screw_flight_intensive_distributive");
  });
});

describe("bestUse", () => {
  it("cold feed for profile seal hose", () => {
    expect(bestUse("cold_feed")).toBe("profile_seal_hose_gasket_general_purpose_rubber_extrusion");
  });
});

describe("rubberExtruderTypes", () => {
  it("returns 5 types", () => {
    expect(rubberExtruderTypes()).toHaveLength(5);
  });
});

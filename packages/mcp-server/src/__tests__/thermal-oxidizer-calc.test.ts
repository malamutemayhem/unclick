import { describe, it, expect } from "vitest";
import {
  destructionEfficiency, heatRecovery, fuelConsumption, vocRange,
  toCost, catalytic, forHighVoc, oxidationMethod,
  bestUse, thermalOxidizerTypes,
} from "../thermal-oxidizer-calc.js";

describe("destructionEfficiency", () => {
  it("regenerative rto and direct fired highest destruction", () => {
    expect(destructionEfficiency("regenerative_rto")).toBeGreaterThan(destructionEfficiency("recuperative"));
    expect(destructionEfficiency("direct_fired")).toBeGreaterThan(destructionEfficiency("recuperative"));
  });
});

describe("heatRecovery", () => {
  it("regenerative rto highest heat recovery", () => {
    expect(heatRecovery("regenerative_rto")).toBeGreaterThan(heatRecovery("direct_fired"));
  });
});

describe("fuelConsumption", () => {
  it("regenerative rto best fuel consumption", () => {
    expect(fuelConsumption("regenerative_rto")).toBeGreaterThan(fuelConsumption("direct_fired"));
  });
});

describe("vocRange", () => {
  it("direct fired widest voc range", () => {
    expect(vocRange("direct_fired")).toBeGreaterThan(vocRange("flameless_thermal"));
  });
});

describe("toCost", () => {
  it("flameless thermal most expensive", () => {
    expect(toCost("flameless_thermal")).toBeGreaterThan(toCost("direct_fired"));
  });
});

describe("catalytic", () => {
  it("catalytic oxidizer uses catalyst", () => {
    expect(catalytic("catalytic_oxidizer")).toBe(true);
  });
  it("regenerative rto not catalytic", () => {
    expect(catalytic("regenerative_rto")).toBe(false);
  });
});

describe("forHighVoc", () => {
  it("direct fired for high voc", () => {
    expect(forHighVoc("direct_fired")).toBe(true);
  });
  it("regenerative rto not for high voc", () => {
    expect(forHighVoc("regenerative_rto")).toBe(false);
  });
});

describe("oxidationMethod", () => {
  it("flameless uses porous media", () => {
    expect(oxidationMethod("flameless_thermal")).toBe("gradual_oxidation_porous_media_no_flame_front_ultra_low_nox");
  });
});

describe("bestUse", () => {
  it("direct fired for refinery petrochemical", () => {
    expect(bestUse("direct_fired")).toBe("refinery_petrochemical_high_voc_halogenated_solvent_destroy");
  });
});

describe("thermalOxidizerTypes", () => {
  it("returns 5 types", () => {
    expect(thermalOxidizerTypes()).toHaveLength(5);
  });
});

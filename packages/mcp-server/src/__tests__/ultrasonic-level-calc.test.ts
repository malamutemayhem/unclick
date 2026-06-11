import { describe, it, expect } from "vitest";
import {
  accuracy, range, foamImmune, tempRange,
  ulCost, nonContact, forSolids, transducer,
  bestUse, ultrasonicLevelTypes,
} from "../ultrasonic-level-calc.js";

describe("accuracy", () => {
  it("guided wave most accurate", () => {
    expect(accuracy("guided_wave_probe")).toBeGreaterThan(accuracy("clamp_on_external"));
  });
});

describe("range", () => {
  it("submersible longest range", () => {
    expect(range("submersible_pressure_comp")).toBeGreaterThan(range("clamp_on_external"));
  });
});

describe("foamImmune", () => {
  it("guided wave best foam immunity", () => {
    expect(foamImmune("guided_wave_probe")).toBeGreaterThan(foamImmune("non_contact_air_gap"));
  });
});

describe("tempRange", () => {
  it("guided wave widest temp range", () => {
    expect(tempRange("guided_wave_probe")).toBeGreaterThan(tempRange("clamp_on_external"));
  });
});

describe("ulCost", () => {
  it("guided wave most expensive", () => {
    expect(ulCost("guided_wave_probe")).toBeGreaterThan(ulCost("clamp_on_external"));
  });
});

describe("nonContact", () => {
  it("non contact air gap is non contact", () => {
    expect(nonContact("non_contact_air_gap")).toBe(true);
  });
  it("guided wave not non contact", () => {
    expect(nonContact("guided_wave_probe")).toBe(false);
  });
});

describe("forSolids", () => {
  it("non contact for solids", () => {
    expect(forSolids("non_contact_air_gap")).toBe(true);
  });
  it("clamp on not for solids", () => {
    expect(forSolids("clamp_on_external")).toBe(false);
  });
});

describe("transducer", () => {
  it("open channel uses downward facing flume", () => {
    expect(transducer("open_channel_flow")).toBe("downward_facing_flume_weir_flow_calc");
  });
});

describe("bestUse", () => {
  it("guided wave for foam turbulent surface", () => {
    expect(bestUse("guided_wave_probe")).toBe("foam_vapor_turbulent_surface_reliable");
  });
});

describe("ultrasonicLevelTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicLevelTypes()).toHaveLength(5);
  });
});

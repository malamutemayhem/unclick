import { describe, it, expect } from "vitest";
import {
  consolidation, coverageArea, frequency, portability,
  cvCost, immersed, forPrecast, vibratorConfig,
  bestUse, concreteVibratorTypes,
} from "../concrete-vibrator-calc.js";

describe("consolidation", () => {
  it("internal immersion best consolidation", () => {
    expect(consolidation("internal_immersion")).toBeGreaterThan(consolidation("surface_screed"));
  });
});

describe("coverageArea", () => {
  it("surface screed widest coverage area", () => {
    expect(coverageArea("surface_screed")).toBeGreaterThan(coverageArea("internal_immersion"));
  });
});

describe("frequency", () => {
  it("vibrating table highest frequency", () => {
    expect(frequency("vibrating_table")).toBeGreaterThan(frequency("roller_compactor"));
  });
});

describe("portability", () => {
  it("internal immersion most portable", () => {
    expect(portability("internal_immersion")).toBeGreaterThan(portability("vibrating_table"));
  });
});

describe("cvCost", () => {
  it("roller compactor most expensive", () => {
    expect(cvCost("roller_compactor")).toBeGreaterThan(cvCost("internal_immersion"));
  });
});

describe("immersed", () => {
  it("internal immersion is immersed", () => {
    expect(immersed("internal_immersion")).toBe(true);
  });
  it("external form not immersed", () => {
    expect(immersed("external_form")).toBe(false);
  });
});

describe("forPrecast", () => {
  it("vibrating table for precast", () => {
    expect(forPrecast("vibrating_table")).toBe(true);
  });
  it("internal immersion not for precast", () => {
    expect(forPrecast("internal_immersion")).toBe(false);
  });
});

describe("vibratorConfig", () => {
  it("roller compactor uses vibratory drum large area", () => {
    expect(vibratorConfig("roller_compactor")).toBe("roller_compactor_rcc_dam_pavement_vibratory_drum_large_area");
  });
});

describe("bestUse", () => {
  it("surface screed for flat slab floor deck", () => {
    expect(bestUse("surface_screed")).toBe("flat_slab_floor_deck_surface_screed_vibrating_beam_level_finish");
  });
});

describe("concreteVibratorTypes", () => {
  it("returns 5 types", () => {
    expect(concreteVibratorTypes()).toHaveLength(5);
  });
});

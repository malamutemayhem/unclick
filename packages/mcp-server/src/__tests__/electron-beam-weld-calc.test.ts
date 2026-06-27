import { describe, it, expect } from "vitest";
import {
  penetration, precision, speed, heatAffectedZone,
  ewCost, vacuum, forReactive, beam,
  bestUse, electronBeamWeldTypes,
} from "../electron-beam-weld-calc.js";

describe("penetration", () => {
  it("high vacuum deepest penetration", () => {
    expect(penetration("high_vacuum")).toBeGreaterThan(penetration("non_vacuum"));
  });
});

describe("precision", () => {
  it("high vacuum and micro eb most precise", () => {
    expect(precision("high_vacuum")).toBeGreaterThan(precision("non_vacuum"));
    expect(precision("micro_eb")).toBeGreaterThan(precision("non_vacuum"));
  });
});

describe("speed", () => {
  it("non vacuum fastest", () => {
    expect(speed("non_vacuum")).toBeGreaterThan(speed("multi_pass"));
  });
});

describe("heatAffectedZone", () => {
  it("high vacuum smallest heat affected zone", () => {
    expect(heatAffectedZone("high_vacuum")).toBeGreaterThan(heatAffectedZone("non_vacuum"));
  });
});

describe("ewCost", () => {
  it("high vacuum most expensive", () => {
    expect(ewCost("high_vacuum")).toBeGreaterThan(ewCost("non_vacuum"));
  });
});

describe("vacuum", () => {
  it("high vacuum uses vacuum", () => {
    expect(vacuum("high_vacuum")).toBe(true);
  });
  it("non vacuum no vacuum", () => {
    expect(vacuum("non_vacuum")).toBe(false);
  });
});

describe("forReactive", () => {
  it("high vacuum for reactive metals", () => {
    expect(forReactive("high_vacuum")).toBe(true);
  });
  it("non vacuum not for reactive metals", () => {
    expect(forReactive("non_vacuum")).toBe(false);
  });
});

describe("beam", () => {
  it("micro eb uses low power fine focus", () => {
    expect(beam("micro_eb")).toBe("low_power_fine_focus_micro_weld_hermetic_seal_electronic");
  });
});

describe("bestUse", () => {
  it("non vacuum for surface treatment cladding", () => {
    expect(bestUse("non_vacuum")).toBe("surface_treatment_cladding_shallow_weld_large_component");
  });
});

describe("electronBeamWeldTypes", () => {
  it("returns 5 types", () => {
    expect(electronBeamWeldTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  deposition, speed, penetration, quality,
  sawCost, automated, forHeavyPlate, flux,
  bestUse, submergedArcWeldTypes,
} from "../submerged-arc-weld-calc.js";

describe("deposition", () => {
  it("multi wire highest deposition", () => {
    expect(deposition("multi_wire")).toBeGreaterThan(deposition("single_wire"));
  });
});

describe("speed", () => {
  it("multi wire fastest", () => {
    expect(speed("multi_wire")).toBeGreaterThan(speed("narrow_gap"));
  });
});

describe("penetration", () => {
  it("narrow gap deepest penetration", () => {
    expect(penetration("narrow_gap")).toBeGreaterThan(penetration("strip_cladding"));
  });
});

describe("quality", () => {
  it("strip cladding highest quality", () => {
    expect(quality("strip_cladding")).toBeGreaterThan(quality("single_wire"));
  });
});

describe("sawCost", () => {
  it("narrow gap most expensive", () => {
    expect(sawCost("narrow_gap")).toBeGreaterThan(sawCost("single_wire"));
  });
});

describe("automated", () => {
  it("all types are automated", () => {
    expect(automated("single_wire")).toBe(true);
    expect(automated("multi_wire")).toBe(true);
  });
});

describe("forHeavyPlate", () => {
  it("single wire for heavy plate", () => {
    expect(forHeavyPlate("single_wire")).toBe(true);
  });
  it("strip cladding not for heavy plate", () => {
    expect(forHeavyPlate("strip_cladding")).toBe(false);
  });
});

describe("flux", () => {
  it("narrow gap uses basic flux", () => {
    expect(flux("narrow_gap")).toBe("narrow_gap_basic_flux_deep_groove_thick_section_fill");
  });
});

describe("bestUse", () => {
  it("multi wire for shipyard panel line", () => {
    expect(bestUse("multi_wire")).toBe("shipyard_panel_line_deck_plate_butt_weld_mass_production");
  });
});

describe("submergedArcWeldTypes", () => {
  it("returns 5 types", () => {
    expect(submergedArcWeldTypes()).toHaveLength(5);
  });
});

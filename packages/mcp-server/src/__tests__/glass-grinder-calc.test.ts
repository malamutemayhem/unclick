import { describe, it, expect } from "vitest";
import {
  grindSpeed, edgeQuality, curveAbility, glassThickness,
  grinderCost, usesWater, cutsInterior, abrasiveType,
  bestProject, glassGrinders,
} from "../glass-grinder-calc.js";

describe("grindSpeed", () => {
  it("bandsaw glass thick fastest grind", () => {
    expect(grindSpeed("bandsaw_glass_thick")).toBeGreaterThan(grindSpeed("lapidary_flat_lap"));
  });
});

describe("edgeQuality", () => {
  it("lapidary flat lap best edge quality", () => {
    expect(edgeQuality("lapidary_flat_lap")).toBeGreaterThan(edgeQuality("bandsaw_glass_thick"));
  });
});

describe("curveAbility", () => {
  it("ring saw curve best curve ability", () => {
    expect(curveAbility("ring_saw_curve")).toBeGreaterThan(curveAbility("belt_sander_flat"));
  });
});

describe("glassThickness", () => {
  it("bandsaw glass thick handles thickest glass", () => {
    expect(glassThickness("bandsaw_glass_thick")).toBeGreaterThan(glassThickness("diamond_bit_wet"));
  });
});

describe("grinderCost", () => {
  it("bandsaw glass thick most expensive", () => {
    expect(grinderCost("bandsaw_glass_thick")).toBeGreaterThan(grinderCost("diamond_bit_wet"));
  });
});

describe("usesWater", () => {
  it("diamond bit wet uses water", () => {
    expect(usesWater("diamond_bit_wet")).toBe(true);
  });
  it("belt sander flat does not use water", () => {
    expect(usesWater("belt_sander_flat")).toBe(false);
  });
});

describe("cutsInterior", () => {
  it("ring saw curve cuts interior", () => {
    expect(cutsInterior("ring_saw_curve")).toBe(true);
  });
  it("diamond bit wet does not cut interior", () => {
    expect(cutsInterior("diamond_bit_wet")).toBe(false);
  });
});

describe("abrasiveType", () => {
  it("ring saw curve uses diamond ring blade", () => {
    expect(abrasiveType("ring_saw_curve")).toBe("diamond_ring_blade");
  });
});

describe("bestProject", () => {
  it("ring saw curve best for intricate inside cut", () => {
    expect(bestProject("ring_saw_curve")).toBe("intricate_inside_cut");
  });
});

describe("glassGrinders", () => {
  it("returns 5 types", () => {
    expect(glassGrinders()).toHaveLength(5);
  });
});

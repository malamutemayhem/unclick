import { describe, it, expect } from "vitest";
import {
  osseointegration, surgicalComplexity, longevity, healingTime,
  treatmentCost, requiresBoneGraft, immediateLoading, fixtureMaterial,
  bestCandidate, dentalImplants,
} from "../dental-implant-calc.js";

describe("osseointegration", () => {
  it("endosteal best osseointegration", () => {
    expect(osseointegration("endosteal")).toBeGreaterThan(osseointegration("mini_implant"));
  });
});

describe("surgicalComplexity", () => {
  it("zygomatic most complex surgery", () => {
    expect(surgicalComplexity("zygomatic")).toBeGreaterThan(surgicalComplexity("mini_implant"));
  });
});

describe("longevity", () => {
  it("endosteal longest lasting", () => {
    expect(longevity("endosteal")).toBeGreaterThan(longevity("mini_implant"));
  });
});

describe("healingTime", () => {
  it("zygomatic longest healing", () => {
    expect(healingTime("zygomatic")).toBeGreaterThan(healingTime("mini_implant"));
  });
});

describe("treatmentCost", () => {
  it("zygomatic most expensive", () => {
    expect(treatmentCost("zygomatic")).toBeGreaterThan(treatmentCost("mini_implant"));
  });
});

describe("requiresBoneGraft", () => {
  it("no implant type requires bone graft by default", () => {
    expect(requiresBoneGraft("endosteal")).toBe(false);
    expect(requiresBoneGraft("zygomatic")).toBe(false);
  });
});

describe("immediateLoading", () => {
  it("all on four allows immediate loading", () => {
    expect(immediateLoading("all_on_four")).toBe(true);
  });
  it("endosteal does not", () => {
    expect(immediateLoading("endosteal")).toBe(false);
  });
});

describe("fixtureMaterial", () => {
  it("zygomatic uses long titanium cheekbone", () => {
    expect(fixtureMaterial("zygomatic")).toBe("long_titanium_cheekbone");
  });
});

describe("bestCandidate", () => {
  it("all on four for full arch edentulous", () => {
    expect(bestCandidate("all_on_four")).toBe("full_arch_edentulous");
  });
});

describe("dentalImplants", () => {
  it("returns 5 implants", () => {
    expect(dentalImplants()).toHaveLength(5);
  });
});

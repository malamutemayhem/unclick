import { describe, it, expect } from "vitest";
import {
  feltDensity, drapeSoft, textureInterest, warmthValue,
  battCost, pureWool, preFelted, fiberContent,
  bestProject, woolBatts,
} from "../wool-batt-calc.js";

describe("feltDensity", () => {
  it("needle felt sheet densest felting", () => {
    expect(feltDensity("needle_felt_sheet")).toBeGreaterThan(feltDensity("insulation_batt_thick"));
  });
});

describe("drapeSoft", () => {
  it("quilt batt poly softest drape", () => {
    expect(drapeSoft("quilt_batt_poly")).toBeGreaterThan(drapeSoft("needle_felt_sheet"));
  });
});

describe("textureInterest", () => {
  it("art batt textured most texture interest", () => {
    expect(textureInterest("art_batt_textured")).toBeGreaterThan(textureInterest("quilt_batt_poly"));
  });
});

describe("warmthValue", () => {
  it("insulation batt thick warmest", () => {
    expect(warmthValue("insulation_batt_thick")).toBeGreaterThan(warmthValue("art_batt_textured"));
  });
});

describe("battCost", () => {
  it("art batt textured most expensive", () => {
    expect(battCost("art_batt_textured")).toBeGreaterThan(battCost("quilt_batt_poly"));
  });
});

describe("pureWool", () => {
  it("wet felt merino is pure wool", () => {
    expect(pureWool("wet_felt_merino")).toBe(true);
  });
  it("quilt batt poly is not pure wool", () => {
    expect(pureWool("quilt_batt_poly")).toBe(false);
  });
});

describe("preFelted", () => {
  it("needle felt sheet is pre felted", () => {
    expect(preFelted("needle_felt_sheet")).toBe(true);
  });
  it("wet felt merino is not pre felted", () => {
    expect(preFelted("wet_felt_merino")).toBe(false);
  });
});

describe("fiberContent", () => {
  it("art batt textured uses mixed fiber novelty", () => {
    expect(fiberContent("art_batt_textured")).toBe("mixed_fiber_novelty");
  });
});

describe("bestProject", () => {
  it("wet felt merino best for wet felt garment", () => {
    expect(bestProject("wet_felt_merino")).toBe("wet_felt_garment");
  });
});

describe("woolBatts", () => {
  it("returns 5 types", () => {
    expect(woolBatts()).toHaveLength(5);
  });
});

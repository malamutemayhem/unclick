import { describe, it, expect } from "vitest";
import {
  biocompatibility, mechanicalStrength, wearResistance, corrosionResistance,
  materialCost, mriCompatible, shapeMemory, primaryUse,
  osseointegration, implantMaterials,
} from "../implant-material-calc.js";

describe("biocompatibility", () => {
  it("titanium most biocompatible", () => {
    expect(biocompatibility("titanium")).toBeGreaterThan(biocompatibility("polyethylene"));
  });
});

describe("mechanicalStrength", () => {
  it("cobalt chrome strongest", () => {
    expect(mechanicalStrength("cobalt_chrome")).toBeGreaterThan(mechanicalStrength("polyethylene"));
  });
});

describe("wearResistance", () => {
  it("ceramic best wear resistance", () => {
    expect(wearResistance("ceramic")).toBeGreaterThan(wearResistance("polyethylene"));
  });
});

describe("corrosionResistance", () => {
  it("titanium best corrosion resistance", () => {
    expect(corrosionResistance("titanium")).toBeGreaterThan(corrosionResistance("cobalt_chrome"));
  });
});

describe("materialCost", () => {
  it("nitinol most expensive", () => {
    expect(materialCost("nitinol")).toBeGreaterThan(materialCost("polyethylene"));
  });
});

describe("mriCompatible", () => {
  it("titanium is mri compatible", () => {
    expect(mriCompatible("titanium")).toBe(true);
  });
  it("cobalt chrome is not", () => {
    expect(mriCompatible("cobalt_chrome")).toBe(false);
  });
});

describe("shapeMemory", () => {
  it("nitinol has shape memory", () => {
    expect(shapeMemory("nitinol")).toBe(true);
  });
  it("titanium does not", () => {
    expect(shapeMemory("titanium")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("nitinol for stent orthodontic wire", () => {
    expect(primaryUse("nitinol")).toBe("stent_orthodontic_wire");
  });
});

describe("osseointegration", () => {
  it("titanium excellent bone bonding", () => {
    expect(osseointegration("titanium")).toBe("excellent_bone_bonding");
  });
});

describe("implantMaterials", () => {
  it("returns 5 materials", () => {
    expect(implantMaterials()).toHaveLength(5);
  });
});

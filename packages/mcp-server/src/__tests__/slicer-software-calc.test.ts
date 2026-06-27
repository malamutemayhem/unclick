import { describe, it, expect } from "vitest";
import {
  easeOfUse, advancedFeatures, printerSupport, slicingSpeed,
  licenseCost, openSource, multiMaterialSupport, coreEngine,
  bestUser, slicerSoftwareTypes,
} from "../slicer-software-calc.js";

describe("easeOfUse", () => {
  it("cura easiest to use", () => {
    expect(easeOfUse("cura")).toBeGreaterThan(easeOfUse("simplify3d"));
  });
});

describe("advancedFeatures", () => {
  it("orcaslicer most advanced", () => {
    expect(advancedFeatures("orcaslicer")).toBeGreaterThan(advancedFeatures("ideamaker"));
  });
});

describe("printerSupport", () => {
  it("cura widest printer support", () => {
    expect(printerSupport("cura")).toBeGreaterThan(printerSupport("ideamaker"));
  });
});

describe("slicingSpeed", () => {
  it("orcaslicer fastest slicing", () => {
    expect(slicingSpeed("orcaslicer")).toBeGreaterThan(slicingSpeed("cura"));
  });
});

describe("licenseCost", () => {
  it("simplify3d has license cost", () => {
    expect(licenseCost("simplify3d")).toBeGreaterThan(licenseCost("cura"));
  });
});

describe("openSource", () => {
  it("prusaslicer is open source", () => {
    expect(openSource("prusaslicer")).toBe(true);
  });
  it("simplify3d is not", () => {
    expect(openSource("simplify3d")).toBe(false);
  });
});

describe("multiMaterialSupport", () => {
  it("cura supports multi material", () => {
    expect(multiMaterialSupport("cura")).toBe(true);
  });
  it("ideamaker does not", () => {
    expect(multiMaterialSupport("ideamaker")).toBe(false);
  });
});

describe("coreEngine", () => {
  it("orcaslicer uses bambu fork arachne enhanced", () => {
    expect(coreEngine("orcaslicer")).toBe("bambu_fork_arachne_enhanced");
  });
});

describe("bestUser", () => {
  it("cura for beginner ultimaker general", () => {
    expect(bestUser("cura")).toBe("beginner_ultimaker_general");
  });
});

describe("slicerSoftwareTypes", () => {
  it("returns 5 types", () => {
    expect(slicerSoftwareTypes()).toHaveLength(5);
  });
});

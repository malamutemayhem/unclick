import { describe, it, expect } from "vitest";
import {
  stitchCount, sewSpeed, fabricThickness, easeOfUse,
  machineCost, autoThreadCut, portableSize, feedSystem,
  bestProject, sewingMachines,
} from "../sewing-machine-calc.js";

describe("stitchCount", () => {
  it("embroidery multi most stitch types", () => {
    expect(stitchCount("embroidery_multi")).toBeGreaterThan(stitchCount("mechanical_basic"));
  });
});

describe("sewSpeed", () => {
  it("industrial heavy fastest sew speed", () => {
    expect(sewSpeed("industrial_heavy")).toBeGreaterThan(sewSpeed("embroidery_multi"));
  });
});

describe("fabricThickness", () => {
  it("industrial heavy handles thickest fabric", () => {
    expect(fabricThickness("industrial_heavy")).toBeGreaterThan(fabricThickness("embroidery_multi"));
  });
});

describe("easeOfUse", () => {
  it("computerized auto easiest to use", () => {
    expect(easeOfUse("computerized_auto")).toBeGreaterThan(easeOfUse("industrial_heavy"));
  });
});

describe("machineCost", () => {
  it("embroidery multi most expensive", () => {
    expect(machineCost("embroidery_multi")).toBeGreaterThan(machineCost("mechanical_basic"));
  });
});

describe("autoThreadCut", () => {
  it("computerized auto has auto thread cut", () => {
    expect(autoThreadCut("computerized_auto")).toBe(true);
  });
  it("mechanical basic does not", () => {
    expect(autoThreadCut("mechanical_basic")).toBe(false);
  });
});

describe("portableSize", () => {
  it("mechanical basic is portable size", () => {
    expect(portableSize("mechanical_basic")).toBe(true);
  });
  it("industrial heavy is not", () => {
    expect(portableSize("industrial_heavy")).toBe(false);
  });
});

describe("feedSystem", () => {
  it("industrial heavy uses walking foot compound", () => {
    expect(feedSystem("industrial_heavy")).toBe("walking_foot_compound");
  });
});

describe("bestProject", () => {
  it("embroidery multi for monogram logo decorative", () => {
    expect(bestProject("embroidery_multi")).toBe("monogram_logo_decorative");
  });
});

describe("sewingMachines", () => {
  it("returns 5 types", () => {
    expect(sewingMachines()).toHaveLength(5);
  });
});

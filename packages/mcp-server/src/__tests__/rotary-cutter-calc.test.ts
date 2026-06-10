import { describe, it, expect } from "vitest";
import {
  cuttingSpeed, precisionCut, layerCapacity, handComfort,
  cutterCost, safetyLock, replaceBlade, bladeType,
  bestProject, rotaryCutters,
} from "../rotary-cutter-calc.js";

describe("cuttingSpeed", () => {
  it("electric cordless fastest cutting", () => {
    expect(cuttingSpeed("electric_cordless")).toBeGreaterThan(cuttingSpeed("small_28mm"));
  });
});

describe("precisionCut", () => {
  it("small 28mm most precise cut", () => {
    expect(precisionCut("small_28mm")).toBeGreaterThan(precisionCut("large_60mm"));
  });
});

describe("layerCapacity", () => {
  it("large 60mm most layer capacity", () => {
    expect(layerCapacity("large_60mm")).toBeGreaterThan(layerCapacity("small_28mm"));
  });
});

describe("handComfort", () => {
  it("ergonomic grip most comfortable", () => {
    expect(handComfort("ergonomic_grip")).toBeGreaterThan(handComfort("large_60mm"));
  });
});

describe("cutterCost", () => {
  it("electric cordless most expensive", () => {
    expect(cutterCost("electric_cordless")).toBeGreaterThan(cutterCost("standard_45mm"));
  });
});

describe("safetyLock", () => {
  it("standard 45mm has safety lock", () => {
    expect(safetyLock("standard_45mm")).toBe(true);
  });
  it("electric cordless has safety lock", () => {
    expect(safetyLock("electric_cordless")).toBe(true);
  });
});

describe("replaceBlade", () => {
  it("standard 45mm has replaceable blade", () => {
    expect(replaceBlade("standard_45mm")).toBe(true);
  });
  it("electric cordless does not", () => {
    expect(replaceBlade("electric_cordless")).toBe(false);
  });
});

describe("bladeType", () => {
  it("large 60mm uses circular tungsten 60", () => {
    expect(bladeType("large_60mm")).toBe("circular_tungsten_60");
  });
});

describe("bestProject", () => {
  it("small 28mm for curve template detail", () => {
    expect(bestProject("small_28mm")).toBe("curve_template_detail");
  });
});

describe("rotaryCutters", () => {
  it("returns 5 types", () => {
    expect(rotaryCutters()).toHaveLength(5);
  });
});

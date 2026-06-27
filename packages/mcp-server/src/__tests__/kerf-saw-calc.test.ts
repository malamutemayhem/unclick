import { describe, it, expect } from "vitest";
import {
  cutWidth, materialSave, cutSmooth, bladeLife,
  kerfCost, adjustableWidth, forWafer, rimStyle,
  bestUse, kerfSaws,
} from "../kerf-saw-calc.js";

describe("cutWidth", () => {
  it("micro kerf wafer thinnest cut", () => {
    expect(cutWidth("micro_kerf_wafer")).toBeGreaterThan(cutWidth("notch_kerf_segment"));
  });
});

describe("materialSave", () => {
  it("micro kerf wafer saves most material", () => {
    expect(materialSave("micro_kerf_wafer")).toBeGreaterThan(materialSave("notch_kerf_segment"));
  });
});

describe("cutSmooth", () => {
  it("micro kerf wafer smoothest cut", () => {
    expect(cutSmooth("micro_kerf_wafer")).toBeGreaterThan(cutSmooth("notch_kerf_segment"));
  });
});

describe("bladeLife", () => {
  it("notch kerf segment longest blade life", () => {
    expect(bladeLife("notch_kerf_segment")).toBeGreaterThan(bladeLife("micro_kerf_wafer"));
  });
});

describe("kerfCost", () => {
  it("micro kerf wafer most expensive", () => {
    expect(kerfCost("micro_kerf_wafer")).toBeGreaterThan(kerfCost("notch_kerf_segment"));
  });
});

describe("adjustableWidth", () => {
  it("adjustable kerf set has adjustable width", () => {
    expect(adjustableWidth("adjustable_kerf_set")).toBe(true);
  });
  it("thin kerf diamond not adjustable", () => {
    expect(adjustableWidth("thin_kerf_diamond")).toBe(false);
  });
});

describe("forWafer", () => {
  it("micro kerf wafer is for wafer", () => {
    expect(forWafer("micro_kerf_wafer")).toBe(true);
  });
  it("thin kerf diamond not for wafer", () => {
    expect(forWafer("thin_kerf_diamond")).toBe(false);
  });
});

describe("rimStyle", () => {
  it("continuous rim zero uses continuous diamond rim", () => {
    expect(rimStyle("continuous_rim_zero")).toBe("continuous_diamond_rim");
  });
});

describe("bestUse", () => {
  it("micro kerf wafer best for precious wafer slice", () => {
    expect(bestUse("micro_kerf_wafer")).toBe("precious_wafer_slice");
  });
});

describe("kerfSaws", () => {
  it("returns 5 types", () => {
    expect(kerfSaws()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  colorAccuracy, portability, easeOfUse, patchCount,
  checkerCost, softwareIncluded, forWhiteBalance, targetFormat,
  bestUse, colorCheckers,
} from "../color-checker-calc.js";

describe("colorAccuracy", () => {
  it("digital sg 140 patch most color accuracy", () => {
    expect(colorAccuracy("digital_sg_140_patch")).toBeGreaterThan(colorAccuracy("grey_card_18_percent"));
  });
});

describe("portability", () => {
  it("passport compact fold most portable", () => {
    expect(portability("passport_compact_fold")).toBeGreaterThan(portability("digital_sg_140_patch"));
  });
});

describe("easeOfUse", () => {
  it("grey card 18 percent easiest to use", () => {
    expect(easeOfUse("grey_card_18_percent")).toBeGreaterThan(easeOfUse("digital_sg_140_patch"));
  });
});

describe("patchCount", () => {
  it("digital sg 140 patch most patches", () => {
    expect(patchCount("digital_sg_140_patch")).toBeGreaterThan(patchCount("grey_card_18_percent"));
  });
});

describe("checkerCost", () => {
  it("digital sg 140 patch most expensive", () => {
    expect(checkerCost("digital_sg_140_patch")).toBeGreaterThan(checkerCost("grey_card_18_percent"));
  });
});

describe("softwareIncluded", () => {
  it("classic 24 patch includes software", () => {
    expect(softwareIncluded("classic_24_patch")).toBe(true);
  });
  it("grey card 18 percent does not include software", () => {
    expect(softwareIncluded("grey_card_18_percent")).toBe(false);
  });
});

describe("forWhiteBalance", () => {
  it("all color checkers support white balance", () => {
    expect(forWhiteBalance("classic_24_patch")).toBe(true);
    expect(forWhiteBalance("grey_card_18_percent")).toBe(true);
  });
});

describe("targetFormat", () => {
  it("passport compact fold uses tri fold pocket case", () => {
    expect(targetFormat("passport_compact_fold")).toBe("tri_fold_pocket_case");
  });
});

describe("bestUse", () => {
  it("grey card 18 percent best for quick exposure check", () => {
    expect(bestUse("grey_card_18_percent")).toBe("quick_exposure_check");
  });
});

describe("colorCheckers", () => {
  it("returns 5 types", () => {
    expect(colorCheckers()).toHaveLength(5);
  });
});

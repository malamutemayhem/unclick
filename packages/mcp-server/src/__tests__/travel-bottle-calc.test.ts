import { describe, it, expect } from "vitest";
import {
  leakProof, fillEase, dispensePrecision, packability,
  bottleCost, tsaCompliant, squeezable, dispenseType,
  bestContent, travelBottles,
} from "../travel-bottle-calc.js";

describe("leakProof", () => {
  it("hard shell flip cap most leak proof", () => {
    expect(leakProof("hard_shell_flip_cap")).toBeGreaterThan(leakProof("spray_mist_atomizer"));
  });
});

describe("fillEase", () => {
  it("jar wide mouth cream easiest to fill", () => {
    expect(fillEase("jar_wide_mouth_cream")).toBeGreaterThan(fillEase("spray_mist_atomizer"));
  });
});

describe("dispensePrecision", () => {
  it("spray mist atomizer best dispense precision", () => {
    expect(dispensePrecision("spray_mist_atomizer")).toBeGreaterThan(dispensePrecision("jar_wide_mouth_cream"));
  });
});

describe("packability", () => {
  it("silicone squeeze soft most packable", () => {
    expect(packability("silicone_squeeze_soft")).toBeGreaterThan(packability("jar_wide_mouth_cream"));
  });
});

describe("bottleCost", () => {
  it("silicone squeeze soft more expensive than tube", () => {
    expect(bottleCost("silicone_squeeze_soft")).toBeGreaterThan(bottleCost("tube_refillable_labeled"));
  });
});

describe("tsaCompliant", () => {
  it("all travel bottles are tsa compliant", () => {
    expect(tsaCompliant("silicone_squeeze_soft")).toBe(true);
    expect(tsaCompliant("jar_wide_mouth_cream")).toBe(true);
  });
});

describe("squeezable", () => {
  it("silicone squeeze soft is squeezable", () => {
    expect(squeezable("silicone_squeeze_soft")).toBe(true);
  });
  it("hard shell flip cap is not squeezable", () => {
    expect(squeezable("hard_shell_flip_cap")).toBe(false);
  });
});

describe("dispenseType", () => {
  it("spray mist atomizer uses pump fine mist", () => {
    expect(dispenseType("spray_mist_atomizer")).toBe("pump_fine_mist");
  });
});

describe("bestContent", () => {
  it("jar wide mouth cream best for moisturizer balm thick", () => {
    expect(bestContent("jar_wide_mouth_cream")).toBe("moisturizer_balm_thick");
  });
});

describe("travelBottles", () => {
  it("returns 5 types", () => {
    expect(travelBottles()).toHaveLength(5);
  });
});

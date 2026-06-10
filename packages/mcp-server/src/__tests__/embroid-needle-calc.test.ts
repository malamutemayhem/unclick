import { describe, it, expect } from "vitest";
import {
  fabricPierce, threadCapacity, fabricSafe, versatility,
  needleCost, sharpPoint, largeEye, needleProfile,
  bestStitch, embroidNeedles,
} from "../embroid-needle-calc.js";

describe("fabricPierce", () => {
  it("chenille sharp large best fabric pierce", () => {
    expect(fabricPierce("chenille_sharp_large")).toBeGreaterThan(fabricPierce("tapestry_blunt_large"));
  });
});

describe("threadCapacity", () => {
  it("tapestry blunt large most thread capacity", () => {
    expect(threadCapacity("tapestry_blunt_large")).toBeGreaterThan(threadCapacity("beading_thin_long"));
  });
});

describe("fabricSafe", () => {
  it("tapestry blunt large safest for fabric", () => {
    expect(fabricSafe("tapestry_blunt_large")).toBeGreaterThan(fabricSafe("chenille_sharp_large"));
  });
});

describe("versatility", () => {
  it("crewel sharp eye most versatile", () => {
    expect(versatility("crewel_sharp_eye")).toBeGreaterThan(versatility("beading_thin_long"));
  });
});

describe("needleCost", () => {
  it("beading thin long more expensive than crewel", () => {
    expect(needleCost("beading_thin_long")).toBeGreaterThan(needleCost("crewel_sharp_eye"));
  });
});

describe("sharpPoint", () => {
  it("crewel sharp eye has sharp point", () => {
    expect(sharpPoint("crewel_sharp_eye")).toBe(true);
  });
  it("tapestry blunt large does not have sharp point", () => {
    expect(sharpPoint("tapestry_blunt_large")).toBe(false);
  });
});

describe("largeEye", () => {
  it("tapestry blunt large has large eye", () => {
    expect(largeEye("tapestry_blunt_large")).toBe(true);
  });
  it("beading thin long does not have large eye", () => {
    expect(largeEye("beading_thin_long")).toBe(false);
  });
});

describe("needleProfile", () => {
  it("milliners straw long is long uniform round", () => {
    expect(needleProfile("milliners_straw_long")).toBe("long_uniform_round");
  });
});

describe("bestStitch", () => {
  it("tapestry blunt large best for cross stitch canvas", () => {
    expect(bestStitch("tapestry_blunt_large")).toBe("cross_stitch_canvas");
  });
});

describe("embroidNeedles", () => {
  it("returns 5 types", () => {
    expect(embroidNeedles()).toHaveLength(5);
  });
});

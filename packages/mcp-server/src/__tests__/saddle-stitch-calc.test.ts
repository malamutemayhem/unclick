import { describe, it, expect } from "vitest";
import {
  threadLengthMultiplier, stitchesPerCm, needleSizeMm, prickingIronSpacingMm,
  tensileStrengthKg, waxRequired, abrasionResistance, stitchingTimeMinsPerCm,
  costPerMeter, threadTypes,
} from "../saddle-stitch-calc.js";

describe("threadLengthMultiplier", () => {
  it("returns 3.5", () => {
    expect(threadLengthMultiplier()).toBe(3.5);
  });
});

describe("stitchesPerCm", () => {
  it("silk has most stitches per cm", () => {
    expect(stitchesPerCm("silk")).toBeGreaterThan(stitchesPerCm("sinew"));
  });
});

describe("needleSizeMm", () => {
  it("silk uses smallest needle", () => {
    expect(needleSizeMm("silk")).toBeLessThan(needleSizeMm("sinew"));
  });
});

describe("prickingIronSpacingMm", () => {
  it("silk has tightest spacing", () => {
    expect(prickingIronSpacingMm("silk")).toBeLessThan(
      prickingIronSpacingMm("sinew")
    );
  });
});

describe("tensileStrengthKg", () => {
  it("nylon is strongest", () => {
    expect(tensileStrengthKg("nylon")).toBeGreaterThan(
      tensileStrengthKg("silk")
    );
  });
});

describe("waxRequired", () => {
  it("linen needs wax", () => {
    expect(waxRequired("linen")).toBe(true);
  });
  it("polyester does not need wax", () => {
    expect(waxRequired("polyester")).toBe(false);
  });
});

describe("abrasionResistance", () => {
  it("polyester has best abrasion resistance", () => {
    expect(abrasionResistance("polyester")).toBeGreaterThan(
      abrasionResistance("silk")
    );
  });
});

describe("stitchingTimeMinsPerCm", () => {
  it("polyester is fastest", () => {
    expect(stitchingTimeMinsPerCm("polyester")).toBeLessThan(
      stitchingTimeMinsPerCm("sinew")
    );
  });
});

describe("costPerMeter", () => {
  it("silk is most expensive", () => {
    expect(costPerMeter("silk")).toBeGreaterThan(costPerMeter("polyester"));
  });
});

describe("threadTypes", () => {
  it("returns 5 types", () => {
    expect(threadTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  stationsPerSignature, threadLengthMultiplier, signatureThicknessMm,
  swellPercent, spineFlexibility, decorativeRating, durabilityRating,
  needleSizeMm, costPerBook, bindingStyles,
} from "../kettle-stitch-calc.js";

describe("stationsPerSignature", () => {
  it("packed sewing has most stations", () => {
    expect(stationsPerSignature("packed_sewing")).toBeGreaterThan(
      stationsPerSignature("link_stitch")
    );
  });
});

describe("threadLengthMultiplier", () => {
  it("packed sewing uses most thread", () => {
    expect(threadLengthMultiplier("packed_sewing")).toBeGreaterThan(
      threadLengthMultiplier("link_stitch")
    );
  });
});

describe("signatureThicknessMm", () => {
  it("more sheets is thicker", () => {
    expect(signatureThicknessMm(8)).toBeGreaterThan(
      signatureThicknessMm(4)
    );
  });
});

describe("swellPercent", () => {
  it("packed sewing has most swell", () => {
    expect(swellPercent("packed_sewing")).toBeGreaterThan(
      swellPercent("recessed_cord")
    );
  });
});

describe("spineFlexibility", () => {
  it("long stitch is most flexible", () => {
    expect(spineFlexibility("long_stitch")).toBeGreaterThan(
      spineFlexibility("packed_sewing")
    );
  });
});

describe("decorativeRating", () => {
  it("long stitch is most decorative", () => {
    expect(decorativeRating("long_stitch")).toBeGreaterThan(
      decorativeRating("recessed_cord")
    );
  });
});

describe("durabilityRating", () => {
  it("packed sewing is most durable", () => {
    expect(durabilityRating("packed_sewing")).toBeGreaterThan(
      durabilityRating("long_stitch")
    );
  });
});

describe("needleSizeMm", () => {
  it("packed sewing uses smallest needle", () => {
    expect(needleSizeMm("packed_sewing")).toBeLessThan(
      needleSizeMm("long_stitch")
    );
  });
});

describe("costPerBook", () => {
  it("packed sewing is most expensive", () => {
    expect(costPerBook("packed_sewing")).toBeGreaterThan(
      costPerBook("link_stitch")
    );
  });
});

describe("bindingStyles", () => {
  it("returns 5 styles", () => {
    expect(bindingStyles()).toHaveLength(5);
  });
});

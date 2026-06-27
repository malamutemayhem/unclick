import { describe, it, expect } from "vitest";
import {
  strength, flexibility, detailWork, structuralUse,
  wireCost, forWrapping, forFramework, wireMetal,
  bestUse, wireGauges,
} from "../wire-gauge-calc.js";

describe("strength", () => {
  it("gauge 16 thick strongest", () => {
    expect(strength("gauge_16_thick")).toBeGreaterThan(strength("gauge_26_fine"));
  });
});

describe("flexibility", () => {
  it("gauge 26 fine most flexible", () => {
    expect(flexibility("gauge_26_fine")).toBeGreaterThan(flexibility("gauge_16_thick"));
  });
});

describe("detailWork", () => {
  it("gauge 26 fine best for detail", () => {
    expect(detailWork("gauge_26_fine")).toBeGreaterThan(detailWork("gauge_16_thick"));
  });
});

describe("structuralUse", () => {
  it("gauge 16 thick best structural", () => {
    expect(structuralUse("gauge_16_thick")).toBeGreaterThan(structuralUse("gauge_26_fine"));
  });
});

describe("wireCost", () => {
  it("gauge 16 thick most expensive", () => {
    expect(wireCost("gauge_16_thick")).toBeGreaterThan(wireCost("gauge_26_fine"));
  });
});

describe("forWrapping", () => {
  it("gauge 24 thin is for wrapping", () => {
    expect(forWrapping("gauge_24_thin")).toBe(true);
  });
  it("gauge 18 heavy is not for wrapping", () => {
    expect(forWrapping("gauge_18_heavy")).toBe(false);
  });
});

describe("forFramework", () => {
  it("gauge 16 thick is for framework", () => {
    expect(forFramework("gauge_16_thick")).toBe(true);
  });
  it("gauge 24 thin is not for framework", () => {
    expect(forFramework("gauge_24_thin")).toBe(false);
  });
});

describe("wireMetal", () => {
  it("gauge 26 fine uses gold filled soft", () => {
    expect(wireMetal("gauge_26_fine")).toBe("gold_filled_soft");
  });
});

describe("bestUse", () => {
  it("gauge 20 medium best for general wire wrap", () => {
    expect(bestUse("gauge_20_medium")).toBe("general_wire_wrap");
  });
});

describe("wireGauges", () => {
  it("returns 5 types", () => {
    expect(wireGauges()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  depthRatio, pullOutResistance, glueAreaRating, flushSurface,
  cuttingComplexity, toolsRequired, clampsNeeded,
  bestForThicknessMm, aestheticRating, lapTypes,
} from "../lap-joint-calc.js";

describe("depthRatio", () => {
  it("all are half depth", () => {
    expect(depthRatio("half_lap")).toBe(0.5);
  });
});

describe("pullOutResistance", () => {
  it("dovetail lap resists pullout best", () => {
    expect(pullOutResistance("dovetail_lap")).toBeGreaterThan(
      pullOutResistance("mitered_half")
    );
  });
});

describe("glueAreaRating", () => {
  it("cross lap has most glue area", () => {
    expect(glueAreaRating("cross_lap")).toBeGreaterThan(
      glueAreaRating("mitered_half")
    );
  });
});

describe("flushSurface", () => {
  it("always flush", () => {
    expect(flushSurface("half_lap")).toBe(true);
  });
});

describe("cuttingComplexity", () => {
  it("dovetail lap is most complex", () => {
    expect(cuttingComplexity("dovetail_lap")).toBeGreaterThan(
      cuttingComplexity("half_lap")
    );
  });
});

describe("toolsRequired", () => {
  it("dovetail lap uses router", () => {
    expect(toolsRequired("dovetail_lap")).toBe("router");
  });
});

describe("clampsNeeded", () => {
  it("mitered half needs most clamps", () => {
    expect(clampsNeeded("mitered_half")).toBeGreaterThan(
      clampsNeeded("dovetail_lap")
    );
  });
});

describe("bestForThicknessMm", () => {
  it("cross lap works best with thicker stock", () => {
    expect(bestForThicknessMm("cross_lap")).toBeGreaterThan(
      bestForThicknessMm("mitered_half")
    );
  });
});

describe("aestheticRating", () => {
  it("dovetail lap looks best", () => {
    expect(aestheticRating("dovetail_lap")).toBeGreaterThan(
      aestheticRating("half_lap")
    );
  });
});

describe("lapTypes", () => {
  it("returns 5 types", () => {
    expect(lapTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  cutQualityRating, maxThicknessMm, pressureRequired, oilRequired,
  curvesCapable, straightLinesOnly, wheelLifeCuts, beginnerFriendly,
  costEstimate, cuttingTools,
} from "../glass-cutting-calc.js";

describe("cutQualityRating", () => {
  it("diamond wheel gives best cut", () => {
    expect(cutQualityRating("diamond_wheel")).toBeGreaterThan(
      cutQualityRating("carbide_wheel")
    );
  });
});

describe("maxThicknessMm", () => {
  it("diamond wheel cuts thickest glass", () => {
    expect(maxThicknessMm("diamond_wheel")).toBeGreaterThan(
      maxThicknessMm("carbide_wheel")
    );
  });
});

describe("pressureRequired", () => {
  it("carbide wheel needs most pressure", () => {
    expect(pressureRequired("carbide_wheel")).toBeGreaterThan(
      pressureRequired("diamond_wheel")
    );
  });
});

describe("oilRequired", () => {
  it("oil cutter needs oil", () => {
    expect(oilRequired("oil_cutter")).toBe(true);
  });
  it("carbide wheel does not", () => {
    expect(oilRequired("carbide_wheel")).toBe(false);
  });
});

describe("curvesCapable", () => {
  it("diamond wheel can cut curves", () => {
    expect(curvesCapable("diamond_wheel")).toBe(true);
  });
  it("strip cutter cannot", () => {
    expect(curvesCapable("strip_cutter")).toBe(false);
  });
});

describe("straightLinesOnly", () => {
  it("strip cutter is straight lines only", () => {
    expect(straightLinesOnly("strip_cutter")).toBe(true);
  });
});

describe("wheelLifeCuts", () => {
  it("diamond wheel lasts longest", () => {
    expect(wheelLifeCuts("diamond_wheel")).toBeGreaterThan(
      wheelLifeCuts("carbide_wheel")
    );
  });
});

describe("beginnerFriendly", () => {
  it("oil cutter is beginner friendly", () => {
    expect(beginnerFriendly("oil_cutter")).toBe(true);
  });
  it("carbide wheel is not", () => {
    expect(beginnerFriendly("carbide_wheel")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("strip cutter is most expensive", () => {
    expect(costEstimate("strip_cutter")).toBeGreaterThan(
      costEstimate("carbide_wheel")
    );
  });
});

describe("cuttingTools", () => {
  it("returns 5 tools", () => {
    expect(cuttingTools()).toHaveLength(5);
  });
});

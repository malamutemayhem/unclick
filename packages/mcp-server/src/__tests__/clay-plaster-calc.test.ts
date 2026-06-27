import { describe, it, expect } from "vitest";
import {
  thicknessMm, sandRatioPercent, fiberRequired, dryingTimeHours,
  applicationToolWidth, coverageM2PerKg, breathabilityRating, repairability,
  costPerM2, plasterLayers,
} from "../clay-plaster-calc.js";

describe("thicknessMm", () => {
  it("scratch is thickest", () => {
    expect(thicknessMm("scratch")).toBeGreaterThan(thicknessMm("finish"));
  });
});

describe("sandRatioPercent", () => {
  it("scratch has most sand", () => {
    expect(sandRatioPercent("scratch")).toBeGreaterThan(
      sandRatioPercent("finish")
    );
  });
  it("lime wash has no sand", () => {
    expect(sandRatioPercent("lime_wash")).toBe(0);
  });
});

describe("fiberRequired", () => {
  it("scratch needs fiber", () => {
    expect(fiberRequired("scratch")).toBe(true);
  });
  it("finish does not need fiber", () => {
    expect(fiberRequired("finish")).toBe(false);
  });
});

describe("dryingTimeHours", () => {
  it("scratch dries slowest", () => {
    expect(dryingTimeHours("scratch")).toBeGreaterThan(
      dryingTimeHours("lime_wash")
    );
  });
});

describe("applicationToolWidth", () => {
  it("scratch uses notched trowel", () => {
    expect(applicationToolWidth("scratch")).toBe("notched_trowel");
  });
  it("lime wash uses brush", () => {
    expect(applicationToolWidth("lime_wash")).toBe("brush");
  });
});

describe("coverageM2PerKg", () => {
  it("lime wash covers most area", () => {
    expect(coverageM2PerKg("lime_wash")).toBeGreaterThan(
      coverageM2PerKg("scratch")
    );
  });
});

describe("breathabilityRating", () => {
  it("scratch is highly breathable", () => {
    expect(breathabilityRating("scratch")).toBe(5);
  });
});

describe("repairability", () => {
  it("scratch is most repairable", () => {
    expect(repairability("scratch")).toBeGreaterThanOrEqual(
      repairability("burnished")
    );
  });
});

describe("costPerM2", () => {
  it("burnished is most expensive", () => {
    expect(costPerM2("burnished")).toBeGreaterThan(costPerM2("lime_wash"));
  });
});

describe("plasterLayers", () => {
  it("returns 5 layers", () => {
    expect(plasterLayers()).toHaveLength(5);
  });
});

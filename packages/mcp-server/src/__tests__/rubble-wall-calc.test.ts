import { describe, it, expect } from "vitest";
import {
  wallThicknessCm, stonesPerM2, mortarPercent, dressLevelRequired,
  loadBearingRating, weatherResistance, buildSpeedM2PerDay,
  aestheticRating, costPerM2, rubbleTypes,
} from "../rubble-wall-calc.js";

describe("wallThicknessCm", () => {
  it("random is thickest", () => {
    expect(wallThicknessCm("random")).toBeGreaterThan(
      wallThicknessCm("flint")
    );
  });
});

describe("stonesPerM2", () => {
  it("flint needs most stones", () => {
    expect(stonesPerM2("flint")).toBeGreaterThan(stonesPerM2("squared"));
  });
});

describe("mortarPercent", () => {
  it("random uses most mortar", () => {
    expect(mortarPercent("random")).toBeGreaterThan(
      mortarPercent("polygonal")
    );
  });
});

describe("dressLevelRequired", () => {
  it("polygonal needs most dressing", () => {
    expect(dressLevelRequired("polygonal")).toBeGreaterThan(
      dressLevelRequired("random")
    );
  });
});

describe("loadBearingRating", () => {
  it("squared bears most load", () => {
    expect(loadBearingRating("squared")).toBeGreaterThan(
      loadBearingRating("flint")
    );
  });
});

describe("weatherResistance", () => {
  it("flint resists weather best", () => {
    expect(weatherResistance("flint")).toBeGreaterThan(
      weatherResistance("random")
    );
  });
});

describe("buildSpeedM2PerDay", () => {
  it("random builds fastest", () => {
    expect(buildSpeedM2PerDay("random")).toBeGreaterThan(
      buildSpeedM2PerDay("polygonal")
    );
  });
});

describe("aestheticRating", () => {
  it("polygonal looks best", () => {
    expect(aestheticRating("polygonal")).toBeGreaterThan(
      aestheticRating("random")
    );
  });
});

describe("costPerM2", () => {
  it("polygonal is most expensive", () => {
    expect(costPerM2("polygonal")).toBeGreaterThan(costPerM2("random"));
  });
});

describe("rubbleTypes", () => {
  it("returns 5 types", () => {
    expect(rubbleTypes()).toHaveLength(5);
  });
});

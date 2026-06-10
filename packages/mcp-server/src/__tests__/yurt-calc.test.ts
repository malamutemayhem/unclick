import { describe, it, expect } from "vitest";
import {
  diameterMeters, wallSections, setupTimeHours,
  feltLayerCount, windResistanceKph, insulation,
  portable, occupancyPersons, costEstimate, yurtStyles,
} from "../yurt-calc.js";

describe("diameterMeters", () => {
  it("modern glamping is largest", () => {
    expect(diameterMeters("modern_glamping")).toBeGreaterThan(
      diameterMeters("turkic_yurt")
    );
  });
});

describe("wallSections", () => {
  it("modern glamping has most sections", () => {
    expect(wallSections("modern_glamping")).toBeGreaterThan(
      wallSections("turkic_yurt")
    );
  });
});

describe("setupTimeHours", () => {
  it("modern glamping takes longest", () => {
    expect(setupTimeHours("modern_glamping")).toBeGreaterThan(
      setupTimeHours("mongolian_ger")
    );
  });
});

describe("feltLayerCount", () => {
  it("kazakh has most felt layers", () => {
    expect(feltLayerCount("kazakh")).toBeGreaterThan(
      feltLayerCount("turkic_yurt")
    );
  });
});

describe("windResistanceKph", () => {
  it("kazakh resists most wind", () => {
    expect(windResistanceKph("kazakh")).toBeGreaterThan(
      windResistanceKph("modern_glamping")
    );
  });
});

describe("insulation", () => {
  it("kazakh has best insulation", () => {
    expect(insulation("kazakh")).toBeGreaterThan(
      insulation("modern_glamping")
    );
  });
});

describe("portable", () => {
  it("mongolian ger is portable", () => {
    expect(portable("mongolian_ger")).toBe(true);
  });
  it("modern glamping is not", () => {
    expect(portable("modern_glamping")).toBe(false);
  });
});

describe("occupancyPersons", () => {
  it("kazakh holds most people", () => {
    expect(occupancyPersons("kazakh")).toBeGreaterThan(
      occupancyPersons("modern_glamping")
    );
  });
});

describe("costEstimate", () => {
  it("modern glamping is most expensive", () => {
    expect(costEstimate("modern_glamping")).toBeGreaterThan(
      costEstimate("kazakh")
    );
  });
});

describe("yurtStyles", () => {
  it("returns 5 styles", () => {
    expect(yurtStyles()).toHaveLength(5);
  });
});

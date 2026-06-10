import { describe, it, expect } from "vitest";
import {
  boardWidthCm, stringLengthCm, accuracyDegrees,
  durabilityYears, waterResistance, knotMarkers,
  nightUsable, craftTimeHours, costEstimate, kamalMaterials,
} from "../kamal-nav-calc.js";

describe("boardWidthCm", () => {
  it("teak has widest board", () => {
    expect(boardWidthCm("teak")).toBeGreaterThan(
      boardWidthCm("coconut_shell")
    );
  });
});

describe("stringLengthCm", () => {
  it("teak has longest string", () => {
    expect(stringLengthCm("teak")).toBeGreaterThan(
      stringLengthCm("coconut_shell")
    );
  });
});

describe("accuracyDegrees", () => {
  it("teak is most accurate (lowest degrees)", () => {
    expect(accuracyDegrees("teak")).toBeLessThan(
      accuracyDegrees("coconut_shell")
    );
  });
});

describe("durabilityYears", () => {
  it("teak lasts longest", () => {
    expect(durabilityYears("teak")).toBeGreaterThan(
      durabilityYears("bamboo")
    );
  });
});

describe("waterResistance", () => {
  it("teak has best water resistance", () => {
    expect(waterResistance("teak")).toBeGreaterThan(
      waterResistance("bamboo")
    );
  });
});

describe("knotMarkers", () => {
  it("teak has most knot markers", () => {
    expect(knotMarkers("teak")).toBeGreaterThan(
      knotMarkers("coconut_shell")
    );
  });
});

describe("nightUsable", () => {
  it("all kamals are usable at night", () => {
    expect(nightUsable("teak")).toBe(true);
    expect(nightUsable("bamboo")).toBe(true);
  });
});

describe("craftTimeHours", () => {
  it("bone takes longest to craft", () => {
    expect(craftTimeHours("bone")).toBeGreaterThan(
      craftTimeHours("bamboo")
    );
  });
});

describe("costEstimate", () => {
  it("bone is most expensive", () => {
    expect(costEstimate("bone")).toBeGreaterThan(
      costEstimate("coconut_shell")
    );
  });
});

describe("kamalMaterials", () => {
  it("returns 5 materials", () => {
    expect(kamalMaterials()).toHaveLength(5);
  });
});

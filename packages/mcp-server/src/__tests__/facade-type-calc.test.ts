import { describe, it, expect } from "vitest";
import {
  thermalPerformance, naturalVentilation, maintenanceCost,
  daylightAdmission, acousticInsulation, transparent,
  sustainable, bestClimate, lifespanYears, facadeTypes,
} from "../facade-type-calc.js";

describe("thermalPerformance", () => {
  it("double skin performs best thermally", () => {
    expect(thermalPerformance("double_skin")).toBeGreaterThan(
      thermalPerformance("curtain_wall")
    );
  });
});

describe("naturalVentilation", () => {
  it("double skin ventilates best", () => {
    expect(naturalVentilation("double_skin")).toBeGreaterThan(
      naturalVentilation("curtain_wall")
    );
  });
});

describe("maintenanceCost", () => {
  it("green wall costs most to maintain", () => {
    expect(maintenanceCost("green_wall")).toBeGreaterThan(
      maintenanceCost("masonry")
    );
  });
});

describe("daylightAdmission", () => {
  it("curtain wall admits most light", () => {
    expect(daylightAdmission("curtain_wall")).toBeGreaterThan(
      daylightAdmission("masonry")
    );
  });
});

describe("acousticInsulation", () => {
  it("double skin insulates sound best", () => {
    expect(acousticInsulation("double_skin")).toBeGreaterThan(
      acousticInsulation("curtain_wall")
    );
  });
});

describe("transparent", () => {
  it("curtain wall is transparent", () => {
    expect(transparent("curtain_wall")).toBe(true);
  });
  it("masonry is not", () => {
    expect(transparent("masonry")).toBe(false);
  });
});

describe("sustainable", () => {
  it("green wall is sustainable", () => {
    expect(sustainable("green_wall")).toBe(true);
  });
  it("curtain wall is not", () => {
    expect(sustainable("curtain_wall")).toBe(false);
  });
});

describe("bestClimate", () => {
  it("double skin for hot arid", () => {
    expect(bestClimate("double_skin")).toBe("hot_arid");
  });
});

describe("lifespanYears", () => {
  it("masonry lasts longest", () => {
    expect(lifespanYears("masonry")).toBeGreaterThan(
      lifespanYears("green_wall")
    );
  });
});

describe("facadeTypes", () => {
  it("returns 5 types", () => {
    expect(facadeTypes()).toHaveLength(5);
  });
});

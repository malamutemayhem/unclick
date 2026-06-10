import { describe, it, expect } from "vitest";
import {
  groundIceContent, thermalStability, carbonStorage, thawVulnerability,
  infrastructureRisk, yearRound, accessibleByRoad, typicalLocation,
  meanAnnualTemp, permafrostTypes,
} from "../permafrost-type-calc.js";

describe("groundIceContent", () => {
  it("continuous most ice", () => {
    expect(groundIceContent("continuous")).toBeGreaterThan(groundIceContent("sporadic"));
  });
});

describe("thermalStability", () => {
  it("continuous most stable", () => {
    expect(thermalStability("continuous")).toBeGreaterThan(thermalStability("sporadic"));
  });
});

describe("carbonStorage", () => {
  it("continuous most carbon", () => {
    expect(carbonStorage("continuous")).toBeGreaterThan(carbonStorage("alpine"));
  });
});

describe("thawVulnerability", () => {
  it("sporadic most vulnerable", () => {
    expect(thawVulnerability("sporadic")).toBeGreaterThan(thawVulnerability("continuous"));
  });
});

describe("infrastructureRisk", () => {
  it("discontinuous highest infrastructure risk", () => {
    expect(infrastructureRisk("discontinuous")).toBeGreaterThan(infrastructureRisk("subsea"));
  });
});

describe("yearRound", () => {
  it("continuous is year round", () => {
    expect(yearRound("continuous")).toBe(true);
  });
  it("sporadic is not", () => {
    expect(yearRound("sporadic")).toBe(false);
  });
});

describe("accessibleByRoad", () => {
  it("continuous is accessible by road", () => {
    expect(accessibleByRoad("continuous")).toBe(true);
  });
  it("subsea is not", () => {
    expect(accessibleByRoad("subsea")).toBe(false);
  });
});

describe("typicalLocation", () => {
  it("continuous in high arctic siberia", () => {
    expect(typicalLocation("continuous")).toBe("high_arctic_siberia");
  });
});

describe("meanAnnualTemp", () => {
  it("continuous below minus 5c", () => {
    expect(meanAnnualTemp("continuous")).toBe("below_minus_5c");
  });
});

describe("permafrostTypes", () => {
  it("returns 5 types", () => {
    expect(permafrostTypes()).toHaveLength(5);
  });
});

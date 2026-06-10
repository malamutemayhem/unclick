import { describe, it, expect } from "vitest";
import {
  impactProtection, ventilation, helmetWeight, coverage,
  helmetCost, mipsEquipped, visorIncluded, shellType,
  bestRiding, bikeHelmets,
} from "../bike-helmet-calc.js";

describe("impactProtection", () => {
  it("full face downhill highest impact protection", () => {
    expect(impactProtection("full_face_downhill")).toBeGreaterThan(impactProtection("road_aero"));
  });
});

describe("ventilation", () => {
  it("road aero best ventilation", () => {
    expect(ventilation("road_aero")).toBeGreaterThan(ventilation("full_face_downhill"));
  });
});

describe("helmetWeight", () => {
  it("road aero lightest", () => {
    expect(helmetWeight("road_aero")).toBeGreaterThan(helmetWeight("full_face_downhill"));
  });
});

describe("coverage", () => {
  it("full face downhill most coverage", () => {
    expect(coverage("full_face_downhill")).toBeGreaterThan(coverage("road_aero"));
  });
});

describe("helmetCost", () => {
  it("road aero most expensive", () => {
    expect(helmetCost("road_aero")).toBeGreaterThan(helmetCost("kids_youth"));
  });
});

describe("mipsEquipped", () => {
  it("road aero has mips", () => {
    expect(mipsEquipped("road_aero")).toBe(true);
  });
  it("commuter urban does not", () => {
    expect(mipsEquipped("commuter_urban")).toBe(false);
  });
});

describe("visorIncluded", () => {
  it("mountain enduro has visor", () => {
    expect(visorIncluded("mountain_enduro")).toBe(true);
  });
  it("road aero does not", () => {
    expect(visorIncluded("road_aero")).toBe(false);
  });
});

describe("shellType", () => {
  it("full face downhill uses fiberglass carbon composite", () => {
    expect(shellType("full_face_downhill")).toBe("fiberglass_carbon_composite");
  });
});

describe("bestRiding", () => {
  it("commuter urban for city commute casual ride", () => {
    expect(bestRiding("commuter_urban")).toBe("city_commute_casual_ride");
  });
});

describe("bikeHelmets", () => {
  it("returns 5 types", () => {
    expect(bikeHelmets()).toHaveLength(5);
  });
});

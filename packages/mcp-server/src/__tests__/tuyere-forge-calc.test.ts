import { describe, it, expect } from "vitest";
import {
  airFlow, heatFocus, durability, clinkerClear,
  tuyereCost, waterCooled, bottomBlast, blastType,
  bestUse, tuyereForges,
} from "../tuyere-forge-calc.js";

describe("airFlow", () => {
  it("bottom blast deep best air flow", () => {
    expect(airFlow("bottom_blast_deep")).toBeGreaterThan(airFlow("ceramic_lined_high"));
  });
});

describe("heatFocus", () => {
  it("ceramic lined high best heat focus", () => {
    expect(heatFocus("ceramic_lined_high")).toBeGreaterThan(heatFocus("clinker_breaker_clean"));
  });
});

describe("durability", () => {
  it("water cooled heavy most durable", () => {
    expect(durability("water_cooled_heavy")).toBeGreaterThan(durability("bottom_blast_deep"));
  });
});

describe("clinkerClear", () => {
  it("clinker breaker clean best clinker clear", () => {
    expect(clinkerClear("clinker_breaker_clean")).toBeGreaterThan(clinkerClear("bottom_blast_deep"));
  });
});

describe("tuyereCost", () => {
  it("water cooled heavy most expensive", () => {
    expect(tuyereCost("water_cooled_heavy")).toBeGreaterThan(tuyereCost("side_blast_standard"));
  });
});

describe("waterCooled", () => {
  it("water cooled heavy is water cooled", () => {
    expect(waterCooled("water_cooled_heavy")).toBe(true);
  });
  it("side blast standard not water cooled", () => {
    expect(waterCooled("side_blast_standard")).toBe(false);
  });
});

describe("bottomBlast", () => {
  it("bottom blast deep has bottom blast", () => {
    expect(bottomBlast("bottom_blast_deep")).toBe(true);
  });
  it("side blast standard no bottom blast", () => {
    expect(bottomBlast("side_blast_standard")).toBe(false);
  });
});

describe("blastType", () => {
  it("clinker breaker clean uses rotating grate blast", () => {
    expect(blastType("clinker_breaker_clean")).toBe("rotating_grate_blast");
  });
});

describe("bestUse", () => {
  it("side blast standard best for general forge blast", () => {
    expect(bestUse("side_blast_standard")).toBe("general_forge_blast");
  });
});

describe("tuyereForges", () => {
  it("returns 5 types", () => {
    expect(tuyereForges()).toHaveLength(5);
  });
});

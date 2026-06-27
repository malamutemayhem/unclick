import { describe, it, expect } from "vitest";
import {
  meltingTempC, workingTempC, annealingTempC, annealingHours,
  expansionCoeff, gatherWeight, blowpipeLength, colorTemperature,
  coolingRatePerHour, safetyGear, glassTypes,
} from "../glass-blowing.js";

describe("meltingTempC", () => {
  it("fused_silica hottest", () => {
    expect(meltingTempC("fused_silica")).toBeGreaterThan(meltingTempC("soda_lime"));
  });
});

describe("workingTempC", () => {
  it("lower than melting", () => {
    expect(workingTempC("soda_lime")).toBeLessThan(meltingTempC("soda_lime"));
  });
});

describe("annealingTempC", () => {
  it("lower than working", () => {
    expect(annealingTempC("borosilicate")).toBeLessThan(workingTempC("borosilicate"));
  });
});

describe("annealingHours", () => {
  it("increases with thickness squared", () => {
    expect(annealingHours(2)).toBeGreaterThan(annealingHours(1));
  });
});

describe("expansionCoeff", () => {
  it("borosilicate lowest", () => {
    expect(expansionCoeff("borosilicate")).toBeLessThan(expansionCoeff("soda_lime"));
  });
  it("fused_silica even lower", () => {
    expect(expansionCoeff("fused_silica")).toBeLessThan(expansionCoeff("borosilicate"));
  });
});

describe("gatherWeight", () => {
  it("positive kg", () => {
    expect(gatherWeight(10, "soda_lime")).toBeGreaterThan(0);
  });
});

describe("blowpipeLength", () => {
  it("lampwork = 30cm", () => {
    expect(blowpipeLength("lampwork")).toBe(30);
  });
  it("free_blown = 120cm", () => {
    expect(blowpipeLength("free_blown")).toBe(120);
  });
});

describe("colorTemperature", () => {
  it("cobalt = 1100", () => {
    expect(colorTemperature("cobalt")).toBe(1100);
  });
  it("unknown = 1000", () => {
    expect(colorTemperature("unknown")).toBe(1000);
  });
});

describe("coolingRatePerHour", () => {
  it("soda_lime fastest", () => {
    expect(coolingRatePerHour("soda_lime")).toBeGreaterThan(coolingRatePerHour("fused_silica"));
  });
});

describe("safetyGear", () => {
  it("returns 5 items", () => {
    expect(safetyGear()).toHaveLength(5);
  });
});

describe("glassTypes", () => {
  it("returns 4 types", () => {
    expect(glassTypes()).toHaveLength(4);
  });
});

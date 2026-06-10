import { describe, it, expect } from "vitest";
import {
  waxTemperature, waxAmountG, dyeBathLiters, colorLayers,
  crackleEffect, tjantingFlow, boilingOutTime, fixativeConcentration,
  dryingHours, stampRepeats, batikMethods,
} from "../batik-calc.js";

describe("waxTemperature", () => {
  it("paraffin = 60", () => {
    expect(waxTemperature("paraffin")).toBe(60);
  });
});

describe("waxAmountG", () => {
  it("positive grams", () => {
    expect(waxAmountG(2, 2)).toBeGreaterThan(0);
  });
});

describe("dyeBathLiters", () => {
  it("positive liters", () => {
    expect(dyeBathLiters(500, 20)).toBeGreaterThan(0);
  });
});

describe("colorLayers", () => {
  it("capped at 8", () => {
    expect(colorLayers(20)).toBe(8);
  });
  it("minimum 1", () => {
    expect(colorLayers(1)).toBe(1);
  });
});

describe("crackleEffect", () => {
  it("reheated strongest", () => {
    expect(crackleEffect("reheated")).toBeGreaterThan(crackleEffect("fresh"));
  });
});

describe("tjantingFlow", () => {
  it("positive flow", () => {
    expect(tjantingFlow(1, 65)).toBeGreaterThan(0);
  });
});

describe("boilingOutTime", () => {
  it("positive minutes", () => {
    expect(boilingOutTime(300)).toBeGreaterThan(0);
  });
});

describe("fixativeConcentration", () => {
  it("natural highest", () => {
    expect(fixativeConcentration("natural")).toBeGreaterThan(fixativeConcentration("reactive"));
  });
});

describe("dryingHours", () => {
  it("longer in humidity", () => {
    expect(dryingHours(80)).toBeGreaterThan(dryingHours(30));
  });
});

describe("stampRepeats", () => {
  it("positive repeats", () => {
    expect(stampRepeats(100, 10)).toBe(10);
  });
  it("zero stamp = 0", () => {
    expect(stampRepeats(100, 0)).toBe(0);
  });
});

describe("batikMethods", () => {
  it("returns 5 methods", () => {
    expect(batikMethods()).toHaveLength(5);
  });
});

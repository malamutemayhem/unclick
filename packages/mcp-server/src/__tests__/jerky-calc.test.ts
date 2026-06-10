import { describe, it, expect } from "vitest";
import {
  sliceThicknessMm, marinadeTimeHours, dryingTempCelsius, dryingTimeHours,
  yieldPercent, saltGPerKg, shelfLifeWeeks, proteinPercentDry,
  costPerKgRaw, jerkyMeats,
} from "../jerky-calc.js";

describe("sliceThicknessMm", () => {
  it("turkey is thinnest", () => {
    expect(sliceThicknessMm("turkey")).toBeLessThan(sliceThicknessMm("beef"));
  });
});

describe("marinadeTimeHours", () => {
  it("venison marinades longest", () => {
    expect(marinadeTimeHours("venison")).toBeGreaterThan(marinadeTimeHours("turkey"));
  });
});

describe("dryingTempCelsius", () => {
  it("turkey needs highest temp", () => {
    expect(dryingTempCelsius("turkey")).toBeGreaterThan(dryingTempCelsius("venison"));
  });
});

describe("dryingTimeHours", () => {
  it("pork takes longest", () => {
    expect(dryingTimeHours("pork")).toBeGreaterThan(dryingTimeHours("turkey"));
  });
});

describe("yieldPercent", () => {
  it("turkey has best yield", () => {
    expect(yieldPercent("turkey")).toBeGreaterThan(yieldPercent("venison"));
  });
});

describe("saltGPerKg", () => {
  it("pork uses most salt", () => {
    expect(saltGPerKg("pork")).toBeGreaterThan(saltGPerKg("turkey"));
  });
});

describe("shelfLifeWeeks", () => {
  it("beef lasts longest", () => {
    expect(shelfLifeWeeks("beef")).toBeGreaterThanOrEqual(shelfLifeWeeks("bison"));
  });
});

describe("proteinPercentDry", () => {
  it("venison has most protein", () => {
    expect(proteinPercentDry("venison")).toBeGreaterThan(proteinPercentDry("pork"));
  });
});

describe("costPerKgRaw", () => {
  it("bison is most expensive", () => {
    expect(costPerKgRaw("bison")).toBeGreaterThan(costPerKgRaw("pork"));
  });
});

describe("jerkyMeats", () => {
  it("returns 5 meats", () => {
    expect(jerkyMeats()).toHaveLength(5);
  });
});

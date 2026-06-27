import { describe, it, expect } from "vitest";
import {
  thicknessMm, dryingDays, humidityRegulation,
  waterResistance, breathability, polishable,
  bestRoom, repairEase, costPerM2, earthPlasters,
} from "../earth-plaster-calc.js";

describe("thicknessMm", () => {
  it("cob render is thickest", () => {
    expect(thicknessMm("cob_render")).toBeGreaterThan(
      thicknessMm("tadelakt")
    );
  });
});

describe("dryingDays", () => {
  it("cob render dries slowest", () => {
    expect(dryingDays("cob_render")).toBeGreaterThan(
      dryingDays("gypsum_earth")
    );
  });
});

describe("humidityRegulation", () => {
  it("clay regulates humidity best", () => {
    expect(humidityRegulation("clay")).toBeGreaterThan(
      humidityRegulation("tadelakt")
    );
  });
});

describe("waterResistance", () => {
  it("tadelakt is most water resistant", () => {
    expect(waterResistance("tadelakt")).toBeGreaterThan(
      waterResistance("clay")
    );
  });
});

describe("breathability", () => {
  it("clay is most breathable", () => {
    expect(breathability("clay")).toBeGreaterThan(
      breathability("tadelakt")
    );
  });
});

describe("polishable", () => {
  it("tadelakt is polishable", () => {
    expect(polishable("tadelakt")).toBe(true);
  });
  it("clay is not polishable", () => {
    expect(polishable("clay")).toBe(false);
  });
});

describe("bestRoom", () => {
  it("tadelakt best for bathroom", () => {
    expect(bestRoom("tadelakt")).toBe("bathroom");
  });
});

describe("repairEase", () => {
  it("clay is easiest to repair", () => {
    expect(repairEase("clay")).toBeGreaterThan(
      repairEase("tadelakt")
    );
  });
});

describe("costPerM2", () => {
  it("tadelakt costs most", () => {
    expect(costPerM2("tadelakt")).toBeGreaterThan(
      costPerM2("cob_render")
    );
  });
});

describe("earthPlasters", () => {
  it("returns 5 plasters", () => {
    expect(earthPlasters()).toHaveLength(5);
  });
});

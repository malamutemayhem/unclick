import { describe, it, expect } from "vitest";
import {
  durationMinutes, evaporationRatePercentPerHour, dmsReduction,
  hopUtilizationPercent, colorDarkening, proteinCoagulation,
  energyCost, ketleSizeRequired, skillLevel, boilMethods,
} from "../wort-boil-calc.js";

describe("durationMinutes", () => {
  it("extended boil takes longest", () => {
    expect(durationMinutes("extended_boil")).toBeGreaterThan(
      durationMinutes("full_volume")
    );
  });
});

describe("evaporationRatePercentPerHour", () => {
  it("partial boil evaporates fastest", () => {
    expect(evaporationRatePercentPerHour("partial_boil")).toBeGreaterThan(
      evaporationRatePercentPerHour("pressure_boil")
    );
  });
});

describe("dmsReduction", () => {
  it("extended boil reduces DMS most", () => {
    expect(dmsReduction("extended_boil")).toBeGreaterThan(
      dmsReduction("no_boil")
    );
  });
});

describe("hopUtilizationPercent", () => {
  it("pressure boil has highest hop utilization", () => {
    expect(hopUtilizationPercent("pressure_boil")).toBeGreaterThan(
      hopUtilizationPercent("no_boil")
    );
  });
});

describe("colorDarkening", () => {
  it("extended boil darkens most", () => {
    expect(colorDarkening("extended_boil")).toBeGreaterThan(
      colorDarkening("no_boil")
    );
  });
});

describe("proteinCoagulation", () => {
  it("extended boil coagulates most protein", () => {
    expect(proteinCoagulation("extended_boil")).toBeGreaterThan(
      proteinCoagulation("no_boil")
    );
  });
});

describe("energyCost", () => {
  it("extended boil costs most energy", () => {
    expect(energyCost("extended_boil")).toBeGreaterThan(
      energyCost("no_boil")
    );
  });
});

describe("ketleSizeRequired", () => {
  it("pressure boil needs pressure rated kettle", () => {
    expect(ketleSizeRequired("pressure_boil")).toBe("pressure_rated");
  });
});

describe("skillLevel", () => {
  it("pressure boil needs most skill", () => {
    expect(skillLevel("pressure_boil")).toBeGreaterThan(
      skillLevel("no_boil")
    );
  });
});

describe("boilMethods", () => {
  it("returns 5 methods", () => {
    expect(boilMethods()).toHaveLength(5);
  });
});

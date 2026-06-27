import { describe, it, expect } from "vitest";
import {
  windSpeedKmh, durationHours, affectedAreaKm2,
  destructivePower, predictability, producesLightning,
  rotational, peakSeason, warningLeadMinutes, stormTypes,
} from "../storm-type-calc.js";

describe("windSpeedKmh", () => {
  it("tornado has highest wind speed", () => {
    expect(windSpeedKmh("tornado")).toBeGreaterThan(
      windSpeedKmh("hurricane")
    );
  });
});

describe("durationHours", () => {
  it("hurricane lasts longest", () => {
    expect(durationHours("hurricane")).toBeGreaterThan(
      durationHours("tornado")
    );
  });
});

describe("affectedAreaKm2", () => {
  it("hurricane affects largest area", () => {
    expect(affectedAreaKm2("hurricane")).toBeGreaterThan(
      affectedAreaKm2("tornado")
    );
  });
});

describe("destructivePower", () => {
  it("hurricane is most destructive", () => {
    expect(destructivePower("hurricane")).toBeGreaterThan(
      destructivePower("thunderstorm")
    );
  });
});

describe("predictability", () => {
  it("hurricane is most predictable", () => {
    expect(predictability("hurricane")).toBeGreaterThan(
      predictability("tornado")
    );
  });
});

describe("producesLightning", () => {
  it("thunderstorm produces lightning", () => {
    expect(producesLightning("thunderstorm")).toBe(true);
  });
  it("blizzard does not", () => {
    expect(producesLightning("blizzard")).toBe(false);
  });
});

describe("rotational", () => {
  it("hurricane is rotational", () => {
    expect(rotational("hurricane")).toBe(true);
  });
  it("derecho is not rotational", () => {
    expect(rotational("derecho")).toBe(false);
  });
});

describe("peakSeason", () => {
  it("blizzard peaks in winter", () => {
    expect(peakSeason("blizzard")).toBe("winter");
  });
});

describe("warningLeadMinutes", () => {
  it("hurricane has longest warning lead", () => {
    expect(warningLeadMinutes("hurricane")).toBeGreaterThan(
      warningLeadMinutes("tornado")
    );
  });
});

describe("stormTypes", () => {
  it("returns 5 types", () => {
    expect(stormTypes()).toHaveLength(5);
  });
});

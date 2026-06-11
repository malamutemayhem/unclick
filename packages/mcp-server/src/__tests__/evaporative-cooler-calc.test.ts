import { describe, it, expect } from "vitest";
import {
  cooling, humidity, energy, waterUse,
  ecCost, noHumidityAdd, forDryClimate, medium,
  bestUse, evaporativeCoolerTypes,
} from "../evaporative-cooler-calc.js";

describe("cooling", () => {
  it("dew point best cooling", () => {
    expect(cooling("dew_point_regenerative")).toBeGreaterThan(cooling("misting_high_pressure"));
  });
});

describe("humidity", () => {
  it("dew point best humidity control", () => {
    expect(humidity("dew_point_regenerative")).toBeGreaterThan(humidity("direct_media_pad"));
  });
});

describe("energy", () => {
  it("direct pad most energy efficient", () => {
    expect(energy("direct_media_pad")).toBeGreaterThan(energy("dew_point_regenerative"));
  });
});

describe("waterUse", () => {
  it("indirect plate least water use", () => {
    expect(waterUse("indirect_plate_heat")).toBeGreaterThan(waterUse("misting_high_pressure"));
  });
});

describe("ecCost", () => {
  it("dew point most expensive", () => {
    expect(ecCost("dew_point_regenerative")).toBeGreaterThan(ecCost("direct_media_pad"));
  });
});

describe("noHumidityAdd", () => {
  it("indirect no humidity addition", () => {
    expect(noHumidityAdd("indirect_plate_heat")).toBe(true);
  });
  it("direct adds humidity", () => {
    expect(noHumidityAdd("direct_media_pad")).toBe(false);
  });
});

describe("forDryClimate", () => {
  it("all types for dry climate", () => {
    expect(forDryClimate("direct_media_pad")).toBe(true);
  });
  it("misting for dry climate", () => {
    expect(forDryClimate("misting_high_pressure")).toBe(true);
  });
});

describe("medium", () => {
  it("two stage uses indirect then direct cascade", () => {
    expect(medium("two_stage_indirect_direct")).toBe("indirect_then_direct_cascade");
  });
});

describe("bestUse", () => {
  it("indirect for data center pre cool", () => {
    expect(bestUse("indirect_plate_heat")).toBe("data_center_pre_cool_supply");
  });
});

describe("evaporativeCoolerTypes", () => {
  it("returns 5 types", () => {
    expect(evaporativeCoolerTypes()).toHaveLength(5);
  });
});

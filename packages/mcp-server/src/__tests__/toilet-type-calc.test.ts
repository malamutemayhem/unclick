import { describe, it, expect } from "vitest";
import {
  flushPower, waterPerFlush, noiseLevel, cleaningEase,
  toiletCost, waterSaving, heatedSeat, flushMechanism,
  bestInstall, toiletTypes,
} from "../toilet-type-calc.js";

describe("flushPower", () => {
  it("pressure assist strongest flush", () => {
    expect(flushPower("pressure_assist")).toBeGreaterThan(flushPower("gravity_flush"));
  });
});

describe("waterPerFlush", () => {
  it("dual flush least water", () => {
    expect(waterPerFlush("pressure_assist")).toBeGreaterThan(waterPerFlush("dual_flush"));
  });
});

describe("noiseLevel", () => {
  it("pressure assist noisiest", () => {
    expect(noiseLevel("pressure_assist")).toBeGreaterThan(noiseLevel("bidet_smart"));
  });
});

describe("cleaningEase", () => {
  it("wall hung easiest to clean", () => {
    expect(cleaningEase("wall_hung")).toBeGreaterThan(cleaningEase("gravity_flush"));
  });
});

describe("toiletCost", () => {
  it("bidet smart most expensive", () => {
    expect(toiletCost("bidet_smart")).toBeGreaterThan(toiletCost("gravity_flush"));
  });
});

describe("waterSaving", () => {
  it("dual flush is water saving", () => {
    expect(waterSaving("dual_flush")).toBe(true);
  });
  it("gravity flush is not", () => {
    expect(waterSaving("gravity_flush")).toBe(false);
  });
});

describe("heatedSeat", () => {
  it("bidet smart has heated seat", () => {
    expect(heatedSeat("bidet_smart")).toBe(true);
  });
  it("wall hung does not", () => {
    expect(heatedSeat("wall_hung")).toBe(false);
  });
});

describe("flushMechanism", () => {
  it("pressure assist uses compressed air vessel", () => {
    expect(flushMechanism("pressure_assist")).toBe("compressed_air_vessel");
  });
});

describe("bestInstall", () => {
  it("wall hung for modern minimalist bath", () => {
    expect(bestInstall("wall_hung")).toBe("modern_minimalist_bath");
  });
});

describe("toiletTypes", () => {
  it("returns 5 types", () => {
    expect(toiletTypes()).toHaveLength(5);
  });
});

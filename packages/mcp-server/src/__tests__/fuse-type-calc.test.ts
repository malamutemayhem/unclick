import { describe, it, expect } from "vitest";
import {
  burnRate, reliability, safetyRating, precisionTiming,
  weatherResistance, requiresIgniter, consumerLegal,
  primaryUse, composition, fuseTypes,
} from "../fuse-type-calc.js";

describe("burnRate", () => {
  it("quick match fastest burn", () => {
    expect(burnRate("quick_match")).toBeGreaterThan(burnRate("time_delay"));
  });
});

describe("reliability", () => {
  it("electric most reliable", () => {
    expect(reliability("electric")).toBeGreaterThan(reliability("black_match"));
  });
});

describe("safetyRating", () => {
  it("electric safest", () => {
    expect(safetyRating("electric")).toBeGreaterThan(safetyRating("quick_match"));
  });
});

describe("precisionTiming", () => {
  it("electric most precise", () => {
    expect(precisionTiming("electric")).toBeGreaterThan(precisionTiming("quick_match"));
  });
});

describe("weatherResistance", () => {
  it("visco most weather resistant", () => {
    expect(weatherResistance("visco")).toBeGreaterThan(weatherResistance("black_match"));
  });
});

describe("requiresIgniter", () => {
  it("electric requires igniter", () => {
    expect(requiresIgniter("electric")).toBe(true);
  });
  it("visco does not", () => {
    expect(requiresIgniter("visco")).toBe(false);
  });
});

describe("consumerLegal", () => {
  it("visco is consumer legal", () => {
    expect(consumerLegal("visco")).toBe(true);
  });
  it("quick match is not", () => {
    expect(consumerLegal("quick_match")).toBe(false);
  });
});

describe("primaryUse", () => {
  it("electric for synchronized shows", () => {
    expect(primaryUse("electric")).toBe("synchronized_shows");
  });
});

describe("composition", () => {
  it("visco is black powder lacquer wrap", () => {
    expect(composition("visco")).toBe("black_powder_lacquer_wrap");
  });
});

describe("fuseTypes", () => {
  it("returns 5 types", () => {
    expect(fuseTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  recovery, throughput, selectivity, waterUsage,
  scCost, gravity, forFinePart, trough,
  bestUse, spiralConcentratorTypes,
} from "../spiral-concentrator-calc.js";

describe("recovery", () => {
  it("mineral sand highest recovery", () => {
    expect(recovery("mineral_sand")).toBeGreaterThan(recovery("fine_recovery"));
  });
});

describe("throughput", () => {
  it("coal wash highest throughput", () => {
    expect(throughput("coal_wash")).toBeGreaterThan(throughput("fine_recovery"));
  });
});

describe("selectivity", () => {
  it("mineral sand and chrome concentrating best selectivity", () => {
    expect(selectivity("mineral_sand")).toBeGreaterThan(selectivity("coal_wash"));
    expect(selectivity("chrome_concentrating")).toBeGreaterThan(selectivity("coal_wash"));
  });
});

describe("waterUsage", () => {
  it("fine recovery lowest water usage", () => {
    expect(waterUsage("fine_recovery")).toBeGreaterThan(waterUsage("coal_wash"));
  });
});

describe("scCost", () => {
  it("fine recovery most expensive", () => {
    expect(scCost("fine_recovery")).toBeGreaterThan(scCost("coal_wash"));
  });
});

describe("gravity", () => {
  it("all types use gravity", () => {
    expect(gravity("coal_wash")).toBe(true);
    expect(gravity("fine_recovery")).toBe(true);
  });
});

describe("forFinePart", () => {
  it("fine recovery for fine particles", () => {
    expect(forFinePart("fine_recovery")).toBe(true);
  });
  it("coal wash not for fine particles", () => {
    expect(forFinePart("coal_wash")).toBe(false);
  });
});

describe("trough", () => {
  it("chrome concentrating uses steep pitch trough", () => {
    expect(trough("chrome_concentrating")).toBe("chrome_spiral_steep_pitch_high_sg_differential_concentrate");
  });
});

describe("bestUse", () => {
  it("mineral sand for beach sand separation", () => {
    expect(bestUse("mineral_sand")).toBe("beach_sand_ilmenite_rutile_zircon_heavy_mineral_separation");
  });
});

describe("spiralConcentratorTypes", () => {
  it("returns 5 types", () => {
    expect(spiralConcentratorTypes()).toHaveLength(5);
  });
});

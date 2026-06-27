import { describe, it, expect } from "vitest";
import {
  heatTransfer, throughput, mixingQuality, particleRange,
  fbCost, forFine, forCoating, bedConfig,
  bestUse, fluidizedBedTypes,
} from "../fluidized-bed-calc.js";

describe("heatTransfer", () => {
  it("circulating bed best heat transfer", () => {
    expect(heatTransfer("circulating_bed")).toBeGreaterThan(heatTransfer("vibrating_bed"));
  });
});

describe("throughput", () => {
  it("circulating bed highest throughput", () => {
    expect(throughput("circulating_bed")).toBeGreaterThan(throughput("pulsed_bed"));
  });
});

describe("mixingQuality", () => {
  it("pulsed bed best mixing quality", () => {
    expect(mixingQuality("pulsed_bed")).toBeGreaterThan(mixingQuality("bubbling_bed"));
  });
});

describe("particleRange", () => {
  it("pulsed bed best particle range", () => {
    expect(particleRange("pulsed_bed")).toBeGreaterThan(particleRange("circulating_bed"));
  });
});

describe("fbCost", () => {
  it("circulating bed most expensive", () => {
    expect(fbCost("circulating_bed")).toBeGreaterThan(fbCost("bubbling_bed"));
  });
});

describe("forFine", () => {
  it("vibrating bed for fine", () => {
    expect(forFine("vibrating_bed")).toBe(true);
  });
  it("bubbling bed not for fine", () => {
    expect(forFine("bubbling_bed")).toBe(false);
  });
});

describe("forCoating", () => {
  it("spouted bed for coating", () => {
    expect(forCoating("spouted_bed")).toBe(true);
  });
  it("bubbling bed not for coating", () => {
    expect(forCoating("bubbling_bed")).toBe(false);
  });
});

describe("bedConfig", () => {
  it("vibrating uses mechanical vibration reduce gas flow", () => {
    expect(bedConfig("vibrating_bed")).toBe("vibrating_fluidized_bed_mechanical_vibration_reduce_gas_flow");
  });
});

describe("bestUse", () => {
  it("circulating for combustion high throughput fuel flex", () => {
    expect(bestUse("circulating_bed")).toBe("combustion_circulating_fluidized_bed_high_throughput_fuel_flex");
  });
});

describe("fluidizedBedTypes", () => {
  it("returns 5 types", () => {
    expect(fluidizedBedTypes()).toHaveLength(5);
  });
});

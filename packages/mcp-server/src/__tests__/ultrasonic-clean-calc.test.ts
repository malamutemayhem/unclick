import { describe, it, expect } from "vitest";
import {
  cleaning, speed, gentleness, throughput,
  ucCost, automated, forPrecision, frequency,
  bestUse, ultrasonicCleanTypes,
} from "../ultrasonic-clean-calc.js";

describe("cleaning", () => {
  it("multi stage best cleaning", () => {
    expect(cleaning("multi_stage_cascade")).toBeGreaterThan(cleaning("benchtop_tabletop_lab"));
  });
});

describe("speed", () => {
  it("vapor degreaser fastest", () => {
    expect(speed("vapor_degreaser_combo")).toBeGreaterThan(speed("megasonic_high_freq"));
  });
});

describe("gentleness", () => {
  it("megasonic most gentle", () => {
    expect(gentleness("megasonic_high_freq")).toBeGreaterThan(gentleness("industrial_immersion_tank"));
  });
});

describe("throughput", () => {
  it("multi stage highest throughput", () => {
    expect(throughput("multi_stage_cascade")).toBeGreaterThan(throughput("benchtop_tabletop_lab"));
  });
});

describe("ucCost", () => {
  it("megasonic most expensive", () => {
    expect(ucCost("megasonic_high_freq")).toBeGreaterThan(ucCost("benchtop_tabletop_lab"));
  });
});

describe("automated", () => {
  it("multi stage is automated", () => {
    expect(automated("multi_stage_cascade")).toBe(true);
  });
  it("benchtop not automated", () => {
    expect(automated("benchtop_tabletop_lab")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("megasonic for precision", () => {
    expect(forPrecision("megasonic_high_freq")).toBe(true);
  });
  it("industrial not for precision", () => {
    expect(forPrecision("industrial_immersion_tank")).toBe(false);
  });
});

describe("frequency", () => {
  it("megasonic uses 800-1000 khz", () => {
    expect(frequency("megasonic_high_freq")).toBe("800_1000_khz_megasonic");
  });
});

describe("bestUse", () => {
  it("megasonic for semiconductor wafer", () => {
    expect(bestUse("megasonic_high_freq")).toBe("semiconductor_wafer_photomask");
  });
});

describe("ultrasonicCleanTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicCleanTypes()).toHaveLength(5);
  });
});

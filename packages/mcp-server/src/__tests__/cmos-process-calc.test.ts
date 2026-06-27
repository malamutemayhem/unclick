import { describe, it, expect } from "vitest";
import {
  density, performance, powerEff, yield_,
  processCost, backside, forMobile, transistor,
  bestUse, cmosProcesses,
} from "../cmos-process-calc.js";

describe("density", () => {
  it("cfet 2nm highest density", () => {
    expect(density("cfet_2nm")).toBeGreaterThan(density("planar_28nm"));
  });
});

describe("performance", () => {
  it("cfet 2nm best performance", () => {
    expect(performance("cfet_2nm")).toBeGreaterThan(performance("planar_28nm"));
  });
});

describe("powerEff", () => {
  it("cfet 2nm best power efficiency", () => {
    expect(powerEff("cfet_2nm")).toBeGreaterThan(powerEff("planar_28nm"));
  });
});

describe("yield_", () => {
  it("planar 28nm best yield", () => {
    expect(yield_("planar_28nm")).toBeGreaterThan(yield_("cfet_2nm"));
  });
});

describe("processCost", () => {
  it("cfet 2nm most expensive", () => {
    expect(processCost("cfet_2nm")).toBeGreaterThan(processCost("planar_28nm"));
  });
});

describe("backside", () => {
  it("cfet 2nm has backside", () => {
    expect(backside("cfet_2nm")).toBe(true);
  });
  it("finfet 7nm no backside", () => {
    expect(backside("finfet_7nm")).toBe(false);
  });
});

describe("forMobile", () => {
  it("finfet 7nm is for mobile", () => {
    expect(forMobile("finfet_7nm")).toBe(true);
  });
  it("planar 28nm not for mobile", () => {
    expect(forMobile("planar_28nm")).toBe(false);
  });
});

describe("transistor", () => {
  it("gaafet 3nm uses nanosheet gaa", () => {
    expect(transistor("gaafet_3nm")).toBe("nanosheet_gaa");
  });
});

describe("bestUse", () => {
  it("fdsoi 22nm best for automotive radar rf", () => {
    expect(bestUse("fdsoi_22nm")).toBe("automotive_radar_rf");
  });
});

describe("cmosProcesses", () => {
  it("returns 5 types", () => {
    expect(cmosProcesses()).toHaveLength(5);
  });
});

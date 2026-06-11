import { describe, it, expect } from "vitest";
import {
  range, resolution, frameRate, reliability,
  lidCost, solidState, forAutonomous, scanning,
  bestUse, lidarTypes,
} from "../lidar-type-calc.js";

describe("range", () => {
  it("fmcw coherent longest range", () => {
    expect(range("fmcw_coherent")).toBeGreaterThan(range("flash_array"));
  });
});

describe("resolution", () => {
  it("fmcw coherent highest resolution", () => {
    expect(resolution("fmcw_coherent")).toBeGreaterThan(resolution("flash_array"));
  });
});

describe("frameRate", () => {
  it("flash array highest frame rate", () => {
    expect(frameRate("flash_array")).toBeGreaterThan(frameRate("fmcw_coherent"));
  });
});

describe("reliability", () => {
  it("flash array most reliable", () => {
    expect(reliability("flash_array")).toBeGreaterThan(reliability("mechanical_spinning"));
  });
});

describe("lidCost", () => {
  it("fmcw coherent most expensive", () => {
    expect(lidCost("fmcw_coherent")).toBeGreaterThan(lidCost("flash_array"));
  });
});

describe("solidState", () => {
  it("opa solid state is solid state", () => {
    expect(solidState("opa_solid_state")).toBe(true);
  });
  it("mechanical spinning not solid state", () => {
    expect(solidState("mechanical_spinning")).toBe(false);
  });
});

describe("forAutonomous", () => {
  it("mechanical spinning for autonomous", () => {
    expect(forAutonomous("mechanical_spinning")).toBe(true);
  });
  it("flash array not for autonomous", () => {
    expect(forAutonomous("flash_array")).toBe(false);
  });
});

describe("scanning", () => {
  it("fmcw coherent uses freq chirp doppler range", () => {
    expect(scanning("fmcw_coherent")).toBe("freq_chirp_doppler_range");
  });
});

describe("bestUse", () => {
  it("opa solid state best for mass market automotive", () => {
    expect(bestUse("opa_solid_state")).toBe("mass_market_automotive");
  });
});

describe("lidarTypes", () => {
  it("returns 5 types", () => {
    expect(lidarTypes()).toHaveLength(5);
  });
});

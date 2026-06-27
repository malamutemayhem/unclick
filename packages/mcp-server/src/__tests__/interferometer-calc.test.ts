import { describe, it, expect } from "vitest";
import {
  resolution, measurementRange, speed, stability,
  ifCost, nonContact, forSurface, optics,
  bestUse, interferometerTypes,
} from "../interferometer-calc.js";

describe("resolution", () => {
  it("fabry perot and white light highest resolution", () => {
    expect(resolution("fabry_perot")).toBeGreaterThan(resolution("michelson"));
    expect(resolution("white_light")).toBeGreaterThan(resolution("michelson"));
  });
});

describe("measurementRange", () => {
  it("michelson widest measurement range", () => {
    expect(measurementRange("michelson")).toBeGreaterThan(measurementRange("white_light"));
  });
});

describe("speed", () => {
  it("mach zehnder fastest", () => {
    expect(speed("mach_zehnder")).toBeGreaterThan(speed("white_light"));
  });
});

describe("stability", () => {
  it("fabry perot and fizeau most stable", () => {
    expect(stability("fabry_perot")).toBeGreaterThan(stability("mach_zehnder"));
    expect(stability("fizeau")).toBeGreaterThan(stability("mach_zehnder"));
  });
});

describe("ifCost", () => {
  it("white light most expensive", () => {
    expect(ifCost("white_light")).toBeGreaterThan(ifCost("michelson"));
  });
});

describe("nonContact", () => {
  it("all types are non contact", () => {
    expect(nonContact("michelson")).toBe(true);
    expect(nonContact("white_light")).toBe(true);
  });
});

describe("forSurface", () => {
  it("fizeau for surface measurement", () => {
    expect(forSurface("fizeau")).toBe(true);
  });
  it("michelson not for surface measurement", () => {
    expect(forSurface("michelson")).toBe(false);
  });
});

describe("optics", () => {
  it("fabry perot uses parallel plate etalon", () => {
    expect(optics("fabry_perot")).toBe("parallel_plate_etalon_multiple_beam_high_finesse_cavity");
  });
});

describe("bestUse", () => {
  it("white light for surface roughness mems", () => {
    expect(bestUse("white_light")).toBe("surface_roughness_step_height_mems_semiconductor_3d_profile");
  });
});

describe("interferometerTypes", () => {
  it("returns 5 types", () => {
    expect(interferometerTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  weldQuality, throughput, repeatability, gapTolerance,
  owCost, automated, forPharma, welderConfig,
  bestUse, orbitalWelderTypes,
} from "../orbital-welder-calc.js";

describe("weldQuality", () => {
  it("micro orbital best weld quality", () => {
    expect(weldQuality("micro_orbital")).toBeGreaterThan(weldQuality("tube_to_sheet"));
  });
});

describe("throughput", () => {
  it("tube to tube highest throughput", () => {
    expect(throughput("tube_to_tube")).toBeGreaterThan(throughput("multi_pass"));
  });
});

describe("repeatability", () => {
  it("micro orbital best repeatability", () => {
    expect(repeatability("micro_orbital")).toBeGreaterThan(repeatability("tube_to_sheet"));
  });
});

describe("gapTolerance", () => {
  it("micro orbital best gap tolerance", () => {
    expect(gapTolerance("micro_orbital")).toBeGreaterThan(gapTolerance("tube_to_sheet"));
  });
});

describe("owCost", () => {
  it("micro orbital most expensive", () => {
    expect(owCost("micro_orbital")).toBeGreaterThan(owCost("tube_to_tube"));
  });
});

describe("automated", () => {
  it("tube to tube is automated", () => {
    expect(automated("tube_to_tube")).toBe(true);
  });
});

describe("forPharma", () => {
  it("tube to tube for pharma", () => {
    expect(forPharma("tube_to_tube")).toBe(true);
  });
  it("pipe orbital not for pharma", () => {
    expect(forPharma("pipe_orbital")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("multi pass uses thick wall root fill cap heavy pipe", () => {
    expect(welderConfig("multi_pass")).toBe("multi_pass_orbital_welder_thick_wall_root_fill_cap_heavy_pipe");
  });
});

describe("bestUse", () => {
  it("micro orbital for medical sensor tiny tube precise assembly", () => {
    expect(bestUse("micro_orbital")).toBe("medical_sensor_micro_orbital_welder_tiny_tube_precise_assembly");
  });
});

describe("orbitalWelderTypes", () => {
  it("returns 5 types", () => {
    expect(orbitalWelderTypes()).toHaveLength(5);
  });
});

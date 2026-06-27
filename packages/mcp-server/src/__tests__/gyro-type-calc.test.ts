import { describe, it, expect } from "vitest";
import {
  biasStability, scaleFactor, bandwidth, size,
  gyroCost, solidState, forNavigation, principle,
  bestUse, gyroTypes,
} from "../gyro-type-calc.js";

describe("biasStability", () => {
  it("ring laser best bias stability", () => {
    expect(biasStability("ring_laser")).toBeGreaterThan(biasStability("mems_vibrating"));
  });
});

describe("scaleFactor", () => {
  it("ring laser best scale factor", () => {
    expect(scaleFactor("ring_laser")).toBeGreaterThan(scaleFactor("mems_vibrating"));
  });
});

describe("bandwidth", () => {
  it("ring laser widest bandwidth", () => {
    expect(bandwidth("ring_laser")).toBeGreaterThan(bandwidth("dtg_dynamically_tuned"));
  });
});

describe("size", () => {
  it("mems vibrating smallest size", () => {
    expect(size("mems_vibrating")).toBeGreaterThan(size("ring_laser"));
  });
});

describe("gyroCost", () => {
  it("hemispherical hrg most expensive", () => {
    expect(gyroCost("hemispherical_hrg")).toBeGreaterThan(gyroCost("mems_vibrating"));
  });
});

describe("solidState", () => {
  it("mems vibrating is solid state", () => {
    expect(solidState("mems_vibrating")).toBe(true);
  });
  it("dtg dynamically tuned not solid state", () => {
    expect(solidState("dtg_dynamically_tuned")).toBe(false);
  });
});

describe("forNavigation", () => {
  it("ring laser for navigation", () => {
    expect(forNavigation("ring_laser")).toBe(true);
  });
  it("mems vibrating not for navigation", () => {
    expect(forNavigation("mems_vibrating")).toBe(false);
  });
});

describe("principle", () => {
  it("hemispherical hrg uses standing wave precession", () => {
    expect(principle("hemispherical_hrg")).toBe("standing_wave_precession");
  });
});

describe("bestUse", () => {
  it("fiber optic fog best for subsea rov heading", () => {
    expect(bestUse("fiber_optic_fog")).toBe("subsea_rov_heading");
  });
});

describe("gyroTypes", () => {
  it("returns 5 types", () => {
    expect(gyroTypes()).toHaveLength(5);
  });
});

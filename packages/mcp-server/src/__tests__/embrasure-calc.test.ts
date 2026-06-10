import { describe, it, expect } from "vitest";
import {
  openingWidthCm, openingHeightCm, splayAngle, fieldOfFire,
  coverageAngle, lintelLoad, ventilationCfm, lightTransmission,
  shutter, embrasureTypes,
} from "../embrasure-calc.js";

describe("openingWidthCm", () => {
  it("gun port widest", () => {
    expect(openingWidthCm("gun_port")).toBeGreaterThan(openingWidthCm("arrow_loop"));
  });
});

describe("openingHeightCm", () => {
  it("cross slit tallest", () => {
    expect(openingHeightCm("cross_slit")).toBeGreaterThan(openingHeightCm("gun_port"));
  });
});

describe("splayAngle", () => {
  it("positive angle", () => {
    expect(splayAngle(100, 60, 10)).toBeGreaterThan(0);
  });
  it("zero wall = 0", () => {
    expect(splayAngle(0, 60, 10)).toBe(0);
  });
});

describe("fieldOfFire", () => {
  it("double the splay", () => {
    expect(fieldOfFire(15)).toBe(30);
  });
});

describe("coverageAngle", () => {
  it("capped at 360", () => {
    expect(coverageAngle(20, 100)).toBeLessThanOrEqual(360);
  });
});

describe("lintelLoad", () => {
  it("positive load", () => {
    expect(lintelLoad(100, 30, 2.5)).toBeGreaterThan(0);
  });
});

describe("ventilationCfm", () => {
  it("positive cfm", () => {
    expect(ventilationCfm(800, 5)).toBeGreaterThan(0);
  });
});

describe("lightTransmission", () => {
  it("positive percent", () => {
    expect(lightTransmission(800, 20)).toBeGreaterThan(0);
  });
  it("zero room = 0", () => {
    expect(lightTransmission(800, 0)).toBe(0);
  });
});

describe("shutter", () => {
  it("gun port has shutter", () => {
    expect(shutter("gun_port")).toBe(true);
  });
  it("arrow loop has no shutter", () => {
    expect(shutter("arrow_loop")).toBe(false);
  });
});

describe("embrasureTypes", () => {
  it("returns 5 types", () => {
    expect(embrasureTypes()).toHaveLength(5);
  });
});

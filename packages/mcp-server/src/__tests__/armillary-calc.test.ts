import { describe, it, expect } from "vitest";
import {
  ringDiameter, eclipticTilt, tropicAngle, hourAngle,
  declination, ringCount, bandWidth, graduationMarks,
  axleLength, ringTypes,
} from "../armillary-calc.js";

describe("ringDiameter", () => {
  it("positive diameter", () => {
    expect(ringDiameter(20, 0)).toBe(40);
  });
  it("smaller inner rings", () => {
    expect(ringDiameter(20, 3)).toBeLessThan(ringDiameter(20, 0));
  });
});

describe("eclipticTilt", () => {
  it("23.44 degrees", () => {
    expect(eclipticTilt()).toBe(23.44);
  });
});

describe("tropicAngle", () => {
  it("equals ecliptic tilt", () => {
    expect(tropicAngle()).toBe(eclipticTilt());
  });
});

describe("hourAngle", () => {
  it("returns degrees", () => {
    expect(hourAngle(12, 6)).toBe(90);
  });
});

describe("declination", () => {
  it("returns angle in degrees", () => {
    const dec = declination(45, 60, 0);
    expect(dec).toBeGreaterThan(-90);
    expect(dec).toBeLessThan(90);
  });
});

describe("ringCount", () => {
  it("master = 12", () => {
    expect(ringCount("master")).toBe(12);
  });
  it("simple = 3", () => {
    expect(ringCount("simple")).toBe(3);
  });
});

describe("bandWidth", () => {
  it("8% of radius", () => {
    expect(bandWidth(100)).toBe(8);
  });
});

describe("graduationMarks", () => {
  it("360 / interval", () => {
    expect(graduationMarks(200, 10)).toBe(36);
  });
  it("zero interval = 0", () => {
    expect(graduationMarks(200, 0)).toBe(0);
  });
});

describe("axleLength", () => {
  it("2.2x radius", () => {
    expect(axleLength(20)).toBe(44);
  });
});

describe("ringTypes", () => {
  it("returns 5 types", () => {
    expect(ringTypes()).toHaveLength(5);
  });
});

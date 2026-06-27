import { describe, it, expect } from "vitest";
import {
  platformDiameter, rotationRpm, horseCount, crankRodLength,
  gearRatio, centrifugalForce, rideTime, lightCount,
  musicBpm, ridersPerHour, carouselStyles,
} from "../carousel-calc.js";

describe("platformDiameter", () => {
  it("positive diameter", () => {
    expect(platformDiameter(20, 2)).toBeGreaterThan(0);
  });
});

describe("rotationRpm", () => {
  it("positive rpm", () => {
    expect(rotationRpm(2, 10)).toBeGreaterThan(0);
  });
  it("zero diameter = 0", () => {
    expect(rotationRpm(2, 0)).toBe(0);
  });
});

describe("horseCount", () => {
  it("rows x horses", () => {
    expect(horseCount(3, 12)).toBe(36);
  });
});

describe("crankRodLength", () => {
  it("half of travel", () => {
    expect(crankRodLength(60)).toBe(30);
  });
});

describe("gearRatio", () => {
  it("motor / platform", () => {
    expect(gearRatio(1500, 5)).toBe(300);
  });
  it("zero platform = 0", () => {
    expect(gearRatio(1500, 0)).toBe(0);
  });
});

describe("centrifugalForce", () => {
  it("positive newtons", () => {
    expect(centrifugalForce(50, 5, 10)).toBeGreaterThan(0);
  });
});

describe("rideTime", () => {
  it("positive seconds", () => {
    expect(rideTime(20, 5)).toBeGreaterThan(0);
  });
  it("zero rpm = 0", () => {
    expect(rideTime(20, 0)).toBe(0);
  });
});

describe("lightCount", () => {
  it("positive count", () => {
    expect(lightCount(10, 20)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(lightCount(10, 0)).toBe(0);
  });
});

describe("musicBpm", () => {
  it("fairground fastest", () => {
    expect(musicBpm("fairground")).toBeGreaterThan(musicBpm("kiddie"));
  });
});

describe("ridersPerHour", () => {
  it("positive riders", () => {
    expect(ridersPerHour(30, 3)).toBeGreaterThan(0);
  });
  it("zero ride time = 0", () => {
    expect(ridersPerHour(30, 0)).toBe(0);
  });
});

describe("carouselStyles", () => {
  it("returns 5 styles", () => {
    expect(carouselStyles()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  sensorAreaMm2, dynamicRangeStops, lowLightScore,
  depthOfFieldControl, portability, cropFactor,
  mirrorless, bestGenre, priceRange, cameraSensors,
} from "../camera-sensor-calc.js";

describe("sensorAreaMm2", () => {
  it("medium format is largest", () => {
    expect(sensorAreaMm2("medium_format")).toBeGreaterThan(
      sensorAreaMm2("full_frame")
    );
  });
});

describe("dynamicRangeStops", () => {
  it("medium format has most dynamic range", () => {
    expect(dynamicRangeStops("medium_format")).toBeGreaterThan(
      dynamicRangeStops("aps_c")
    );
  });
});

describe("lowLightScore", () => {
  it("medium format best in low light", () => {
    expect(lowLightScore("medium_format")).toBeGreaterThan(
      lowLightScore("one_inch")
    );
  });
});

describe("depthOfFieldControl", () => {
  it("medium format has best DoF control", () => {
    expect(depthOfFieldControl("medium_format")).toBeGreaterThan(
      depthOfFieldControl("micro_four_thirds")
    );
  });
});

describe("portability", () => {
  it("one inch is most portable", () => {
    expect(portability("one_inch")).toBeGreaterThan(
      portability("medium_format")
    );
  });
});

describe("cropFactor", () => {
  it("full frame has 1x crop", () => {
    expect(cropFactor("full_frame")).toBe(1.0);
  });
  it("aps_c has 1.5x crop", () => {
    expect(cropFactor("aps_c")).toBe(1.5);
  });
});

describe("mirrorless", () => {
  it("all sensors available in mirrorless", () => {
    expect(mirrorless("full_frame")).toBe(true);
    expect(mirrorless("medium_format")).toBe(true);
  });
});

describe("bestGenre", () => {
  it("medium format for landscape", () => {
    expect(bestGenre("medium_format")).toBe("landscape");
  });
});

describe("priceRange", () => {
  it("medium format is very high", () => {
    expect(priceRange("medium_format")).toBe("very_high");
  });
});

describe("cameraSensors", () => {
  it("returns 5 types", () => {
    expect(cameraSensors()).toHaveLength(5);
  });
});

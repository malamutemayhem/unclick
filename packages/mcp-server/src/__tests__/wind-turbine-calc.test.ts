import { describe, it, expect } from "vitest";
import {
  ratedPowerKw, hubHeightMeters, cutInSpeedMs,
  noiseLevel, birdSafetyRating, requiresYawSystem,
  urbanSuitable, bestApplication, capacityFactor, windTurbineTypes,
} from "../wind-turbine-calc.js";

describe("ratedPowerKw", () => {
  it("offshore has highest power", () => {
    expect(ratedPowerKw("offshore")).toBeGreaterThan(
      ratedPowerKw("micro")
    );
  });
});

describe("hubHeightMeters", () => {
  it("offshore is tallest", () => {
    expect(hubHeightMeters("offshore")).toBeGreaterThan(
      hubHeightMeters("bladeless")
    );
  });
});

describe("cutInSpeedMs", () => {
  it("bladeless has lowest cut in speed", () => {
    expect(cutInSpeedMs("bladeless")).toBeLessThan(
      cutInSpeedMs("horizontal_axis")
    );
  });
});

describe("noiseLevel", () => {
  it("bladeless is quietest", () => {
    expect(noiseLevel("bladeless")).toBeLessThan(
      noiseLevel("offshore")
    );
  });
});

describe("birdSafetyRating", () => {
  it("bladeless is safest for birds", () => {
    expect(birdSafetyRating("bladeless")).toBeGreaterThan(
      birdSafetyRating("horizontal_axis")
    );
  });
});

describe("requiresYawSystem", () => {
  it("horizontal axis requires yaw", () => {
    expect(requiresYawSystem("horizontal_axis")).toBe(true);
  });
  it("vertical axis does not", () => {
    expect(requiresYawSystem("vertical_axis")).toBe(false);
  });
});

describe("urbanSuitable", () => {
  it("bladeless is urban suitable", () => {
    expect(urbanSuitable("bladeless")).toBe(true);
  });
  it("horizontal axis is not", () => {
    expect(urbanSuitable("horizontal_axis")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("offshore for ocean", () => {
    expect(bestApplication("offshore")).toBe("ocean");
  });
});

describe("capacityFactor", () => {
  it("offshore has highest capacity factor", () => {
    expect(capacityFactor("offshore")).toBeGreaterThan(
      capacityFactor("bladeless")
    );
  });
});

describe("windTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(windTurbineTypes()).toHaveLength(5);
  });
});

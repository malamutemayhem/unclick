import { describe, it, expect } from "vitest";
import {
  maxSpeedFraction, flashSyncSpeed, rollingShutterDistortion,
  shutterNoise, durabilityActuations, silent,
  hasPhysicalBlades, bestUseCase, bandingRisk, shutterTypes,
} from "../shutter-type-calc.js";

describe("maxSpeedFraction", () => {
  it("electronic is fastest", () => {
    expect(maxSpeedFraction("electronic")).toBeGreaterThan(
      maxSpeedFraction("mechanical")
    );
  });
});

describe("flashSyncSpeed", () => {
  it("global has highest sync speed", () => {
    expect(flashSyncSpeed("global")).toBeGreaterThan(
      flashSyncSpeed("mechanical")
    );
  });
});

describe("rollingShutterDistortion", () => {
  it("rolling has most distortion", () => {
    expect(rollingShutterDistortion("rolling")).toBeGreaterThan(
      rollingShutterDistortion("mechanical")
    );
  });
});

describe("shutterNoise", () => {
  it("mechanical is noisiest", () => {
    expect(shutterNoise("mechanical")).toBeGreaterThan(
      shutterNoise("electronic")
    );
  });
});

describe("durabilityActuations", () => {
  it("electronic lasts longest", () => {
    expect(durabilityActuations("electronic")).toBeGreaterThan(
      durabilityActuations("mechanical")
    );
  });
});

describe("silent", () => {
  it("electronic is silent", () => {
    expect(silent("electronic")).toBe(true);
  });
  it("mechanical is not", () => {
    expect(silent("mechanical")).toBe(false);
  });
});

describe("hasPhysicalBlades", () => {
  it("mechanical has blades", () => {
    expect(hasPhysicalBlades("mechanical")).toBe(true);
  });
  it("electronic does not", () => {
    expect(hasPhysicalBlades("electronic")).toBe(false);
  });
});

describe("bestUseCase", () => {
  it("electronic for wildlife stealth", () => {
    expect(bestUseCase("electronic")).toBe("wildlife_stealth");
  });
});

describe("bandingRisk", () => {
  it("electronic has highest banding risk", () => {
    expect(bandingRisk("electronic")).toBeGreaterThan(
      bandingRisk("mechanical")
    );
  });
});

describe("shutterTypes", () => {
  it("returns 5 types", () => {
    expect(shutterTypes()).toHaveLength(5);
  });
});

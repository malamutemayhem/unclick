import { describe, it, expect } from "vitest";
import {
  maxSpeedRpm, wheelHeadDiameterCm, maxClayWeightKg, speedControl,
  portability, noiseLevel, electricityRequired, beginnerFriendly,
  costEstimate, wheelTypes,
} from "../pottery-wheel-calc.js";

describe("maxSpeedRpm", () => {
  it("electric is fastest", () => {
    expect(maxSpeedRpm("electric")).toBeGreaterThan(maxSpeedRpm("kick"));
  });
});

describe("wheelHeadDiameterCm", () => {
  it("momentum has largest head", () => {
    expect(wheelHeadDiameterCm("momentum")).toBeGreaterThan(
      wheelHeadDiameterCm("stick")
    );
  });
});

describe("maxClayWeightKg", () => {
  it("electric handles most clay", () => {
    expect(maxClayWeightKg("electric")).toBeGreaterThan(
      maxClayWeightKg("stick")
    );
  });
});

describe("speedControl", () => {
  it("electric has best control", () => {
    expect(speedControl("electric")).toBeGreaterThan(
      speedControl("stick")
    );
  });
});

describe("portability", () => {
  it("stick is most portable", () => {
    expect(portability("stick")).toBeGreaterThan(portability("kick"));
  });
});

describe("noiseLevel", () => {
  it("electric is noisiest", () => {
    expect(noiseLevel("electric")).toBeGreaterThan(noiseLevel("kick"));
  });
});

describe("electricityRequired", () => {
  it("electric needs power", () => {
    expect(electricityRequired("electric")).toBe(true);
  });
  it("kick does not need power", () => {
    expect(electricityRequired("kick")).toBe(false);
  });
});

describe("beginnerFriendly", () => {
  it("electric is beginner friendly", () => {
    expect(beginnerFriendly("electric")).toBe(true);
  });
  it("stick is not beginner friendly", () => {
    expect(beginnerFriendly("stick")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("electric is most expensive", () => {
    expect(costEstimate("electric")).toBeGreaterThan(
      costEstimate("stick")
    );
  });
});

describe("wheelTypes", () => {
  it("returns 5 types", () => {
    expect(wheelTypes()).toHaveLength(5);
  });
});

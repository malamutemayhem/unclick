import { describe, it, expect } from "vitest";
import {
  peakCurrentKa, durationMs, altitudeKm,
  frequencyPercent, dangerToHumans, visibleFromGround,
  upperAtmosphere, associatedWith, scientificInterest, lightningTypes,
} from "../lightning-type-calc.js";

describe("peakCurrentKa", () => {
  it("cloud to ground has highest peak current", () => {
    expect(peakCurrentKa("cloud_to_ground")).toBeGreaterThan(
      peakCurrentKa("ball_lightning")
    );
  });
});

describe("durationMs", () => {
  it("ball lightning lasts longest", () => {
    expect(durationMs("ball_lightning")).toBeGreaterThan(
      durationMs("sprite")
    );
  });
});

describe("altitudeKm", () => {
  it("sprite occurs at highest altitude", () => {
    expect(altitudeKm("sprite")).toBeGreaterThan(
      altitudeKm("cloud_to_ground")
    );
  });
});

describe("frequencyPercent", () => {
  it("intracloud is most frequent", () => {
    expect(frequencyPercent("intracloud")).toBeGreaterThan(
      frequencyPercent("cloud_to_ground")
    );
  });
});

describe("dangerToHumans", () => {
  it("cloud to ground is most dangerous", () => {
    expect(dangerToHumans("cloud_to_ground")).toBeGreaterThan(
      dangerToHumans("sprite")
    );
  });
});

describe("visibleFromGround", () => {
  it("cloud to ground is visible", () => {
    expect(visibleFromGround("cloud_to_ground")).toBe(true);
  });
  it("sprite is not", () => {
    expect(visibleFromGround("sprite")).toBe(false);
  });
});

describe("upperAtmosphere", () => {
  it("sprite is upper atmosphere", () => {
    expect(upperAtmosphere("sprite")).toBe(true);
  });
  it("cloud to ground is not", () => {
    expect(upperAtmosphere("cloud_to_ground")).toBe(false);
  });
});

describe("associatedWith", () => {
  it("cloud to ground associated with thunderstorm", () => {
    expect(associatedWith("cloud_to_ground")).toBe("thunderstorm");
  });
});

describe("scientificInterest", () => {
  it("ball lightning has highest scientific interest", () => {
    expect(scientificInterest("ball_lightning")).toBeGreaterThan(
      scientificInterest("cloud_to_cloud")
    );
  });
});

describe("lightningTypes", () => {
  it("returns 5 types", () => {
    expect(lightningTypes()).toHaveLength(5);
  });
});

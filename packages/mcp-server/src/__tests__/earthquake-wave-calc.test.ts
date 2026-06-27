import { describe, it, expect } from "vitest";
import {
  velocityKmPerS, damageCapacity, penetrationDepth,
  detectionRange, frequency, travelsFluid,
  surfaceWave, motionType, earlyWarningUse, seismicWaves,
} from "../earthquake-wave-calc.js";

describe("velocityKmPerS", () => {
  it("p wave is fastest", () => {
    expect(velocityKmPerS("p_wave")).toBeGreaterThan(
      velocityKmPerS("s_wave")
    );
  });
});

describe("damageCapacity", () => {
  it("rayleigh wave causes most damage", () => {
    expect(damageCapacity("rayleigh_wave")).toBeGreaterThan(
      damageCapacity("p_wave")
    );
  });
});

describe("penetrationDepth", () => {
  it("p wave penetrates deepest", () => {
    expect(penetrationDepth("p_wave")).toBeGreaterThan(
      penetrationDepth("stoneley_wave")
    );
  });
});

describe("detectionRange", () => {
  it("p wave detected farthest", () => {
    expect(detectionRange("p_wave")).toBeGreaterThan(
      detectionRange("stoneley_wave")
    );
  });
});

describe("frequency", () => {
  it("p wave has highest frequency", () => {
    expect(frequency("p_wave")).toBeGreaterThan(
      frequency("rayleigh_wave")
    );
  });
});

describe("travelsFluid", () => {
  it("p wave travels through fluid", () => {
    expect(travelsFluid("p_wave")).toBe(true);
  });
  it("s wave does not", () => {
    expect(travelsFluid("s_wave")).toBe(false);
  });
});

describe("surfaceWave", () => {
  it("love wave is a surface wave", () => {
    expect(surfaceWave("love_wave")).toBe(true);
  });
  it("p wave is not", () => {
    expect(surfaceWave("p_wave")).toBe(false);
  });
});

describe("motionType", () => {
  it("p wave is compression", () => {
    expect(motionType("p_wave")).toBe("compression");
  });
});

describe("earlyWarningUse", () => {
  it("p wave is best for early warning", () => {
    expect(earlyWarningUse("p_wave")).toBeGreaterThan(
      earlyWarningUse("rayleigh_wave")
    );
  });
});

describe("seismicWaves", () => {
  it("returns 5 types", () => {
    expect(seismicWaves()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  rotationPeriodMs, magneticFieldTesla, ageMillionYears,
  luminosityRating, timingPrecision, emitsXRays,
  hasCompanion, primaryEmission, knownCount, pulsarTypes,
} from "../pulsar-type-calc.js";

describe("rotationPeriodMs", () => {
  it("millisecond pulsar rotates fastest", () => {
    expect(rotationPeriodMs("millisecond")).toBeLessThan(
      rotationPeriodMs("radio")
    );
  });
});

describe("magneticFieldTesla", () => {
  it("magnetar has strongest field", () => {
    expect(magneticFieldTesla("magnetar")).toBeGreaterThan(
      magneticFieldTesla("radio")
    );
  });
});

describe("ageMillionYears", () => {
  it("millisecond pulsars are oldest", () => {
    expect(ageMillionYears("millisecond")).toBeGreaterThan(
      ageMillionYears("magnetar")
    );
  });
});

describe("luminosityRating", () => {
  it("magnetar is most luminous", () => {
    expect(luminosityRating("magnetar")).toBeGreaterThan(
      luminosityRating("millisecond")
    );
  });
});

describe("timingPrecision", () => {
  it("millisecond has best timing", () => {
    expect(timingPrecision("millisecond")).toBeGreaterThan(
      timingPrecision("magnetar")
    );
  });
});

describe("emitsXRays", () => {
  it("x ray pulsar emits x rays", () => {
    expect(emitsXRays("x_ray")).toBe(true);
  });
  it("radio pulsar does not", () => {
    expect(emitsXRays("radio")).toBe(false);
  });
});

describe("hasCompanion", () => {
  it("binary has companion", () => {
    expect(hasCompanion("binary")).toBe(true);
  });
  it("magnetar does not", () => {
    expect(hasCompanion("magnetar")).toBe(false);
  });
});

describe("primaryEmission", () => {
  it("magnetar emits gamma rays", () => {
    expect(primaryEmission("magnetar")).toBe("gamma_rays");
  });
});

describe("knownCount", () => {
  it("radio pulsars are most numerous", () => {
    expect(knownCount("radio")).toBeGreaterThan(knownCount("magnetar"));
  });
});

describe("pulsarTypes", () => {
  it("returns 5 types", () => {
    expect(pulsarTypes()).toHaveLength(5);
  });
});

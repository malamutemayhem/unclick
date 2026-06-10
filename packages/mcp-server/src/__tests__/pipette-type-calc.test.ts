import { describe, it, expect } from "vitest";
import {
  volumeAccuracy, throughput, ergonomicComfort, costPerUnit,
  viscousSampleHandling, disposableTip, motorized, volumeRange,
  bestApplication, pipetteTypes,
} from "../pipette-type-calc.js";

describe("volumeAccuracy", () => {
  it("positive displacement most accurate", () => {
    expect(volumeAccuracy("positive_displacement")).toBeGreaterThan(volumeAccuracy("serological"));
  });
});

describe("throughput", () => {
  it("multichannel highest throughput", () => {
    expect(throughput("multichannel")).toBeGreaterThan(throughput("air_displacement"));
  });
});

describe("ergonomicComfort", () => {
  it("electronic most ergonomic", () => {
    expect(ergonomicComfort("electronic")).toBeGreaterThan(ergonomicComfort("multichannel"));
  });
});

describe("costPerUnit", () => {
  it("electronic most expensive", () => {
    expect(costPerUnit("electronic")).toBeGreaterThan(costPerUnit("serological"));
  });
});

describe("viscousSampleHandling", () => {
  it("positive displacement best for viscous", () => {
    expect(viscousSampleHandling("positive_displacement")).toBeGreaterThan(viscousSampleHandling("multichannel"));
  });
});

describe("disposableTip", () => {
  it("air displacement uses disposable tip", () => {
    expect(disposableTip("air_displacement")).toBe(true);
  });
  it("serological does not", () => {
    expect(disposableTip("serological")).toBe(false);
  });
});

describe("motorized", () => {
  it("electronic is motorized", () => {
    expect(motorized("electronic")).toBe(true);
  });
  it("air displacement is not", () => {
    expect(motorized("air_displacement")).toBe(false);
  });
});

describe("volumeRange", () => {
  it("serological is 1ml to 50ml", () => {
    expect(volumeRange("serological")).toBe("1ml_to_50ml");
  });
});

describe("bestApplication", () => {
  it("multichannel for plate based assay", () => {
    expect(bestApplication("multichannel")).toBe("plate_based_assay_96well");
  });
});

describe("pipetteTypes", () => {
  it("returns 5 types", () => {
    expect(pipetteTypes()).toHaveLength(5);
  });
});

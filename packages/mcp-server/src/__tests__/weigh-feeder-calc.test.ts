import { describe, it, expect } from "vitest";
import {
  accuracy, feedRate, rangeability, reliability,
  wfCost, continuous, forMicroDosing, metering,
  bestUse, weighFeederTypes,
} from "../weigh-feeder-calc.js";

describe("accuracy", () => {
  it("loss in weight most accurate", () => {
    expect(accuracy("loss_in_weight_batch")).toBeGreaterThan(accuracy("screw_weigh_volumetric"));
  });
});

describe("feedRate", () => {
  it("belt weigh highest feed rate", () => {
    expect(feedRate("belt_weigh_continuous")).toBeGreaterThan(feedRate("loss_in_weight_batch"));
  });
});

describe("rangeability", () => {
  it("loss in weight best rangeability", () => {
    expect(rangeability("loss_in_weight_batch")).toBeGreaterThan(rangeability("screw_weigh_volumetric"));
  });
});

describe("reliability", () => {
  it("loss in weight high reliability", () => {
    expect(reliability("loss_in_weight_batch")).toBeGreaterThanOrEqual(reliability("screw_weigh_volumetric"));
  });
});

describe("wfCost", () => {
  it("loss in weight most expensive", () => {
    expect(wfCost("loss_in_weight_batch")).toBeGreaterThan(wfCost("screw_weigh_volumetric"));
  });
});

describe("continuous", () => {
  it("belt weigh is continuous", () => {
    expect(continuous("belt_weigh_continuous")).toBe(true);
  });
  it("loss in weight not continuous", () => {
    expect(continuous("loss_in_weight_batch")).toBe(false);
  });
});

describe("forMicroDosing", () => {
  it("loss in weight for micro dosing", () => {
    expect(forMicroDosing("loss_in_weight_batch")).toBe(true);
  });
  it("belt weigh not for micro dosing", () => {
    expect(forMicroDosing("belt_weigh_continuous")).toBe(false);
  });
});

describe("metering", () => {
  it("vibrating weigh uses electromagnetic drive", () => {
    expect(metering("vibrating_weigh_tray")).toBe("vibrating_tray_electromagnetic_drive_loadcell");
  });
});

describe("bestUse", () => {
  it("gravimetric belt for glass batch", () => {
    expect(bestUse("gravimetric_belt_prec")).toBe("glass_batch_chemical_reactor_precise_continuous");
  });
});

describe("weighFeederTypes", () => {
  it("returns 5 types", () => {
    expect(weighFeederTypes()).toHaveLength(5);
  });
});

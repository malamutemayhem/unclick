import { describe, it, expect } from "vitest";
import {
  driverEngagement, shiftSpeed, fuelEconomy,
  trafficComfort, maintenanceCost, requiresClutchPedal,
  hasFixedGears, bestVehicle, gearCount, transmissionTypes,
} from "../transmission-type-calc.js";

describe("driverEngagement", () => {
  it("manual is most engaging", () => {
    expect(driverEngagement("manual")).toBeGreaterThan(
      driverEngagement("automatic")
    );
  });
});

describe("shiftSpeed", () => {
  it("dct shifts fastest", () => {
    expect(shiftSpeed("dct")).toBeGreaterThan(
      shiftSpeed("manual")
    );
  });
});

describe("fuelEconomy", () => {
  it("cvt is most economical", () => {
    expect(fuelEconomy("cvt")).toBeGreaterThan(
      fuelEconomy("automatic")
    );
  });
});

describe("trafficComfort", () => {
  it("automatic is most comfortable in traffic", () => {
    expect(trafficComfort("automatic")).toBeGreaterThan(
      trafficComfort("manual")
    );
  });
});

describe("maintenanceCost", () => {
  it("sequential costs most to maintain", () => {
    expect(maintenanceCost("sequential")).toBeGreaterThan(
      maintenanceCost("manual")
    );
  });
});

describe("requiresClutchPedal", () => {
  it("manual requires clutch", () => {
    expect(requiresClutchPedal("manual")).toBe(true);
  });
  it("automatic does not", () => {
    expect(requiresClutchPedal("automatic")).toBe(false);
  });
});

describe("hasFixedGears", () => {
  it("manual has fixed gears", () => {
    expect(hasFixedGears("manual")).toBe(true);
  });
  it("cvt does not", () => {
    expect(hasFixedGears("cvt")).toBe(false);
  });
});

describe("bestVehicle", () => {
  it("cvt for hybrid", () => {
    expect(bestVehicle("cvt")).toBe("hybrid");
  });
});

describe("gearCount", () => {
  it("automatic has most gears", () => {
    expect(gearCount("automatic")).toBeGreaterThan(
      gearCount("manual")
    );
  });
  it("cvt has zero fixed gears", () => {
    expect(gearCount("cvt")).toBe(0);
  });
});

describe("transmissionTypes", () => {
  it("returns 5 types", () => {
    expect(transmissionTypes()).toHaveLength(5);
  });
});

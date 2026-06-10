import { describe, it, expect } from "vitest";
import {
  outputMetersPerHour, maxDiameterMm, twistConsistency,
  spaceLengthMeters, operatorsRequired, portableSetup,
  strengthRating, historicalPeriod, costPerMeter, ropeLayMethods,
} from "../rope-walk-calc.js";

describe("outputMetersPerHour", () => {
  it("continuous lay has highest output", () => {
    expect(outputMetersPerHour("continuous_lay")).toBeGreaterThan(
      outputMetersPerHour("hand_twist")
    );
  });
});

describe("maxDiameterMm", () => {
  it("rope walk makes thickest rope", () => {
    expect(maxDiameterMm("rope_walk")).toBeGreaterThan(
      maxDiameterMm("hand_twist")
    );
  });
});

describe("twistConsistency", () => {
  it("continuous lay is most consistent", () => {
    expect(twistConsistency("continuous_lay")).toBeGreaterThan(
      twistConsistency("hand_twist")
    );
  });
});

describe("spaceLengthMeters", () => {
  it("rope walk needs most space", () => {
    expect(spaceLengthMeters("rope_walk")).toBeGreaterThan(
      spaceLengthMeters("hand_twist")
    );
  });
});

describe("operatorsRequired", () => {
  it("rope walk needs most operators", () => {
    expect(operatorsRequired("rope_walk")).toBeGreaterThan(
      operatorsRequired("hand_twist")
    );
  });
});

describe("portableSetup", () => {
  it("hand twist is portable", () => {
    expect(portableSetup("hand_twist")).toBe(true);
  });
  it("rope walk is not", () => {
    expect(portableSetup("rope_walk")).toBe(false);
  });
});

describe("strengthRating", () => {
  it("rope walk makes strongest rope", () => {
    expect(strengthRating("rope_walk")).toBeGreaterThan(
      strengthRating("hand_twist")
    );
  });
});

describe("historicalPeriod", () => {
  it("rope walk is medieval", () => {
    expect(historicalPeriod("rope_walk")).toBe("medieval");
  });
});

describe("costPerMeter", () => {
  it("hand twist costs most", () => {
    expect(costPerMeter("hand_twist")).toBeGreaterThan(
      costPerMeter("continuous_lay")
    );
  });
});

describe("ropeLayMethods", () => {
  it("returns 5 methods", () => {
    expect(ropeLayMethods()).toHaveLength(5);
  });
});

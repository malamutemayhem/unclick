import { describe, it, expect } from "vitest";
import {
  spoolTimeMs, peakBoostPsi, complexity,
  costScore, lowEndTorque, requiresExhaustGas,
  hasTurboLag, commonVehicle, boostControl, turboTypes,
} from "../turbo-type-calc.js";

describe("spoolTimeMs", () => {
  it("electric fastest spool", () => {
    expect(spoolTimeMs("electric")).toBeLessThan(
      spoolTimeMs("single_scroll")
    );
  });
});

describe("peakBoostPsi", () => {
  it("sequential highest boost", () => {
    expect(peakBoostPsi("sequential")).toBeGreaterThan(
      peakBoostPsi("electric")
    );
  });
});

describe("complexity", () => {
  it("sequential most complex", () => {
    expect(complexity("sequential")).toBeGreaterThan(
      complexity("single_scroll")
    );
  });
});

describe("costScore", () => {
  it("sequential most expensive", () => {
    expect(costScore("sequential")).toBeGreaterThan(
      costScore("single_scroll")
    );
  });
});

describe("lowEndTorque", () => {
  it("electric best low end torque", () => {
    expect(lowEndTorque("electric")).toBeGreaterThan(
      lowEndTorque("single_scroll")
    );
  });
});

describe("requiresExhaustGas", () => {
  it("single_scroll requires exhaust gas", () => {
    expect(requiresExhaustGas("single_scroll")).toBe(true);
  });
  it("electric does not", () => {
    expect(requiresExhaustGas("electric")).toBe(false);
  });
});

describe("hasTurboLag", () => {
  it("single_scroll has turbo lag", () => {
    expect(hasTurboLag("single_scroll")).toBe(true);
  });
  it("electric does not", () => {
    expect(hasTurboLag("electric")).toBe(false);
  });
});

describe("commonVehicle", () => {
  it("variable_geometry for diesel truck", () => {
    expect(commonVehicle("variable_geometry")).toBe("diesel_truck");
  });
});

describe("boostControl", () => {
  it("electric uses motor speed", () => {
    expect(boostControl("electric")).toBe("motor_speed");
  });
});

describe("turboTypes", () => {
  it("returns 5 types", () => {
    expect(turboTypes()).toHaveLength(5);
  });
});

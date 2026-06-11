import { describe, it, expect } from "vitest";
import {
  sensitivity, selectivity, responseTime, lifetime,
  sensorCost, portable, forSafety, detection,
  bestUse, gasSensors,
} from "../gas-sensor-calc.js";

describe("sensitivity", () => {
  it("pid photoion most sensitive", () => {
    expect(sensitivity("pid_photoion")).toBeGreaterThan(sensitivity("catalytic_bead"));
  });
});

describe("selectivity", () => {
  it("ndir infrared best selectivity", () => {
    expect(selectivity("ndir_infrared")).toBeGreaterThan(selectivity("mox_metal_oxide"));
  });
});

describe("responseTime", () => {
  it("pid photoion fastest response", () => {
    expect(responseTime("pid_photoion")).toBeGreaterThan(responseTime("mox_metal_oxide"));
  });
});

describe("lifetime", () => {
  it("ndir infrared longest lifetime", () => {
    expect(lifetime("ndir_infrared")).toBeGreaterThan(lifetime("catalytic_bead"));
  });
});

describe("sensorCost", () => {
  it("pid photoion most expensive", () => {
    expect(sensorCost("pid_photoion")).toBeGreaterThan(sensorCost("mox_metal_oxide"));
  });
});

describe("portable", () => {
  it("mox metal oxide is portable", () => {
    expect(portable("mox_metal_oxide")).toBe(true);
  });
  it("catalytic bead not portable", () => {
    expect(portable("catalytic_bead")).toBe(false);
  });
});

describe("forSafety", () => {
  it("electrochemical cell is for safety", () => {
    expect(forSafety("electrochemical_cell")).toBe(true);
  });
  it("mox metal oxide not for safety", () => {
    expect(forSafety("mox_metal_oxide")).toBe(false);
  });
});

describe("detection", () => {
  it("ndir infrared uses ir absorption dual beam", () => {
    expect(detection("ndir_infrared")).toBe("ir_absorption_dual_beam");
  });
});

describe("bestUse", () => {
  it("pid photoion best for voc leak detection", () => {
    expect(bestUse("pid_photoion")).toBe("voc_leak_detection");
  });
});

describe("gasSensors", () => {
  it("returns 5 types", () => {
    expect(gasSensors()).toHaveLength(5);
  });
});

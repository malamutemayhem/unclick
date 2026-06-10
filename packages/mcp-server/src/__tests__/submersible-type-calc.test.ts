import { describe, it, expect } from "vitest";
import {
  depthRating, missionDuration, maneuverability, payloadCapacity,
  operatingCost, requiresTether, requiresCrew, propulsionSystem,
  bestMission, submersibleTypes,
} from "../submersible-type-calc.js";

describe("depthRating", () => {
  it("manned sub deepest rated", () => {
    expect(depthRating("manned_sub")).toBeGreaterThan(depthRating("glider"));
  });
});

describe("missionDuration", () => {
  it("glider longest mission", () => {
    expect(missionDuration("glider")).toBeGreaterThan(missionDuration("manned_sub"));
  });
});

describe("maneuverability", () => {
  it("hybrid rov most maneuverable", () => {
    expect(maneuverability("hybrid_rov")).toBeGreaterThan(maneuverability("glider"));
  });
});

describe("payloadCapacity", () => {
  it("manned sub largest payload", () => {
    expect(payloadCapacity("manned_sub")).toBeGreaterThan(payloadCapacity("glider"));
  });
});

describe("operatingCost", () => {
  it("manned sub highest operating cost", () => {
    expect(operatingCost("manned_sub")).toBeGreaterThan(operatingCost("glider"));
  });
});

describe("requiresTether", () => {
  it("rov requires tether", () => {
    expect(requiresTether("rov")).toBe(true);
  });
  it("auv does not", () => {
    expect(requiresTether("auv")).toBe(false);
  });
});

describe("requiresCrew", () => {
  it("manned sub requires crew", () => {
    expect(requiresCrew("manned_sub")).toBe(true);
  });
  it("rov does not", () => {
    expect(requiresCrew("rov")).toBe(false);
  });
});

describe("propulsionSystem", () => {
  it("glider uses buoyancy engine wing", () => {
    expect(propulsionSystem("glider")).toBe("buoyancy_engine_wing");
  });
});

describe("bestMission", () => {
  it("auv for survey mapping", () => {
    expect(bestMission("auv")).toBe("survey_mapping_autonomous");
  });
});

describe("submersibleTypes", () => {
  it("returns 5 types", () => {
    expect(submersibleTypes()).toHaveLength(5);
  });
});

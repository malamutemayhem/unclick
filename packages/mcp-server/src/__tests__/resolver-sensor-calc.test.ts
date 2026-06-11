import { describe, it, expect } from "vitest";
import {
  resolution, accuracy, robustness, speed,
  sensCost, absolute, forServo, principle,
  bestUse, resolverSensors,
} from "../resolver-sensor-calc.js";

describe("resolution", () => {
  it("optical incremental highest resolution", () => {
    expect(resolution("optical_incremental")).toBeGreaterThan(resolution("hall_effect_3phase"));
  });
});

describe("accuracy", () => {
  it("optical absolute highest accuracy", () => {
    expect(accuracy("optical_absolute")).toBeGreaterThan(accuracy("hall_effect_3phase"));
  });
});

describe("robustness", () => {
  it("brushless resolver most robust", () => {
    expect(robustness("brushless_resolver")).toBeGreaterThan(robustness("optical_absolute"));
  });
});

describe("speed", () => {
  it("optical incremental fastest", () => {
    expect(speed("optical_incremental")).toBeGreaterThan(speed("hall_effect_3phase"));
  });
});

describe("sensCost", () => {
  it("optical absolute most expensive", () => {
    expect(sensCost("optical_absolute")).toBeGreaterThan(sensCost("hall_effect_3phase"));
  });
});

describe("absolute", () => {
  it("brushless resolver is absolute", () => {
    expect(absolute("brushless_resolver")).toBe(true);
  });
  it("optical incremental not absolute", () => {
    expect(absolute("optical_incremental")).toBe(false);
  });
});

describe("forServo", () => {
  it("optical absolute for servo", () => {
    expect(forServo("optical_absolute")).toBe(true);
  });
  it("hall effect 3phase not for servo", () => {
    expect(forServo("hall_effect_3phase")).toBe(false);
  });
});

describe("principle", () => {
  it("inductive encoder uses eddy current pattern coil", () => {
    expect(principle("inductive_encoder")).toBe("eddy_current_pattern_coil");
  });
});

describe("bestUse", () => {
  it("optical absolute best for robot joint no homing", () => {
    expect(bestUse("optical_absolute")).toBe("robot_joint_no_homing");
  });
});

describe("resolverSensors", () => {
  it("returns 5 types", () => {
    expect(resolverSensors()).toHaveLength(5);
  });
});

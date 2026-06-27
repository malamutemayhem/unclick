import { describe, it, expect } from "vitest";
import {
  torqueOutput, throughput, positionAccuracy, failSafeRating,
  daCost, springReturn, forSmoke, actuatorConfig,
  bestUse, damperActuatorTypes,
} from "../damper-actuator-calc.js";

describe("torqueOutput", () => {
  it("pneumatic diaphragm best torque output", () => {
    expect(torqueOutput("pneumatic_diaphragm")).toBeGreaterThan(torqueOutput("electric_spring_return"));
  });
});

describe("throughput", () => {
  it("bus networked highest throughput", () => {
    expect(throughput("bus_networked")).toBeGreaterThan(throughput("electric_spring_return"));
  });
});

describe("positionAccuracy", () => {
  it("modulating analog best position accuracy", () => {
    expect(positionAccuracy("modulating_analog")).toBeGreaterThan(positionAccuracy("pneumatic_diaphragm"));
  });
});

describe("failSafeRating", () => {
  it("electric spring return best fail safe rating", () => {
    expect(failSafeRating("electric_spring_return")).toBeGreaterThan(failSafeRating("electric_non_spring"));
  });
});

describe("daCost", () => {
  it("bus networked most expensive", () => {
    expect(daCost("bus_networked")).toBeGreaterThan(daCost("electric_non_spring"));
  });
});

describe("springReturn", () => {
  it("electric spring return has spring return", () => {
    expect(springReturn("electric_spring_return")).toBe(true);
  });
  it("electric non spring no spring return", () => {
    expect(springReturn("electric_non_spring")).toBe(false);
  });
});

describe("forSmoke", () => {
  it("electric spring return for smoke", () => {
    expect(forSmoke("electric_spring_return")).toBe(true);
  });
  it("electric non spring not for smoke", () => {
    expect(forSmoke("electric_non_spring")).toBe(false);
  });
});

describe("actuatorConfig", () => {
  it("bus networked uses bacnet lonworks diagnostic position feedback", () => {
    expect(actuatorConfig("bus_networked")).toBe("bus_networked_actuator_bacnet_lonworks_diagnostic_position_feedback");
  });
});

describe("bestUse", () => {
  it("pneumatic diaphragm for large ahu high torque fast stroke", () => {
    expect(bestUse("pneumatic_diaphragm")).toBe("large_ahu_pneumatic_diaphragm_actuator_high_torque_fast_stroke");
  });
});

describe("damperActuatorTypes", () => {
  it("returns 5 types", () => {
    expect(damperActuatorTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  force, speed, precision, compactness,
  haCost, failSafe, forHighForce, design,
  bestUse, hydraulicActuatorTypes,
} from "../hydraulic-actuator-calc.js";

describe("force", () => {
  it("linear cylinder highest force", () => {
    expect(force("linear_cylinder_double")).toBeGreaterThan(force("rotary_vane_quarter"));
  });
});

describe("speed", () => {
  it("linear cylinder fast speed", () => {
    expect(speed("linear_cylinder_double")).toBeGreaterThan(speed("telescoping_multi_stage"));
  });
});

describe("precision", () => {
  it("rack pinion most precise", () => {
    expect(precision("rack_pinion_compact")).toBeGreaterThan(precision("telescoping_multi_stage"));
  });
});

describe("compactness", () => {
  it("rack pinion most compact", () => {
    expect(compactness("rack_pinion_compact")).toBeGreaterThan(compactness("linear_cylinder_double"));
  });
});

describe("haCost", () => {
  it("telescoping most expensive", () => {
    expect(haCost("telescoping_multi_stage")).toBeGreaterThan(haCost("linear_cylinder_double"));
  });
});

describe("failSafe", () => {
  it("scotch yoke is fail safe", () => {
    expect(failSafe("scotch_yoke_high_torque")).toBe(true);
  });
  it("linear cylinder not fail safe", () => {
    expect(failSafe("linear_cylinder_double")).toBe(false);
  });
});

describe("forHighForce", () => {
  it("linear cylinder for high force", () => {
    expect(forHighForce("linear_cylinder_double")).toBe(true);
  });
  it("rotary vane not for high force", () => {
    expect(forHighForce("rotary_vane_quarter")).toBe(false);
  });
});

describe("design", () => {
  it("rack pinion uses dual piston spring", () => {
    expect(design("rack_pinion_compact")).toBe("rack_pinion_dual_piston_spring_return");
  });
});

describe("bestUse", () => {
  it("scotch yoke for large valve pipeline", () => {
    expect(bestUse("scotch_yoke_high_torque")).toBe("large_valve_pipeline_high_breakaway_torque");
  });
});

describe("hydraulicActuatorTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicActuatorTypes()).toHaveLength(5);
  });
});

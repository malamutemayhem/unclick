import { describe, it, expect } from "vitest";
import {
  force, speed, precision, reliability,
  paCost, springReturn, forValve, medium,
  bestUse, pneumaticActuatorTypes,
} from "../pneumatic-actuator-calc.js";

describe("force", () => {
  it("rotary rack pinion highest force", () => {
    expect(force("rotary_rack_pinion")).toBeGreaterThan(force("gripper_parallel_angular"));
  });
});

describe("speed", () => {
  it("gripper fastest", () => {
    expect(speed("gripper_parallel_angular")).toBeGreaterThan(speed("single_acting_spring_return"));
  });
});

describe("precision", () => {
  it("gripper most precise", () => {
    expect(precision("gripper_parallel_angular")).toBeGreaterThan(precision("single_acting_spring_return"));
  });
});

describe("reliability", () => {
  it("spring return most reliable", () => {
    expect(reliability("single_acting_spring_return")).toBeGreaterThan(reliability("rodless_band_magnetic"));
  });
});

describe("paCost", () => {
  it("rodless magnetic most expensive", () => {
    expect(paCost("rodless_band_magnetic")).toBeGreaterThan(paCost("single_acting_spring_return"));
  });
});

describe("springReturn", () => {
  it("single acting has spring return", () => {
    expect(springReturn("single_acting_spring_return")).toBe(true);
  });
  it("double acting no spring return", () => {
    expect(springReturn("double_acting_cylinder")).toBe(false);
  });
});

describe("forValve", () => {
  it("rotary rack pinion for valve", () => {
    expect(forValve("rotary_rack_pinion")).toBe(true);
  });
  it("gripper not for valve", () => {
    expect(forValve("gripper_parallel_angular")).toBe(false);
  });
});

describe("medium", () => {
  it("rodless uses magnetic coupling", () => {
    expect(medium("rodless_band_magnetic")).toBe("magnetic_coupling_band_seal_air");
  });
});

describe("bestUse", () => {
  it("double acting for clamp press push", () => {
    expect(bestUse("double_acting_cylinder")).toBe("clamp_press_push_linear_motion");
  });
});

describe("pneumaticActuatorTypes", () => {
  it("returns 5 types", () => {
    expect(pneumaticActuatorTypes()).toHaveLength(5);
  });
});

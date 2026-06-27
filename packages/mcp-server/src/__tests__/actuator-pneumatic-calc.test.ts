import { describe, it, expect } from "vitest";
import {
  thrust, speed, precision, failSafe,
  apCost, springReturn, forLinearValve, mechanism,
  bestUse, actuatorPneumaticTypes,
} from "../actuator-pneumatic-calc.js";

describe("thrust", () => {
  it("scotch yoke highest thrust", () => {
    expect(thrust("scotch_yoke_quarter")).toBeGreaterThan(thrust("diaphragm_spring_return"));
  });
});

describe("speed", () => {
  it("piston double acting fastest", () => {
    expect(speed("piston_double_acting")).toBeGreaterThan(speed("diaphragm_spring_return"));
  });
});

describe("precision", () => {
  it("electro pneumatic positioner most precise", () => {
    expect(precision("electro_pneumatic_pos")).toBeGreaterThan(precision("scotch_yoke_quarter"));
  });
});

describe("failSafe", () => {
  it("diaphragm spring return best fail safe", () => {
    expect(failSafe("diaphragm_spring_return")).toBeGreaterThan(failSafe("piston_double_acting"));
  });
});

describe("apCost", () => {
  it("scotch yoke most expensive", () => {
    expect(apCost("scotch_yoke_quarter")).toBeGreaterThan(apCost("rack_pinion_rotary"));
  });
});

describe("springReturn", () => {
  it("diaphragm has spring return", () => {
    expect(springReturn("diaphragm_spring_return")).toBe(true);
  });
  it("piston double acting no spring return", () => {
    expect(springReturn("piston_double_acting")).toBe(false);
  });
});

describe("forLinearValve", () => {
  it("diaphragm for linear valve", () => {
    expect(forLinearValve("diaphragm_spring_return")).toBe(true);
  });
  it("scotch yoke not for linear valve", () => {
    expect(forLinearValve("scotch_yoke_quarter")).toBe(false);
  });
});

describe("mechanism", () => {
  it("rack pinion uses gear compact quarter turn", () => {
    expect(mechanism("rack_pinion_rotary")).toBe("rack_and_pinion_gear_compact_quarter_turn_spring");
  });
});

describe("bestUse", () => {
  it("electro pneumatic for precision control loop", () => {
    expect(bestUse("electro_pneumatic_pos")).toBe("precision_control_loop_split_range_cascade_control");
  });
});

describe("actuatorPneumaticTypes", () => {
  it("returns 5 types", () => {
    expect(actuatorPneumaticTypes()).toHaveLength(5);
  });
});

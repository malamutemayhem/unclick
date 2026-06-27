import { describe, it, expect } from "vitest";
import {
  accuracy, range, response, reliability,
  fsCost, noMovingParts, forLiquid, sensing,
  bestUse, flowSwitchTypes,
} from "../flow-switch-calc.js";

describe("accuracy", () => {
  it("coriolis most accurate", () => {
    expect(accuracy("coriolis_mass_flow")).toBeGreaterThan(accuracy("paddle_vane_inline"));
  });
});

describe("range", () => {
  it("ultrasonic widest range", () => {
    expect(range("ultrasonic_clamp_on")).toBeGreaterThan(range("magnetic_piston_indicator"));
  });
});

describe("response", () => {
  it("coriolis fastest response", () => {
    expect(response("coriolis_mass_flow")).toBeGreaterThan(response("paddle_vane_inline"));
  });
});

describe("reliability", () => {
  it("thermal dispersion most reliable", () => {
    expect(reliability("thermal_dispersion_probe")).toBeGreaterThan(reliability("paddle_vane_inline"));
  });
});

describe("fsCost", () => {
  it("coriolis most expensive", () => {
    expect(fsCost("coriolis_mass_flow")).toBeGreaterThan(fsCost("paddle_vane_inline"));
  });
});

describe("noMovingParts", () => {
  it("thermal dispersion has no moving parts", () => {
    expect(noMovingParts("thermal_dispersion_probe")).toBe(true);
  });
  it("paddle has moving parts", () => {
    expect(noMovingParts("paddle_vane_inline")).toBe(false);
  });
});

describe("forLiquid", () => {
  it("paddle for liquid", () => {
    expect(forLiquid("paddle_vane_inline")).toBe(true);
  });
});

describe("sensing", () => {
  it("coriolis uses vibrating tube", () => {
    expect(sensing("coriolis_mass_flow")).toBe("vibrating_tube_coriolis_force_phase");
  });
});

describe("bestUse", () => {
  it("ultrasonic for retrofit large pipe", () => {
    expect(bestUse("ultrasonic_clamp_on")).toBe("retrofit_large_pipe_no_cut_non_invade");
  });
});

describe("flowSwitchTypes", () => {
  it("returns 5 types", () => {
    expect(flowSwitchTypes()).toHaveLength(5);
  });
});

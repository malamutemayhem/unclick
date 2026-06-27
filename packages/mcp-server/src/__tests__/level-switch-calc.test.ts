import { describe, it, expect } from "vitest";
import {
  reliability, suitability, noMovingParts, tempRange,
  lsCost_, pointLevel, forSolids, sensing,
  bestUse, levelSwitchTypes,
} from "../level-switch-calc.js";

describe("reliability", () => {
  it("vibrating fork most reliable", () => {
    expect(reliability("vibrating_fork_tuning")).toBeGreaterThan(reliability("float_mechanical_reed"));
  });
});

describe("suitability", () => {
  it("vibrating fork most suitable", () => {
    expect(suitability("vibrating_fork_tuning")).toBeGreaterThan(suitability("paddle_rotary_bin"));
  });
});

describe("noMovingParts", () => {
  it("capacitance rf has no moving parts", () => {
    expect(noMovingParts("capacitance_rf_admit")).toBeGreaterThan(noMovingParts("float_mechanical_reed"));
  });
});

describe("tempRange", () => {
  it("capacitance rf widest temp range", () => {
    expect(tempRange("capacitance_rf_admit")).toBeGreaterThan(tempRange("float_mechanical_reed"));
  });
});

describe("lsCost_", () => {
  it("thermal dispersion most expensive", () => {
    expect(lsCost_("thermal_dispersion_flow")).toBeGreaterThan(lsCost_("float_mechanical_reed"));
  });
});

describe("pointLevel", () => {
  it("all level switches are point level", () => {
    expect(pointLevel("float_mechanical_reed")).toBe(true);
    expect(pointLevel("vibrating_fork_tuning")).toBe(true);
  });
});

describe("forSolids", () => {
  it("paddle rotary for solids", () => {
    expect(forSolids("paddle_rotary_bin")).toBe(true);
  });
  it("float mechanical not for solids", () => {
    expect(forSolids("float_mechanical_reed")).toBe(false);
  });
});

describe("sensing", () => {
  it("thermal dispersion uses heated element", () => {
    expect(sensing("thermal_dispersion_flow")).toBe("heated_element_thermal_loss_liquid_air");
  });
});

describe("bestUse", () => {
  it("vibrating fork for universal alarm", () => {
    expect(bestUse("vibrating_fork_tuning")).toBe("liquid_solid_universal_high_low_alarm");
  });
});

describe("levelSwitchTypes", () => {
  it("returns 5 types", () => {
    expect(levelSwitchTypes()).toHaveLength(5);
  });
});

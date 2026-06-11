import { describe, it, expect } from "vitest";
import {
  efficiency, startTorque, speedControl, reliability,
  imCost, variableSpeed, forHeavyStart, rotor,
  bestUse, inductionMotorTypes,
} from "../induction-motor-calc.js";

describe("efficiency", () => {
  it("premium most efficient", () => {
    expect(efficiency("squirrel_cage_premium")).toBeGreaterThan(efficiency("squirrel_cage_standard"));
  });
});

describe("startTorque", () => {
  it("wound rotor highest start torque", () => {
    expect(startTorque("wound_rotor_slip")).toBeGreaterThan(startTorque("squirrel_cage_standard"));
  });
});

describe("speedControl", () => {
  it("wound rotor best speed control", () => {
    expect(speedControl("wound_rotor_slip")).toBeGreaterThan(speedControl("squirrel_cage_standard"));
  });
});

describe("reliability", () => {
  it("explosion proof most reliable", () => {
    expect(reliability("explosion_proof_hazard")).toBeGreaterThan(reliability("wound_rotor_slip"));
  });
});

describe("imCost", () => {
  it("explosion proof most expensive", () => {
    expect(imCost("explosion_proof_hazard")).toBeGreaterThan(imCost("squirrel_cage_standard"));
  });
});

describe("variableSpeed", () => {
  it("wound rotor is variable speed", () => {
    expect(variableSpeed("wound_rotor_slip")).toBe(true);
  });
  it("squirrel cage standard not variable speed", () => {
    expect(variableSpeed("squirrel_cage_standard")).toBe(false);
  });
});

describe("forHeavyStart", () => {
  it("double cage for heavy start", () => {
    expect(forHeavyStart("double_cage_high_start")).toBe(true);
  });
  it("squirrel cage standard not for heavy start", () => {
    expect(forHeavyStart("squirrel_cage_standard")).toBe(false);
  });
});

describe("rotor", () => {
  it("premium uses copper rotor bars", () => {
    expect(rotor("squirrel_cage_premium")).toBe("copper_rotor_bars_premium_efficiency_ie3_ie4");
  });
});

describe("bestUse", () => {
  it("explosion proof for hazardous area", () => {
    expect(bestUse("explosion_proof_hazard")).toBe("oil_gas_chemical_hazardous_area_zone_1_2");
  });
});

describe("inductionMotorTypes", () => {
  it("returns 5 types", () => {
    expect(inductionMotorTypes()).toHaveLength(5);
  });
});

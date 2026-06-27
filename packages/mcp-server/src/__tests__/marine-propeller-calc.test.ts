import { describe, it, expect } from "vitest";
import {
  thrust, efficiency, maneuverability, cavitationResistance,
  mpCost, variablePitch, forHighSpeed, propulsion,
  bestUse, marinePropellerTypes,
} from "../marine-propeller-calc.js";

describe("thrust", () => {
  it("controllable pitch highest thrust", () => {
    expect(thrust("controllable_pitch")).toBeGreaterThan(thrust("voith_schneider"));
  });
});

describe("efficiency", () => {
  it("fixed pitch most efficient", () => {
    expect(efficiency("fixed_pitch")).toBeGreaterThan(efficiency("voith_schneider"));
  });
});

describe("maneuverability", () => {
  it("azimuth thruster and voith schneider best maneuverability", () => {
    expect(maneuverability("azimuth_thruster")).toBeGreaterThan(maneuverability("fixed_pitch"));
    expect(maneuverability("voith_schneider")).toBeGreaterThan(maneuverability("fixed_pitch"));
  });
});

describe("cavitationResistance", () => {
  it("waterjet best cavitation resistance", () => {
    expect(cavitationResistance("waterjet")).toBeGreaterThan(cavitationResistance("voith_schneider"));
  });
});

describe("mpCost", () => {
  it("voith schneider most expensive", () => {
    expect(mpCost("voith_schneider")).toBeGreaterThan(mpCost("fixed_pitch"));
  });
});

describe("variablePitch", () => {
  it("controllable pitch has variable pitch", () => {
    expect(variablePitch("controllable_pitch")).toBe(true);
  });
  it("fixed pitch not variable", () => {
    expect(variablePitch("fixed_pitch")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("waterjet for high speed", () => {
    expect(forHighSpeed("waterjet")).toBe(true);
  });
  it("fixed pitch not for high speed", () => {
    expect(forHighSpeed("fixed_pitch")).toBe(false);
  });
});

describe("propulsion", () => {
  it("azimuth thruster uses podded drive", () => {
    expect(propulsion("azimuth_thruster")).toBe("podded_drive_360_degree_rotation_electric_motor_in_pod");
  });
});

describe("bestUse", () => {
  it("waterjet for fast ferry", () => {
    expect(bestUse("waterjet")).toBe("fast_ferry_patrol_boat_shallow_draft_high_speed_craft");
  });
});

describe("marinePropellerTypes", () => {
  it("returns 5 types", () => {
    expect(marinePropellerTypes()).toHaveLength(5);
  });
});

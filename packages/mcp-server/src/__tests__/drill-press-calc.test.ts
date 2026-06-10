import { describe, it, expect } from "vitest";
import {
  drillPower, precision, swingCapacity, portability,
  pressCost, variableSpeed, computerControlled, driveType,
  bestProject, drillPresses,
} from "../drill-press-calc.js";

describe("drillPower", () => {
  it("cnc mill drill most powerful", () => {
    expect(drillPower("cnc_mill_drill")).toBeGreaterThan(drillPower("benchtop_compact"));
  });
});

describe("precision", () => {
  it("cnc mill drill most precise", () => {
    expect(precision("cnc_mill_drill")).toBeGreaterThan(precision("magnetic_portable"));
  });
});

describe("swingCapacity", () => {
  it("radial arm largest swing capacity", () => {
    expect(swingCapacity("radial_arm")).toBeGreaterThan(swingCapacity("benchtop_compact"));
  });
});

describe("portability", () => {
  it("magnetic portable most portable", () => {
    expect(portability("magnetic_portable")).toBeGreaterThan(portability("floor_standing"));
  });
});

describe("pressCost", () => {
  it("cnc mill drill most expensive", () => {
    expect(pressCost("cnc_mill_drill")).toBeGreaterThan(pressCost("benchtop_compact"));
  });
});

describe("variableSpeed", () => {
  it("benchtop compact has variable speed", () => {
    expect(variableSpeed("benchtop_compact")).toBe(true);
  });
  it("floor standing also has variable speed", () => {
    expect(variableSpeed("floor_standing")).toBe(true);
  });
});

describe("computerControlled", () => {
  it("cnc mill drill is computer controlled", () => {
    expect(computerControlled("cnc_mill_drill")).toBe(true);
  });
  it("floor standing is not", () => {
    expect(computerControlled("floor_standing")).toBe(false);
  });
});

describe("driveType", () => {
  it("cnc mill drill uses servo motor spindle", () => {
    expect(driveType("cnc_mill_drill")).toBe("servo_motor_spindle");
  });
});

describe("bestProject", () => {
  it("magnetic portable for steel construction site", () => {
    expect(bestProject("magnetic_portable")).toBe("steel_construction_site");
  });
});

describe("drillPresses", () => {
  it("returns 5 types", () => {
    expect(drillPresses()).toHaveLength(5);
  });
});

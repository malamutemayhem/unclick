import { describe, it, expect } from "vitest";
import {
  authority, precision, redundancy, pilotWorkload,
  apCost, digital, forAirliner, control,
  bestUse, autopilotTypes,
} from "../autopilot-type-calc.js";

describe("authority", () => {
  it("fly by wire highest authority", () => {
    expect(authority("fly_by_wire_fbw")).toBeGreaterThan(authority("single_axis_wing_leveler"));
  });
});

describe("precision", () => {
  it("fly by wire most precise", () => {
    expect(precision("fly_by_wire_fbw")).toBeGreaterThan(precision("two_axis_pitch_roll"));
  });
});

describe("redundancy", () => {
  it("fly by wire most redundant", () => {
    expect(redundancy("fly_by_wire_fbw")).toBeGreaterThan(redundancy("single_axis_wing_leveler"));
  });
});

describe("pilotWorkload", () => {
  it("fly by wire reduces workload most", () => {
    expect(pilotWorkload("fly_by_wire_fbw")).toBeGreaterThan(pilotWorkload("single_axis_wing_leveler"));
  });
});

describe("apCost", () => {
  it("fly by wire most expensive", () => {
    expect(apCost("fly_by_wire_fbw")).toBeGreaterThan(apCost("single_axis_wing_leveler"));
  });
});

describe("digital", () => {
  it("two axis is digital", () => {
    expect(digital("two_axis_pitch_roll")).toBe(true);
  });
  it("single axis not digital", () => {
    expect(digital("single_axis_wing_leveler")).toBe(false);
  });
});

describe("forAirliner", () => {
  it("flight director for airliner", () => {
    expect(forAirliner("flight_director_coupled")).toBe(true);
  });
  it("two axis not for airliner", () => {
    expect(forAirliner("two_axis_pitch_roll")).toBe(false);
  });
});

describe("control", () => {
  it("flight director uses fms lnav vnav", () => {
    expect(control("flight_director_coupled")).toBe("fms_lnav_vnav_autoland");
  });
});

describe("bestUse", () => {
  it("single axis best for light aircraft cruise", () => {
    expect(bestUse("single_axis_wing_leveler")).toBe("light_aircraft_cruise_wing_level");
  });
});

describe("autopilotTypes", () => {
  it("returns 5 types", () => {
    expect(autopilotTypes()).toHaveLength(5);
  });
});

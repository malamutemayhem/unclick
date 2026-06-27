import { describe, it, expect } from "vitest";
import {
  torqueCapacity, efficiency, softStart, overloadProtect,
  fcCost, variableSpeed, forConveyor, medium,
  bestUse, fluidCouplingTypes,
} from "../fluid-coupling-calc.js";

describe("torqueCapacity", () => {
  it("torque converter highest capacity", () => {
    expect(torqueCapacity("torque_converter_stall")).toBeGreaterThan(torqueCapacity("magnetic_eddy_current"));
  });
});

describe("efficiency", () => {
  it("constant fill most efficient", () => {
    expect(efficiency("constant_fill_basic")).toBeGreaterThan(efficiency("hydrodynamic_brake_retarder"));
  });
});

describe("softStart", () => {
  it("variable fill best soft start", () => {
    expect(softStart("variable_fill_scoop")).toBeGreaterThan(softStart("hydrodynamic_brake_retarder"));
  });
});

describe("overloadProtect", () => {
  it("hydrodynamic brake best overload protect", () => {
    expect(overloadProtect("hydrodynamic_brake_retarder")).toBeGreaterThan(overloadProtect("constant_fill_basic"));
  });
});

describe("fcCost", () => {
  it("magnetic eddy current most expensive", () => {
    expect(fcCost("magnetic_eddy_current")).toBeGreaterThan(fcCost("constant_fill_basic"));
  });
});

describe("variableSpeed", () => {
  it("variable fill is variable speed", () => {
    expect(variableSpeed("variable_fill_scoop")).toBe(true);
  });
  it("constant fill not variable speed", () => {
    expect(variableSpeed("constant_fill_basic")).toBe(false);
  });
});

describe("forConveyor", () => {
  it("constant fill for conveyor", () => {
    expect(forConveyor("constant_fill_basic")).toBe(true);
  });
  it("torque converter not for conveyor", () => {
    expect(forConveyor("torque_converter_stall")).toBe(false);
  });
});

describe("medium", () => {
  it("eddy current uses air gap magnetic field", () => {
    expect(medium("magnetic_eddy_current")).toBe("eddy_current_air_gap_magnetic_field");
  });
});

describe("bestUse", () => {
  it("variable fill for crusher mill", () => {
    expect(bestUse("variable_fill_scoop")).toBe("crusher_mill_variable_speed_start");
  });
});

describe("fluidCouplingTypes", () => {
  it("returns 5 types", () => {
    expect(fluidCouplingTypes()).toHaveLength(5);
  });
});

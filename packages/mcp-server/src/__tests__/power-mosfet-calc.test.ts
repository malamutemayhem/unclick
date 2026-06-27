import { describe, it, expect } from "vitest";
import {
  rdsOn, currentHandle, switchSpeed, thermalPerform,
  mosfetCost, logicLevel, forHighSide, packageStyle,
  bestUse, powerMosfets,
} from "../power-mosfet-calc.js";

describe("rdsOn", () => {
  it("n channel logic level lowest rds on", () => {
    expect(rdsOn("n_channel_logic_level")).toBeGreaterThan(rdsOn("n_channel_high_voltage"));
  });
});

describe("currentHandle", () => {
  it("n channel high voltage highest current handle", () => {
    expect(currentHandle("n_channel_high_voltage")).toBeGreaterThan(currentHandle("smd_sot23_small"));
  });
});

describe("switchSpeed", () => {
  it("smd sot23 fastest switching", () => {
    expect(switchSpeed("smd_sot23_small")).toBeGreaterThan(switchSpeed("n_channel_high_voltage"));
  });
});

describe("thermalPerform", () => {
  it("to220 heat sink best thermal", () => {
    expect(thermalPerform("to220_heat_sink")).toBeGreaterThan(thermalPerform("smd_sot23_small"));
  });
});

describe("mosfetCost", () => {
  it("n channel high voltage most expensive", () => {
    expect(mosfetCost("n_channel_high_voltage")).toBeGreaterThan(mosfetCost("smd_sot23_small"));
  });
});

describe("logicLevel", () => {
  it("n channel logic level is logic level", () => {
    expect(logicLevel("n_channel_logic_level")).toBe(true);
  });
  it("p channel high side not logic level", () => {
    expect(logicLevel("p_channel_high_side")).toBe(false);
  });
});

describe("forHighSide", () => {
  it("p channel high side is for high side", () => {
    expect(forHighSide("p_channel_high_side")).toBe(true);
  });
  it("n channel logic level not for high side", () => {
    expect(forHighSide("n_channel_logic_level")).toBe(false);
  });
});

describe("packageStyle", () => {
  it("smd sot23 uses sot23 surface mount", () => {
    expect(packageStyle("smd_sot23_small")).toBe("sot23_surface_mount");
  });
});

describe("bestUse", () => {
  it("n channel logic level best for mcu direct switch", () => {
    expect(bestUse("n_channel_logic_level")).toBe("mcu_direct_switch");
  });
});

describe("powerMosfets", () => {
  it("returns 5 types", () => {
    expect(powerMosfets()).toHaveLength(5);
  });
});

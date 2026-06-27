import { describe, it, expect } from "vitest";
import {
  speedRange, torqueControl, efficiency, brushLife,
  dmCost, selfExcited, forTraction, winding,
  bestUse, dcMotorBrushTypes,
} from "../dc-motor-brush-calc.js";

describe("speedRange", () => {
  it("series wound widest speed range", () => {
    expect(speedRange("series_wound_traction")).toBeGreaterThan(speedRange("permanent_magnet_small"));
  });
});

describe("torqueControl", () => {
  it("shunt wound best torque control", () => {
    expect(torqueControl("shunt_wound_constant")).toBeGreaterThan(torqueControl("universal_motor_ac_dc"));
  });
});

describe("efficiency", () => {
  it("shunt wound most efficient", () => {
    expect(efficiency("shunt_wound_constant")).toBeGreaterThan(efficiency("universal_motor_ac_dc"));
  });
});

describe("brushLife", () => {
  it("shunt wound longest brush life", () => {
    expect(brushLife("shunt_wound_constant")).toBeGreaterThan(brushLife("universal_motor_ac_dc"));
  });
});

describe("dmCost", () => {
  it("compound wound most expensive", () => {
    expect(dmCost("compound_wound_mixed")).toBeGreaterThan(dmCost("permanent_magnet_small"));
  });
});

describe("selfExcited", () => {
  it("series wound is self excited", () => {
    expect(selfExcited("series_wound_traction")).toBe(true);
  });
  it("permanent magnet not self excited", () => {
    expect(selfExcited("permanent_magnet_small")).toBe(false);
  });
});

describe("forTraction", () => {
  it("series wound for traction", () => {
    expect(forTraction("series_wound_traction")).toBe(true);
  });
  it("shunt wound not for traction", () => {
    expect(forTraction("shunt_wound_constant")).toBe(false);
  });
});

describe("winding", () => {
  it("universal motor uses laminated field", () => {
    expect(winding("universal_motor_ac_dc")).toBe("series_wound_laminated_field_ac_dc_capable");
  });
});

describe("bestUse", () => {
  it("universal motor for power tool", () => {
    expect(bestUse("universal_motor_ac_dc")).toBe("power_tool_vacuum_cleaner_blender_high_rpm");
  });
});

describe("dcMotorBrushTypes", () => {
  it("returns 5 types", () => {
    expect(dcMotorBrushTypes()).toHaveLength(5);
  });
});

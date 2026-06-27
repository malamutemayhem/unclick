import { describe, it, expect } from "vitest";
import {
  jointStrength, speed, distortion, materialRange,
  fwCost, solidState, forAluminum, tool,
  bestUse, frictionStirWeldTypes,
} from "../friction-stir-weld-calc.js";

describe("jointStrength", () => {
  it("conventional butt highest joint strength", () => {
    expect(jointStrength("conventional_butt")).toBeGreaterThan(jointStrength("friction_stir_spot"));
  });
});

describe("speed", () => {
  it("friction stir spot fastest", () => {
    expect(speed("friction_stir_spot")).toBeGreaterThan(speed("self_reacting"));
  });
});

describe("distortion", () => {
  it("bobbin tool lowest distortion", () => {
    expect(distortion("bobbin_tool")).toBeGreaterThan(distortion("friction_stir_spot"));
  });
});

describe("materialRange", () => {
  it("friction stir spot widest material range", () => {
    expect(materialRange("friction_stir_spot")).toBeGreaterThan(materialRange("self_reacting"));
  });
});

describe("fwCost", () => {
  it("robotic fsw most expensive", () => {
    expect(fwCost("robotic_fsw")).toBeGreaterThan(fwCost("friction_stir_spot"));
  });
});

describe("solidState", () => {
  it("all types are solid state", () => {
    expect(solidState("conventional_butt")).toBe(true);
    expect(solidState("friction_stir_spot")).toBe(true);
  });
});

describe("forAluminum", () => {
  it("all types for aluminum", () => {
    expect(forAluminum("conventional_butt")).toBe(true);
    expect(forAluminum("bobbin_tool")).toBe(true);
  });
});

describe("tool", () => {
  it("robotic fsw uses six axis robot arm", () => {
    expect(tool("robotic_fsw")).toBe("six_axis_robot_arm_force_controlled_fsw_head_3d_path");
  });
});

describe("bestUse", () => {
  it("bobbin tool for hollow extrusion panel", () => {
    expect(bestUse("bobbin_tool")).toBe("hollow_extrusion_panel_floor_deck_no_root_flaw_full_weld");
  });
});

describe("frictionStirWeldTypes", () => {
  it("returns 5 types", () => {
    expect(frictionStirWeldTypes()).toHaveLength(5);
  });
});

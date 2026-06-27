import { describe, it, expect } from "vitest";
import {
  jointStrength, throughput, distortion, materialRange,
  fsCost, solidState, forAluminum, weldConfig,
  bestUse, frictionStirTypes,
} from "../friction-stir-calc.js";

describe("jointStrength", () => {
  it("conventional fsw best joint strength", () => {
    expect(jointStrength("conventional_fsw")).toBeGreaterThan(jointStrength("friction_stir_spot"));
  });
});

describe("throughput", () => {
  it("friction stir spot highest throughput", () => {
    expect(throughput("friction_stir_spot")).toBeGreaterThan(throughput("bobbin_tool_fsw"));
  });
});

describe("distortion", () => {
  it("stationary shoulder best distortion control", () => {
    expect(distortion("stationary_shoulder")).toBeGreaterThan(distortion("conventional_fsw"));
  });
});

describe("materialRange", () => {
  it("friction stir spot best material range", () => {
    expect(materialRange("friction_stir_spot")).toBeGreaterThan(materialRange("self_reacting_fsw"));
  });
});

describe("fsCost", () => {
  it("self reacting most expensive", () => {
    expect(fsCost("self_reacting_fsw")).toBeGreaterThan(fsCost("friction_stir_spot"));
  });
});

describe("solidState", () => {
  it("conventional fsw is solid state", () => {
    expect(solidState("conventional_fsw")).toBe(true);
  });
});

describe("forAluminum", () => {
  it("conventional fsw for aluminum", () => {
    expect(forAluminum("conventional_fsw")).toBe(true);
  });
  it("stationary shoulder not for aluminum", () => {
    expect(forAluminum("stationary_shoulder")).toBe(false);
  });
});

describe("weldConfig", () => {
  it("bobbin tool uses double shoulder self react no backing bar needed", () => {
    expect(weldConfig("bobbin_tool_fsw")).toBe("bobbin_tool_fsw_double_shoulder_self_react_no_backing_bar_needed");
  });
});

describe("bestUse", () => {
  it("conventional fsw for aerospace panel butt joint high strength no filler", () => {
    expect(bestUse("conventional_fsw")).toBe("aerospace_panel_conventional_fsw_butt_joint_high_strength_no_filler");
  });
});

describe("frictionStirTypes", () => {
  it("returns 5 types", () => {
    expect(frictionStirTypes()).toHaveLength(5);
  });
});

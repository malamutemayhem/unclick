import { describe, it, expect } from "vitest";
import {
  deflection, speed, fillFactor, resolution,
  mmCost, analog, forDisplay, drive,
  bestUse, memsMirrors,
} from "../mems-mirror-calc.js";

describe("deflection", () => {
  it("resonant scanning highest deflection", () => {
    expect(deflection("resonant_scanning")).toBeGreaterThan(deflection("dmd_binary_tilt"));
  });
});

describe("speed", () => {
  it("dmd binary tilt fastest", () => {
    expect(speed("dmd_binary_tilt")).toBeGreaterThan(speed("tip_tilt_piston"));
  });
});

describe("fillFactor", () => {
  it("dmd binary tilt best fill factor", () => {
    expect(fillFactor("dmd_binary_tilt")).toBeGreaterThan(fillFactor("resonant_scanning"));
  });
});

describe("resolution", () => {
  it("dmd binary tilt highest resolution", () => {
    expect(resolution("dmd_binary_tilt")).toBeGreaterThan(resolution("resonant_scanning"));
  });
});

describe("mmCost", () => {
  it("tip tilt piston most expensive", () => {
    expect(mmCost("tip_tilt_piston")).toBeGreaterThan(mmCost("resonant_scanning"));
  });
});

describe("analog", () => {
  it("tilt electrostatic is analog", () => {
    expect(analog("tilt_electrostatic")).toBe(true);
  });
  it("dmd binary tilt not analog", () => {
    expect(analog("dmd_binary_tilt")).toBe(false);
  });
});

describe("forDisplay", () => {
  it("dmd binary tilt for display", () => {
    expect(forDisplay("dmd_binary_tilt")).toBe(true);
  });
  it("tilt electrostatic not for display", () => {
    expect(forDisplay("tilt_electrostatic")).toBe(false);
  });
});

describe("drive", () => {
  it("resonant scanning uses electromagnetic resonance", () => {
    expect(drive("resonant_scanning")).toBe("electromagnetic_resonance");
  });
});

describe("bestUse", () => {
  it("dmd binary tilt best for dlp projector cinema", () => {
    expect(bestUse("dmd_binary_tilt")).toBe("dlp_projector_cinema");
  });
});

describe("memsMirrors", () => {
  it("returns 5 types", () => {
    expect(memsMirrors()).toHaveLength(5);
  });
});

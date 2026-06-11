import { describe, it, expect } from "vitest";
import {
  power, linewidth, efficiency, modSpeed,
  lsCost, singleMode, forTelecom, cavity,
  bestUse, laserTypes,
} from "../laser-type-calc.js";

describe("power", () => {
  it("fiber erbium highest power", () => {
    expect(power("fiber_erbium_doped")).toBeGreaterThan(power("vcsel_surface_emit"));
  });
});

describe("linewidth", () => {
  it("fiber erbium narrowest linewidth", () => {
    expect(linewidth("fiber_erbium_doped")).toBeGreaterThan(linewidth("edge_emitting_fp"));
  });
});

describe("efficiency", () => {
  it("vcsel most efficient", () => {
    expect(efficiency("vcsel_surface_emit")).toBeGreaterThan(efficiency("qcl_mid_infrared"));
  });
});

describe("modSpeed", () => {
  it("dfb fastest modulation", () => {
    expect(modSpeed("dfb_single_mode")).toBeGreaterThan(modSpeed("fiber_erbium_doped"));
  });
});

describe("lsCost", () => {
  it("qcl most expensive", () => {
    expect(lsCost("qcl_mid_infrared")).toBeGreaterThan(lsCost("edge_emitting_fp"));
  });
});

describe("singleMode", () => {
  it("dfb is single mode", () => {
    expect(singleMode("dfb_single_mode")).toBe(true);
  });
  it("edge emitting not single mode", () => {
    expect(singleMode("edge_emitting_fp")).toBe(false);
  });
});

describe("forTelecom", () => {
  it("dfb for telecom", () => {
    expect(forTelecom("dfb_single_mode")).toBe(true);
  });
  it("vcsel not for telecom", () => {
    expect(forTelecom("vcsel_surface_emit")).toBe(false);
  });
});

describe("cavity", () => {
  it("vcsel uses dbr mirror vertical cavity", () => {
    expect(cavity("vcsel_surface_emit")).toBe("dbr_mirror_vertical_cavity");
  });
});

describe("bestUse", () => {
  it("dfb best for dwdm long haul", () => {
    expect(bestUse("dfb_single_mode")).toBe("dwdm_long_haul_transmit");
  });
});

describe("laserTypes", () => {
  it("returns 5 types", () => {
    expect(laserTypes()).toHaveLength(5);
  });
});

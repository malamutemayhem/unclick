import { describe, it, expect } from "vitest";
import {
  density, speed, precision, surfaceFinish,
  maCost, supportFree, forAerospace, feedstock,
  bestUse, metalAmTypes,
} from "../metal-am-calc.js";

describe("density", () => {
  it("LPBF highest density", () => {
    expect(density("lpbf_laser_powder_bed")).toBeGreaterThan(density("binder_jet_metal"));
  });
});

describe("speed", () => {
  it("binder jet fastest", () => {
    expect(speed("binder_jet_metal")).toBeGreaterThan(speed("lpbf_laser_powder_bed"));
  });
});

describe("precision", () => {
  it("LPBF most precise", () => {
    expect(precision("lpbf_laser_powder_bed")).toBeGreaterThan(precision("ded_laser_wire"));
  });
});

describe("surfaceFinish", () => {
  it("LPBF best surface finish", () => {
    expect(surfaceFinish("lpbf_laser_powder_bed")).toBeGreaterThan(surfaceFinish("ded_laser_wire"));
  });
});

describe("maCost", () => {
  it("EBM most expensive", () => {
    expect(maCost("ebm_electron_beam_melt")).toBeGreaterThan(maCost("metal_fdm_bound_filament"));
  });
});

describe("supportFree", () => {
  it("binder jet is support-free", () => {
    expect(supportFree("binder_jet_metal")).toBe(true);
  });
  it("LPBF not support-free", () => {
    expect(supportFree("lpbf_laser_powder_bed")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("LPBF for aerospace", () => {
    expect(forAerospace("lpbf_laser_powder_bed")).toBe(true);
  });
  it("metal FDM not for aerospace", () => {
    expect(forAerospace("metal_fdm_bound_filament")).toBe(false);
  });
});

describe("feedstock", () => {
  it("EBM uses plasma atomized Ti powder", () => {
    expect(feedstock("ebm_electron_beam_melt")).toBe("plasma_atomized_ti_powder_45_106um");
  });
});

describe("bestUse", () => {
  it("binder jet for volume production", () => {
    expect(bestUse("binder_jet_metal")).toBe("volume_production_tool_insert");
  });
});

describe("metalAmTypes", () => {
  it("returns 5 types", () => {
    expect(metalAmTypes()).toHaveLength(5);
  });
});

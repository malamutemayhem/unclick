import { describe, it, expect } from "vitest";
import {
  accuracy, range, buildupImmune, tempRange,
  cpCost, continuous, forNonConduct, electrode,
  bestUse, capacitanceProbeTypes,
} from "../capacitance-probe-calc.js";

describe("accuracy", () => {
  it("coaxial probe most accurate", () => {
    expect(accuracy("coaxial_probe_precise")).toBeGreaterThan(accuracy("plate_probe_adhesive"));
  });
});

describe("range", () => {
  it("cable probe longest range", () => {
    expect(range("cable_probe_deep_tank")).toBeGreaterThan(range("plate_probe_adhesive"));
  });
});

describe("buildupImmune", () => {
  it("plate probe best buildup immunity", () => {
    expect(buildupImmune("plate_probe_adhesive")).toBeGreaterThan(buildupImmune("cable_probe_deep_tank"));
  });
});

describe("tempRange", () => {
  it("insulated rod widest temp range", () => {
    expect(tempRange("insulated_rod_nonconduct")).toBeGreaterThan(tempRange("cable_probe_deep_tank"));
  });
});

describe("cpCost", () => {
  it("coaxial probe most expensive", () => {
    expect(cpCost("coaxial_probe_precise")).toBeGreaterThan(cpCost("bare_rod_conductive"));
  });
});

describe("continuous", () => {
  it("bare rod is continuous", () => {
    expect(continuous("bare_rod_conductive")).toBe(true);
  });
  it("plate probe not continuous", () => {
    expect(continuous("plate_probe_adhesive")).toBe(false);
  });
});

describe("forNonConduct", () => {
  it("insulated rod for nonconductive", () => {
    expect(forNonConduct("insulated_rod_nonconduct")).toBe(true);
  });
  it("bare rod not for nonconductive", () => {
    expect(forNonConduct("bare_rod_conductive")).toBe(false);
  });
});

describe("electrode", () => {
  it("cable probe uses flexible cable weighted", () => {
    expect(electrode("cable_probe_deep_tank")).toBe("flexible_cable_weighted_end_deep_mount");
  });
});

describe("bestUse", () => {
  it("coaxial probe for oil water interface", () => {
    expect(bestUse("coaxial_probe_precise")).toBe("precision_interface_detect_oil_water");
  });
});

describe("capacitanceProbeTypes", () => {
  it("returns 5 types", () => {
    expect(capacitanceProbeTypes()).toHaveLength(5);
  });
});

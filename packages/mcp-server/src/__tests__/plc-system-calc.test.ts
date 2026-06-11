import { describe, it, expect } from "vitest";
import {
  ioCapacity, processingSpeed, reliability, expandability,
  plCost_, safetyRated, forLargeSystem, architecture,
  bestUse, plcSystemTypes,
} from "../plc-system-calc.js";

describe("ioCapacity", () => {
  it("modular rack mount highest io capacity", () => {
    expect(ioCapacity("modular_rack_mount")).toBeGreaterThan(ioCapacity("compact_micro_plc"));
  });
});

describe("processingSpeed", () => {
  it("pac programmable auto fastest processing", () => {
    expect(processingSpeed("pac_programmable_auto")).toBeGreaterThan(processingSpeed("compact_micro_plc"));
  });
});

describe("reliability", () => {
  it("safety plc sil3 most reliable", () => {
    expect(reliability("safety_plc_sil3")).toBeGreaterThan(reliability("soft_plc_pc_based"));
  });
});

describe("expandability", () => {
  it("modular rack mount most expandable", () => {
    expect(expandability("modular_rack_mount")).toBeGreaterThan(expandability("compact_micro_plc"));
  });
});

describe("plCost_", () => {
  it("safety plc sil3 most expensive", () => {
    expect(plCost_("safety_plc_sil3")).toBeGreaterThan(plCost_("compact_micro_plc"));
  });
});

describe("safetyRated", () => {
  it("safety plc sil3 is safety rated", () => {
    expect(safetyRated("safety_plc_sil3")).toBe(true);
  });
  it("modular rack mount not safety rated", () => {
    expect(safetyRated("modular_rack_mount")).toBe(false);
  });
});

describe("forLargeSystem", () => {
  it("modular rack mount for large system", () => {
    expect(forLargeSystem("modular_rack_mount")).toBe(true);
  });
  it("compact micro plc not for large system", () => {
    expect(forLargeSystem("compact_micro_plc")).toBe(false);
  });
});

describe("architecture", () => {
  it("soft plc uses industrial pc real time os", () => {
    expect(architecture("soft_plc_pc_based")).toBe("industrial_pc_real_time_os_ethercat_fieldbus_io");
  });
});

describe("bestUse", () => {
  it("safety plc for emergency shutdown", () => {
    expect(bestUse("safety_plc_sil3")).toBe("emergency_shutdown_burner_management_safety_critical");
  });
});

describe("plcSystemTypes", () => {
  it("returns 5 types", () => {
    expect(plcSystemTypes()).toHaveLength(5);
  });
});

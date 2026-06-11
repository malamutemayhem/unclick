import { describe, it, expect } from "vitest";
import {
  ioCapacity, scanSpeed, reliability, expansion,
  plcCost, safetyRated, forMotion, programming,
  bestUse, plcTypes,
} from "../plc-type-calc.js";

describe("ioCapacity", () => {
  it("modular rack plc most io capacity", () => {
    expect(ioCapacity("modular_rack_plc")).toBeGreaterThan(ioCapacity("nano_relay_plc"));
  });
});

describe("scanSpeed", () => {
  it("soft plc ipc fastest scan", () => {
    expect(scanSpeed("soft_plc_ipc")).toBeGreaterThan(scanSpeed("nano_relay_plc"));
  });
});

describe("reliability", () => {
  it("safety sil3 plc most reliable", () => {
    expect(reliability("safety_sil3_plc")).toBeGreaterThan(reliability("soft_plc_ipc"));
  });
});

describe("expansion", () => {
  it("modular rack plc most expandable", () => {
    expect(expansion("modular_rack_plc")).toBeGreaterThan(expansion("compact_micro_plc"));
  });
});

describe("plcCost", () => {
  it("safety sil3 plc most expensive", () => {
    expect(plcCost("safety_sil3_plc")).toBeGreaterThan(plcCost("nano_relay_plc"));
  });
});

describe("safetyRated", () => {
  it("safety sil3 plc is safety rated", () => {
    expect(safetyRated("safety_sil3_plc")).toBe(true);
  });
  it("modular rack plc not safety rated", () => {
    expect(safetyRated("modular_rack_plc")).toBe(false);
  });
});

describe("forMotion", () => {
  it("modular rack plc is for motion", () => {
    expect(forMotion("modular_rack_plc")).toBe(true);
  });
  it("compact micro plc not for motion", () => {
    expect(forMotion("compact_micro_plc")).toBe(false);
  });
});

describe("programming", () => {
  it("soft plc ipc uses c cpp codesys", () => {
    expect(programming("soft_plc_ipc")).toBe("c_cpp_codesys");
  });
});

describe("bestUse", () => {
  it("safety sil3 plc best for emergency shutdown system", () => {
    expect(bestUse("safety_sil3_plc")).toBe("emergency_shutdown_system");
  });
});

describe("plcTypes", () => {
  it("returns 5 types", () => {
    expect(plcTypes()).toHaveLength(5);
  });
});

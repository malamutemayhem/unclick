import { describe, it, expect } from "vitest";
import {
  weightCapacity, adjustmentRange, deskSpace, installEase,
  armCost, cableManagement, vesaCompatible, mountType,
  bestSetup, monitorArms,
} from "../monitor-arm-calc.js";

describe("weightCapacity", () => {
  it("wall mount fixed highest capacity", () => {
    expect(weightCapacity("wall_mount_fixed")).toBeGreaterThan(weightCapacity("laptop_tray_combo"));
  });
});

describe("adjustmentRange", () => {
  it("single gas spring best adjustment", () => {
    expect(adjustmentRange("single_gas_spring")).toBeGreaterThan(adjustmentRange("wall_mount_fixed"));
  });
});

describe("deskSpace", () => {
  it("wall mount fixed saves most desk space", () => {
    expect(deskSpace("wall_mount_fixed")).toBeGreaterThan(deskSpace("freestanding_base"));
  });
});

describe("installEase", () => {
  it("freestanding base easiest install", () => {
    expect(installEase("freestanding_base")).toBeGreaterThan(installEase("wall_mount_fixed"));
  });
});

describe("armCost", () => {
  it("dual stacked most expensive", () => {
    expect(armCost("dual_stacked")).toBeGreaterThan(armCost("freestanding_base"));
  });
});

describe("cableManagement", () => {
  it("single gas spring has cable management", () => {
    expect(cableManagement("single_gas_spring")).toBe(true);
  });
  it("freestanding base does not", () => {
    expect(cableManagement("freestanding_base")).toBe(false);
  });
});

describe("vesaCompatible", () => {
  it("dual stacked is vesa compatible", () => {
    expect(vesaCompatible("dual_stacked")).toBe(true);
  });
  it("laptop tray combo is not", () => {
    expect(vesaCompatible("laptop_tray_combo")).toBe(false);
  });
});

describe("mountType", () => {
  it("wall mount fixed uses stud mount bracket", () => {
    expect(mountType("wall_mount_fixed")).toBe("stud_mount_bracket");
  });
});

describe("bestSetup", () => {
  it("dual stacked for trader multi monitor", () => {
    expect(bestSetup("dual_stacked")).toBe("trader_multi_monitor");
  });
});

describe("monitorArms", () => {
  it("returns 5 types", () => {
    expect(monitorArms()).toHaveLength(5);
  });
});

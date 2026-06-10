import { describe, it, expect } from "vitest";
import {
  loadCapacity, aeroDrag, installEase, securityLevel,
  rackCost, lockable, fitsRails, mountSystem,
  bestCargo, roofRacks,
} from "../roof-rack-calc.js";

describe("loadCapacity", () => {
  it("basket open highest load capacity", () => {
    expect(loadCapacity("basket_open")).toBeGreaterThan(loadCapacity("bike_mount_fork"));
  });
});

describe("aeroDrag", () => {
  it("cargo box aero least drag", () => {
    expect(aeroDrag("cargo_box_aero")).toBeGreaterThan(aeroDrag("basket_open"));
  });
});

describe("installEase", () => {
  it("bike mount fork easiest install", () => {
    expect(installEase("bike_mount_fork")).toBeGreaterThan(installEase("cargo_box_aero"));
  });
});

describe("securityLevel", () => {
  it("cargo box aero most secure", () => {
    expect(securityLevel("cargo_box_aero")).toBeGreaterThan(securityLevel("basket_open"));
  });
});

describe("rackCost", () => {
  it("cargo box aero most expensive", () => {
    expect(rackCost("cargo_box_aero")).toBeGreaterThan(rackCost("basket_open"));
  });
});

describe("lockable", () => {
  it("cargo box aero is lockable", () => {
    expect(lockable("cargo_box_aero")).toBe(true);
  });
  it("basket open is not", () => {
    expect(lockable("basket_open")).toBe(false);
  });
});

describe("fitsRails", () => {
  it("crossbar universal fits rails", () => {
    expect(fitsRails("crossbar_universal")).toBe(true);
  });
  it("cargo box aero does not", () => {
    expect(fitsRails("cargo_box_aero")).toBe(false);
  });
});

describe("mountSystem", () => {
  it("kayak saddle uses j cradle strap down", () => {
    expect(mountSystem("kayak_saddle")).toBe("j_cradle_strap_down");
  });
});

describe("bestCargo", () => {
  it("basket open for camping gear overland", () => {
    expect(bestCargo("basket_open")).toBe("camping_gear_overland");
  });
});

describe("roofRacks", () => {
  it("returns 5 types", () => {
    expect(roofRacks()).toHaveLength(5);
  });
});

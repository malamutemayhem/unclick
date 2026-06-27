import { describe, it, expect } from "vitest";
import {
  shearStrength, installSpeed, singleSideAccess, vibrationResist,
  rivetCost, removable, needsSpecialTool, rivetMaterial,
  bestApplication, rivets,
} from "../rivet-calc.js";

describe("shearStrength", () => {
  it("solid steel buck strongest shear", () => {
    expect(shearStrength("solid_steel_buck")).toBeGreaterThan(shearStrength("pop_blind_aluminum"));
  });
});

describe("installSpeed", () => {
  it("pop blind aluminum fastest install", () => {
    expect(installSpeed("pop_blind_aluminum")).toBeGreaterThan(installSpeed("solid_steel_buck"));
  });
});

describe("singleSideAccess", () => {
  it("pop blind aluminum best single side access", () => {
    expect(singleSideAccess("pop_blind_aluminum")).toBeGreaterThan(singleSideAccess("solid_steel_buck"));
  });
});

describe("vibrationResist", () => {
  it("solid steel buck best vibration resistance", () => {
    expect(vibrationResist("solid_steel_buck")).toBeGreaterThan(vibrationResist("pop_blind_aluminum"));
  });
});

describe("rivetCost", () => {
  it("structural lock bolt most expensive", () => {
    expect(rivetCost("structural_lock_bolt")).toBeGreaterThan(rivetCost("drive_pin_hammer"));
  });
});

describe("removable", () => {
  it("rivets are not removable", () => {
    expect(removable("pop_blind_aluminum")).toBe(false);
  });
  it("solid steel buck is not removable", () => {
    expect(removable("solid_steel_buck")).toBe(false);
  });
});

describe("needsSpecialTool", () => {
  it("pop blind aluminum needs special tool", () => {
    expect(needsSpecialTool("pop_blind_aluminum")).toBe(true);
  });
  it("drive pin hammer does not", () => {
    expect(needsSpecialTool("drive_pin_hammer")).toBe(false);
  });
});

describe("rivetMaterial", () => {
  it("solid steel buck uses carbon steel solid", () => {
    expect(rivetMaterial("solid_steel_buck")).toBe("carbon_steel_solid");
  });
});

describe("bestApplication", () => {
  it("tubular semi hollow best for leather fabric craft", () => {
    expect(bestApplication("tubular_semi_hollow")).toBe("leather_fabric_craft");
  });
});

describe("rivets", () => {
  it("returns 5 types", () => {
    expect(rivets()).toHaveLength(5);
  });
});

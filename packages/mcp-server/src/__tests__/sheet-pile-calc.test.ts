import { describe, it, expect } from "vitest";
import {
  strength, stiffness, corrosion, drivability,
  spCost, reusable, forMarine, interlock,
  bestUse, sheetPileTypes,
} from "../sheet-pile-calc.js";

describe("strength", () => {
  it("steel z strongest", () => {
    expect(strength("steel_z_profile_hot_roll")).toBeGreaterThan(strength("vinyl_pvc_lightweight"));
  });
});

describe("stiffness", () => {
  it("steel z stiffest", () => {
    expect(stiffness("steel_z_profile_hot_roll")).toBeGreaterThan(stiffness("vinyl_pvc_lightweight"));
  });
});

describe("corrosion", () => {
  it("vinyl best corrosion resistance", () => {
    expect(corrosion("vinyl_pvc_lightweight")).toBeGreaterThan(corrosion("steel_z_profile_hot_roll"));
  });
});

describe("drivability", () => {
  it("steel z easiest to drive", () => {
    expect(drivability("steel_z_profile_hot_roll")).toBeGreaterThan(drivability("composite_frp_corrosion"));
  });
});

describe("spCost", () => {
  it("composite most expensive", () => {
    expect(spCost("composite_frp_corrosion")).toBeGreaterThan(spCost("vinyl_pvc_lightweight"));
  });
});

describe("reusable", () => {
  it("steel z is reusable", () => {
    expect(reusable("steel_z_profile_hot_roll")).toBe(true);
  });
  it("vinyl not reusable", () => {
    expect(reusable("vinyl_pvc_lightweight")).toBe(false);
  });
});

describe("forMarine", () => {
  it("steel z for marine", () => {
    expect(forMarine("steel_z_profile_hot_roll")).toBe(true);
  });
  it("vinyl not for marine", () => {
    expect(forMarine("vinyl_pvc_lightweight")).toBe(false);
  });
});

describe("interlock", () => {
  it("vinyl uses snap fit tongue groove", () => {
    expect(interlock("vinyl_pvc_lightweight")).toBe("snap_fit_pvc_tongue_groove");
  });
});

describe("bestUse", () => {
  it("steel z for deep excavation", () => {
    expect(bestUse("steel_z_profile_hot_roll")).toBe("deep_excavation_cofferdam_quay_wall");
  });
});

describe("sheetPileTypes", () => {
  it("returns 5 types", () => {
    expect(sheetPileTypes()).toHaveLength(5);
  });
});

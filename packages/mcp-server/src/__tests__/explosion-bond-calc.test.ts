import { describe, it, expect } from "vitest";
import {
  bondStrength, throughput, areaCapacity, materialCombinations,
  ebCost, dissimilarMetal, forPressureVessel, bondConfig,
  bestUse, explosionBondTypes,
} from "../explosion-bond-calc.js";

describe("bondStrength", () => {
  it("parallel plate best bond strength", () => {
    expect(bondStrength("parallel_plate_eb")).toBeGreaterThan(bondStrength("patch_repair_eb"));
  });
});

describe("throughput", () => {
  it("transition joint highest throughput", () => {
    expect(throughput("transition_joint")).toBeGreaterThan(throughput("patch_repair_eb"));
  });
});

describe("areaCapacity", () => {
  it("parallel plate best area capacity", () => {
    expect(areaCapacity("parallel_plate_eb")).toBeGreaterThan(areaCapacity("patch_repair_eb"));
  });
});

describe("materialCombinations", () => {
  it("parallel plate best material combinations", () => {
    expect(materialCombinations("parallel_plate_eb")).toBeGreaterThan(materialCombinations("patch_repair_eb"));
  });
});

describe("ebCost", () => {
  it("cylindrical most expensive", () => {
    expect(ebCost("cylindrical_eb")).toBeGreaterThan(ebCost("patch_repair_eb"));
  });
});

describe("dissimilarMetal", () => {
  it("parallel plate is dissimilar metal", () => {
    expect(dissimilarMetal("parallel_plate_eb")).toBe(true);
  });
  it("patch repair not dissimilar metal", () => {
    expect(dissimilarMetal("patch_repair_eb")).toBe(false);
  });
});

describe("forPressureVessel", () => {
  it("parallel plate for pressure vessel", () => {
    expect(forPressureVessel("parallel_plate_eb")).toBe(true);
  });
  it("transition joint not for pressure vessel", () => {
    expect(forPressureVessel("transition_joint")).toBe(false);
  });
});

describe("bondConfig", () => {
  it("transition joint uses bimetal strip weld bridge metal", () => {
    expect(bondConfig("transition_joint")).toBe("transition_joint_explosion_bond_bimetal_strip_weld_bridge_metal");
  });
});

describe("bestUse", () => {
  it("parallel plate for clad plate titanium steel large area vessel", () => {
    expect(bestUse("parallel_plate_eb")).toBe("clad_plate_parallel_explosion_bond_titanium_steel_large_area_vessel");
  });
});

describe("explosionBondTypes", () => {
  it("returns 5 types", () => {
    expect(explosionBondTypes()).toHaveLength(5);
  });
});

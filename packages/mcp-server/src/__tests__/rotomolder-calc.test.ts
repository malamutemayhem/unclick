import { describe, it, expect } from "vitest";
import {
  moldSpeed, wallThickness, partSize, surfaceFinish,
  rmCost, multiLayer, forTank, molderConfig,
  bestUse, rotomolderTypes,
} from "../rotomolder-calc.js";

describe("moldSpeed", () => {
  it("carousel multi arm fastest mold speed", () => {
    expect(moldSpeed("carousel_multi_arm")).toBeGreaterThan(moldSpeed("open_flame_direct"));
  });
});

describe("wallThickness", () => {
  it("swing arm best wall thickness control", () => {
    expect(wallThickness("swing_arm")).toBeGreaterThan(wallThickness("open_flame_direct"));
  });
});

describe("partSize", () => {
  it("biaxial rock roll handles large part size", () => {
    expect(partSize("biaxial_rock_roll")).toBeGreaterThan(partSize("open_flame_direct"));
  });
});

describe("surfaceFinish", () => {
  it("carousel multi arm best surface finish", () => {
    expect(surfaceFinish("carousel_multi_arm")).toBeGreaterThan(surfaceFinish("open_flame_direct"));
  });
});

describe("rmCost", () => {
  it("carousel multi arm most expensive", () => {
    expect(rmCost("carousel_multi_arm")).toBeGreaterThan(rmCost("open_flame_direct"));
  });
});

describe("multiLayer", () => {
  it("biaxial rock roll supports multi layer", () => {
    expect(multiLayer("biaxial_rock_roll")).toBe(true);
  });
  it("clamshell shuttle not multi layer", () => {
    expect(multiLayer("clamshell_shuttle")).toBe(false);
  });
});

describe("forTank", () => {
  it("carousel multi arm for tank production", () => {
    expect(forTank("carousel_multi_arm")).toBe(true);
  });
  it("swing arm not for tank", () => {
    expect(forTank("swing_arm")).toBe(false);
  });
});

describe("molderConfig", () => {
  it("open flame uses direct heat simple mold", () => {
    expect(molderConfig("open_flame_direct")).toBe("open_flame_direct_heat_simple_mold_manual_rotation_basic_part");
  });
});

describe("bestUse", () => {
  it("swing arm for low volume custom part", () => {
    expect(bestUse("swing_arm")).toBe("low_volume_custom_part_prototype_swing_arm_simple_setup_flex");
  });
});

describe("rotomolderTypes", () => {
  it("returns 5 types", () => {
    expect(rotomolderTypes()).toHaveLength(5);
  });
});

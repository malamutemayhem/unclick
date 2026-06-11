import { describe, it, expect } from "vitest";
import {
  isolation, loadCapacity, durability, frequency,
  rmCost, tunable, forEngine, compound,
  bestUse, rubberMountTypes,
} from "../rubber-mount-calc.js";

describe("isolation", () => {
  it("bellows air spring best isolation", () => {
    expect(isolation("bellows_air_spring")).toBeGreaterThan(isolation("conical_compression_deflect"));
  });
});

describe("loadCapacity", () => {
  it("bellows air spring highest load", () => {
    expect(loadCapacity("bellows_air_spring")).toBeGreaterThan(loadCapacity("cylindrical_bonded_stud"));
  });
});

describe("durability", () => {
  it("sandwich plate most durable", () => {
    expect(durability("sandwich_plate_shear")).toBeGreaterThan(durability("bellows_air_spring"));
  });
});

describe("frequency", () => {
  it("bellows air spring best frequency range", () => {
    expect(frequency("bellows_air_spring")).toBeGreaterThan(frequency("conical_compression_deflect"));
  });
});

describe("rmCost", () => {
  it("bellows air spring most expensive", () => {
    expect(rmCost("bellows_air_spring")).toBeGreaterThan(rmCost("cylindrical_bonded_stud"));
  });
});

describe("tunable", () => {
  it("bellows air spring is tunable", () => {
    expect(tunable("bellows_air_spring")).toBe(true);
  });
  it("cylindrical bonded not tunable", () => {
    expect(tunable("cylindrical_bonded_stud")).toBe(false);
  });
});

describe("forEngine", () => {
  it("sandwich plate for engine", () => {
    expect(forEngine("sandwich_plate_shear")).toBe(true);
  });
  it("bushing not for engine", () => {
    expect(forEngine("bushing_torsional_pivot")).toBe(false);
  });
});

describe("compound", () => {
  it("conical uses silicone rubber", () => {
    expect(compound("conical_compression_deflect")).toBe("silicone_rubber_conical_bonded");
  });
});

describe("bestUse", () => {
  it("bushing for suspension arm pivot", () => {
    expect(bestUse("bushing_torsional_pivot")).toBe("suspension_arm_pivot_linkage");
  });
});

describe("rubberMountTypes", () => {
  it("returns 5 types", () => {
    expect(rubberMountTypes()).toHaveLength(5);
  });
});

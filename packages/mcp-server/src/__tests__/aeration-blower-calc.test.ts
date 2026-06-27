import { describe, it, expect } from "vitest";
import {
  airFlow, efficiency, turndownRange, noiseLevel,
  abCost, oilFree, forLargePlant, drive,
  bestUse, aerationBlowerTypes,
} from "../aeration-blower-calc.js";

describe("airFlow", () => {
  it("high speed direct drive highest air flow", () => {
    expect(airFlow("high_speed_direct_drive")).toBeGreaterThan(airFlow("positive_displacement_lobe"));
  });
});

describe("efficiency", () => {
  it("single stage turbo and high speed most efficient", () => {
    expect(efficiency("single_stage_turbo")).toBeGreaterThan(efficiency("positive_displacement_lobe"));
    expect(efficiency("high_speed_direct_drive")).toBeGreaterThan(efficiency("positive_displacement_lobe"));
  });
});

describe("turndownRange", () => {
  it("high speed direct drive widest turndown", () => {
    expect(turndownRange("high_speed_direct_drive")).toBeGreaterThan(turndownRange("positive_displacement_lobe"));
  });
});

describe("noiseLevel", () => {
  it("single stage turbo quietest operation", () => {
    expect(noiseLevel("single_stage_turbo")).toBeGreaterThan(noiseLevel("positive_displacement_lobe"));
  });
});

describe("abCost", () => {
  it("high speed direct drive most expensive", () => {
    expect(abCost("high_speed_direct_drive")).toBeGreaterThan(abCost("positive_displacement_lobe"));
  });
});

describe("oilFree", () => {
  it("single stage turbo is oil free", () => {
    expect(oilFree("single_stage_turbo")).toBe(true);
  });
  it("screw compressor not oil free", () => {
    expect(oilFree("screw_compressor")).toBe(false);
  });
});

describe("forLargePlant", () => {
  it("multistage centrifugal for large plant", () => {
    expect(forLargePlant("multistage_centrifugal")).toBe(true);
  });
  it("positive displacement lobe not for large plant", () => {
    expect(forLargePlant("positive_displacement_lobe")).toBe(false);
  });
});

describe("drive", () => {
  it("high speed direct drive uses permanent magnet", () => {
    expect(drive("high_speed_direct_drive")).toBe("permanent_magnet_motor_direct_coupled_active_magnetic_bear");
  });
});

describe("bestUse", () => {
  it("screw compressor for industrial plant", () => {
    expect(bestUse("screw_compressor")).toBe("industrial_plant_dual_purpose_process_air_aeration_backup");
  });
});

describe("aerationBlowerTypes", () => {
  it("returns 5 types", () => {
    expect(aerationBlowerTypes()).toHaveLength(5);
  });
});

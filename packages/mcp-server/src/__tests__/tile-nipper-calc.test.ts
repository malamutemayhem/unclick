import { describe, it, expect } from "vitest";
import {
  cutPrecision, cuttingForce, handFatigue, materialRange,
  nipperCost, forGlass, springLoaded, jawMaterial,
  bestMaterial, tileNippers,
} from "../tile-nipper-calc.js";

describe("cutPrecision", () => {
  it("carbide jaw precision best cut precision", () => {
    expect(cutPrecision("carbide_jaw_precision")).toBeGreaterThan(cutPrecision("compound_lever_heavy"));
  });
});

describe("cuttingForce", () => {
  it("compound lever heavy most cutting force", () => {
    expect(cuttingForce("compound_lever_heavy")).toBeGreaterThan(cuttingForce("glass_runner_snap"));
  });
});

describe("handFatigue", () => {
  it("mosaic cutter spring least hand fatigue", () => {
    expect(handFatigue("mosaic_cutter_spring")).toBeGreaterThan(handFatigue("compound_lever_heavy"));
  });
});

describe("materialRange", () => {
  it("compound lever heavy widest material range", () => {
    expect(materialRange("compound_lever_heavy")).toBeGreaterThan(materialRange("glass_runner_snap"));
  });
});

describe("nipperCost", () => {
  it("carbide jaw precision more expensive than mosaic cutter", () => {
    expect(nipperCost("carbide_jaw_precision")).toBeGreaterThan(nipperCost("mosaic_cutter_spring"));
  });
});

describe("forGlass", () => {
  it("glass runner snap is for glass", () => {
    expect(forGlass("glass_runner_snap")).toBe(true);
  });
  it("compound lever heavy is not for glass", () => {
    expect(forGlass("compound_lever_heavy")).toBe(false);
  });
});

describe("springLoaded", () => {
  it("mosaic cutter spring is spring loaded", () => {
    expect(springLoaded("mosaic_cutter_spring")).toBe(true);
  });
  it("wheel nipper score is not spring loaded", () => {
    expect(springLoaded("wheel_nipper_score")).toBe(false);
  });
});

describe("jawMaterial", () => {
  it("carbide jaw precision uses solid carbide insert", () => {
    expect(jawMaterial("carbide_jaw_precision")).toBe("solid_carbide_insert");
  });
});

describe("bestMaterial", () => {
  it("glass runner snap best for stained glass sheet", () => {
    expect(bestMaterial("glass_runner_snap")).toBe("stained_glass_sheet");
  });
});

describe("tileNippers", () => {
  it("returns 5 types", () => {
    expect(tileNippers()).toHaveLength(5);
  });
});

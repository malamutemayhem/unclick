import { describe, it, expect } from "vitest";
import {
  cutAccuracy, speedOutput, shapeControl, portability,
  cutterCost, needsWater, forSmalti, cuttingAction,
  bestTessera, tesseraCutters,
} from "../tessera-cutter-calc.js";

describe("cutAccuracy", () => {
  it("wet saw diamond best cut accuracy", () => {
    expect(cutAccuracy("wet_saw_diamond")).toBeGreaterThan(cutAccuracy("hardie_anvil_hammer"));
  });
});

describe("speedOutput", () => {
  it("wet saw diamond fastest speed", () => {
    expect(speedOutput("wet_saw_diamond")).toBeGreaterThan(speedOutput("glass_cutter_oil"));
  });
});

describe("shapeControl", () => {
  it("wet saw diamond best shape control", () => {
    expect(shapeControl("wet_saw_diamond")).toBeGreaterThan(shapeControl("hardie_anvil_hammer"));
  });
});

describe("portability", () => {
  it("glass cutter oil most portable", () => {
    expect(portability("glass_cutter_oil")).toBeGreaterThan(portability("wet_saw_diamond"));
  });
});

describe("cutterCost", () => {
  it("wet saw diamond more expensive than wheeled nipper", () => {
    expect(cutterCost("wet_saw_diamond")).toBeGreaterThan(cutterCost("wheeled_nipper_score"));
  });
});

describe("needsWater", () => {
  it("wet saw diamond needs water", () => {
    expect(needsWater("wet_saw_diamond")).toBe(true);
  });
  it("hardie anvil hammer does not need water", () => {
    expect(needsWater("hardie_anvil_hammer")).toBe(false);
  });
});

describe("forSmalti", () => {
  it("hardie anvil hammer is for smalti", () => {
    expect(forSmalti("hardie_anvil_hammer")).toBe(true);
  });
  it("mosaic plier snap is not for smalti", () => {
    expect(forSmalti("mosaic_plier_snap")).toBe(false);
  });
});

describe("cuttingAction", () => {
  it("hardie anvil hammer uses strike split fracture", () => {
    expect(cuttingAction("hardie_anvil_hammer")).toBe("strike_split_fracture");
  });
});

describe("bestTessera", () => {
  it("wet saw diamond best for porcelain precise shape", () => {
    expect(bestTessera("wet_saw_diamond")).toBe("porcelain_precise_shape");
  });
});

describe("tesseraCutters", () => {
  it("returns 5 types", () => {
    expect(tesseraCutters()).toHaveLength(5);
  });
});

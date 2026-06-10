import { describe, it, expect } from "vitest";
import {
  cutPrecision, cutForce, handFatigue, chipControl,
  nipperCost, wheelBlade, forThickGlass, jawType,
  bestUse, mosaicNippers,
} from "../mosaic-nipper-calc.js";

describe("cutPrecision", () => {
  it("wheeled cutter dual most precise cut", () => {
    expect(cutPrecision("wheeled_cutter_dual")).toBeGreaterThan(cutPrecision("side_bite_flat"));
  });
});

describe("cutForce", () => {
  it("compound lever heavy strongest cut", () => {
    expect(cutForce("compound_lever_heavy")).toBeGreaterThan(cutForce("glass_scorer_carbide"));
  });
});

describe("handFatigue", () => {
  it("wheeled cutter dual least hand fatigue", () => {
    expect(handFatigue("wheeled_cutter_dual")).toBeGreaterThan(handFatigue("side_bite_flat"));
  });
});

describe("chipControl", () => {
  it("glass scorer carbide best chip control", () => {
    expect(chipControl("glass_scorer_carbide")).toBeGreaterThan(chipControl("compound_lever_heavy"));
  });
});

describe("nipperCost", () => {
  it("wheeled cutter dual most expensive", () => {
    expect(nipperCost("wheeled_cutter_dual")).toBeGreaterThan(nipperCost("side_bite_flat"));
  });
});

describe("wheelBlade", () => {
  it("wheeled cutter dual has wheel blade", () => {
    expect(wheelBlade("wheeled_cutter_dual")).toBe(true);
  });
  it("compound lever heavy no wheel blade", () => {
    expect(wheelBlade("compound_lever_heavy")).toBe(false);
  });
});

describe("forThickGlass", () => {
  it("compound lever heavy is for thick glass", () => {
    expect(forThickGlass("compound_lever_heavy")).toBe(true);
  });
  it("wheeled cutter dual not for thick glass", () => {
    expect(forThickGlass("wheeled_cutter_dual")).toBe(false);
  });
});

describe("jawType", () => {
  it("wheeled cutter dual uses carbide wheel pair", () => {
    expect(jawType("wheeled_cutter_dual")).toBe("carbide_wheel_pair");
  });
});

describe("bestUse", () => {
  it("wheeled cutter dual best for precise tesserae cut", () => {
    expect(bestUse("wheeled_cutter_dual")).toBe("precise_tesserae_cut");
  });
});

describe("mosaicNippers", () => {
  it("returns 5 types", () => {
    expect(mosaicNippers()).toHaveLength(5);
  });
});

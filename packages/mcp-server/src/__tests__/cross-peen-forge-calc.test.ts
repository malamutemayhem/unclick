import { describe, it, expect } from "vitest";
import {
  spreadControl, drawForce, balanceFeel, faceArea,
  peenCost, lightWeight, forDrawing, headWeight,
  bestUse, crossPeenForges,
} from "../cross-peen-forge-calc.js";

describe("spreadControl", () => {
  it("japanese pattern slim best spread control", () => {
    expect(spreadControl("japanese_pattern_slim")).toBeGreaterThan(spreadControl("german_pattern_heavy"));
  });
});

describe("drawForce", () => {
  it("german pattern heavy strongest draw force", () => {
    expect(drawForce("german_pattern_heavy")).toBeGreaterThan(drawForce("japanese_pattern_slim"));
  });
});

describe("balanceFeel", () => {
  it("swedish pattern light best balance feel", () => {
    expect(balanceFeel("swedish_pattern_light")).toBeGreaterThan(balanceFeel("german_pattern_heavy"));
  });
});

describe("faceArea", () => {
  it("french pattern wide largest face area", () => {
    expect(faceArea("french_pattern_wide")).toBeGreaterThan(faceArea("japanese_pattern_slim"));
  });
});

describe("peenCost", () => {
  it("japanese pattern slim most expensive", () => {
    expect(peenCost("japanese_pattern_slim")).toBeGreaterThan(peenCost("blacksmith_pattern_general"));
  });
});

describe("lightWeight", () => {
  it("swedish pattern light is light weight", () => {
    expect(lightWeight("swedish_pattern_light")).toBe(true);
  });
  it("german pattern heavy not light weight", () => {
    expect(lightWeight("german_pattern_heavy")).toBe(false);
  });
});

describe("forDrawing", () => {
  it("german pattern heavy is for drawing", () => {
    expect(forDrawing("german_pattern_heavy")).toBe(true);
  });
  it("japanese pattern slim not for drawing", () => {
    expect(forDrawing("japanese_pattern_slim")).toBe(false);
  });
});

describe("headWeight", () => {
  it("german pattern heavy uses heavy 1500g", () => {
    expect(headWeight("german_pattern_heavy")).toBe("heavy_1500g");
  });
});

describe("bestUse", () => {
  it("japanese pattern slim best for fine detail spread", () => {
    expect(bestUse("japanese_pattern_slim")).toBe("fine_detail_spread");
  });
});

describe("crossPeenForges", () => {
  it("returns 5 types", () => {
    expect(crossPeenForges()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  cushioning, playArea, stimulation, cleanEase,
  matCost, portable, nonToxic, matMaterial,
  bestStage, playMats,
} from "../play-mat-calc.js";

describe("cushioning", () => {
  it("foam interlocking tile best cushioning", () => {
    expect(cushioning("foam_interlocking_tile")).toBeGreaterThan(cushioning("waterproof_picnic_fold"));
  });
});

describe("playArea", () => {
  it("foam interlocking tile largest play area", () => {
    expect(playArea("foam_interlocking_tile")).toBeGreaterThan(playArea("activity_gym_arch"));
  });
});

describe("stimulation", () => {
  it("activity gym arch most stimulating", () => {
    expect(stimulation("activity_gym_arch")).toBeGreaterThan(stimulation("foam_interlocking_tile"));
  });
});

describe("cleanEase", () => {
  it("waterproof picnic fold easiest to clean", () => {
    expect(cleanEase("waterproof_picnic_fold")).toBeGreaterThan(cleanEase("cotton_quilted_round"));
  });
});

describe("matCost", () => {
  it("activity gym arch most expensive", () => {
    expect(matCost("activity_gym_arch")).toBeGreaterThan(matCost("waterproof_picnic_fold"));
  });
});

describe("portable", () => {
  it("waterproof picnic fold is portable", () => {
    expect(portable("waterproof_picnic_fold")).toBe(true);
  });
  it("foam interlocking tile is not", () => {
    expect(portable("foam_interlocking_tile")).toBe(false);
  });
});

describe("nonToxic", () => {
  it("all play mats are non toxic", () => {
    expect(nonToxic("foam_interlocking_tile")).toBe(true);
  });
  it("rubber sensory textured is non toxic", () => {
    expect(nonToxic("rubber_sensory_textured")).toBe(true);
  });
});

describe("matMaterial", () => {
  it("activity gym arch uses polyester wood arch frame", () => {
    expect(matMaterial("activity_gym_arch")).toBe("polyester_wood_arch_frame");
  });
});

describe("bestStage", () => {
  it("cotton quilted round best for newborn tummy time", () => {
    expect(bestStage("cotton_quilted_round")).toBe("newborn_tummy_time");
  });
});

describe("playMats", () => {
  it("returns 5 types", () => {
    expect(playMats()).toHaveLength(5);
  });
});

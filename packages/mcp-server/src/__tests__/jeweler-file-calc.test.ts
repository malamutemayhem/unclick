import { describe, it, expect } from "vitest";
import {
  metalRemoval, precision, safeEdge, reachDepth,
  fileCost, oneSafeEdge, curvedProfile, cutGrade,
  bestUse, jewelerFiles,
} from "../jeweler-file-calc.js";

describe("metalRemoval", () => {
  it("pillar narrow thick best metal removal", () => {
    expect(metalRemoval("pillar_narrow_thick")).toBeGreaterThan(metalRemoval("escapement_tiny_fine"));
  });
});

describe("precision", () => {
  it("escapement tiny fine most precise", () => {
    expect(precision("escapement_tiny_fine")).toBeGreaterThan(precision("pillar_narrow_thick"));
  });
});

describe("safeEdge", () => {
  it("barrette flat safe best safe edge", () => {
    expect(safeEdge("barrette_flat_safe")).toBeGreaterThan(safeEdge("pillar_narrow_thick"));
  });
});

describe("reachDepth", () => {
  it("riffler curved end best reach depth", () => {
    expect(reachDepth("riffler_curved_end")).toBeGreaterThan(reachDepth("barrette_flat_safe"));
  });
});

describe("fileCost", () => {
  it("escapement tiny fine most expensive", () => {
    expect(fileCost("escapement_tiny_fine")).toBeGreaterThan(fileCost("barrette_flat_safe"));
  });
});

describe("oneSafeEdge", () => {
  it("barrette flat safe has one safe edge", () => {
    expect(oneSafeEdge("barrette_flat_safe")).toBe(true);
  });
  it("pillar narrow thick no safe edge", () => {
    expect(oneSafeEdge("pillar_narrow_thick")).toBe(false);
  });
});

describe("curvedProfile", () => {
  it("riffler curved end has curved profile", () => {
    expect(curvedProfile("riffler_curved_end")).toBe(true);
  });
  it("barrette flat safe no curved profile", () => {
    expect(curvedProfile("barrette_flat_safe")).toBe(false);
  });
});

describe("cutGrade", () => {
  it("escapement tiny fine uses cut 4 dead smooth", () => {
    expect(cutGrade("escapement_tiny_fine")).toBe("cut_4_dead_smooth");
  });
});

describe("bestUse", () => {
  it("riffler curved end best for recessed area smooth", () => {
    expect(bestUse("riffler_curved_end")).toBe("recessed_area_smooth");
  });
});

describe("jewelerFiles", () => {
  it("returns 5 types", () => {
    expect(jewelerFiles()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  clayRemoval, detailControl, surfaceFinish, durability,
  toolCost, doubleEnded, forTrimming, loopMaterial,
  bestUse, loopTools,
} from "../loop-tool-calc.js";

describe("clayRemoval", () => {
  it("large oval scoop most clay removal", () => {
    expect(clayRemoval("large_oval_scoop")).toBeGreaterThan(clayRemoval("wire_loop_fine"));
  });
});

describe("detailControl", () => {
  it("wire loop fine best detail control", () => {
    expect(detailControl("wire_loop_fine")).toBeGreaterThan(detailControl("large_oval_scoop"));
  });
});

describe("surfaceFinish", () => {
  it("ribbon flat shave best surface finish", () => {
    expect(surfaceFinish("ribbon_flat_shave")).toBeGreaterThan(surfaceFinish("large_oval_scoop"));
  });
});

describe("durability", () => {
  it("small round trim most durable", () => {
    expect(durability("small_round_trim")).toBeGreaterThan(durability("wire_loop_fine"));
  });
});

describe("toolCost", () => {
  it("ribbon flat shave more expensive", () => {
    expect(toolCost("ribbon_flat_shave")).toBeGreaterThan(toolCost("small_round_trim"));
  });
});

describe("doubleEnded", () => {
  it("double end combo is double ended", () => {
    expect(doubleEnded("double_end_combo")).toBe(true);
  });
  it("small round trim not double ended", () => {
    expect(doubleEnded("small_round_trim")).toBe(false);
  });
});

describe("forTrimming", () => {
  it("small round trim is for trimming", () => {
    expect(forTrimming("small_round_trim")).toBe(true);
  });
  it("large oval scoop not for trimming", () => {
    expect(forTrimming("large_oval_scoop")).toBe(false);
  });
});

describe("loopMaterial", () => {
  it("small round trim uses spring steel round", () => {
    expect(loopMaterial("small_round_trim")).toBe("spring_steel_round");
  });
});

describe("bestUse", () => {
  it("ribbon flat shave best for smooth surface shave", () => {
    expect(bestUse("ribbon_flat_shave")).toBe("smooth_surface_shave");
  });
});

describe("loopTools", () => {
  it("returns 5 types", () => {
    expect(loopTools()).toHaveLength(5);
  });
});

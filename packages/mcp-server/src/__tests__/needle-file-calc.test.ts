import { describe, it, expect } from "vitest";
import {
  cutRate, finishQuality, versatility, detailReach,
  fileCost, doublecut, curvedFace, toothPattern,
  bestUse, needleFiles,
} from "../needle-file-calc.js";

describe("cutRate", () => {
  it("square slot cut fastest cut rate", () => {
    expect(cutRate("square_slot_cut")).toBeGreaterThan(cutRate("half_round_curve"));
  });
});

describe("finishQuality", () => {
  it("flat hand smooth best finish quality", () => {
    expect(finishQuality("flat_hand_smooth")).toBeGreaterThan(finishQuality("square_slot_cut"));
  });
});

describe("versatility", () => {
  it("flat hand smooth most versatile", () => {
    expect(versatility("flat_hand_smooth")).toBeGreaterThan(versatility("triangle_corner_point"));
  });
});

describe("detailReach", () => {
  it("triangle corner point best detail reach", () => {
    expect(detailReach("triangle_corner_point")).toBeGreaterThan(detailReach("flat_hand_smooth"));
  });
});

describe("fileCost", () => {
  it("triangle corner point more expensive", () => {
    expect(fileCost("triangle_corner_point")).toBeGreaterThan(fileCost("flat_hand_smooth"));
  });
});

describe("doublecut", () => {
  it("triangle corner point is doublecut", () => {
    expect(doublecut("triangle_corner_point")).toBe(true);
  });
  it("flat hand smooth not doublecut", () => {
    expect(doublecut("flat_hand_smooth")).toBe(false);
  });
});

describe("curvedFace", () => {
  it("half round curve has curved face", () => {
    expect(curvedFace("half_round_curve")).toBe(true);
  });
  it("flat hand smooth no curved face", () => {
    expect(curvedFace("flat_hand_smooth")).toBe(false);
  });
});

describe("toothPattern", () => {
  it("flat hand smooth uses single cut parallel", () => {
    expect(toothPattern("flat_hand_smooth")).toBe("single_cut_parallel");
  });
});

describe("bestUse", () => {
  it("triangle corner point best for sharp corner clean", () => {
    expect(bestUse("triangle_corner_point")).toBe("sharp_corner_clean");
  });
});

describe("needleFiles", () => {
  it("returns 5 types", () => {
    expect(needleFiles()).toHaveLength(5);
  });
});

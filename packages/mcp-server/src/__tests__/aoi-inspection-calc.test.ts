import { describe, it, expect } from "vitest";
import {
  defectDetection, speed, falseCallRate, coverage,
  aiCost, threeD, forSolderJoint, imaging,
  bestUse, aoiInspectionTypes,
} from "../aoi-inspection-calc.js";

describe("defectDetection", () => {
  it("ai deep learning best defect detection", () => {
    expect(defectDetection("ai_deep_learning")).toBeGreaterThan(defectDetection("inline_2d"));
  });
});

describe("speed", () => {
  it("inline 2d fastest", () => {
    expect(speed("inline_2d")).toBeGreaterThan(speed("offline_bench"));
  });
});

describe("falseCallRate", () => {
  it("ai deep learning best false call rate", () => {
    expect(falseCallRate("ai_deep_learning")).toBeGreaterThan(falseCallRate("inline_2d"));
  });
});

describe("coverage", () => {
  it("dual side best coverage", () => {
    expect(coverage("dual_side")).toBeGreaterThan(coverage("inline_2d"));
  });
});

describe("aiCost", () => {
  it("ai deep learning most expensive", () => {
    expect(aiCost("ai_deep_learning")).toBeGreaterThan(aiCost("offline_bench"));
  });
});

describe("threeD", () => {
  it("inline 3d is three d", () => {
    expect(threeD("inline_3d")).toBe(true);
  });
  it("inline 2d not three d", () => {
    expect(threeD("inline_2d")).toBe(false);
  });
});

describe("forSolderJoint", () => {
  it("all types for solder joint", () => {
    expect(forSolderJoint("inline_2d")).toBe(true);
    expect(forSolderJoint("ai_deep_learning")).toBe(true);
  });
});

describe("imaging", () => {
  it("ai deep learning uses neural network", () => {
    expect(imaging("ai_deep_learning")).toBe("deep_learning_neural_network_adaptive_defect_classify_auto");
  });
});

describe("bestUse", () => {
  it("offline bench for first article inspection", () => {
    expect(bestUse("offline_bench")).toBe("first_article_inspection_prototype_verify_sample_audit");
  });
});

describe("aoiInspectionTypes", () => {
  it("returns 5 types", () => {
    expect(aoiInspectionTypes()).toHaveLength(5);
  });
});

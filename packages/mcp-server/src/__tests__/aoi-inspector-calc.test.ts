import { describe, it, expect } from "vitest";
import {
  defectCoverage, inspectionSpeed, falseCallRate, programTime,
  aoiCost, threeD, forSolderJoint, imaging,
  bestUse, aoiInspectorTypes,
} from "../aoi-inspector-calc.js";

describe("defectCoverage", () => {
  it("inline 3d and ai deep learning highest defect coverage", () => {
    expect(defectCoverage("inline_3d")).toBeGreaterThan(defectCoverage("inline_2d"));
    expect(defectCoverage("ai_deep_learning")).toBeGreaterThan(defectCoverage("inline_2d"));
  });
});

describe("inspectionSpeed", () => {
  it("dual lane fastest inspection", () => {
    expect(inspectionSpeed("dual_lane")).toBeGreaterThan(inspectionSpeed("offline_bench"));
  });
});

describe("falseCallRate", () => {
  it("ai deep learning best false call rate", () => {
    expect(falseCallRate("ai_deep_learning")).toBeGreaterThan(falseCallRate("inline_2d"));
  });
});

describe("programTime", () => {
  it("ai deep learning fastest program time", () => {
    expect(programTime("ai_deep_learning")).toBeGreaterThan(programTime("offline_bench"));
  });
});

describe("aoiCost", () => {
  it("ai deep learning most expensive", () => {
    expect(aoiCost("ai_deep_learning")).toBeGreaterThan(aoiCost("offline_bench"));
  });
});

describe("threeD", () => {
  it("inline 3d has 3d capability", () => {
    expect(threeD("inline_3d")).toBe(true);
  });
  it("inline 2d no 3d", () => {
    expect(threeD("inline_2d")).toBe(false);
  });
});

describe("forSolderJoint", () => {
  it("all types inspect solder joints", () => {
    expect(forSolderJoint("inline_3d")).toBe(true);
    expect(forSolderJoint("offline_bench")).toBe(true);
  });
});

describe("imaging", () => {
  it("ai deep learning uses neural net", () => {
    expect(imaging("ai_deep_learning")).toBe("deep_learning_neural_net_train_on_defect_library_adaptive");
  });
});

describe("bestUse", () => {
  it("inline 3d for automotive medical", () => {
    expect(bestUse("inline_3d")).toBe("high_reliability_automotive_medical_solder_volume_height");
  });
});

describe("aoiInspectorTypes", () => {
  it("returns 5 types", () => {
    expect(aoiInspectorTypes()).toHaveLength(5);
  });
});

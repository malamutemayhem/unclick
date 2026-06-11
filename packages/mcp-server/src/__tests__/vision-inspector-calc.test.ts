import { describe, it, expect } from "vitest";
import {
  defectDetection, throughput, fieldOfView, classAccuracy,
  viCost, volumetric, forInline, inspectorConfig,
  bestUse, visionInspectorTypes,
} from "../vision-inspector-calc.js";

describe("defectDetection", () => {
  it("deep learning vision best defect detection", () => {
    expect(defectDetection("deep_learning_vision")).toBeGreaterThan(defectDetection("2d_camera"));
  });
});

describe("throughput", () => {
  it("2d camera highest throughput", () => {
    expect(throughput("2d_camera")).toBeGreaterThan(throughput("multispectral"));
  });
});

describe("fieldOfView", () => {
  it("line scan best field of view", () => {
    expect(fieldOfView("line_scan")).toBeGreaterThan(fieldOfView("3d_structured_light"));
  });
});

describe("classAccuracy", () => {
  it("multispectral best class accuracy", () => {
    expect(classAccuracy("multispectral")).toBeGreaterThan(classAccuracy("2d_camera"));
  });
});

describe("viCost", () => {
  it("multispectral most expensive", () => {
    expect(viCost("multispectral")).toBeGreaterThan(viCost("2d_camera"));
  });
});

describe("volumetric", () => {
  it("3d structured light is volumetric", () => {
    expect(volumetric("3d_structured_light")).toBe(true);
  });
  it("2d camera not volumetric", () => {
    expect(volumetric("2d_camera")).toBe(false);
  });
});

describe("forInline", () => {
  it("2d camera for inline", () => {
    expect(forInline("2d_camera")).toBe(true);
  });
  it("3d structured light not for inline", () => {
    expect(forInline("3d_structured_light")).toBe(false);
  });
});

describe("inspectorConfig", () => {
  it("deep learning vision uses cnn model trained defect classify", () => {
    expect(inspectorConfig("deep_learning_vision")).toBe("deep_learning_vision_inspector_cnn_model_trained_defect_classify");
  });
});

describe("bestUse", () => {
  it("line scan for web inspect continuous fabric surface", () => {
    expect(bestUse("line_scan")).toBe("web_inspect_line_scan_vision_inspector_continuous_fabric_surface");
  });
});

describe("visionInspectorTypes", () => {
  it("returns 5 types", () => {
    expect(visionInspectorTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  defectDetect, throughput, falseCallRate, setupEase,
  systemCost, threeD, inline, sensorType,
  bestUse, aoiInspects,
} from "../aoi-inspect-calc.js";

describe("defectDetect", () => {
  it("ai deep learn best defect detection", () => {
    expect(defectDetect("ai_deep_learn")).toBeGreaterThan(defectDetect("desktop_benchtop"));
  });
});

describe("throughput", () => {
  it("inline 2d camera highest throughput", () => {
    expect(throughput("inline_2d_camera")).toBeGreaterThan(throughput("desktop_benchtop"));
  });
});

describe("falseCallRate", () => {
  it("ai deep learn lowest false call rate", () => {
    expect(falseCallRate("ai_deep_learn")).toBeGreaterThan(falseCallRate("desktop_benchtop"));
  });
});

describe("setupEase", () => {
  it("desktop benchtop easiest setup", () => {
    expect(setupEase("desktop_benchtop")).toBeGreaterThan(setupEase("dual_side_inline"));
  });
});

describe("systemCost", () => {
  it("ai deep learn most expensive", () => {
    expect(systemCost("ai_deep_learn")).toBeGreaterThan(systemCost("desktop_benchtop"));
  });
});

describe("threeD", () => {
  it("offline 3d laser is 3d", () => {
    expect(threeD("offline_3d_laser")).toBe(true);
  });
  it("inline 2d camera not 3d", () => {
    expect(threeD("inline_2d_camera")).toBe(false);
  });
});

describe("inline", () => {
  it("inline 2d camera is inline", () => {
    expect(inline("inline_2d_camera")).toBe(true);
  });
  it("desktop benchtop not inline", () => {
    expect(inline("desktop_benchtop")).toBe(false);
  });
});

describe("sensorType", () => {
  it("ai deep learn uses neural network vision", () => {
    expect(sensorType("ai_deep_learn")).toBe("neural_network_vision");
  });
});

describe("bestUse", () => {
  it("offline 3d laser best for solder joint height check", () => {
    expect(bestUse("offline_3d_laser")).toBe("solder_joint_height_check");
  });
});

describe("aoiInspects", () => {
  it("returns 5 types", () => {
    expect(aoiInspects()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  resolution, speed, depthPerception, lighting,
  vsCost, threeD, forDefectDetection, sensor,
  bestUse, visionSystemTypes,
} from "../vision-system-calc.js";

describe("resolution", () => {
  it("line scan web highest resolution", () => {
    expect(resolution("line_scan_web")).toBeGreaterThan(resolution("thermal_infrared"));
  });
});

describe("speed", () => {
  it("line scan web fastest", () => {
    expect(speed("line_scan_web")).toBeGreaterThan(speed("hyperspectral_imaging"));
  });
});

describe("depthPerception", () => {
  it("3d structured light best depth perception", () => {
    expect(depthPerception("3d_structured_light")).toBeGreaterThan(depthPerception("2d_area_scan"));
  });
});

describe("lighting", () => {
  it("thermal infrared best in any lighting", () => {
    expect(lighting("thermal_infrared")).toBeGreaterThan(lighting("3d_structured_light"));
  });
});

describe("vsCost", () => {
  it("hyperspectral most expensive", () => {
    expect(vsCost("hyperspectral_imaging")).toBeGreaterThan(vsCost("2d_area_scan"));
  });
});

describe("threeD", () => {
  it("3d structured light is 3d", () => {
    expect(threeD("3d_structured_light")).toBe(true);
  });
  it("2d area scan not 3d", () => {
    expect(threeD("2d_area_scan")).toBe(false);
  });
});

describe("forDefectDetection", () => {
  it("all vision systems for defect detection", () => {
    expect(forDefectDetection("2d_area_scan")).toBe(true);
    expect(forDefectDetection("line_scan_web")).toBe(true);
  });
});

describe("sensor", () => {
  it("thermal uses uncooled microbolometer", () => {
    expect(sensor("thermal_infrared")).toBe("uncooled_microbolometer_lwir_8_14um_thermal_map");
  });
});

describe("bestUse", () => {
  it("line scan for print inspection", () => {
    expect(bestUse("line_scan_web")).toBe("print_inspection_textile_defect_continuous_web_check");
  });
});

describe("visionSystemTypes", () => {
  it("returns 5 types", () => {
    expect(visionSystemTypes()).toHaveLength(5);
  });
});

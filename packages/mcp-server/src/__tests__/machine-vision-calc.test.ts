import { describe, it, expect } from "vitest";
import {
  resolution, speed, depth, flexibility,
  mvCost, color, for3d, sensor,
  bestUse, machineVisionTypes,
} from "../machine-vision-calc.js";

describe("resolution", () => {
  it("line scan highest resolution", () => {
    expect(resolution("line_scan_continuous")).toBeGreaterThan(resolution("thermal_ir_defect"));
  });
});

describe("speed", () => {
  it("line scan fastest", () => {
    expect(speed("line_scan_continuous")).toBeGreaterThan(speed("hyperspectral_nir"));
  });
});

describe("depth", () => {
  it("stereo vision best depth", () => {
    expect(depth("stereo_vision_3d")).toBeGreaterThan(depth("area_scan_ccd"));
  });
});

describe("flexibility", () => {
  it("area scan most flexible", () => {
    expect(flexibility("area_scan_ccd")).toBeGreaterThan(flexibility("hyperspectral_nir"));
  });
});

describe("mvCost", () => {
  it("hyperspectral most expensive", () => {
    expect(mvCost("hyperspectral_nir")).toBeGreaterThan(mvCost("area_scan_ccd"));
  });
});

describe("color", () => {
  it("area scan has color", () => {
    expect(color("area_scan_ccd")).toBe(true);
  });
  it("thermal IR no color", () => {
    expect(color("thermal_ir_defect")).toBe(false);
  });
});

describe("for3d", () => {
  it("stereo vision for 3D", () => {
    expect(for3d("stereo_vision_3d")).toBe(true);
  });
  it("area scan not for 3D", () => {
    expect(for3d("area_scan_ccd")).toBe(false);
  });
});

describe("sensor", () => {
  it("hyperspectral uses pushbroom spectrograph", () => {
    expect(sensor("hyperspectral_nir")).toBe("pushbroom_nir_swir_spectrograph");
  });
});

describe("bestUse", () => {
  it("line scan for web inspection", () => {
    expect(bestUse("line_scan_continuous")).toBe("web_inspection_film_paper_fabric");
  });
});

describe("machineVisionTypes", () => {
  it("returns 5 types", () => {
    expect(machineVisionTypes()).toHaveLength(5);
  });
});

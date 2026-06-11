import { describe, it, expect } from "vitest";
import {
  sensitivity, falseAlarmReject, range, response,
  fdCost, explosionProof, forOutdoor, sensor,
  bestUse, flameDetectorTypes,
} from "../flame-detector-calc.js";

describe("sensitivity", () => {
  it("triple ir most sensitive", () => {
    expect(sensitivity("triple_ir_multi")).toBeGreaterThan(sensitivity("ir_single_band"));
  });
});

describe("falseAlarmReject", () => {
  it("triple ir best false alarm rejection", () => {
    expect(falseAlarmReject("triple_ir_multi")).toBeGreaterThan(falseAlarmReject("uv_single_band"));
  });
});

describe("range", () => {
  it("triple ir longest range", () => {
    expect(range("triple_ir_multi")).toBeGreaterThan(range("uv_single_band"));
  });
});

describe("response", () => {
  it("uv single band fastest response", () => {
    expect(response("uv_single_band")).toBeGreaterThan(response("visual_flame_imaging"));
  });
});

describe("fdCost", () => {
  it("visual flame imaging most expensive", () => {
    expect(fdCost("visual_flame_imaging")).toBeGreaterThan(fdCost("uv_single_band"));
  });
});

describe("explosionProof", () => {
  it("all flame detectors are explosion proof", () => {
    expect(explosionProof("uv_single_band")).toBe(true);
    expect(explosionProof("triple_ir_multi")).toBe(true);
  });
});

describe("forOutdoor", () => {
  it("triple ir for outdoor", () => {
    expect(forOutdoor("triple_ir_multi")).toBe(true);
  });
  it("uv single not for outdoor", () => {
    expect(forOutdoor("uv_single_band")).toBe(false);
  });
});

describe("sensor", () => {
  it("triple ir uses three wavelength ratio", () => {
    expect(sensor("triple_ir_multi")).toBe("three_ir_wavelength_ratio_algorithm");
  });
});

describe("bestUse", () => {
  it("uv ir combo for refinery", () => {
    expect(bestUse("uv_ir_combo")).toBe("refinery_chemical_plant_general_purpose");
  });
});

describe("flameDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(flameDetectorTypes()).toHaveLength(5);
  });
});

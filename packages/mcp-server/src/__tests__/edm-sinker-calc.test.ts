import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, accuracy, depthControl,
  esCost, automated, forMicro, sinkerConfig,
  bestUse, edmSinkerTypes,
} from "../edm-sinker-calc.js";

describe("surfaceFinish", () => {
  it("micro edm best surface finish", () => {
    expect(surfaceFinish("micro_edm")).toBeGreaterThan(surfaceFinish("conventional_sinker"));
  });
});

describe("throughput", () => {
  it("cnc sinker highest throughput", () => {
    expect(throughput("cnc_sinker")).toBeGreaterThan(throughput("micro_edm"));
  });
});

describe("accuracy", () => {
  it("micro edm best accuracy", () => {
    expect(accuracy("micro_edm")).toBeGreaterThan(accuracy("conventional_sinker"));
  });
});

describe("depthControl", () => {
  it("micro edm best depth control", () => {
    expect(depthControl("micro_edm")).toBeGreaterThan(depthControl("conventional_sinker"));
  });
});

describe("esCost", () => {
  it("micro edm most expensive", () => {
    expect(esCost("micro_edm")).toBeGreaterThan(esCost("conventional_sinker"));
  });
});

describe("automated", () => {
  it("cnc sinker is automated", () => {
    expect(automated("cnc_sinker")).toBe(true);
  });
  it("conventional sinker not automated", () => {
    expect(automated("conventional_sinker")).toBe(false);
  });
});

describe("forMicro", () => {
  it("micro edm for micro", () => {
    expect(forMicro("micro_edm")).toBe(true);
  });
  it("cnc sinker not for micro", () => {
    expect(forMicro("cnc_sinker")).toBe(false);
  });
});

describe("sinkerConfig", () => {
  it("powder mixed uses silicon additive dielectric nano finish", () => {
    expect(sinkerConfig("powder_mixed")).toBe("powder_mixed_edm_sinker_silicon_additive_dielectric_nano_finish");
  });
});

describe("bestUse", () => {
  it("cnc sinker for complex die multi axis electrode change auto", () => {
    expect(bestUse("cnc_sinker")).toBe("complex_die_cnc_edm_sinker_multi_axis_electrode_change_auto");
  });
});

describe("edmSinkerTypes", () => {
  it("returns 5 types", () => {
    expect(edmSinkerTypes()).toHaveLength(5);
  });
});

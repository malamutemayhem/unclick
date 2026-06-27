import { describe, it, expect } from "vitest";
import {
  resolution, throughput, overlay, defectControl,
  wsCost, immersion, forAdvanced, stepperConfig,
  bestUse, waferStepperTypes,
} from "../wafer-stepper-calc.js";

describe("resolution", () => {
  it("euv lithography best resolution", () => {
    expect(resolution("euv_lithography")).toBeGreaterThan(resolution("i_line_stepper"));
  });
});

describe("throughput", () => {
  it("arf immersion high throughput", () => {
    expect(throughput("arf_immersion")).toBeGreaterThan(throughput("nanoimprint"));
  });
});

describe("overlay", () => {
  it("euv lithography best overlay", () => {
    expect(overlay("euv_lithography")).toBeGreaterThan(overlay("i_line_stepper"));
  });
});

describe("defectControl", () => {
  it("euv lithography best defect control", () => {
    expect(defectControl("euv_lithography")).toBeGreaterThan(defectControl("nanoimprint"));
  });
});

describe("wsCost", () => {
  it("euv lithography most expensive", () => {
    expect(wsCost("euv_lithography")).toBeGreaterThan(wsCost("i_line_stepper"));
  });
});

describe("immersion", () => {
  it("arf immersion uses immersion", () => {
    expect(immersion("arf_immersion")).toBe(true);
  });
  it("euv lithography no immersion", () => {
    expect(immersion("euv_lithography")).toBe(false);
  });
});

describe("forAdvanced", () => {
  it("euv lithography for advanced nodes", () => {
    expect(forAdvanced("euv_lithography")).toBe(true);
  });
  it("i line stepper not for advanced", () => {
    expect(forAdvanced("i_line_stepper")).toBe(false);
  });
});

describe("stepperConfig", () => {
  it("nanoimprint uses template uv cure", () => {
    expect(stepperConfig("nanoimprint")).toBe("nanoimprint_template_uv_cure_resist_pattern_transfer_contact");
  });
});

describe("bestUse", () => {
  it("krf scanner for mid node logic memory", () => {
    expect(bestUse("krf_scanner")).toBe("mid_node_logic_memory_krf_248nm_scanner_critical_layer_litho");
  });
});

describe("waferStepperTypes", () => {
  it("returns 5 types", () => {
    expect(waferStepperTypes()).toHaveLength(5);
  });
});

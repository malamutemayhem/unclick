import { describe, it, expect } from "vitest";
import {
  partStrength, throughput, surfaceFinish, packingDensity,
  slCost, supportFree, forFunctional, printerConfig,
  bestUse, slsPrinterTypes,
} from "../sls-printer-calc.js";

describe("partStrength", () => {
  it("glass filled sls best part strength", () => {
    expect(partStrength("glass_filled_sls")).toBeGreaterThan(partStrength("tpu_sls"));
  });
});

describe("throughput", () => {
  it("multi jet fusion highest throughput", () => {
    expect(throughput("multi_jet_fusion")).toBeGreaterThan(throughput("tpu_sls"));
  });
});

describe("surfaceFinish", () => {
  it("multi jet fusion best surface finish", () => {
    expect(surfaceFinish("multi_jet_fusion")).toBeGreaterThan(surfaceFinish("glass_filled_sls"));
  });
});

describe("packingDensity", () => {
  it("multi jet fusion best packing density", () => {
    expect(packingDensity("multi_jet_fusion")).toBeGreaterThan(packingDensity("tpu_sls"));
  });
});

describe("slCost", () => {
  it("tpu sls most expensive", () => {
    expect(slCost("tpu_sls")).toBeGreaterThan(slCost("high_speed_sinter"));
  });
});

describe("supportFree", () => {
  it("nylon sls is support free", () => {
    expect(supportFree("nylon_sls")).toBe(true);
  });
});

describe("forFunctional", () => {
  it("nylon sls for functional", () => {
    expect(forFunctional("nylon_sls")).toBe(true);
  });
  it("high speed sinter not for functional", () => {
    expect(forFunctional("high_speed_sinter")).toBe(false);
  });
});

describe("printerConfig", () => {
  it("multi jet fusion uses inkjet fusing agent ir lamp fast layer", () => {
    expect(printerConfig("multi_jet_fusion")).toBe("multi_jet_fusion_printer_inkjet_fusing_agent_ir_lamp_fast_layer");
  });
});

describe("bestUse", () => {
  it("nylon sls for functional proto pa12 strong snap fit hinge", () => {
    expect(bestUse("nylon_sls")).toBe("functional_proto_nylon_sls_printer_pa12_strong_snap_fit_hinge");
  });
});

describe("slsPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(slsPrinterTypes()).toHaveLength(5);
  });
});

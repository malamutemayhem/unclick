import { describe, it, expect } from "vitest";
import {
  voxelResolution, throughput, penetration, scanVolume,
  ctCost_, realTime, forAmQuality, scannerConfig,
  bestUse, ctScannerTypes,
} from "../ct-scanner-calc.js";

describe("voxelResolution", () => {
  it("nano ct best voxel resolution", () => {
    expect(voxelResolution("nano_ct")).toBeGreaterThan(voxelResolution("inline_ct"));
  });
});

describe("throughput", () => {
  it("inline ct highest throughput", () => {
    expect(throughput("inline_ct")).toBeGreaterThan(throughput("nano_ct"));
  });
});

describe("penetration", () => {
  it("industrial ct best penetration", () => {
    expect(penetration("industrial_ct")).toBeGreaterThan(penetration("nano_ct"));
  });
});

describe("scanVolume", () => {
  it("industrial ct best scan volume", () => {
    expect(scanVolume("industrial_ct")).toBeGreaterThan(scanVolume("nano_ct"));
  });
});

describe("ctCost_", () => {
  it("nano ct most expensive", () => {
    expect(ctCost_("nano_ct")).toBeGreaterThan(ctCost_("micro_ct"));
  });
});

describe("realTime", () => {
  it("inline ct is real time", () => {
    expect(realTime("inline_ct")).toBe(true);
  });
  it("micro ct not real time", () => {
    expect(realTime("micro_ct")).toBe(false);
  });
});

describe("forAmQuality", () => {
  it("micro ct for am quality", () => {
    expect(forAmQuality("micro_ct")).toBe(true);
  });
  it("nano ct not for am quality", () => {
    expect(forAmQuality("nano_ct")).toBe(false);
  });
});

describe("scannerConfig", () => {
  it("dual energy ct uses two voltage material discriminate density", () => {
    expect(scannerConfig("dual_energy_ct")).toBe("dual_energy_ct_scanner_two_voltage_material_discriminate_density");
  });
});

describe("bestUse", () => {
  it("inline ct for production line 100 percent inspect auto reject", () => {
    expect(bestUse("inline_ct")).toBe("production_line_inline_ct_scanner_100_percent_inspect_auto_reject");
  });
});

describe("ctScannerTypes", () => {
  it("returns 5 types", () => {
    expect(ctScannerTypes()).toHaveLength(5);
  });
});

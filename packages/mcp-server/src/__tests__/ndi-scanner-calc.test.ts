import { describe, it, expect } from "vitest";
import {
  defectResolution, throughput, depthRange, areaRate,
  ndCost, contactFree, forInService, scannerConfig,
  bestUse, ndiScannerTypes,
} from "../ndi-scanner-calc.js";

describe("defectResolution", () => {
  it("phased array ut best defect resolution", () => {
    expect(defectResolution("phased_array_ut")).toBeGreaterThan(defectResolution("tap_test_digital"));
  });
});

describe("throughput", () => {
  it("thermography flash highest throughput", () => {
    expect(throughput("thermography_flash")).toBeGreaterThan(throughput("xray_ct_scan"));
  });
});

describe("depthRange", () => {
  it("phased array ut best depth range", () => {
    expect(depthRange("phased_array_ut")).toBeGreaterThan(depthRange("tap_test_digital"));
  });
});

describe("areaRate", () => {
  it("thermography flash best area rate", () => {
    expect(areaRate("thermography_flash")).toBeGreaterThan(areaRate("xray_ct_scan"));
  });
});

describe("ndCost", () => {
  it("xray ct scan most expensive", () => {
    expect(ndCost("xray_ct_scan")).toBeGreaterThan(ndCost("tap_test_digital"));
  });
});

describe("contactFree", () => {
  it("thermography flash is contact free", () => {
    expect(contactFree("thermography_flash")).toBe(true);
  });
  it("phased array ut not contact free", () => {
    expect(contactFree("phased_array_ut")).toBe(false);
  });
});

describe("forInService", () => {
  it("phased array ut for in service", () => {
    expect(forInService("phased_array_ut")).toBe(true);
  });
  it("xray ct scan not for in service", () => {
    expect(forInService("xray_ct_scan")).toBe(false);
  });
});

describe("scannerConfig", () => {
  it("shearography laser uses speckle pattern vacuum stress", () => {
    expect(scannerConfig("shearography_laser")).toBe("shearography_laser_ndi_scanner_speckle_pattern_vacuum_stress");
  });
});

describe("bestUse", () => {
  it("thermography flash for large panel fast area scan bond", () => {
    expect(bestUse("thermography_flash")).toBe("large_panel_thermography_flash_ndi_scanner_fast_area_scan_bond");
  });
});

describe("ndiScannerTypes", () => {
  it("returns 5 types", () => {
    expect(ndiScannerTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  partDensity, throughput, surfaceFinish, resolution,
  dmCost, multiBeam, forAerospace, printerConfig,
  bestUse, dmlsPrinterTypes,
} from "../dmls-printer-calc.js";

describe("partDensity", () => {
  it("single laser best part density", () => {
    expect(partDensity("single_laser")).toBeGreaterThan(partDensity("large_format_dmls"));
  });
});

describe("throughput", () => {
  it("multi laser highest throughput", () => {
    expect(throughput("multi_laser")).toBeGreaterThan(throughput("micro_dmls"));
  });
});

describe("surfaceFinish", () => {
  it("micro dmls best surface finish", () => {
    expect(surfaceFinish("micro_dmls")).toBeGreaterThan(surfaceFinish("large_format_dmls"));
  });
});

describe("resolution", () => {
  it("micro dmls best resolution", () => {
    expect(resolution("micro_dmls")).toBeGreaterThan(resolution("multi_laser"));
  });
});

describe("dmCost", () => {
  it("multi laser most expensive", () => {
    expect(dmCost("multi_laser")).toBeGreaterThan(dmCost("single_laser"));
  });
});

describe("multiBeam", () => {
  it("multi laser is multi beam", () => {
    expect(multiBeam("multi_laser")).toBe(true);
  });
  it("single laser not multi beam", () => {
    expect(multiBeam("single_laser")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("single laser for aerospace", () => {
    expect(forAerospace("single_laser")).toBe(true);
  });
  it("green laser not for aerospace", () => {
    expect(forAerospace("green_laser")).toBe(false);
  });
});

describe("printerConfig", () => {
  it("green laser uses 532nm copper reflective alloy process", () => {
    expect(printerConfig("green_laser")).toBe("green_laser_dmls_printer_532nm_copper_reflective_alloy_process");
  });
});

describe("bestUse", () => {
  it("single laser for turbine blade inconel internal cool", () => {
    expect(bestUse("single_laser")).toBe("turbine_blade_single_laser_dmls_printer_inconel_internal_cool");
  });
});

describe("dmlsPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(dmlsPrinterTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  partDensity, throughput, residualStress, buildRate,
  ebCost, vacuumProcess, forTitanium, printerConfig,
  bestUse, ebmPrinterTypes,
} from "../ebm-printer-calc.js";

describe("partDensity", () => {
  it("standard ebm best part density", () => {
    expect(partDensity("standard_ebm")).toBeGreaterThan(partDensity("wire_feed_ebm"));
  });
});

describe("throughput", () => {
  it("multi beam ebm highest throughput", () => {
    expect(throughput("multi_beam_ebm")).toBeGreaterThan(throughput("high_preheat_ebm"));
  });
});

describe("residualStress", () => {
  it("multi beam ebm best residual stress", () => {
    expect(residualStress("multi_beam_ebm")).toBeGreaterThan(residualStress("wire_feed_ebm"));
  });
});

describe("buildRate", () => {
  it("wire feed ebm best build rate", () => {
    expect(buildRate("wire_feed_ebm")).toBeGreaterThan(buildRate("high_preheat_ebm"));
  });
});

describe("ebCost", () => {
  it("multi beam ebm most expensive", () => {
    expect(ebCost("multi_beam_ebm")).toBeGreaterThan(ebCost("wire_feed_ebm"));
  });
});

describe("vacuumProcess", () => {
  it("standard ebm is vacuum process", () => {
    expect(vacuumProcess("standard_ebm")).toBe(true);
  });
});

describe("forTitanium", () => {
  it("standard ebm for titanium", () => {
    expect(forTitanium("standard_ebm")).toBe(true);
  });
  it("high preheat ebm not for titanium", () => {
    expect(forTitanium("high_preheat_ebm")).toBe(false);
  });
});

describe("printerConfig", () => {
  it("wire feed ebm uses wire spool beam melt near net shape large", () => {
    expect(printerConfig("wire_feed_ebm")).toBe("wire_feed_ebm_printer_wire_spool_beam_melt_near_net_shape_large");
  });
});

describe("bestUse", () => {
  it("standard ebm for hip implant titanium porous lattice bone", () => {
    expect(bestUse("standard_ebm")).toBe("hip_implant_standard_ebm_printer_titanium_porous_lattice_bone");
  });
});

describe("ebmPrinterTypes", () => {
  it("returns 5 types", () => {
    expect(ebmPrinterTypes()).toHaveLength(5);
  });
});

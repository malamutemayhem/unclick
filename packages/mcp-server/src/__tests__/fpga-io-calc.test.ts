import { describe, it, expect } from "vitest";
import {
  dataRate, powerDraw, noiseMargin, pinCount,
  ioCost, differential, forMemory, voltage,
  bestUse, fpgaIos,
} from "../fpga-io-calc.js";

describe("dataRate", () => {
  it("lvpecl clock highest data rate", () => {
    expect(dataRate("lvpecl_clock")).toBeGreaterThan(dataRate("lvcmos_single"));
  });
});

describe("powerDraw", () => {
  it("lvpecl clock highest power draw", () => {
    expect(powerDraw("lvpecl_clock")).toBeGreaterThan(powerDraw("mipi_dphy_csi"));
  });
});

describe("noiseMargin", () => {
  it("lvds diff pair best noise margin", () => {
    expect(noiseMargin("lvds_diff_pair")).toBeGreaterThan(noiseMargin("lvcmos_single"));
  });
});

describe("pinCount", () => {
  it("hstl ddr highest pin count", () => {
    expect(pinCount("hstl_ddr")).toBeGreaterThan(pinCount("lvcmos_single"));
  });
});

describe("ioCost", () => {
  it("hstl ddr most expensive", () => {
    expect(ioCost("hstl_ddr")).toBeGreaterThan(ioCost("lvcmos_single"));
  });
});

describe("differential", () => {
  it("lvds diff pair is differential", () => {
    expect(differential("lvds_diff_pair")).toBe(true);
  });
  it("lvcmos single not differential", () => {
    expect(differential("lvcmos_single")).toBe(false);
  });
});

describe("forMemory", () => {
  it("hstl ddr is for memory", () => {
    expect(forMemory("hstl_ddr")).toBe(true);
  });
  it("lvds diff pair not for memory", () => {
    expect(forMemory("lvds_diff_pair")).toBe(false);
  });
});

describe("voltage", () => {
  it("lvds diff pair uses 1v2 350mv swing", () => {
    expect(voltage("lvds_diff_pair")).toBe("1v2_350mv_swing");
  });
});

describe("bestUse", () => {
  it("hstl ddr best for ddr4 memory interface", () => {
    expect(bestUse("hstl_ddr")).toBe("ddr4_memory_interface");
  });
});

describe("fpgaIos", () => {
  it("returns 5 types", () => {
    expect(fpgaIos()).toHaveLength(5);
  });
});

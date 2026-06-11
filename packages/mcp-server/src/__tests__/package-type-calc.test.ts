import { describe, it, expect } from "vitest";
import {
  ioCount, thermal, electrical, formFactor,
  pkgCost, reworkable, forHpc, interconnect,
  bestUse, packageTypes,
} from "../package-type-calc.js";

describe("ioCount", () => {
  it("chiplet 2.5d interposer highest io count", () => {
    expect(ioCount("chiplet_2_5d_interposer")).toBeGreaterThan(ioCount("qfn_leadless"));
  });
});

describe("thermal", () => {
  it("fcbga flip chip best thermal", () => {
    expect(thermal("fcbga_flip_chip")).toBeGreaterThan(thermal("wlcsp_wafer_level"));
  });
});

describe("electrical", () => {
  it("chiplet 2.5d interposer best electrical", () => {
    expect(electrical("chiplet_2_5d_interposer")).toBeGreaterThan(electrical("qfn_leadless"));
  });
});

describe("formFactor", () => {
  it("wlcsp wafer level smallest form factor", () => {
    expect(formFactor("wlcsp_wafer_level")).toBeGreaterThan(formFactor("chiplet_2_5d_interposer"));
  });
});

describe("pkgCost", () => {
  it("chiplet 2.5d interposer most expensive", () => {
    expect(pkgCost("chiplet_2_5d_interposer")).toBeGreaterThan(pkgCost("qfn_leadless"));
  });
});

describe("reworkable", () => {
  it("bga ball grid is reworkable", () => {
    expect(reworkable("bga_ball_grid")).toBe(true);
  });
  it("wlcsp wafer level not reworkable", () => {
    expect(reworkable("wlcsp_wafer_level")).toBe(false);
  });
});

describe("forHpc", () => {
  it("fcbga flip chip for hpc", () => {
    expect(forHpc("fcbga_flip_chip")).toBe(true);
  });
  it("qfn leadless not for hpc", () => {
    expect(forHpc("qfn_leadless")).toBe(false);
  });
});

describe("interconnect", () => {
  it("chiplet 2.5d interposer uses silicon interposer microbump", () => {
    expect(interconnect("chiplet_2_5d_interposer")).toBe("silicon_interposer_microbump");
  });
});

describe("bestUse", () => {
  it("wlcsp wafer level best for mobile pmic sensor", () => {
    expect(bestUse("wlcsp_wafer_level")).toBe("mobile_pmic_sensor");
  });
});

describe("packageTypes", () => {
  it("returns 5 types", () => {
    expect(packageTypes()).toHaveLength(5);
  });
});

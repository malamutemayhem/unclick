import { describe, it, expect } from "vitest";
import {
  density, thermal, reliability, reworkability,
  bgCost, finePitch, forMobile, substrate,
  bestUse, bgaTypes,
} from "../bga-type-calc.js";

describe("density", () => {
  it("wlcsp highest density", () => {
    expect(density("wlcsp_wafer_level")).toBeGreaterThan(density("pbga_plastic_laminate"));
  });
});

describe("thermal", () => {
  it("cbga ceramic best thermal", () => {
    expect(thermal("cbga_ceramic_column")).toBeGreaterThan(thermal("pop_package_on_package"));
  });
});

describe("reliability", () => {
  it("cbga ceramic most reliable", () => {
    expect(reliability("cbga_ceramic_column")).toBeGreaterThan(reliability("wlcsp_wafer_level"));
  });
});

describe("reworkability", () => {
  it("pbga most reworkable", () => {
    expect(reworkability("pbga_plastic_laminate")).toBeGreaterThan(reworkability("pop_package_on_package"));
  });
});

describe("bgCost", () => {
  it("cbga ceramic most expensive", () => {
    expect(bgCost("cbga_ceramic_column")).toBeGreaterThan(bgCost("wlcsp_wafer_level"));
  });
});

describe("finePitch", () => {
  it("fcbga is fine pitch", () => {
    expect(finePitch("fcbga_flip_chip")).toBe(true);
  });
  it("pbga not fine pitch", () => {
    expect(finePitch("pbga_plastic_laminate")).toBe(false);
  });
});

describe("forMobile", () => {
  it("wlcsp for mobile", () => {
    expect(forMobile("wlcsp_wafer_level")).toBe(true);
  });
  it("fcbga not for mobile", () => {
    expect(forMobile("fcbga_flip_chip")).toBe(false);
  });
});

describe("substrate", () => {
  it("cbga uses htcc alumina ceramic", () => {
    expect(substrate("cbga_ceramic_column")).toBe("htcc_alumina_ceramic");
  });
});

describe("bestUse", () => {
  it("fcbga best for server cpu", () => {
    expect(bestUse("fcbga_flip_chip")).toBe("server_cpu_high_io_count");
  });
});

describe("bgaTypes", () => {
  it("returns 5 types", () => {
    expect(bgaTypes()).toHaveLength(5);
  });
});

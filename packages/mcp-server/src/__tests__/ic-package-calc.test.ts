import { describe, it, expect } from "vitest";
import {
  pinCount, thermalPerf, signalIntegrity, boardArea,
  packageCost, leadless, forHighSpeed, mountStyle,
  bestUse, icPackages,
} from "../ic-package-calc.js";

describe("pinCount", () => {
  it("bga ball grid highest pin count", () => {
    expect(pinCount("bga_ball_grid")).toBeGreaterThan(pinCount("soic_small_outline"));
  });
});

describe("thermalPerf", () => {
  it("bga ball grid best thermal perf", () => {
    expect(thermalPerf("bga_ball_grid")).toBeGreaterThan(thermalPerf("soic_small_outline"));
  });
});

describe("signalIntegrity", () => {
  it("wlcsp wafer level best signal integrity", () => {
    expect(signalIntegrity("wlcsp_wafer_level")).toBeGreaterThan(signalIntegrity("qfp_quad_flat"));
  });
});

describe("boardArea", () => {
  it("wlcsp wafer level best board area efficiency", () => {
    expect(boardArea("wlcsp_wafer_level")).toBeGreaterThan(boardArea("soic_small_outline"));
  });
});

describe("packageCost", () => {
  it("wlcsp wafer level most expensive", () => {
    expect(packageCost("wlcsp_wafer_level")).toBeGreaterThan(packageCost("soic_small_outline"));
  });
});

describe("leadless", () => {
  it("bga ball grid is leadless", () => {
    expect(leadless("bga_ball_grid")).toBe(true);
  });
  it("qfp quad flat not leadless", () => {
    expect(leadless("qfp_quad_flat")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("bga ball grid is for high speed", () => {
    expect(forHighSpeed("bga_ball_grid")).toBe(true);
  });
  it("soic small outline not for high speed", () => {
    expect(forHighSpeed("soic_small_outline")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("wlcsp wafer level uses direct die bump", () => {
    expect(mountStyle("wlcsp_wafer_level")).toBe("direct_die_bump");
  });
});

describe("bestUse", () => {
  it("qfn quad flat no best for compact power ic", () => {
    expect(bestUse("qfn_quad_flat_no")).toBe("compact_power_ic");
  });
});

describe("icPackages", () => {
  it("returns 5 types", () => {
    expect(icPackages()).toHaveLength(5);
  });
});

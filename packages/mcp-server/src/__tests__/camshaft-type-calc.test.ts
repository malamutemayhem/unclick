import { describe, it, expect } from "vitest";
import {
  revLimit, valvetrain, complexity, efficiency,
  cmCost, variableTiming, forPerformance, drive,
  bestUse, camshaftTypes,
} from "../camshaft-type-calc.js";

describe("revLimit", () => {
  it("desmodromic highest rev limit", () => {
    expect(revLimit("desmodromic_positive_close")).toBeGreaterThan(revLimit("ohv_pushrod_in_block"));
  });
});

describe("valvetrain", () => {
  it("desmodromic best valvetrain", () => {
    expect(valvetrain("desmodromic_positive_close")).toBeGreaterThan(valvetrain("sohc_single_overhead"));
  });
});

describe("complexity", () => {
  it("desmodromic most complex", () => {
    expect(complexity("desmodromic_positive_close")).toBeGreaterThan(complexity("ohv_pushrod_in_block"));
  });
});

describe("efficiency", () => {
  it("vvt most efficient", () => {
    expect(efficiency("vvt_variable_valve_timing")).toBeGreaterThan(efficiency("ohv_pushrod_in_block"));
  });
});

describe("cmCost", () => {
  it("desmodromic most expensive", () => {
    expect(cmCost("desmodromic_positive_close")).toBeGreaterThan(cmCost("ohv_pushrod_in_block"));
  });
});

describe("variableTiming", () => {
  it("vvt has variable timing", () => {
    expect(variableTiming("vvt_variable_valve_timing")).toBe(true);
  });
  it("dohc no variable timing", () => {
    expect(variableTiming("dohc_dual_overhead")).toBe(false);
  });
});

describe("forPerformance", () => {
  it("dohc for performance", () => {
    expect(forPerformance("dohc_dual_overhead")).toBe(true);
  });
  it("ohv not for performance", () => {
    expect(forPerformance("ohv_pushrod_in_block")).toBe(false);
  });
});

describe("drive", () => {
  it("desmodromic uses twin cam closing rocker", () => {
    expect(drive("desmodromic_positive_close")).toBe("twin_cam_closing_rocker_no_spring");
  });
});

describe("bestUse", () => {
  it("ohv for v8 truck compact", () => {
    expect(bestUse("ohv_pushrod_in_block")).toBe("v8_truck_compact_low_profile");
  });
});

describe("camshaftTypes", () => {
  it("returns 5 types", () => {
    expect(camshaftTypes()).toHaveLength(5);
  });
});

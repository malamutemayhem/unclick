import { describe, it, expect } from "vitest";
import {
  lowFreq, highFreq, power, dispersion,
  sdCost, fullRange, forStudio, diaphragm,
  bestUse, speakerDriverTypes,
} from "../speaker-driver-calc.js";

describe("lowFreq", () => {
  it("woofer best low frequency", () => {
    expect(lowFreq("woofer_cone_dynamic")).toBeGreaterThan(lowFreq("tweeter_dome_silk"));
  });
});

describe("highFreq", () => {
  it("tweeter best high frequency", () => {
    expect(highFreq("tweeter_dome_silk")).toBeGreaterThan(highFreq("woofer_cone_dynamic"));
  });
});

describe("power", () => {
  it("woofer highest power", () => {
    expect(power("woofer_cone_dynamic")).toBeGreaterThan(power("tweeter_dome_silk"));
  });
});

describe("dispersion", () => {
  it("tweeter best dispersion", () => {
    expect(dispersion("tweeter_dome_silk")).toBeGreaterThan(dispersion("planar_magnetic_ribbon"));
  });
});

describe("sdCost", () => {
  it("planar most expensive", () => {
    expect(sdCost("planar_magnetic_ribbon")).toBeGreaterThan(sdCost("woofer_cone_dynamic"));
  });
});

describe("fullRange", () => {
  it("coaxial is full range", () => {
    expect(fullRange("coaxial_dual_concentric")).toBe(true);
  });
  it("woofer not full range", () => {
    expect(fullRange("woofer_cone_dynamic")).toBe(false);
  });
});

describe("forStudio", () => {
  it("tweeter for studio", () => {
    expect(forStudio("tweeter_dome_silk")).toBe(true);
  });
  it("woofer not for studio", () => {
    expect(forStudio("woofer_cone_dynamic")).toBe(false);
  });
});

describe("diaphragm", () => {
  it("planar uses thin film etched", () => {
    expect(diaphragm("planar_magnetic_ribbon")).toBe("thin_film_etched_conductor");
  });
});

describe("bestUse", () => {
  it("coaxial for point source monitor", () => {
    expect(bestUse("coaxial_dual_concentric")).toBe("point_source_monitor_pa_install");
  });
});

describe("speakerDriverTypes", () => {
  it("returns 5 types", () => {
    expect(speakerDriverTypes()).toHaveLength(5);
  });
});

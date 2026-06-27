import { describe, it, expect } from "vitest";
import {
  resolution, throughput, accuracy, nonDestructive,
  metCost, inline, forEuv, technique,
  bestUse, ocdMetrologies,
} from "../ocd-metrology-calc.js";

describe("resolution", () => {
  it("afm 3d profile highest resolution", () => {
    expect(resolution("afm_3d_profile")).toBeGreaterThan(resolution("spectroscopic_ellipsometry"));
  });
});

describe("throughput", () => {
  it("spectroscopic ellipsometry highest throughput", () => {
    expect(throughput("spectroscopic_ellipsometry")).toBeGreaterThan(throughput("afm_3d_profile"));
  });
});

describe("accuracy", () => {
  it("afm 3d profile highest accuracy", () => {
    expect(accuracy("afm_3d_profile")).toBeGreaterThan(accuracy("cd_sem_topdown"));
  });
});

describe("nonDestructive", () => {
  it("spectroscopic ellipsometry most non-destructive", () => {
    expect(nonDestructive("spectroscopic_ellipsometry")).toBeGreaterThan(nonDestructive("afm_3d_profile"));
  });
});

describe("metCost", () => {
  it("afm 3d profile most expensive", () => {
    expect(metCost("afm_3d_profile")).toBeGreaterThan(metCost("spectroscopic_ellipsometry"));
  });
});

describe("inline", () => {
  it("scatterometry ocd is inline", () => {
    expect(inline("scatterometry_ocd")).toBe(true);
  });
  it("afm 3d profile not inline", () => {
    expect(inline("afm_3d_profile")).toBe(false);
  });
});

describe("forEuv", () => {
  it("cd sem topdown for euv", () => {
    expect(forEuv("cd_sem_topdown")).toBe(true);
  });
  it("afm 3d profile not for euv", () => {
    expect(forEuv("afm_3d_profile")).toBe(false);
  });
});

describe("technique", () => {
  it("afm 3d profile uses tip scan surface force", () => {
    expect(technique("afm_3d_profile")).toBe("tip_scan_surface_force");
  });
});

describe("bestUse", () => {
  it("scatterometry ocd best for line cd profile shape", () => {
    expect(bestUse("scatterometry_ocd")).toBe("line_cd_profile_shape");
  });
});

describe("ocdMetrologies", () => {
  it("returns 5 types", () => {
    expect(ocdMetrologies()).toHaveLength(5);
  });
});

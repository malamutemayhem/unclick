import { describe, it, expect } from "vitest";
import {
  resolution, throughput, scanArea, verticalRange,
  pfCost, nonContact, forNano, profConfig,
  bestUse, profilometerTypes,
} from "../profilometer-calc.js";

describe("resolution", () => {
  it("afm best resolution", () => {
    expect(resolution("afm_profiler")).toBeGreaterThan(resolution("contact_stylus"));
  });
});

describe("throughput", () => {
  it("laser triangulation highest throughput", () => {
    expect(throughput("laser_triangulation")).toBeGreaterThan(throughput("afm_profiler"));
  });
});

describe("scanArea", () => {
  it("laser triangulation best scan area", () => {
    expect(scanArea("laser_triangulation")).toBeGreaterThan(scanArea("afm_profiler"));
  });
});

describe("verticalRange", () => {
  it("laser triangulation best vertical range", () => {
    expect(verticalRange("laser_triangulation")).toBeGreaterThan(verticalRange("afm_profiler"));
  });
});

describe("pfCost", () => {
  it("afm most expensive", () => {
    expect(pfCost("afm_profiler")).toBeGreaterThan(pfCost("laser_triangulation"));
  });
});

describe("nonContact", () => {
  it("optical confocal is non contact", () => {
    expect(nonContact("optical_confocal")).toBe(true);
  });
  it("contact stylus not non contact", () => {
    expect(nonContact("contact_stylus")).toBe(false);
  });
});

describe("forNano", () => {
  it("afm for nano", () => {
    expect(forNano("afm_profiler")).toBe(true);
  });
  it("laser triangulation not for nano", () => {
    expect(forNano("laser_triangulation")).toBe(false);
  });
});

describe("profConfig", () => {
  it("white light uses sub nm step height", () => {
    expect(profConfig("white_light_int")).toBe("white_light_interferometric_profilometer_sub_nm_step_height");
  });
});

describe("bestUse", () => {
  it("afm for nano surface sub angstrom resolve", () => {
    expect(bestUse("afm_profiler")).toBe("nano_surface_afm_profilometer_atomic_force_sub_angstrom_resolve");
  });
});

describe("profilometerTypes", () => {
  it("returns 5 types", () => {
    expect(profilometerTypes()).toHaveLength(5);
  });
});

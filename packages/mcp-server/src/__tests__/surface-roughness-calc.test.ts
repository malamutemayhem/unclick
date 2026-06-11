import { describe, it, expect } from "vitest";
import {
  resolution, measureRange, speed, portability,
  srCost, nonContact, forShopFloor, principle,
  bestUse, surfaceRoughnessTypes,
} from "../surface-roughness-calc.js";

describe("resolution", () => {
  it("optical interferometer highest resolution", () => {
    expect(resolution("optical_interferometer")).toBeGreaterThan(resolution("portable_handheld"));
  });
});

describe("measureRange", () => {
  it("contact stylus probe widest measure range", () => {
    expect(measureRange("contact_stylus_probe")).toBeGreaterThan(measureRange("afm_atomic_force"));
  });
});

describe("speed", () => {
  it("portable handheld fastest", () => {
    expect(speed("portable_handheld")).toBeGreaterThanOrEqual(speed("optical_interferometer"));
  });
});

describe("portability", () => {
  it("portable handheld most portable", () => {
    expect(portability("portable_handheld")).toBeGreaterThan(portability("afm_atomic_force"));
  });
});

describe("srCost", () => {
  it("afm atomic force most expensive", () => {
    expect(srCost("afm_atomic_force")).toBeGreaterThan(srCost("portable_handheld"));
  });
});

describe("nonContact", () => {
  it("optical interferometer is non contact", () => {
    expect(nonContact("optical_interferometer")).toBe(true);
  });
  it("contact stylus probe not non contact", () => {
    expect(nonContact("contact_stylus_probe")).toBe(false);
  });
});

describe("forShopFloor", () => {
  it("portable handheld for shop floor", () => {
    expect(forShopFloor("portable_handheld")).toBe(true);
  });
  it("afm atomic force not for shop floor", () => {
    expect(forShopFloor("afm_atomic_force")).toBe(false);
  });
});

describe("principle", () => {
  it("afm uses cantilever tip", () => {
    expect(principle("afm_atomic_force")).toBe("cantilever_tip_atomic_force_nano_scale_topography");
  });
});

describe("bestUse", () => {
  it("optical interferometer for semiconductor wafer", () => {
    expect(bestUse("optical_interferometer")).toBe("semiconductor_wafer_optics_coating_sub_nm_analysis");
  });
});

describe("surfaceRoughnessTypes", () => {
  it("returns 5 types", () => {
    expect(surfaceRoughnessTypes()).toHaveLength(5);
  });
});

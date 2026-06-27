import { describe, it, expect } from "vitest";
import {
  performance, durability, bandwidth, angleShift,
  ocCost, multilayer, forLaser, material,
  bestUse, opticalCoatingTypes,
} from "../optical-coating-calc.js";

describe("performance", () => {
  it("high reflector best performance", () => {
    expect(performance("high_reflector_hr_dielectric")).toBeGreaterThan(performance("metallic_mirror_aluminum"));
  });
});

describe("durability", () => {
  it("high reflector most durable", () => {
    expect(durability("high_reflector_hr_dielectric")).toBeGreaterThan(durability("metallic_mirror_aluminum"));
  });
});

describe("bandwidth", () => {
  it("metallic mirror widest bandwidth", () => {
    expect(bandwidth("metallic_mirror_aluminum")).toBeGreaterThan(bandwidth("bandpass_filter_narrowband"));
  });
});

describe("angleShift", () => {
  it("metallic mirror least angle shift", () => {
    expect(angleShift("metallic_mirror_aluminum")).toBeGreaterThan(angleShift("bandpass_filter_narrowband"));
  });
});

describe("ocCost", () => {
  it("bandpass most expensive", () => {
    expect(ocCost("bandpass_filter_narrowband")).toBeGreaterThan(ocCost("metallic_mirror_aluminum"));
  });
});

describe("multilayer", () => {
  it("anti reflection is multilayer", () => {
    expect(multilayer("anti_reflection_ar_mlar")).toBe(true);
  });
  it("metallic mirror not multilayer", () => {
    expect(multilayer("metallic_mirror_aluminum")).toBe(false);
  });
});

describe("forLaser", () => {
  it("high reflector for laser", () => {
    expect(forLaser("high_reflector_hr_dielectric")).toBe(true);
  });
  it("dichroic not for laser", () => {
    expect(forLaser("dichroic_color_selective")).toBe(false);
  });
});

describe("material", () => {
  it("dichroic uses interference edge filter", () => {
    expect(material("dichroic_color_selective")).toBe("interference_edge_filter");
  });
});

describe("bestUse", () => {
  it("anti reflection best for camera lens", () => {
    expect(bestUse("anti_reflection_ar_mlar")).toBe("camera_lens_ghost_reduction");
  });
});

describe("opticalCoatingTypes", () => {
  it("returns 5 types", () => {
    expect(opticalCoatingTypes()).toHaveLength(5);
  });
});

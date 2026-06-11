import { describe, it, expect } from "vitest";
import {
  verticalResolution, throughput, lateralResolution, scanArea,
  sfCost, contactFree, forNanoScale, profilerConfig,
  bestUse, surfaceProfilerTypes,
} from "../surface-profiler-calc.js";

describe("verticalResolution", () => {
  it("confocal laser best vertical resolution", () => {
    expect(verticalResolution("confocal_laser")).toBeGreaterThan(verticalResolution("stylus_contact"));
  });
});

describe("throughput", () => {
  it("focus variation highest throughput", () => {
    expect(throughput("focus_variation")).toBeGreaterThan(throughput("afm_probe"));
  });
});

describe("lateralResolution", () => {
  it("confocal laser best lateral resolution", () => {
    expect(lateralResolution("confocal_laser")).toBeGreaterThan(lateralResolution("stylus_contact"));
  });
});

describe("scanArea", () => {
  it("stylus contact best scan area", () => {
    expect(scanArea("stylus_contact")).toBeGreaterThan(scanArea("afm_probe"));
  });
});

describe("sfCost", () => {
  it("confocal laser most expensive", () => {
    expect(sfCost("confocal_laser")).toBeGreaterThan(sfCost("stylus_contact"));
  });
});

describe("contactFree", () => {
  it("white light interferometer is contact free", () => {
    expect(contactFree("white_light_interferometer")).toBe(true);
  });
  it("stylus contact not contact free", () => {
    expect(contactFree("stylus_contact")).toBe(false);
  });
});

describe("forNanoScale", () => {
  it("afm probe for nano scale", () => {
    expect(forNanoScale("afm_probe")).toBe(true);
  });
  it("focus variation not for nano scale", () => {
    expect(forNanoScale("focus_variation")).toBe(false);
  });
});

describe("profilerConfig", () => {
  it("focus variation uses objective sweep 3d color image", () => {
    expect(profilerConfig("focus_variation")).toBe("focus_variation_surface_profiler_objective_sweep_3d_color_image");
  });
});

describe("bestUse", () => {
  it("stylus contact for machined surface ra rz roughness", () => {
    expect(bestUse("stylus_contact")).toBe("machined_surface_stylus_contact_surface_profiler_ra_rz_roughness");
  });
});

describe("surfaceProfilerTypes", () => {
  it("returns 5 types", () => {
    expect(surfaceProfilerTypes()).toHaveLength(5);
  });
});

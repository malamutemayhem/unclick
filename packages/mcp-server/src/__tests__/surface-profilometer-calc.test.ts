import { describe, it, expect } from "vitest";
import {
  verticalResolution, lateralResolution, measureRange, scanSpeed,
  spCost, nonContact, forNanoScale, technique,
  bestUse, surfaceProfilometerTypes,
} from "../surface-profilometer-calc.js";

describe("verticalResolution", () => {
  it("white light and afm best vertical resolution", () => {
    expect(verticalResolution("white_light_interferometry")).toBeGreaterThan(verticalResolution("focus_variation"));
    expect(verticalResolution("atomic_force_micro")).toBeGreaterThan(verticalResolution("focus_variation"));
  });
});

describe("lateralResolution", () => {
  it("confocal laser and afm best lateral resolution", () => {
    expect(lateralResolution("confocal_laser")).toBeGreaterThan(lateralResolution("contact_stylus"));
    expect(lateralResolution("atomic_force_micro")).toBeGreaterThan(lateralResolution("contact_stylus"));
  });
});

describe("measureRange", () => {
  it("focus variation widest measure range", () => {
    expect(measureRange("focus_variation")).toBeGreaterThan(measureRange("atomic_force_micro"));
  });
});

describe("scanSpeed", () => {
  it("focus variation fastest scan", () => {
    expect(scanSpeed("focus_variation")).toBeGreaterThan(scanSpeed("atomic_force_micro"));
  });
});

describe("spCost", () => {
  it("atomic force micro most expensive", () => {
    expect(spCost("atomic_force_micro")).toBeGreaterThan(spCost("contact_stylus"));
  });
});

describe("nonContact", () => {
  it("white light interferometry is non contact", () => {
    expect(nonContact("white_light_interferometry")).toBe(true);
  });
  it("contact stylus is contact", () => {
    expect(nonContact("contact_stylus")).toBe(false);
  });
});

describe("forNanoScale", () => {
  it("atomic force micro for nano scale", () => {
    expect(forNanoScale("atomic_force_micro")).toBe(true);
  });
  it("contact stylus not for nano scale", () => {
    expect(forNanoScale("contact_stylus")).toBe(false);
  });
});

describe("technique", () => {
  it("focus variation uses depth of field", () => {
    expect(technique("focus_variation")).toBe("focus_sweep_depth_of_field_combine_sharp_image_3d_height");
  });
});

describe("bestUse", () => {
  it("contact stylus for shop floor roughness", () => {
    expect(bestUse("contact_stylus")).toBe("machined_surface_ra_rz_rmax_shop_floor_roughness_check");
  });
});

describe("surfaceProfilometerTypes", () => {
  it("returns 5 types", () => {
    expect(surfaceProfilometerTypes()).toHaveLength(5);
  });
});

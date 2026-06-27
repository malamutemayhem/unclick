import { describe, it, expect } from "vitest";
import {
  buildVolume, speed, precision, strength,
  caCost, reinforced, forHousing, material,
  bestUse, concreteAmTypes,
} from "../concrete-am-calc.js";

describe("buildVolume", () => {
  it("gantry extrusion largest volume", () => {
    expect(buildVolume("gantry_extrusion_large")).toBeGreaterThan(buildVolume("particle_bed_selective"));
  });
});

describe("speed", () => {
  it("binder jet sand fastest", () => {
    expect(speed("binder_jet_sand_mold")).toBeGreaterThan(speed("particle_bed_selective"));
  });
});

describe("precision", () => {
  it("particle bed most precise", () => {
    expect(precision("particle_bed_selective")).toBeGreaterThan(precision("shotcrete_spray_3d"));
  });
});

describe("strength", () => {
  it("shotcrete spray strongest", () => {
    expect(strength("shotcrete_spray_3d")).toBeGreaterThan(strength("binder_jet_sand_mold"));
  });
});

describe("caCost", () => {
  it("particle bed most expensive", () => {
    expect(caCost("particle_bed_selective")).toBeGreaterThan(caCost("binder_jet_sand_mold"));
  });
});

describe("reinforced", () => {
  it("robotic arm is reinforced", () => {
    expect(reinforced("robotic_arm_contour")).toBe(true);
  });
  it("gantry extrusion not reinforced", () => {
    expect(reinforced("gantry_extrusion_large")).toBe(false);
  });
});

describe("forHousing", () => {
  it("gantry extrusion for housing", () => {
    expect(forHousing("gantry_extrusion_large")).toBe(true);
  });
  it("binder jet not for housing", () => {
    expect(forHousing("binder_jet_sand_mold")).toBe(false);
  });
});

describe("material", () => {
  it("binder jet uses furan silica sand", () => {
    expect(material("binder_jet_sand_mold")).toBe("furan_binder_silica_sand");
  });
});

describe("bestUse", () => {
  it("particle bed for architectural sculpture", () => {
    expect(bestUse("particle_bed_selective")).toBe("architectural_sculpture_detail");
  });
});

describe("concreteAmTypes", () => {
  it("returns 5 types", () => {
    expect(concreteAmTypes()).toHaveLength(5);
  });
});

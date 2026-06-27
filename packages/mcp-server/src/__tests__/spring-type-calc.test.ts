import { describe, it, expect } from "vitest";
import {
  loadCapacity, deflection, fatigue, compactness,
  spCost, stackable, forVibration, material,
  bestUse, springTypes,
} from "../spring-type-calc.js";

describe("loadCapacity", () => {
  it("belleville highest load capacity", () => {
    expect(loadCapacity("belleville_disc_washer")).toBeGreaterThan(loadCapacity("torsion_coil_leg"));
  });
});

describe("deflection", () => {
  it("extension coil highest deflection", () => {
    expect(deflection("extension_coil_hook")).toBeGreaterThan(deflection("belleville_disc_washer"));
  });
});

describe("fatigue", () => {
  it("belleville best fatigue life", () => {
    expect(fatigue("belleville_disc_washer")).toBeGreaterThan(fatigue("leaf_flat_cantilever"));
  });
});

describe("compactness", () => {
  it("belleville most compact", () => {
    expect(compactness("belleville_disc_washer")).toBeGreaterThan(compactness("extension_coil_hook"));
  });
});

describe("spCost", () => {
  it("belleville most expensive", () => {
    expect(spCost("belleville_disc_washer")).toBeGreaterThan(spCost("compression_coil_helical"));
  });
});

describe("stackable", () => {
  it("belleville is stackable", () => {
    expect(stackable("belleville_disc_washer")).toBe(true);
  });
  it("compression not stackable", () => {
    expect(stackable("compression_coil_helical")).toBe(false);
  });
});

describe("forVibration", () => {
  it("compression for vibration", () => {
    expect(forVibration("compression_coil_helical")).toBe(true);
  });
  it("extension not for vibration", () => {
    expect(forVibration("extension_coil_hook")).toBe(false);
  });
});

describe("material", () => {
  it("belleville uses inconel 718", () => {
    expect(material("belleville_disc_washer")).toBe("inconel_718_high_temp");
  });
});

describe("bestUse", () => {
  it("leaf best for truck suspension", () => {
    expect(bestUse("leaf_flat_cantilever")).toBe("truck_suspension_axle_support");
  });
});

describe("springTypes", () => {
  it("returns 5 types", () => {
    expect(springTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  hitRate, precision, versatility, forming,
  tpCost, laserCombo, forPrototype, tooling,
  bestUse, turretPunchTypes,
} from "../turret-punch-calc.js";

describe("hitRate", () => {
  it("thin turret servo highest hit rate", () => {
    expect(hitRate("thin_turret_servo")).toBeGreaterThan(hitRate("nibble_form_louver"));
  });
});

describe("precision", () => {
  it("combo punch laser most precise", () => {
    expect(precision("combo_punch_laser")).toBeGreaterThan(precision("nibble_form_louver"));
  });
});

describe("versatility", () => {
  it("combo punch laser most versatile", () => {
    expect(versatility("combo_punch_laser")).toBeGreaterThan(versatility("combo_punch_shear"));
  });
});

describe("forming", () => {
  it("nibble form louver best forming", () => {
    expect(forming("nibble_form_louver")).toBeGreaterThan(forming("combo_punch_shear"));
  });
});

describe("tpCost", () => {
  it("combo punch laser most expensive", () => {
    expect(tpCost("combo_punch_laser")).toBeGreaterThan(tpCost("nibble_form_louver"));
  });
});

describe("laserCombo", () => {
  it("combo punch laser has laser", () => {
    expect(laserCombo("combo_punch_laser")).toBe(true);
  });
  it("thick turret no laser", () => {
    expect(laserCombo("thick_turret_hydraulic")).toBe(false);
  });
});

describe("forPrototype", () => {
  it("combo punch laser for prototypes", () => {
    expect(forPrototype("combo_punch_laser")).toBe(true);
  });
  it("thin turret not for prototypes", () => {
    expect(forPrototype("thin_turret_servo")).toBe(false);
  });
});

describe("tooling", () => {
  it("combo punch shear uses right angle shear", () => {
    expect(tooling("combo_punch_shear")).toBe("punch_turret_right_angle_shear");
  });
});

describe("bestUse", () => {
  it("thin turret for electrical enclosure", () => {
    expect(bestUse("thin_turret_servo")).toBe("electrical_enclosure_high_speed");
  });
});

describe("turretPunchTypes", () => {
  it("returns 5 types", () => {
    expect(turretPunchTypes()).toHaveLength(5);
  });
});

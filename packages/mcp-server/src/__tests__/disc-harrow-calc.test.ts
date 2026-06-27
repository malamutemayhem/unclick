import { describe, it, expect } from "vitest";
import {
  soilPenetration, residueMixing, fieldSpeed, soilFinish,
  dhCost, hydraulicAdjust, forPrimary, discConfig,
  bestUse, discHarrowTypes,
} from "../disc-harrow-calc.js";

describe("soilPenetration", () => {
  it("heavy duty primary deepest soil penetration", () => {
    expect(soilPenetration("heavy_duty_primary")).toBeGreaterThan(soilPenetration("vertical_tillage"));
  });
});

describe("residueMixing", () => {
  it("vertical tillage best residue mixing", () => {
    expect(residueMixing("vertical_tillage")).toBeGreaterThan(residueMixing("compact_disc"));
  });
});

describe("fieldSpeed", () => {
  it("vertical tillage fastest field speed", () => {
    expect(fieldSpeed("vertical_tillage")).toBeGreaterThan(fieldSpeed("heavy_duty_primary"));
  });
});

describe("soilFinish", () => {
  it("vertical tillage best soil finish", () => {
    expect(soilFinish("vertical_tillage")).toBeGreaterThan(soilFinish("heavy_duty_primary"));
  });
});

describe("dhCost", () => {
  it("heavy duty primary most expensive", () => {
    expect(dhCost("heavy_duty_primary")).toBeGreaterThan(dhCost("compact_disc"));
  });
});

describe("hydraulicAdjust", () => {
  it("offset tandem has hydraulic adjust", () => {
    expect(hydraulicAdjust("offset_tandem")).toBe(true);
  });
  it("single offset no hydraulic adjust", () => {
    expect(hydraulicAdjust("single_offset")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("heavy duty primary for primary tillage", () => {
    expect(forPrimary("heavy_duty_primary")).toBe(true);
  });
  it("offset tandem not for primary", () => {
    expect(forPrimary("offset_tandem")).toBe(false);
  });
});

describe("discConfig", () => {
  it("vertical tillage uses straight set wavy blade", () => {
    expect(discConfig("vertical_tillage")).toBe("straight_set_wavy_blade_shallow_angle_size_residue_no_invert");
  });
});

describe("bestUse", () => {
  it("compact disc for orchard vineyard", () => {
    expect(bestUse("compact_disc")).toBe("orchard_vineyard_small_field_compact_tractor_light_tillage");
  });
});

describe("discHarrowTypes", () => {
  it("returns 5 types", () => {
    expect(discHarrowTypes()).toHaveLength(5);
  });
});

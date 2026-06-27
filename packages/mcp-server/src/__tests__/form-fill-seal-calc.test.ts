import { describe, it, expect } from "vitest";
import {
  speed, versatility, filmEfficiency, sealIntegrity,
  ffsCost, modifiedAtmosphere, forLiquid, filmType,
  bestUse, formFillSealTypes,
} from "../form-fill-seal-calc.js";

describe("speed", () => {
  it("hffs fastest", () => {
    expect(speed("hffs_horizontal_flow")).toBeGreaterThan(speed("pouch_premade_rotary"));
  });
});

describe("versatility", () => {
  it("premade pouch most versatile", () => {
    expect(versatility("pouch_premade_rotary")).toBeGreaterThan(versatility("sachet_stick_pack"));
  });
});

describe("filmEfficiency", () => {
  it("sachet best film efficiency", () => {
    expect(filmEfficiency("sachet_stick_pack")).toBeGreaterThan(filmEfficiency("pouch_premade_rotary"));
  });
});

describe("sealIntegrity", () => {
  it("thermoform tray best seal", () => {
    expect(sealIntegrity("tffs_thermoform_tray")).toBeGreaterThan(sealIntegrity("vffs_vertical_pillow"));
  });
});

describe("ffsCost", () => {
  it("thermoform most expensive", () => {
    expect(ffsCost("tffs_thermoform_tray")).toBeGreaterThan(ffsCost("sachet_stick_pack"));
  });
});

describe("modifiedAtmosphere", () => {
  it("vffs supports modified atmosphere", () => {
    expect(modifiedAtmosphere("vffs_vertical_pillow")).toBe(true);
  });
  it("sachet no modified atmosphere", () => {
    expect(modifiedAtmosphere("sachet_stick_pack")).toBe(false);
  });
});

describe("forLiquid", () => {
  it("sachet for liquid", () => {
    expect(forLiquid("sachet_stick_pack")).toBe(true);
  });
  it("vffs not for liquid", () => {
    expect(forLiquid("vffs_vertical_pillow")).toBe(false);
  });
});

describe("filmType", () => {
  it("hffs uses center seal flow wrap", () => {
    expect(filmType("hffs_horizontal_flow")).toBe("center_seal_flow_wrap_film");
  });
});

describe("bestUse", () => {
  it("vffs for snack and coffee", () => {
    expect(bestUse("vffs_vertical_pillow")).toBe("snack_chip_coffee_granule_bag");
  });
});

describe("formFillSealTypes", () => {
  it("returns 5 types", () => {
    expect(formFillSealTypes()).toHaveLength(5);
  });
});

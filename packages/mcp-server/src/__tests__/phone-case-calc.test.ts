import { describe, it, expect } from "vitest";
import {
  dropProtection, slimProfile, gripFeel, style,
  caseCost, screenCover, wirelessChargeThrough, caseMaterial,
  bestUser, phoneCases,
} from "../phone-case-calc.js";

describe("dropProtection", () => {
  it("rugged armor heavy best drop protection", () => {
    expect(dropProtection("rugged_armor_heavy")).toBeGreaterThan(dropProtection("clear_tpu_slim"));
  });
});

describe("slimProfile", () => {
  it("clear tpu slim slimmest profile", () => {
    expect(slimProfile("clear_tpu_slim")).toBeGreaterThan(slimProfile("rugged_armor_heavy"));
  });
});

describe("gripFeel", () => {
  it("silicone soft grip best grip", () => {
    expect(gripFeel("silicone_soft_grip")).toBeGreaterThan(gripFeel("clear_tpu_slim"));
  });
});

describe("style", () => {
  it("leather folio wallet most stylish", () => {
    expect(style("leather_folio_wallet")).toBeGreaterThan(style("rugged_armor_heavy"));
  });
});

describe("caseCost", () => {
  it("leather folio wallet most expensive", () => {
    expect(caseCost("leather_folio_wallet")).toBeGreaterThan(caseCost("clear_tpu_slim"));
  });
});

describe("screenCover", () => {
  it("leather folio wallet has screen cover", () => {
    expect(screenCover("leather_folio_wallet")).toBe(true);
  });
  it("clear tpu slim does not", () => {
    expect(screenCover("clear_tpu_slim")).toBe(false);
  });
});

describe("wirelessChargeThrough", () => {
  it("magsafe magnetic snap charges wirelessly", () => {
    expect(wirelessChargeThrough("magsafe_magnetic_snap")).toBe(true);
  });
  it("rugged armor heavy does not", () => {
    expect(wirelessChargeThrough("rugged_armor_heavy")).toBe(false);
  });
});

describe("caseMaterial", () => {
  it("silicone soft grip uses liquid silicone microfiber", () => {
    expect(caseMaterial("silicone_soft_grip")).toBe("liquid_silicone_microfiber");
  });
});

describe("bestUser", () => {
  it("rugged armor heavy best for construction outdoor active", () => {
    expect(bestUser("rugged_armor_heavy")).toBe("construction_outdoor_active");
  });
});

describe("phoneCases", () => {
  it("returns 5 types", () => {
    expect(phoneCases()).toHaveLength(5);
  });
});

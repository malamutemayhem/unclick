import { describe, it, expect } from "vitest";
import {
  strikeForce, controlPrecision, textureAbility, balance,
  hammerCost, polishedFace, shortHandle, headMaterial,
  bestUse, crossPeens,
} from "../cross-peen-calc.js";

describe("strikeForce", () => {
  it("silversmith 8oz medium strongest strike", () => {
    expect(strikeForce("silversmith_8oz_medium")).toBeGreaterThan(strikeForce("goldsmith_2oz_light"));
  });
});

describe("controlPrecision", () => {
  it("goldsmith 2oz light most precise control", () => {
    expect(controlPrecision("goldsmith_2oz_light")).toBeGreaterThan(controlPrecision("riveting_narrow_peen"));
  });
});

describe("textureAbility", () => {
  it("silversmith 8oz medium best texture ability", () => {
    expect(textureAbility("silversmith_8oz_medium")).toBeGreaterThan(textureAbility("planishing_flat_face"));
  });
});

describe("balance", () => {
  it("planishing flat face best balance", () => {
    expect(balance("planishing_flat_face")).toBeGreaterThan(balance("riveting_narrow_peen"));
  });
});

describe("hammerCost", () => {
  it("planishing flat face most expensive", () => {
    expect(hammerCost("planishing_flat_face")).toBeGreaterThan(hammerCost("riveting_narrow_peen"));
  });
});

describe("polishedFace", () => {
  it("goldsmith 2oz light has polished face", () => {
    expect(polishedFace("goldsmith_2oz_light")).toBe(true);
  });
  it("silversmith 8oz medium no polished face", () => {
    expect(polishedFace("silversmith_8oz_medium")).toBe(false);
  });
});

describe("shortHandle", () => {
  it("chasing short handle has short handle", () => {
    expect(shortHandle("chasing_short_handle")).toBe(true);
  });
  it("goldsmith 2oz light no short handle", () => {
    expect(shortHandle("goldsmith_2oz_light")).toBe(false);
  });
});

describe("headMaterial", () => {
  it("goldsmith 2oz light uses hardened steel mirror", () => {
    expect(headMaterial("goldsmith_2oz_light")).toBe("hardened_steel_mirror");
  });
});

describe("bestUse", () => {
  it("planishing flat face best for smooth surface finish", () => {
    expect(bestUse("planishing_flat_face")).toBe("smooth_surface_finish");
  });
});

describe("crossPeens", () => {
  it("returns 5 types", () => {
    expect(crossPeens()).toHaveLength(5);
  });
});

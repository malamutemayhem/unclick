import { describe, it, expect } from "vitest";
import {
  drySpeed, absorbency, packSize, softness,
  towelCost, antiMicrobial, ecoFriendly, fiberType,
  bestTrip, campTowels,
} from "../camp-towel-calc.js";

describe("drySpeed", () => {
  it("microfiber quick dry fastest dry speed", () => {
    expect(drySpeed("microfiber_quick_dry")).toBeGreaterThan(drySpeed("cotton_terry_comfort"));
  });
});

describe("absorbency", () => {
  it("cotton terry comfort most absorbent", () => {
    expect(absorbency("cotton_terry_comfort")).toBeGreaterThan(absorbency("linen_natural_pack"));
  });
});

describe("packSize", () => {
  it("chamois synthetic ultra smallest pack size", () => {
    expect(packSize("chamois_synthetic_ultra")).toBeGreaterThan(packSize("cotton_terry_comfort"));
  });
});

describe("softness", () => {
  it("cotton terry comfort softest", () => {
    expect(softness("cotton_terry_comfort")).toBeGreaterThan(softness("chamois_synthetic_ultra"));
  });
});

describe("towelCost", () => {
  it("bamboo blend eco more expensive than microfiber", () => {
    expect(towelCost("bamboo_blend_eco")).toBeGreaterThan(towelCost("microfiber_quick_dry"));
  });
});

describe("antiMicrobial", () => {
  it("microfiber quick dry is anti microbial", () => {
    expect(antiMicrobial("microfiber_quick_dry")).toBe(true);
  });
  it("cotton terry comfort is not anti microbial", () => {
    expect(antiMicrobial("cotton_terry_comfort")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("bamboo blend eco is eco friendly", () => {
    expect(ecoFriendly("bamboo_blend_eco")).toBe(true);
  });
  it("microfiber quick dry is not eco friendly", () => {
    expect(ecoFriendly("microfiber_quick_dry")).toBe(false);
  });
});

describe("fiberType", () => {
  it("bamboo blend eco uses bamboo viscose blend", () => {
    expect(fiberType("bamboo_blend_eco")).toBe("bamboo_viscose_blend");
  });
});

describe("bestTrip", () => {
  it("microfiber quick dry best for backpacking multi day", () => {
    expect(bestTrip("microfiber_quick_dry")).toBe("backpacking_multi_day");
  });
});

describe("campTowels", () => {
  it("returns 5 types", () => {
    expect(campTowels()).toHaveLength(5);
  });
});

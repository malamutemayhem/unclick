import { describe, it, expect } from "vitest";
import {
  durability, readability, noiseLevel, nightVisibility,
  tagCost, hasDigitalInfo, silent, attachMethod,
  bestPet, petTags,
} from "../pet-tag-calc.js";

describe("durability", () => {
  it("stainless steel engraved most durable", () => {
    expect(durability("stainless_steel_engraved")).toBeGreaterThan(durability("glow_dark_reflective"));
  });
});

describe("readability", () => {
  it("smart qr code scan most readable", () => {
    expect(readability("smart_qr_code_scan")).toBeGreaterThan(readability("glow_dark_reflective"));
  });
});

describe("noiseLevel", () => {
  it("silicone slide on quiet lowest noise", () => {
    expect(noiseLevel("silicone_slide_on_quiet")).toBeLessThan(noiseLevel("stainless_steel_engraved"));
  });
});

describe("nightVisibility", () => {
  it("glow dark reflective best night visibility", () => {
    expect(nightVisibility("glow_dark_reflective")).toBeGreaterThan(nightVisibility("stainless_steel_engraved"));
  });
});

describe("tagCost", () => {
  it("smart qr code scan most expensive", () => {
    expect(tagCost("smart_qr_code_scan")).toBeGreaterThan(tagCost("silicone_slide_on_quiet"));
  });
});

describe("hasDigitalInfo", () => {
  it("smart qr code scan has digital info", () => {
    expect(hasDigitalInfo("smart_qr_code_scan")).toBe(true);
  });
  it("stainless steel engraved has no digital info", () => {
    expect(hasDigitalInfo("stainless_steel_engraved")).toBe(false);
  });
});

describe("silent", () => {
  it("silicone slide on quiet is silent", () => {
    expect(silent("silicone_slide_on_quiet")).toBe(true);
  });
  it("brass stamped classic is not silent", () => {
    expect(silent("brass_stamped_classic")).toBe(false);
  });
});

describe("attachMethod", () => {
  it("silicone slide on quiet uses slide over collar", () => {
    expect(attachMethod("silicone_slide_on_quiet")).toBe("slide_over_collar");
  });
});

describe("bestPet", () => {
  it("smart qr code scan best for travel pet frequent", () => {
    expect(bestPet("smart_qr_code_scan")).toBe("travel_pet_frequent");
  });
});

describe("petTags", () => {
  it("returns 5 types", () => {
    expect(petTags()).toHaveLength(5);
  });
});

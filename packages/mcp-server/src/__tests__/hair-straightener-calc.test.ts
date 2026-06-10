import { describe, it, expect } from "vitest";
import {
  heatSpeed, hairProtection, smoothResult, portability,
  straightenerCost, dualVoltage, autoShutoff, plateMaterial,
  bestHairType, hairStraighteners,
} from "../hair-straightener-calc.js";

describe("heatSpeed", () => {
  it("titanium pro salon fastest heat", () => {
    expect(heatSpeed("titanium_pro_salon")).toBeGreaterThan(heatSpeed("cordless_mini_travel"));
  });
});

describe("hairProtection", () => {
  it("steam moisture infuse best hair protection", () => {
    expect(hairProtection("steam_moisture_infuse")).toBeGreaterThan(hairProtection("titanium_pro_salon"));
  });
});

describe("smoothResult", () => {
  it("titanium pro salon smoothest result", () => {
    expect(smoothResult("titanium_pro_salon")).toBeGreaterThan(smoothResult("cordless_mini_travel"));
  });
});

describe("portability", () => {
  it("cordless mini travel most portable", () => {
    expect(portability("cordless_mini_travel")).toBeGreaterThan(portability("steam_moisture_infuse"));
  });
});

describe("straightenerCost", () => {
  it("titanium pro salon most expensive", () => {
    expect(straightenerCost("titanium_pro_salon")).toBeGreaterThan(straightenerCost("ceramic_plate_standard"));
  });
});

describe("dualVoltage", () => {
  it("titanium pro salon has dual voltage", () => {
    expect(dualVoltage("titanium_pro_salon")).toBe(true);
  });
  it("ceramic plate standard does not", () => {
    expect(dualVoltage("ceramic_plate_standard")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("ceramic plate standard has auto shutoff", () => {
    expect(autoShutoff("ceramic_plate_standard")).toBe(true);
  });
  it("cordless mini travel does not", () => {
    expect(autoShutoff("cordless_mini_travel")).toBe(false);
  });
});

describe("plateMaterial", () => {
  it("tourmaline ionic uses crushed tourmaline ion emit", () => {
    expect(plateMaterial("tourmaline_ionic")).toBe("crushed_tourmaline_ion_emit");
  });
});

describe("bestHairType", () => {
  it("steam moisture infuse best for color treated delicate", () => {
    expect(bestHairType("steam_moisture_infuse")).toBe("color_treated_delicate");
  });
});

describe("hairStraighteners", () => {
  it("returns 5 types", () => {
    expect(hairStraighteners()).toHaveLength(5);
  });
});

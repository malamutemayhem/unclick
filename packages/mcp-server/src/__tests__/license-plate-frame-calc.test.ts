import { describe, it, expect } from "vitest";
import {
  durability, styleAppeal, plateProtection, installEase,
  frameCost, rustProof, hasLighting, frameMaterial,
  bestVehicle, licensePlateFrames,
} from "../license-plate-frame-calc.js";

describe("durability", () => {
  it("carbon fiber premium most durable", () => {
    expect(durability("carbon_fiber_premium")).toBeGreaterThan(durability("plastic_snap_basic"));
  });
});

describe("styleAppeal", () => {
  it("carbon fiber premium most stylish", () => {
    expect(styleAppeal("carbon_fiber_premium")).toBeGreaterThan(styleAppeal("plastic_snap_basic"));
  });
});

describe("plateProtection", () => {
  it("silicone flex protector best plate protection", () => {
    expect(plateProtection("silicone_flex_protector")).toBeGreaterThan(plateProtection("plastic_snap_basic"));
  });
});

describe("installEase", () => {
  it("plastic snap basic easiest install", () => {
    expect(installEase("plastic_snap_basic")).toBeGreaterThan(installEase("led_lighted_accent"));
  });
});

describe("frameCost", () => {
  it("carbon fiber premium most expensive", () => {
    expect(frameCost("carbon_fiber_premium")).toBeGreaterThan(frameCost("plastic_snap_basic"));
  });
});

describe("rustProof", () => {
  it("stainless steel chrome is rust proof", () => {
    expect(rustProof("stainless_steel_chrome")).toBe(true);
  });
  it("led lighted accent is not rust proof", () => {
    expect(rustProof("led_lighted_accent")).toBe(false);
  });
});

describe("hasLighting", () => {
  it("led lighted accent has lighting", () => {
    expect(hasLighting("led_lighted_accent")).toBe(true);
  });
  it("carbon fiber premium has no lighting", () => {
    expect(hasLighting("carbon_fiber_premium")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("carbon fiber premium uses real carbon fiber weave", () => {
    expect(frameMaterial("carbon_fiber_premium")).toBe("real_carbon_fiber_weave");
  });
});

describe("bestVehicle", () => {
  it("carbon fiber premium best for sports car luxury", () => {
    expect(bestVehicle("carbon_fiber_premium")).toBe("sports_car_luxury");
  });
});

describe("licensePlateFrames", () => {
  it("returns 5 types", () => {
    expect(licensePlateFrames()).toHaveLength(5);
  });
});

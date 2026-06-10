import { describe, it, expect } from "vitest";
import {
  magnification, opticalClarity, fieldOfView, handsFree,
  loupeCost, hasLight, portable, lensType,
  bestUse, jewelLoupes,
} from "../jewel-loupe-calc.js";

describe("magnification", () => {
  it("digital usb screen highest magnification", () => {
    expect(magnification("digital_usb_screen")).toBeGreaterThan(magnification("headband_binocular_free"));
  });
});

describe("opticalClarity", () => {
  it("triplet 10x standard best optical clarity", () => {
    expect(opticalClarity("triplet_10x_standard")).toBeGreaterThan(opticalClarity("digital_usb_screen"));
  });
});

describe("fieldOfView", () => {
  it("headband binocular free widest field of view", () => {
    expect(fieldOfView("headband_binocular_free")).toBeGreaterThan(fieldOfView("doublet_20x_detail"));
  });
});

describe("handsFree", () => {
  it("headband binocular free most hands free", () => {
    expect(handsFree("headband_binocular_free")).toBeGreaterThan(handsFree("triplet_10x_standard"));
  });
});

describe("loupeCost", () => {
  it("digital usb screen most expensive", () => {
    expect(loupeCost("digital_usb_screen")).toBeGreaterThan(loupeCost("triplet_10x_standard"));
  });
});

describe("hasLight", () => {
  it("handheld led light has light", () => {
    expect(hasLight("handheld_led_light")).toBe(true);
  });
  it("triplet 10x standard does not have light", () => {
    expect(hasLight("triplet_10x_standard")).toBe(false);
  });
});

describe("portable", () => {
  it("triplet 10x standard is portable", () => {
    expect(portable("triplet_10x_standard")).toBe(true);
  });
  it("headband binocular free is not portable", () => {
    expect(portable("headband_binocular_free")).toBe(false);
  });
});

describe("lensType", () => {
  it("triplet 10x standard uses achromatic triplet glass", () => {
    expect(lensType("triplet_10x_standard")).toBe("achromatic_triplet_glass");
  });
});

describe("bestUse", () => {
  it("headband binocular free best for bench work soldering", () => {
    expect(bestUse("headband_binocular_free")).toBe("bench_work_soldering");
  });
});

describe("jewelLoupes", () => {
  it("returns 5 types", () => {
    expect(jewelLoupes()).toHaveLength(5);
  });
});

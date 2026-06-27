import { describe, it, expect } from "vitest";
import {
  clarity, flexibility, accessibility, engagement,
  wfCost, digital, forAda, medium,
  bestUse, wayfindingTypes,
} from "../wayfinding-calc.js";

describe("clarity", () => {
  it("kiosk clearest", () => {
    expect(clarity("digital_interactive_kiosk")).toBeGreaterThan(clarity("tactile_braille_ada"));
  });
});

describe("flexibility", () => {
  it("kiosk most flexible", () => {
    expect(flexibility("digital_interactive_kiosk")).toBeGreaterThan(flexibility("static_printed_sign"));
  });
});

describe("accessibility", () => {
  it("tactile most accessible", () => {
    expect(accessibility("tactile_braille_ada")).toBeGreaterThan(accessibility("static_printed_sign"));
  });
});

describe("engagement", () => {
  it("ar most engaging", () => {
    expect(engagement("mobile_ar_navigation")).toBeGreaterThan(engagement("illuminated_directory_board"));
  });
});

describe("wfCost", () => {
  it("ar most expensive", () => {
    expect(wfCost("mobile_ar_navigation")).toBeGreaterThan(wfCost("static_printed_sign"));
  });
});

describe("digital", () => {
  it("kiosk is digital", () => {
    expect(digital("digital_interactive_kiosk")).toBe(true);
  });
  it("static not digital", () => {
    expect(digital("static_printed_sign")).toBe(false);
  });
});

describe("forAda", () => {
  it("tactile for ada", () => {
    expect(forAda("tactile_braille_ada")).toBe(true);
  });
  it("ar not ada", () => {
    expect(forAda("mobile_ar_navigation")).toBe(false);
  });
});

describe("medium", () => {
  it("ar uses smartphone overlay", () => {
    expect(medium("mobile_ar_navigation")).toBe("smartphone_ar_overlay_beacon");
  });
});

describe("bestUse", () => {
  it("kiosk for hospital campus", () => {
    expect(bestUse("digital_interactive_kiosk")).toBe("hospital_campus_large_venue");
  });
});

describe("wayfindingTypes", () => {
  it("returns 5 types", () => {
    expect(wayfindingTypes()).toHaveLength(5);
  });
});

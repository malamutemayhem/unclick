import { describe, it, expect } from "vitest";
import {
  sensitivity, falseAlarm, range, reliability,
  gbCost, contactless, forStorefront, detection,
  bestUse, glassBreakTypes,
} from "../glass-break-calc.js";

describe("sensitivity", () => {
  it("active screen most sensitive", () => {
    expect(sensitivity("active_glass_screen")).toBeGreaterThan(sensitivity("shock_vibration_contact"));
  });
});

describe("falseAlarm", () => {
  it("active screen fewest false alarms", () => {
    expect(falseAlarm("active_glass_screen")).toBeGreaterThan(falseAlarm("passive_acoustic_listen"));
  });
});

describe("range", () => {
  it("active screen longest range", () => {
    expect(range("active_glass_screen")).toBeGreaterThan(range("shock_vibration_contact"));
  });
});

describe("reliability", () => {
  it("dual tech very reliable", () => {
    expect(reliability("acoustic_dual_tech")).toBeGreaterThan(reliability("passive_acoustic_listen"));
  });
});

describe("gbCost", () => {
  it("active screen most expensive", () => {
    expect(gbCost("active_glass_screen")).toBeGreaterThan(gbCost("shock_vibration_contact"));
  });
});

describe("contactless", () => {
  it("acoustic is contactless", () => {
    expect(contactless("acoustic_dual_tech")).toBe(true);
  });
  it("shock contact is not contactless", () => {
    expect(contactless("shock_vibration_contact")).toBe(false);
  });
});

describe("forStorefront", () => {
  it("dual tech for storefront", () => {
    expect(forStorefront("acoustic_dual_tech")).toBe(true);
  });
  it("passive not for storefront", () => {
    expect(forStorefront("passive_acoustic_listen")).toBe(false);
  });
});

describe("detection", () => {
  it("shock uses piezo", () => {
    expect(detection("shock_vibration_contact")).toBe("piezo_vibration_on_glass");
  });
});

describe("bestUse", () => {
  it("active screen for museum", () => {
    expect(bestUse("active_glass_screen")).toBe("museum_jewelry_high_value");
  });
});

describe("glassBreakTypes", () => {
  it("returns 5 types", () => {
    expect(glassBreakTypes()).toHaveLength(5);
  });
});

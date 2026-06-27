import { describe, it, expect } from "vitest";
import {
  safetyRating, flexibility, contactQuality, durability,
  leadCost, retractable, forHighVoltage, tipStyle,
  bestUse, testLeads,
} from "../test-lead-calc.js";

describe("safetyRating", () => {
  it("silicone cat iii highest safety rating", () => {
    expect(safetyRating("silicone_cat_iii")).toBeGreaterThan(safetyRating("hook_clip_grabber"));
  });
});

describe("flexibility", () => {
  it("silicone cat iii most flexible", () => {
    expect(flexibility("silicone_cat_iii")).toBeGreaterThan(flexibility("kelvin_4wire"));
  });
});

describe("contactQuality", () => {
  it("kelvin 4wire best contact quality", () => {
    expect(contactQuality("kelvin_4wire")).toBeGreaterThan(contactQuality("alligator_clip_set"));
  });
});

describe("durability", () => {
  it("silicone cat iii most durable", () => {
    expect(durability("silicone_cat_iii")).toBeGreaterThan(durability("alligator_clip_set"));
  });
});

describe("leadCost", () => {
  it("kelvin 4wire most expensive", () => {
    expect(leadCost("kelvin_4wire")).toBeGreaterThan(leadCost("alligator_clip_set"));
  });
});

describe("retractable", () => {
  it("hook clip grabber is retractable", () => {
    expect(retractable("hook_clip_grabber")).toBe(true);
  });
  it("silicone cat iii not retractable", () => {
    expect(retractable("silicone_cat_iii")).toBe(false);
  });
});

describe("forHighVoltage", () => {
  it("silicone cat iii is for high voltage", () => {
    expect(forHighVoltage("silicone_cat_iii")).toBe(true);
  });
  it("banana stacking not for high voltage", () => {
    expect(forHighVoltage("banana_stacking")).toBe(false);
  });
});

describe("tipStyle", () => {
  it("hook clip uses micro hook ic grab", () => {
    expect(tipStyle("hook_clip_grabber")).toBe("micro_hook_ic_grab");
  });
});

describe("bestUse", () => {
  it("kelvin 4wire best for precision resistance measure", () => {
    expect(bestUse("kelvin_4wire")).toBe("precision_resistance_measure");
  });
});

describe("testLeads", () => {
  it("returns 5 types", () => {
    expect(testLeads()).toHaveLength(5);
  });
});

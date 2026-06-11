import { describe, it, expect } from "vitest";
import {
  contactReliability, gripStrength, insertEase, durability,
  holderCost, springContact, forSeries, mountStyle,
  bestUse, batteryHolders,
} from "../battery-holder-calc.js";

describe("contactReliability", () => {
  it("eighteen650 sled most reliable contact", () => {
    expect(contactReliability("eighteen650_sled")).toBeGreaterThan(contactReliability("nine_volt_snap"));
  });
});

describe("gripStrength", () => {
  it("eighteen650 sled strongest grip", () => {
    expect(gripStrength("eighteen650_sled")).toBeGreaterThan(gripStrength("nine_volt_snap"));
  });
});

describe("insertEase", () => {
  it("nine volt snap easiest insert", () => {
    expect(insertEase("nine_volt_snap")).toBeGreaterThan(insertEase("eighteen650_sled"));
  });
});

describe("durability", () => {
  it("eighteen650 sled most durable", () => {
    expect(durability("eighteen650_sled")).toBeGreaterThan(durability("nine_volt_snap"));
  });
});

describe("holderCost", () => {
  it("eighteen650 sled most expensive", () => {
    expect(holderCost("eighteen650_sled")).toBeGreaterThan(holderCost("nine_volt_snap"));
  });
});

describe("springContact", () => {
  it("aa spring clip has spring contact", () => {
    expect(springContact("aa_spring_clip")).toBe(true);
  });
  it("nine volt snap no spring contact", () => {
    expect(springContact("nine_volt_snap")).toBe(false);
  });
});

describe("forSeries", () => {
  it("eighteen650 sled is for series", () => {
    expect(forSeries("eighteen650_sled")).toBe(true);
  });
  it("aa spring clip not for series", () => {
    expect(forSeries("aa_spring_clip")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("coin cell cr2032 uses smd reflow", () => {
    expect(mountStyle("coin_cell_cr2032")).toBe("smd_reflow");
  });
});

describe("bestUse", () => {
  it("nine volt snap best for quick test rig", () => {
    expect(bestUse("nine_volt_snap")).toBe("quick_test_rig");
  });
});

describe("batteryHolders", () => {
  it("returns 5 types", () => {
    expect(batteryHolders()).toHaveLength(5);
  });
});

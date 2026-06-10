import { describe, it, expect } from "vitest";
import {
  burnTime, smokeVolume, bindingRatio, waterContent,
  dryingHours, fragranceIntensity, roomSizeM2, batchWeight,
  charcoalPercent, cureTimeDays, incenseForms,
} from "../incense-calc.js";

describe("burnTime", () => {
  it("positive minutes", () => {
    expect(burnTime(20, 3)).toBeGreaterThan(0);
  });
});

describe("smokeVolume", () => {
  it("positive grams", () => {
    expect(smokeVolume(5, 30)).toBeGreaterThan(0);
  });
});

describe("bindingRatio", () => {
  it("10% of wood powder", () => {
    expect(bindingRatio(100)).toBe(10);
  });
});

describe("waterContent", () => {
  it("30% of dry weight", () => {
    expect(waterContent(100)).toBe(30);
  });
});

describe("dryingHours", () => {
  it("powder = 0", () => {
    expect(dryingHours("powder")).toBe(0);
  });
  it("coil longest", () => {
    expect(dryingHours("coil")).toBeGreaterThan(dryingHours("stick"));
  });
});

describe("fragranceIntensity", () => {
  it("positive value", () => {
    expect(fragranceIntensity(5, 3)).toBeGreaterThan(0);
  });
});

describe("roomSizeM2", () => {
  it("larger for open rooms", () => {
    expect(roomSizeM2(60, "open")).toBeGreaterThan(roomSizeM2(60, "closed"));
  });
});

describe("batchWeight", () => {
  it("positive grams", () => {
    expect(batchWeight(50, "stick")).toBeGreaterThan(0);
  });
});

describe("charcoalPercent", () => {
  it("cone highest", () => {
    expect(charcoalPercent("cone")).toBeGreaterThan(charcoalPercent("stick"));
  });
  it("resin = 0", () => {
    expect(charcoalPercent("resin")).toBe(0);
  });
});

describe("cureTimeDays", () => {
  it("coil longest", () => {
    expect(cureTimeDays("coil")).toBeGreaterThan(cureTimeDays("cone"));
  });
});

describe("incenseForms", () => {
  it("returns 5 forms", () => {
    expect(incenseForms()).toHaveLength(5);
  });
});

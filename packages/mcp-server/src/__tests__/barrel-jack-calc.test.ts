import { describe, it, expect } from "vitest";
import {
  currentRating, contactReliable, insertCycles, sizeCompact,
  jackCost, locking, pcbMount, pinSize,
  bestUse, barrelJacks,
} from "../barrel-jack-calc.js";

describe("currentRating", () => {
  it("locking barrel highest current rating", () => {
    expect(currentRating("locking_barrel_twist")).toBeGreaterThan(currentRating("dc_3515_mini_barrel"));
  });
});

describe("contactReliable", () => {
  it("locking barrel most reliable contact", () => {
    expect(contactReliable("locking_barrel_twist")).toBeGreaterThan(contactReliable("dc_3515_mini_barrel"));
  });
});

describe("insertCycles", () => {
  it("locking barrel most insert cycles", () => {
    expect(insertCycles("locking_barrel_twist")).toBeGreaterThan(insertCycles("dc_3515_mini_barrel"));
  });
});

describe("sizeCompact", () => {
  it("dc 3515 mini most compact", () => {
    expect(sizeCompact("dc_3515_mini_barrel")).toBeGreaterThan(sizeCompact("locking_barrel_twist"));
  });
});

describe("jackCost", () => {
  it("locking barrel most expensive", () => {
    expect(jackCost("locking_barrel_twist")).toBeGreaterThan(jackCost("dc_5521_standard"));
  });
});

describe("locking", () => {
  it("locking barrel twist is locking", () => {
    expect(locking("locking_barrel_twist")).toBe(true);
  });
  it("dc 5521 standard not locking", () => {
    expect(locking("dc_5521_standard")).toBe(false);
  });
});

describe("pcbMount", () => {
  it("dc 5521 standard is pcb mount", () => {
    expect(pcbMount("dc_5521_standard")).toBe(true);
  });
  it("locking barrel not pcb mount", () => {
    expect(pcbMount("locking_barrel_twist")).toBe(false);
  });
});

describe("pinSize", () => {
  it("dc 5525 uses 2 5mm center pin", () => {
    expect(pinSize("dc_5525_thick_pin")).toBe("2_5mm_center_pin");
  });
});

describe("bestUse", () => {
  it("dc 5521 best for arduino power input", () => {
    expect(bestUse("dc_5521_standard")).toBe("arduino_power_input");
  });
});

describe("barrelJacks", () => {
  it("returns 5 types", () => {
    expect(barrelJacks()).toHaveLength(5);
  });
});

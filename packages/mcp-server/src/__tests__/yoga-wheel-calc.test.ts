import { describe, it, expect } from "vitest";
import {
  backRelief, balanceChallenge, gripSurface, portability,
  wheelCost, hasVibration, ecoMaterial, surfaceFinish,
  bestUse, yogaWheels,
} from "../yoga-wheel-calc.js";

describe("backRelief", () => {
  it("vibrating massage motor best back relief", () => {
    expect(backRelief("vibrating_massage_motor")).toBeGreaterThan(backRelief("wide_barrel_stability"));
  });
});

describe("balanceChallenge", () => {
  it("standard abs padded most balance challenge", () => {
    expect(balanceChallenge("standard_abs_padded")).toBeGreaterThan(balanceChallenge("wide_barrel_stability"));
  });
});

describe("gripSurface", () => {
  it("cork surface eco best grip surface", () => {
    expect(gripSurface("cork_surface_eco")).toBeGreaterThan(gripSurface("vibrating_massage_motor"));
  });
});

describe("portability", () => {
  it("small chirp targeted most portable", () => {
    expect(portability("small_chirp_targeted")).toBeGreaterThan(portability("wide_barrel_stability"));
  });
});

describe("wheelCost", () => {
  it("vibrating massage motor most expensive", () => {
    expect(wheelCost("vibrating_massage_motor")).toBeGreaterThan(wheelCost("standard_abs_padded"));
  });
});

describe("hasVibration", () => {
  it("vibrating massage motor has vibration", () => {
    expect(hasVibration("vibrating_massage_motor")).toBe(true);
  });
  it("standard abs padded has no vibration", () => {
    expect(hasVibration("standard_abs_padded")).toBe(false);
  });
});

describe("ecoMaterial", () => {
  it("cork surface eco uses eco material", () => {
    expect(ecoMaterial("cork_surface_eco")).toBe(true);
  });
  it("standard abs padded does not use eco material", () => {
    expect(ecoMaterial("standard_abs_padded")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("cork surface eco uses natural cork wrap", () => {
    expect(surfaceFinish("cork_surface_eco")).toBe("natural_cork_wrap");
  });
});

describe("bestUse", () => {
  it("small chirp targeted best for spine targeted release", () => {
    expect(bestUse("small_chirp_targeted")).toBe("spine_targeted_release");
  });
});

describe("yogaWheels", () => {
  it("returns 5 types", () => {
    expect(yogaWheels()).toHaveLength(5);
  });
});

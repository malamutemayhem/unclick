import { describe, it, expect } from "vitest";
import {
  bondStrength, speed, precision, materialRange,
  uwCost, solidState, forThermoplastic, horn,
  bestUse, ultrasonicWeldTypes,
} from "../ultrasonic-weld-calc.js";

describe("bondStrength", () => {
  it("torsional highest bond strength", () => {
    expect(bondStrength("torsional")).toBeGreaterThan(bondStrength("ultrasonic_spot"));
  });
});

describe("speed", () => {
  it("ultrasonic spot fastest", () => {
    expect(speed("ultrasonic_spot")).toBeGreaterThanOrEqual(speed("wedge_reed"));
  });
});

describe("precision", () => {
  it("torsional most precise", () => {
    expect(precision("torsional")).toBeGreaterThan(precision("lateral_drive"));
  });
});

describe("materialRange", () => {
  it("ultrasonic spot widest material range", () => {
    expect(materialRange("ultrasonic_spot")).toBeGreaterThan(materialRange("torsional"));
  });
});

describe("uwCost", () => {
  it("torsional most expensive", () => {
    expect(uwCost("torsional")).toBeGreaterThan(uwCost("ultrasonic_spot"));
  });
});

describe("solidState", () => {
  it("all types are solid state", () => {
    expect(solidState("lateral_drive")).toBe(true);
    expect(solidState("continuous_seam")).toBe(true);
  });
});

describe("forThermoplastic", () => {
  it("all types for thermoplastic", () => {
    expect(forThermoplastic("wedge_reed")).toBe(true);
    expect(forThermoplastic("torsional")).toBe(true);
  });
});

describe("horn", () => {
  it("torsional uses circular disc horn", () => {
    expect(horn("torsional")).toBe("circular_torsional_disc_horn_rotary_motion_round_part");
  });
});

describe("bestUse", () => {
  it("continuous seam for packaging seal line", () => {
    expect(bestUse("continuous_seam")).toBe("packaging_pouch_tube_foil_laminate_continuous_seal_line");
  });
});

describe("ultrasonicWeldTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicWeldTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  holeClean, taperAccuracy, speedReam, sizeRange,
  reamerCost, adjustable, carbide, cutProfile,
  bestUse, endPinReams,
} from "../end-pin-ream-calc.js";

describe("holeClean", () => {
  it("carbide reamer hard cleanest hole", () => {
    expect(holeClean("carbide_reamer_hard")).toBeGreaterThan(holeClean("stepped_reamer_set"));
  });
});

describe("taperAccuracy", () => {
  it("tapered reamer smooth most accurate taper", () => {
    expect(taperAccuracy("tapered_reamer_smooth")).toBeGreaterThan(taperAccuracy("stepped_reamer_set"));
  });
});

describe("speedReam", () => {
  it("stepped reamer set fastest ream", () => {
    expect(speedReam("stepped_reamer_set")).toBeGreaterThan(speedReam("tapered_reamer_smooth"));
  });
});

describe("sizeRange", () => {
  it("stepped reamer set widest size range", () => {
    expect(sizeRange("stepped_reamer_set")).toBeGreaterThan(sizeRange("carbide_reamer_hard"));
  });
});

describe("reamerCost", () => {
  it("carbide reamer hard most expensive", () => {
    expect(reamerCost("carbide_reamer_hard")).toBeGreaterThan(reamerCost("spiral_reamer_standard"));
  });
});

describe("adjustable", () => {
  it("adjustable reamer dial is adjustable", () => {
    expect(adjustable("adjustable_reamer_dial")).toBe(true);
  });
  it("spiral reamer standard not adjustable", () => {
    expect(adjustable("spiral_reamer_standard")).toBe(false);
  });
});

describe("carbide", () => {
  it("carbide reamer hard is carbide", () => {
    expect(carbide("carbide_reamer_hard")).toBe(true);
  });
  it("spiral reamer standard not carbide", () => {
    expect(carbide("spiral_reamer_standard")).toBe(false);
  });
});

describe("cutProfile", () => {
  it("adjustable reamer dial uses expanding blade set", () => {
    expect(cutProfile("adjustable_reamer_dial")).toBe("expanding_blade_set");
  });
});

describe("bestUse", () => {
  it("spiral reamer standard best for general endpin ream", () => {
    expect(bestUse("spiral_reamer_standard")).toBe("general_endpin_ream");
  });
});

describe("endPinReams", () => {
  it("returns 5 types", () => {
    expect(endPinReams()).toHaveLength(5);
  });
});

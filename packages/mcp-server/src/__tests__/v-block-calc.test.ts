import { describe, it, expect } from "vitest";
import {
  holdAccuracy, loadCapacity, diameterRange, surfaceFinish,
  blockCost, magnetic, matchedPair, blockMaterial,
  bestUse, vBlocks,
} from "../v-block-calc.js";

describe("holdAccuracy", () => {
  it("micro precision small most accurate", () => {
    expect(holdAccuracy("micro_precision_small")).toBeGreaterThan(holdAccuracy("cast_iron_heavy"));
  });
});

describe("loadCapacity", () => {
  it("cast iron heavy highest load capacity", () => {
    expect(loadCapacity("cast_iron_heavy")).toBeGreaterThan(loadCapacity("micro_precision_small"));
  });
});

describe("diameterRange", () => {
  it("adjustable angle set widest range", () => {
    expect(diameterRange("adjustable_angle_set")).toBeGreaterThan(diameterRange("micro_precision_small"));
  });
});

describe("surfaceFinish", () => {
  it("micro precision small best finish", () => {
    expect(surfaceFinish("micro_precision_small")).toBeGreaterThan(surfaceFinish("cast_iron_heavy"));
  });
});

describe("blockCost", () => {
  it("adjustable angle set most expensive", () => {
    expect(blockCost("adjustable_angle_set")).toBeGreaterThan(blockCost("hardened_steel_pair"));
  });
});

describe("magnetic", () => {
  it("magnetic hold block is magnetic", () => {
    expect(magnetic("magnetic_hold_block")).toBe(true);
  });
  it("hardened steel pair not magnetic", () => {
    expect(magnetic("hardened_steel_pair")).toBe(false);
  });
});

describe("matchedPair", () => {
  it("hardened steel pair is matched pair", () => {
    expect(matchedPair("hardened_steel_pair")).toBe(true);
  });
  it("cast iron heavy not matched pair", () => {
    expect(matchedPair("cast_iron_heavy")).toBe(false);
  });
});

describe("blockMaterial", () => {
  it("cast iron heavy uses cast iron machined", () => {
    expect(blockMaterial("cast_iron_heavy")).toBe("cast_iron_machined");
  });
});

describe("bestUse", () => {
  it("magnetic hold block best for hands free hold", () => {
    expect(bestUse("magnetic_hold_block")).toBe("hands_free_hold");
  });
});

describe("vBlocks", () => {
  it("returns 5 types", () => {
    expect(vBlocks()).toHaveLength(5);
  });
});

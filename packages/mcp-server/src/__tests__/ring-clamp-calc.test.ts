import { describe, it, expect } from "vitest";
import {
  gripForce, scratchSafe, sizeRange, easeOfUse,
  clampCost, handsFree, padded, jawMaterial,
  bestUse, ringClamps,
} from "../ring-clamp-calc.js";

describe("gripForce", () => {
  it("engraver block ball strongest grip", () => {
    expect(gripForce("engraver_block_ball")).toBeGreaterThan(gripForce("nylon_jaw_safe"));
  });
});

describe("scratchSafe", () => {
  it("leather jaw soft most scratch safe", () => {
    expect(scratchSafe("leather_jaw_soft")).toBeGreaterThan(scratchSafe("steel_spring_grip"));
  });
});

describe("sizeRange", () => {
  it("engraver block ball widest size range", () => {
    expect(sizeRange("engraver_block_ball")).toBeGreaterThan(sizeRange("steel_spring_grip"));
  });
});

describe("easeOfUse", () => {
  it("wood wedge hand easiest to use", () => {
    expect(easeOfUse("wood_wedge_hand")).toBeGreaterThan(easeOfUse("engraver_block_ball"));
  });
});

describe("clampCost", () => {
  it("engraver block ball most expensive", () => {
    expect(clampCost("engraver_block_ball")).toBeGreaterThan(clampCost("wood_wedge_hand"));
  });
});

describe("handsFree", () => {
  it("steel spring grip is hands free", () => {
    expect(handsFree("steel_spring_grip")).toBe(true);
  });
  it("wood wedge hand not hands free", () => {
    expect(handsFree("wood_wedge_hand")).toBe(false);
  });
});

describe("padded", () => {
  it("leather jaw soft is padded", () => {
    expect(padded("leather_jaw_soft")).toBe(true);
  });
  it("steel spring grip not padded", () => {
    expect(padded("steel_spring_grip")).toBe(false);
  });
});

describe("jawMaterial", () => {
  it("leather jaw soft uses cowhide lined pad", () => {
    expect(jawMaterial("leather_jaw_soft")).toBe("cowhide_lined_pad");
  });
});

describe("bestUse", () => {
  it("engraver block ball best for precision engraving", () => {
    expect(bestUse("engraver_block_ball")).toBe("precision_engraving");
  });
});

describe("ringClamps", () => {
  it("returns 5 types", () => {
    expect(ringClamps()).toHaveLength(5);
  });
});

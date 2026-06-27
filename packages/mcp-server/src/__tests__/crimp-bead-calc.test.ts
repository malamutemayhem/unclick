import { describe, it, expect } from "vitest";
import {
  holdStrength, cleanFinish, easeOfUse, wireRange,
  crimpCost, hidesConnection, needsPliers, crimpMetal,
  bestUse, crimpBeads,
} from "../crimp-bead-calc.js";

describe("holdStrength", () => {
  it("tube crimp smooth strongest hold", () => {
    expect(holdStrength("tube_crimp_smooth")).toBeGreaterThan(holdStrength("knot_cover_cup"));
  });
});

describe("cleanFinish", () => {
  it("crimp cover hide cleanest finish", () => {
    expect(cleanFinish("crimp_cover_hide")).toBeGreaterThan(cleanFinish("round_crimp_basic"));
  });
});

describe("easeOfUse", () => {
  it("round crimp basic easiest to use", () => {
    expect(easeOfUse("round_crimp_basic")).toBeGreaterThan(easeOfUse("crimp_cover_hide"));
  });
});

describe("wireRange", () => {
  it("tube crimp smooth widest wire range", () => {
    expect(wireRange("tube_crimp_smooth")).toBeGreaterThan(wireRange("knot_cover_cup"));
  });
});

describe("crimpCost", () => {
  it("crimp cover hide most expensive", () => {
    expect(crimpCost("crimp_cover_hide")).toBeGreaterThan(crimpCost("round_crimp_basic"));
  });
});

describe("hidesConnection", () => {
  it("crimp cover hide hides connection", () => {
    expect(hidesConnection("crimp_cover_hide")).toBe(true);
  });
  it("tube crimp smooth does not hide connection", () => {
    expect(hidesConnection("tube_crimp_smooth")).toBe(false);
  });
});

describe("needsPliers", () => {
  it("tube crimp smooth needs pliers", () => {
    expect(needsPliers("tube_crimp_smooth")).toBe(true);
  });
  it("knot cover cup does not need pliers", () => {
    expect(needsPliers("knot_cover_cup")).toBe(false);
  });
});

describe("crimpMetal", () => {
  it("crimp cover hide uses gold filled round", () => {
    expect(crimpMetal("crimp_cover_hide")).toBe("gold_filled_round");
  });
});

describe("bestUse", () => {
  it("tube crimp smooth best for professional finish", () => {
    expect(bestUse("tube_crimp_smooth")).toBe("professional_finish");
  });
});

describe("crimpBeads", () => {
  it("returns 5 types", () => {
    expect(crimpBeads()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  smoothFinish, adhesion, burnishGlow, drySpeed,
  boleCost, traditional, forSilver, claySource,
  bestUse, boleGrounds,
} from "../bole-ground-calc.js";

describe("smoothFinish", () => {
  it("red bole traditional smoothest finish", () => {
    expect(smoothFinish("red_bole_traditional")).toBeGreaterThan(smoothFinish("synthetic_bole_modern"));
  });
});

describe("adhesion", () => {
  it("synthetic bole modern best adhesion", () => {
    expect(adhesion("synthetic_bole_modern")).toBeGreaterThan(adhesion("black_bole_dark"));
  });
});

describe("burnishGlow", () => {
  it("red bole traditional best burnish glow", () => {
    expect(burnishGlow("red_bole_traditional")).toBeGreaterThan(burnishGlow("synthetic_bole_modern"));
  });
});

describe("drySpeed", () => {
  it("synthetic bole modern fastest dry", () => {
    expect(drySpeed("synthetic_bole_modern")).toBeGreaterThan(drySpeed("red_bole_traditional"));
  });
});

describe("boleCost", () => {
  it("red bole traditional most expensive", () => {
    expect(boleCost("red_bole_traditional")).toBeGreaterThan(boleCost("synthetic_bole_modern"));
  });
});

describe("traditional", () => {
  it("red bole traditional is traditional", () => {
    expect(traditional("red_bole_traditional")).toBe(true);
  });
  it("synthetic bole modern not traditional", () => {
    expect(traditional("synthetic_bole_modern")).toBe(false);
  });
});

describe("forSilver", () => {
  it("white bole silver is for silver", () => {
    expect(forSilver("white_bole_silver")).toBe(true);
  });
  it("red bole traditional not for silver", () => {
    expect(forSilver("red_bole_traditional")).toBe(false);
  });
});

describe("claySource", () => {
  it("yellow bole warm uses french yellow clay", () => {
    expect(claySource("yellow_bole_warm")).toBe("french_yellow_clay");
  });
});

describe("bestUse", () => {
  it("red bole traditional best for classic gold water gild", () => {
    expect(bestUse("red_bole_traditional")).toBe("classic_gold_water_gild");
  });
});

describe("boleGrounds", () => {
  it("returns 5 types", () => {
    expect(boleGrounds()).toHaveLength(5);
  });
});

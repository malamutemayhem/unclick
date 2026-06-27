import { describe, it, expect } from "vitest";
import {
  windSpeed, ballShape, gripComfort, yarnCapacity,
  stickCost, tapered, decorative, woodType,
  bestUse, nostepinnes,
} from "../nostepinne-calc.js";

describe("windSpeed", () => {
  it("cherry tapered tip fastest wind", () => {
    expect(windSpeed("cherry_tapered_tip")).toBeGreaterThan(windSpeed("rosewood_carved_deco"));
  });
});

describe("ballShape", () => {
  it("cherry tapered tip best ball shape", () => {
    expect(ballShape("cherry_tapered_tip")).toBeGreaterThan(ballShape("maple_wide_barrel"));
  });
});

describe("gripComfort", () => {
  it("rosewood carved deco most comfortable", () => {
    expect(gripComfort("rosewood_carved_deco")).toBeGreaterThan(gripComfort("cherry_tapered_tip"));
  });
});

describe("yarnCapacity", () => {
  it("maple wide barrel highest yarn capacity", () => {
    expect(yarnCapacity("maple_wide_barrel")).toBeGreaterThan(yarnCapacity("rosewood_carved_deco"));
  });
});

describe("stickCost", () => {
  it("rosewood carved deco most expensive", () => {
    expect(stickCost("rosewood_carved_deco")).toBeGreaterThan(stickCost("birch_classic_smooth"));
  });
});

describe("tapered", () => {
  it("cherry tapered tip is tapered", () => {
    expect(tapered("cherry_tapered_tip")).toBe(true);
  });
  it("birch classic smooth not tapered", () => {
    expect(tapered("birch_classic_smooth")).toBe(false);
  });
});

describe("decorative", () => {
  it("rosewood carved deco is decorative", () => {
    expect(decorative("rosewood_carved_deco")).toBe(true);
  });
  it("walnut heavy grip not decorative", () => {
    expect(decorative("walnut_heavy_grip")).toBe(false);
  });
});

describe("woodType", () => {
  it("birch classic smooth uses birch turned smooth", () => {
    expect(woodType("birch_classic_smooth")).toBe("birch_turned_smooth");
  });
});

describe("bestUse", () => {
  it("maple wide barrel best for large skein wind", () => {
    expect(bestUse("maple_wide_barrel")).toBe("large_skein_wind");
  });
});

describe("nostepinnes", () => {
  it("returns 5 types", () => {
    expect(nostepinnes()).toHaveLength(5);
  });
});

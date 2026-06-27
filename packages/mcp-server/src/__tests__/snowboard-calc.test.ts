import { describe, it, expect } from "vitest";
import {
  versatility, parkPerformance, powderFloat, edgeHold,
  boardCost, twinTip, splitCapable, profile,
  bestRider, snowboards,
} from "../snowboard-calc.js";

describe("versatility", () => {
  it("all mountain directional most versatile", () => {
    expect(versatility("all_mountain_directional")).toBeGreaterThan(versatility("carving_alpine"));
  });
});

describe("parkPerformance", () => {
  it("freestyle twin best park performance", () => {
    expect(parkPerformance("freestyle_twin")).toBeGreaterThan(parkPerformance("freeride_powder"));
  });
});

describe("powderFloat", () => {
  it("freeride powder best float", () => {
    expect(powderFloat("freeride_powder")).toBeGreaterThan(powderFloat("freestyle_twin"));
  });
});

describe("edgeHold", () => {
  it("carving alpine best edge hold", () => {
    expect(edgeHold("carving_alpine")).toBeGreaterThan(edgeHold("freestyle_twin"));
  });
});

describe("boardCost", () => {
  it("splitboard touring most expensive", () => {
    expect(boardCost("splitboard_touring")).toBeGreaterThan(boardCost("freestyle_twin"));
  });
});

describe("twinTip", () => {
  it("freestyle twin is twin tip", () => {
    expect(twinTip("freestyle_twin")).toBe(true);
  });
  it("freeride powder is not", () => {
    expect(twinTip("freeride_powder")).toBe(false);
  });
});

describe("splitCapable", () => {
  it("splitboard touring is split capable", () => {
    expect(splitCapable("splitboard_touring")).toBe(true);
  });
  it("all mountain directional is not", () => {
    expect(splitCapable("all_mountain_directional")).toBe(false);
  });
});

describe("profile", () => {
  it("freeride powder uses tapered rocker setback", () => {
    expect(profile("freeride_powder")).toBe("tapered_rocker_setback");
  });
});

describe("bestRider", () => {
  it("carving alpine for hardpack groomer speed", () => {
    expect(bestRider("carving_alpine")).toBe("hardpack_groomer_speed");
  });
});

describe("snowboards", () => {
  it("returns 5 types", () => {
    expect(snowboards()).toHaveLength(5);
  });
});

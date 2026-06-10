import { describe, it, expect } from "vitest";
import {
  gripRange, drillControl, runout, easeOfUse,
  viseCost, doubleEnd, pushDrill, chuckType,
  bestUse, pinVises,
} from "../pin-vise-calc.js";

describe("gripRange", () => {
  it("collet set precision widest grip range", () => {
    expect(gripRange("collet_set_precision")).toBeGreaterThan(gripRange("mini_hand_twist"));
  });
});

describe("drillControl", () => {
  it("archimedes drill push best drill control", () => {
    expect(drillControl("archimedes_drill_push")).toBeGreaterThan(drillControl("mini_hand_twist"));
  });
});

describe("runout", () => {
  it("collet set precision lowest runout", () => {
    expect(runout("collet_set_precision")).toBeGreaterThan(runout("mini_hand_twist"));
  });
});

describe("easeOfUse", () => {
  it("mini hand twist easiest to use", () => {
    expect(easeOfUse("mini_hand_twist")).toBeGreaterThan(easeOfUse("collet_set_precision"));
  });
});

describe("viseCost", () => {
  it("collet set precision most expensive", () => {
    expect(viseCost("collet_set_precision")).toBeGreaterThan(viseCost("single_end_basic"));
  });
});

describe("doubleEnd", () => {
  it("swivel head double is double end", () => {
    expect(doubleEnd("swivel_head_double")).toBe(true);
  });
  it("single end basic not double end", () => {
    expect(doubleEnd("single_end_basic")).toBe(false);
  });
});

describe("pushDrill", () => {
  it("archimedes drill push is push drill", () => {
    expect(pushDrill("archimedes_drill_push")).toBe(true);
  });
  it("single end basic not push drill", () => {
    expect(pushDrill("single_end_basic")).toBe(false);
  });
});

describe("chuckType", () => {
  it("single end basic uses three jaw chuck", () => {
    expect(chuckType("single_end_basic")).toBe("three_jaw_chuck");
  });
});

describe("bestUse", () => {
  it("archimedes drill push best for rapid hole push", () => {
    expect(bestUse("archimedes_drill_push")).toBe("rapid_hole_push");
  });
});

describe("pinVises", () => {
  it("returns 5 types", () => {
    expect(pinVises()).toHaveLength(5);
  });
});

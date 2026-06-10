import { describe, it, expect } from "vitest";
import {
  headShapeQuality, holdGrip, sizeRange, repeatability,
  headingCost, multiHole, needsStriker, dieProfile,
  bestUse, headingTools,
} from "../heading-tool-calc.js";

describe("headShapeQuality", () => {
  it("heading die hex best head shape", () => {
    expect(headShapeQuality("heading_die_hex")).toBeGreaterThan(headShapeQuality("monkey_tool_round"));
  });
});

describe("holdGrip", () => {
  it("nail header block best hold grip", () => {
    expect(holdGrip("nail_header_block")).toBeGreaterThan(holdGrip("monkey_tool_round"));
  });
});

describe("sizeRange", () => {
  it("bolt header plate widest size range", () => {
    expect(sizeRange("bolt_header_plate")).toBeGreaterThan(sizeRange("heading_die_hex"));
  });
});

describe("repeatability", () => {
  it("heading die hex most repeatable", () => {
    expect(repeatability("heading_die_hex")).toBeGreaterThan(repeatability("monkey_tool_round"));
  });
});

describe("headingCost", () => {
  it("heading die hex most expensive", () => {
    expect(headingCost("heading_die_hex")).toBeGreaterThan(headingCost("nail_header_block"));
  });
});

describe("multiHole", () => {
  it("bolt header plate has multi hole", () => {
    expect(multiHole("bolt_header_plate")).toBe(true);
  });
  it("rivet set cup no multi hole", () => {
    expect(multiHole("rivet_set_cup")).toBe(false);
  });
});

describe("needsStriker", () => {
  it("bolt header plate needs striker", () => {
    expect(needsStriker("bolt_header_plate")).toBe(true);
  });
});

describe("dieProfile", () => {
  it("heading die hex uses precision hex bore", () => {
    expect(dieProfile("heading_die_hex")).toBe("precision_hex_bore");
  });
});

describe("bestUse", () => {
  it("rivet set cup best for rivet dome set", () => {
    expect(bestUse("rivet_set_cup")).toBe("rivet_dome_set");
  });
});

describe("headingTools", () => {
  it("returns 5 types", () => {
    expect(headingTools()).toHaveLength(5);
  });
});
